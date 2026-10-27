import type { FaqItem } from "@/lib/seo";

/*
  What Tally sells, in one place. Each service has its own page at
  /services/<slug>, built from the content below by app/services/[slug]. The
  /services hub keeps one short section per service under its old anchor
  (/services#paid-ads still lands), and each section links to the full page.

  The Tally line runs through all of them: we sell the tally, not the footage.
  Each service is aimed at an outcome the business can count, never a promise.
  Proof is limited to what the business can stand behind: 8 years and 100M+
  organic views. No client names, reviews or invented figures.
*/

export type Card = { title: string; body: string };
export type Block = { heading: string; body: string[] };

export type ServicePage = {
  slug: string;
  /* The section id on the /services hub. Kept from the old one-page site so inbound anchors still land. */
  anchor: string;
  name: string;
  /* One line for cards and the menu. */
  short: string;
  /* Two or three sentences for the hub. */
  hub: string;
  /* Descriptive anchor text for links to this page from elsewhere. */
  linkText: string;
  measuredIn: string;
  serviceType: string;
  /* Published starting price in NZD. Goes into the Service schema as an Offer. */
  priceFrom?: number;
  /* Content date, used for the sitemap's lastmod. */
  updated: string;
  title: string;
  description: string;
  ogAlt: string;
  h1: string;
  h1Accent: string;
  /* 40 to 60 words, quotable on its own. */
  intro: string;
  whoFor: { heading: string; intro: string; cases: Card[] };
  steps: { heading: string; items: Card[] };
  extra: Block[];
  measured: Block;
  proof: Block;
  pricing: Block;
  faqs: FaqItem[];
  related: string[];
  industries: string[];
};

const UPDATED = "2026-10-25";

const NO_PROMISE =
  "Tally does not promise results or set contractual targets. Results depend on your product, your pricing, your season and how quickly enquiries are answered, and some of that sits with you. What we commit to is the work, the weekly update and a straight answer when something is not working.";

const BUILT_ON =
  "The team behind Tally has spent 8 years growing Instagram accounts, monetising them and selling them, and accounts we have run have passed 100 million organic views between them.";

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "marketing-management",
    anchor: "marketing-management",
    name: "Marketing management",
    short: "We run your social media and marketing, aimed at one outcome.",
    hub: "Hand us the lot. We set the strategy, make the content, run Instagram and your Meta ads, and send one plain update a week on the number that matters. One team and one outcome, instead of three suppliers nobody is coordinating.",
    linkText: "Social media agency in Auckland",
    measuredIn: "Enquiries, bookings or sales",
    serviceType: "Social media management",
    updated: UPDATED,
    title: "Social Media Agency in Auckland, Fully Managed | Tally",
    description:
      "Social media agency in Auckland running strategy, content, Instagram and Meta ads as one team, with a weekly update on the number that matters. Free audit.",
    ogAlt: "Tally social media agency, Auckland and New Zealand",
    h1: "Social media agency",
    h1Accent: "in Auckland",
    intro:
      "Tally is a social media agency based in Auckland, working with consumer, marine and primary industries businesses across New Zealand. We take over the whole job: strategy, content, Instagram, Meta ads and reporting, run by one team and aimed at one outcome the business can count, such as enquiries, bookings or sales.",
    whoFor: {
      heading: "Who hands us their social media",
      intro:
        "Marketing management suits a business that knows social media matters but has nobody whose job it is. It usually looks like one of these.",
      cases: [
        {
          title: "The owner posts at night",
          body: "Posts go up when there is time, which is rarely in the busy months. The account looks quiet at exactly the moment customers are checking it.",
        },
        {
          title: "Three suppliers, nobody in charge",
          body: "A photographer, an ads freelancer and someone helping with Instagram, each doing their part, and nobody looking at whether enquiries actually went up.",
        },
        {
          title: "A marketing hire is not worth it yet",
          body: "A full-time marketer is a large salary for a business that needs skilled work for part of the week. Outsourced marketing gives you the team without the headcount.",
        },
        {
          title: "A season that starts early",
          body: "Dealers, charters, hospitality and seasonal employers need the work running months before the season, not the week it opens.",
        },
      ],
    },
    steps: {
      heading: "What we do each month",
      items: [
        {
          title: "Free audit and one outcome",
          body: "We look at your Instagram, ads, website and how customers find you now, then agree the one number we are working on. Everything after that is planned around it.",
        },
        {
          title: "A plan you can read in five minutes",
          body: "Which formats, how often, what the ads will test and what a good month looks like. A short plan you will actually read, not a long strategy deck.",
        },
        {
          title: "Content made and posted",
          body: "We shoot or gather the content, write the captions and post on a steady rhythm to Instagram and Facebook. You approve as much or as little as you want to.",
        },
        {
          title: "Ads run in your own account",
          body: "Meta ads go through your own ad account, so every dollar of spend is visible to you. We build the campaigns, the audiences and the tracking.",
        },
        {
          title: "One plain update a week",
          body: "The number we agreed, what we tried, what worked and what we are dropping. Short enough to read on a phone between jobs.",
        },
      ],
    },
    extra: [
      {
        heading: "Working with an Auckland team",
        body: [
          "As a social media marketing agency based in Auckland, we can arrange shoots and meetings around the region at short notice. Most of the management work runs remotely, which is also how we work with businesses elsewhere in New Zealand: calls, shared folders and the weekly update, with shoots planned around where you are.",
          "You deal with the people doing the work. Zak runs strategy and delivery, Jonty runs the creative system, and either of them will pick up the phone.",
        ],
      },
    ],
    measured: {
      heading: "How it is measured",
      body: [
        "Marketing management is judged on the outcome we agree at the start: enquiries, bookings or sales, and for some businesses the cost of each one. Reach, followers and engagement are reported too, but as signs the work is heading the right way rather than as the result.",
        NO_PROMISE,
      ],
    },
    proof: {
      heading: "What it is built on",
      body: [
        BUILT_ON,
        "That is where the method comes from: find the formats people already watch, post on a rhythm, test a new hook every week and drop what does not work. Ads then put money behind what has already proved itself.",
      ],
    },
    pricing: {
      heading: "What it costs",
      body: [
        "We quote on the first call after the free audit, once we know the outcome, how much content needs making and whether ads are part of it. You pay for work aimed at a result, not for a number of posts.",
        "Ad spend is separate. It is paid straight to Meta from your own ad account, at a budget you set.",
      ],
    },
    faqs: [
      {
        question: "How much does social media management cost in Auckland?",
        answer:
          "It depends on the outcome, how much content needs making and whether ads are included, so we quote after the free audit rather than from a price list. Ad spend is separate and paid from your own Meta ad account. The quote covers the work itself and is agreed before anything starts, so you can compare it fairly with a hire or another agency.",
      },
      {
        question: "Is outsourced marketing cheaper than hiring a marketing manager?",
        answer:
          "Usually, for a business that needs skilled work for part of the week rather than a person on site every day. A full-time hire is one salary for one set of skills, while an outsourced team covers strategy, content, ads and reporting for a fee sized to the work. The free audit sets out what the work involves so you can compare the two properly.",
      },
      {
        question: "Which social media platforms do you manage?",
        answer:
          "Instagram and Facebook, where most New Zealand consumer and marine customers already are, and the Meta ads that run across both. We would rather run two platforms well than five badly. If another platform suits your customers and your outcome better, the free audit will say so plainly.",
      },
      {
        question: "Do I have to approve every post?",
        answer:
          "No, but you can. Some clients approve each post and others approve a monthly plan and let us run it. We agree how approvals work in the first week and you can change it at any time. Either way, nothing goes out that contradicts your pricing, your policies or your brand.",
      },
      {
        question: "How long does social media management take to show results?",
        answer:
          "Expect the first few weeks to go on setting up and testing, and a few months of consistent work before the trend in enquiries or bookings is clear. Ads can produce enquiries sooner than organic content, which builds more slowly. The weekly update shows what is moving from the first week, so you are never waiting blind.",
      },
      {
        question: "Do you only manage social media for Auckland businesses?",
        answer:
          "No. We are based in Auckland and work with businesses across New Zealand. Auckland clients can have us on site for shoots and meetings at short notice. For everyone else, most of the work runs over calls, shared folders and the weekly update, with shoots planned around where you are.",
      },
      {
        question: "Who owns the accounts and the content?",
        answer:
          "You do. Your Instagram account, Facebook page and ad account stay in your business's name, and we work inside them with our own access. Every photo and video we make is yours to keep using. If you stop working with us, there is nothing to hand back and nothing to rebuild.",
      },
    ],
    related: ["instagram-marketing", "meta-ads", "content-video"],
    industries: ["consumer-brands", "marine"],
  },
  {
    slug: "instagram-marketing",
    anchor: "organic-growth",
    name: "Instagram marketing",
    short: "Instagram and Reels that grow an account and sell.",
    hub: "Built on 8 years of growing, monetising and selling Instagram accounts, and more than 100 million organic views. We find the formats your customers already watch, post on a rhythm and test a new hook every week. No bought followers.",
    linkText: "Instagram marketing in Auckland",
    measuredIn: "Reach, follows, DMs and sales",
    serviceType: "Instagram marketing",
    updated: UPDATED,
    title: "Instagram Marketing Agency in Auckland, NZ | Tally",
    description:
      "Instagram marketing from an Auckland team with 8 years growing and selling accounts and 100M+ organic views. Reels, growth and management for NZ brands.",
    ogAlt: "Tally Instagram marketing agency, Auckland and New Zealand",
    h1: "Instagram marketing agency",
    h1Accent: "in Auckland",
    intro:
      "Tally is an Instagram marketing agency based in Auckland. We grow and manage Instagram accounts for consumer and marine brands across New Zealand, using Reels and posts built on 8 years of growing, monetising and selling accounts of our own. The aim is enquiries, bookings and sales from the account, not followers for their own sake.",
    whoFor: {
      heading: "Who it is for",
      intro:
        "Instagram growth suits businesses whose customers already spend time on Instagram and decide partly on what they see there.",
      cases: [
        {
          title: "An account that has stalled",
          body: "Posting regularly, reach flat for months, and the same few people liking everything. Usually the formats are wrong for how Instagram now distributes Reels, not the effort.",
        },
        {
          title: "A product people want to watch",
          body: "Boats on the water, food leaving the kitchen, a product being made or used. If it looks good moving, Reels can carry it further than ads alone.",
        },
        {
          title: "A launch or a new location",
          body: "A new store, venue, model or season that needs attention quickly, and an account that has to be ready before the day.",
        },
        {
          title: "A business that sells in the DMs",
          body: "Plenty of New Zealand businesses take bookings and orders in Instagram messages. Growth there means more of the right people starting a conversation.",
        },
      ],
    },
    steps: {
      heading: "How we grow an Instagram account",
      items: [
        {
          title: "Read the account",
          body: "We go through your insights: what reached people who do not follow you, what got saved and shared, and what brought in messages. That tells us more than a competitor scan.",
        },
        {
          title: "Find the formats",
          body: "We look at what your customers already watch, in your category and outside it, and pick a small number of Reel and post formats to run.",
        },
        {
          title: "Post on a rhythm",
          body: "A steady schedule you can keep up, with content shot by us, by you, or both. Consistency does more for an account than bursts of volume.",
        },
        {
          title: "Test a new hook every week",
          body: "Each week one thing changes: the opening line, the first second, the caption or the cover. What works gets repeated and what does not gets dropped.",
        },
        {
          title: "Turn attention into enquiries",
          body: "Profile, highlights, link and message replies set up so a curious viewer knows exactly what to do next.",
        },
      ],
    },
    extra: [
      {
        heading: "Why Reels carry most of the weight",
        body: [
          "Reels are how Instagram shows an account to people who do not follow it yet, and that is where growth comes from. A good Reel for a business is rarely a polished advert. It has a clear first second, something worth watching to the end, and a reason to visit the profile.",
          "We plan most of the content around Reels, and use posts and stories to turn the people they bring in into enquiries and customers.",
        ],
      },
      {
        heading: "What we will not do",
        body: [
          "We do not buy followers, join engagement pods or use follow and unfollow tools. Bought followers never engage, they drag reach down and they can get an account restricted. Everything we report is organic and visible in your own insights.",
        ],
      },
    ],
    measured: {
      heading: "How it is measured",
      body: [
        "Instagram marketing is judged on reach to people who do not follow you yet, profile visits, follows and messages, and where the account sells directly, the enquiries and sales it produces. We report them each week from your own insights, so every number is one you can check yourself.",
        "Instagram changes how it distributes content without notice, and growth depends on the product as much as the posting, so we do not promise follower counts or views. We commit to the work, the weekly testing and an honest read of what the numbers say.",
      ],
    },
    proof: {
      heading: "Built on 8 years of Instagram",
      body: [
        BUILT_ON,
        "That is the method we use on client accounts: formats that travel, a posting rhythm that holds, and one deliberate test every week.",
      ],
    },
    pricing: {
      heading: "What Instagram marketing costs",
      body: [
        "We quote after the free audit, because the cost depends mostly on how much content needs making. An account where you supply footage costs less to run than one where we shoot every week.",
        "If you want ads to push the best Reels further, ad spend is separate and paid from your own Meta ad account.",
      ],
    },
    faqs: [
      {
        question: "How much does an Instagram marketing agency cost in New Zealand?",
        answer:
          "It depends mainly on how much content has to be made. We quote after a free audit rather than from a package list, so you pay for the work your account actually needs. An account where you supply the footage costs less to run than one where we shoot every week. Any ad spend is separate and goes to Meta from your own ad account.",
      },
      {
        question: "How do you grow an Instagram account without buying followers?",
        answer:
          "By making content Instagram will show to people who do not follow you yet, which today mostly means Reels. We pick formats your customers already watch, post on a steady rhythm and test one change each week. Bought followers do the opposite: they never engage, they lower your reach and they can get an account restricted.",
      },
      {
        question: "How long does Instagram growth take?",
        answer:
          "Expect the first month to go on finding the formats that work, with clearer growth after a few months of consistent posting and weekly testing. Some Reels travel quickly and most do not, so we judge the trend rather than single posts. Accounts with an interesting product and a steady rhythm tend to move fastest.",
      },
      {
        question: "Do you manage Instagram for businesses outside Auckland?",
        answer:
          "Yes. We are based in Auckland and manage Instagram accounts for businesses across New Zealand. Content can come from our shoots, from footage you send, or both, and the planning and reporting happen over calls and the weekly update. Auckland businesses can have us on site for shoots at shorter notice.",
      },
      {
        question: "Is Instagram still worth it for a small business in New Zealand?",
        answer:
          "For most consumer businesses, yes, because it is where many customers check a business before they buy or book. It is less useful for businesses whose buyers are not on it. The free audit looks at your category and your customers and tells you plainly whether Instagram should be your main channel, a support channel or not worth your time.",
      },
      {
        question: "Do you run Instagram ads as well?",
        answer:
          "Yes, through Meta ads, which run on Instagram and Facebook from one ad account. Organic content and ads work best together: Reels that perform organically usually make the strongest ads, and ads put a good post in front of more of the right people. Our Meta ads page explains how we run them.",
      },
    ],
    related: ["meta-ads", "content-video", "marketing-management"],
    industries: ["consumer-brands", "marine"],
  },
  {
    slug: "meta-ads",
    anchor: "paid-ads",
    name: "Meta ads",
    short: "Facebook and Instagram ads judged on enquiries.",
    hub: "Facebook and Instagram ads that run through your own ad account, so every dollar is visible to you. We build the creative, the audiences and the tracking, then judge it on enquiries and sales, not clicks or impressions.",
    linkText: "Meta ads in Auckland",
    measuredIn: "Cost per enquiry or sale",
    serviceType: "Meta advertising (Facebook and Instagram ads)",
    updated: UPDATED,
    title: "Meta Ads Agency Auckland: Facebook and Instagram Ads | Tally",
    description:
      "Meta ads agency in Auckland running Facebook and Instagram ads for NZ businesses, judged on enquiries and sales. Runs in your own ad account. Free audit.",
    ogAlt: "Tally Meta ads agency, Facebook and Instagram ads in Auckland",
    h1: "Meta ads agency",
    h1Accent: "in Auckland",
    intro:
      "Tally is a Meta ads agency based in Auckland, running Facebook and Instagram ads for consumer, marine and primary industries businesses across New Zealand. Campaigns run through your own ad account, so you can see every dollar, and we judge them on enquiries, bookings and sales rather than clicks or impressions.",
    whoFor: {
      heading: "Who it is for",
      intro: "Meta ads suit businesses that can describe their customer and have something worth showing them.",
      cases: [
        {
          title: "Boosting posts with nothing to show",
          body: "Money spent on the boost button, plenty of likes, and no way of telling whether a single enquiry came from it.",
        },
        {
          title: "An agency that reported clicks",
          body: "Reports full of reach and click-through rates, and an ad account you could not see. The number that matters is what each enquiry or sale cost.",
        },
        {
          title: "A push with a date on it",
          body: "Charter bookings before summer, a sale weekend, a new model arriving, or a hiring round that has to be filled by a set date.",
        },
        {
          title: "Traffic that does not convert",
          body: "A booking or ecommerce site with visitors but few sales. Ads can bring back the people who looked and left, but only if the tracking and the landing page work.",
        },
      ],
    },
    steps: {
      heading: "How we run Meta ads",
      items: [
        {
          title: "Check the tracking first",
          body: "Before spending anything we check the Meta pixel, the Conversions API where it fits, and that enquiries, bookings or purchases are recorded properly. Ads optimised on broken tracking waste money.",
        },
        {
          title: "Make the creative",
          body: "Most of the result comes from the ad itself. We make several versions from your content or ours, mostly short vertical video in the formats Meta favours.",
        },
        {
          title: "Build campaigns in your account",
          body: "Campaigns, audiences and budgets set up in your own ad account, with your card paying Meta directly. You keep full access and the full history.",
        },
        {
          title: "Test and cut",
          body: "New creative goes in regularly. What lowers the cost per enquiry gets more budget, and what does not gets switched off.",
        },
        {
          title: "Report on the number",
          body: "One plain update a week: spend, enquiries or sales, cost per result and what we are changing next.",
        },
      ],
    },
    extra: [
      {
        heading: "Facebook ads and Instagram ads, run together",
        body: [
          "Facebook and Instagram ads are bought through the same Meta ad account, and they usually work best together, with Meta placing each ad where it performs. For most Auckland and New Zealand businesses we run them as one campaign and let the results decide the split, rather than treating Facebook advertising and Instagram ads as two separate jobs.",
        ],
      },
      {
        heading: "Ad account restricted or disabled?",
        body: [
          "If your ad account has been restricted or disabled for a payment, chargeback or policy reason, that has to be resolved before any campaign can run. Whether we can take it on depends on the cause, and we tell you on the first call.",
        ],
      },
    ],
    measured: {
      heading: "How Meta ads are measured",
      body: [
        "Each campaign is judged on cost per enquiry, booking or sale, depending on the outcome we agreed. Reach, clicks and click-through rate are useful for diagnosing problems, but they are not the result and we do not report them as if they were.",
        "Ad costs move with the season, the competition and your offer, so we do not promise a cost per result in advance. We tell you what we see in the first weeks and what it would take to improve it.",
      ],
    },
    proof: {
      heading: "Why our ads start from content",
      body: [
        BUILT_ON,
        "That shapes how we run ads. We look for content people already choose to watch, then put money behind it. In our experience that turns into enquiries more cheaply than an advert made from scratch.",
      ],
    },
    pricing: {
      heading: "What Meta ads cost",
      body: [
        "There are two costs. Ad spend goes straight to Meta from your own ad account, and you set the budget. Our fee covers the creative, the setup, the testing and the reporting.",
        "We quote the fee after the free audit, once we know how much creative the campaign needs and how many campaigns it involves.",
      ],
    },
    faqs: [
      {
        question: "How much should a small business spend on Meta ads in New Zealand?",
        answer:
          "Enough to get a clear read within a few weeks, which depends on what an enquiry or sale is worth to you and what clicks cost in your category. We would rather start smaller with sound tracking and good creative than spend heavily on a campaign that cannot be measured. The free audit gives a starting budget with the reasoning behind it.",
      },
      {
        question: "Do you run Facebook ads and Instagram ads separately?",
        answer:
          "Usually not. Both are bought through one Meta ad account, and Meta places each ad where it performs best for the result you choose. We run them together, let the numbers decide the split, and make sure the creative suits the feeds, Stories and Reels placements on both apps.",
      },
      {
        question: "Why should Meta ads run in my own ad account?",
        answer:
          "Because the account, its history and its data belong to your business. If ads run in an agency's account, you cannot see what you are paying for and you lose what was learned when you leave. We work inside your ad account with our own access, and your card pays Meta directly.",
      },
      {
        question: "Is boosting a post the same as running Meta ads?",
        answer:
          "No. Boosting is a simplified version with fewer targeting, placement and optimisation options, and it usually optimises for engagement rather than enquiries or sales. It has its place for a strong post, but a proper campaign in Ads Manager, with tracking and several creatives, gives far more control over what you pay per result.",
      },
      {
        question: "How long do Meta ads take to produce enquiries?",
        answer:
          "Campaigns can produce enquiries in the first weeks, but the first month is mainly about learning which audiences and creative work. Costs tend to settle once Meta has enough results to optimise on. If the numbers suggest the offer, the price or the landing page needs work rather than the ads, we tell you early.",
      },
      {
        question: "Can you fix a disabled Meta ad account?",
        answer:
          "Sometimes. It depends on why it was disabled: payment failures, chargebacks and policy flags each need a different approach, and some cannot be reversed. We look at the notice and the account history on the first call and tell you whether it is worth taking on before anything is paid.",
      },
    ],
    related: ["instagram-marketing", "content-video", "websites"],
    industries: ["consumer-brands", "marine", "primary-industries"],
  },
  {
    slug: "content-video",
    anchor: "content-video",
    name: "Content & video",
    short: "Reels, stills and ad cuts you own, made to be posted.",
    hub: "We come to the boat, the showroom or the shop floor and shoot the real thing: Reels, stills and ad cuts in the formats that perform. You own every frame, and every shoot is planned around what it has to sell.",
    linkText: "Social media videographer in Auckland",
    measuredIn: "Watch time, shares and cost per result",
    serviceType: "Social media video production",
    updated: UPDATED,
    title: "Videographer Auckland for Social Media and Reels | Tally",
    description:
      "Social media videographer in Auckland: Reels, stills and ad cuts shot on location for NZ brands, planned around what they need to sell. You own every frame.",
    ogAlt: "Tally social media videographer, Reels and video in Auckland",
    h1: "Social media videographer",
    h1Accent: "in Auckland",
    intro:
      "Tally is a social media videographer and content team in Auckland, shooting Reels, stills and ad cuts for Instagram and Facebook across New Zealand. We shoot on the boat, in the showroom or on the shop floor, plan every shoot around what it has to sell, and you own every frame we make.",
    whoFor: {
      heading: "Who it is for",
      intro:
        "Social media content creation suits businesses that look better moving than in a brochure, and need a steady supply of short pieces rather than one brand film.",
      cases: [
        {
          title: "A brand film that never got posted",
          body: "Money spent on one polished video that suited the website and nothing else. Social needs many short pieces, each cut for the first second.",
        },
        {
          title: "No time to film it yourself",
          body: "You know Reels would work, but nobody on the team has the time or the eye to shoot them every week.",
        },
        {
          title: "A season to capture",
          body: "Boats in summer light, a harvest, a new menu or a launch event that has to be filmed when it happens.",
        },
        {
          title: "Ads that need fresh creative",
          body: "Meta ads tire quickly. A bank of short cuts lets the ads keep testing instead of running the same video for months.",
        },
      ],
    },
    steps: {
      heading: "How a shoot works",
      items: [
        {
          title: "Plan around the outcome",
          body: "Each shoot starts from what the content has to sell and where it will run. We write a short shot list of hooks, scenes and formats before anyone picks up a camera.",
        },
        {
          title: "Shoot on location",
          body: "We come to you: the marina, the showroom, the kitchen or the site. Shoots are planned around your operation so they do not stop the business.",
        },
        {
          title: "Edit for each placement",
          body: "Vertical Reels, Stories, feed posts and ad cuts, each edited for where it will run, with captions on screen for people watching without sound.",
        },
        {
          title: "Deliver a usable bank",
          body: "Finished pieces plus stills, organised so they can be posted over weeks rather than all at once.",
        },
      ],
    },
    extra: [
      {
        heading: "A Reels videographer, or a team that posts it",
        body: [
          "An Auckland Reels videographer will film and edit what you ask for, which works well if you already know what performs and have someone to post it. We plan the content around a result, shoot it, and can post and advertise it too, so the footage is judged on what it does after it goes up.",
          "Both are reasonable choices. The free audit will tell you which one your business needs.",
        ],
      },
    ],
    measured: {
      heading: "How content is measured",
      body: [
        "Content is judged on whether it earns its place: watch time and shares on Reels, saves and messages on posts, and cost per result when a piece runs as an ad. Pieces that work get recut and reused, and pieces that do not tell us what to change on the next shoot.",
        "We do not promise views. What we commit to is a shoot planned around your outcome and footage you can actually use.",
      ],
    },
    proof: {
      heading: "Behind the camera",
      body: [
        BUILT_ON,
        "Every shoot is planned with that in mind: the first second, a reason to keep watching, and a reason to visit the profile or click the ad.",
      ],
    },
    pricing: {
      heading: "What a shoot costs",
      body: [
        "We quote after the free audit, based on the number of shoot days, the locations and how many finished pieces you need.",
        "You own everything we make, so there is nothing to license later and the footage keeps working in posts, ads and on your website.",
      ],
    },
    faqs: [
      {
        question: "How much does a social media videographer cost in Auckland?",
        answer:
          "It depends on the number of shoot days, the locations and how many finished pieces you need. We quote after a free audit, once we know what the content has to sell and where it will run. You own every frame we make, so you can keep using the footage in posts, ads and on your website without further cost.",
      },
      {
        question: "How many Reels can you get from one shoot day?",
        answer:
          "Usually far more than a brand film would give you, because we plan for short pieces from the start. The exact number depends on the location, the product and how many formats we are testing. We agree the deliverables before the shoot, so you know what you are getting before anyone turns up.",
      },
      {
        question: "Do you film outside Auckland?",
        answer:
          "Yes. We are based in Auckland and shoot across New Zealand, from marinas and showrooms to orchards and processing plants. Shoots outside Auckland are planned around the travel, so we get as much as possible from each day on site and you are not paying for a second trip.",
      },
      {
        question: "Do I own the footage you shoot?",
        answer:
          "Yes. You own every photo and video we make. You can use it on Instagram, in Meta ads, on your website or anywhere else, while we work together and afterwards. There is no licence to renew and nothing to hand back when the work ends.",
      },
      {
        question: "What makes a good Reel for a business?",
        answer:
          "A clear first second, something worth watching to the end, and an obvious next step. Most good business Reels look less like adverts and more like the thing itself: the product in use, the boat on the water, the dish leaving the pass. We plan shoots around that and test hooks once the content is live.",
      },
    ],
    related: ["instagram-marketing", "meta-ads", "marketing-management"],
    industries: ["marine", "consumer-brands"],
  },
  {
    slug: "websites",
    anchor: "websites",
    name: "Websites & landing pages",
    short: "Small business sites from $500, built to turn visits into enquiries.",
    hub: "Fast, simple sites and landing pages from $500 that work on a phone, load quickly, rank in search and make it easy to call or enquire. Built to support the ads and content, so the traffic you pay for does not leak.",
    linkText: "Website design in Auckland for small business",
    measuredIn: "Enquiries from the site",
    serviceType: "Small business website design",
    priceFrom: 500,
    updated: "2026-10-28",
    title: "Website Design Auckland for Small Business, NZ | Tally",
    description:
      "Website design in Auckland from $500: fast, mobile-first small business sites and landing pages built to turn visitors into enquiries, NZ-wide.",
    ogAlt: "Tally website design in Auckland for small business",
    h1: "Website design in Auckland",
    h1Accent: "for small business",
    intro:
      "Tally does website design in Auckland for small businesses across New Zealand, with websites and landing pages from $500. We build sites that load quickly on a phone, rank in search and make it easy to call or enquire, so the visitors your ads and Instagram send do not leave without getting in touch.",
    whoFor: {
      heading: "Who it is for",
      intro: "Websites are usually part of a wider brief with us, though they do not have to be.",
      cases: [
        {
          title: "Ads landing on the homepage",
          body: "Paid traffic arrives on a general homepage, cannot find the offer and leaves. A focused landing page can do more for an ad than a new campaign.",
        },
        {
          title: "A site that fights you on a phone",
          body: "Slow to load, hard to tap, and a form that asks for too much. Most social media traffic arrives on a phone, so this is where enquiries leak.",
        },
        {
          title: "An old site nobody can change",
          body: "Built years ago by someone who has moved on, and too fiddly to update prices or add a page.",
        },
        {
          title: "A new business or a new offer",
          body: "A small, quick site to launch with, rather than a large build before you know what customers respond to.",
        },
      ],
    },
    steps: {
      heading: "What we build and how",
      items: [
        {
          title: "Start from the enquiry",
          body: "We work out what a visitor needs to see before they call, book or buy, and build the page around that action.",
        },
        {
          title: "Write the copy",
          body: "Plain words that say what you do, where you do it and how to get started. Clear copy matters more than design flourishes.",
        },
        {
          title: "Design for phones first",
          body: "Mobile layout first, fast images, large buttons and a form that asks only for what you need.",
        },
        {
          title: "Set up search and tracking",
          body: "Page titles, descriptions, structured data and analytics, so the site can be found and every enquiry can be counted.",
        },
        {
          title: "Landing pages for campaigns",
          body: "Separate pages for specific ads or offers, matched to the ad so visitors land on exactly what they clicked.",
        },
      ],
    },
    extra: [
      {
        heading: "Landing pages for New Zealand campaigns",
        body: [
          "A landing page is a single page built for one offer and one action, usually as the destination for an ad. It strips out the menu and everything else that competes for attention, and answers the questions a visitor has before they enquire.",
          "For businesses running Meta ads, a landing page is often the quickest improvement available, and it is a much smaller job than a full website.",
        ],
      },
    ],
    measured: {
      heading: "How a website is measured",
      body: [
        "A small business website is judged on enquiries: the calls, forms, bookings and sales that come from it, and the share of visitors who take one of those steps. We set up tracking so you can see those numbers yourself.",
        "Nobody can promise search rankings or a number of enquiries. Positions depend on competition and on things off the site, such as reviews and links. We build the site so it is eligible to rank and easy to act on.",
      ],
    },
    proof: {
      heading: "Built to support the rest",
      body: [
        "We build websites to support the content and ads we run, which is where our background lies. " + BUILT_ON,
        "In that system a website has one job: turning attention into an enquiry.",
      ],
    },
    pricing: {
      heading: "What a small business website costs",
      body: [
        "Websites and landing pages start from $500. The final quote follows the free audit and depends on the number of pages, whether you need bookings or online sales, and how much copy and photography has to be produced.",
        "A single campaign landing page sits at the bottom of that range and is often the better first step. Larger sites with online sales or bookings cost more, and you get a fixed quote before any work starts.",
      ],
    },
    faqs: [
      {
        question: "How much does a small business website cost in Auckland?",
        answer:
          "Tally builds small business websites and landing pages from $500. The final price depends on the number of pages, whether you need bookings or online sales, and how much copy and photography has to be produced. You get a fixed quote after a free audit, before any work starts. A single landing page is the cheapest place to begin.",
      },
      {
        question: "Do I need a full website or just a landing page?",
        answer:
          "If you are running ads for one offer, a landing page is often enough to start, and it is quicker to build and test. A full site makes sense when customers need to compare several services, check you out before calling, or find you through Google. The free audit looks at where your enquiries come from and recommends one or the other.",
      },
      {
        question: "Will my new website rank on Google?",
        answer:
          "A well-built site is eligible to rank, but nobody can honestly promise positions. We set up the basics properly: page titles, descriptions, fast loading, structured data and a clear page for each service. Rankings then depend on competition and on things off the site, such as your Google Business Profile, reviews and links from other sites.",
      },
      {
        question: "Do you build websites for businesses outside Auckland?",
        answer:
          "Yes. We are based in Auckland and build small business websites for businesses across New Zealand. Most of the work happens over calls and shared documents, so location makes little difference to the build. Photography can be arranged where you are, or we can work with images you already have.",
      },
      {
        question: "Why does a website matter if most customers find us on Instagram?",
        answer:
          "Because many of them still check your website before they call, book or buy, and ads need somewhere to send people. A site that is slow or unclear on a phone loses those visitors at the last step. It is also what Google and AI assistants read when someone searches for a business like yours.",
      },
    ],
    related: ["meta-ads", "instagram-marketing", "marketing-management"],
    industries: ["consumer-brands", "marine"],
  },
];

export function getService(slug: string) {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

/* Account recovery: its own long-standing URL, urgent searches, leads with the call. */
export const RECOVERY = {
  path: "/instagram-account-recovery",
  anchor: "account-recovery",
  name: "Account recovery & username claims",
  short: "Banned account, disabled ad account or stolen name, handled.",
  hub: "Banned, disabled or restricted business account, or someone sitting on your name? We handle the whole case through our Meta representatives. A small deposit opens it and the rest is only payable if it works.",
  linkText: "Instagram account recovery in New Zealand",
  measuredIn: "Your account back",
  serviceType: "Instagram account recovery and username claims",
  updated: UPDATED,
  title: "Instagram Account Disabled? NZ Account Recovery | Tally",
  description:
    "Instagram account disabled, banned or restricted? An Auckland team handles Instagram account recovery, disabled Meta ad accounts and username claims for NZ.",
  ogAlt: "Tally Instagram account recovery for disabled and banned accounts, New Zealand",
  h1: "Instagram account disabled?",
  h1Accent: "Recovery for NZ businesses",
  intro:
    "If your Instagram account has been disabled, banned or restricted, Tally handles the recovery for New Zealand businesses from our base in Auckland, along with username claims and impersonation. We work each case through our Meta representatives from start to finish. You keep your login the whole time, and we never ask for your password.",
  handles: [
    {
      title: "Banned and disabled accounts",
      body: "Business accounts disabled for a claimed Community Guidelines breach, including the false positives that catch legitimate businesses, and appeals that have already been declined.",
    },
    {
      title: "Restricted accounts",
      body: "Accounts that can still log in but cannot post, advertise, send messages or be found in search.",
    },
    {
      title: "Username claims and impersonation",
      body: "Handles that use your business name or trademark, and accounts pretending to be you. If a name cannot be claimed, we tell you straight away and set up the best alternative.",
    },
  ],
  steps: [
    {
      title: "Send us the notice",
      body: "Call, or send a screenshot of the notice and a note of what has been tried. We tell you on the first call whether the case is worth taking.",
    },
    {
      title: "A small deposit opens the case",
      body: "If we take it, a small deposit opens the case. The rest is only payable if the account is reinstated or the username is released.",
    },
    {
      title: "We work it through Meta",
      body: "We put the case to our Meta representatives with the evidence it needs, and follow it until there is a decision.",
    },
    {
      title: "You keep control",
      body: "You keep your login throughout. We never ask for your password or a login code.",
    },
  ],
  firstSteps: [
    "Screenshot the full notice, including any date or deadline.",
    "Secure the email and Facebook accounts linked to the account.",
    "Do not fire off several appeals, open a new account, or give anyone your password.",
    "Call us with the notice. We tell you on the first call whether the case is worth taking.",
  ],
  adAccounts: {
    heading: "Disabled or restricted Meta ad accounts",
    body: [
      "Ad accounts are disabled or restricted for different reasons: a failed payment, a chargeback disputed with your bank, or a flag for breaching advertising policy, sometimes in error. Each cause needs a different approach, and some cannot be reversed.",
      "Whether we take an ad account case depends on the cause. We look at the notice and the account history on the first call and tell you straight. If we do not think it can be fixed, we say so before anything is paid.",
    ],
  },
  scams: {
    heading: "How to avoid recovery scams",
    body: [
      "Recovery scams are common, and they target people at their most stressed. Walk away from anyone who messages you first offering to get your account back, asks for your password or a login code, or wants payment in crypto or gift cards.",
      "A genuine service is a named New Zealand business you can call, with a company record you can check. Tally is Tally Marketing Limited, NZBN 9429053993519, based in Auckland.",
    ],
  },
  faqs: [
    {
      question: "My Instagram account was disabled. Can you get it back?",
      answer:
        "In most cases, yes. We take on the case and work it through our Meta representatives until there is a decision. We tell you on the first call whether it is worth taking, and if it is not, you pay nothing. You keep your login the whole time, and we never ask for your password or a login code.",
    },
    {
      question: "How much does Instagram account recovery cost?",
      answer:
        "A small deposit opens the case, and the rest is only payable if the account is reinstated or the username is released. We quote both on the first call, after looking at the notice and what has already been tried, so you know the full cost before you commit to anything.",
    },
    {
      question: "My appeal was already rejected. Is it too late?",
      answer:
        "Usually not. A declined appeal is the most common case we take on. Sending more appeals or opening a new account can make things harder, so call us before you try anything else. We look at the notice and the history on the first call and tell you whether the case is still worth pursuing.",
    },
    {
      question: "How long does Instagram account recovery take?",
      answer:
        "Anywhere from a few days to a few weeks, depending on why the account was banned and what has already been tried. Cases with a clear false positive tend to move faster than ones with several declined appeals behind them. We keep you updated as the case moves, and you keep your login throughout.",
    },
    {
      question: "Can I get an Instagram username someone else is using?",
      answer:
        "Often, where the account uses your business name or trademark, or is impersonating you. We check your case on the first call before anything is paid. If the name cannot be claimed, we tell you straight away and help you set up the best available alternative so customers can still find you.",
    },
    {
      question: "Can you recover a disabled Meta ad account?",
      answer:
        "Sometimes, depending on the cause. Payment failures, chargebacks and advertising policy flags each need a different approach, and some cannot be reversed. We look at the notice and the account history on the first call and tell you whether we can take it on before anything is paid.",
    },
    {
      question: "How do I avoid Instagram recovery scams?",
      answer:
        "Walk away from anyone who messages you first, asks for your password or a login code, or wants payment in crypto or gift cards. A real service is a named New Zealand business you can call and check on the Companies Office register. Tally is Tally Marketing Limited, NZBN 9429053993519.",
    },
  ] as FaqItem[],
  related: ["meta-ads", "instagram-marketing"],
};

/* Every service as a hub row, in menu order, with recovery last. */
export const SERVICE_LINKS = [
  ...SERVICE_PAGES.map((s) => ({
    anchor: s.anchor,
    name: s.name,
    short: s.short,
    hub: s.hub,
    measuredIn: s.measuredIn,
    linkText: s.linkText,
    href: `/services/${s.slug}`,
  })),
  {
    anchor: RECOVERY.anchor,
    name: RECOVERY.name,
    short: RECOVERY.short,
    hub: RECOVERY.hub,
    measuredIn: RECOVERY.measuredIn,
    linkText: RECOVERY.linkText,
    href: RECOVERY.path,
  },
];

export const SERVICE_FAQS: FaqItem[] = [
  {
    question: "Which marketing service should I start with?",
    answer:
      "Start with the free audit. We look at your Instagram, ads, website and how customers find you, then tell you which one service would move the needle first. Most businesses start with one service and add more once it is working, rather than paying for everything at once before anything has been tested.",
  },
  {
    question: "How much do Tally's services cost?",
    answer:
      "It depends on the outcome and how much content needs making. We price it on the first call, after the free audit, so you pay for work aimed at a result rather than a number of posts. Ad spend is always separate and is paid straight to Meta from your own ad account.",
  },
  {
    question: "Do you buy followers or use engagement tricks?",
    answer:
      "No. Bought followers never engage, they drag reach down and they can get an account restricted. We do not use engagement pods or follow and unfollow tools either. Everything we report is organic and visible in your own Instagram insights, so you can check every number yourself.",
  },
  {
    question: "Who owns the content and the ad accounts?",
    answer:
      "You do. Ads run through your own ad account, your social accounts stay in your business's name, and you own every photo and video we make. We work inside your accounts with our own access, so if you stop working with us there is nothing to hand back or rebuild.",
  },
  {
    question: "Do you work outside Auckland and outside marine?",
    answer:
      "Yes to both. We are based in Auckland and work with businesses across New Zealand. Consumer brands and marine are where we do most of our work, and we also run recruitment and reach campaigns for primary industries operators, and Instagram account recovery for any New Zealand business.",
  },
];
