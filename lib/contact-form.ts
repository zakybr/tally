/*
  The /contact form's options and its email-or-mobile check, shared by the
  browser and /api/contact so both sides agree on what is valid.

  Each option's `value` is the HubSpot internal name of that dropdown option
  on the matching contact property (tally_need, tally_sector, tally_timing).
*/

export type Option = { label: string; value: string };

export const NEEDS: Option[] = [
  { label: "Instagram growth", value: "instagram_growth" },
  { label: "Banned account recovery", value: "banned_account_recovery" },
  { label: "Username claim", value: "username_claim" },
  { label: "Bookings", value: "bookings" },
  { label: "Enquiries", value: "enquiries" },
  { label: "Staff", value: "staff" },
  { label: "Getting known", value: "getting_known" },
  { label: "Not sure", value: "not_sure" },
];

export const SECTORS: Option[] = [
  { label: "Consumer brand", value: "consumer_brand" },
  { label: "Creator or personal account", value: "creator_personal" },
  { label: "Seafood", value: "seafood" },
  { label: "Marine & boat building", value: "marine_boat_building" },
  { label: "Charter & tourism", value: "charter_tourism" },
  { label: "Forestry", value: "forestry" },
  { label: "Horticulture", value: "horticulture" },
  { label: "Food processing", value: "food_processing" },
  { label: "Other", value: "other" },
];

export const TIMINGS: Option[] = [
  { label: "Now", value: "now" },
  { label: "This summer", value: "this_summer" },
  { label: "Later this year", value: "later_this_year" },
  { label: "Just looking", value: "just_looking" },
];

export const labelFor = (options: Option[], value: string) =>
  options.find((o) => o.value === value)?.label ?? "";

export const isOption = (options: Option[], value: string) =>
  options.some((o) => o.value === value);

export const CALENDLY_URL = "https://calendly.com/zak-tallynz/client-discovery";

export type ParsedContact = { type: "email" | "phone"; value: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
  An email address, or a New Zealand number: any 02x mobile, or a landline on
  03 / 04 / 06 / 07 / 09, with or without +64 and with any spacing. Wider than
  the original 021-029 and 09 list on purpose: 03 is the whole South Island,
  where much of the seafood and forestry trade sits. Phones come back
  in E.164 (+6421...) so the same number typed two ways is one HubSpot contact.
  Any email domain is fine: xtra, gmail and outlook are normal here.
*/
export function parseContact(input: string): ParsedContact | null {
  const raw = input.trim();
  if (!raw) return null;
  if (raw.includes("@")) {
    return EMAIL.test(raw) ? { type: "email", value: raw.toLowerCase() } : null;
  }
  let digits = raw.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+64")) digits = `0${digits.slice(3)}`;
  else if (digits.startsWith("0064")) digits = `0${digits.slice(4)}`;
  else if (digits.startsWith("64") && digits.length >= 10) digits = `0${digits.slice(2)}`;
  if (!/^0(2\d{7,9}|[34679]\d{7})$/.test(digits)) return null;
  return { type: "phone", value: `+64${digits.slice(1)}` };
}
