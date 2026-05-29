/**
 * Klaviyo integration for the CineLuxe dealer pipeline.
 *
 * All functions are no-ops when KLAVIYO_API_KEY is not set, so the app
 * works fine before the Klaviyo account is connected.
 *
 * Required env vars (add to Vercel when ready):
 *   KLAVIYO_API_KEY   — private API key (starts with pk_)
 *   KLAVIYO_LIST_ID   — ID of the "CineLuxe Dealers" list (e.g. "AbCdEf")
 */

const BASE = "https://a.klaviyo.com/api";
const REVISION = "2024-02-15";

function apiKey(): string | null {
  return process.env.KLAVIYO_API_KEY ?? null;
}

function headers(): Record<string, string> {
  return {
    Authorization: `Klaviyo-API-Key ${apiKey()}`,
    "Content-Type": "application/json",
    revision: REVISION,
  };
}

// ─── Profile upsert ───────────────────────────────────────────────────────────

export interface DealerProfileData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  dealerStage: string;
  applicationId: number;
  /** Any additional custom properties to merge onto the profile */
  extra?: Record<string, unknown>;
}

/**
 * Creates or updates a Klaviyo profile for a dealer, then subscribes them to
 * the CineLuxe Dealers list (if KLAVIYO_LIST_ID is set).
 *
 * Safe to call at every pipeline stage — always updates dealer_stage so Klaviyo
 * flows can branch on the current value.
 */
export async function upsertDealerProfile(data: DealerProfileData): Promise<void> {
  const key = apiKey();
  if (!key) return;

  const profileAttributes = {
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    properties: {
      company: data.company,
      dealer_stage: data.dealerStage,
      application_id: data.applicationId,
      ...data.extra,
    },
  };

  // Attempt to create the profile
  const createRes = await fetch(`${BASE}/profiles/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ data: { type: "profile", attributes: profileAttributes } }),
  });

  let profileId: string | null = null;

  if (createRes.status === 201) {
    const json = await createRes.json();
    profileId = json.data?.id ?? null;
  } else if (createRes.status === 409) {
    // Profile already exists — extract the ID from the conflict error
    const json = await createRes.json();
    profileId = json.errors?.[0]?.meta?.duplicate_profile_id ?? null;

    if (profileId) {
      // Update the existing profile with the latest stage + properties
      await fetch(`${BASE}/profiles/${profileId}/`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify({
          data: {
            type: "profile",
            id: profileId,
            attributes: {
              properties: {
                dealer_stage: data.dealerStage,
                application_id: data.applicationId,
                ...data.extra,
              },
            },
          },
        }),
      });
    }
  } else {
    const text = await createRes.text().catch(() => "");
    console.error("[klaviyo] upsertDealerProfile unexpected status", createRes.status, text);
    return;
  }

  // Subscribe to the CineLuxe Dealers list
  if (profileId && process.env.KLAVIYO_LIST_ID) {
    await subscribeToList(profileId);
  }
}

// ─── List subscription ────────────────────────────────────────────────────────

async function subscribeToList(profileId: string): Promise<void> {
  const listId = process.env.KLAVIYO_LIST_ID;
  if (!listId || !apiKey()) return;

  const res = await fetch(`${BASE}/lists/${listId}/relationships/profiles/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ data: [{ type: "profile", id: profileId }] }),
  });

  // 204 = success, 400 can mean already subscribed — both are fine
  if (res.status !== 204 && res.status !== 400) {
    const text = await res.text().catch(() => "");
    console.error("[klaviyo] subscribeToList unexpected status", res.status, text);
  }
}

// ─── Event tracking ───────────────────────────────────────────────────────────

export type DealerEvent =
  | "Dealer Applied"
  | "Dealer Formal Invited"
  | "Dealer Formal Submitted"
  | "Dealer Call Scheduled"
  | "Dealer Call Complete"
  | "Dealer Onboarding Sent"
  | "Dealer Activated"
  | "Dealer Declined";

/**
 * Tracks a named event in Klaviyo for the dealer's email.
 * If the profile doesn't exist yet, Klaviyo creates a stub automatically.
 */
export async function trackDealerEvent(
  email: string,
  eventName: DealerEvent,
  properties?: Record<string, unknown>
): Promise<void> {
  if (!apiKey()) return;

  const res = await fetch(`${BASE}/events/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          profile: {
            data: {
              type: "profile",
              attributes: { email },
            },
          },
          metric: {
            data: {
              type: "metric",
              attributes: { name: eventName },
            },
          },
          properties: properties ?? {},
          time: new Date().toISOString(),
        },
      },
    }),
  });

  if (res.status !== 202) {
    const text = await res.text().catch(() => "");
    console.error("[klaviyo] trackDealerEvent unexpected status", res.status, text);
  }
}
