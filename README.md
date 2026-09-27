# NY Real Estate Prep

A free, open-source study kit for the **New York State real estate salesperson exam**. There's nothing to install and no accounts; it works offline.

**Use it now:** https://willykeenan.github.io/ny-real-estate-prep/

![NY Real Estate Prep](docs/images/social-preview.png)

## What's inside

| | |
|---|---|
| **Study notes** | All 19 subjects of the official 77-hour syllabus (NYS DOS, eff. 12/21/2022). Each has a "numbers to know" table and an "exam traps" list. |
| **523 practice questions** | Original questions with an explanation for every answer, citing the statute or regulation where relevant. Practice by unit, unseen, or missed-last-time. |
| **423 flashcards** | Built from the syllabus "Key Terms" lists, with spaced repetition (Leitner boxes). |
| **Mock state exam** | 75 questions in 90 minutes, drawn from every unit in proportion to its syllabus hours. You get a pass/fail against 70%, a per-unit breakdown, and a full review. |
| **Unlimited math drills** | 24 problem types (commission splits, net-to-seller, prorations on 360- and 365-day years, transfer and mortgage recording tax, cap rates, depreciation, and more), freshly generated each time. |
| **Licensing roadmap** | Step-by-step, with official links. It shows how to get licensed for about **$80 total**: a free DOS-approved 77-hour course, free library proctoring, the $15 exam and the $65 license. |

Progress is saved in your browser, and you can export or import it to switch devices.

| Practice | Mock exam | Mobile |
|---|---|---|
| ![Practice](docs/images/practice.png) | ![Exam](docs/images/exam.png) | ![Mobile](docs/images/mobile-home.png) |

## Optional: a personal AI tutor that runs on your own computer

`tutor/tutor_server.py` is a small local service (Python standard library only) that powers a **Tutor** tab in the app. It answers with the [Claude Code](https://claude.com/claude-code) CLI using that CLI's own login, grounded in the study notes (`tutor/knowledge.md`, built by `node tutor/build_knowledge.mjs`).

- **Per-student memory, database style:** a local SQLite database holds each user's access level (`granted` / `paid` / `none`), full conversation history, latest study progress, and a short **brainfile** the tutor rewrites as it learns the student's goals, weak spots and preferences. The brainfile is mirrored to `data/brains/<user>.md`.
- **Locked down:** the model runs with **no tools** (`--tools ""`), no MCP servers, no user/project settings or hooks, in an empty temporary directory. It can only return text. Requests need a shared bearer token, and there are per-user rate limits.
- **Hook it up:** serve the app with `<html data-tutor-api="/your/api">`. Your server (which handles sign-in) forwards `POST /chat` and `GET /history` to the tutor with `Authorization: Bearer <token>` and `X-KE-User: <username>`.

![Tutor tab](docs/images/tutor.png)

```bash
python3 tutor/tutor_server.py --env-file tutor.env user-add sam --name Sam --access granted
python3 tutor/tutor_server.py --env-file tutor.env serve     # tutor.env: TUTOR_TOKEN=<32+ chars>, chmod 600
```

## Important

- This **does not replace the required 77-hour course**. NY law requires that course from a DOS-approved school before you can be licensed. The roadmap shows a free option.
- It is **not legal advice**. Laws, fees and school offers change, so confirm with the [NY Department of State](https://dos.ny.gov/real-estate-agent).
- The questions are **original**. They are not copied from any exam, course or book, and they are not actual state exam questions.

Content was checked in September 2026 against the DOS 77-hour curriculum, the DOS *Real Estate License Law* booklet (March 2026 edition), the DOS salesperson pages, and later changes. Those include the 2024 Property Condition Disclosure amendments (the $500 credit is gone), the DOS-2156 Housing & Anti-Discrimination Disclosure form, the 3-year Division of Human Rights filing window (claims on or after 2/15/2024), HSTPA tenant rules, and the NYC FARE Act.

## Run it locally

It's a static site with no build step:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. You can also open `index.html` directly.

## Tests

```bash
node tests/validate.mjs        # content and logic checks (no dependencies)
python3 tests/e2e.py           # headless browser run-through (needs: pip install playwright && playwright install chromium)
python3 tutor/test_tutor.py    # tutor service: access levels, isolation, brainfile, rate limits, tool-free model call
python3 tests/e2e_tutor.py     # Tutor tab in the browser against a fake-model tutor
```

`validate.mjs` checks:

- the syllabus hours (77)
- well-formed and unique questions
- balanced answer positions
- 12,000 generated math problems (valid, unambiguous, arithmetic spot-checked)
- the mock-exam allocation
- a list of known-stale facts that must not appear, such as the old $1,000 fine cap or the removed $500 PCDS credit

## Contributing

Corrections are especially welcome. If a rule has changed, open an issue with the source link.

- **Add a question:** in `data/questions-*.js`, add `Q(unit, "question", ["A", "B", "C", "D"], correctIndex, "explanation citing the rule")`. Choices are shuffled in the app, so avoid "all/none of the above". Numeric choice sets are shown in ascending order.
- **Edit notes:** `data/units-*.js`. **Flashcards:** `data/glossary.js`. **Roadmap:** `data/roadmap.js`. **Math generators:** `data/math.js`.
- Run `node tests/validate.mjs` before opening a pull request.

## License

- Code: [MIT](LICENSE)
- Study content (notes, questions, flashcards): [CC BY 4.0](LICENSE-CONTENT)
