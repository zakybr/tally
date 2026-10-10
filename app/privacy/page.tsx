import type { Metadata } from "next";
import Link from "next/link";
import LegalDoc, { type Clause } from "@/components/LegalDoc";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Tally collects, uses and protects personal information through tallynz.co, under the New Zealand Privacy Act 2020.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Tally",
    description: "What Tally collects, why, who processes it, and how to ask for it.",
    url: "/privacy",
  },
};

const UPDATED = "10 October 2026";

const clauses: Clause[] = [
  {
    heading: "Who this covers",
    body: (
      <>
        <p>
          Tally is a marketing agency based in New Zealand. This policy explains what personal
          information we collect through <strong>tallynz.co</strong>, why we collect it, and what
          we do with it. It is written to meet our obligations under the{" "}
          <a href="https://www.privacy.org.nz/privacy-act-2020/" rel="noopener" target="_blank">
            Privacy Act 2020
          </a>
          .
        </p>
        <p>
          If you are a client, the handling of information inside a paid engagement is governed by
          the agreement you signed with us. Where that agreement and this policy differ, the signed
          agreement applies.
        </p>
      </>
    ),
  },
  {
    heading: "What we collect when you contact us",
    body: (
      <>
        <p>
          Our enquiry form asks for the information we need to tell you honestly whether we can
          guarantee an outcome for your business:
        </p>
        <ul>
          <li>Your name, email address, company and role</li>
          <li>Your industry and approximate company size</li>
          <li>The outcome you want, your timeline, and whether budget is agreed</li>
          <li>Anything you write in the message field</li>
        </ul>
        <p>
          The gated guarantee one-pager asks only for a name, work email and company. Everything
          on both forms is given voluntarily. If you would rather not fill in a form, email{" "}
          <a href="mailto:zak@tallynz.co">zak@tallynz.co</a> or{" "}
          <a href="mailto:jonty@tallynz.co">jonty@tallynz.co</a> directly.
        </p>
      </>
    ),
  },
  {
    heading: "Marketing attribution",
    body: (
      <>
        <p>
          When you arrive from an ad, a search result or a link, we record the campaign parameters
          in that link, <strong>utm_source</strong>, <strong>utm_medium</strong>,{" "}
          <strong>utm_campaign</strong>, <strong>utm_term</strong>, <strong>utm_content</strong>,
          and the Google or Microsoft click identifiers, along with the page you landed on and the
          site that referred you.
        </p>
        <p>
          This is held in your own browser under the key <strong>tally_attribution</strong> and is
          attached to a form only if you choose to submit one. It tells us which channels actually
          produce conversations. It contains no name, email or address.
        </p>
      </>
    ),
  },
  {
    heading: "Analytics, advertising and cookies",
    body: (
      <>
        <p>
          <strong>What we collect.</strong> We use Google Analytics 4 to see how the site is used:
          pages viewed, approximate location derived from IP address, device and browser type, how
          you arrived, and interactions such as opening the one-pager or clicking through to book
          a call. IP addresses are anonymised before Google stores them. We also use the Meta
          pixel, which records the pages you view and whether you send an enquiry, and sets a
          Meta cookie to do so.
        </p>
        <p>
          <strong>Why.</strong> To count visits, to see which pages get read, and to tell whether
          our Facebook and Instagram ads bring in real enquiries, so we only keep paying for the
          ones that do.
        </p>
        <p>
          Both load when you visit. A notice at the bottom of the screen on your first visit says
          so and offers an opt-out.
        </p>
        <p>
          When you request a free enquiry audit, we also tell Meta that an enquiry was made, so we
          can see which ads work. This goes from our server, not your browser, so it happens
          whether or not you have opted out. Your email address and phone number are scrambled
          with a one-way hash (SHA-256) before they leave us, so Meta can match them to an
          existing account but cannot read them. We do not send your name, business or anything
          you write in the form.
        </p>
        <p>
          <strong>How to opt out.</strong> Choose Opt out on the notice. Your choice is stored in
          your browser under <strong>tally_cookie_consent</strong>, and from then on neither
          Google Analytics nor the Meta pixel loads on this site in that browser. Opting out does
          not delete cookies already set; clear this site&apos;s data in your browser to remove
          them, which also brings the notice back so you can choose again. You can also block
          these cookies in your browser settings or install Google&apos;s{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener" target="_blank">
            opt-out browser add-on
          </a>
          . The site works normally either way.
        </p>
      </>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <ul>
        <li>To reply to your enquiry and prepare a proposal</li>
        <li>To send the document you asked for</li>
        <li>To work out which marketing channels are worth continuing</li>
        <li>To keep records we are required to keep</li>
      </ul>
    ),
  },
  {
    heading: "What we do not do",
    body: (
      <p>
        We do not sell personal information. We do not trade or rent contact lists. We do not use
        your enquiry to build a profile for anyone else, and we do not add you to a newsletter
        because you downloaded a document.
      </p>
    ),
  },
  {
    heading: "Who else processes it",
    body: (
      <>
        <p>We use a small number of providers, each doing one job:</p>
        <ul>
          <li>
            <strong>Vercel</strong>: hosts and serves the website
          </li>
          <li>
            <strong>Resend</strong>: delivers your form submission to our inboxes as an email
          </li>
          <li>
            <strong>Google Analytics</strong>: usage measurement, as described above
          </li>
          <li>
            <strong>Meta</strong>: advertising measurement through the Meta pixel and Conversions
            API, as described above
          </li>
          <li>
            <strong>Calendly</strong>: only if you choose to book a call, and only the details you
            enter there
          </li>
          <li>
            <strong>Supabase</strong>: powers our internal staff portal. It holds no information
            about website visitors
          </li>
        </ul>
        <p>
          Some of these store data on servers outside New Zealand. We only use providers that
          commit to protecting information to a standard comparable to the Privacy Act 2020.
        </p>
      </>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <p>
        Enquiries are kept for as long as we are in contact with you and for a reasonable period
        afterwards, so that we have a record of what was discussed and agreed. Attribution data in
        your browser is short-lived and is cleared when you clear your browser storage. If you want
        your enquiry deleted, ask and we will delete it.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        <p>
          Under the Privacy Act 2020 you may ask us what personal information we hold about you,
          ask for a copy, and ask us to correct anything wrong. Email{" "}
          <a href="mailto:zak@tallynz.co">zak@tallynz.co</a> or{" "}
          <a href="mailto:jonty@tallynz.co">jonty@tallynz.co</a> and we will respond within 20 working
          days.
        </p>
        <p>
          If you are not satisfied with how we have handled your information, you can complain to
          the{" "}
          <a href="https://www.privacy.org.nz/" rel="noopener" target="_blank">
            Office of the Privacy Commissioner
          </a>
          .
        </p>
      </>
    ),
  },
  {
    heading: "Security",
    body: (
      <p>
        The site is served over HTTPS and form submissions are encrypted in transit. Our internal
        portal is restricted to named accounts and protected at the database level, so an account
        that has not been granted access cannot read anything. No system is perfectly secure, and
        we do not claim otherwise.
      </p>
    ),
  },
  {
    heading: "Children",
    body: (
      <p>
        This site sells business services and is not directed at children. We do not knowingly
        collect information from anyone under 16.
      </p>
    ),
  },
  {
    heading: "Changes and contact",
    body: (
      <>
        <p>
          If this policy changes we will update the date at the top of this page. Material changes
          will be described here rather than made quietly.
        </p>
        <p>
          Questions about privacy, or a request about your information:{" "}
          <a href="mailto:zak@tallynz.co">zak@tallynz.co</a> or{" "}
          <a href="mailto:jonty@tallynz.co">jonty@tallynz.co</a>. Our terms of service are at{" "}
          <Link href="/terms">tallynz.co/terms</Link>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalDoc
        eyebrow="Privacy"
        title="What we collect, and why."
        lede="Tally is a small agency. We collect the information we need to answer your enquiry honestly, and almost nothing else. This page says exactly what that is."
        updated={UPDATED}
        clauses={clauses}
      />
    </>
  );
}
