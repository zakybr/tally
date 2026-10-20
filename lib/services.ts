import type { FaqItem } from "@/lib/seo";

/*
  What Tally sells, in one place. The /services page renders every service as
  a short section with its own anchor (/services#organic-growth), the nav and
  homepage link to those anchors, and the old one-page-per-service URLs
  redirect here. One paragraph each: the detail belongs on the call.

  The Tally line runs through all of them: we sell the tally, not the footage.
  Each service is aimed at an outcome the business can count, not at output.
*/

export type ServiceItem = {
  id: string;
  name: string;
  /* One line for cards and the menu. */
  short: string;
  body: string;
  /* What the outcome is usually measured in. */
  measuredIn: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: "marketing-management",
    name: "Marketing management",
    short: "We run your marketing, aimed at one outcome.",
    body: "Hand us the lot. We set the strategy, make the content, run Instagram and your ads, and send one plain update a week on the number that matters. One team, one outcome, no juggling three suppliers.",
    measuredIn: "Enquiries, bookings or sales",
  },
  {
    id: "organic-growth",
    name: "Organic growth",
    short: "Instagram and Reels that grow and sell.",
    body: "Built on 8 years of growing, monetising and selling Instagram accounts, and more than 100 million views. We find the formats your customers already watch, post on a rhythm, test a new hook every week and drop what does not work. No bought followers.",
    measuredIn: "Reach, followers and DMs",
  },
  {
    id: "paid-ads",
    name: "Paid ads",
    short: "Meta and Instagram ads judged on enquiries.",
    body: "Ads that run through your own account, so every dollar is visible to you. We build the creative, the audiences and the tracking, then judge it on enquiries and sales, not clicks or impressions.",
    measuredIn: "Cost per enquiry or sale",
  },
  {
    id: "content-video",
    name: "Content & video",
    short: "Shoots you own, made to be posted.",
    body: "We come to the boat, the showroom or the shop floor and shoot the real thing: Reels, stills and ad cuts in the formats that perform. You own every frame, and every shoot is planned around what it has to sell.",
    measuredIn: "Assets that earn their place",
  },
  {
    id: "websites",
    name: "Websites & landing pages",
    short: "Sites built to turn visits into enquiries.",
    body: "Fast, simple sites and landing pages that work on a phone, load quickly, rank in search and make it easy to call or enquire. Built to support the ads and content, so the traffic you pay for does not leak.",
    measuredIn: "Enquiries from the site",
  },
  {
    id: "account-recovery",
    name: "Account recovery & username claims",
    short: "Banned account or stolen name, handled.",
    body: "Banned, disabled or restricted business account, or someone sitting on your name? We handle the whole case for you through our Meta representatives. A small deposit opens it and the rest is only payable if it works.",
    measuredIn: "Your account back",
  },
];

export const SERVICE_FAQS: FaqItem[] = [
  {
    question: "Where should I start?",
    answer:
      "With the free audit. We look at your Instagram, ads, website and how customers find you, then tell you which one service would move the needle first. Most businesses start with one and add more once it is working.",
  },
  {
    question: "How much does it cost?",
    answer:
      "It depends on the outcome and how much content needs making. We price it on the first call, after the free audit, so you pay for something aimed at a result rather than a number of posts.",
  },
  {
    question: "Do you buy followers?",
    answer:
      "No. Bought followers never engage, they drag reach down and they can get an account restricted. Everything we report is organic and visible in your own insights.",
  },
  {
    question: "Who owns the content and ad accounts?",
    answer: "You do. Ads run through your own account and you own every photo and video we make.",
  },
  {
    question: "Do you work outside marine and primary industries?",
    answer:
      "Yes. Consumer brands and marine are where we do most of our work, and we also run recruitment and reach for seafood, forestry and horticulture operators.",
  },
];

/* The one service with its own page: urgent, high-intent searches. */
export const RECOVERY = {
  path: "/instagram-account-recovery",
  title: "Instagram account recovery & username claims NZ",
  description:
    "Banned or disabled Instagram business account, or someone using your name? Tally handles unbans and username claims for NZ businesses through our Meta representatives.",
  intro:
    "When a business account is banned, the enquiries and years of posts go with it, and Meta's help pages go in circles. You do not have to work it out. Tally handles unbans and username claims for New Zealand businesses through our Meta representatives, start to finish. You keep your login the whole time and we never ask for your password.",
  handles: [
    {
      name: "Banned & disabled accounts",
      body: "Business accounts disabled for a claimed Community Guidelines breach, including the false positives that catch legitimate businesses, and appeals that have already been declined.",
    },
    {
      name: "Restricted accounts",
      body: "Accounts that can log in but cannot post, advertise, message or be found.",
    },
    {
      name: "Username claims & impersonation",
      body: "Handles that use your business name or trademark, and accounts pretending to be you. If a name cannot be claimed, we tell you straight away and set up the best alternative.",
    },
  ],
  firstSteps: [
    "Screenshot the full notice, including any date or deadline.",
    "Secure the email and Facebook accounts linked to the account.",
    "Do not fire off several appeals, open a new account, or give anyone your password.",
    "Call us with the notice. We tell you on the first call whether the case is worth taking.",
  ],
  faqs: [
    {
      question: "Can you get my banned Instagram account back?",
      answer:
        "In most cases, yes. We take on the case and work it through our Meta representatives until there is a decision. We tell you on the first call whether it is worth taking, and if it is not, you pay nothing.",
    },
    {
      question: "How much does it cost?",
      answer:
        "A small deposit opens the case, and the rest is only payable if the account is reinstated or the username is released. We quote both on the first call.",
    },
    {
      question: "My appeal was already rejected. Is it too late?",
      answer:
        "Usually not. A declined appeal is the most common case we take on. Call us before you try anything else.",
    },
    {
      question: "How long does it take?",
      answer:
        "Anywhere from a few days to a few weeks, depending on why the account was banned and what has already been tried.",
    },
    {
      question: "Can I get a username someone else is using?",
      answer:
        "Often, where the account uses your business name or trademark, or is impersonating you. We check your case on the first call before anything is paid.",
    },
    {
      question: "How do I avoid recovery scams?",
      answer:
        "Walk away from anyone who messages you first, asks for your password or a login code, or wants payment in crypto or gift cards. A real service is a named New Zealand business you can call.",
    },
  ] as FaqItem[],
};
