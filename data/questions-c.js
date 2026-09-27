/* Landmark Prep, New York course — original practice questions, units 10–19. */
(function (NYRE) {
  NYRE.questions = NYRE.questions || [];
  function Q(u, q, c, a, e) { NYRE.questions.push({ u: u, q: q, c: c, a: a, e: e }); }

  /* ---------- Unit 10: Real Estate Mathematics ---------- */
  Q(10, "A home sells for $650,000 with a 5% commission. The listing broker keeps half, and the listing salesperson receives 60% of the listing broker's share. How much does the salesperson earn?",
    ["$9,750", "$16,250", "$19,500", "$32,500"], 0,
    "$650,000 × 5% = $32,500. Half = $16,250. 60% of that = $9,750.");
  Q(10, "A seller wants to net $475,000 after paying a 5% commission (ignore other costs). The minimum sale price is:",
    ["$475,000", "$498,750", "$500,000", "$523,750"], 2,
    "Price = net ÷ (1 − rate) = $475,000 ÷ 0.95 = $500,000.");
  Q(10, "A rectangular parcel measures 330 feet by 660 feet. How many acres is it?",
    ["2.5", "4", "5", "10"], 2,
    "330 × 660 = 217,800 sq ft ÷ 43,560 = 5 acres.");
  Q(10, "A triangular lot has a 200-foot base and a 150-foot height. Its area is:",
    ["350 sq ft", "7,500 sq ft", "15,000 sq ft", "30,000 sq ft"], 2,
    "½ × 200 × 150 = 15,000 sq ft.");
  Q(10, "A 1,850-square-foot condo sells for $999,000. The price per square foot is closest to:",
    ["$450", "$500", "$540", "$585"], 2,
    "$999,000 ÷ 1,850 = $540.");
  Q(10, "A buyer pays 2 points on a $400,000 loan to buy a $500,000 home. The points cost:",
    ["$800", "$4,000", "$8,000", "$10,000"], 2,
    "Points are based on the loan: $400,000 × 2% = $8,000.");
  Q(10, "What is the first month's interest on a $300,000 loan at 6% annual interest?",
    ["$150", "$1,500", "$1,800", "$18,000"], 1,
    "$300,000 × 6% ÷ 12 = $1,500.");
  Q(10, "A borrower obtains a $360,000 loan on a property valued at $450,000. The loan-to-value ratio is:",
    ["75%", "80%", "85%", "90%"], 1,
    "$360,000 ÷ $450,000 = 80%.");
  Q(10, "A property is assessed at $250,000 and the tax rate is $3.20 per $100 of assessed value. The annual tax is:",
    ["$800", "$7,812.50", "$8,000", "$80,000"], 2,
    "$250,000 ÷ 100 = 2,500 × $3.20 = $8,000.");
  Q(10, "A property assessed at $180,000 is taxed at 45 mills. The annual tax is:",
    ["$810", "$4,500", "$8,100", "$81,000"], 2,
    "45 mills = $0.045 per dollar: $180,000 × 0.045 = $8,100.");
  Q(10, "Using NY's transfer tax of $2 for each $500 of consideration, what is the state transfer tax on a $725,000 sale?",
    ["$1,450", "$2,900", "$5,800", "$7,250"], 1,
    "$725,000 ÷ 500 = 1,450 units × $2 = $2,900 (0.4%).");
  Q(10, "An NYC condo buyer takes a $600,000 mortgage. At a mortgage recording tax rate of 1.925%, the tax is:",
    ["$1,155", "$6,000", "$10,800", "$11,550"], 3,
    "$600,000 × 1.925% = $11,550.");
  Q(10, "The seller prepaid calendar-year taxes of $7,200. Closing is June 30, and the seller owns that day. Using a 360-day year, the proration is:",
    ["Credit seller $3,600, debit buyer $3,600", "Debit seller $3,600, credit buyer $3,600", "Credit seller $7,200", "No adjustment"], 0,
    "The seller paid for July–December (6 months × $600 = $3,600), which the buyer will use, so the buyer reimburses the seller.");
  Q(10, "Annual taxes of $7,300 have not been paid yet this year (not a leap year). Closing is March 31, and the seller owns the closing day. Using a 365-day year, the proration is:",
    ["Credit seller $1,800", "Debit seller $1,800, credit buyer $1,800", "Debit buyer $5,500", "Credit seller $5,500"], 1,
    "$7,300 ÷ 365 = $20/day. Jan 1–Mar 31 = 90 days × $20 = $1,800 owed by the seller, which the buyer will pay later.");
  Q(10, "A building produces NOI of $84,000. At a 7% capitalization rate, its value is:",
    ["$588,000", "$840,000", "$1,120,000", "$1,200,000"], 3,
    "Value = NOI ÷ rate = $84,000 ÷ 0.07 = $1,200,000.");
  Q(10, "An investor pays $750,000 for a property with NOI of $45,000. The cap rate is:",
    ["5%", "6%", "6.5%", "16.7%"], 1,
    "$45,000 ÷ $750,000 = 6%.");
  Q(10, "A two-family home sells for $540,000 and rents for $4,500 per month. Its gross rent multiplier is:",
    ["10", "12", "100", "120"], 3,
    "$540,000 ÷ $4,500 = 120.");
  Q(10, "An investor buys a rental house for $550,000; the land is worth $110,000. What is the annual straight-line depreciation over 27.5 years?",
    ["$11,282", "$14,000", "$16,000", "$20,000"], 2,
    "Only the building is depreciated: ($550,000 − $110,000) ÷ 27.5 = $16,000.");
  Q(10, "A $400,000 home appreciates 5% per year (straight-line, not compounded) for 3 years. Its value is:",
    ["$420,000", "$460,000", "$463,050", "$480,000"], 1,
    "$400,000 × 5% × 3 = $60,000 gain → $460,000. Compounded would be $463,050.");
  Q(10, "An investor bought a condo for $320,000 and sold it for $400,000. The percentage of profit on the investment is:",
    ["20%", "25%", "80%", "125%"], 1,
    "Profit $80,000 ÷ cost $320,000 = 25%.");
  Q(10, "A borrower earns $7,500 per month and has $900 in other monthly debts. With a 36% back-end ratio, the maximum housing payment is:",
    ["$900", "$1,800", "$2,100", "$2,700"], 1,
    "$7,500 × 36% = $2,700 total debt − $900 = $1,800.");
  Q(10, "Fencing a rectangular yard 80 by 120 feet costs $25 per linear foot. The total cost is:",
    ["$2,000", "$5,000", "$10,000", "$240,000"], 2,
    "Perimeter = 2(80 + 120) = 400 ft × $25 = $10,000.");
  Q(10, "A 75' × 200' lot sells for $1,200 per front foot. The price is:",
    ["$1,200", "$90,000", "$240,000", "$18,000,000"], 1,
    "The front footage is the first dimension: 75 × $1,200 = $90,000.");
  Q(10, "About how many acres are in 4 hectares?",
    ["1.62", "4.94", "9.88", "40"], 2,
    "1 hectare ≈ 2.47 acres × 4 = 9.88.");
  Q(10, "A concrete patio measures 30 ft × 40 ft and 6 inches thick. About how many cubic yards of concrete are needed?",
    ["22.2", "66.7", "200", "600"], 0,
    "30 × 40 × 0.5 = 600 cu ft ÷ 27 = 22.2 cu yd.");
  Q(10, "An office suite has 5,000 rentable square feet and 4,000 usable square feet. The loss factor is:",
    ["20%", "25%", "80%", "125%"], 0,
    "(5,000 − 4,000) ÷ 5,000 = 20%. The add-on factor would be 25%.");
  Q(10, "A broker earned $41,000 on an $820,000 sale. What was the commission rate?",
    ["4.5%", "5%", "5.5%", "6%"], 1,
    "$41,000 ÷ $820,000 = 5%.");
  Q(10, "A home's market value is $500,000, the assessment ratio is 20%, and the tax rate is $28 per $1,000 of assessed value. The tax is:",
    ["$280", "$2,800", "$14,000", "$28,000"], 1,
    "Assessed value = $100,000. $100,000 ÷ 1,000 × $28 = $2,800.");
  Q(10, "A village must raise $4,500,000, and its total taxable assessed value is $150,000,000. The tax rate is:",
    ["$0.30 per $100", "$3 per $1,000", "$30 per $1,000", "$300 per $1,000"], 2,
    "$4.5M ÷ $150M = 0.03 = $30 per $1,000 (= 30 mills = $3 per $100).");
  Q(10, "A buyer purchases a $1,250,000 house outside NYC. The 1% mansion tax is:",
    ["$0", "$1,250", "$2,500", "$12,500"], 3,
    "1% of $1,250,000 = $12,500, paid by the buyer.");
  Q(10, "A $900,000 sale carries a 6% commission split equally between the listing and selling brokers. The selling salesperson gets 70% of the selling broker's share. The salesperson earns:",
    ["$12,600", "$18,900", "$27,000", "$37,800"], 1,
    "$54,000 total → $27,000 per side × 70% = $18,900.");
  Q(10, "A buyer puts 20% down on an $850,000 purchase and pays 1.5 points on the loan. The points cost:",
    ["$2,550", "$6,800", "$10,200", "$12,750"], 2,
    "Loan = $680,000 × 1.5% = $10,200.");
  Q(10, "A retail tenant pays $48,000 per year base rent plus 4% of gross sales over the natural breakpoint. The natural breakpoint is:",
    ["$192,000", "$480,000", "$1,200,000", "$12,000,000"], 2,
    "$48,000 ÷ 0.04 = $1,200,000.");
  Q(10, "An investor's property has NOI of $60,000 and annual debt service of $42,000. The investor put in $240,000 of cash. The cash-on-cash return is:",
    ["4%", "7.5%", "17.5%", "25%"], 1,
    "Cash flow $18,000 ÷ $240,000 = 7.5%.");

  /* ---------- Unit 11: Municipal Agencies ---------- */
  Q(11, "Which body adopts the municipal budget and tax rate?",
    ["Planning board", "Zoning board of appeals", "Town board / city council", "Tax assessor"], 2,
    "The elected legislative body adopts the budget, tax rate and laws.");
  Q(11, "Subdivision approval is granted by the:",
    ["Building department", "County clerk", "Receiver of taxes", "Planning board"], 3,
    "Planning board.");
  Q(11, "Variances and zoning interpretations are handled by the:",
    ["Zoning board of appeals", "Architectural review board", "Planning department", "Tax assessor"], 0,
    "ZBA.");
  Q(11, "The \"gatekeeper\" for construction activity, issuing building permits and certificates of occupancy, is the:",
    ["Planning board", "Building department", "Historic preservation commission", "Receiver of taxes"], 1,
    "Building department.");
  Q(11, "A board that reviews the appearance of new construction and remodeling under local ordinances is the:",
    ["Conservation advisory council", "Zoning board of appeals", "Architectural review board", "Board of assessment review"], 2,
    "Architectural review board.");
  Q(11, "An owner wants to fill a wetland on her lot. Which local body is most likely to review environmental issues?",
    ["Planning department", "Receiver of taxes", "Architectural review board", "Conservation advisory council / wetlands commission"], 3,
    "Conservation advisory council or wetlands commission.");
  Q(11, "Work on a building in a designated historic district requires approval from the:",
    ["Historic preservation / landmarks commission", "Tax assessor", "County health department", "Village engineer"], 0,
    "Landmarks commission.");
  Q(11, "Which official establishes the assessed value of property?",
    ["Receiver of taxes", "Tax assessor", "Town engineer", "Building inspector"], 1,
    "The assessor values property. The receiver of taxes collects.");
  Q(11, "Which official collects property taxes?",
    ["Tax assessor", "Planning board", "Receiver of taxes / treasurer", "County health department"], 2,
    "Receiver of taxes.");
  Q(11, "A builder needs approval to connect a new home to the municipal sewer. This is typically handled by the:",
    ["Historic commission", "Zoning board of appeals", "Tax assessor", "City/town/village engineer"], 3,
    "The municipal engineer handles roads and sewer and water connections.");
  Q(11, "Approval of a new septic system is typically granted by the:",
    ["County health department", "Planning board", "Architectural review board", "Receiver of taxes"], 0,
    "County health department.");
  Q(11, "Which of these is typically ELECTED?",
    ["Planning board", "Village board of trustees", "Zoning board of appeals", "Architectural review board"], 1,
    "Legislative bodies are elected. Planning boards and ZBAs are appointed.");
  Q(11, "In New York City, the body that hears zoning variance applications is the:",
    ["Department of Finance", "Rent Guidelines Board", "Board of Standards and Appeals", "Community Board"], 2,
    "The BSA serves as NYC's zoning board of appeals.");
  Q(11, "The professional staff that advises a municipality's boards on land use is the:",
    ["County clerk", "Receiver of taxes", "Board of trustees", "Planning department"], 3,
    "Planning department.");

  /* ---------- Unit 12: Property Insurance ---------- */
  Q(12, "The most widely used homeowners policy form, covering all perils except those excluded, is:",
    ["HO-3", "HO-2", "HO-1", "HO-8"], 0,
    "HO-3 (Special Form).");
  Q(12, "A condominium unit owner would typically buy which policy form?",
    ["HO-3", "HO-6", "HO-4", "HO-8"], 1,
    "HO-6. The association insures the building and common elements.");
  Q(12, "A renter who wants to insure belongings and liability buys:",
    ["HO-2", "HO-5", "HO-4", "HO-6"], 2,
    "HO-4, the tenant's policy (which the syllabus also lists for co-op owners).");
  Q(12, "Which form is designed for older homes and pays actual cash value rather than replacement cost?",
    ["HO-3", "HO-5", "HO-6", "HO-8"], 3,
    "HO-8 (Modified).");
  Q(12, "Actual cash value equals:",
    ["Replacement cost minus depreciation", "Replacement cost plus depreciation", "Market value of the land", "The assessed value"], 0,
    "ACV = replacement cost − depreciation.");
  Q(12, "A standard homeowners policy typically does NOT cover damage from:",
    ["Fire", "Flood", "Theft", "Windstorm"], 1,
    "Flood coverage comes from the National Flood Insurance Program or private flood policies.");
  Q(12, "NY's insurer of last resort for property owners who can't get coverage in the regular market is the:",
    ["National Flood Insurance Program", "SONYMA", "NY Property Insurance Underwriting Association (FAIR plan)", "FHA"], 2,
    "NYPIUA.");
  Q(12, "Why does a mortgage lender require hazard insurance?",
    ["It is optional for lenders", "To lower the interest rate", "To replace title insurance", "To protect the lender's security interest; the lender is named as mortgagee/loss payee"], 3,
    "The collateral must be protected.");
  Q(12, "A policy that combines property, liability and other coverages in one contract is a:",
    ["Package policy", "Monoline policy", "Umbrella policy", "Title policy"], 0,
    "A homeowners policy is a package policy.");
  Q(12, "A policy that provides extra liability coverage above the limits of the homeowner and auto policies is a(n):",
    ["HO-4", "Umbrella policy", "Flood policy", "Title policy"], 1,
    "Umbrella policy.");
  Q(12, "A cash buyer asks when to get homeowners insurance. The best answer is:",
    ["It isn't needed without a lender", "Six months after closing", "Have coverage in effect at closing, when risk of loss passes to the buyer", "Only after renovations"], 2,
    "Risk shifts to the buyer when title or possession passes (GOL §5-1311).");
  Q(12, "Many policies pay full replacement cost on partial losses only if the home is insured for at least what percent of replacement cost?",
    ["50%", "65%", "80%", "100%"], 2,
    "The typical coinsurance requirement is 80%.");
  Q(12, "Property taxes and insurance premiums collected with the monthly mortgage payment are held in:",
    ["A reserve fund of the co-op", "A trust fund for the broker", "The seller's account", "An escrow account"], 3,
    "Escrow (impound) account.");

  /* ---------- Unit 13: Licensee Safety ---------- */
  Q(13, "What is the safest way to handle a first meeting with a new, unknown buyer?",
    ["Meet at the office first and copy a photo ID", "Meet at the vacant listing after dark", "Pick the buyer up in your car", "Meet at the buyer's home"], 0,
    "Meet at the office first, get and copy ID, and tell colleagues your plans.");
  Q(13, "You receive an email from the \"title company\" with new wiring instructions for the buyer's down payment. You should:",
    ["Forward it to the buyer immediately", "Verify the instructions by calling the title company at a known, independently verified number", "Reply to the email to confirm", "Tell the buyer to wire the money quickly"], 1,
    "Wire fraud is common. Verify by phone using a known number.");
  Q(13, "During a showing, a safer practice is to:",
    ["Walk ahead of the client into basements", "Leave your phone in the car", "Let the client walk ahead and stay near exits", "Show the home alone at night"], 2,
    "Keep an escape route and let the client lead.");
  Q(13, "Before an open house begins, the agent should:",
    ["Leave the doors unlocked all night", "Turn off all lights", "Put out the owners' mail", "Check all rooms and exits, secure valuables and medications, and ideally have a partner"], 3,
    "Plan the open house for safety.");
  Q(13, "Which NY law requires businesses to protect private information and give notice of data breaches?",
    ["The SHIELD Act", "RESPA", "The Martin Act", "The Lien Law"], 0,
    "NY SHIELD Act.");
  Q(13, "The NY Penal Law article governing justification for using physical force in self-defense is:",
    ["Article 78", "Article 35", "Article 12-A", "Article 15"], 1,
    "Penal Law Article 35.");
  Q(13, "A key part of broker risk reduction is:",
    ["Having no written policies", "Letting agents decide individually", "Establishing and implementing an office safety policy with incident follow-up", "Avoiding training"], 2,
    "A written policy, training and follow-up.");
  Q(13, "What is the safest way to get to a first showing with a client you just met?",
    ["Ride in the client's car", "Walk together from a parking garage at night", "Let the client pick you up at home", "Drive your own car and keep your schedule with the office"], 3,
    "Keep control of your transportation and exit, and make sure someone knows where you are.");

  /* ---------- Unit 14: Taxes and Assessments ---------- */
  Q(14, "\"Ad valorem\" taxation means taxation:",
    ["According to value", "By a flat fee", "Based on income", "Based on lot frontage"], 0,
    "Ad valorem = according to value.");
  Q(14, "Which level of government in NY does NOT levy a real property tax?",
    ["County", "New York State", "School district", "Town"], 1,
    "The state doesn't levy property taxes. Local governments and school districts do.");
  Q(14, "A municipality's tax rate is found by:",
    ["Dividing market value by assessed value", "Multiplying the budget by the equalization rate", "Dividing the tax levy by the total taxable assessed value", "Adding exemptions to the levy"], 2,
    "Rate = levy ÷ taxable assessed value.");
  Q(14, "The state-set rate used to compare assessment levels between municipalities, so that county and school taxes are shared fairly, is the:",
    ["Mill rate", "Discount rate", "Cap rate", "Equalization rate"], 3,
    "Equalization rate.");
  Q(14, "The STAR program provides relief from:",
    ["School property taxes", "Income taxes", "Transfer taxes", "Sales taxes"], 0,
    "School Tax Relief.");
  Q(14, "Enhanced STAR is available to homeowners who:",
    ["Are first-time buyers", "Are 65 or older and meet income limits", "Are veterans", "Own commercial property"], 1,
    "Enhanced STAR is for seniors meeting income limits.");
  Q(14, "An assessor raises the assessment on a house only because it just sold for a high price, while neighboring homes are unchanged. This is:",
    ["Standard practice", "Equalization", "An illegal selective reassessment", "A special assessment"], 2,
    "Reassessment upon sale, alone, is illegal. Community-wide reassessment is legal.");
  Q(14, "A homeowner notices the assessor's records list 4 bedrooms instead of 3. The best first step is to:",
    ["File a certiorari action", "File with DHR", "Stop paying taxes", "Contact the assessor to correct the factual error"], 3,
    "Factual errors go first to the assessor.");
  Q(14, "A formal complaint about an assessment is first heard by the:",
    ["Board of Assessment Review (grievance board)", "State Supreme Court", "Zoning board of appeals", "Department of State"], 0,
    "The grievance goes to the BAR, on Grievance Day (the 4th Tuesday in May in most towns).");
  Q(14, "Small Claims Assessment Review (SCAR) is available for:",
    ["All commercial properties", "Owner-occupied 1–3 family residential properties", "Vacant land only", "Co-op buildings"], 1,
    "SCAR is limited to owner-occupied 1–3 family homes.");
  Q(14, "An owner of an office building wants to challenge the assessment after the grievance board denies relief. The owner would bring:",
    ["A SCAR petition", "An Article 78 against the buyer", "A tax certiorari proceeding", "A partition action"], 2,
    "Tax certiorari (RPTL Article 7).");
  Q(14, "A charge levied only on properties that benefit from a new sidewalk is a:",
    ["General tax", "Mortgage recording tax", "Transfer tax", "Special assessment"], 3,
    "A special assessment, which is a specific lien.");
  Q(14, "Compared with a mortgage recorded earlier, an unpaid real property tax lien is:",
    ["Superior (priority)", "Subordinate", "Equal", "Invalid"], 0,
    "Tax liens take priority.");
  Q(14, "When a municipality forecloses on property for unpaid taxes, the proceeding is typically:",
    ["In personam only", "In rem", "Non-judicial", "A SCAR"], 1,
    "In rem tax foreclosure (against the property).");
  Q(14, "Which property is typically exempt from real property taxes?",
    ["A shopping center", "A rental duplex", "A church used for worship", "A vacation home"], 2,
    "Religious, charitable, educational and government properties are generally exempt.");
  Q(14, "An owner claims her home is assessed at a higher percentage of market value than similar homes in the same town. This is a claim of:",
    ["Excessive assessment", "Misclassification", "Unlawful assessment", "Unequal assessment"], 3,
    "Unequal assessment.");
  Q(14, "How do assessors typically learn about undeclared improvements, such as a finished basement?",
    ["From building permits and inspections", "From the MLS only", "From the Department of State", "They can't be assessed"], 0,
    "Building permits tie into the assessment process.");
  Q(14, "After hearing a grievance, the Board of Assessment Review may:",
    ["Only deny the complaint", "Deny it, grant the full reduction requested, or grant a partial reduction", "Only raise the assessment", "Refer it to DOS"], 1,
    "Full denial, full reduction, or partial reduction.");
  Q(14, "One mill equals:",
    ["$0.001", "$0.01", "$0.10", "$1"], 0,
    "A mill is one-tenth of a cent.");

  /* ---------- Unit 15: Condominiums and Cooperatives ---------- */
  Q(15, "A condominium buyer receives:",
    ["Shares of stock and a proprietary lease", "A leasehold interest only", "A deed to the unit and an undivided interest in the common elements", "A membership certificate"], 2,
    "A condo is real property owned in fee.");
  Q(15, "A cooperative buyer receives:",
    ["A deed", "A tenancy by the entirety", "A life estate", "Shares in the corporation and a proprietary lease"], 3,
    "Co-op ownership is personal property.");
  Q(15, "The document recorded to create a condominium is the:",
    ["Declaration", "Proprietary lease", "Stock certificate", "Recognition agreement"], 0,
    "The declaration, under RPL Article 9-B.");
  Q(15, "Condominium owners pay monthly fees for upkeep of the common elements called:",
    ["Maintenance", "Common charges", "Flip taxes", "Assessments on stock"], 1,
    "Common charges. Co-op owners pay maintenance.");
  Q(15, "A co-op shareholder's monthly maintenance typically covers:",
    ["Only the shareholder's personal loan", "Only utilities", "The building's underlying mortgage, real estate taxes and operating costs", "Only the flip tax"], 2,
    "Maintenance covers the co-op's expenses, including the underlying mortgage.");
  Q(15, "A loan to buy a co-op apartment is a:",
    ["Mortgage subject to mortgage recording tax", "Blanket mortgage", "Reverse mortgage", "Share loan secured by the stock and proprietary lease (no mortgage recording tax)"], 3,
    "Co-op share loans aren't real property mortgages.");
  Q(15, "A three-party agreement in which the co-op acknowledges the lender's security interest in a shareholder's apartment is a:",
    ["Recognition agreement", "Estoppel certificate", "Alteration agreement", "Offering plan"], 0,
    "Recognition (Aztech) agreement.");
  Q(15, "A fee charged by some co-ops when an apartment is sold, usually paid by the seller, is a:",
    ["Mansion tax", "Flip tax", "Mortgage recording tax", "Common charge"], 1,
    "Flip tax (transfer fee).");
  Q(15, "Which tax applies to a $1.5 million co-op purchase in NY?",
    ["Mortgage recording tax", "Both", "Mansion tax", "Neither"], 2,
    "The mansion tax applies to residential transfers of $1M+, including co-ops. There's no MRT on share loans.");
  Q(15, "Before selling condo or co-op units in a new offering, a sponsor must file an offering plan with the:",
    ["Department of State", "HUD", "County clerk", "NY Attorney General"], 3,
    "The NY Attorney General's Real Estate Finance Bureau.");
  Q(15, "Letters of intent collected during the CPS-1 testing period are:",
    ["Nonbinding on both the purchaser and the price", "Binding contracts", "Binding on the purchaser only", "Recorded liens"], 0,
    "They are nonbinding reservations.");
  Q(15, "A co-op board rejects a buyer without stating a reason. Generally this is:",
    ["Illegal in all cases", "Permitted, as long as the reason isn't discriminatory", "Permitted only for rentals", "Allowed only if the sponsor agrees"], 1,
    "Courts defer to boards under the business judgment rule, but discrimination is illegal.");
  Q(15, "Which item is typically part of a co-op board package?",
    ["The seller's tax returns", "The building's deed", "A fully executed contract of sale and the buyer's financial statement", "The listing agreement"], 2,
    "It includes the contract, financials, reference letters, employment verification, tax returns, credit authorization and disclosures.");
  Q(15, "How many years of tax returns does the syllabus recommend including in a co-op board package?",
    ["1", "2", "3", "7"], 2,
    "3 years recommended.");
  Q(15, "Instead of title insurance, a co-op purchase typically involves a:",
    ["Survey", "Deed search only", "Certificate of occupancy", "Co-op lien search"], 3,
    "Lien search (and UCC search).");
  Q(15, "Many NYC condos give the board the right to match a buyer's offer. This is a:",
    ["Right of first refusal", "Recognition agreement", "Flip tax", "Proprietary lease"], 0,
    "Right of first refusal.");
  Q(15, "A building with a residential co-op and separately owned commercial condo units is a:",
    ["PUD", "Condop", "Timeshare", "Land trust"], 1,
    "A condop, often created so commercial income doesn't disqualify the co-op under the 80/20 rule.");
  Q(15, "The 80/20 rule relates to:",
    ["Loan-to-value limits", "Required reserves", "The share of a co-op's income that must come from tenant-shareholders for tax deductibility", "Board voting"], 2,
    "It governs whether shareholders can deduct their share of interest and taxes.");
  Q(15, "A document that sets rules for renovations in a co-op apartment is the:",
    ["Recognition agreement", "Offering plan", "Declaration", "Alteration agreement"], 3,
    "Alteration agreement.");
  Q(15, "A buyer purchasing shares still owned by the sponsor (unsold shares) often:",
    ["Is exempt from board approval and some sublet restrictions", "Has more restrictive sublet rules", "Must pay double maintenance", "Can't get financing"], 0,
    "Holders of unsold shares typically get more flexibility.");
  Q(15, "Who customarily governs a condominium?",
    ["The sponsor forever", "A board of managers elected by unit owners (after sponsor control ends)", "The Attorney General", "The county"], 1,
    "Board of managers.");
  Q(15, "Compared with a bank's requirements, co-op boards often require:",
    ["Less money down", "No financial disclosure", "Larger down payments and post-closing liquidity", "Only a credit score"], 2,
    "Boards often exceed the lender's standards.");
  Q(15, "The building's house rules are important to agents because they:",
    ["Set the sales price", "Set real estate taxes", "Replace the proprietary lease", "Govern day-to-day matters like moving, renovations, pets and sublets that affect buyers"], 3,
    "Buyers need to know the rules before they buy.");
  Q(15, "A new condo building doesn't yet have a final certificate of occupancy. This matters because:",
    ["Lenders and closings typically require a CO (often a temporary CO) before units can close", "It doesn't matter", "The AG issues COs", "Buyers can't live in condos without a CO for 10 years"], 0,
    "COs affect closing and financing.");

  /* ---------- Unit 16: Commercial and Investment Properties ---------- */
  Q(16, "Net operating income is calculated:",
    ["Before subtracting operating expenses", "After operating expenses, but before debt service", "After debt service and income taxes", "After depreciation"], 1,
    "NOI = EGI − operating expenses. Debt service isn't an operating expense.");
  Q(16, "Which is NOT an operating expense when calculating NOI?",
    ["Property taxes", "Insurance", "Mortgage payments (debt service)", "Repairs"], 2,
    "Debt service is subtracted after NOI to get cash flow.");
  Q(16, "Potential gross income minus vacancy and collection loss equals:",
    ["Net operating income", "Taxable income", "Cash flow", "Effective gross income"], 3,
    "Effective gross income.");
  Q(16, "NOI minus debt service equals:",
    ["Before-tax cash flow", "After-tax cash flow", "Taxable income", "Effective gross income"], 0,
    "BTCF.");
  Q(16, "Before-tax cash flow divided by the investor's cash equity is the:",
    ["Cap rate", "Cash-on-cash return (equity dividend rate)", "Loss factor", "GRM"], 1,
    "Cash-on-cash.");
  Q(16, "If NOI stays the same and the cap rate rises, the property's value:",
    ["Rises", "Stays the same", "Falls", "Doubles"], 2,
    "Value = NOI ÷ cap. A bigger divisor means a smaller value.");
  Q(16, "An investor borrows at 5% to buy a property that returns 8%. This is:",
    ["Negative leverage", "Liquidity", "No leverage", "Positive leverage"], 3,
    "Positive leverage: the return exceeds the cost of borrowing.");
  Q(16, "Real estate is considered relatively:",
    ["Illiquid", "Liquid", "Risk-free", "Tax-exempt"], 0,
    "It takes time to convert real estate to cash.");
  Q(16, "The space a tenant occupies exclusively, not counting shared areas, is:",
    ["Rentable square footage", "Usable square footage", "Gross building area", "Common area"], 1,
    "Usable. Rentable adds the tenant's share of common areas.");
  Q(16, "Rentable square footage includes:",
    ["Only the tenant's private space", "Only the lobby", "Usable space plus the tenant's share of common areas", "Only carpeted areas"], 2,
    "Rentable = usable + share of common areas.");
  Q(16, "A retail tenant's base rent is $90,000 and the percentage rate is 6%. The natural breakpoint is:",
    ["$5,400", "$540,000", "$960,000", "$1,500,000"], 3,
    "$90,000 ÷ 0.06 = $1,500,000.");
  Q(16, "A lease clause in which the tenant agrees to recognize a new owner or foreclosing lender as landlord is:",
    ["Escalation", "Estoppel", "Subordination", "Attornment"], 3,
    "Attornment.");
  Q(16, "A signed tenant statement confirming the lease terms, rent paid and any defaults, relied on by a buyer or lender, is a(n):",
    ["Estoppel certificate", "Attornment", "Letter of intent", "Pro forma"], 0,
    "Estoppel certificate.");
  Q(16, "A lender's agreement not to evict a tenant who isn't in default if the lender forecloses is:",
    ["Subordination", "Non-disturbance", "Acceleration", "Attornment"], 1,
    "Non-disturbance. SNDA = subordination, non-disturbance and attornment.");
  Q(16, "A clause making a lease junior to a present or future mortgage is a:",
    ["Escalation clause", "Use clause", "Subordination clause", "Merger clause"], 2,
    "Subordination.");
  Q(16, "An NYC office lease increases rent by a set amount per square foot for each $1 rise in the building porter's hourly wage. This is a:",
    ["CPI escalation", "Percentage rent", "Base year escalation", "Porter's wage escalation"], 3,
    "Porter's wage formula.");
  Q(16, "A tenant pays its share of increases in operating expenses above those of the first lease year. This is a:",
    ["Base year escalation", "Fixed step", "Net lease", "Percentage lease"], 0,
    "Base year.");
  Q(16, "A tenant occupies 5,000 rentable sq ft in a 100,000 rentable sq ft building. Its proportionate share is:",
    ["0.5%", "5%", "20%", "50%"], 1,
    "5,000 ÷ 100,000 = 5%.");
  Q(16, "A clause where the landlord pays operating expenses up to a set amount and the tenant pays its share above that amount is:",
    ["A percentage lease", "An expense stop", "A ground lease", "An attornment"], 1,
    "Expense (operating) stop.");
  Q(16, "When a tenant has its own utility meter and pays the utility company directly, the electric arrangement is:",
    ["Rent inclusion", "Submetering", "Direct metering", "Porter's wage"], 2,
    "Direct metering.");
  Q(16, "A projected income and expense statement for a property is a:",
    ["Closing statement", "Rent roll", "Certificate of occupancy", "Pro forma"], 3,
    "Pro forma.");
  Q(16, "A major store that draws traffic to a shopping center is an:",
    ["Anchor tenant", "Estoppel tenant", "Holdover tenant", "Subtenant"], 0,
    "Anchor tenant.");
  Q(16, "In the \"tax world,\" taxable income from operations equals:",
    ["NOI − debt service", "NOI − interest − depreciation", "EGI − vacancy", "BTCF + depreciation"], 1,
    "Only interest (not principal) and depreciation are deducted from NOI.");
  Q(16, "After-tax cash flow equals:",
    ["NOI − debt service", "EGI − operating expenses", "Before-tax cash flow − income tax", "Taxable income − depreciation"], 2,
    "ATCF = BTCF − taxes.");
  Q(16, "A potential gross income of $200,000 with a 5% vacancy and collection loss gives an effective gross income of:",
    ["$10,000", "$190,000", "$195,000", "$210,000"], 1,
    "$200,000 − $10,000 = $190,000.");
  Q(16, "EGI is $190,000 and operating expenses are $70,000. What is the NOI?",
    ["$70,000", "$120,000", "$190,000", "$260,000"], 1,
    "$190,000 − $70,000 = $120,000.");
  Q(16, "A property with NOI of $120,000 is valued at a 6% cap rate. Its value is:",
    ["$720,000", "$1,200,000", "$2,000,000", "$7,200,000"], 2,
    "$120,000 ÷ 0.06 = $2,000,000.");
  Q(16, "An investor owns a building on land leased long-term from another owner. The investor's interest is:",
    ["Fee simple", "Easement", "Life estate", "Leasehold"], 3,
    "Leasehold (under a ground lease).");
  Q(16, "Generally, as the risk of an investment increases, investors demand:",
    ["A higher return (higher cap rate)", "A lower return", "No return", "Tax exemption"], 0,
    "Risk and required return move together.");
  Q(16, "A rent escalation tied to the Consumer Price Index is an:",
    ["Expense stop", "Index escalation", "Percentage rent", "Porter's wage"], 1,
    "CPI / index escalation.");

  /* ---------- Unit 17: Income Tax Issues in Real Estate Transactions ---------- */
  Q(17, "A married couple filing jointly sells their principal residence of 10 years at a $450,000 gain. How much of the gain is taxable?",
    ["$0", "$200,000", "$250,000", "$450,000"], 0,
    "Up to $500,000 of gain is excluded for joint filers who meet the 2-of-5-year test.");
  Q(17, "To qualify for the home-sale exclusion, the seller must have owned and used the home as a principal residence for at least:",
    ["1 of the last 3 years", "2 of the last 5 years", "3 consecutive years", "5 of the last 10 years"], 1,
    "2 of the last 5 years.");
  Q(17, "A single taxpayer may exclude up to how much gain on the sale of a principal residence?",
    ["$125,000", "$250,000", "$500,000", "$1,000,000"], 1,
    "$250,000 single / $500,000 married filing jointly.");
  Q(17, "A first-time homebuyer may withdraw up to how much from an IRA without the 10% early-withdrawal penalty?",
    ["$5,000", "$25,000", "$10,000 lifetime", "No limit"], 2,
    "$10,000 lifetime (income tax may still apply).");
  Q(17, "Residential rental buildings are depreciated for tax purposes over:",
    ["15 years", "27.5 years", "39 years", "50 years"], 1,
    "27.5 years straight-line. Nonresidential property uses 39 years.");
  Q(17, "Commercial (nonresidential) buildings are depreciated over:",
    ["27.5 years", "31.5 years", "39 years", "40 years"], 2,
    "39 years.");
  Q(17, "Which of the following can NOT be depreciated?",
    ["An apartment building", "An office building", "A warehouse", "Land"], 3,
    "Land is never depreciated.");
  Q(17, "In a 1031 exchange, replacement property must be identified within:",
    ["30 days", "45 days", "90 days", "180 days"], 1,
    "45 days to identify, 180 days to close.");
  Q(17, "In a 1031 exchange, the replacement property must be acquired within:",
    ["1 year", "45 days", "90 days", "180 days (or the tax return due date, if earlier)"], 3,
    "180 days.");
  Q(17, "Cash or other non-like-kind property received in a 1031 exchange is called:",
    ["Boot", "Basis", "Equity", "Recapture"], 0,
    "Boot is taxable up to the realized gain.");
  Q(17, "Which property does NOT qualify for a 1031 exchange?",
    ["An apartment building held for investment", "The taxpayer's personal residence", "Vacant land held for investment", "A warehouse used in business"], 1,
    "A personal residence isn't held for investment or business use.");
  Q(17, "In a delayed 1031 exchange, sale proceeds must be held by a:",
    ["The listing broker", "The seller personally", "Qualified intermediary", "The county clerk"], 2,
    "If the taxpayer receives the funds, the exchange fails.");
  Q(17, "A gain on property held for more than one year is a:",
    ["Short-term capital gain", "Passive loss", "Ordinary loss", "Long-term capital gain"], 3,
    "Long-term gains get preferential rates.");
  Q(17, "An investor bought a property for $400,000, added $50,000 of capital improvements, and took $60,000 of depreciation. The adjusted basis is:",
    ["$340,000", "$390,000", "$450,000", "$510,000"], 1,
    "$400,000 + $50,000 − $60,000 = $390,000.");
  Q(17, "Income from rental activities is generally classified as:",
    ["Passive income", "Active income", "Portfolio income", "Earned income"], 0,
    "Rental activity is generally passive.");
  Q(17, "Which part of a mortgage payment on a rental property is tax-deductible as an expense?",
    ["Principal", "Interest", "Both principal and interest", "Neither"], 1,
    "Principal repayment isn't deductible.");
  Q(17, "Points paid to obtain a mortgage to purchase a principal residence are generally deductible:",
    ["Never", "Only when the home is sold", "In the year paid", "Over 27.5 years"], 2,
    "Refinance points are generally deducted over the loan's life.");
  Q(17, "Interest on a home equity loan is deductible (for current federal rules) only if the funds are used to:",
    ["Pay credit cards", "Pay tuition", "Buy a car", "Buy, build or substantially improve the home"], 3,
    "Post-2017 rules.");

  /* ---------- Unit 18: Mortgage Brokerage ---------- */
  Q(18, "A mortgage broker:",
    ["Arranges loans between borrowers and lenders for a fee", "Lends its own money", "Guarantees FHA loans", "Sets interest rates by law"], 0,
    "A mortgage banker funds loans. A mortgage broker arranges them.");
  Q(18, "A company that closes loans with its own funds and often sells them on the secondary market is a:",
    ["Mortgage broker", "Mortgage banker", "Real estate broker", "Title company"], 1,
    "Mortgage banker.");
  Q(18, "In NY, mortgage brokers are registered with, and mortgage bankers licensed by, the:",
    ["Department of State", "Attorney General", "Department of Financial Services", "HUD"], 2,
    "DFS, under the Banking Law.");
  Q(18, "Which is stronger evidence of a buyer's ability to finance?",
    ["Prequalification", "A credit card limit", "A verbal estimate", "Preapproval"], 3,
    "Preapproval involves actual review of credit and documents.");
  Q(18, "A lender's written promise to make a loan on specified terms is a:",
    ["Commitment letter", "Rate lock", "Prequalification", "Good faith estimate"], 0,
    "A mortgage commitment.");
  Q(18, "A guarantee of a specific interest rate for a set period before closing is a:",
    ["Buydown", "Rate lock", "Balloon", "Cap"], 1,
    "Rate lock.");
  Q(18, "A loan that exceeds Fannie Mae and Freddie Mac size limits is a:",
    ["Conforming loan", "FHA loan", "Jumbo (nonconforming) loan", "VA loan"], 2,
    "Jumbo loans are nonconforming.");
  Q(18, "A real estate agent receives $500 from a lender for each buyer referred, with no other services provided. This is:",
    ["A permitted referral fee", "Required by law", "Legal if disclosed afterward", "A prohibited kickback under RESPA"], 3,
    "RESPA Section 8 bans unearned referral fees.");
  Q(18, "A real estate licensee who also acts as the buyer's mortgage broker must:",
    ["Give the required mortgage broker dual agency disclosure and get the buyer's consent", "Say nothing", "Reduce the commission to zero", "Get DOS approval for each loan"], 0,
    "Banking Law disclosure requirement.");
  Q(18, "The process in which a lender evaluates the borrower's credit, income and the property to decide whether to lend is:",
    ["Escrow", "Underwriting", "Amortization", "Recording"], 1,
    "Underwriting.");

  /* ---------- Unit 19: Property Management ---------- */
  Q(19, "A property manager is usually what type of agent for the owner?",
    ["Special agent", "Universal agent", "General agent", "Subagent"], 2,
    "General agent, with a fiduciary duty to the owner.");
  Q(19, "The document that creates the agency between an owner and a property manager is the:",
    ["Estoppel certificate", "Proprietary lease", "Listing agreement", "Management agreement"], 3,
    "Management agreement, which should be written and signed.");
  Q(19, "Property management fees are most commonly based on a:",
    ["Percentage of gross collected rents", "Flat fee per tenant complaint", "Percentage of the property's value", "Percentage of net profit after taxes"], 0,
    "A percentage of gross collected income.");
  Q(19, "Scheduled servicing of the boiler to prevent breakdowns is:",
    ["Corrective maintenance", "Preventive maintenance", "Construction maintenance", "Deferred maintenance"], 1,
    "Preventive maintenance.");
  Q(19, "Fixing a broken window after a storm is:",
    ["Preventive maintenance", "A capital reserve", "Corrective maintenance", "A tenant improvement"], 2,
    "Corrective maintenance.");
  Q(19, "Money set aside for the future replacement of major items like the roof is part of the:",
    ["Operating budget", "Stabilized rent", "Rent roll", "Capital reserve budget"], 3,
    "Capital reserve budget.");
  Q(19, "A budget that averages expenses over several years to show typical annual costs is a:",
    ["Stabilized budget", "Operating statement", "Pro forma lease", "Rent roll"], 0,
    "Stabilized budget.");
  Q(19, "A list of all units, tenants, rents and lease dates is a:",
    ["Board package", "Rent roll", "Declaration", "Offering plan"], 1,
    "Rent roll.");
  Q(19, "A property manager gets a secret 10% rebate from a contractor hired for the owner's repairs. Under 19 NYCRR 175.3 this is:",
    ["Allowed as a management perk", "Allowed if under $500", "Prohibited without the owner's full knowledge and consent", "Allowed for commercial property"], 2,
    "No rebates, commissions or profits on expenditures without full knowledge and consent.");
  Q(19, "Leasing and collecting rent for other owners for a fee requires:",
    ["No license", "An appraiser license", "A home inspector license", "A real estate broker license"], 3,
    "These are licensed activities under RPL §440.");
  Q(19, "In a NY building with 6 or more units, tenant security deposits held by the manager must be kept in:",
    ["An interest-bearing account, with interest paid to the tenant less a 1% administrative fee", "The manager's operating account", "Cash in a safe", "The owner's personal account"], 0,
    "GOL §7-103.");
  Q(19, "Buying insurance to shift the financial impact of a fire to an insurer is a risk management technique called:",
    ["Avoiding", "Transferring", "Retaining", "Controlling"], 1,
    "Transferring risk.");
  Q(19, "A tenant stops paying rent. The property manager should:",
    ["Change the locks", "Remove the tenant's belongings", "Pursue eviction through the courts", "Shut off utilities"], 2,
    "Self-help evictions are illegal in NY.");
  Q(19, "Which should be included in a written management agreement?",
    ["The owner's personal medical history", "The listing price", "The tenants' Social Security numbers", "The manager's authority, fee, reporting duties and how the agreement may be terminated"], 3,
    "The syllabus lists description, term, authority, reporting, fee, accounting, insurance, owner responsibilities and termination.");
})((window.NYRE = window.NYRE || {}));
