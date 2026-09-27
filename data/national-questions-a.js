/* National real estate salesperson exam — original practice questions, units 101–106.
 * Q(unit, question, [choices], correctIndex, explanation). Choices are shuffled at display time
 * (numeric choice sets are shown in ascending order instead). */
(function (NYRE) {
  NYRE.questions = NYRE.questions || [];
  function Q(u, q, c, a, e) { NYRE.questions.push({ u: u, q: q, c: c, a: a, e: e }); }

  /* ---------- Unit 101: Property Ownership ---------- */
  Q(101, "Which of the following is personal property?",
    ["A free-standing refrigerator", "A built-in dishwasher", "An attached garage", "A forced-air furnace"], 0,
    "Personal property (a chattel) is movable and not annexed to the land. A free-standing refrigerator is not a fixture; built-in equipment and structures usually are.");
  Q(101, "In deciding whether an item is a fixture, the test that asks how permanently the item is attached is the test of:",
    ["Adaptation to the property", "Method of annexation", "Relationship of the parties", "Agreement of the parties"], 1,
    "Method of annexation looks at how the item is attached and whether removal would damage the property. Intention and agreement also matter, but this question asks only about attachment.");
  Q(101, "Crops that a tenant planted and that are harvested annually are called:",
    ["Fixtures of the landlord", "Appurtenances that run with the land", "Emblements", "Trade fixtures of a retailer"], 2,
    "Emblements are industrial (annual) crops. They remain the personal property of the person who cultivated them, even if the lease ends before harvest.");
  Q(101, "Display cases a retailer bolts to the floor of a leased shop are generally:",
    ["Real property that must stay with the landlord", "Emblements", "An easement in gross", "Trade fixtures the tenant may remove before the lease ends"], 3,
    "Trade fixtures are installed by a commercial tenant for business. The tenant may remove them before the lease ends and must repair any damage. Fixtures left after the lease ends may become the landlord's property.");
  Q(101, "Which of the following is a freehold estate?",
    ["An estate for years", "A life estate", "A periodic tenancy", "A tenancy at sufferance"], 1,
    "Freehold estates (fee simple and life estates) last for an uncertain duration. Leaseholds are nonfreehold and last for a stated or periodic term.");
  Q(101, "The most complete ownership interest recognized by law is:",
    ["A conventional life estate", "A remainder", "Fee simple absolute", "An estate for years"], 2,
    "Fee simple absolute is inheritable, transferable, and of unlimited duration. Life estates and leaseholds are lesser interests.");
  Q(101, "A life estate measured by the life of someone other than the life tenant is:",
    ["A remainder in fee", "A reversion in severalty", "A leasehold estate for years", "A life estate pur autre vie"], 3,
    "Pur autre vie means for another's life. The estate ends when that measuring life ends, not when the life tenant dies.");
  Q(101, "A grantor conveys a house to A for life, then to B. During A's life, B holds:",
    ["A remainder interest", "A reversion", "A leasehold", "An easement appurtenant"], 0,
    "A remainder is a future interest in a third person that becomes possessory when the life estate ends. A reversion would return to the grantor.");
  Q(101, "Title held by one person or one legal entity alone is:",
    ["Tenancy in common", "Joint tenancy", "Ownership in severalty", "Tenancy by the entirety"], 2,
    "Severalty means sole ownership. A corporation that owns a building in its own name also holds title in severalty.");
  Q(101, "The right of survivorship is a defining feature of:",
    ["Tenancy in common", "A tenancy at will", "Ownership in severalty", "Joint tenancy"], 3,
    "When a joint tenant dies, that person's interest passes automatically to the surviving joint tenant(s), not by will.");
  Q(101, "Two unmarried buyers want each share to pass to their own heirs. They should take title as:",
    ["Tenants in common", "Joint tenants with right of survivorship", "Tenants by the entirety", "Life tenants with a shared remainder"], 0,
    "Tenancy in common has no survivorship. Each owner's undivided interest is inheritable and need not be equal.");
  Q(101, "Which form of co-ownership can exist only between spouses and includes survivorship that one owner cannot break alone?",
    ["Tenancy in common", "Tenancy by the entirety", "A partnership tenancy at will", "Ownership in severalty"], 1,
    "Tenancy by the entirety is a marital form of concurrent ownership with survivorship. Neither spouse can convey or partition without the other.");
  Q(101, "A condominium purchaser receives:",
    ["Stock and a proprietary lease only", "A leasehold in the unit and nothing in the common areas", "Title only to the land under the whole building", "Fee simple title to the unit plus an undivided interest in the common elements"], 3,
    "Each unit is real property owned in fee. Common elements (halls, roof, land) are owned in common with the other unit owners.");
  Q(101, "A cooperative occupant typically holds:",
    ["Shares in a corporation and a proprietary lease", "A deed to a fee-simple unit", "An easement in gross across the building", "A life estate measured by the board of directors"], 0,
    "The corporation owns the building. The buyer purchases stock and receives a proprietary lease to a particular apartment.");
  Q(101, "An easement that benefits a neighboring parcel and runs with the land is:",
    ["An easement in gross", "An easement appurtenant", "A license", "An encroachment"], 1,
    "An appurtenant easement has a dominant tenement (benefited) and a servient tenement (burdened). It transfers with the land.");
  Q(101, "A utility company's right to maintain lines across many unrelated parcels is typically:",
    ["An easement appurtenant", "A remainder", "An easement in gross", "A license that always dies with the landowner"], 2,
    "An easement in gross benefits a person or company, not a particular dominant parcel. Commercial utility easements commonly last indefinitely.");
  Q(101, "Which deed gives the grantee no covenants or warranties of title?",
    ["A quitclaim deed", "A general warranty deed", "A special warranty deed", "A bargain-and-sale deed with covenants"], 0,
    "A quitclaim deed transfers whatever interest the grantor may have, if any, and makes no promises about the quality of title. It is often used to clear clouds.");
  Q(101, "Open, notorious, continuous, and hostile use of a path across a neighbor's land for the statutory period may create:",
    ["An easement by necessity", "An easement by prescription", "A license", "A remainder"], 1,
    "A prescriptive easement arises from long adverse use, similar to adverse possession but for use rather than title. The statutory period varies by state.");
  Q(101, "A garage that extends two feet over the lot line is:",
    ["An easement in gross", "A license", "An encroachment", "A cloud created only by a quitclaim"], 2,
    "An encroachment is a physical intrusion onto another's land. A survey is the usual way to discover it.");
  Q(101, "Which lien ordinarily has priority over a first mortgage regardless of when the mortgage was recorded?",
    ["A later judgment lien", "A mechanic's lien filed last", "An unrecorded vendor's lien", "A real property tax lien"], 3,
    "Ad valorem property tax liens are superior to almost all other liens. Mortgage, mechanic's, and judgment liens then rank largely by recording and statute.");
  Q(101, "Recording a deed in the public records provides:",
    ["Actual notice only to the grantor", "Constructive notice to the world", "Inquiry notice solely to tenants", "No notice until the grantee moves in"], 1,
    "Constructive notice is legal notice the law presumes everyone has once an instrument is properly recorded. Actual notice is what a person really knows.");
  Q(101, "A legal description that starts at a point of beginning and follows courses and distances back to that point is:",
    ["The lot-and-block method", "The government rectangular survey", "Metes and bounds", "A recorded condominium plat only"], 2,
    "Metes and bounds uses monuments, compass directions, and distances, beginning and ending at the same point of beginning.");
  Q(101, "A quarter of a quarter of a section contains how many acres?",
    ["160 acres", "80 acres", "10 acres", "40 acres"], 3,
    "A section is 640 acres. A quarter section is 160 acres. A quarter of that quarter is 40 acres.");
  Q(101, "An owner whose parcel touches a flowing stream typically holds:",
    ["Riparian rights", "Littoral rights", "Prior-appropriation rights in every state", "An easement in gross"], 0,
    "Riparian rights attach to land on a flowing body of water. Littoral rights attach to land on a lake, sea, or ocean. Prior appropriation is a separate western doctrine.");

  /* ---------- Unit 102: Land Use Controls ---------- */
  Q(102, "The four government powers over private real estate are often remembered as PETE. The E that is the right to take private property for public use is:",
    ["Escheat", "Eminent domain", "Encumbrance", "Estoppel"], 1,
    "Eminent domain is the power. Condemnation is the process. The owner is entitled to just compensation under the Fifth Amendment.");
  Q(102, "The process a public body uses to take title under eminent domain is:",
    ["Escheat", "Inverse condemnation", "Condemnation", "Dedication"], 2,
    "Condemnation is the legal proceeding. Inverse condemnation is a lawsuit by an owner claiming a taking without formal condemnation.");
  Q(102, "A city builds a runway so close to a house that the home can no longer be used as a dwelling. The owner may sue for:",
    ["Escheat", "A variance", "A special-use permit", "Inverse condemnation"], 3,
    "Inverse condemnation lets an owner claim that government action amounted to a taking and demand just compensation.");
  Q(102, "When a person dies intestate with no heirs, title to real property may pass to the state by:",
    ["Escheat", "Eminent domain", "Adverse possession", "Dedication"], 0,
    "Escheat prevents ownerless property. It is a government power, not a private transfer.");
  Q(102, "Zoning ordinances are an exercise of:",
    ["Eminent domain", "Police power", "Escheat", "Taxation"], 1,
    "Police power is the authority to regulate for health, safety, and welfare. Zoning, building codes, and environmental rules rest on it. No compensation is paid for ordinary zoning.");
  Q(102, "A grocery store is already operating when the parcel is rezoned residential. The store may often continue as:",
    ["An illegal use", "A variance", "A legal nonconforming use", "Spot zoning"], 2,
    "A nonconforming use was lawful when established and is grandfathered. Expansion or long abandonment can end the right. It is not the same as a variance.");
  Q(102, "An owner who wants a modest exception from a setback rule because of unique lot hardship seeks:",
    ["A nonconforming-use certificate", "Spot zoning", "Eminent domain", "A variance"], 3,
    "A variance permits a departure from the ordinance because of hardship unique to the property. It does not rezone the parcel.");
  Q(102, "A hospital is allowed in a residential zone if it meets stated conditions and serves the public. That approval is typically:",
    ["A special-use or conditional-use permit", "A use variance based on money hardship", "Spot zoning", "Escheat"], 0,
    "Special exceptions (conditional uses) are uses the ordinance already contemplates if conditions are met. A variance is for hardship; spot zoning is an inconsistent rezoning of one parcel.");
  Q(102, "Rezoning a single lot in a way that is inconsistent with the surrounding district and the comprehensive plan is often attacked as:",
    ["Cluster zoning", "Spot zoning", "Bulk zoning", "Incentive zoning"], 1,
    "Spot zoning favors one parcel without a public-planning basis and is frequently held invalid.");
  Q(102, "A strip of parkland placed between a factory district and a housing tract is an example of:",
    ["A setback", "Spot zoning", "A buffer zone", "A nonconforming use"], 2,
    "A buffer zone separates incompatible uses. A setback is the required distance from a lot line to a structure.");
  Q(102, "The minimum distance a building must stand back from the front lot line is:",
    ["Density", "Floor-area ratio", "A buffer zone", "A setback"], 3,
    "Setbacks are bulk regulations that control placement of structures. Density and FAR control how much can be built, not the yard distance.");
  Q(102, "A certificate of occupancy is issued when:",
    ["Construction is complete and the building may be occupied", "The building permit is first filed", "The plat is recorded", "A variance is requested"], 0,
    "Building permits authorize construction. A certificate of occupancy confirms the finished work meets code and may be occupied.");
  Q(102, "Local zoning must generally be consistent with the community's:",
    ["Listing agreements", "Comprehensive or master plan", "Title insurance policy", "Appraiser's highest-and-best-use conclusion only"], 1,
    "The comprehensive (master) plan is the long-range land-use policy document. Zoning is the ordinance that implements it.");
  Q(102, "Private covenants and public zoning both apply to a lot. The owner must follow:",
    ["Only the zoning ordinance", "Only the covenants", "The more restrictive of the two", "Whichever was recorded last"], 2,
    "Public and private controls operate together. When they conflict, the stricter rule governs the owner.");
  Q(102, "Deed restrictions are typically enforced by:",
    ["The state police power only", "The county assessor", "Eminent domain", "Other property owners or a homeowners association"], 3,
    "Restrictive covenants are private contracts that run with the land. Neighbors or an HOA sue to enforce them. Laches may bar a claim after unreasonable delay.");
  Q(102, "The Interstate Land Sales Full Disclosure Act generally requires a property report for certain subdivisions of:",
    ["100 or more unimproved lots sold in interstate commerce", "Any two-lot split inside one city", "Only condominium resales", "Farmland of any size"], 0,
    "ILSA (administered with CFPB) aims to protect buyers of lots in large interstate subdivisions. Developers must register and give a property report before the buyer signs.");
  Q(102, "A federally related mortgage on a house in a Special Flood Hazard Area generally requires:",
    ["Earthquake insurance from the seller", "Flood insurance", "A CERCLA indemnity from the city", "A variance from FEMA"], 1,
    "Lenders on federally related loans must require flood insurance when the improved property is in an SFHA shown on FEMA maps. A standard homeowners policy does not cover flood.");
  Q(102, "Places of public accommodation must provide reasonable access for persons with disabilities under the:",
    ["Sherman Antitrust Act", "Interstate Land Sales Full Disclosure Act", "Americans with Disabilities Act", "Equal Credit Opportunity Act"], 2,
    "The ADA requires reasonable modifications and accessibility in public accommodations and commercial facilities. Fair housing laws address dwellings; the ADA is broader for public spaces.");
  Q(102, "Rezoning a parcel from multifamily to single-family, reducing what may be built, is:",
    ["A taking that always requires payment", "Spot zoning in every case", "Incentive zoning", "Downzoning"], 3,
    "Downzoning is a change to a less intensive classification. Ordinary downzoning under the police power does not by itself require compensation.");
  Q(102, "Authority for cities and counties to adopt zoning usually comes from:",
    ["Enabling acts of the state legislature", "The Sherman Act", "FIRREA", "USPAP"], 0,
    "States delegate police power to local governments through enabling statutes. Local zoning that exceeds that grant can be struck down.");
  Q(102, "Requests for variances are commonly heard by the:",
    ["City council sitting as a lender", "Zoning board of appeals", "Secondary mortgage market", "Army Corps of Engineers"], 1,
    "A board of adjustment or zoning board of appeals is the usual body for variances and many special-exception appeals.");
  Q(102, "Combining lots and relaxing some lot-line rules so houses are grouped and open space is preserved is:",
    ["Spot zoning", "Downzoning", "Cluster zoning", "Escheat"], 2,
    "Cluster (density) zoning allows more flexible siting at the same overall density, often to keep common open space.");
  Q(102, "Before a new house may be built, the owner generally must obtain a:",
    ["Certificate of occupancy first", "Quitclaim from the city", "Special warranty deed", "Building permit"], 3,
    "A building permit is required before construction so plans can be checked against codes. The certificate of occupancy comes after the work is approved.");
  Q(102, "A long-unused nonconforming store is boarded up for many years. The right to resume that use is often lost by:",
    ["Abandonment of the nonconforming use", "The recording of a mortgage", "A later special warranty deed", "Payment of property taxes"], 0,
    "Nonconforming-use rights can be lost if the use is abandoned or the structure is destroyed, depending on local rules. Mere ownership does not keep an unused illegal-today use alive.");

  /* ---------- Unit 103: Valuation ---------- */
  Q(103, "Market value is best described as:",
    ["The price a buyer actually paid last month", "The most probable price in an open, arm's-length sale", "The assessed value on the tax roll", "The cost to rebuild plus land"], 1,
    "Market value is an opinion of the most probable price a property should bring under normal conditions: willing, informed parties, reasonable exposure, and no undue pressure. Market price is what was actually paid.");
  Q(103, "A comparative market analysis prepared by a licensee differs from an appraisal because a CMA is:",
    ["Governed by USPAP in every state", "A substitute for a certified appraisal in a federally related loan", "A marketing tool, not an appraisal", "Always identical to the cost approach"], 2,
    "Licensees use CMAs to help price listings and offers. Appraisals for federally related transactions must be done by credentialed appraisers following USPAP.");
  Q(103, "The appraisal principle that a buyer will pay no more than the cost of an equally desirable substitute is:",
    ["Anticipation", "Conformity", "Plottage", "Substitution"], 3,
    "Substitution underpins the sales-comparison approach. If two similar houses are available, the lower-priced one tends to set the value of the other.");
  Q(103, "The most profitable legally permitted, physically possible, and financially feasible use is the property's:",
    ["Highest and best use", "Assessed use", "Insured use", "Book value"], 0,
    "Highest and best use is the foundation of market-value appraisal. It can be the current use or a different use if conversion is realistic.");
  Q(103, "Combining two adjacent lots so that the whole is worth more than the lots separately illustrates:",
    ["Regression", "Plottage", "Progression", "Functional obsolescence"], 1,
    "Assemblage is the act of combining parcels. Plottage is the value increase that results.");
  Q(103, "A modest cottage is surrounded by much larger, more expensive houses. The cottage's value may be pulled up by:",
    ["Regression", "Contribution", "Progression", "External obsolescence"], 2,
    "Progression is the benefit a lesser property receives from higher-value surroundings. Regression is the opposite effect on a better property in a weaker neighborhood.");
  Q(103, "An overimproved house that costs more to upgrade than the value added demonstrates:",
    ["Conformity", "Anticipation", "Increasing returns", "The principle of decreasing returns"], 3,
    "Improvements add value only up to a point. Beyond that, extra dollars do not increase market value dollar-for-dollar.");
  Q(103, "In the sales-comparison approach, adjustments are made:",
    ["To the comparable sales, never to the subject", "To the subject property's list price", "Only to the cost of reproduction", "Only to the capitalization rate"], 0,
    "The subject is the property being valued and is not adjusted. Comparables are adjusted to reflect how they differ from the subject.");
  Q(103, "A comparable sold for $412,000 and has a fireplace worth $8,000 that the subject lacks. The adjusted sale price is:",
    ["$420,000", "$404,000", "$412,000", "$8,000"], 1,
    "If the comparable is better than the subject, subtract the extra feature: $412,000 − $8,000 = $404,000. Remember CBS (comp better, subtract) and CIA (comp inferior, add).");
  Q(103, "The cost approach is often most useful for:",
    ["A 20-year-old tract house with many comps", "A downtown apartment building bought for income", "A public library or a new church", "A vacant lot with three recent sales"], 2,
    "Special-purpose properties with few comparable sales and little income are valued by estimating land value plus cost new less depreciation.");
  Q(103, "The cost of building an exact replica of an improvement using the same materials and design is:",
    ["Replacement cost", "Insured value", "Assessed value", "Reproduction cost"], 3,
    "Reproduction cost is an exact duplicate. Replacement cost is a building of similar utility with modern materials and design.");
  Q(103, "Worn carpet and a leaking roof are examples of:",
    ["Physical deterioration", "Functional obsolescence", "External obsolescence", "Economic life remaining"], 0,
    "Physical deterioration is wear and tear or damage to the structure. It may be curable or incurable depending on whether repair is economically justified.");
  Q(103, "A four-bedroom house with only one bathroom is most clearly an example of:",
    ["Physical deterioration", "Functional obsolescence", "External obsolescence", "Plottage"], 1,
    "Functional obsolescence is a loss from outdated design or poor layout inside the property. Extra baths would be needed to match market expectations.");
  Q(103, "A house next to a noisy interstate loses value because of:",
    ["Physical deterioration", "Functional obsolescence", "External (economic) obsolescence", "Curable deferred maintenance only"], 2,
    "External obsolescence arises from causes outside the property line. It is generally incurable because the owner cannot fix the highway.");
  Q(103, "An income property has NOI of $48,000. If the market capitalization rate is 8%, indicated value is:",
    ["$384,000", "$48,000", "$56,000", "$600,000"], 3,
    "Value = NOI ÷ cap rate. $48,000 ÷ 0.08 = $600,000. A higher cap rate would produce a lower value.");
  Q(103, "Net operating income is calculated by subtracting operating expenses from effective gross income. Which item is NOT an operating expense for this purpose?",
    ["Debt service (mortgage principal and interest)", "Property taxes", "Hazard insurance", "Janitorial wages"], 0,
    "NOI is before financing. Mortgage payments and income taxes are not operating expenses in the capitalization formula.");
  Q(103, "A duplex sold for $360,000 and rents for $3,000 per month. The monthly gross rent multiplier is:",
    ["8", "120", "12", "0.008"], 1,
    "Monthly GRM = sale price ÷ monthly rent. $360,000 ÷ $3,000 = 120. Value of a similar property ≈ GRM × its monthly rent.");
  Q(103, "Using a GRM of 110, a house that rents for $2,000 per month has an indicated value of:",
    ["$220,000", "$22,000", "$220,000,000", "$1,100"], 0,
    "Value = GRM × monthly rent = 110 × $2,000 = $220,000. GRM is a rough income method often used on small residential rentals.");
  Q(103, "A property produces $42,000 NOI and sold for $525,000. The overall cap rate is:",
    ["12.5%", "8%", "7.5%", "5.25%"], 1,
    "Cap rate = NOI ÷ value. $42,000 ÷ $525,000 = 0.08, or 8%.");
  Q(103, "Replacement cost new is $350,000, accrued depreciation is $70,000, and land value is $80,000. Cost-approach value is:",
    ["$350,000", "$280,000", "$360,000", "$500,000"], 2,
    "Cost approach: cost new − depreciation + land. $350,000 − $70,000 + $80,000 = $360,000. Land is not depreciated.");
  Q(103, "After completing the cost, sales-comparison, and income approaches, the appraiser's final step is to:",
    ["Average the three indicated values equally in every assignment", "Report only the highest indicated value", "Ignore USPAP if the indications differ", "Reconcile the indications by weighting each approach for reliability"], 3,
    "Reconciliation is professional judgment, not a simple average. A house with good comps may be weighted toward sales comparison; an apartment toward income.");
  Q(103, "The age a building appears to be, based on condition and utility, is its:",
    ["Chronological age", "Effective age", "Economic life", "Remaining statutory life"], 1,
    "Chronological age is actual years since construction. Effective age reflects upkeep and remodeling. Remaining economic life is how long the improvement is expected to remain useful.");
  Q(103, "For most federally related residential loans, appraisal practice is governed by:",
    ["The Sherman Act only", "RESPA Section 8 only", "USPAP", "The lead-based paint pamphlet"], 2,
    "USPAP (Uniform Standards of Professional Appraisal Practice) is the national standard. FIRREA requires state-licensed or certified appraisers for covered transactions.");
  Q(103, "A broker's price opinion is:",
    ["An appraisal that always meets USPAP for a federally related loan", "A substitute for a home inspection", "A formal cost-approach certificate", "A value estimate a licensee may prepare for a lender or relocation company, subject to state rules"], 3,
    "BPOs and CMAs are not appraisals. States regulate when licensees may prepare them. They do not replace a USPAP appraisal when one is required.");

  /* ---------- Unit 104: Financing ---------- */
  Q(104, "The instrument that is the borrower's personal promise to repay the debt is the:",
    ["Mortgage or deed of trust", "Promissory note", "Listing agreement", "Quitclaim deed"], 1,
    "The note is evidence of the debt. The mortgage or deed of trust is the security instrument that hypothecates the property.");
  Q(104, "Pledging real property as security while retaining possession is:",
    ["Alienation", "Acceleration", "Hypothecation", "Defeasance"], 2,
    "Hypothecation lets the borrower keep and use the property while it secures the loan. Title and lien theory describe who holds legal title during the loan.");
  Q(104, "In a lien-theory state, during the life of the loan legal title is held by the:",
    ["Lender", "Trustee", "Register of deeds", "Borrower"], 3,
    "Lien theory treats the mortgage as a lien; the borrower keeps title. In title-theory states the lender or a trustee holds title until payoff.");
  Q(104, "A fully amortized loan is one in which:",
    ["The balance is zero at the end of the term if all payments are made", "Only interest is paid until a balloon is due", "The payment covers taxes and insurance only", "Negative amortization is required"], 0,
    "Each level payment covers interest and a growing share of principal so the loan is paid off at the last payment. A balloon loan is only partly amortized.");
  Q(104, "Private mortgage insurance on a conventional loan is generally required when the LTV is:",
    ["50% or less", "Greater than 80%", "Exactly 78% after closing", "Always 100% by federal rule"], 1,
    "Conventional lenders typically require PMI above 80% LTV. VA loans use a funding fee and a guaranty rather than PMI. FHA loans use MIP.");
  Q(104, "Under the Homeowners Protection Act, a servicer must automatically terminate PMI when the loan reaches:",
    ["95% of original value", "90% of original value if the borrower asks", "78% of the original value, if the borrower is current", "The original appraised value"], 2,
    "Automatic termination is at 78% of the original value on a current loan. The borrower may request cancellation at 80% of original value if otherwise eligible.");
  Q(104, "An FHA loan is best described as a loan that is:",
    ["Made directly by HUD to the borrower", "Guaranteed 100% by the Department of Veterans Affairs", "Purchased only by Ginnie Mae at origination", "Insured by the Federal Housing Administration"], 3,
    "FHA insures private lenders against loss. Typical low-down-payment FHA purchase programs require an upfront and annual MIP.");
  Q(104, "A VA-guaranteed purchase loan for an eligible veteran commonly features:",
    ["Zero down payment and no monthly PMI", "A required 3.5% down payment", "A prohibition on secondary-market sale", "Interest-only payments for 30 years by regulation"], 0,
    "Eligible veterans may finance 100% of the reasonable value. VA guarantees a portion of the loan; a funding fee usually applies, but PMI is not used.");
  Q(104, "One discount point charged on a $180,000 loan equals:",
    ["$180", "$1,800", "$18,000", "1% of the purchase price"], 1,
    "One point is 1% of the loan amount, not of the price. 0.01 × $180,000 = $1,800. Points are prepaid interest that may lower the note rate.");
  Q(104, "A buyer pays $400,000 for a house appraised at $400,000 and borrows $320,000. The LTV is:",
    ["125%", "20%", "80%", "8%"], 2,
    "LTV = loan ÷ lesser of sale price or appraised value. $320,000 ÷ $400,000 = 80%.");
  Q(104, "Interest-only monthly payment on a $240,000 loan at 6% annual interest is:",
    ["$2,400", "$1,440", "$6,000", "$1,200"], 3,
    "Annual interest = $240,000 × 0.06 = $14,400. Monthly = $14,400 ÷ 12 = $1,200. An interest-only (straight) loan does not reduce principal.");
  Q(104, "A clause that makes the entire loan balance due if the borrower sells the property is the:",
    ["Alienation (due-on-sale) clause", "Acceleration clause", "Defeasance clause", "Subordination clause"], 0,
    "Due-on-sale (alienation) lets the lender call the loan on transfer. Acceleration calls the balance on default. Defeasance requires the lender to release the lien when the debt is paid.");
  Q(104, "If the borrower defaults, the clause that lets the lender declare the whole debt due at once is:",
    ["Prepayment", "Acceleration", "Hypothecation", "Novation"], 1,
    "Acceleration is the lender's remedy after default and is a usual first step toward foreclosure. Prepayment addresses early payoff.");
  Q(104, "A buyer takes title subject to an existing loan but does not sign a note. Who remains personally liable to the lender?",
    ["The buyer only", "Both equally by operation of law", "The original borrower (seller)", "No one, because the lien is void"], 2,
    "Taking title subject to a mortgage means the buyer does not assume personal liability. The original borrower remains on the note; the lender can still foreclose the property.");
  Q(104, "The borrower's right to stop a foreclosure by paying the full amount due before the sale is:",
    ["Statutory redemption after every sale in all states", "A deficiency judgment", "A short sale", "Equitable redemption"], 3,
    "Equitable redemption exists before the foreclosure sale. Statutory redemption, where a state provides it, is a limited period after the sale. Rules vary by state.");
  Q(104, "A loan covering several parcels that includes a partial-release clause is a:",
    ["Blanket mortgage", "Package mortgage", "Reverse mortgage", "Growing-equity mortgage"], 0,
    "Developers use blanket mortgages so individual lots can be released as they are sold. A package mortgage covers real and personal property together.");
  Q(104, "A loan that finances both a furnished cabin and the furniture inside it is a:",
    ["Blanket loan", "Package loan", "Wraparound loan", "Construction draw loan only"], 1,
    "A package loan includes real property and personal property in one security instrument, common with furnished units.");
  Q(104, "A homeowner age 62 or older who wants to convert home equity into cash without a monthly repayment is a typical candidate for a:",
    ["Construction loan", "Bridge loan", "Reverse mortgage (HECM)", "Budget loan with PMI"], 2,
    "A reverse mortgage, including FHA's HECM, pays the senior borrower and is usually repaid when the borrower dies, sells, or permanently moves out.");
  Q(104, "For a consumer-purpose dwelling loan, Regulation Z of the Truth in Lending Act requires disclosure of the:",
    ["Appraised value only", "Title-insurance premium only", "HOA budget", "APR and certain finance charges"], 3,
    "TILA/Reg Z tells the consumer the true cost of credit, including the annual percentage rate. It also polices advertising of closed-end dwellings. Business-purpose loans are generally outside Reg Z.");
  Q(104, "A refinance of a principal dwelling generally gives the borrower a right of rescission of:",
    ["Three business days", "Thirty calendar days", "One year in every case", "No rescission; rescission is only for purchases"], 0,
    "Reg Z's cooling-off right is three business days for most refinances and home-equity loans on a principal dwelling. It does not apply to a purchase-money loan to buy the home.");
  Q(104, "An advertisement that states a specific monthly payment must also disclose other credit terms because that figure is a:",
    ["Non-triggering slogan", "Trigger term under TILA", "RESPA Section 8 kickback", "USPAP certification"], 1,
    "Trigger terms include the amount or percent of down payment, number or period of payments, the amount of any payment, and the amount of any finance charge. Using one requires full Reg Z advertising disclosures.");
  Q(104, "RESPA Section 8 prohibits:",
    ["Payment of a lawful commission to a licensed broker", "A Loan Estimate within three business days", "Kickbacks and unearned fees for settlement-service referrals", "Flood insurance in an SFHA"], 2,
    "Section 8 bans giving or receiving a thing of value for the referral of settlement business on a federally related mortgage. Affiliated-business arrangements must be disclosed.");
  Q(104, "On a closed-end purchase loan covered by TRID, the Closing Disclosure must be received by the borrower at least:",
    ["One business hour before closing", "Seven calendar days after application only", "At the closing table with no prior delivery", "Three business days before consummation"], 3,
    "TRID combines TILA and RESPA disclosures. The Loan Estimate is due within three business days after application; the Closing Disclosure is due three business days before closing.");
  Q(104, "The Equal Credit Opportunity Act makes it illegal to discriminate in credit because of race, color, religion, national origin, sex, marital status, age, or:",
    ["The applicant's credit score being too low", "Lack of income", "Collateral that cannot support the loan", "The fact that some or all of the applicant's income is from public assistance"], 3,
    "ECOA (Regulation B) protects those bases, including receipt of public-assistance income. A lender may still deny credit for legitimate underwriting reasons such as inability to repay.");

  /* ---------- Unit 105: Agency and Fiduciary Duties ---------- */
  Q(105, "The party a licensee represents and to whom fiduciary duties are owed is the:",
    ["Customer", "Client (principal)", "Escrow holder", "Appraiser"], 1,
    "The client or principal hires the agent. A customer is an unrepresented third party who is still owed honesty and fair dealing.");
  Q(105, "A broker hired to sell one house is acting as a:",
    ["Universal agent", "General agent for all of the seller's affairs", "Special agent", "Attorney-in-fact without a listing"], 2,
    "A special agent is authorized for a specific transaction or act. Listing and buyer-broker relationships are typically special agency.");
  Q(105, "A property manager who collects rents, signs leases, and orders repairs for an owner on an ongoing basis is usually a:",
    ["Special agent", "Universal agent", "Transaction facilitator only", "General agent"], 3,
    "General agency covers a range of acts in an ongoing business, which is why property managers are the classic example. Universal agency requires very broad power of attorney.");
  Q(105, "An agency created by the parties' spoken or written words is:",
    ["Express agency", "Agency by estoppel", "Ratification only", "Ostensible agency without any words"], 0,
    "Express agency is created by agreement, oral or written. Implied agency arises from conduct. Many states require a written listing before a commission can be sued for.");
  Q(105, "An owner accepts the benefits of a sale a licensee negotiated without prior authority. Agency may be created by:",
    ["Estoppel against the buyer only", "Ratification", "Eminent domain", "Escheat"], 1,
    "Ratification is after-the-fact approval of an unauthorized act. Estoppel bars a principal from denying an agency that the principal's conduct led others to rely on.");
  Q(105, "Which listing entitles the broker to a commission no matter who finds the buyer during the listing term?",
    ["Open listing", "Exclusive-agency listing", "Exclusive right to sell", "Net listing"], 2,
    "Exclusive right to sell protects the listing broker even if the seller or another licensee produces the buyer. Exclusive agency lets the seller avoid the commission by selling independently.");
  Q(105, "Under an exclusive-agency listing, the seller owes no commission if:",
    ["Any broker finds the buyer", "The listing broker finds the buyer", "A cooperating broker finds the buyer", "The seller personally finds the buyer without broker aid"], 3,
    "Exclusive agency gives one broker the exclusive right to market, but the owner may sell on their own and pay nothing. That is the difference from exclusive right to sell.");
  Q(105, "An open listing is one in which:",
    ["The seller may hire many brokers; only the procuring cause earns a commission", "The listing broker is paid even if the seller finds the buyer", "Net proceeds above a set price always go to the broker", "The listing can never expire"], 0,
    "Open listings are nonexclusive. Procuring cause—the unbroken chain of events that leads to the sale—decides who is paid.");
  Q(105, "A listing that promises the broker all proceeds above a net figure to the seller is a net listing. Such listings are:",
    ["Required by federal law", "Illegal or strongly discouraged in many states because of the conflict of interest", "The only way to list commercial land", "Identical to exclusive right to sell"], 1,
    "The broker's incentive is to underprice the seller's net. Many states ban net listings; elsewhere they are treated as a serious risk.");
  Q(105, "A seller's broker shares the listing commission with a licensee who is working with the buyer. That payment, standing alone:",
    ["Makes the licensee the seller's agent as a matter of law", "Forbids the licensee from representing the buyer", "Does not determine whom the licensee represents", "Automatically creates an illegal net listing"], 2,
    "Agency is created by agreement and conduct, not by the source of compensation. A buyer's agent may be paid from the listing side and still owe fiduciary duties to the buyer.");
  Q(105, "The fiduciary duty that requires the agent to put the client's interests above anyone else's, including the agent's, is:",
    ["Accounting only", "Puffing", "Obedience to unlawful instructions", "Loyalty"], 3,
    "Loyalty is the core fiduciary duty. It forbids self-dealing and secret profits. Obedience applies only to lawful instructions.");
  Q(105, "After a listing expires, the former listing agent must still protect the seller's:",
    ["Confidential information", "Duty of obedience on new offers", "Right to a new free listing", "Claim to the next buyer's deposit"], 0,
    "Confidentiality survives termination of the agency. Other duties such as obedience and loyalty generally end when the relationship ends, except as to secrets already learned.");
  Q(105, "Earnest money mixed into the broker's operating account is:",
    ["Conversion if later spent on rent", "Commingling", "A lawful budget mortgage", "Required by TILA"], 1,
    "Commingling is mixing trust funds with broker funds. Conversion is using trust money for the broker's own purposes. Both are grounds for discipline.");
  Q(105, "Using a client's deposit to pay the brokerage electric bill is:",
    ["Commingling only", "A lawful offset against commission", "Conversion", "A RESPA Affiliated Business Arrangement"], 2,
    "Conversion is misappropriation of funds held in trust. It is more serious than merely mixing accounts.");
  Q(105, "An agent must obey a client's instructions unless those instructions:",
    ["Reduce the commission", "Are given orally", "Are inconvenient for the office", "Would be illegal or unethical"], 3,
    "Obedience is limited to lawful directions. An agent may not follow orders to conceal a material defect or to discriminate.");
  Q(105, "Exaggerated opinions such as calling a small garden a private park are usually:",
    ["Puffing", "Fraud as a matter of law", "Latent-defect concealment", "A Sherman Act violation"], 0,
    "Puffing is sales talk not meant as a statement of fact. A false statement of a material fact is misrepresentation; if intentional, it is fraud.");
  Q(105, "A known hidden (latent) defect that a buyer would not reasonably discover must be:",
    ["Kept confidential as a seller secret in all cases", "Disclosed to the buyer", "Disclosed only after closing", "Disclosed only if the listing is exclusive"], 1,
    "Material latent defects known to the agent or seller generally must be disclosed. An as-is clause does not hide known defects. Patent defects are visible on ordinary inspection.");
  Q(105, "Competing brokers agree that none will charge less than 6%. This is:",
    ["A lawful customary rate", "A tie-in arrangement", "Price-fixing under the Sherman Act", "Group boycotting"], 2,
    "Commission rates are always negotiable. An agreement among competitors to set rates is criminal and civil antitrust price-fixing.");
  Q(105, "Several firms refuse to show listings of a new discount brokerage. That concerted refusal is:",
    ["Steering", "A legal exclusive-agency practice", "Market allocation of customers", "A group boycott"], 3,
    "A group boycott is a concerted refusal to deal with a competitor. Each firm may set its own policies, but they may not combine to drive another firm out.");
  Q(105, "Two brokers agree that one will handle only listings west of the highway and the other only east. This is:",
    ["Market allocation", "A tie-in", "Legal if they put it in the MLS", "Exclusive right to sell"], 0,
    "Dividing geographic markets or customer classes among competitors is market allocation, another per se antitrust violation.");
  Q(105, "A builder will sell a lot only if the buyer lists the buyer's present house with the builder's brokerage. This is:",
    ["Price-fixing", "A tie-in arrangement", "Puffing", "Dual agency with consent"], 1,
    "A tying arrangement conditions the sale of one product or service on the purchase of another. Antitrust law treats coercive tie-ins as unlawful.");
  Q(105, "Representing both buyer and seller in the same transaction without the required consent is:",
    ["Designated agency in every state", "Single agency", "Undisclosed dual agency, which is illegal", "A transaction-brokerage default"], 2,
    "Dual agency, where allowed, requires informed consent, usually in writing. Hidden dual agency is a breach of loyalty and can cost the commission, the contract, and the license.");
  Q(105, "Death of the principal or of the broker, destruction of the property, and expiration of the listing all:",
    ["Convert the listing to an open listing", "Transfer the listing to the salesperson personally", "Have no effect if the house is in escrow", "Terminate the agency"], 3,
    "Agency also ends by performance, mutual agreement, revocation or renunciation, and often by bankruptcy. Death of a salesperson does not by itself end the broker's listing.");
  Q(105, "Most salespersons work as independent contractors, but the broker must still:",
    ["Withhold income tax in every state by federal rule", "Avoid any supervision to keep the IRS classification", "Pay overtime under the listing contract", "Supervise licensed activity as required by license law"], 3,
    "IRS independent-contractor treatment and real-estate license-law supervision can coexist. The broker remains responsible for the firm's licensed acts.");

  /* ---------- Unit 106: Disclosures and Environmental ---------- */
  Q(106, "Federal lead-based paint disclosure rules apply to most housing built:",
    ["After 2000 only", "Before 1978", "Between 1988 and 1992 only", "After 1978 only"], 1,
    "HUD and EPA rules cover target housing constructed before 1978. Sellers and landlords must disclose known lead-based paint and give the prescribed pamphlet.");
  Q(106, "Buyers of pre-1978 housing must be given a lead-inspection opportunity of at least:",
    ["Three calendar months", "One business day", "Ten days, unless they waive it in writing", "No period; testing is mandatory"], 2,
    "The buyer has a 10-day (or otherwise agreed) chance to inspect for lead. The seller need not test or abate; the buyer may waive the contingency.");
  Q(106, "Which pamphlet must be given to buyers and tenants of most pre-1978 dwellings?",
    ["Closing Disclosure", "Loan Estimate", "USPAP Ethics Rule", "Protect Your Family From Lead in Your Home"], 3,
    "The EPA/HUD pamphlet is a required part of the lead disclosure package, along with any reports the seller has and a lead warning statement in the contract.");
  Q(106, "Radon is best described as a:",
    ["Colorless, odorless radioactive gas that can cause lung cancer", "Friable mineral fiber used in old insulation", "Brownfield cleanup statute", "Lead-based paint dust"], 0,
    "Radon comes from the natural decay of uranium in soil and rock. It enters buildings through foundation cracks. The EPA action level is 4 picocuries per liter.");
  Q(106, "The EPA recommends radon mitigation when indoor tests are at or above:",
    ["0.4 pCi/L", "4 pCi/L", "40 pCi/L", "400 pCi/L"], 1,
    "Four picocuries per liter is the EPA action level. Mitigation often uses sub-slab depressurization to vent gas outdoors. Tests are commonly taken in the lowest livable area.");
  Q(106, "Asbestos is most dangerous to occupants when it is:",
    ["Sealed behind intact walls and left undisturbed", "Encapsulated by a trained contractor", "Friable and able to release fibers into the air", "Used only as vinyl floor tile that is in good condition"], 2,
    "Friable asbestos can be crumbled by hand and inhaled. Encapsulation or enclosure is often preferred to removal, which can spread fibers if done poorly.");
  Q(106, "A common method of managing intact asbestos without ripping it out is:",
    ["Ignition", "Flooding the site under CERCLA first", "A Phase II soil-gas survey only", "Encapsulation"], 3,
    "Encapsulation seals the material so fibers cannot become airborne. Removal is used when the material is damaged or will be disturbed by renovation.");
  Q(106, "CERCLA is the federal statute that:",
    ["Created Superfund liability for hazardous-waste cleanup", "Requires the lead pamphlet", "Sets the 4 pCi/L radon standard as a binding national law", "Bans PMI on conventional loans"], 0,
    "The Comprehensive Environmental Response, Compensation, and Liability Act of 1980 created Superfund. Liability is typically strict, joint and several, and retroactive.");
  Q(106, "Under CERCLA, a current owner may be required to pay for cleanup even if that owner did not cause the contamination. That is:",
    ["Negligence liability only", "Strict liability", "Liability limited to the down payment", "A TILA finance charge"], 1,
    "Strict liability does not require fault. Joint and several liability means one responsible party may be held for the entire cost. Retroactive liability reaches conduct that was legal when it occurred.");
  Q(106, "The 1986 Superfund amendment that created a stronger innocent-landowner defense is:",
    ["FIRREA", "RESPA", "SARA", "ECOA"], 2,
    "SARA (Superfund Amendments and Reauthorization Act) refined CERCLA and recognized defenses for owners who performed appropriate due diligence before purchase.");
  Q(106, "The usual first environmental due-diligence report, without soil sampling, consists of:",
    ["Soil borings and laboratory sampling as the first step", "Removal of all underground tanks", "Encapsulation of asbestos", "Records review, site reconnaissance, and interviews"], 3,
    "A Phase I environmental site assessment looks for recognized environmental conditions. If red flags appear, Phase II involves sampling. Lenders and buyers use Phase I to support due-diligence defenses.");
  Q(106, "Potentially responsible parties under CERCLA include current owners and operators, past owners at the time of disposal, generators, and:",
    ["Transporters who selected the disposal site", "Appraisers who never visited", "Tenants on month-to-month leases only", "Listing brokers automatically in every sale"], 0,
    "The statute casts a wide net over parties in the chain of waste handling. An owner who bought after contamination can still be a PRP unless a statutory defense applies.");
  Q(106, "A standard homeowners insurance policy typically does NOT cover:",
    ["Fire damage from a kitchen accident", "Flood damage from a rising river", "Theft of personal property inside the dwelling, if the policy so provides", "Wind damage from a typical storm, if the policy so provides"], 1,
    "Flood (and usually earthquake) is excluded from a standard HO policy. Separate flood insurance is written through NFIP or private carriers, and lenders require it in SFHAs.");
  Q(106, "Contaminated sites that are less toxic than Superfund NPL sites and are targeted for reuse are commonly called:",
    ["Emblements", "Brownfields", "Riparian buffers only", "Spot zones"], 1,
    "Brownfields are abandoned or underused properties with actual or perceived contamination. Federal brownfields policy encourages cleanup and redevelopment.");
  Q(106, "Leaking underground storage tanks are an environmental concern because they can:",
    ["Increase the GRM of nearby rentals", "Create plottage value", "Contaminate soil and groundwater", "Convert a license into an easement"], 2,
    "USTs that held petroleum or chemicals can leak for years before discovery. Federal UST rules cover many commercial tanks; even exempt residential tanks can be a material disclosure issue.");
  Q(106, "Urea-formaldehyde foam insulation is a concern because it can release:",
    ["Radon gas from soil", "Lead dust", "Asbestos fibers", "Formaldehyde gas"], 3,
    "UFFI was used in the 1970s and can emit formaldehyde, especially when new. Current emission from old installations is often low, but disclosure of known UFFI is still material.");
  Q(106, "Carbon monoxide in a dwelling usually comes from:",
    ["Incomplete combustion of fuel in furnaces, water heaters, or cars in a garage", "Decay of granite countertops only", "Friable pipe wrap", "Lead-based paint chips"], 0,
    "CO is a colorless, odorless gas. Detectors and proper venting reduce the risk. It is a material safety issue when a faulty appliance is known.");
  Q(106, "A seller lists a house as-is. The seller knows the basement floods in every heavy rain. The seller:",
    ["Need not say anything because as-is waives all disclosure", "Must still disclose this known material defect", "Must disclose it only to the lender", "May disclose it only after the inspection period ends"], 1,
    "As-is allocates repair cost; it does not license concealment of known material facts. Licensees who know of the flooding must disclose it as well.");
  Q(106, "Mold growth in houses is most closely tied to:",
    ["High cap rates", "Lead-based paint in good condition", "Excess moisture and water intrusion", "Radon levels below 2 pCi/L"], 2,
    "Mold needs moisture. There is no single federal mold-disclosure form, but known, significant mold or chronic leaks are material conditions that should be revealed.");
  Q(106, "A perc test is used to determine whether land can support a:",
    ["Public sewer tap in a city street", "Municipal water main", "CERCLA consent decree", "Septic system"], 3,
    "A percolation test measures how quickly soil absorbs water. Failed perc can make a lot unbuildable without sewer service and is a material land-use fact.");
  Q(106, "Wetlands filling is commonly regulated at the federal level by the Clean Water Act and permits from:",
    ["The Army Corps of Engineers (and related EPA authority)", "Fannie Mae", "The local MLS", "USPAP"], 0,
    "Section 404 of the Clean Water Act regulates discharge of dredged or fill material into waters of the United States, including many wetlands. State and local rules may be stricter.");
  Q(106, "An environmental impact statement is most often required for:",
    ["A private garage sale", "Major federal actions that significantly affect the environment", "Every residential refinance", "Issuance of a certificate of occupancy on a shed"], 1,
    "NEPA requires federal agencies to study significant environmental effects. Large public projects, not ordinary house sales, trigger EIS practice.");
  Q(106, "A licensee who knows a listed house has a leaking oil tank should:",
    ["Keep the fact confidential as a seller secret", "Disclose it only if the buyer asks a direct question", "Disclose the known material environmental condition", "Wait until after closing to mention it"], 2,
    "Known material environmental hazards must be disclosed to the parties. Confidentiality does not cover concealing material defects from a buyer.");
  Q(106, "PCBs are hazardous chemicals historically found in:",
    ["Lead-based interior latex only", "Radon mitigation fans", "Emblements", "Electrical transformers and other oil-filled equipment"], 3,
    "Polychlorinated biphenyls were used in insulating oils. They persist in the environment and can contaminate soil and buildings around old electrical equipment.");
})((window.NYRE = window.NYRE || {}));
