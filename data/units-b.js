/* Landmark Prep, New York course — study notes, units 6–12. */
(function (NYRE) {
  NYRE.units = NYRE.units || [];
  NYRE.units.push(
    {
      id: 6,
      title: "Land Use Regulations",
      hours: 3,
      intro:
        "How government and private agreements control what can be built. Know the four government powers, variance standards (use vs area), nonconforming uses, and who does what.",
      sections: [
        {
          h: "Public controls: the four government powers (\"PETE\")",
          b: [
            "**Police power:** regulating to protect **health, safety, morals and welfare**. It covers **zoning**, **building codes**, subdivision rules and environmental review. **No compensation** is owed.",
            "**Eminent domain:** taking private property for **public use**, with **just compensation**. The legal process is called **condemnation**. When a regulation goes so far that it amounts to a taking, courts require compensation.",
            "**Taxation:** property taxes and special assessments.",
            "**Escheat:** the state takes property when an owner dies with no will and no heirs.",
          ],
        },
        {
          h: "Planning and zoning",
          b: [
            "Zoning is **local**. The town board, city council or village board **adopts the zoning ordinance**. \"**As-of-right**\" zoning means a use that is allowed without special approval.",
            "The **planning board** (appointed) prepares the **master (comprehensive) plan** and **official map**. It approves **subdivision plats**, reviews **site plans**, and advises other boards.",
            "**Zoning classifications:** residential, commercial, industrial, agricultural, vacant, public open space and parks, recreational, institutional.",
            "**Incentive zoning:** bonuses (e.g., extra density) in exchange for public amenities. **Cluster zoning:** homes grouped together to preserve open space. **PUD (planned unit development):** a mixed-use project planned as a whole.",
            "**Spot zoning** singles out one parcel for special treatment inconsistent with the plan, and is generally invalid. A **moratorium** temporarily halts development.",
            "**Transfer of development rights (TDR):** unused development potential moves from one parcel to another. **Air rights** can be sold too.",
            "**Setbacks**, height limits, density and **accessory uses** (e.g., accessory apartments, **home occupations**) are all set by the zoning ordinance.",
            "The **Open Meetings Law** (\"Sunshine Law\") requires public bodies to meet in public.",
          ],
        },
        {
          h: "Zoning Board of Appeals (ZBA)",
          b: [
            "The ZBA is **administrative and quasi-judicial, not policy-making**. It interprets the ordinance and grants **variances** and often **special use permits**.",
            "**Use variance** (to allow a use the zoning doesn't permit) requires **unnecessary hardship**: (1) no reasonable return is possible from any permitted use, (2) the hardship is **unique** to the parcel, (3) the variance **won't change the neighborhood's essential character**, and (4) the hardship was **not self-created**. All four must be shown.",
            "**Area variance** (relief from dimensional rules like setbacks or height) requires **practical difficulty**. The ZBA **balances** the benefit to the applicant against the harm to the neighborhood, considering: undesirable change, whether another feasible method exists, whether the variance is substantial, environmental impact, and whether the difficulty was self-created. Self-creation is considered but **doesn't automatically preclude** an area variance.",
            "**Special use permit (special exception):** a use the ordinance allows **if** stated conditions are met (e.g., a school in a residential zone).",
            "ZBA and planning board decisions are challenged in court through an **Article 78 proceeding**.",
          ],
        },
        {
          h: "Nonconforming uses and codes",
          b: [
            "**Nonconforming use:** a use that was legal before the zoning changed. It is \"**grandfathered**\" and may continue, but usually **cannot be expanded**, and it can be **lost if abandoned** or destroyed.",
            "**Building codes:** the **NYS Uniform Fire Prevention and Building Code** applies statewide, except that **NYC has its own Building Code**. Work requires a **building permit**.",
            "A **certificate of occupancy (CO)** confirms that a building complies and states its legal use. Lenders and buyers check it.",
            "**SEQRA (State Environmental Quality Review Act):** actions that may significantly affect the environment need review. A **lead agency** coordinates, and an **Environmental Impact Statement** may be required.",
            "**Interstate Land Sales Full Disclosure Act** (federal): for large subdivisions sold across state lines, buyers must get a **property report** and have **rescission rights**.",
            "**NY RPL Article 9-A** regulates the sale of **subdivided land**.",
            "**Local enforcement:** the building department (inspector, code enforcement officer), board of health, and local courts.",
          ],
        },
        {
          h: "Private controls",
          b: [
            "**Deed restrictions** and **restrictive covenants** (including subdivision CC&Rs) limit use. They are **enforced by other owners** through court action.",
            "If a private restriction and zoning conflict, the **more restrictive** one controls.",
            "The **doctrine of laches**: waiting too long to enforce a right can cost you that right.",
            "Racially restrictive covenants are **unenforceable** (Shelley v. Kraemer, 1948).",
          ],
        },
      ],
      numbers: [
        ["Use variance standard", "unnecessary hardship (all 4 tests)"],
        ["Area variance standard", "practical difficulty (balancing test)"],
        ["Appeal ZBA decision", "Article 78"],
      ],
      traps: [
        "The **ZBA** grants variances. The **planning board** approves subdivisions and site plans. The **legislative body** adopts the zoning law.",
        "Police power pays **no** compensation. Eminent domain **does**.",
        "The more restrictive rule wins when a deed restriction and zoning disagree.",
      ],
    },

    {
      id: 7,
      title: "Construction and Environmental Issues",
      hours: 5,
      intro:
        "Construction terms and house systems (2 hrs) and environmental hazards (3 hrs). You don't need to be an inspector. Know the vocabulary, the hazards, and when to recommend a professional.",
      sections: [
        {
          h: "Structure: bottom to top",
          b: [
            "**Footings:** concrete bases **below the frost line** that spread the load. **Foundation walls** sit on the footings. The alternative is a **slab-on-grade** (no basement) or a **crawl space**.",
            "**Sill plate:** the **first wood member** bolted to the top of the foundation.",
            "**Girders / beams:** main horizontal supports. **Lally columns** are steel posts, often concrete-filled, that hold up girders. **Joists** are horizontal members that frame floors and ceilings.",
            "**Studs:** vertical wall framing, usually **16\" on center**. **Bearing walls** carry loads from above; don't remove one without an engineer.",
            "**Headers** span openings in wood-framed walls. **Lintels** do the same job over openings in masonry. A **flitch plate** is a steel plate bolted between wood beams for strength.",
            "**Rafters** frame the roof and meet at the **ridge beam**. **Sheathing** covers the frame. **Flashing** seals joints against water.",
            "**Eave:** the roof overhang. **Soffit:** the underside of the overhang. **Fascia:** the vertical board at the roof edge.",
            "**Platform (western) framing:** each floor is built as a platform; the most common method. **Post-and-beam:** heavy timbers with wide spans. **Balloon framing:** studs run the full height; older homes.",
          ],
        },
        {
          h: "Energy, site and permits",
          b: [
            "**R-value** measures **resistance to heat flow**; **higher is better** insulation. Insulation goes in walls, attics, and around the **building envelope**.",
            "Proper **ventilation** prevents moisture, mold and ice dams.",
            "**Site:** drainage (grade water away from the house), landscaping, shading, walks, zoning compliance.",
            "**NYS on-site wells and septic systems** are regulated by the **Department of Health**. A septic system is typically designed by a **licensed professional engineer or registered architect**. A **percolation test** measures soil absorption. As-built drawings are often on file with the local health department.",
            "The **NYS Energy Code** sets efficiency standards for construction.",
          ],
        },
        {
          h: "Mechanical systems",
          b: [
            "**Heating:** **hot water (hydronic)** runs a boiler to baseboards or radiators. **Steam** uses a boiler and radiators. **Forced warm air** uses a furnace and ducts, and can share ducts with central AC. Fuels are oil, gas or electric.",
            "**BTU (British Thermal Unit)** measures heat energy and heating/cooling capacity.",
            "**Heat pumps** move heat in both directions (air-to-air). They are efficient in moderate climates and may need backup heat in deep cold.",
            "**Oil tanks:** **UST** (underground) or **AST** (aboveground). Leaks contaminate soil and groundwater. The **DEC** regulates petroleum storage, abandonment and testing.",
            "**Plumbing:** supply pipes are **copper**, older **galvanized** steel (which corrodes and restricts flow), brass or PEX. Drain and waste pipes are **cast iron** or **PVC**. Fixtures need proper **venting**.",
            "**Water supply** is **municipal** or a **private well**.",
          ],
        },
        {
          h: "Electrical",
          b: [
            "**Voltage** is the electrical \"pressure\". Homes have **120V** circuits for outlets and lights and **240V** for dryers, ranges and AC. The syllabus calls these 110/220.",
            "**Amperage** is the current capacity. Service is commonly **100–200 amps**; older 60-amp service is often inadequate.",
            "**Circuit breakers** (reset) replaced **fuses** (replaced when blown).",
            "**Aluminum branch wiring** from the 1960s–70s is a **fire risk** at connections. Copper is standard.",
            "**Wiring types:** **BX** is armored cable. **Romex** is non-metallic sheathed cable. **Conduit** is a metal or PVC tube. **Greenfield** is flexible metal conduit.",
            "The utility owns the service up to the meter; the owner is responsible beyond it. The **National Electrical Code** sets wiring standards.",
          ],
        },
        {
          h: "Warranties",
          b: [
            "**New homes (GBL Art. 36-B, housing merchant implied warranty):** **1 year** for workmanship and materials, **2 years** for plumbing, electrical, heating, cooling and ventilation systems, and **6 years** for **material (structural) defects**.",
            "**Home improvement contracts** (GBL Art. 36-A) must be in writing and include specific consumer protections.",
          ],
        },
        {
          h: "Environmental hazards",
          b: [
            "**Asbestos:** fireproof mineral fiber used in insulation, pipe wrap and tiles. It is dangerous when **friable** (crumbling), causing **asbestosis, lung cancer and mesothelioma**. Tests include **bulk sampling, air monitoring and wipe sampling**. It can be **encapsulated** or removed by licensed abatement contractors.",
            "**Lead:** found in paint (homes **built before 1978**), water (old pipes and solder) and soil. It is **most harmful to children** (brain and development).",
            "**Federal lead disclosure (Title X):** for pre-1978 housing, sellers and landlords must disclose known lead hazards and give the EPA pamphlet **\"Protect Your Family From Lead in Your Home.\"** Buyers get a **10-day** chance to inspect, which can be waived. The contract includes a lead warning statement, and records are kept **3 years**. **Agents must ensure compliance.**",
            "**Radon:** a colorless, odorless **radioactive gas** from uranium in soil. It is the **#2 cause of lung cancer**. The **EPA action level is 4 pCi/L**. The usual fix is **sub-slab depressurization** (a vent fan).",
            "**Indoor air quality:** \"sick building syndrome\". **Urea-formaldehyde foam insulation (UFFI)** gives off formaldehyde gas.",
            "**PCBs** (polychlorinated biphenyls): found in old electrical **transformers** and equipment; banned in 1979.",
            "**Underground storage tanks:** leaks are the concern, and older tanks are at greater risk. They need testing, removal or proper abandonment.",
            "**EMFs** (electromagnetic fields) from power lines: health effects are **unproven**.",
            "**CFCs** (chlorofluorocarbons): older refrigerants in air conditioners and refrigerators and old aerosols. They **deplete the ozone layer** and are being phased out under the Clean Air Act.",
            "**Mold:** caused by moisture. Test, find the water source, and remediate.",
            "**Water testing:** bacteria (coliform), minerals, **hardness**, **pH**, organics.",
            "**Wood-destroying insects:** inspectors must be **certified by NYS DEC**.",
          ],
        },
        {
          h: "Environmental assessments and laws",
          b: [
            "Mainly used in **commercial** deals. **Phase I** is **investigative**: records and a site visit, **no sampling**. **Phase II** is **testing and sampling**. **Phase III** is **remediation**. **Phase IV** is ongoing **management**.",
            "**CERCLA (\"Superfund,\" 1980):** liability for cleanup is **strict, joint and several, and retroactive**. Current owners can be liable even if they didn't cause the contamination. **SARA (1986)** added the **innocent landowner defense**, which requires \"all appropriate inquiry\" (a Phase I) before purchase.",
            "Other laws: **Clean Air Act**, **Safe Drinking Water Act**. **Wetlands** are regulated by the DEC and the Army Corps of Engineers.",
            "**The agent's role:** disclose known material defects, **recommend professional inspections**, and don't give expert opinions. Liability follows an agent who hides or misstates a known hazard.",
          ],
        },
      ],
      numbers: [
        ["Lead-paint disclosure applies to housing built", "before 1978"],
        ["Buyer's lead inspection period", "10 days"],
        ["EPA radon action level", "4 pCi/L"],
        ["New home warranty", "1 / 2 / 6 years"],
        ["Typical stud spacing", "16 inches on center"],
      ],
      traps: [
        "Higher **R-value** = **better** insulation.",
        "A **Phase I** assessment does **not** include sampling.",
        "Asbestos is most dangerous when **friable**.",
        "The **sill plate** is the first wood member, sitting on the foundation.",
      ],
    },

    {
      id: 8,
      title: "Valuation Process and Pricing Properties",
      hours: 3,
      intro:
        "Appraisal vs CMA, the definition of market value, the three approaches to value, and how to price a listing.",
      sections: [
        {
          h: "Appraisal, valuation, evaluation",
          b: [
            "**Appraisal:** an unbiased, written estimate of value by a **licensed or certified appraiser**. Federally related loans require one.",
            "**Valuation:** estimating the value of a specific interest in a specific property **as of a given date**.",
            "**Evaluation:** a study of a property's nature, quality or utility **without necessarily estimating value**. Examples: highest-and-best-use and feasibility studies.",
            "A **CMA (comparative market analysis)** is a licensee's **opinion of value** for pricing. **By law it may never be called an appraisal.**",
          ],
        },
        {
          h: "Market value",
          b: [
            "**Market value** is the **most probable price**, as of a **specific date**, in **cash or its equivalent**, after **reasonable exposure** in a competitive market. Both buyer and seller act **prudently, knowledgeably and in their own interest**, and neither is under **undue duress**.",
            "It is the **probable** price, **not the highest** possible price and not the first offer.",
            "**Price** is what a particular buyer and seller actually agree to, and may not equal value. **Cost** is the total spent to build, and may not equal value.",
            "**Direct (hard) costs** are labor and materials. **Indirect (soft) costs** include architect and engineering fees, professional fees, financing, lease-up, administration and permits.",
            "**Other kinds of value:** **investment value** (to a specific investor), **insurable value** (excludes land and foundations), **assessed value** (for taxes), **value in use**, **mortgage value**.",
          ],
        },
        {
          h: "Principles",
          b: [
            "**Highest and best use:** the use that is **legally permissible, physically possible, financially feasible and maximally productive**. It is judged both as if vacant and as improved.",
            "**Substitution:** a buyer won't pay more than the cost of an equally desirable substitute. This is the basis of the sales comparison approach.",
            "**Conformity:** value is maximized when properties are similar. **Regression:** the best house on the block loses value from its neighbors. **Progression:** the worst house gains value from them.",
            "**Contribution:** a feature is worth what it **adds** to value, not what it cost.",
            "**Supply and demand**, **change**, **anticipation** of future benefits (the basis of the income approach), and **competition**.",
            "**Plottage:** the extra value created by combining parcels. **Assemblage** is the act of combining them.",
          ],
        },
        {
          h: "The three approaches",
          b: [
            "**Sales comparison (market data):** compare to recently **sold** similar properties and **adjust the comparables, never the subject**. If the comp is **better**, **subtract** the feature's value from the comp's price. If the comp is **worse**, **add**. This is the best approach for **homes and vacant land**.",
            "**Cost approach:** **land value + (replacement or reproduction cost − depreciation)**. Best for **new or special-purpose** buildings (schools, churches) and for insurance.",
            "**Depreciation types:** **physical deterioration** (wear; curable or incurable), **functional obsolescence** (outdated design or layout; curable or incurable), **external (economic) obsolescence** (factors outside the property, like a new highway; **always incurable**).",
            "**Income approach:** **Value = Net Operating Income ÷ Capitalization rate** (IRV). Best for **income-producing** property.",
            "**Gross rent multiplier (GRM)** = **price ÷ monthly gross rent**, a quick method for small rentals. The gross income multiplier (GIM) uses **annual** income.",
            "**Reconciliation:** the appraiser **weighs** the approaches based on reliability. It is **not a simple average**.",
          ],
        },
        {
          h: "Pricing a listing (CMA)",
          b: [
            "**Collect data:** **recent sales** (the syllabus says **sold within the last 12 months**), **current competing listings**, **expired listings** (which show what was overpriced), and pending sales.",
            "**Weigh:** buyer appeal, market position, the property's assets and drawbacks, area market conditions, and recommended terms.",
            "Adjust the comparables and present a **market value range** and a recommended list price.",
            "**The salesperson's role:** competence, diligence, documentation, and clear communication. Never inflate a price to win a listing.",
          ],
        },
      ],
      numbers: [
        ["CMA sold comps", "within last 12 months"],
        ["External obsolescence", "always incurable"],
        ["Income approach", "Value = NOI ÷ Cap rate"],
        ["GRM", "Price ÷ monthly gross rent"],
      ],
      traps: [
        "**Adjust the comparable, not the subject.** A better comp → subtract.",
        "A CMA is **not** an appraisal and must never be called one.",
        "Market value = **most probable** price, not the highest.",
        "External (economic) obsolescence is **always incurable** because it's outside the property.",
      ],
    },

    {
      id: 9,
      title: "Human Rights and Fair Housing",
      hours: 6,
      intro:
        "Heavily tested and heavily enforced in NY. Know the federal, NY State and NYC protected classes, the exemptions (and who can't use them), the prohibited practices, and the DOS disclosure and posting rules.",
      sections: [
        {
          h: "Federal law timeline",
          b: [
            "**1866 Civil Rights Act:** bans **racial** discrimination in **all** property transactions, with **no exceptions**. Upheld in **Jones v. Mayer (1968)**.",
            "**1896 Plessy v. Ferguson:** \"separate but equal\" (later overturned). **1917 Buchanan v. Warley:** struck down racial zoning ordinances. **1954 Brown v. Board of Education:** ended \"separate but equal\" in schools.",
            "**1964 Civil Rights Act (Title VI):** no discrimination in **federally funded** programs.",
            "**1968 Fair Housing Act (Title VIII):** **race, color, religion, national origin**.",
            "**1974 Housing and Community Development Act:** added **sex**.",
            "**1988 Fair Housing Amendments Act:** added **disability (handicap)** and **familial status** (children under 18, pregnant women, people getting custody). It also strengthened HUD enforcement.",
            "**Federal protected classes (7):** race, color, religion, national origin, sex, disability, familial status.",
            "The **Americans with Disabilities Act (ADA)** covers public accommodations and commercial facilities, **including real estate offices**.",
          ],
        },
        {
          h: "Federal exemptions",
          b: [
            "**Owner-occupied building with 4 or fewer units** (\"Mrs. Murphy\").",
            "**Single-family home sold or rented by an owner** (who owns no more than 3) **without a broker**.",
            "**Religious organizations**, for their own members.",
            "**Private clubs**, for lodging for members.",
            "**Housing for older persons:** all residents **62+**, or **80% of units** with at least one person **55+**.",
            "**No exemption applies** if a **broker** is used or the advertising is discriminatory. The **1866 Act** allows **no exemption** for race.",
          ],
        },
        {
          h: "New York State Human Rights Law (Executive Law Art. 15)",
          b: [
            "**NYS housing protected classes include:** race, creed, color, national origin, **citizenship or immigration status**, sex, **sexual orientation**, **gender identity or expression**, **age**, disability, **marital status**, familial status, **military status**, **lawful source of income** (e.g., housing vouchers, Social Security, child support), and **status as a victim of domestic violence**.",
            "**Lawful source of income** means refusing Section 8 or other vouchers is illegal in NY.",
            "**NYS exemptions (owners only):** renting a unit in an **owner-occupied two-family** house; restricting all rooms in a housing accommodation to **one sex**; an owner or occupant renting **rooms in the home they live in**; and **senior housing** (62+, or 55+ per federal rules) for age and familial status only.",
            "These owner exemptions **don't extend to real estate licensees**. A broker may **never** discriminate. For example, you can't honor an owner-occupant's request to avoid a protected class.",
            "Complaints go to the **NYS Division of Human Rights**, now within **3 years** for claims arising on or after Feb. 15, 2024. They can also go to **HUD** (within **1 year**), to the **Department of State** (for licensee discipline), or to court. **Retaliation** is illegal.",
          ],
        },
        {
          h: "New York City Human Rights Law",
          b: [
            "NYC adds more housing protections, including **lawful occupation**, **partnership status**, **height and weight**, **pregnancy**, **criminal record** (with limits), **presence of children**, and **status as a victim of domestic violence, stalking or sex offenses**, in addition to the state list.",
            "It is enforced by the **NYC Commission on Human Rights**.",
          ],
        },
        {
          h: "Prohibited practices",
          b: [
            "**Refusing** to sell, rent, negotiate or deal, or saying a property is **unavailable** when it is available.",
            "**Different terms**, prices or services because of a protected class.",
            "**Steering:** guiding buyers or renters **toward or away from** neighborhoods or buildings based on a protected class. This includes \"helpful\" steering.",
            "**Blockbusting (panic peddling):** inducing owners to sell by claiming that people of a protected class are moving in and that values, crime or schools will suffer.",
            "**Redlining:** lenders or insurers refusing service in certain areas based on their composition.",
            "**Discriminatory advertising, applications or inquiries**, including words like \"perfect for young couple\" or \"no Section 8.\"",
            "Refusing **reasonable accommodations** (changes to rules or policies, e.g., allowing an assistance animal) or **reasonable modifications** (physical changes) for people with disabilities.",
            "Following a seller's or landlord's discriminatory **preference**. The licensee is liable too.",
            "Unequal access to amenities and resources based on protected characteristics.",
          ],
        },
        {
          h: "DOS disclosure and posting rules",
          b: [
            "**Housing and Anti-Discrimination Disclosure Form (DOS-2156), 19 NYCRR 175.28:** give it to every prospective **buyer, tenant, seller and landlord** at the **first substantive contact**, for **all property types**: residential, commercial, condos, co-ops and vacant land.",
            "It may be delivered by **email, text, electronic message, fax or hard copy**. A link is OK if the message says what it is. **Oral disclosure does not count.**",
            "Hard copy: get a **signed acknowledgment**. Electronic: keep a copy. Keep either **3 years**. If the person refuses to sign, write a **declaration under oath** and keep it 3 years.",
            "**175.29:** the broker posts the **fair housing notice** at every office, **in the window** if listings are posted there. There must be a **link on the homepage** of every broker, agent and team website, and the notice must be **displayed at open houses**. The DOS-2156 form must be available at **open houses and showings**.",
            "Every licensee must have completed **fair housing training** (6 hours in the 77-hour course, and 3 hours plus 2 hours of implicit bias in each CE cycle).",
          ],
        },
        {
          h: "Anti-bias concepts",
          b: [
            "**Implicit bias** (RPL §441): \"attitudes or stereotypes that affect an individual's understanding, actions and decisions in an **unconscious** manner.\"",
            "**Cultural competency:** \"understanding cultural norms, preferences and challenges within our diverse communities.\"",
            "Know the **legacy of segregation**, unequal treatment and historic lack of access to housing opportunity. **Testers** (paired shoppers) are used by fair-housing groups and the state. The licensing fee surcharges fund **statewide testing**.",
            "**Filtering down:** housing passes to lower-income occupants as it ages.",
          ],
        },
        {
          h: "Nonsolicitation and cease-and-desist (RPL §442-h, 175.17)",
          b: [
            "**Nonsolicitation order:** after finding intense solicitation tied to blockbusting fears, the Secretary of State may **bar all soliciting** of residential listings in a defined area for up to **5 years**.",
            "**Cease-and-desist zone:** owners can file a statement asking not to be solicited. Licensees must not solicit anyone on the **cease-and-desist list**, which is updated annually by **Dec. 31**. Zones last up to **5 years** and can be renewed.",
            "Separately, **any owner who tells you in writing** not to solicit them must be left alone.",
            "For this rule, \"residential\" means **1–3 family houses, co-ops and condos**.",
          ],
        },
        {
          h: "Broker and salesperson responsibilities",
          b: [
            "**The broker:** keeps a **fair housing policy**, posts signs, makes sure advertising complies, trains staff, reports violations, and keeps records.",
            "**The salesperson:** knows the law, gives the DOS forms, keeps social media and ads compliant, keeps good records, and attends training.",
            "A licensee found to have discriminated faces **license discipline including revocation**. A finding of discrimination is **presumptive evidence of untrustworthiness** (175.17(b)). There can also be civil penalties and damages.",
          ],
        },
      ],
      numbers: [
        ["Federal protected classes", "7"],
        ["Federal owner-occupied exemption", "4 or fewer units"],
        ["NYS owner-occupied exemption", "2-family house"],
        ["DHR complaint deadline", "3 years (claims on/after 2/15/2024)"],
        ["HUD complaint deadline", "1 year"],
        ["DOS-2156 record retention", "3 years"],
        ["Nonsolicitation / C&D zone max", "5 years"],
      ],
      traps: [
        "Owner exemptions **never** protect a real estate licensee's discriminatory conduct.",
        "The 1866 Act covers **race** with **no** exceptions.",
        "The DOS-2156 form covers **all** property types. The §443 agency form covers **residential only**.",
        "Oral delivery of the DOS-2156 **doesn't** count.",
        "Refusing housing vouchers = **lawful source of income** discrimination in NY.",
      ],
    },

    {
      id: 10,
      title: "Real Estate Mathematics",
      hours: 1,
      intro:
        "Only 1 hour of class, but math shows up across the exam. Learn these formulas, then drill with the Math tab, which makes unlimited fresh problems.",
      sections: [
        {
          h: "Percentages",
          b: [
            "**Part = Whole × Rate.** Rate = Part ÷ Whole. Whole = Part ÷ Rate.",
            "**Commission** = sale price × rate. Splits apply in order: total commission → co-broke split → the broker/salesperson split.",
            "**Net to seller:** price needed = desired net ÷ (1 − commission rate). Example: to net $380,000 after a 5% commission, 380,000 ÷ 0.95 = $400,000.",
            "**Appreciation or depreciation:** new value = original × (1 ± rate × years) for straight-line. Percent change = (new − old) ÷ old.",
            "**Points:** 1 point = 1% of the **loan** amount, not the price.",
            "**Profit on a sale:** percent profit = profit ÷ **cost** (what was paid), unless the question says otherwise.",
          ],
        },
        {
          h: "Interest and loans",
          b: [
            "**Simple interest** = Principal × Rate × Time. Monthly interest = balance × annual rate ÷ 12.",
            "**LTV** = loan ÷ value (or price, whichever is lower). Loan = value × LTV. Down payment = price − loan.",
            "**Qualifying:** maximum housing payment = gross monthly income × front-end ratio (e.g., 28%). Maximum total debt = income × back-end ratio (e.g., 36%).",
          ],
        },
        {
          h: "Area and measurement",
          b: [
            "**Rectangle** = length × width. **Triangle** = ½ × base × height. Break **irregular lots** into rectangles and triangles.",
            "**Perimeter** = the sum of all sides.",
            "**1 acre = 43,560 sq ft.** 1 square yard = 9 sq ft. 1 **hectare** = 10,000 m² ≈ **2.47 acres**. 1 mile = 5,280 ft.",
            "**Front foot:** measured along the street frontage. The first number in a lot size is usually the frontage (e.g., 50' × 100').",
            "**Price per square foot** = price ÷ square feet.",
            "**Volume** = length × width × height (cubic feet). 1 cubic yard = 27 cubic feet.",
          ],
        },
        {
          h: "Taxes and rates",
          b: [
            "**Property tax** = assessed value × tax rate.",
            "Rates can be per **$100** (divide the assessed value by 100 first), per **$1,000**, or in **mills** (1 mill = $0.001, so tax = AV × mills ÷ 1,000).",
            "**Assessed value** = market value × assessment ratio (equalization rate).",
            "**Tax rate** = tax levy (the amount to raise) ÷ total taxable assessed value.",
            "**NYS transfer tax** = **$2 per $500** of consideration (= **$4 per $1,000**, or 0.4%). Round up to the next $500 if the question says so.",
            "**Mortgage recording tax** = loan amount × rate. The rate varies by county, so the question will give it. **NYC**: 1.8% for loans under $500k, 1.925% for $500k+ on 1–3 family homes and condos.",
            "**NYC transfer tax (residential):** 1% at $500k or less, 1.425% above. **Mansion tax**: 1% at $1M+ (buyer).",
          ],
        },
        {
          h: "Prorations",
          b: [
            "First find the **daily (or monthly) amount**, then multiply by the days (or months) owed.",
            "**360-day \"statutory\" year:** every month counts as 30 days. **365-day year:** use actual days. **Always use the method the question gives.**",
            "**Taxes paid in advance** by the seller → the buyer reimburses the seller (credit the seller) for the days after closing.",
            "**Taxes owed in arrears** → the seller owes the buyer for the days before closing.",
            "**Rent** collected for the month → the buyer is credited for the days after closing.",
          ],
        },
        {
          h: "Investment math (see Unit 16)",
          b: [
            "**Value = NOI ÷ Cap rate.** Cap rate = NOI ÷ Value. NOI = Value × Cap rate.",
            "**Cash-on-cash** = before-tax cash flow ÷ cash invested.",
            "**GRM** = price ÷ monthly gross rent.",
            "**Straight-line depreciation (tax):** annual = depreciable basis (building only, **not land**) ÷ life. Residential rental = **27.5 years**; commercial = **39 years**.",
          ],
        },
      ],
      numbers: [
        ["1 acre", "43,560 sq ft"],
        ["1 hectare", "≈ 2.47 acres"],
        ["1 square yard", "9 sq ft"],
        ["1 mill", "$0.001 (1/10 of a cent)"],
        ["NYS transfer tax", "$2 per $500"],
        ["Statutory year", "360 days / 30-day months"],
      ],
      traps: [
        "Net-to-seller problems: **divide** by (1 − rate). Don't multiply by (1 + rate).",
        "Points are a percentage of the **loan**, not the price.",
        "Land is **never** depreciated.",
        "Read which proration convention (360 or 365) the question uses.",
      ],
    },

    {
      id: 11,
      title: "Municipal Agencies",
      hours: 2,
      intro:
        "Match each local agency to its job. Exam questions are usually \"which board does X?\"",
      sections: [
        {
          h: "Who does what",
          b: [
            "**City Council / Town Board / Village Board of Trustees (elected):** adopts **laws and ordinances**, including the **zoning ordinance** and cluster zoning approval, and adopts the **budget and tax rate**.",
            "**Planning Board (appointed):** the **master plan**, **subdivision approval**, site plans. It **advises** other boards on land-use matters.",
            "**Zoning Board of Appeals:** **variances**, zoning **interpretations**, and often special permits.",
            "**Architectural Review Board:** approves the look of **new construction and remodeling** under local ordinances.",
            "**Conservation Advisory Council / Wetlands Commission:** environmental issues and wetlands permits.",
            "**Historic Preservation / Landmark Commission:** approves work on **designated** properties and recommends properties for preservation.",
            "**Building Department:** **building permits**, inspections, **certificates of occupancy**. It is the \"**gatekeeper**\" for all construction.",
            "**Planning Department:** professional staff who advise all the boards.",
            "**Tax Assessor:** sets **assessments** and keeps property records.",
            "**Receiver of Taxes / Treasurer:** **collects taxes** and handles the accounting.",
            "**City / Town / Village Engineer:** **roads**, and **sewer and water connections**.",
            "**County Health Department:** **septic system approval**, well water, and some sewer approvals.",
          ],
        },
        {
          h: "NYC equivalents (practical, beyond the syllabus)",
          b: [
            "**Department of Buildings (DOB):** permits, COs, violations. **Board of Standards and Appeals (BSA):** NYC's variance board, equivalent to a ZBA.",
            "**City Planning Commission / Department of City Planning:** zoning and land use, including **ULURP** (Uniform Land Use Review Procedure). **Community Boards** give advisory input.",
            "**Department of Finance:** assessments and tax collection. **Landmarks Preservation Commission:** landmarks and historic districts.",
            "**HPD (Housing Preservation & Development):** housing maintenance code. **DEP (Environmental Protection):** water and sewer.",
          ],
        },
      ],
      numbers: [["Elected bodies", "council / town board / village trustees"]],
      traps: [
        "The **Planning Board** approves subdivisions. The **ZBA** grants variances.",
        "The **assessor** values property. The **receiver of taxes** collects.",
        "**Septic** approvals come from the **County Health Department**.",
      ],
    },

    {
      id: 12,
      title: "Property Insurance",
      hours: 1,
      intro: "The homeowner policy forms, how coverage amounts work, and what an agent should explain to a buyer.",
      sections: [
        {
          h: "Basics",
          b: [
            "Property insurance protects against financial loss from damage to property, and against **liability** for injuries or damage to others.",
            "Buy through **independent agents** (several companies), **captive agents or companies** (one company), or **insurance brokers** (who represent the buyer).",
            "**Monoline policy:** one type of coverage. **Package policy:** several coverages combined, as in a homeowners policy.",
            "**Standard homeowner coverage:** the **dwelling and other structures** against fire, windstorm, hail, vandalism and similar perils; **theft of personal property**; **liability** if someone is hurt through the owner's negligence; and **medical payments**.",
          ],
        },
        {
          h: "Policy forms (syllabus version)",
          b: [
            "**HO-1 (Basic):** named perils only.",
            "**HO-2 (Broad):** HO-1 plus more named perils.",
            "**HO-3 (Special):** the **most widely used** homeowner policy. It covers **all losses except those specifically excluded** (\"open perils\") on the dwelling.",
            "**HO-4 (Tenants / co-op owners):** personal property and liability.",
            "**HO-5 (Comprehensive):** HO-3 **plus open-perils coverage on personal property**.",
            "**HO-6 (Condominium owners):** the unit interior, improvements, contents and liability. The **association** insures the building and common elements.",
            "**HO-8 (Modified / market value):** for older homes where replacement cost far exceeds market value. It pays **actual cash value**.",
          ],
        },
        {
          h: "How much coverage",
          b: [
            "**Replacement cost:** the cost to rebuild or replace new, **without** deducting depreciation.",
            "**Actual cash value:** replacement cost **minus depreciation**.",
            "Many policies require insuring at least **80% of replacement cost** to be paid in full on partial losses (the **coinsurance** clause).",
            "Coverage can be raised: higher liability limits, scheduled valuables, other structures. An **umbrella** policy adds liability coverage above the base policies.",
            "**Deductible:** the part of a loss the owner pays. **NY requires clear disclosure of windstorm or hurricane deductibles**, which can be a percentage of the dwelling coverage.",
          ],
        },
        {
          h: "When coverage is hard to get",
          b: [
            "**NY Property Insurance Underwriting Association (NYPIUA):** the state's **FAIR plan**, an insurer of last resort.",
            "**National Flood Insurance Program (NFIP, FEMA):** standard homeowner policies **exclude flood**. Flood coverage is required for federally backed mortgages in **Special Flood Hazard Areas**, and new policies usually have a **30-day waiting period**.",
            "The **Coastal Market Assistance Program** helps coastal homeowners find coverage.",
            "**Cancellation and nonrenewal:** NY limits the reasons an insurer can cancel a homeowner policy once it has been in force for a while (e.g., nonpayment, fraud, a material increase in hazard) and requires **advance written notice**.",
          ],
        },
        {
          h: "The agent's role",
          b: [
            "Explain the **purpose and cost** of insurance to buyers early, since it affects affordability.",
            "Explain that the **lender requires hazard insurance** and is named as **mortgagee (loss payee)**.",
            "Explain that premiums are often **escrowed** along with property taxes.",
            "**Cash buyers** should still bind a policy **effective at closing**. Under NY's GOL §5-1311, **risk of loss** shifts to the buyer when **title or possession** passes.",
          ],
        },
      ],
      numbers: [
        ["Most common homeowner form", "HO-3"],
        ["Condo unit owner form", "HO-6"],
        ["Tenant form", "HO-4"],
        ["Coinsurance threshold (typical)", "80% of replacement cost"],
      ],
      traps: [
        "Standard homeowner policies **do not cover flood**.",
        "Actual cash value = replacement cost **minus depreciation**.",
        "HO-6 = **condo**; HO-4 = **tenant** (and co-op per the syllabus).",
      ],
    }
  );
})((window.NYRE = window.NYRE || {}));
