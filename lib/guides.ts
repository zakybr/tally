import type { FaqItem } from "@/lib/seo";

/*
  The /guides section. Each guide answers one urgent problem search a New
  Zealand business owner types when Instagram goes wrong, gives them the few
  things worth doing straight away, and makes clear that Tally handles the rest
  for them through our Meta representatives. Each one hands off to its service
  page in lib/services.ts.

  Copy rules: NZ English, no em dashes, never promise Meta's decision, never
  suggest sharing a password or login code.

  `title` is the H1 and the <title>; the root layout appends " | Tally", so
  keep it to 52 characters to land at 60 or under. `description` stays at
  160 or under so Google shows it whole.
*/

export type GuideSection = {
  heading: string;
  body: string[];
  steps?: string[];
};

export type Guide = {
  slug: string;
  path: string;
  title: string;
  description: string;
  /* Short label for cards and the related-guides list. */
  shortName: string;
  keywords: string[];
  /* Slug of the service page this guide feeds. */
  service: string;
  published: string;
  updated: string;
  intro: string;
  /* A two or three sentence direct answer, placed first for readers and answer engines. */
  answer: string;
  sections: GuideSection[];
  faqs: FaqItem[];
};

const HANDLE_IT =
  "Tally handles banned and disabled business accounts for New Zealand businesses through our Meta representatives. You send us the notice, we take the case from there and keep you updated. A small deposit opens it, the rest is only payable if the account comes back, and we tell you on the first call whether your case is worth taking.";

export const GUIDES: Guide[] = [
  {
    slug: "instagram-business-account-disabled",
    path: "/guides/instagram-business-account-disabled",
    title: "Instagram business account disabled: what to do",
    description:
      "Instagram business account disabled in New Zealand? What to do in the first 24 hours, what not to do, and how Tally handles the unban for you.",
    shortName: "Account disabled: first steps",
    keywords: [
      "Instagram business account disabled what to do",
      "Instagram account disabled NZ",
      "Instagram business account suspended",
      "Instagram account disabled for no reason",
      "Instagram disabled account business",
    ],
    service: "instagram-account-recovery",
    published: "2026-10-15",
    updated: "2026-10-20",
    intro:
      "You open the app and the account that brings in your enquiries is gone, replaced by a notice saying it has been disabled. Here is what to do in the first 24 hours, and how to hand the rest to people who do this every week.",
    answer:
      "Do not rush an appeal. Screenshot the notice, secure the email and Facebook accounts linked to it, and do not open a replacement account. Then call Tally: we handle the unban process for you through our Meta representatives, so you can get back to running the business.",
    sections: [
      {
        heading: "Work out which problem you have",
        body: [
          "Read the exact wording on the notice. It tells you which of four situations you are in, and each one is handled differently.",
        ],
        steps: [
          "Disabled: you cannot log in and the notice says the account broke the Community Guidelines or Terms of Use.",
          "Suspended: the notice gives you a set period to disagree with the decision. Do not let it run out.",
          "Restricted: you can log in but cannot post, message, advertise or appear in search.",
          "Hacked: your password, email or phone number has changed, or there are posts you did not make.",
        ],
      },
      {
        heading: "Do these three things now",
        body: [],
        steps: [
          "Screenshot the full notice, including any date or deadline.",
          "Change the password on the email linked to the account and turn on two-factor authentication. Do the same for the Facebook profile that runs any linked Page.",
          "Write down what changed in the days before: new staff logins, new devices, apps with access, or a burst of posting.",
        ],
      },
      {
        heading: "What not to do",
        body: [],
        steps: [
          "Do not fire off several appeals in a panic. It usually makes the case harder.",
          "Do not open a new account and start posting as the business.",
          "Do not give your password or login codes to anyone, including people who say they can get the account back.",
          "Do not pay strangers who message you offering recovery.",
        ],
      },
      {
        heading: "Let us handle it",
        body: [HANDLE_IT],
      },
    ],
    faqs: [
      {
        question: "Why was my Instagram business account disabled with no warning?",
        answer:
          "Meta rarely says which post or behaviour triggered it. For legitimate businesses the usual causes are automated detection misreading content, a sudden change in activity, logins from new devices or countries, a flagged linked account, or a third-party app with access.",
      },
      {
        question: "Is a disabled Instagram account deleted?",
        answer:
          "Not straight away. It is hidden and locked while the decision stands, but it can be removed permanently if nothing is done in time. That is why it is worth getting the case started early.",
      },
      {
        question: "Can someone handle the unban for me?",
        answer:
          "Yes. Tally handles the whole process for New Zealand businesses through our Meta representatives. You keep your login, we take the case.",
      },
    ],
  },
  {
    slug: "appeal-disabled-instagram-account",
    path: "/guides/appeal-disabled-instagram-account",
    title: "How to appeal a disabled Instagram account in NZ",
    description:
      "Appealing a disabled Instagram account in New Zealand: what the appeal asks for, why most get declined, and how Tally handles the case for you.",
    shortName: "Appealing a disabled account",
    keywords: [
      "how to appeal a disabled Instagram account",
      "Instagram appeal disabled account",
      "Instagram request a review",
      "Instagram appeal rejected what next",
      "disagree with decision Instagram",
    ],
    service: "instagram-account-recovery",
    published: "2026-10-15",
    updated: "2026-10-20",
    intro:
      "Most owners get one look at the appeal screen, write something in a panic and get an automated no. Here is what the appeal involves, why so many fail, and the faster option: having us handle it.",
    answer:
      "The in-app appeal asks you to disagree with the decision, confirm who you are and explain the account, usually once. Most self-written appeals are declined. Tally handles the whole case for you through our Meta representatives, including accounts where the first appeal has already been rejected.",
    sections: [
      {
        heading: "What the appeal involves",
        body: [
          "When you try to log in, the notice offers a way to disagree with the decision before a deadline. You may be asked to confirm a phone number or email, or record a short video selfie to prove you are a real person who owns the account. There is usually one text box to explain yourself.",
        ],
      },
      {
        heading: "Why most appeals get declined",
        body: [
          "Owners write it in a rush, argue instead of explaining, miss the likely cause, or submit several times and clog their own case. Once it is declined, most people assume that is the end.",
        ],
      },
      {
        heading: "The faster option: we handle it",
        body: [
          HANDLE_IT,
          "Declined appeals are the most common case we take on. If you have already been told no, call us before you try anything else.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many times can I appeal a disabled Instagram account?",
        answer:
          "Usually once through the notice, and refiling the same appeal does not help. That is why it is worth getting it right first time, or having us handle it.",
      },
      {
        question: "My appeal was rejected. What now?",
        answer:
          "A rejected appeal is not always the end. Tally takes on declined cases through our Meta representatives. Call us with the notice and we will tell you whether there is still a way back.",
      },
      {
        question: "Can anyone guarantee my account will be reinstated?",
        answer:
          "No, and you should be wary of anyone who does. What we can tell you, on the first call, is whether your case is worth taking. If it is not, you pay nothing.",
      },
    ],
  },
  {
    slug: "instagram-account-recovery-scams",
    path: "/guides/instagram-account-recovery-scams",
    title: "Instagram recovery scams: how to spot them",
    description:
      "Lost your Instagram and getting offers of help? How to spot account recovery scams, and what a real New Zealand recovery service looks like.",
    shortName: "Spotting recovery scams",
    keywords: [
      "Instagram account recovery scam",
      "Instagram recovery service legit",
      "Instagram hacker recovery scam NZ",
      "fake Instagram support",
      "is Instagram account recovery service real",
    ],
    service: "instagram-account-recovery",
    published: "2026-10-15",
    updated: "2026-10-20",
    intro:
      "Post publicly that your Instagram has been banned or hacked and the offers arrive within the hour. Most of them are scams. Here is how to tell the difference.",
    answer:
      "Walk away from anyone who messages you first, asks for your password or a login code, or wants payment in crypto or gift cards. A real service is a named New Zealand business you can call, leaves you in control of your login, and tells you the cost before you commit.",
    sections: [
      {
        heading: "The warning signs",
        body: ["Any one of these is enough to walk away."],
        steps: [
          "They found you. A comment or DM arrives after you posted about losing the account.",
          "They want your password, a login code or your two-factor backup codes.",
          "They want payment in crypto, gift cards or to a personal overseas account.",
          "They offer to hack the account back. A disabled account is locked by Meta, there is nothing to break into.",
          "They promise it back within hours.",
          "There is no business name, phone number or address you can check.",
        ],
      },
      {
        heading: "What a real service looks like",
        body: [
          "A named, contactable New Zealand business. It never needs your login, tells you on the first call whether your case is worth taking, and puts the price in writing before you commit, with most of it payable only on success.",
          HANDLE_IT,
        ],
      },
      {
        heading: "If you have already been scammed",
        body: [
          "Change the password on your email and any account that shared it, and turn on two-factor authentication. Call your bank if you paid by card or transfer. Report it to Netsafe, and to the Police if you lost money.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are Instagram account recovery services legit?",
        answer:
          "Some are, most of the ones that message you are not. Look for a named New Zealand business you can call, that never asks for your password, and that tells you the cost and your chances before you pay.",
      },
      {
        question: "Can a hacker get my banned Instagram account back?",
        answer:
          "No. A disabled account is locked by Meta, not by a password. People offering to hack it back are after a deposit or your other logins.",
      },
      {
        question: "Where do I report an Instagram scam in New Zealand?",
        answer:
          "Report the scam account in the app, then report it to Netsafe, and to the Police if you lost money. Call your bank straight away if you paid.",
      },
    ],
  },
  {
    slug: "instagram-username-taken-inactive-account",
    path: "/guides/instagram-username-taken-inactive-account",
    title: "Instagram username taken by an inactive account?",
    description:
      "Business name taken on Instagram by an account that never posts? When a username can be claimed back, and how Tally handles the claim for you.",
    shortName: "Username taken by inactive account",
    keywords: [
      "Instagram username taken by inactive account",
      "how to get an inactive Instagram username",
      "claim inactive Instagram handle",
      "Instagram username already taken business",
      "Instagram trademark username NZ",
    ],
    service: "instagram-username-claims",
    published: "2026-10-15",
    updated: "2026-10-20",
    intro:
      "The handle that matches your business name belongs to an account with three posts from 2016. It feels like it should be yours. Here is when it can be claimed back, and how we handle that for you.",
    answer:
      "A username that uses your business name or registered trademark, or an account impersonating your business, can often be claimed back. Tally handles username claims for New Zealand businesses through our Meta representatives. If your handle cannot be claimed, we tell you on the first call and help you set up the best alternative.",
    sections: [
      {
        heading: "When a username can be claimed",
        body: [],
        steps: [
          "The account uses your registered trademark, in New Zealand through IPONZ or overseas.",
          "The account is pretending to be your business, with your name, logo or photos.",
        ],
      },
      {
        heading: "What not to do",
        body: [],
        steps: [
          "Do not offer to buy the handle. It tells the holder the name is worth money and can make the claim harder.",
          "Do not message the holder demanding it.",
          "Do not hand your login to anyone offering to transfer it.",
        ],
      },
      {
        heading: "We handle the claim",
        body: [
          "Tell us the handle and your business details on a call. We check whether there is a claim, then handle it through our Meta representatives and keep you updated. A small deposit opens the case and the rest is only payable if the name is released.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does an Instagram account have to be inactive before the username is released?",
        answer:
          "There is no published period, and inactive handles are not released on request. Claims work where the account uses your trademark or impersonates your business, which is what we check first.",
      },
      {
        question: "Can I get a username if my business is registered with the Companies Office?",
        answer:
          "A company registration helps with an impersonation case. A registered trademark through IPONZ is the strongest position. Either way, call us and we will tell you what applies.",
      },
      {
        question: "Do I need a lawyer to claim an Instagram username?",
        answer:
          "No. Tally handles the claim for you through our Meta representatives.",
      },
    ],
  },
  {
    slug: "grow-business-instagram-new-zealand",
    path: "/guides/grow-business-instagram-new-zealand",
    title: "How to grow a business Instagram in New Zealand",
    description:
      "How to grow a business Instagram in New Zealand without bought followers: formats that reach, posting on NZ time, local discovery and what to measure.",
    shortName: "Growing a business Instagram in NZ",
    keywords: [
      "how to grow a business Instagram in New Zealand",
      "grow Instagram followers NZ business",
      "Instagram tips for small business NZ",
      "Instagram Reels strategy NZ",
      "organic Instagram growth New Zealand",
    ],
    service: "instagram-growth",
    published: "2026-10-15",
    updated: "2026-10-20",
    intro:
      "New Zealand is a small market, which works in your favour on Instagram: fewer accounts compete for the same local audience. This is the short version of the system our team has used for 8 years to grow, monetise and sell Instagram accounts.",
    answer:
      "Post short video in formats your audience already watches, test a new hook every week, use location tags and local collaborations, and measure reach and enquiries rather than likes. Never buy followers. If you would rather it was done for you, book a free audit.",
    sections: [
      {
        heading: "Start from what people already watch",
        body: [
          "Spend an hour on the Reels your customers watch and note the formats that keep coming up: behind the scenes, before and after, quick how-to. Make the best New Zealand version of a format that already works.",
        ],
      },
      {
        heading: "Build a weekly system",
        body: [],
        steps: [
          "Pick two or three formats and make them recurring series.",
          "Shoot in batches. One morning can supply two weeks of Reels.",
          "Test a new hook in the first second every week.",
          "Post three to five times a week on New Zealand time.",
          "Drop whatever underperformed every Monday.",
        ],
      },
      {
        heading: "Measure what pays",
        body: [
          "Likes and followers lag. Watch reach, views from non-followers, watch time, shares, profile visits, and above all the DMs, clicks and bookings that came from content. That is the number that actually moves the business.",
        ],
      },
      {
        heading: "Or have us run it",
        body: [
          "If the account matters to revenue and nobody has time to run it properly, book a free audit. We will show you where the account is now and what is worth going after first.",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should a New Zealand business post on Instagram?",
        answer:
          "Three to five times a week suits most small businesses, mostly Reels. A rhythm you can keep beats a burst of daily posts followed by silence.",
      },
      {
        question: "How long does it take to grow a business Instagram?",
        answer:
          "Reach usually moves within a few weeks of consistent, tested content, and followers compound from there. If nothing moves after two months, change the formats and hooks, not just the frequency.",
      },
      {
        question: "Is it worth hiring an Instagram agency in New Zealand?",
        answer:
          "When the account matters to revenue and nobody has time to run it every week, yes. Pick one that aims at enquiries or sales, not a number of posts per month, and never buys followers.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidesForService(serviceSlug: string) {
  return GUIDES.filter((g) => g.service === serviceSlug);
}
