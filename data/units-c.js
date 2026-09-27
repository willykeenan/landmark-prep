/* NY Real Estate Prep — study notes, units 13–19. */
(function (NYRE) {
  NYRE.units = NYRE.units || [];
  NYRE.units.push(
    {
      id: 13,
      title: "Licensee Safety",
      hours: 1,
      intro: "Common-sense safety for the office, showings, open houses and online. Exam questions usually ask for the safest practice.",
      sections: [
        {
          h: "At the office",
          b: [
            "Know your surroundings, the **entry and exit points**, and where the cameras, alarms and lighting are.",
            "Keep track of **staff and visitors**, control **keys and security codes**, and avoid **working alone**. Use a buddy when you enter or leave the office alone after hours.",
            "Meet **new clients at the office first**. Get their full name and contact information and **copy a photo ID** before going to a property with them.",
          ],
        },
        {
          h: "Showings, open houses and on the road",
          b: [
            "Tell someone your **schedule** (who, where, when) and set a check-in time or code word.",
            "**Drive your own car** and park so you can leave easily. Let the client **walk ahead** of you. Stay near exits and don't go into confined spaces (basements, attics) behind a stranger.",
            "At **vacant properties and open houses**, use a partner if possible, check every room and exit at the start, lock up valuables and medications, and have visitors sign in.",
            "Keep your phone charged. Don't wear expensive jewelry. Trust your instincts and leave if something feels wrong.",
            "A **home office** needs its own security plan too.",
          ],
        },
        {
          h: "Cyber safety",
          b: [
            "**Wire fraud** is a major risk: criminals send fake wiring instructions. **Verify wiring instructions by phone, using a number you already know**, never one from the email.",
            "Protect **client personal information**: use strong passwords and two-factor authentication, don't use public Wi-Fi for client data, and shred documents.",
            "NY's **SHIELD Act** requires reasonable data safeguards and **notice of data breaches** that involve private information.",
            "Watch for **identity theft** targeting both licensees and clients.",
          ],
        },
        {
          h: "Liability and risk reduction",
          b: [
            "Accidents and injuries can create liability for the **broker, the agent, the owner** and **third parties**. Listing contracts may limit liability for acts of third parties.",
            "Using physical force in self-defense is governed by **Penal Law Article 35** (justification).",
            "**Reduce risk** with a written **office safety policy**, training, incident reporting and **follow-up**, and clear broker and agent responsibilities.",
          ],
        },
      ],
      numbers: [],
      traps: [
        "Always verify wiring instructions **by phone using a known number**. Never trust email instructions.",
        "First meetings with new clients should be **at the office**, with ID copied.",
      ],
    },

    {
      id: 14,
      title: "Taxes and Assessments",
      hours: 3,
      intro:
        "How NY property taxes are calculated, how assessments work, exemptions like STAR, and how owners challenge assessments (Grievance → SCAR or certiorari).",
      sections: [
        {
          h: "Why and how real property is taxed",
          b: [
            "Property taxes pay for **municipal services and schools**. **Exempt properties** include government, religious, educational and charitable property.",
            "Land and buildings are taxed because the tax is **predictable** and property is **hard to conceal**, and because land has historically been tied to wealth.",
            "**Ad valorem** means \"according to value.\"",
            "**NY State levies no real property tax.** Taxes come from **counties, cities, towns, villages and school districts**. Special districts (fire, water, sewer, lighting) add their own.",
          ],
        },
        {
          h: "The calculation",
          b: [
            "**Tax levy** = the budget minus other revenue. It is the amount that must be raised from property taxes.",
            "**Tax rate** = levy ÷ total **taxable assessed value**. It is expressed per $100, per $1,000, or in **mills**.",
            "**A property's tax** = its **assessed value × tax rate**, minus any exemptions.",
            "**Assessed value** is tied to market (full) value through the municipality's **assessment ratio (level of assessment)**. Properties within a municipality should be assessed at a **uniform percentage** of value.",
            "The **equalization rate** is set by the state to compare assessment levels between municipalities, so county and school taxes are shared fairly. Full value ≈ assessed value ÷ equalization rate.",
            "Some municipalities (including NYC and Nassau) use **homestead / non-homestead** (class) tax rates.",
          ],
        },
        {
          h: "Assessment issues",
          b: [
            "Assessments can differ because of **old vs new construction** and **undeclared improvements**. Building permits alert the assessor to new work.",
            "**Community-wide reassessment** is legal. Reassessing a property **just because it sold** (\"welcome stranger\" or selective reassessment) is **illegal**.",
            "Improvements discovered after the fact can be added to the roll, sometimes with **back taxes** (omitted property).",
          ],
        },
        {
          h: "Exemptions",
          b: [
            "**Veterans** exemptions: alternative, Cold War, and eligible-funds exemptions.",
            "**Senior citizens** (65+, income-limited): a partial exemption of up to 50% where adopted locally.",
            "**STAR (School Tax Relief):** reduces **school** taxes. **Basic STAR** is income-limited. **Enhanced STAR** is for seniors (65+) below an income limit. New homeowners now get STAR as a **credit** (a check from the state) rather than an exemption.",
            "**Special assessments** pay for improvements that benefit specific properties (sidewalks, sewers). They are **specific liens** on those properties.",
          ],
        },
        {
          h: "Challenging an assessment",
          b: [
            "**Start informally with the assessor**, especially for **factual errors** like the wrong square footage.",
            "File a **grievance** (complaint) with the **Board of Assessment Review (Grievance Board)** by Grievance Day. In most towns that is the **4th Tuesday in May**; cities and NYC (the Tax Commission) have their own schedules.",
            "**Grounds:** **unequal** assessment (assessed at a higher percentage than others), **excessive** assessment (above full value), **unlawful** assessment, or misclassification.",
            "**The Board's possible decisions:** **full denial**, a **full reduction as requested**, or a **partial reduction**.",
            "**SCAR (Small Claims Assessment Review):** only for **owner-occupied 1–3 family residential** property. File with the **county clerk** (a small fee, about $30) shortly after the Board's decision. A hearing officer reviews evidence such as sales data, assessments and ratios, and can make the same kinds of decisions. Further appeal is limited, through **Article 78**.",
            "**Commercial and other property:** a **tax certiorari** proceeding in State Supreme Court (RPTL Article 7).",
          ],
        },
        {
          h: "Unpaid taxes",
          b: [
            "Unpaid taxes become a **tax lien** with **priority over other liens**.",
            "Municipalities may foreclose (**in rem** tax foreclosure) or hold **tax sales**. **NYC sells tax liens.**",
            "**Agent's responsibility:** know how to **calculate the taxes** and verify them in the public records. Don't guess what a buyer's taxes will be.",
          ],
        },
      ],
      numbers: [
        ["NY State property tax", "none (local only)"],
        ["Grievance Day (most towns)", "4th Tuesday in May"],
        ["SCAR eligibility", "owner-occupied 1–3 family"],
      ],
      traps: [
        "Reassessing only the properties that just sold is **illegal** selective reassessment.",
        "SCAR is for **residential 1–3 family owner-occupied** property only. Commercial owners use **certiorari**.",
        "NY State itself does **not** levy property taxes.",
      ],
    },

    {
      id: 15,
      title: "Condominiums and Cooperatives",
      hours: 4,
      intro:
        "Very important in NYC. Know what a condo buyer gets vs a co-op buyer, the documents, board packages, sponsor issues, and how the closing costs differ.",
      sections: [
        {
          h: "Condominiums",
          b: [
            "**Condo = real property.** The owner holds the **unit in fee simple** (they get a **deed**) plus an **undivided percentage interest in the common elements**.",
            "Condos are created by recording a **declaration** under the NY Condominium Act (RPL Art. 9-B). **Bylaws** govern operations. Unit owners elect a **board of managers**, which may hire a **managing agent**.",
            "Owners pay **common charges**. Each unit is **taxed separately** and financed with a regular **mortgage** (with **title insurance** and **mortgage recording tax**).",
            "Many NYC condos have a **right of first refusal**: the board may match a sale offer, though it's rarely used. Board review is much lighter than a co-op's.",
            "**Sponsor (developer):** controls the board at first and appoints the managing agent. NY Attorney General rules **limit how long the sponsor can control the board**.",
          ],
        },
        {
          h: "New development and offering plans",
          b: [
            "Sponsors must file an **offering plan** with the **NY Attorney General** before selling. Read it for **special risks**, **tax projections**, **floor plans and square footage**, fees, price changes and the closing date.",
            "**Letters of intent (CPS-1 phase):** before the plan is accepted, a sponsor may test the market with **nonbinding** written reservations of specific units. They bind **neither** the purchaser nor the price.",
            "**Amendments** update the plan, including **price changes**, which sponsors often raise as units sell.",
            "A **certificate of occupancy** is needed before buyers can close and lenders will fund. A **temporary CO** is common in new buildings.",
            "Watch sponsor policies on **flipping** and **simultaneous closings**, and review **title issues**.",
          ],
        },
        {
          h: "Condo closing costs",
          b: [
            "**Buyer:** title insurance, **mortgage recording tax**, the **mansion tax** (1% at $1M+), attorney and bank fees. In NYC **new-development** sales, the buyer often also pays the **sponsor's transfer taxes** and attorney fee, which is negotiable.",
            "**Seller:** NYS and NYC **transfer taxes**, broker commission, attorney.",
            "Budget for **common charges** and real estate taxes, and the related **tax deductions**.",
          ],
        },
        {
          h: "Cooperatives",
          b: [
            "**Co-op = personal property.** A **corporation owns the building**. The buyer purchases **shares of stock** plus a **proprietary lease** for their unit.",
            "Shareholders pay **maintenance**, which covers the building's **underlying (blanket) mortgage**, taxes and operating costs.",
            "Buyers finance with a **share loan**: there is **no mortgage recording tax**, and a **UCC** filing is used instead. A **recognition agreement** is the co-op's acknowledgment of the lender's interest. A **co-op lien search** replaces title insurance.",
            "**NYS and NYC transfer taxes and the mansion tax** still apply to co-op sales. Many co-ops charge a **flip tax**, a transfer fee usually paid by the **seller**.",
            "The co-op may own the land (**fee simple**) or only lease it (**leasehold**). Know which.",
            "Under federal tax rules, shareholders can deduct their share of the co-op's **mortgage interest and property taxes**. This depends on the co-op qualifying, historically under the **80/20 rule** (80% of income from tenant-shareholders).",
          ],
        },
        {
          h: "Co-op due diligence and documents",
          b: [
            "**Review the financial statement and board minutes:** **maintenance and assessment history**, the **underlying mortgage**, the **reserve fund**, and planned projects.",
            "**Documents:** the **proprietary lease**, **stock certificate**, **offering plan**, **house rules** (moving, renovations, pets, sublets), and the **alteration agreement**.",
            "**Board package** (usually read by the managing agent and the board): the purchase application, a **fully executed contract**, a **financial statement** with every asset verified, **personal and business reference letters**, an **employment verification letter**, **tax returns (3 years recommended)**, a **credit check authorization**, and **required disclosures** (e.g., lead paint).",
            "**Interview prep:** most boards meet **monthly**, so timing matters. The buyer should know their package thoroughly and **fully disclose** everything.",
            "Boards may **reject a buyer for any non-discriminatory reason**, and courts defer to them under the **business judgment rule**. They may **never** reject for a protected-class reason.",
            "**Primary residence and subletting** rules: sponsor shares or **unsold shares** are often exempt from board approval and sublet limits, while resold shares are not.",
          ],
        },
        {
          h: "Qualifying a buyer",
          b: [
            "**Types of income:** salary, commission, bonus, interest, dividends, capital gains, business, rental, trust, alimony, Social Security.",
            "**Bank financing:** debt-to-income ratios, **loan-to-value**, fixed vs adjustable rates, loan terms.",
            "**Co-op admission** is often **stricter than the bank**: many boards require a large **down payment** (often 20%+) and **post-closing liquidity** (months or years of carrying costs in reserve).",
            "**Assets:** cash, stocks, bonds, mutual funds, T-bills, business interests, trust funds, gifts, real estate, collectibles, retirement assets. Boards may discount illiquid or retirement assets.",
          ],
        },
        {
          h: "Condops",
          b: [
            "A **condop** is a building divided into **condominium units**, typically a **residential unit that is itself a co-op** plus **commercial condo units**.",
            "It is created so that commercial income doesn't break the co-op's **80/20 rule** on passive income, and so the commercial space can be sold or financed separately.",
            "Condops often have **more flexible** sublet and purchase rules than traditional co-ops.",
          ],
        },
      ],
      numbers: [
        ["Condo ownership", "real property (deed)"],
        ["Co-op ownership", "personal property (shares + proprietary lease)"],
        ["Co-op tax deduction test", "80/20 rule"],
        ["Tax returns in board package", "3 years recommended"],
      ],
      traps: [
        "Co-op buyers pay **no mortgage recording tax** (a share loan isn't a mortgage), but the **mansion tax** still applies at $1M+.",
        "A CPS-1 letter of intent is **nonbinding** on both purchaser and price.",
        "A co-op board may reject for almost any reason, **except** a discriminatory one.",
      ],
    },

    {
      id: 16,
      title: "Commercial and Investment Properties",
      hours: 10,
      intro:
        "A big unit (10 hrs): the math of investment property (NOI, cash flow, cap rates) plus commercial lease vocabulary like escalations, square-footage factors and SNDA clauses.",
      sections: [
        {
          h: "Investment characteristics",
          b: [
            "**Risk:** the chance that returns fall short. Higher risk demands a higher return (and a higher cap rate).",
            "**Liquidity:** how fast an asset converts to cash. **Real estate is illiquid.**",
            "**Leverage:** using borrowed money (OPM, other people's money). **Positive leverage** happens when the property's return is **higher than the interest rate**, which boosts the return on equity. It also magnifies losses.",
            "**Property types:** unimproved land; offices (low-, mid- and high-rise); residential (single- and multi-family); mixed-use; retail (strip centers, neighborhood centers, regional malls, mega malls, outlets); industrial (manufacturing, warehouses, lofts).",
            "**Fee simple** (you own the land) vs **leasehold** (a long-term ground lease; you own the building for the lease term).",
          ],
        },
        {
          h: "Reconstructed operating statement (\"cash world\")",
          b: [
            "**Potential Gross Income (PGI):** all units rented for the full year.",
            "**− Vacancy & collection loss** = **Effective Gross Income (EGI)**, plus other income (laundry, parking).",
            "**− Operating expenses** = **Net Operating Income (NOI)**. Operating expenses include taxes, insurance, utilities, repairs and management. They do **not** include **debt service, depreciation, capital improvements or income taxes**.",
            "**NOI − Debt service** (mortgage principal and interest) = **Before-Tax Cash Flow (BTCF)**.",
            "**Equity dividend rate / cash-on-cash return** = BTCF ÷ equity (the cash invested).",
            "**BTCF − Income tax** = **After-Tax Cash Flow (ATCF)**.",
          ],
        },
        {
          h: "Taxable income (\"tax world\")",
          b: [
            "**Taxable income = NOI − mortgage interest − depreciation (cost recovery)**. Principal repayment is **not** deductible.",
            "**Income tax** = taxable income × the investor's tax rate. A negative taxable income can be a **tax shelter**, subject to the passive-loss rules in Unit 17.",
          ],
        },
        {
          h: "Capitalization (IRV)",
          b: [
            "**Value = NOI ÷ Cap rate.** Cap rate = NOI ÷ Value (or price). NOI = Value × Cap rate.",
            "Cover the one you want to find: **I** over **R × V**.",
            "A **higher cap rate means a lower value** for the same NOI, and signals more risk.",
            "Cap rates come from comparable sales: each comp's NOI ÷ its sale price.",
            "**Time value of money:** a dollar today is worth more than a dollar later. This is the basis of discounted cash flow.",
            "A **pro forma** is a **projected** income statement.",
          ],
        },
        {
          h: "Square footage",
          b: [
            "**Usable:** space the tenant occupies exclusively.",
            "**Rentable:** usable **plus the tenant's share of common areas** (lobbies, corridors, restrooms). Rent is based on it.",
            "**Carpetable:** the area that can actually be carpeted, the smallest measure.",
            "**Loss factor** = (rentable − usable) ÷ rentable. **Add-on factor** = (rentable − usable) ÷ usable. Example: 10,000 rentable and 8,000 usable gives a **20% loss factor** and a **25% add-on factor**.",
          ],
        },
        {
          h: "Commercial leases",
          b: [
            "**Gross lease:** the landlord pays operating expenses. **Net lease:** the tenant pays some or all of them. **Triple net (NNN):** taxes, insurance and maintenance.",
            "**Office leases** are often gross with escalations. **Retail** leases use **percentage rent**: base rent **plus a percentage of gross sales above a breakpoint**.",
            "The **natural breakpoint = annual base rent ÷ percentage rate**. For example, $60,000 ÷ 6% = $1,000,000 in sales.",
            "**Loft lease:** industrial or commercial loft space (NYC has a **Loft Law** for residential conversions).",
            "**Use clause:** limits the permitted use.",
            "**Attornment:** the tenant agrees to recognize a **new owner or foreclosing lender** as landlord.",
            "**Estoppel certificate:** the tenant **certifies the lease terms and status** (rent, defaults) to a buyer or lender, and can't later claim otherwise.",
            "**Subordination:** the lease ranks below the mortgage. **Non-disturbance:** the lender agrees **not to evict** a tenant who isn't in default if it forecloses. Together these are the **SNDA**.",
            "Sublease and assignment clauses usually require landlord consent.",
            "**Electric service:** **direct meter** (the tenant pays the utility), **submeter** (the landlord bills the tenant's measured use), or **rent inclusion** (included in rent, often adjusted by a survey).",
          ],
        },
        {
          h: "Escalation clauses",
          b: [
            "These let the landlord pass **increases in costs** through to tenants, usually by the tenant's **proportionate share** (tenant's rentable area ÷ building rentable area).",
            "**Base year:** the tenant pays its share of increases **over a base-year amount**.",
            "**Operating expense stop / tax stop:** the landlord pays up to a fixed amount, and the tenant pays its share above it.",
            "**Real property tax escalation:** the tenant pays its share of **tax increases**.",
            "**Direct operating escalation:** the tenant's share of increases in operating costs.",
            "**Porter's wage formula (NYC):** rent rises a set amount per square foot for each **$1 increase in the building porter's hourly wage**.",
            "**Fixed percentage** increases (e.g., 3% per year), or increases tied to the **Consumer Price Index (CPI)**.",
          ],
        },
      ],
      numbers: [
        ["Value", "NOI ÷ Cap rate"],
        ["Cash-on-cash", "BTCF ÷ equity"],
        ["Natural breakpoint", "base rent ÷ percentage rate"],
        ["Loss factor", "(rentable − usable) ÷ rentable"],
      ],
      traps: [
        "**Debt service is not an operating expense.** NOI is calculated **before** mortgage payments.",
        "Higher cap rate → **lower** value.",
        "Depreciation lowers **taxable income**, not NOI or cash flow.",
        "Rentable area is **larger** than usable area.",
      ],
    },

    {
      id: 17,
      title: "Income Tax Issues in Real Estate Transactions",
      hours: 3,
      intro:
        "Federal income tax topics: the home-sale exclusion, deductions, capital gains, depreciation, passive income, and 1031 exchanges. Explain these, but always refer clients to a tax professional.",
      sections: [
        {
          h: "Your home (principal residence)",
          b: [
            "**Exclusion of gain (IRC §121, from the Taxpayer Relief Act of 1997):** up to **$250,000** (single) or **$500,000** (married filing jointly) of gain on selling a principal residence is tax-free. You must have **owned and used it as your principal residence for 2 of the last 5 years**, and you can generally use the exclusion **once every 2 years**.",
            "**IRA first-time homebuyer:** up to **$10,000 (lifetime)** can come out of an IRA **without the 10% early-withdrawal penalty** (income tax may still apply).",
            "**Deductions** (if itemizing): **mortgage interest** on acquisition debt (up to $750,000 for loans after Dec. 15, 2017; $1M for older loans) and **property taxes** (limited by the state-and-local-tax **SALT cap**, which federal law raised for 2025–2029).",
            "Points paid to buy a principal residence are generally deductible **in the year paid**. Refinance points are deducted **over the life of the loan**.",
            "**Home equity loan** interest is deductible only if the money is used to **buy, build or substantially improve** the home.",
            "**Second or vacation homes:** mortgage interest can qualify. If the home is rented out, special mixed-use rules apply.",
          ],
        },
        {
          h: "Gain and basis",
          b: [
            "**Amount realized** = sale price − selling expenses (commission, transfer taxes and so on).",
            "**Adjusted basis** = purchase price + acquisition costs + **capital improvements** − **depreciation taken**.",
            "**Gain (or loss)** = amount realized − adjusted basis.",
            "**Short-term** (owned **1 year or less**) is taxed as **ordinary income**. **Long-term** (owned **more than 1 year**) gets **lower capital-gains rates**.",
            "**Depreciation recapture:** the part of the gain that comes from depreciation on real property is taxed at a rate of up to **25%**.",
          ],
        },
        {
          h: "Investment property",
          b: [
            "**Three kinds of income:** **active** (wages, commissions), **passive** (rental activities, limited partnerships), **portfolio** (interest, dividends).",
            "**Passive losses** generally offset only **passive income**. Owners who actively participate in rentals may deduct up to **$25,000** of losses against other income, phased out at higher incomes.",
            "**Depreciation (cost recovery), straight-line:** **residential rental = 27.5 years**, **nonresidential = 39 years**. Only the **building** is depreciated, **never the land**. Depreciable basis = cost − land value.",
            "Formula for operating income: **taxable income = NOI − interest − depreciation**. Tax = taxable income × rate.",
            "**Low-income housing tax credits** encourage affordable rental housing.",
          ],
        },
        {
          h: "Like-kind (1031) exchanges",
          b: [
            "Defers tax on the sale of **investment or business real property** that is exchanged for other like-kind real property. Residential, commercial, industrial, **unimproved land** held for investment (not a dealer's inventory), hotels and motels, and **leaseholds of 30+ years** all qualify.",
            "It does **not** cover a **personal residence** or **dealer property**.",
            "**Boot** is cash or other non-like-kind property received, including **mortgage relief** (debt reduction). Boot is **taxable** up to the gain realized.",
            "**Timing:** identify the replacement property within **45 days**, and close within **180 days** (or by the tax return due date, if earlier).",
            "A **qualified intermediary** must hold the sale proceeds. If the seller touches the money, the exchange fails.",
            "**Reverse exchanges** (buy the new property first) are possible under special rules.",
          ],
        },
      ],
      numbers: [
        ["Home sale exclusion", "$250,000 single / $500,000 married"],
        ["Ownership and use test", "2 of last 5 years"],
        ["Long-term capital gain", "held more than 1 year"],
        ["Residential rental depreciation", "27.5 years"],
        ["Nonresidential depreciation", "39 years"],
        ["1031 identify / close", "45 days / 180 days"],
        ["IRA first-time buyer withdrawal", "$10,000 lifetime"],
      ],
      traps: [
        "Land is **not** depreciable.",
        "A 1031 exchange does **not** apply to your personal home.",
        "Boot (including **mortgage relief**) is taxable.",
        "Principal payments are **not** deductible. Interest is.",
      ],
    },

    {
      id: 18,
      title: "Mortgage Brokerage",
      hours: 1,
      intro: "Mortgage broker vs mortgage banker, their roles in a deal, and the disclosure licensees need if they wear both hats.",
      sections: [
        {
          h: "Broker vs banker",
          b: [
            "A **mortgage broker** **arranges** loans between borrowers and lenders for a fee. It **doesn't fund the loan** with its own money. In NY it must be **registered with the Department of Financial Services (DFS)** under the Banking Law.",
            "A **mortgage banker** **lends its own funds** (often selling loans on the secondary market) and is **licensed by DFS**.",
            "Individual **loan originators** must be licensed under the federal **SAFE Act** (NMLS).",
          ],
        },
        {
          h: "Role in the transaction",
          b: [
            "The mortgage broker takes the application, shops lenders, gathers documents for **underwriting**, and coordinates the **commitment** and closing.",
            "**Prequalification:** an informal estimate of what a buyer can borrow. **Preapproval:** the lender has actually reviewed **credit and documents**, which makes it much stronger.",
            "**Commitment:** the lender's written promise to lend on stated terms. **Rate lock:** a guaranteed rate for a set period.",
            "**Nonconforming loan:** doesn't meet Fannie Mae or Freddie Mac standards, e.g., a **jumbo** loan above the conforming limit.",
            "**Lender rebate** (yield spread): the lender pays the broker for delivering a loan at a higher rate. It must be disclosed.",
            "NY mortgage brokers give a **pre-application disclosure and fee agreement** before collecting fees.",
          ],
        },
        {
          h: "Licensees who are also mortgage brokers",
          b: [
            "A real estate licensee who also acts as the buyer's mortgage broker must give the **mortgage broker dual agency disclosure** required under the Banking Law and get **written consent**.",
            "**RESPA** bans **kickbacks and unearned referral fees**. A real estate agent can't be paid just for **referring** a buyer to a lender.",
            "The real estate commission and any mortgage brokerage fee must be **separately disclosed**.",
          ],
        },
      ],
      numbers: [],
      traps: [
        "Mortgage **brokers** arrange loans. Mortgage **bankers** fund them.",
        "Preapproval is stronger than prequalification.",
        "Referral fees for sending buyers to a lender are illegal kickbacks under RESPA.",
      ],
    },

    {
      id: 19,
      title: "Property Management",
      hours: 2,
      intro: "What property managers do, the management agreement, budgets and maintenance, and their duties to the owner.",
      sections: [
        {
          h: "What a property manager is",
          b: [
            "A property manager oversees property for an owner: leasing, rent collection, maintenance, budgeting, reporting and tenant relations.",
            "Managed property includes **office, retail, residential, condos and co-ops** (for their boards), and industrial property.",
            "Managing property **for others for a fee** (leasing, collecting rent) requires a **real estate broker license**.",
          ],
        },
        {
          h: "The management agreement",
          b: [
            "It **creates an agency**. The property manager is a **general agent** and owes the owner **fiduciary duties**.",
            "It should be **in writing and signed**, and cover: a description of the property; the **term**; the manager's **authority**; reporting; the **management fee** (often a **percentage of gross collected rents**); accounting responsibilities; insurance and risk management; the owner's responsibilities and objectives; and how the agreement **may be terminated**.",
            "Under **175.3**, the manager may take **no rebates, commissions or profits on purchases** made for the owner without the owner's **full knowledge and consent**. **Security deposits** must be handled under GOL §7-103.",
          ],
        },
        {
          h: "Skills and duties",
          b: [
            "Supervising staff; **accounting** (monthly and annual reports); building systems (HVAC, plumbing, electrical, elevators, security); **landlord-tenant law**; leasing and space planning; marketing; codes; **union** negotiations; purchasing; finance and market trends; construction; and environmental issues.",
            "**Obligations to the owner:** meet the owner's **goals** (income, value, long-term plans), maintain the property to an agreed standard, plan for the future, and **report** regularly.",
            "Markets differ: office, retail (with **anchor stores**), residential, condos and co-ops, and management office operations.",
            "Designations such as CPM (Certified Property Manager) come through professional education.",
          ],
        },
        {
          h: "Budgets and maintenance",
          b: [
            "**Operating budget:** annual income and expenses. **Capital reserve budget:** money set aside for major replacements (roof, boiler). **Stabilized budget:** expenses averaged over several years.",
            "**Rent roll:** the list of units, tenants, rents and lease dates.",
            "**Variable expenses** change with occupancy or usage. **Capital expenses** are major improvements, not repairs.",
            "**Maintenance types:** **preventive** (scheduled upkeep that heads off problems), **corrective** (fixing what broke), routine housekeeping, and construction (tenant improvements).",
            "**Risk management:** avoid, control, transfer (insurance), or retain the risk.",
            "A **management proposal** and **marketing plan** are used to win and run assignments.",
            "**Evictions** must go through court. **Constructive eviction** and **actual eviction** are both defined in Unit 4. Self-help lockouts are illegal in NY.",
          ],
        },
      ],
      numbers: [["Manager's agency type", "general agent"]],
      traps: [
        "A property manager is a **general** agent. A listing broker is a **special** agent.",
        "No rebates on repairs or purchases without the owner's knowledge and consent (175.3).",
      ],
    }
  );
})((window.NYRE = window.NYRE || {}));
