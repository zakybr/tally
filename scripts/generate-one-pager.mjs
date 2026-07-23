import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const outDir = path.join(process.cwd(), "public", "docs");
const outFile = path.join(outDir, "tally-guarantee-one-pager.pdf");

fs.mkdirSync(outDir, { recursive: true });

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 48, bottom: 48, left: 48, right: 48 },
  info: {
    Title: "Tally Guarantee One-Pager",
    Author: "Tally",
    Subject: "Outcome-guaranteed primary industries marketing, New Zealand",
  },
});

const stream = fs.createWriteStream(outFile);
doc.pipe(stream);

const ink = "#0b0b0a";
const muted = "#5c5850";
const amber = "#d9711a";

doc.fillColor(ink).fontSize(9).text("TALLY  ·  GUARANTEE TERMS  ·  DOC TLY-GTE-01", {
  characterSpacing: 1.2,
});
doc.moveDown(0.6);
doc.fillColor(amber).fontSize(9).text("STATUS · BINDING", { characterSpacing: 1.2 });
doc.moveDown(1.2);

doc.fillColor(ink).fontSize(22).text("We sell the tally, not the footage.", {
  width: 500,
});
doc.moveDown(0.5);
doc
  .fillColor(muted)
  .fontSize(11)
  .text(
    "Tally is New Zealand's outcome-guaranteed marketing agency for primary industries. One business outcome is agreed before production. Fee risk is written into the contract.",
    { width: 500, lineGap: 2 },
  );

doc.moveDown(1.2);
line();

section("01  How the guarantee works");
bullet("Agree one number: qualified applications, qualified reach, or qualified enquiries.");
bullet("We deliver headless: one update a week against target. No production theatre.");
bullet("Miss? We keep working at our cost, or the fee comes back. Printed, not implied.");

doc.moveDown(0.6);
section("02  The miss clause");
bullet("Miss by ≤20%: free 30-day extension. We absorb delivery cost.");
bullet("Miss by >20%: 50% fee credited to the next engagement, or partial refund within 14 days.");
bullet(
  "Client-attributable (late assets, broken operation, tracking not live): guarantee voided, named in the contract.",
);

doc.moveDown(0.6);
section("03  Who carries what");
bullet("We absorb delivery risk. You absorb operational risk.");
bullet("Paid media spend stays in your account, transparent to the dollar.");
bullet("We never guarantee sales. We guarantee what we control.");

doc.moveDown(0.6);
section("04  What voids the guarantee");
bullet("Late assets past week two: clock does not start; delay days excluded.");
bullet("Structural product or workplace issues found in discovery: we stop before taking the fee.");
bullet("Scope creep after week-one freeze: clock resets.");

doc.moveDown(0.8);
line();
doc.moveDown(0.6);
doc
  .fillColor(muted)
  .fontSize(10)
  .text(
    "Built for funded exporters, processors, co-ops and large operators across seafood, aquaculture, forestry, wood processing, horticulture, food processing and agritech.",
    { width: 500, lineGap: 2 },
  );

doc.moveDown(1);
doc.fillColor(ink).fontSize(11).text("Start the Proof");
doc.fillColor(amber).fontSize(11).text("www.tallynz.co/proof");
doc.fillColor(muted).fontSize(10).text("zak@tallynz.co  ·  jonty@tallynz.co");

doc.end();

stream.on("finish", () => {
  console.log("Wrote", outFile);
});

function line() {
  const y = doc.y;
  doc
    .strokeColor("#d8d2c4")
    .lineWidth(0.5)
    .moveTo(48, y)
    .lineTo(547, y)
    .stroke();
  doc.moveDown(0.8);
}

function section(title) {
  doc.fillColor(ink).fontSize(12).text(title, { characterSpacing: 0.4 });
  doc.moveDown(0.35);
}

function bullet(text) {
  doc.fillColor(muted).fontSize(10).text(`•  ${text}`, {
    width: 500,
    lineGap: 1.5,
    paragraphGap: 4,
  });
}
