/*
  Single source of truth for how to reach Tally.

  Both directors are listed everywhere a visitor might look, because the site
  sells a contract and the buyer wants a person on the end of it, not a form.
  Phone numbers are stored in two shapes: E.164 for tel: links and schema, and
  the spaced local form people actually read.
*/

export type Person = {
  name: string;
  role: string;
  email: string;
  /* E.164, for tel: hrefs and structured data. */
  phone: string;
  /* How a New Zealander reads it back. */
  phoneDisplay: string;
};

export const PEOPLE: Person[] = [
  {
    name: "Zak Rachmadi",
    role: "Director",
    email: "zak@tallynz.co",
    phone: "+64223053853",
    phoneDisplay: "+64 22 305 3853",
  },
  {
    name: "Jonty MacIntyre",
    role: "Director",
    email: "jonty@tallynz.co",
    phone: "+6421344965",
    phoneDisplay: "+64 21 344 965",
  },
];

/* The address a general enquiry should go to when no person is named. */
export const PRIMARY_EMAIL = PEOPLE[0].email;
