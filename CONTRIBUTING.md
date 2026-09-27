# Contributing

Thanks for helping future agents pass.

**Accuracy comes first.** If you think something is wrong or out of date, open an issue with a link to the official source: your state's regulator, the statute or regulation, or the exam vendor's candidate bulletin. Please don't correct facts from memory or from a prep book alone.

**Adding questions**
- Write original questions. Don't copy from exams, courses or books.
- Give four choices with one clearly correct answer. Don't use "all/none of the above", because choices are shuffled.
- The explanation should say *why*, and cite the rule where there is one (e.g., "RPL §443", "19 NYCRR 175.25", "RESPA Section 8").
- New York questions (`data/questions-*.js`, units 1–19) follow the official 77-hour syllabus.
- National questions (`data/national-questions-*.js`, units 101–111) must hold in every state. Where states differ, say so rather than picking one.

**Correcting a state fact** (`data/states.js`)
- Every number needs `evidence`: the official page's URL and the exact sentence it came from. The app shows that quote to readers.
- Use the regulator's site, another .gov page, or the exam vendor's candidate bulletin. Never use a school or blog.
- If you can't find an official source, set the value to `null`. A blank is better than a guess.
- `node scripts/check-state-sources.mjs XX` confirms your quote is really on the page.

**Before you open a pull request**
```bash
node tests/validate.mjs
```
