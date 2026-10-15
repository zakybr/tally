import type { Vertical } from "@/lib/verticals";

/*
  Instagram service pages. Same shape as a sector page so they share the
  VerticalPage layout, but they are services rather than sectors: they sit
  under their own nav group, link to each other rather than to the sectors,
  and lead with a direct line to Zak, because an owner whose account has just
  gone down wants a person today, not a questionnaire.

  Copy rules for these three. Recovery and handle work is a category full of
  scams, so every page says plainly what Tally will never do (ask for a
  password, promise Meta's decision, buy anything from a "Meta insider") and
  only claims the channels that actually exist.
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
      "Banned or disabled Instagram business account in New Zealand? Tally runs the appeal through Meta's official channels. Small deposit, success fee only on reinstatement.",
    keywords: [
      "banned Instagram account recovery NZ",
      "Instagram account disabled New Zealand",
      "Instagram business account suspended",
      "recover disabled Instagram account",
      "Instagram account unban service",
      "Instagram appeal help NZ",
      "Meta account restricted appeal",
    ],
    intro:
      "When a business account is disabled, the enquiries, the bookings and years of posts go with it, and Meta's own help pages loop. Tally works banned and disabled Instagram business accounts back through Meta's official appeal and support routes for New Zealand businesses, with a small deposit to open the case and the rest only on reinstatement.",
    pain: "Most owners get one shot at the in-app appeal, write it in a panic, and get an automated no. Then the internet offers them a stranger who wants the password and a crypto payment. Neither gets an account back. What does is a correctly built case, sent through the right channel, followed up until a human reviews it.",
    approach:
      "We start with a free read of the notice you received and tell you on the first call whether the case is worth taking. If it is, we build the appeal evidence, file through the official routes that apply to your account, and chase it. You keep your login the whole time. We never ask for your password, and we never promise Meta's decision, because no one outside Meta can.",
    outcomesHeading: "What we handle",
    outcomes: [
      {
        name: "Disabled business accounts",
        body: "Accounts disabled for a claimed breach of Community Guidelines, including the false positives that catch legitimate businesses.",
      },
      {
        name: "Suspended and restricted accounts",
        body: "Accounts that can log in but cannot post, advertise, message or be found, where the restriction is costing you enquiries.",
      },
      {
        name: "Failed first appeals",
        body: "Cases where the in-app appeal has already come back declined, which is where most owners stop and where a properly built case can still have routes left.",
      },
    ],
    cta: { label: "Call Zak now", href: "tel:+64223053853" },
    faqs: [
      {
        question: "Can you get my banned Instagram account back?",
        answer:
          "Often, but no one can promise it, and anyone who does is selling something. Reinstatement is Meta's decision. What Tally controls is the case: reading the notice correctly, building the evidence, filing through every official route open to your account and following up until it is reviewed. That is why most of the fee is paid on reinstatement rather than up front.",
      },
      {
        question: "How much does Instagram account recovery cost?",
        answer:
          "A small fixed deposit opens the case and covers assessment and filing. The success fee is only payable if the account is reinstated. Both figures are quoted on the first call, before you pay anything, and depend on the type of account and how far the case has already gone.",
      },
      {
        question: "Do you need my Instagram password?",
        answer:
          "No, and you should not give it to anyone who asks. You keep full control of your login throughout. Appeals are filed by the account owner or through the business's own Meta access, with Tally preparing and managing the case.",
      },
      {
        question: "Why was my Instagram business account disabled?",
        answer:
          "Meta usually cites a Community Guidelines or Terms of Use breach and rarely says which post or behaviour triggered it. Common triggers for legitimate businesses include automated detection misreading content, sudden activity spikes, logins from new devices or countries, a linked account being flagged, and third-party apps with access to the account. Knowing which one applies changes how the appeal should be written.",
      },
      {
        question: "How long does it take to recover a disabled Instagram account?",
        answer:
          "Anywhere from a few days to several weeks. It depends on the reason given, whether an appeal has already been declined, and which review routes are still open. Tally gives you an honest read of the likely timeline on the first call and updates you as the case moves.",
      },
      {
        question: "My appeal was already rejected. Is it too late?",
        answer:
          "Not always. A declined in-app appeal closes one route, not necessarily all of them. Whether others remain depends on the account type and the notice, which is exactly what the free first read is for. If no credible route is left, we tell you and you pay nothing.",
      },
      {
        question: "Do you handle Facebook pages and Meta ad accounts too?",
        answer:
          "Ask on the first call. Instagram business accounts are the core of the service. Where a linked Facebook page or Business portfolio is part of the same problem, we will tell you straight away whether it is a case we take.",
      },
      {
        question: "How do I avoid Instagram recovery scams?",
        answer:
          "Walk away from anyone who asks for your password or a login code, wants payment in crypto or gift cards, claims to know someone inside Meta, or contacts you first after you posted about being banned. A legitimate service is a named, contactable business, leaves you in control of the account and tells you before you pay whether the case is worth running.",
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
      "Someone holding your business name on Instagram? Tally files username claims for New Zealand businesses through Meta's trademark and impersonation channels. Success-fee based.",
    keywords: [
      "Instagram username claim NZ",
      "claim Instagram handle",
      "get Instagram username back",
      "Instagram trademark username claim",
      "Instagram impersonation report business",
      "Instagram handle squatting",
    ],
    intro:
      "Your business name is on the sign, the website and the trademark register, and someone else is sitting on it on Instagram. Tally files username claims for New Zealand businesses through the routes Meta actually honours, trademark and impersonation, with the case built properly the first time.",
    pain: "The common advice is to message the holder or ask Instagram to release an inactive handle. The first invites a ransom, and the second is not something Instagram does on request. The routes that work are narrower than people think, and they reward a clean, evidenced filing.",
    approach:
      "We check your grounds before you pay anything: whether you hold a registered trademark in New Zealand or elsewhere, whether the account is impersonating your business, and whether it is causing confusion. If there is a credible route, we file it and follow it up. If there is not, we say so, and suggest the handle that will serve you while the brand builds.",
    outcomesHeading: "What we handle",
    outcomes: [
      {
        name: "Trademark-based claims",
        body: "Handles that use your registered trademark, filed through Meta's intellectual property reporting with the registration evidence assembled for you.",
      },
      {
        name: "Impersonation takedowns",
        body: "Accounts pretending to be your business, using your name, logo or photos to mislead your customers.",
      },
      {
        name: "Grounds check and fallback",
        body: "An honest read of whether a claim can succeed, and a fallback handle plan when it cannot, so you are not paying to chase a dead end.",
      },
    ],
    cta: { label: "Call Zak now", href: "tel:+64223053853" },
    faqs: [
      {
        question: "Can I get an Instagram username that someone else is using?",
        answer:
          "Sometimes. Instagram does not hand over a username because it looks inactive or because you want it. It does act where an account infringes a registered trademark or impersonates a business. Tally checks which of those applies to you before any money changes hands.",
      },
      {
        question: "Do I need a registered trademark to claim a username?",
        answer:
          "For a trademark claim, yes: a registered mark, in New Zealand through IPONZ or in another country, is the strongest ground. Without one, impersonation is the main route, which only applies if the account is pretending to be your business. If neither fits, we will tell you on the first call.",
      },
      {
        question: "How much does a username claim cost?",
        answer:
          "A small deposit opens the case and covers the grounds check and filing. The success fee is payable only if the username is released or the impersonating account is removed. Both are quoted before you commit.",
      },
      {
        question: "Should I just message the person holding my username?",
        answer:
          "Usually not first. Offering to buy a handle tells the holder it is worth money and can make a later claim harder to argue. Buying and selling usernames also breaks Instagram's terms, which can put the account you end up with at risk.",
      },
      {
        question: "Can you get an inactive Instagram account released?",
        answer:
          "Not on request, and be wary of anyone who says they can. Instagram removes inactive accounts on its own schedule and does not take release requests. If the inactive account uses your trademark, a trademark claim may still apply, which is what we check first.",
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
      "Instagram growth and management for New Zealand businesses, from a team that has grown accounts past 100 million views. Organic reach, no bought followers, a number agreed upfront.",
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
      "The Tally team has grown Instagram accounts to large followings and past 100 million views, organically. We now run that same system for New Zealand businesses: the strategy, the content, the posting and the weekly read on what is working, aimed at a reach number agreed before we start.",
    pain: "Most small business accounts post when there is time, measure likes, and wonder why the follower count has not moved in a year. Most social media managers sell a number of posts a month. Neither is a growth system, and posts per month is not a result anyone can bank.",
    approach:
      "We find the formats your audience already watches, build a repeatable content system around them, and test hooks every week, killing what underperforms. No bought followers, no engagement pods, nothing that puts the account at risk. You get one update a week against the agreed figure, and the same miss clause as every Tally engagement.",
    outcomesHeading: "Outcomes we guarantee",
    outcomes: [
      {
        name: "Qualified reach",
        body: "An agreed number of accounts reached in your actual market, measured in Instagram's own insights, not vanity impressions bought elsewhere.",
      },
      {
        name: "Follower growth",
        body: "Real followers from organic content and Reels, built to keep compounding after the engagement ends.",
      },
      {
        name: "Enquiries from Instagram",
        body: "Where the account has to sell, a countable number of DMs, link clicks or bookings traced back to content.",
      },
    ],
    cta: { label: "Start the Proof", href: "/contact" },
    faqs: [
      {
        question: "Can you grow my business Instagram account?",
        answer:
          "That is the service. The team behind Tally has grown accounts to large followings and past 100 million views organically, including @theanalystagenda at 35k followers. We scope a reach or follower figure on the first call and say whether we think it is achievable before you pay anything.",
      },
      {
        question: "Do you buy followers or use engagement pods?",
        answer:
          "No. Bought followers never engage, so they drag down reach, and they can get an account restricted. Every follower and view we report comes from organic content and is visible in your own Instagram insights.",
      },
      {
        question: "How much does Instagram management cost in New Zealand?",
        answer:
          "It depends on the figure being guaranteed and how much content needs making. The engagement starts with a fixed-scope eight-week Proof sprint against one agreed number, then moves to a monthly retainer if it is working. The price is set on the first call, once the target is agreed.",
      },
      {
        question: "How long does it take to grow on Instagram?",
        answer:
          "Most accounts show movement in reach within the first few weeks of consistent, tested content, and follower growth compounds from there. The eight-week Proof sprint is long enough to see whether the system is working on your account, and short enough that you are not locked in if it is not.",
      },
      {
        question: "Do you only work with primary industries and marine businesses?",
        answer:
          "No. Instagram growth is open to any New Zealand business with a product or story worth watching. Primary and marine operators get the added benefit that Tally already shoots on boats, yards, orchards and plants.",
      },
      {
        question: "What if my account has been banned or restricted?",
        answer:
          "That comes first, because growth on a restricted account is wasted work. Tally also runs banned Instagram account recovery and username claims, so the account can be recovered and then grown by the same team.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
