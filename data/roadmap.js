/* Landmark Prep, New York course — the licensing roadmap. Facts checked against dos.ny.gov in Sept 2026.
 * Fees and providers change; every step links to the official source. */
(function (NYRE) {
  NYRE.roadmap = {
    checkedOn: "September 2026",
    steps: [
      {
        id: "eligible",
        title: "Check that you're eligible",
        cost: "$0",
        next: "Check the basics: 18 or older, and have (or plan to get) a New York photo ID.",
        action: ["DOS: Become a Real Estate Salesperson", "https://dos.ny.gov/real-estate-agent"],
        body: [
          "You must be **over 18**.",
          "To be licensed you need a **current New York State DMV photo driver's license or non-driver ID** (DOS pulls your pocket-card photo from DMV). See **Get your New York photo ID** below. You can take the course and the exam with the ID you have now.",
          "A criminal record is **not an automatic bar**. DOS reviews it case by case (Correction Law Article 23-A). The application asks about it, so answer honestly.",
        ],
        links: [["DOS: Become a Real Estate Salesperson", "https://dos.ny.gov/real-estate-agent"]],
      },
      {
        id: "course",
        title: "Take the 77-hour course (it can be free)",
        cost: "$0–$500+",
        next: "Enroll in the free 77-hour course at LearnCycle (the \"License Essentials\" tier) and start the first module.",
        action: ["Enroll free at LearnCycle", "https://learncycle.com/real-estate/new-york/pre-licensing"],
        body: [
          "The license law requires **77 hours from a DOS-approved school**. Only an approved school can issue the completion certificate, so there's no way around this step. Every approved school teaches the **same state syllabus**.",
          "**Free option:** as of September 2026, **LearnCycle**, a school on the DOS approved list, offers the full 77-hour course **free** (its \"License Essentials\" tier). Paid add-ons are optional.",
          "Other approved online schools typically charge **$99–$300**. Classroom programs can cost $400+.",
          "Online courses must be **finished within 12 months** of starting (19 NYCRR 176.25). For classroom courses you can miss **no more than 10%** of the time.",
          "Some brokerages reimburse course costs for new agents, so ask when you interview.",
        ],
        links: [
          ["DOS: approved qualifying schools", "https://dos.ny.gov/real-estate-course-providers"],
          ["LearnCycle NY pre-licensing (free tier)", "https://learncycle.com/real-estate/new-york/pre-licensing"],
          ["Official 77-hour syllabus", "https://dos.ny.gov/real-estate-salesperson-77-hour-curriculum-eff-12212022"],
        ],
      },
      {
        id: "nyid",
        title: "Get your New York photo ID",
        cost: "DMV fee",
        next: "Moved here recently? Swap your out-of-state license at the DMV (New York asks new residents to do it within 30 days).",
        action: ["DMV: exchange an out-of-state license", "https://dmv.ny.gov/driver-license/exchange-out-of-state-driver-license"],
        body: [
          "DOS issues your license only if you have a **current New York State driver's license or non-driver ID**, and your license card uses that DMV photo. You don't need it for the course or the exam, so start it early and let it run alongside.",
          "**Moved to New York with an out-of-state license?** New York asks new residents to **exchange it within 30 days**. It's done **in person at a DMV office**: you surrender the old license, pass a vision test there (or bring form MV-619), and pay the fee. The old license must have your photo, be current or expired less than 24 months, and have been issued at least 6 months ago.",
          "**Don't drive?** Get a **non-driver ID** at a DMV office instead. Bring proof of your date of birth and your Social Security card.",
          "Use the DMV's online **pre-screening** to see exactly which documents to bring, and book an appointment to skip the line.",
        ],
        links: [
          ["DMV: exchange an out-of-state license", "https://dmv.ny.gov/driver-license/exchange-out-of-state-driver-license"],
          ["DMV: get a non-driver ID", "https://dmv.ny.gov/non-driver-id/get-a-non-driver-id"],
        ],
      },
      {
        id: "final",
        title: "Pass the school's final exam (proctored)",
        cost: "$0–$99",
        next: "Book an approved proctor for your course final. Call your local library first; many do it free.",
        body: [
          "Online courses end with a **proctored final exam**. Most schools, including LearnCycle's free tier, need an **approved in-person proctor**. A few schools are approved to give the final **online at home**; LearnCycle includes that in its paid tiers (**$99**, or $149 with exam prep).",
          "For an in-person final, **follow your school's instructions for booking an approved proctor**, and **try your local public library first**, since many proctor for free. Private proctors usually charge about $25–$54.",
          "Failing the final means failing the course. Schools may offer a make-up exam, so check the retake policy before you start.",
          "When you pass, the school gives you a signed, sealed **certificate of completion**. Keep it (and a scan). The school also keeps your completion records on file.",
        ],
        links: [],
      },
      {
        id: "schedule",
        title: "Schedule the state exam on eAccessNY",
        cost: "$15",
        next: "Make your eAccessNY account and book the $15 state exam once your mock scores reach 80%.",
        action: ["Open eAccessNY", "https://appext20.dos.ny.gov/nydos/selSearchType.do"],
        body: [
          "Create an **eAccessNY** account and choose **Apply to Take an Exam**. The fee is **$15** per attempt.",
          "**Format:** multiple choice, based on the 77-hour syllabus, with **90 minutes** to finish. Schools report it as **75 questions with a 70% pass mark** (53 correct). DOS reports only **pass/fail**.",
          "**Bring:** a **current (unexpired) government photo ID** (driver's license, state ID, IDNYC, passport, etc.) and the **\"Summary of Your Submission\"** page you printed when scheduling.",
          "**Calculators** are allowed if they're silent, battery or solar powered, non-printing, and have no alphabet keyboard. **No one is admitted after the start time.** No food, bags or phones in use.",
          "**NYC exam site:** 123 William Street, 2nd Floor, New York, NY 10038. You can reschedule up to 6 days before your exam date.",
        ],
        links: [
          ["eAccessNY (schedule the exam / apply)", "https://appext20.dos.ny.gov/nydos/selSearchType.do"],
          ["DOS exam sites", "https://dos.ny.gov/real-estate-salesperson-exam-sites"],
        ],
      },
      {
        id: "pass",
        title: "Pass, then find a sponsoring broker",
        cost: "$0",
        next: "Pass the state exam, then line up a sponsoring broker. Interview a few.",
        body: [
          "Results show up in eAccessNY. A passing result is **valid for 2 years**. If you fail, you can schedule another attempt.",
          "You can't get the license without a **sponsoring broker**. Interview a few: ask about training, splits, desk fees, whether they reimburse courses, and what kind of deals they do (NYC rentals vs sales).",
        ],
        links: [],
      },
      {
        id: "apply",
        title: "Apply for the license",
        cost: "$65",
        next: "Apply for your license in eAccessNY ($65); your broker approves it online.",
        action: ["DOS: salesperson FAQ", "https://dos.ny.gov/real-estate-salesperson-frequently-asked-questions"],
        body: [
          "Apply online in **eAccessNY** after you pass. The fee is **$65** ($55 plus a $10 fair-housing surcharge) and is **non-refundable**.",
          "Your **sponsoring broker must log in and authorize** the application.",
          "Once approved, the license is mailed to the broker's business address. Your pocket card uses your DMV photo.",
        ],
        links: [["DOS: salesperson FAQ", "https://dos.ny.gov/real-estate-salesperson-frequently-asked-questions"]],
      },
      {
        id: "after",
        title: "After you're licensed",
        cost: "$65 every 2 years",
        next: "You're licensed. Renew every 2 years with 22.5 hours of continuing education.",
        body: [
          "The license lasts **2 years**. Renewal requires **22.5 hours of continuing education**, including **2 hours of agency in your first term**.",
          "Give the **agency disclosure** (RPL §443) and the **Housing & Anti-Discrimination Disclosure** (DOS-2156) at first substantive contact. Keep acknowledgments for 3 years.",
          "Optional costs come later: REALTOR association and MLS dues, desk fees, E&O insurance. Ask your broker what's required.",
        ],
        links: [["NY Real Estate License Law (PDF, March 2026)", "https://dos.ny.gov/system/files/documents/2026/03/real-estate-license-law_03.2026.pdf"]],
      },
    ],
    minimumCost: [
      ["77-hour course (free tier)", 0],
      ["Course final proctoring (free at many libraries)", 0],
      ["State exam", 15],
      ["License application", 65],
    ],
  };
})((window.NYRE = window.NYRE || {}));
