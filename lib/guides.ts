import type { FaqItem } from "@/lib/seo";

/*
  The /guides section. Each guide answers one urgent problem search a New
  Zealand business owner types when Instagram goes wrong, and hands them to
  the matching service page in lib/services.ts.

  Same copy rules as the services: NZ English, no em dashes, never promise
  Meta's decision, never suggest sharing a password or login code, and only
  name channels Meta actually runs (in-app appeals, Account Status, the
  Instagram Help Centre, instagram.com/hacked, Meta Business Suite and Meta
  Verified support).

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

export const GUIDES: Guide[] = [
  {
    slug: "instagram-business-account-disabled",
    path: "/guides/instagram-business-account-disabled",
    title: "Instagram business account disabled: what to do",
    description:
      "Instagram business account disabled in New Zealand? What to check in the first 24 hours, what not to do, and how to keep the business running while you appeal.",
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
    updated: "2026-10-15",
    intro:
      "You open the app and the account that brings in your enquiries is gone, replaced by a notice saying it has been disabled. This guide covers the first 24 hours: working out what has actually happened, the mistakes that make recovery harder, and how to keep the business trading while the case runs.",
    answer:
      "Do not rush the appeal. First confirm whether the account is disabled, suspended, restricted or hacked, because each has a different route. Screenshot the notice, check Account Status if you can still log in, secure your email and linked Facebook assets, then file one careful appeal through the in-app option on the notice.",
    sections: [
      {
        heading: "Work out which problem you actually have",
        body: [
          "Owners often use \"banned\" for four different situations, and the right next step depends on which one it is. Read the exact wording on the notice before doing anything else.",
        ],
        steps: [
          "Disabled: you cannot log in and the notice says the account was disabled for not following the Community Guidelines or Terms of Use. This is the most serious case and goes through the appeal option on the notice.",
          "Suspended: the notice says the account is suspended and usually offers a way to disagree with the decision within a set period. Act inside that window.",
          "Restricted: you can log in but cannot post, comment, message, advertise or appear in search. Account Status in the app shows what is limited and why.",
          "Hacked: your password, email or phone number has changed, or you see posts and messages you did not make. That is a security problem, not a ban, and starts at instagram.com/hacked.",
        ],
      },
      {
        heading: "Record everything before it changes",
        body: [
          "Take screenshots of the full notice, including any date, reference or deadline it gives. Note when you last logged in, what you posted or changed in the days before, and any new device, location, app or staff member that had access. If the account was linked to Meta Business Suite or an ad account, screenshot what you see there too.",
          "This record does two jobs. It tells you which of the common triggers is likely, and it becomes the evidence for the appeal. Notices can disappear once a decision is made, so capture them now.",
        ],
      },
      {
        heading: "Secure the things that are still yours",
        body: [
          "Change the password on the email address attached to the account and turn on two-factor authentication for it. Do the same for the Facebook profile that administers any linked Page or Business portfolio. Remove third-party apps and scheduling tools you no longer use from those accounts.",
          "If anyone you do not recognise has access to your Business portfolio, remove them. A compromised linked asset is a common reason for an otherwise clean business account being caught up in enforcement.",
        ],
      },
      {
        heading: "What not to do in the first 24 hours",
        body: [
          "Most failed recoveries are made worse in the first day. Avoid these.",
        ],
        steps: [
          "Do not fire off several appeals in a panic. One well-built appeal reads better than five angry ones, and some routes only allow one attempt.",
          "Do not open a new account and start posting as the business straight away. Creating new accounts to get around enforcement can count against you and the new account.",
          "Do not give your password, a login code or your two-factor backup codes to anyone, including people who say they can get the account back.",
          "Do not pay anyone who contacts you first offering recovery, especially in crypto or gift cards. Our scam guide covers the warning signs.",
        ],
      },
      {
        heading: "Keep the business trading while you wait",
        body: [
          "A disabled account can take days or weeks to resolve, and some are never reinstated. Put a short note on your website and Google Business Profile saying Instagram is temporarily unavailable and how customers can reach you instead. Tell regular customers by email or text. Move any paid campaigns you control to channels that are still working.",
          "If you are planning a temporary profile so customers can find you, make it clearly temporary, do not copy the old handle or imply it is the original account, and wait until the appeal is filed.",
        ],
      },
      {
        heading: "Then file the appeal properly",
        body: [
          "Once you know what you are dealing with and have your record, file through the option on the notice itself. Our step-by-step appeal guide covers what to write and what to expect. If the first appeal has already been declined, or the account carries the business's income, that is the point at which a properly managed case is worth paying for.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why was my Instagram business account disabled with no warning?",
        answer:
          "Meta's notices rarely name the post or behaviour that triggered enforcement. For legitimate businesses the usual causes are automated detection misreading content, a sudden change in activity, logins from new devices or countries, a linked account being flagged, or a third-party app with access to the account. Your own record of the days before the notice is the best clue.",
      },
      {
        question: "Is a disabled Instagram account deleted?",
        answer:
          "Not immediately. A disabled account is hidden and locked while the decision stands. The notice explains whether you can disagree with the decision and how long you have to do it. If no review is requested in that window, or a review is declined, the account can be permanently removed.",
      },
      {
        question: "Can I contact Instagram by phone in New Zealand?",
        answer:
          "Instagram does not run a public phone line for account problems. The official channels are the appeal and review options inside the app and on the notice, Account Status, the Instagram Help Centre forms, instagram.com/hacked for compromised accounts, and support through Meta Verified or Meta Business Suite where your account has access to them. Anyone else claiming to be Instagram support by phone is not.",
      },
      {
        question: "Should I start a new Instagram account for my business?",
        answer:
          "Not straight away. Creating accounts to get around enforcement is against Instagram's terms and can lead to the new account being removed too. Use your website, Google Business Profile and email to stay in touch with customers while the appeal is open.",
      },
    ],
  },
  {
    slug: "appeal-disabled-instagram-account",
    path: "/guides/appeal-disabled-instagram-account",
    title: "How to appeal a disabled Instagram account in NZ",
    description:
      "How to appeal a disabled Instagram account in New Zealand: the official review options, what to write, how long it takes and what to do if it is declined.",
    shortName: "How to appeal a disabled account",
    keywords: [
      "how to appeal a disabled Instagram account",
      "Instagram appeal disabled account",
      "Instagram request a review",
      "Instagram appeal rejected what next",
      "disagree with decision Instagram",
    ],
    service: "instagram-account-recovery",
    published: "2026-10-15",
    updated: "2026-10-15",
    intro:
      "Most owners get one look at the appeal screen, write something in a panic and get an automated no. This guide walks through the official review routes for a disabled Instagram account, how to write the appeal, and what is still possible after a decline.",
    answer:
      "Appeal through the disagree or request a review option shown when you try to log in, before the deadline on the notice. Keep it factual: who the business is, why the account is legitimate, and the likely cause if you know it. Complete any identity check Meta asks for, then wait for the result rather than refiling.",
    sections: [
      {
        heading: "The official routes, and only those",
        body: [
          "There is no secret appeal form and no one inside Meta who can be paid to look at your case. The legitimate review routes are these, and which ones are open depends on the type of account and the notice you received.",
        ],
        steps: [
          "The disagree or request a review option on the notice you see when you try to log in to the disabled account.",
          "Account Status in the app, for accounts that can still log in, which lists enforcement against the account and offers a review where one is available.",
          "The Instagram Help Centre, which links to the relevant forms for disabled accounts and identity confirmation.",
          "Meta Business Suite, where restrictions on a linked Facebook Page, ad account or Business portfolio are reviewed separately.",
          "Support through Meta Verified, where the business already subscribes and the subscription is still active.",
        ],
      },
      {
        heading: "Step by step: filing the review",
        body: [
          "The exact screens change from time to time, but the order is consistent.",
        ],
        steps: [
          "Try to log in to the disabled account on the Instagram app with your normal details.",
          "On the notice, choose the option to disagree with the decision or request a review. Note the deadline it gives.",
          "Follow the prompts. You may be asked to confirm a phone number or email address, or to record a short video selfie so Meta can check you are a real person who owns the account.",
          "Where there is a free-text field, use it to explain the business and why the account is genuine.",
          "Submit once, screenshot the confirmation, and watch the email address on the account for a reply.",
        ],
      },
      {
        heading: "What to write in the appeal",
        body: [
          "Reviewers and automated systems both respond better to a short, specific, calm explanation. Write as the business owner, not as an angry customer.",
          "Say who you are and what the business does, with your trading name and NZBN or company number if you have one. Explain that the account is used to run a legitimate New Zealand business. If you know what probably triggered the action, such as a new staff member logging in from overseas or a scheduling app that posted in a burst, say so plainly. Do not argue about other accounts, threaten legal action or paste in long policy quotes.",
        ],
      },
      {
        heading: "How long a review takes",
        body: [
          "Some reviews come back within a day or two. Others take several weeks, especially where an identity check is involved. Refiling the same appeal does not speed it up and can push it back in the queue. Use the time to keep the business trading through other channels.",
        ],
      },
      {
        heading: "If the appeal is declined",
        body: [
          "A declined review is final for that route, but it is not always the end of the case. A linked Facebook Page or Business portfolio may have its own review in Meta Business Suite. Meta Verified support may be available if the business already had it. And if the original notice was a suspension rather than a disable, the options are different again.",
          "This is the point where most owners stop, and where a properly built case still sometimes has a route left. It is also where scammers find people, so read the scam guide before paying anyone.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many times can I appeal a disabled Instagram account?",
        answer:
          "Usually once per decision through the notice. Some accounts see further options in Account Status or the Help Centre, but repeatedly submitting the same appeal does not help and can slow things down. Make the first one count.",
      },
      {
        question: "How long do I have to appeal?",
        answer:
          "The notice on the disabled account states the deadline, and it varies by case. Screenshot it as soon as you see it. If the window closes without a review being requested, the account can be permanently removed.",
      },
      {
        question: "Why does Instagram ask for a video selfie?",
        answer:
          "It is one of the ways Meta confirms that a real person who owns the account is asking for the review. Meta says the video is used for that check. Complete it in the app only, never on a website someone sent you.",
      },
      {
        question: "Can someone guarantee my Instagram account will be reinstated?",
        answer:
          "No. Reinstatement is Meta's decision and no one outside Meta can promise it. A legitimate service will tell you the decision is Meta's, leave you in control of your login, and explain what it controls: the reading of the notice, the evidence, the filing and the follow-up.",
      },
    ],
  },
  {
    slug: "instagram-account-recovery-scams",
    path: "/guides/instagram-account-recovery-scams",
    title: "Instagram recovery scams: how to spot them",
    description:
      "Lost your Instagram and getting offers of help? How to spot account recovery scams, which channels Meta actually runs, and what a real service looks like.",
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
    updated: "2026-10-15",
    intro:
      "Post publicly that your Instagram has been banned or hacked and the offers arrive within the hour. Most of them are scams that take money, the account or both. This guide sets out the warning signs, the channels Meta actually runs, and what separates a real recovery service from the rest.",
    answer:
      "Treat anyone who contacts you first, asks for your password or a login code, wants payment in crypto or gift cards, or claims a contact inside Meta as a scam. Meta's own channels are the in-app appeal, Account Status, the Instagram Help Centre, instagram.com/hacked and Meta Verified support. A legitimate service never needs your login.",
    sections: [
      {
        heading: "The warning signs",
        body: [
          "Any one of these is enough to walk away.",
        ],
        steps: [
          "They found you. A comment, DM or email arrives after you posted about losing the account. Real services do not cold-message people in distress.",
          "They want your password, a six-digit login code, your two-factor backup codes or access to your email. Nobody recovering an account through Meta's channels needs any of these.",
          "They want payment in crypto, gift cards or a transfer to a personal overseas account.",
          "They claim to work at Meta, know someone who does, or have a special portal or \"backend access\".",
          "They promise a guaranteed result or a time frame in hours.",
          "They have no business name you can check, no New Zealand phone number and no physical presence, only a handle and testimonials you cannot verify.",
        ],
      },
      {
        heading: "How the common scams work",
        body: [
          "The fake hacker asks for a deposit to \"break back in\", then for more money for each stage, and stops replying when you refuse. The fake Meta agent sends a link to a page styled like Meta that harvests your login and code, and then takes the account you still had access to. The fake reinstatement service files the same free appeal you could have filed, charges for it, and disappears when Meta says no.",
          "Messages that say your account will be deleted unless you act within hours are also a pattern. Meta's notices do give deadlines, but they appear in the app and on the official notice, not in a DM from a stranger.",
        ],
      },
      {
        heading: "The channels Meta actually runs",
        body: [
          "These are the only official routes. All of them are free to use, and none ask you to hand over your login to a third party.",
        ],
        steps: [
          "The appeal or request a review option on the notice inside the Instagram app.",
          "Account Status in Instagram's settings, for accounts you can still log in to.",
          "The Instagram Help Centre at help.instagram.com and the forms it links to.",
          "instagram.com/hacked for accounts that have been taken over.",
          "Meta Business Suite for linked Pages, ad accounts and Business portfolios.",
          "Support through Meta Verified, for subscribed accounts.",
        ],
      },
      {
        heading: "What a legitimate service looks like",
        body: [
          "A real service is a named, contactable business you can look up. It leaves you in control of your login the whole time, works only through the official channels above, tells you before you pay whether the case is worth taking, and says plainly that reinstatement is Meta's decision. The fee structure is written down before you commit, and most of it should depend on the result.",
        ],
      },
      {
        heading: "If you have already been scammed",
        body: [
          "Change the password on your email and any account that shared it, and turn on two-factor authentication everywhere. If you gave someone access to the Instagram account, start at instagram.com/hacked. Contact your bank straight away if you paid by card or bank transfer. In New Zealand, report the scam to Netsafe and, if money was lost, to the Police.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are Instagram account recovery services legit?",
        answer:
          "Some are, most of the ones that message you are not. A legitimate service is a named business you can contact, never asks for your password or login codes, works only through Meta's official channels, and tells you that reinstatement is Meta's decision rather than guaranteeing it.",
      },
      {
        question: "Can a hacker get my banned Instagram account back?",
        answer:
          "No. A disabled account is locked by Meta, not by a password, so there is nothing to break into. People offering to hack an account back are after a deposit or your other logins.",
      },
      {
        question: "Does Meta ever contact you by DM about your account?",
        answer:
          "Meta communicates about enforcement through notices in the app, Account Status and email from Meta's own domains. Treat a DM or comment from an account claiming to be Meta or Instagram support as a scam, however official it looks.",
      },
      {
        question: "Where do I report an Instagram scam in New Zealand?",
        answer:
          "Report the scam account to Instagram in the app. Report the scam to Netsafe, and to the Police if you lost money. If you paid by card or transfer, call your bank immediately, as the sooner they know the better the chance of stopping the payment.",
      },
    ],
  },
  {
    slug: "instagram-username-taken-inactive-account",
    path: "/guides/instagram-username-taken-inactive-account",
    title: "Instagram username taken by an inactive account?",
    description:
      "Business name taken on Instagram by an account that never posts? What Instagram will and will not do, and when a trademark or impersonation claim works.",
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
    updated: "2026-10-15",
    intro:
      "The handle that matches your business name belongs to an account with three posts from 2016. It feels like it should be yours. This guide explains what Instagram actually does with inactive usernames, the two routes that can release a handle, and what to do if neither applies.",
    answer:
      "Instagram does not hand over a username because the account holding it looks inactive, and it does not take release requests. A handle can be released if the account infringes your registered trademark or impersonates your business, through Meta's official reporting forms. If neither applies, pick a strong alternative and build the brand there.",
    sections: [
      {
        heading: "What Instagram will not do",
        body: [
          "Instagram does not reassign usernames on request, and an account that has not posted for years is not treated as abandoned just because it looks that way. Instagram may remove inactive accounts on its own schedule, but there is no form to ask for that to happen to a specific account, and no way to be told when a handle frees up.",
          "Anyone who offers to get an inactive handle released for a fee, without asking about your trademark, is selling something Meta does not offer.",
        ],
      },
      {
        heading: "Route one: a registered trademark",
        body: [
          "If the username uses a trademark you have registered, in New Zealand through IPONZ or in another country, you can report it through the trademark form linked from the Instagram Help Centre. This applies even if the account is inactive.",
          "A strong report includes the registration number, the country of registration, the goods and services it covers, and a clear explanation of how the account uses the mark. A pending application, a company name on the Companies Office register or a domain name is not a registered trademark, so it is weaker ground.",
        ],
      },
      {
        heading: "Route two: impersonation",
        body: [
          "If the account is pretending to be your business, using your name with your logo, photos or contact details to mislead people, report it through Instagram's impersonation route. This does not need a trademark, but it does need the account to be actively passing itself off as you. An account that simply holds the same word and never posts is not impersonation.",
        ],
      },
      {
        heading: "What not to do",
        body: [],
        steps: [
          "Do not offer to buy the handle. Buying and selling usernames breaks Instagram's terms and can put the account you end up with at risk.",
          "Do not message the holder demanding they hand it over. It tells them the name has value and rarely ends well.",
          "Do not use a service that wants your login or the holder's login to \"transfer\" the name.",
        ],
      },
      {
        heading: "If neither route applies",
        body: [
          "Most businesses are better served by a clear alternative than a long fight. Add a short descriptor that customers would search for, such as a place or what you sell, or a simple suffix like nz or co. Keep it consistent with your website and other socials, and put the same display name on the profile so search still finds you. Then, if the business does not already have one, look at registering a trademark, which strengthens any future claim.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does an Instagram account have to be inactive before the username is released?",
        answer:
          "There is no published period. Instagram may remove inactive accounts on its own schedule but does not release usernames on request or notify anyone when a handle becomes available.",
      },
      {
        question: "Can I get a username if my business name is registered with the Companies Office?",
        answer:
          "A company registration alone is not a trademark, so it is not grounds for a trademark claim. It can support an impersonation report if the account is pretending to be your business. A registered trademark through IPONZ is the stronger position.",
      },
      {
        question: "Is it legal to buy an Instagram username?",
        answer:
          "Buying and selling usernames breaks Instagram's terms of use. The account you end up with can be reclaimed or removed, which is a poor outcome after paying for it.",
      },
      {
        question: "Do I need a lawyer to file a trademark report on Instagram?",
        answer:
          "No. The rights holder or an authorised representative can file through Meta's official form. What matters is that the registration details and the explanation of the infringement are accurate and complete.",
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
    updated: "2026-10-15",
    intro:
      "New Zealand is a small market, which works in your favour on Instagram: fewer accounts compete for the same local audience, and people here engage with businesses they recognise. This guide is the system the Tally team uses to grow accounts organically, adapted for a New Zealand business.",
    answer:
      "Grow a New Zealand business account by posting short video in formats your audience already watches, testing a new hook every week, using location tags and local collaborations for discovery, and measuring reach and non-follower views rather than likes. Never buy followers or join engagement pods, as both suppress reach and risk the account.",
    sections: [
      {
        heading: "Start from what people already watch",
        body: [
          "Before making anything, spend an hour on the Reels and Explore feeds your customers use. Note the formats that keep coming up in your category: the behind-the-scenes walkthrough, the before and after, the quick how-to, the answer to a common question. Your first job is to make the best New Zealand version of a format that already works, not to invent a new one.",
          "Primary industries and trades have an advantage here. A boat coming out of the water, a packhouse at full speed or a crew at first light is content most people never see.",
        ],
      },
      {
        heading: "Build a repeatable weekly system",
        body: [
          "Accounts grow from consistency more than inspiration. A simple system for a small business:",
        ],
        steps: [
          "Pick two or three formats and make them recurring series, so each post is quicker to produce and followers know what to expect.",
          "Shoot in batches. One morning of capture can supply two weeks of Reels.",
          "Write the first second first. The hook decides whether anyone sees the rest, so test a new one every week.",
          "Post on a fixed rhythm you can keep, three to five times a week for most businesses, rather than daily for a fortnight and then nothing.",
          "Review every Monday and drop the format that underperformed.",
        ],
      },
      {
        heading: "Post for New Zealand time",
        body: [
          "If your customers are here, post when they are scrolling here. Scheduling tools and agencies set up overseas often default to another time zone. Check that your posts go out on New Zealand time, adjust when daylight saving changes, and use the Most active times view in your own Instagram Insights rather than a generic best time to post chart.",
        ],
      },
      {
        heading: "Use local discovery",
        body: [
          "Tag a specific location on posts and Reels, use a few hashtags that describe the place and what you do rather than thirty generic ones, and collaborate with other local businesses through Collab posts so the content appears on both accounts. Reply to comments quickly in the first hour, and answer DMs, because conversation is one of the clearest signals that a post deserves wider reach.",
        ],
      },
      {
        heading: "Measure the right numbers",
        body: [
          "Likes and follower count are lagging signals. Each week, look at reach, the share of views from non-followers, average watch time on Reels, shares and saves, and profile visits. If the account has to sell, track the DMs, link clicks and bookings that came from content. These tell you whether the system is working long before the follower count moves.",
        ],
      },
      {
        heading: "What to avoid",
        body: [
          "Bought followers never engage, which tells Instagram your content is not worth showing, and they can get an account restricted. Engagement pods and follow-unfollow tools carry the same risk. Reposting other people's content without permission invites copyright strikes. If your account is already restricted or disabled, fix that first, because growth on a limited account is wasted work.",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should a New Zealand business post on Instagram?",
        answer:
          "Three to five times a week suits most small businesses, with Reels making up most of it. A rhythm you can keep for months beats a burst of daily posts followed by silence.",
      },
      {
        question: "How long does it take to grow a business Instagram?",
        answer:
          "Most accounts posting tested, consistent content see reach move within a few weeks, with follower growth compounding over the following months. If nothing has moved after eight weeks, the formats or hooks need to change, not just the posting frequency.",
      },
      {
        question: "Should I pay for Instagram ads to grow followers?",
        answer:
          "Ads are useful for reaching a defined audience with an offer, but paying for follows rarely builds an engaged account. Grow reach with organic content first, then use ads to put your best-performing posts in front of the right people.",
      },
      {
        question: "Is it worth hiring an Instagram agency in New Zealand?",
        answer:
          "It is worth it when the account matters to revenue and nobody in the business has the time to produce and test content every week. Look for an agency that agrees a measurable figure, such as reach or enquiries, rather than a number of posts per month, and that never buys followers.",
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
