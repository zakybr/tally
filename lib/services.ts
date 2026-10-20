import type { Vertical } from "@/lib/verticals";

/*
  Instagram service pages. Same shape as a sector page so they share the
  VerticalPage layout, but they are services rather than sectors: they sit
  under their own nav group, link to each other rather than to the sectors,
  and lead with a direct line to Zak, because an owner whose account has just
  gone down wants a person today, not a questionnaire.

  The message on every one: Tally handles the whole process, through our Meta
  representatives, and the owner does not have to work out the appeal system.
  Never ask for a password and never promise Meta's decision.
*/

export type Service = Vertical & {
  outcomesHeading: string;
  cta: { label: string; href: string };
};

export const SERVICES: Service[] = [
  {
    slug: "instagram-account-recovery",
    path: "/instagram-account-recovery",
    name: "Banned Instagram account recovery",
    shortName: "Account recovery",
    eyebrow: "Service · Account recovery",
    title: "Banned Instagram account recovery New Zealand",
    description:
      "Banned or disabled Instagram business account in New Zealand? Tally handles the whole unban process for you through our Meta representatives. Call now.",
    keywords: [
      "banned Instagram account recovery NZ",
      "Instagram account disabled New Zealand",
      "Instagram business account suspended",
      "recover disabled Instagram account",
      "Instagram account unban service",
      "Instagram unban NZ",
      "Meta account restricted help",
    ],
    intro:
      "When a business account is banned, the enquiries and years of posts go with it, and Meta's help pages go in circles. You do not have to work it out. Tally handles the whole unban process for you through our Meta representatives, start to finish.",
    outcomesHeading: "What we handle",
    outcomes: [
      {
        name: "Banned & disabled accounts",
        body: "Business accounts disabled for a claimed Community Guidelines breach, including the false positives that catch legitimate businesses.",
      },
      {
        name: "Restricted accounts",
        body: "Accounts that can log in but cannot post, advertise, message or be found.",
      },
      {
        name: "Declined appeals",
        body: "Cases where you have already appealed and been told no. That is where most owners stop, and where we start.",
      },
    ],
    cta: { label: "Call Zak now", href: "tel:+64223053853" },
    faqs: [
      {
        question: "Can you get my banned Instagram account back?",
        answer:
          "In most cases, yes. We take on the case, prepare it and work it through our Meta representatives until there is a decision. We tell you on the first call whether your case is worth taking, and if it is not, you pay nothing.",
      },
      {
        question: "What do I have to do?",
        answer:
          "Very little. Send us the notice you received and answer a few questions on a call. We handle everything after that and keep you updated. You keep your login the whole time and we never ask for your password.",
      },
      {
        question: "How much does Instagram account recovery cost?",
        answer:
          "A small deposit opens the case, and the rest is only payable if the account is reinstated. We quote both on the first call before you commit to anything.",
      },
      {
        question: "How long does it take?",
        answer:
          "Anywhere from a few days to a few weeks, depending on why the account was banned and whether an appeal has already been declined. We give you an honest timeline on the first call.",
      },
      {
        question: "My appeal was already rejected. Is it too late?",
        answer:
          "Usually not. A declined appeal is the most common situation we take on. Call us and we will tell you straight away whether there is still a way back.",
      },
      {
        question: "Do you handle Facebook pages and Meta ad accounts too?",
        answer:
          "Yes, where they are part of the same problem. Tell us what is locked on the first call and we will say whether it is a case we take.",
      },
    ],
  },
  {
    slug: "instagram-username-claims",
    path: "/instagram-username-claims",
    name: "Instagram username claims",
    shortName: "Username claims",
    eyebrow: "Service · Username claims",
    title: "Instagram username claims New Zealand",
    description:
      "Someone holding your business name on Instagram? Tally handles username claims and impersonation takedowns for New Zealand businesses through our Meta representatives.",
    keywords: [
      "Instagram username claim NZ",
      "claim Instagram handle",
      "get Instagram username back",
      "Instagram trademark username claim",
      "Instagram impersonation removal business",
      "Instagram handle squatting",
    ],
    intro:
      "Your business name is on the sign and the website, and someone else is sitting on it on Instagram, or pretending to be you. Tally handles the claim for you through our Meta representatives, so you get your name back without fighting the system yourself.",
    outcomesHeading: "What we handle",
    outcomes: [
      {
        name: "Username claims",
        body: "Handles that use your business name or registered trademark, claimed back for your business.",
      },
      {
        name: "Impersonation takedowns",
        body: "Accounts pretending to be your business, using your name, logo or photos to mislead customers.",
      },
      {
        name: "A plan B when there is no claim",
        body: "If the handle cannot be claimed, we tell you straight away and set up the name that will work for you instead.",
      },
    ],
    cta: { label: "Call Zak now", href: "tel:+64223053853" },
    faqs: [
      {
        question: "Can you get an Instagram username that someone else is using?",
        answer:
          "Often, yes. Where an account uses your business name or trademark, or is impersonating you, we handle the claim through our Meta representatives. We check your case on the first call before anything is paid.",
      },
      {
        question: "Do I need a registered trademark?",
        answer:
          "It helps, and it is the strongest ground, but it is not the only one. Impersonation cases do not need one. Tell us the handle and we will tell you what applies.",
      },
      {
        question: "How much does a username claim cost?",
        answer:
          "A small deposit opens the case, and the rest is only payable if the username is released or the impersonating account is removed. Both are quoted before you commit.",
      },
      {
        question: "Should I just message the person holding my username?",
        answer:
          "Usually not. Offering to buy it tells the holder it is worth money and can make the claim harder. Talk to us first.",
      },
    ],
  },
  {
    slug: "instagram-growth",
    path: "/instagram-growth",
    name: "Instagram growth and management",
    shortName: "Instagram growth",
    eyebrow: "Service · Instagram growth",
    title: "Instagram growth agency New Zealand",
    description:
      "Instagram growth and management for New Zealand businesses from a team with 8 years of growing, monetising and selling Instagram accounts. 100M+ views. Free audit.",
    keywords: [
      "Instagram growth agency NZ",
      "Instagram management New Zealand",
      "social media management NZ",
      "Instagram marketing agency New Zealand",
      "grow Instagram followers NZ business",
      "Instagram Reels strategy NZ",
      "organic Instagram growth",
    ],
    intro:
      "We have spent 8 years growing Instagram accounts, monetising them and selling them, with more than 100 million views along the way. Now we run that system for New Zealand businesses, aimed at the outcome that actually matters to you: enquiries, bookings or sales, not just followers.",
    outcomesHeading: "What we move",
    outcomes: [
      {
        name: "Enquiries & sales from Instagram",
        body: "DMs, link clicks, bookings and sales traced back to the content that brought them.",
      },
      {
        name: "Reach in your real market",
        body: "The people who could actually buy from you, measured in Instagram's own insights.",
      },
      {
        name: "Followers that compound",
        body: "Real followers from organic Reels, built to keep growing after we hand over.",
      },
    ],
    cta: { label: "Get a free audit", href: "/audit" },
    faqs: [
      {
        question: "Can you grow my business Instagram account?",
        answer:
          "That is the service. Our team has spent 8 years growing, monetising and selling Instagram accounts, with more than 100 million views. The free audit shows where your account is now and what is worth going after first.",
      },
      {
        question: "Do you buy followers or use engagement pods?",
        answer:
          "No. Bought followers never engage, so they drag reach down, and they can get an account restricted. Everything we report comes from organic content and is visible in your own insights.",
      },
      {
        question: "How much does Instagram management cost in New Zealand?",
        answer:
          "It depends on the outcome and how much content needs making. We price it on the first call, after the free audit.",
      },
      {
        question: "Do you only work with marine and primary industries businesses?",
        answer:
          "No. Instagram growth is open to any New Zealand business with a product or story worth watching. Consumer brands and marine are where we do most of our work.",
      },
      {
        question: "What if my account has been banned or restricted?",
        answer:
          "That comes first. We also handle banned account recovery and username claims through our Meta representatives, so the same team can get the account back and then grow it.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
