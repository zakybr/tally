import Nav from "@/components/Nav";
import FooterCta from "@/components/FooterCta";

export type Clause = {
  heading: string;
  body: React.ReactNode;
};

/*
  Shared shell for the policy pages. Clauses are numbered because they are
  referred to by number, not for decoration.
*/
export default function LegalDoc({
  eyebrow,
  title,
  lede,
  updated,
  clauses,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  updated: string;
  clauses: Clause[];
}) {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <header className="border-b border-hairline px-6 py-20 md:px-12 md:py-28 lg:px-20">
          <div className="mx-auto max-w-[1440px]">
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h1 className="max-w-3xl font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-[1.6] text-ink-2">{lede}</p>
            <p className="mono-label mt-8 text-ink-2">Last updated · {updated}</p>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <ol className="max-w-3xl list-none py-8">
            {clauses.map((clause, index) => (
              <li
                key={clause.heading}
                className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-hairline py-9 last:border-b-0"
              >
                <span className="font-mono text-sm tabular-nums text-amber">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="mb-3 font-sans text-xl font-semibold tracking-tight text-ink">
                    {clause.heading}
                  </h2>
                  <div className="space-y-4 text-[0.9375rem] leading-[1.7] text-ink-2 [&_a]:text-amber [&_a]:underline [&_a]:underline-offset-4 [&_li]:mb-2 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
                    {clause.body}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <FooterCta />
    </>
  );
}
