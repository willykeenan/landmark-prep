/* Landmark Prep, New York course — original practice questions, units 4–9. */
(function (NYRE) {
  NYRE.questions = NYRE.questions || [];
  function Q(u, q, c, a, e) { NYRE.questions.push({ u: u, q: q, c: c, a: a, e: e }); }

  /* ---------- Unit 4: The Contract of Sales and Leases ---------- */
  Q(4, "Under the NY Statute of Frauds, which lease must be in writing to be enforceable?",
    ["A 6-month lease", "A 1-year lease", "A month-to-month rental", "A 2-year lease"], 3,
    "GOL §5-703: leases for more than 1 year must be in writing.");
  Q(4, "A contract signed by a 16-year-old to buy land is:",
    ["Voidable by the minor", "Void", "Fully enforceable", "Illegal"], 0,
    "A minor's contracts are voidable at the minor's option.");
  Q(4, "An oral agreement to sell a house is:",
    ["Void", "Unenforceable", "Valid and enforceable", "Illegal"], 1,
    "It may be valid between the parties, but a court won't enforce it because it isn't in writing.");
  Q(4, "A contract to sell a property for use as an illegal gambling hall is:",
    ["Voidable", "Enforceable with court approval", "Void", "Executory"], 2,
    "A contract with an unlawful purpose is void.");
  Q(4, "A typical real estate sales contract, in which each party makes promises to the other, is:",
    ["Unilateral", "Void", "Implied", "Bilateral"], 3,
    "Promise for promise = bilateral.");
  Q(4, "An option contract binds:",
    ["Only the optionor (owner) until the optionee exercises it", "Both parties from the start", "Only the optionee", "Neither party"], 0,
    "The owner must sell if the option is exercised, but the optionee is free not to buy.");
  Q(4, "A buyer offers $500,000. The seller replies, \"I'll accept $520,000.\" The seller's response:",
    ["Is an acceptance", "Is a counteroffer that terminates the original offer", "Creates a binding contract at $500,000", "Is an option"], 1,
    "A counteroffer rejects the original offer.");
  Q(4, "A seller refuses to close. Because land is unique, the buyer may ask a court for:",
    ["Reformation", "Novation", "Specific performance", "Partition"], 2,
    "Specific performance forces the seller to convey.");
  Q(4, "A contract provides that if the buyer defaults, the seller keeps the down payment as full damages. This is a:",
    ["Rescission", "Merger clause", "Contingency", "Liquidated damages clause"], 3,
    "Liquidated damages are agreed in advance.");
  Q(4, "A new buyer takes over a contract and the original buyer is fully released. This is:",
    ["Novation", "Assignment", "Reformation", "Rescission"], 0,
    "Novation substitutes a party or contract and releases the original.");
  Q(4, "A tenant transfers the entire remaining lease term to another person. This is:",
    ["A sublease", "An assignment", "A novation", "An eviction"], 1,
    "Transferring the whole remaining term is an assignment. The original tenant stays liable unless released.");
  Q(4, "What is the maximum security deposit a NY residential landlord may collect?",
    ["Three months' rent", "Two months' rent", "One month's rent", "No limit"], 2,
    "HSTPA 2019 / GOL §7-108.");
  Q(4, "After a residential tenant moves out, the landlord must return the deposit, or an itemized statement of deductions, within:",
    ["7 days", "14 days", "30 days", "60 days"], 1,
    "Within 14 days.");
  Q(4, "The maximum a NY landlord may charge an applicant for a background and credit check is:",
    ["One month's rent", "$50", "$100", "$20"], 3,
    "RPL §238-a caps the fee at $20.");
  Q(4, "A NY landlord may charge a late fee only if rent is late by more than 5 days, and the fee may not exceed:",
    ["The lesser of $50 or 5% of the monthly rent", "$25", "10% of the rent", "$100"], 0,
    "HSTPA late-fee cap.");
  Q(4, "A tenant has lived in an apartment for 3 years. The landlord doesn't plan to renew. Under RPL §226-c, how much notice is required?",
    ["30 days", "90 days", "60 days", "No notice"], 1,
    "Under 1 year: 30 days. 1–2 years: 60 days. 2+ years: 90 days.");
  Q(4, "The implied promise that a residential unit is fit to live in is the:",
    ["Covenant of quiet enjoyment", "Merger clause", "Warranty of habitability", "Habendum clause"], 2,
    "RPL §235-b.");
  Q(4, "The heat fails all winter and the landlord ignores it, so the tenant moves out. The tenant may claim:",
    ["Actual eviction", "Estoppel", "Adverse possession", "Constructive eviction"], 3,
    "Constructive eviction requires conditions that make the premises unusable, and the tenant must vacate.");
  Q(4, "A rent-stabilized tenant offered a renewal may choose a lease term of:",
    ["1 or 2 years", "6 months only", "3 or 5 years", "Month-to-month only"], 0,
    "Stabilized tenants choose a 1- or 2-year renewal.");
  Q(4, "Luxury decontrol of rent-stabilized apartments:",
    ["Still applies at rents of $2,000", "Was abolished by the Housing Stability and Tenant Protection Act of 2019", "Applies only outside NYC", "Applies only to co-ops"], 1,
    "The HSTPA ended luxury and vacancy decontrol.");
  Q(4, "A retail tenant pays base rent plus a share of gross sales above a set amount. This is a:",
    ["Gross lease", "Net lease", "Percentage lease", "Ground lease"], 2,
    "Percentage leases are common in retail.");
  Q(4, "A tenant pays rent plus the property taxes, insurance and maintenance. This is a:",
    ["Gross lease", "Proprietary lease", "Graduated lease", "Triple net lease"], 3,
    "A triple net (NNN) tenant pays taxes, insurance and maintenance.");
  Q(4, "A long-term lease of land only, on which the tenant builds, is a:",
    ["Ground lease", "Gross lease", "Index lease", "Sublease"], 0,
    "Ground lease.");
  Q(4, "Unless the lease states otherwise, rent is legally due:",
    ["In advance", "In arrears (at the end of the period)", "Quarterly", "At lease signing only"], 1,
    "The default rule is in arrears. Most leases change this to in advance.");
  Q(4, "A sales contract clause saying promises do not survive closing unless expressly stated is the:",
    ["Broker clause", "Habendum clause", "Merger clause", "Time-is-of-the-essence clause"], 2,
    "The contract merges into the deed at closing.");
  Q(4, "In downstate NY, who customarily prepares the contract of sale for a house?",
    ["The listing agent", "The buyer's agent", "The title company", "The seller's attorney"], 3,
    "Downstate, the seller's attorney drafts the contract after the deal sheet circulates.");
  Q(4, "In NY, a customary down payment on a residential contract is about:",
    ["1%", "3%", "10%", "25%"], 2,
    "About 10%, usually held in escrow by the seller's attorney.");
  Q(4, "Upstate purchase-offer forms prepared by brokers commonly include:",
    ["An attorney approval (review) clause", "A net listing clause", "An automatic renewal clause", "A confession of judgment"], 0,
    "The attorney review clause lets each side's attorney approve or disapprove within a set time.");
  Q(4, "A broker is asked to write a custom rider changing the legal terms of a contract. The broker should:",
    ["Draft it carefully", "Decline and refer the parties to their attorneys", "Copy one from the internet", "Have the salesperson draft it"], 1,
    "Drafting riders or giving legal advice is unauthorized practice of law.");
  Q(4, "The statute of limitations for most contract claims in NY is:",
    ["1 year", "3 years", "6 years", "10 years"], 2,
    "6 years.");
  Q(4, "Under an installment land contract, the buyer typically receives:",
    ["Legal title immediately", "No rights until the last payment", "Equitable title and possession, with legal title passing when paid in full", "A leasehold only"], 2,
    "The seller (vendor) keeps legal title until paid.");
  Q(4, "A tenant with a right of first refusal has the right to:",
    ["Buy at a fixed price at any time", "Assign the lease without consent", "Renew the lease automatically", "Match an offer if the owner decides to sell"], 3,
    "A right of first refusal is triggered when the owner decides to sell.");
  Q(4, "Under NY's roommate law (RPL §235-f), a tenant named on the lease may share the apartment with immediate family plus:",
    ["One additional occupant and that occupant's dependent children", "No one else", "Two additional adults", "Anyone the tenant chooses"], 0,
    "One additional occupant plus that occupant's dependent children.");
  Q(4, "In an NYC rental where the broker represents the landlord (e.g., the listing agent), under the FARE Act the broker's fee is paid by:",
    ["The tenant", "The landlord who hired the broker", "Split 50/50", "The city"], 1,
    "Since June 11, 2025, whoever hires the broker pays. A landlord's agent can't charge the tenant.");
  Q(4, "\"Time is of the essence\" language in a NY contract means:",
    ["The closing may be adjourned indefinitely", "The buyer must close within 24 hours", "The closing date is strict and failure to close on it can be a default", "The contract expires at midnight"], 2,
    "Without it, NY courts generally allow a reasonable adjournment.");
  Q(4, "A binder signed by a buyer at an open house in NY is generally:",
    ["A binding contract of sale", "A lease", "Illegal", "A preliminary written offer, not a binding contract"], 3,
    "Formal contracts follow a binder.");

  /* ---------- Unit 5: Real Estate Finance ---------- */
  Q(5, "In a mortgage transaction, the borrower is the:",
    ["Mortgagor", "Mortgagee", "Trustee", "Beneficiary"], 0,
    "The mortgagor gives the mortgage. The mortgagee (lender) receives it.");
  Q(5, "The document that is the borrower's personal promise to repay the debt is the:",
    ["Mortgage", "Note (bond)", "Deed", "Satisfaction"], 1,
    "The note or bond is the promise. The mortgage is the security.");
  Q(5, "New York is a lien-theory state. This means:",
    ["The lender holds title until the loan is repaid", "Mortgages can't be foreclosed", "The borrower keeps title and the mortgage creates a lien", "Liens can't be recorded"], 2,
    "In a lien-theory state, the mortgage is a lien and the borrower keeps title.");
  Q(5, "One discount point on a $300,000 loan for a $375,000 house equals:",
    ["$300", "$3,000", "$3,750", "$30,000"], 1,
    "1 point = 1% of the loan amount: $300,000 × 1% = $3,000.");
  Q(5, "The clause that allows the lender to demand the full balance when the borrower defaults is the:",
    ["Alienation clause", "Release clause", "Defeasance clause", "Acceleration clause"], 3,
    "Acceleration clause.");
  Q(5, "A due-on-sale clause is also called a(n):",
    ["Alienation clause", "Acceleration clause", "Prepayment clause", "Escalation clause"], 0,
    "The alienation clause requires payoff when the property is sold, which prevents an assumption.");
  Q(5, "A developer's blanket mortgage covering 40 lots usually includes a:",
    ["Prepayment penalty", "Release clause", "Balloon payment", "Wraparound"], 1,
    "Release clauses free individual lots from the lien as they're paid for.");
  Q(5, "A buyer takes title \"subject to\" the seller's existing mortgage. The buyer:",
    ["Is personally liable for the debt", "Gets a new loan", "Is not personally liable, but the lender can still foreclose", "Releases the seller from liability"], 2,
    "In a \"subject to\" purchase the buyer isn't personally liable. In an assumption the buyer is.");
  Q(5, "When a buyer assumes a mortgage, the original borrower:",
    ["Is automatically released", "Becomes the lender", "Must pay a penalty", "Remains secondarily liable unless released by the lender (novation)"], 3,
    "Only a release or novation frees the original borrower.");
  Q(5, "Private mortgage insurance is usually required on a conventional loan when the loan-to-value ratio exceeds:",
    ["50%", "70%", "80%", "97%"], 2,
    "Above 80% LTV. Federal law lets it be canceled at 80% on request and ends it automatically at 78%.");
  Q(5, "FHA loans are:",
    ["Insured by the federal government (HUD)", "Guaranteed by the VA", "Made directly by Fannie Mae", "Available only to veterans"], 0,
    "FHA insures loans. VA guarantees them.");
  Q(5, "Which loan program may allow an eligible veteran to buy with NO down payment?",
    ["FHA", "VA", "Conventional", "SONYMA only"], 1,
    "VA-guaranteed loans often require no down payment.");
  Q(5, "In New York, SONYMA is:",
    ["A federal secondary-market agency", "A private mortgage insurer", "The State of New York Mortgage Agency, offering programs for first-time buyers", "A title insurance company"], 2,
    "SONYMA offers below-market-rate and first-time buyer programs.");
  Q(5, "The interest rate on an adjustable-rate mortgage equals:",
    ["The index minus the margin", "The prime rate only", "The APR plus points", "The index plus the margin"], 3,
    "Index + margin, limited by periodic and lifetime caps.");
  Q(5, "When a payment isn't enough to cover the interest due and the unpaid interest is added to the balance, this is:",
    ["Negative amortization", "Amortization", "Acceleration", "Subordination"], 0,
    "The loan balance grows.");
  Q(5, "A loan that requires a large final payment is a:",
    ["Fully amortized mortgage", "Balloon mortgage", "Reverse mortgage", "Package mortgage"], 1,
    "Balloon mortgage.");
  Q(5, "A seller takes back a mortgage to finance part of the price for the buyer. This is a:",
    ["Blanket mortgage", "Wraparound mortgage", "Purchase-money mortgage", "Open-end mortgage"], 2,
    "Seller financing is a purchase-money mortgage.");
  Q(5, "A mortgage that includes appliances and furniture as security along with the real estate is a:",
    ["Blanket mortgage", "Construction mortgage", "Open-end mortgage", "Package mortgage"], 3,
    "Package mortgage.");
  Q(5, "A home equity conversion (reverse) mortgage generally requires the borrower to be at least:",
    ["55", "59½", "62", "65"], 2,
    "62 or older.");
  Q(5, "Which entity guarantees mortgage-backed securities made up of FHA and VA loans?",
    ["Ginnie Mae", "Freddie Mac", "Fannie Mae", "SONYMA"], 0,
    "Ginnie Mae (GNMA) is a government agency within HUD.");
  Q(5, "Lenders sell loans on the secondary market mainly to:",
    ["Avoid regulation", "Replenish funds so they can make more loans", "Raise interest rates", "Cancel PMI"], 1,
    "Selling loans frees up capital to lend again.");
  Q(5, "An ad says, \"Only $500 down!\" Under Regulation Z, this ad must also disclose:",
    ["Nothing more", "The seller's name", "The terms of repayment and the APR", "The lender's net worth"], 2,
    "A down payment amount is a trigger term, so the ad must also disclose the down payment, repayment terms and APR.");
  Q(5, "Which phrase in an ad does NOT trigger additional Regulation Z disclosures?",
    ["\"Payments of $1,850 per month\"", "\"30-year financing\"", "\"10% down\"", "\"Easy financing available\""], 3,
    "General statements like \"easy financing\" aren't trigger terms.");
  Q(5, "Regulation Z's 3-business-day right of rescission applies to:",
    ["A refinance or home equity loan on a principal residence", "A loan used to buy a principal residence", "Any commercial loan", "Cash sales"], 0,
    "There is no rescission for purchase-money loans on the home.");
  Q(5, "The Equal Credit Opportunity Act prohibits lenders from discriminating based on:",
    ["Credit score", "Marital status or age", "Debt-to-income ratio", "Employment history"], 1,
    "ECOA protects race, color, religion, national origin, sex, marital status, age and receipt of public assistance.");
  Q(5, "A borrower earns $9,000 per month. Using a 28% housing ratio, the maximum monthly housing payment (PITI) is:",
    ["$2,160", "$2,520", "$2,800", "$3,240"], 1,
    "$9,000 × 0.28 = $2,520.");
  Q(5, "A house appraises at $480,000 and sells for $500,000. The lender offers 80% LTV. What is the maximum loan?",
    ["$384,000", "$392,000", "$400,000", "$480,000"], 0,
    "Lenders use the lower of price or appraisal: $480,000 × 0.80 = $384,000.");
  Q(5, "A lender repeatedly refinances a homeowner's loan to earn new fees without real benefit to the borrower. This predatory practice is called:",
    ["Steering", "Blockbusting", "Loan flipping", "Buydown"], 2,
    "Loan flipping.");
  Q(5, "A lender refuses to make loans in a neighborhood because of its racial makeup. This is:",
    ["Steering", "Underwriting", "Blockbusting", "Redlining"], 3,
    "Redlining is illegal.");
  Q(5, "NY's general civil usury ceiling is:",
    ["6%", "16%", "25%", "36%"], 1,
    "16% civil. 25% is criminal usury.");
  Q(5, "Foreclosure of a residential mortgage in NY is:",
    ["Judicial (through the courts)", "Non-judicial (power of sale)", "Handled by the DOS", "Not permitted"], 0,
    "NY foreclosures go through the courts, and the property is sold by a referee.");
  Q(5, "After a foreclosure sale brings less than the loan balance, the lender may seek a:",
    ["Satisfaction", "Deficiency judgment", "Lis pendens", "Novation"], 1,
    "A deficiency judgment covers the shortfall.");
  Q(5, "When a mortgage is paid in full, the lender provides a document to record that clears the lien. It is a:",
    ["Quitclaim", "Release of dower", "Satisfaction of mortgage", "Estoppel certificate"], 2,
    "Satisfaction of mortgage.");
  Q(5, "PITI stands for:",
    ["Price, interest, title, insurance", "Principal, income, taxes, investment", "Points, interest, taxes, interest", "Principal, interest, taxes, insurance"], 3,
    "Principal, interest, taxes, insurance.");
  Q(5, "A construction loan is typically paid out:",
    ["In draws as work is completed", "In one lump sum at closing", "Only after a certificate of occupancy", "Monthly to the buyer"], 0,
    "Draws as construction progresses, later replaced by a permanent \"takeout\" loan.");

  /* ---------- Unit 6: Land Use Regulations ---------- */
  Q(6, "Zoning laws are an exercise of which government power?",
    ["Eminent domain", "Police power", "Escheat", "Taxation"], 1,
    "Police power protects health, safety and welfare, and requires no compensation.");
  Q(6, "When the government takes private property for a highway, it must pay:",
    ["Nothing", "Double the assessed value", "Just compensation", "Only relocation costs"], 2,
    "Eminent domain requires just compensation. The legal process is condemnation.");
  Q(6, "Which body adopts a town's zoning ordinance?",
    ["The zoning board of appeals", "The planning board", "The building inspector", "The town board (legislative body)"], 3,
    "The elected legislative body adopts the zoning ordinance.");
  Q(6, "Which body typically prepares the master plan and approves subdivision plats?",
    ["Planning board", "Zoning board of appeals", "Tax assessor", "Architectural review board"], 0,
    "Planning board.");
  Q(6, "An owner wants to open a store in a residential zone. The owner needs a:",
    ["Area variance", "Use variance", "Building permit only", "Certificate of occupancy"], 1,
    "A use not permitted by zoning requires a use variance.");
  Q(6, "To obtain a use variance in NY, the applicant must show:",
    ["Practical difficulty", "Just compensation", "Unnecessary hardship", "Financial convenience"], 2,
    "Unnecessary hardship: no reasonable return, unique hardship, no change to neighborhood character, not self-created.");
  Q(6, "An owner wants to build a deck 3 feet closer to the lot line than the setback allows. The owner needs a(n):",
    ["Use variance", "Zoning amendment", "Nonconforming use permit", "Area variance"], 3,
    "Dimensional relief is an area variance, judged by practical difficulty and a balancing test.");
  Q(6, "A gas station operated legally before the area was rezoned residential may usually continue as a:",
    ["Nonconforming use", "Use variance", "Special use permit", "Spot zone"], 0,
    "A nonconforming (grandfathered) use generally can't expand and may be lost if abandoned.");
  Q(6, "Rezoning a single parcel for the benefit of one owner, inconsistent with the comprehensive plan, is called:",
    ["Cluster zoning", "Spot zoning", "Incentive zoning", "Buffer zoning"], 1,
    "Spot zoning is generally invalid.");
  Q(6, "A town lets a developer build more units in exchange for creating a public park. This is:",
    ["Eminent domain", "Spot zoning", "Incentive zoning", "A moratorium"], 2,
    "Incentive zoning trades density bonuses for amenities.");
  Q(6, "Grouping houses closer together to preserve common open space is:",
    ["Inverse condemnation", "Strip zoning", "Spot zoning", "Cluster zoning"], 3,
    "Cluster zoning.");
  Q(6, "An owner in a low-density area sells unused development rights to a developer elsewhere. This is a:",
    ["Transfer of development rights", "Variance", "Condemnation", "Nonconforming use"], 0,
    "TDR.");
  Q(6, "A neighbor wants to challenge a ZBA decision in court. The neighbor brings an:",
    ["Action for partition", "Article 78 proceeding", "SCAR petition", "Eviction proceeding"], 1,
    "Article 78.");
  Q(6, "The document that confirms a building complies with codes and states its legal use is the:",
    ["Building permit", "Survey", "Certificate of occupancy", "Deed"], 2,
    "Certificate of occupancy.");
  Q(6, "A deed restriction allows only single-family homes, but zoning allows two-family homes. Which controls?",
    ["Zoning, always", "The buyer chooses", "Whichever is older", "The more restrictive: the deed restriction"], 3,
    "The more restrictive limitation governs.");
  Q(6, "Under SEQRA, a project that may significantly affect the environment may require:",
    ["An environmental impact statement", "A variance", "A lis pendens", "A certificate of occupancy only"], 0,
    "An EIS, coordinated by a lead agency.");
  Q(6, "The federal law requiring a property report for certain large subdivisions sold across state lines is the:",
    ["RESPA", "Interstate Land Sales Full Disclosure Act", "CERCLA", "Truth in Lending Act"], 1,
    "ILSA.");
  Q(6, "A use allowed in a zone only if specific conditions are met, such as a school in a residential district, requires a:",
    ["Moratorium", "Use variance", "Special use permit", "Spot zone"], 2,
    "Special use permit (special exception).");
  Q(6, "A town temporarily halts new building permits while it studies a new plan. This is a:",
    ["Setback", "Variance", "Taking", "Moratorium"], 3,
    "Moratorium.");
  Q(6, "Losing a legal right because of an unreasonable delay in asserting it is the doctrine of:",
    ["Laches", "Escheat", "Estoppel", "Merger"], 0,
    "Laches.");

  /* ---------- Unit 7: Construction and Environmental Issues ---------- */
  Q(7, "The concrete base below the frost line that supports the foundation wall is the:",
    ["Sill plate", "Footing", "Joist", "Header"], 1,
    "Footings spread the load below the frost line.");
  Q(7, "The first wood member bolted to the top of the foundation wall is the:",
    ["Rafter", "Ridge beam", "Sill plate", "Stud"], 2,
    "Sill plate.");
  Q(7, "Steel posts, often filled with concrete, that support girders in a basement are:",
    ["Studs", "Lintels", "Joists", "Lally columns"], 3,
    "Lally columns.");
  Q(7, "Horizontal framing members that support floors and ceilings are:",
    ["Joists", "Studs", "Rafters", "Footings"], 0,
    "Joists.");
  Q(7, "Wall studs are commonly spaced:",
    ["8 inches on center", "16 inches on center", "24 feet apart", "36 inches on center"], 1,
    "16\" on center (24\" in some framing).");
  Q(7, "The horizontal member over a window or door opening in a wood-framed wall is a:",
    ["Sill", "Header", "Footing", "Soffit"], 1,
    "Header. In masonry, a lintel.");
  Q(7, "A wall that supports the weight of the structure above it is a:",
    ["Curtain wall", "Party wall", "Bearing wall", "Partition wall"], 2,
    "Bearing walls carry loads.");
  Q(7, "Insulation's resistance to heat flow is measured by its:",
    ["BTU rating", "Voltage", "Amperage", "R-value"], 3,
    "The higher the R-value, the better the insulation.");
  Q(7, "Heating and cooling capacity is measured in:",
    ["BTUs", "R-values", "Amps", "Volts"], 0,
    "British Thermal Units.");
  Q(7, "The capacity of a home's electrical service (e.g., 200) is measured in:",
    ["Volts", "Amperes", "Watts", "BTUs"], 1,
    "Amperage.");
  Q(7, "Branch-circuit wiring of this material, common in the 1960s–70s, can be a fire hazard at connections:",
    ["Copper", "Romex", "Aluminum", "Conduit"], 2,
    "Aluminum branch wiring.");
  Q(7, "Armored flexible cable is known as:",
    ["Romex", "Greenfield", "PVC", "BX"], 3,
    "BX is armored cable. Romex is non-metallic sheathed cable. Greenfield is flexible metal conduit.");
  Q(7, "The underside of a roof overhang is the:",
    ["Soffit", "Fascia", "Flashing", "Ridge"], 0,
    "Soffit.");
  Q(7, "Metal or other material used to seal joints (like around chimneys) against water is:",
    ["Sheathing", "Flashing", "Fascia", "Lath"], 1,
    "Flashing.");
  Q(7, "Asbestos is most dangerous when it is:",
    ["Encapsulated", "Painted", "Friable", "Wet"], 2,
    "Friable asbestos crumbles and releases fibers.");
  Q(7, "A cancer of the lining of the chest or abdomen linked to asbestos exposure is:",
    ["Radon poisoning", "Leukemia", "Melanoma", "Mesothelioma"], 3,
    "Mesothelioma.");
  Q(7, "The federal lead-based paint disclosure rules apply to housing built:",
    ["Before 1978", "Before 1950", "After 1978", "Before 1990"], 0,
    "Pre-1978 housing.");
  Q(7, "Under federal lead rules, a buyer of pre-1978 housing is given how many days to conduct a lead inspection, unless waived?",
    ["3", "7", "10", "30"], 2,
    "10 days.");
  Q(7, "The EPA recommends fixing a home if radon levels are at or above:",
    ["0.4 pCi/L", "4 pCi/L", "40 pCi/L", "100 pCi/L"], 1,
    "The EPA action level is 4 pCi/L.");
  Q(7, "Which best describes radon?",
    ["A mold", "A gas from decaying uranium in soil", "A paint additive", "An insulation material"], 1,
    "A radioactive, odorless gas that is the leading cause of lung cancer in non-smokers.");
  Q(7, "Urea-formaldehyde foam insulation (UFFI) is a concern because it:",
    ["Is radioactive", "Contains lead", "Releases formaldehyde gas", "Attracts termites"], 2,
    "Formaldehyde off-gassing.");
  Q(7, "PCBs are most commonly associated with:",
    ["Carpeting", "Drinking wells", "Roof shingles", "Old electrical transformers"], 3,
    "Polychlorinated biphenyls were used in transformers and capacitors.");
  Q(7, "Chlorofluorocarbons (CFCs) are a problem because they:",
    ["Deplete the ozone layer", "Cause lead poisoning", "Emit radon", "Corrode pipes"], 0,
    "They are found in older air conditioners and refrigerators.");
  Q(7, "A Phase I Environmental Site Assessment involves:",
    ["Soil and groundwater sampling", "Records review and site inspection, without sampling", "Remediation", "Long-term monitoring"], 1,
    "Phase II is the testing phase.");
  Q(7, "Under CERCLA (Superfund), liability for cleanup is:",
    ["Limited to the party who caused the pollution", "Only for government owners", "Strict, joint and several, and retroactive", "Capped at the purchase price"], 2,
    "Current owners can be liable even if they didn't cause the contamination.");
  Q(7, "To use CERCLA's innocent landowner defense, a buyer must have:",
    ["Paid cash", "Filed a SEQRA review", "Owned the property for 10 years", "Conducted all appropriate inquiry (e.g., a Phase I) before buying"], 3,
    "Added by SARA in 1986.");
  Q(7, "Under NY's housing merchant implied warranty, a new home is warranted against material (structural) defects for:",
    ["1 year", "2 years", "6 years", "10 years"], 2,
    "1 year workmanship, 2 years systems, 6 years material defects (GBL 36-B).");
  Q(7, "A septic system is regulated by the:",
    ["Department of Health", "Department of State", "Zoning board of appeals", "Tax assessor"], 0,
    "The NYS Department of Health, applied locally through county health departments.");
  Q(7, "Wood-destroying insect inspectors in NY must be certified by the:",
    ["Department of State", "Department of Environmental Conservation", "Department of Health", "HUD"], 1,
    "NYS DEC certifies pesticide applicators and inspectors.");
  Q(7, "A heating system using a boiler to circulate hot water to baseboards is:",
    ["Forced warm air", "A heat pump", "Hydronic (hot water)", "Radiant electric"], 2,
    "Hot water (hydronic).");
  Q(7, "The most common framing method in modern houses, where each floor is built as a separate platform, is:",
    ["Balloon framing", "Slab-on-grade", "Post-and-beam", "Platform framing"], 3,
    "Platform (western) framing.");
  Q(7, "An agent suspects mold in a basement. The agent should:",
    ["Disclose what is known and recommend a professional inspection", "Tell the buyer it's harmless", "Clean it quietly", "Ignore it if the seller asks"], 0,
    "Agents disclose known issues and refer to experts, not act as experts.");

  /* ---------- Unit 8: Valuation Process and Pricing Properties ---------- */
  Q(8, "A licensee's comparative market analysis (CMA):",
    ["Is an appraisal", "May never be called an appraisal", "Is required for all mortgages", "Must be signed by an appraiser"], 1,
    "A CMA is an opinion of value for pricing, not an appraisal.");
  Q(8, "Market value is best described as the:",
    ["Highest price any buyer might pay", "Replacement cost", "Most probable price in a competitive, open market", "Assessed value"], 2,
    "Market value is the most probable price, not the highest.");
  Q(8, "The total amount spent to build a structure is its:",
    ["Value", "Price", "Assessment", "Cost"], 3,
    "Cost may or may not equal value.");
  Q(8, "Which is NOT one of the four tests of highest and best use?",
    ["Most popular with neighbors", "Physically possible", "Financially feasible", "Legally permissible"], 0,
    "The tests are legally permissible, physically possible, financially feasible and maximally productive.");
  Q(8, "The principle that a buyer won't pay more for a property than the cost of an equally desirable substitute is:",
    ["Contribution", "Substitution", "Conformity", "Anticipation"], 1,
    "Substitution is the foundation of the sales comparison approach.");
  Q(8, "The largest, most expensive house in a neighborhood of small homes is likely to be affected by:",
    ["Progression", "Plottage", "Regression", "Accretion"], 2,
    "Regression: it is pulled down by lesser neighbors.");
  Q(8, "A $40,000 pool adds only $15,000 to a home's market value. This illustrates:",
    ["Anticipation", "Substitution", "Progression", "Contribution"], 3,
    "A feature is worth what it contributes, not what it cost.");
  Q(8, "Combining two adjacent lots to create a more valuable single parcel produces:",
    ["Plottage value", "Obsolescence", "Regression", "Depreciation"], 0,
    "Plottage is the increment; assemblage is the process.");
  Q(8, "A comparable sold for $500,000 and has a garage worth $20,000. The subject has no garage. The adjusted value of the comparable is:",
    ["$460,000", "$480,000", "$500,000", "$520,000"], 1,
    "The comp is better, so subtract: $500,000 − $20,000 = $480,000. Adjust the comp, not the subject.");
  Q(8, "The cost approach formula is:",
    ["NOI ÷ cap rate", "Land value + (replacement cost − depreciation)", "Sale price × GRM", "Assessed value ÷ equalization rate"], 1,
    "Cost approach.");
  Q(8, "Which approach is most reliable for valuing a church or a new school?",
    ["Sales comparison", "Income approach", "Cost approach", "GRM"], 2,
    "Special-purpose buildings have few comparable sales and no rental income.");
  Q(8, "A home with only one bathroom for five bedrooms suffers from:",
    ["Physical deterioration", "Plottage", "External obsolescence", "Functional obsolescence"], 3,
    "An outdated or poor design is functional obsolescence.");
  Q(8, "A new airport runway makes nearby homes noisy and reduces their value. This is:",
    ["External (economic) obsolescence", "Functional obsolescence", "Physical deterioration", "Regression"], 0,
    "External obsolescence comes from outside the property and is always incurable.");
  Q(8, "The income approach estimates value by:",
    ["Multiplying cost by depreciation", "Dividing NOI by a capitalization rate", "Averaging comparable sales", "Adding the assessed value and taxes"], 1,
    "Value = NOI ÷ cap rate.");
  Q(8, "A duplex rents for $4,000 per month and the local gross rent multiplier is 110. Its estimated value is:",
    ["$400,000", "$440,000", "$480,000", "$528,000"], 1,
    "GRM × monthly rent = 110 × $4,000 = $440,000.");
  Q(8, "In reconciliation, the appraiser:",
    ["Averages the three approaches equally", "Uses only the highest value", "Weighs the approaches based on their reliability for the property type", "Uses only the cost approach"], 2,
    "Reconciliation is a weighted judgment, not a simple average.");
  Q(8, "Insurable value typically excludes:",
    ["The building", "Improvements", "Personal property", "Land and foundations"], 3,
    "Land doesn't burn.");
  Q(8, "According to the syllabus, the sold comparables in a CMA should generally have sold within the last:",
    ["3 months", "6 months", "12 months", "36 months"], 2,
    "12 months.");
  Q(8, "Expired listings are useful in a CMA because they show:",
    ["Prices at which properties failed to sell (often overpriced)", "What buyers paid", "Tax assessments", "Future appreciation"], 0,
    "Expired listings reveal pricing that the market rejected.");
  Q(8, "Architectural fees, financing costs and permit fees are examples of:",
    ["Direct (hard) costs", "Indirect (soft) costs", "Operating expenses", "Depreciation"], 1,
    "Indirect costs. Direct costs are labor and materials.");

  /* ---------- Unit 9: Human Rights and Fair Housing ---------- */
  Q(9, "Which federal law prohibits racial discrimination in all property transactions with NO exceptions?",
    ["Civil Rights Act of 1964", "Fair Housing Act of 1968", "Civil Rights Act of 1866", "ADA"], 2,
    "The 1866 Act, upheld in Jones v. Mayer (1968).");
  Q(9, "The 1968 Supreme Court case confirming that the 1866 Act bars private racial discrimination in property sales is:",
    ["Brown v. Board of Education", "Buchanan v. Warley", "Plessy v. Ferguson", "Jones v. Mayer"], 3,
    "Jones v. Alfred H. Mayer Co. (1968).");
  Q(9, "Which protected classes were added to the federal Fair Housing Act in 1988?",
    ["Disability and familial status", "Sex and religion", "Race and color", "Age and marital status"], 0,
    "The 1988 Amendments added handicap (disability) and familial status. Sex was added in 1974.");
  Q(9, "Which is NOT a federally protected class under the Fair Housing Act?",
    ["Religion", "Marital status", "National origin", "Familial status"], 1,
    "Marital status is protected by NY law, not the federal FHA.");
  Q(9, "\"Familial status\" protects:",
    ["Married couples only", "Only single parents", "Households with children under 18, pregnant women, and people securing custody", "People over 55"], 2,
    "That is the familial status definition.");
  Q(9, "The federal \"Mrs. Murphy\" exemption applies to:",
    ["Any single-family home", "All co-ops", "Buildings with 6 or more units", "Owner-occupied buildings with 4 or fewer units"], 3,
    "Owner-occupied, 4 units or fewer (federal).");
  Q(9, "An owner of a single-family home who would otherwise be exempt under federal law loses the exemption if the owner:",
    ["Uses a real estate broker", "Sells within a year", "Advertises online without discrimination", "Asks for proof of income"], 0,
    "Using a broker or discriminatory advertising eliminates the exemption.");
  Q(9, "Under federal law, a community may restrict occupancy by age if at least 80% of units have at least one resident who is:",
    ["50 or older", "55 or older", "62 or older", "65 or older"], 1,
    "55+ housing requires 80% occupancy by at least one person 55+. Alternatively, all residents must be 62+.");
  Q(9, "Which is a protected class under the NY State Human Rights Law but NOT under the federal Fair Housing Act?",
    ["Race", "Lawful source of income", "National origin", "Disability"], 1,
    "NYS adds lawful source of income, age, marital status, sexual orientation, gender identity or expression, military status, citizenship or immigration status, and domestic violence victim status.");
  Q(9, "A landlord refuses to rent to an applicant because the rent would be paid with a Housing Choice (Section 8) voucher. In NY this is:",
    ["Legal if the landlord owns fewer than 6 units", "Legal in all cases", "Illegal discrimination based on lawful source of income", "Legal outside NYC"], 2,
    "Source-of-income protection applies statewide.");
  Q(9, "Under NY State law, the owner-occupied exemption from housing discrimination rules applies to:",
    ["Buildings with up to 4 units", "Co-op buildings", "Any owner-occupied building", "A two-family house where the owner lives in one unit"], 3,
    "NYS's exemption is narrower than federal law: an owner-occupied two-family house.");
  Q(9, "An owner living in one unit of her two-family house asks her listing agent to avoid renting to a certain religion. The agent:",
    ["May not comply; licensees can't use owner exemptions to discriminate", "May comply because the owner is exempt", "May comply if the owner signs a waiver", "May comply only for rentals under 1 year"], 0,
    "Owner exemptions do not protect a licensee's discriminatory conduct.");
  Q(9, "Guiding buyers toward or away from neighborhoods based on a protected characteristic is:",
    ["Redlining", "Steering", "Blockbusting", "Testing"], 1,
    "Steering.");
  Q(9, "An agent tells homeowners they should sell now because \"people of a different national origin are moving in and values will drop.\" This is:",
    ["Steering", "Redlining", "Blockbusting", "Puffing"], 2,
    "Blockbusting (panic peddling).");
  Q(9, "Which ad language is most likely to violate fair housing laws?",
    ["\"Three bedrooms, near train\"", "\"Pets considered\"", "\"Renovated kitchen\"", "\"Perfect for a young couple\""], 3,
    "It suggests a preference based on age or familial status.");
  Q(9, "A tenant with a disability asks to keep an assistance animal in a no-pets building. This is a request for a:",
    ["Reasonable accommodation", "Reasonable modification", "Variance", "Sublease"], 0,
    "Accommodations are changes to rules, policies or services. Modifications are physical changes.");
  Q(9, "A tenant who uses a wheelchair asks to install grab bars in the bathroom. This is a:",
    ["Reasonable accommodation", "Reasonable modification", "Constructive eviction", "Special assessment"], 1,
    "A physical change to the premises is a reasonable modification.");
  Q(9, "The NYS Housing and Anti-Discrimination Disclosure Form must be provided:",
    ["At closing", "Only in rental transactions", "At the first substantive contact with a prospective buyer, tenant, seller or landlord", "Only for 1–4 family homes"], 2,
    "19 NYCRR 175.28: at first substantive contact, for all property types.");
  Q(9, "The Housing and Anti-Discrimination Disclosure Form applies to:",
    ["Residential 1–4 family only", "Only NYC properties", "Only co-ops and condos", "All real property, including commercial and vacant land"], 3,
    "Unlike the §443 agency form, it covers all property.");
  Q(9, "Which method of delivering the Housing and Anti-Discrimination Disclosure Form does NOT satisfy the rule?",
    ["Oral explanation only", "Text message", "Email", "Hard copy"], 0,
    "Oral disclosure doesn't satisfy 175.28.");
  Q(9, "If a consumer refuses to sign the hard-copy Housing and Anti-Discrimination Disclosure Form, the licensee must:",
    ["Stop all contact", "Prepare a written declaration under oath and keep it at least 3 years", "Report the consumer to DHR", "Mail it again"], 1,
    "175.28(d).");
  Q(9, "Every real estate broker and agent website must include on its homepage:",
    ["The broker's tax ID", "Commission rates", "A link to the DOS fair housing notice", "The MLS rules"], 2,
    "175.29(c).");
  Q(9, "At an open house, a licensee must:",
    ["Do nothing special", "Collect visitors' Social Security numbers", "Post the seller's lowest price", "Display the fair housing notice and have the disclosure form available"], 3,
    "175.29(d).");
  Q(9, "For discrimination occurring on or after Feb. 15, 2024, a complaint may be filed with the NYS Division of Human Rights within:",
    ["1 year", "3 years", "6 years", "180 days"], 1,
    "The deadline was extended from 1 to 3 years. A HUD complaint must be filed within 1 year.");
  Q(9, "An order barring all real estate solicitation of homeowners in a defined area because of blockbusting-type practices is a:",
    ["Nonsolicitation order", "Cease-and-desist list", "Lis pendens", "Moratorium"], 0,
    "Nonsolicitation orders (RPL §442-h) can last up to 5 years.");
  Q(9, "A homeowner in a cease-and-desist zone files a statement with DOS. Licensees:",
    ["May still call once a year", "May not solicit that owner while the owner is on the list", "May only mail postcards", "Must pay the owner a fee to solicit"], 1,
    "Solicitation of listed owners is prohibited.");
  Q(9, "Implicit bias is defined in NY law as:",
    ["Intentional discrimination", "Discrimination by lenders", "Attitudes or stereotypes that affect understanding, actions and decisions unconsciously", "A type of steering"], 2,
    "RPL §441(3)(a).");
  Q(9, "Fair-housing groups send pairs of similar people with different protected characteristics to see if they are treated differently. These people are called:",
    ["Steerers", "Appraisers", "Blockbusters", "Testers"], 3,
    "Testers.");
  Q(9, "Which protected class is included in the NYC Human Rights Law for housing but not listed in the federal Fair Housing Act?",
    ["Lawful occupation", "Race", "Religion", "Color"], 0,
    "NYC adds lawful occupation, partnership status, height and weight, and more.");
  Q(9, "The 1917 Supreme Court decision Buchanan v. Warley:",
    ["Upheld school segregation", "Struck down racial zoning ordinances", "Created the Fair Housing Act", "Allowed restrictive covenants"], 1,
    "It invalidated a municipal ordinance that segregated residential blocks by race.");
  Q(9, "Which federal law requires real estate offices, as public accommodations, to be accessible to people with disabilities?",
    ["Regulation Z", "RESPA", "The Americans with Disabilities Act", "CERCLA"], 2,
    "ADA Title III.");
  Q(9, "A finding by a court or agency that a licensee engaged in unlawful discrimination is treated by DOS as:",
    ["Irrelevant to licensing", "Grounds for a warning only", "A matter for the MLS", "Presumptive evidence of untrustworthiness, subjecting the licensee to discipline including revocation"], 3,
    "19 NYCRR 175.17(b).");
  Q(9, "Under NY law, which is a protected class in housing?",
    ["Military status", "Credit score", "Pet ownership", "Smoking"], 0,
    "Military status is protected under the NYS Human Rights Law.");
  Q(9, "Citizenship or immigration status in housing is:",
    ["Not protected anywhere in NY", "Protected under NY State and NYC human rights laws", "Protected only under federal law", "Protected only for co-ops"], 1,
    "NY State and NYC both protect citizenship or immigration status.");
  Q(9, "A buyer asks an agent to show homes only in neighborhoods \"where people like us live.\" The agent should:",
    ["Choose neighborhoods by the buyer's race", "Refuse to work with the buyer entirely", "Show properties based on the buyer's stated objective criteria (price, size, features), not demographics", "Ask the buyer's religion"], 2,
    "Providing demographic-based choices is steering. Use objective criteria.");
  Q(9, "The Fair Housing Act of 1968 originally protected:",
    ["Age and marital status", "Race only", "Sex and disability", "Race, color, religion and national origin"], 3,
    "Sex was added in 1974, and disability and familial status in 1988.");
})((window.NYRE = window.NYRE || {}));
