/* Landmark Prep — national salesperson exam questions, units 107–111.
 * Q(unit, question, [choices], correctIndex, explanation). Choices are shuffled at display time. */
(function (NYRE) {
  NYRE.questions = NYRE.questions || [];
  function Q(u, q, c, a, e) { NYRE.questions.push({ u: u, q: q, c: c, a: a, e: e }); }

  /* ---------- Unit 107: Contracts ---------- */
  Q(107, "A seller signs an exclusive right-to-sell listing. During the listing term the seller finds a buyer at a family reunion and closes with no licensee involved. The listing broker is:",
    ["Still owed the agreed commission", "Owed a commission only if the MLS was used", "Owed nothing because the owner procured the buyer", "Owed only advertising costs"], 0,
    "Under an exclusive right-to-sell listing the broker is paid if the property sells during the term, even when the owner makes the sale unaided.");
  Q(107, "How does an exclusive-agency listing differ from an exclusive right-to-sell listing?",
    ["Exclusive agency forbids the listing broker from using the MLS", "The owner may sell without paying a commission if the owner finds the buyer without broker help", "Exclusive agency pays every broker who showed the property", "The listing term is limited by federal law to 30 days"], 1,
    "Exclusive agency still appoints one broker, but the owner may sell on the owner's own efforts without a fee. Exclusive right-to-sell pays the broker even if the owner finds the buyer.");
  Q(107, "An owner gives identical open listings to four brokers. The commission is earned by:",
    ["All four brokers in equal shares", "The broker who listed the property first", "The broker who is the procuring cause of the sale", "Whichever broker the owner prefers after closing"], 2,
    "An open listing is a nonexclusive employment. Only the procuring-cause broker is paid, and the owner may sell without a fee.");
  Q(107, "The statute of frauds generally requires which of the following to be in writing to be enforceable in court?",
    ["A month-to-month rental", "A six-month lease of a garage", "A 90-day contract to work as an unlicensed assistant", "A contract for the sale of land"], 3,
    "Contracts for the sale or transfer of an interest in real property must be in writing. Short leases under one year and ordinary employment agreements performable within a year are commonly enforceable even if oral.");
  Q(107, "While a paid option to purchase remains unexercised, which party is obligated to complete a sale if the holder elects to buy?",
    ["Only the optionor (the owner)", "Only the optionee (the holder)", "Both the optionor and the optionee from day one", "Neither party until a deed is delivered"], 0,
    "An option is a unilateral contract: the owner must sell if the holder exercises, but the holder may walk away and forfeit the option money.");
  Q(107, "A buyer offers $410,000. The seller replies in writing, \"Accepted if you pay $418,000.\" The seller's reply:",
    ["Accepts the offer and forms a contract at $410,000", "Is a counteroffer that rejects the original offer", "Holds the $410,000 offer open for a reasonable time", "Creates an option at $418,000"], 1,
    "Any change in terms is a counteroffer. A counteroffer rejects the original offer, which cannot later be accepted unless the buyer renews it.");
  Q(107, "A seller who is under a valid purchase contract refuses to convey. Because real estate is treated as unique, the buyer may sue for:",
    ["An automatic doubling of earnest money", "A statutory penalty of three times the deposit", "Specific performance", "Partition of the property"], 2,
    "Specific performance is an equitable remedy that orders the defaulting seller to complete the conveyance. Money damages are also available, but uniqueness of land supports this extra remedy.");
  Q(107, "A purchase contract states that if the buyer defaults, the seller may keep the earnest money as the seller's sole remedy. That money is functioning as:",
    ["A license fee", "Punitive damages", "A construction retainage", "Liquidated damages"], 3,
    "Liquidated damages are a sum the parties agree in advance will compensate the nonbreaching party. Earnest money often serves that role when the clause is clear and the amount is reasonable.");
  Q(107, "After a purchase contract is signed but before the deed is delivered, the buyer holds:",
    ["Equitable title", "Legal title in fee simple", "A leasehold estate", "Color of title only"], 0,
    "Equitable conversion gives the buyer equitable title (the right to receive the deed). The seller keeps legal title until closing as security for the price.");
  Q(107, "A contract says \"time is of the essence\" for the closing date. If one party is not ready to close on that date, the other party may:",
    ["Ignore the delay because dates in real estate are always flexible", "Treat the delay as a material breach and pursue contract remedies", "Automatically receive a 30-day extension by law", "Record the contract and wait one year"], 1,
    "A time-is-of-the-essence clause makes punctual performance a material term. Missing the stated deadline can be a default.");
  Q(107, "A new purchaser is substituted on a contract and the original buyer is fully released from liability. The substitution is:",
    ["An assignment only", "An accord without satisfaction", "A novation", "A subordination"], 2,
    "Novation replaces a party or an entire contract and releases the outgoing party. Assignment transfers rights but typically leaves the assignor secondarily liable.");
  Q(107, "A purchase and sale agreement in which the seller promises to convey and the buyer promises to pay is:",
    ["Unilateral", "Illusory", "Implied-in-fact only", "Bilateral"], 3,
    "Each side makes a promise, so the contract is bilateral. A classic option, by contrast, is unilateral until exercised.");
  Q(107, "A 17-year-old, not emancipated, signs a contract to buy a vacant lot. The contract is:",
    ["Voidable at the minor's option", "Void from the start", "Fully binding on both parties", "Enforceable only if notarized"], 0,
    "Contracts of a minor for real estate are voidable by the minor (not by the adult) until a reasonable time after majority, unless a narrow necessity exception applies.");
  Q(107, "A purchase contract lets the buyer cancel if a loan commitment is not obtained by a stated date. That provision is:",
    ["A liquidated-damages clause", "A mortgage (financing) contingency", "An acceleration clause", "A due-on-sale clause"], 1,
    "A financing contingency makes the buyer's duty to close depend on obtaining the described loan. If the loan is timely denied, the buyer may typically cancel and recover the deposit.");
  Q(107, "From the moment of signing until the deed is delivered and the price is paid, a typical purchase contract is:",
    ["Executed", "Void", "Executory", "Unenforceable by the statute of limitations"], 2,
    "An executory contract still has material duties outstanding. After closing, when both sides have fully performed, it is executed.");
  Q(107, "An offer to buy land, not supported by an option, dies automatically if, before acceptance:",
    ["The offeree asks a question about the price", "The listing broker advertises the property", "A competing offer arrives", "The offeror dies"], 3,
    "Death or insanity of the offeror terminates a revocable offer. An option supported by consideration survives the optionor's death and binds the estate.");
  Q(107, "Which element is required for a valid real estate contract along with competent parties, lawful purpose, and mutual assent?",
    ["A recorded memorandum", "A licensed attorney's signature", "Consideration", "An appraisal"], 2,
    "Consideration is the bargained-for exchange—usually the price promise and the promise to convey. Recording, appraisals, and attorney signatures are not elements of contract formation.");
  Q(107, "Under an installment land contract (contract for deed), until the buyer pays in full the seller typically retains:",
    ["No interest of any kind", "Only a lien that must be foreclosed like a mortgage in every state", "Legal title", "A leasehold only"], 2,
    "The vendor keeps legal title as security; the vendee holds equitable title and usually possession. The exact foreclosure-like process on default varies by state.");
  Q(107, "After a purchase contract is signed, the parties want to change the closing date. The proper instrument is:",
    ["A new listing agreement", "A quitclaim from a stranger to the title", "An amendment (or modification) of the existing contract", "A novation with a third-party lender"], 2,
    "An amendment changes terms of a contract already in force. An addendum adds terms, usually before or at the time of signing. Both should be signed by the parties.");
  Q(107, "Earnest money in a purchase contract is:",
    ["Required for the contract to be valid", "Not required for validity; it is evidence of good faith and may serve as liquidated damages", "The same thing as consideration for the conveyance", "A prepaid commission belonging to the listing broker at once"], 1,
    "A contract can be valid without a deposit. The buyer's promise to pay is consideration. Earnest money shows seriousness and is often applied to the price or kept as liquidated damages if so agreed.");
  Q(107, "An owner promises a neighbor: if the owner decides to sell, the neighbor may match any bona fide third-party offer. The neighbor holds:",
    ["A right of first refusal", "An option that already binds the owner to sell", "Equitable title", "A lease with an automatic purchase"], 0,
    "A right of first refusal is triggered only if the owner elects to sell. An option lets the holder force a sale during the option term even if the owner does not want to sell.");
  Q(107, "Both parties to a purchase contract agree in writing to cancel it and return the deposit. This is:",
    ["Specific performance", "Reformation", "A forfeiture declared by one party", "Mutual rescission"], 3,
    "Mutual rescission is an agreement to undo the contract and restore the parties, typically returning the earnest money. One party's unilateral cancellation is not rescission.");
  Q(107, "A buyer assigns a purchase contract to a friend. Unless the seller releases the original buyer, the original buyer:",
    ["Is automatically free of all liability", "Usually remains secondarily liable if the assignee defaults", "Holds legal title after the assignment", "Converts the deal into an option"], 1,
    "Assignment transfers the assignor's rights. Duties commonly follow, but the assignor stays on the hook unless the seller agrees to a novation.");
  Q(107, "Which of the following is the classic example of a unilateral real estate contract?",
    ["An option to purchase given for option money", "A signed purchase and sale agreement", "An exclusive right-to-sell listing with a broker", "A one-year written apartment lease"], 0,
    "The optionor is bound; the optionee is not bound to buy. Listings, leases, and purchase contracts are typically bilateral because both sides make promises.");
  Q(107, "A listing provides that if, within a stated number of days after it expires, the owner sells to a prospect the broker introduced during the term, a commission is still due. That provision is:",
    ["An automatic-renewal clause", "A net-listing clause", "A right of first refusal", "A protection (safety/extender) period clause"], 3,
    "A protection or extender period preserves the broker's fee for a limited time after expiration as to buyers the broker registered or procured, preventing an owner from waiting out the listing.");

  /* ---------- Unit 108: Leasing and Property Management ---------- */
  Q(108, "A lease that begins on June 1 and ends at midnight on May 31 two years later, with no automatic renewal, creates:",
    ["An estate for years (tenancy for a definite term)", "A periodic tenancy from year to year", "A tenancy at will", "A tenancy at sufferance"], 0,
    "An estate for years has a fixed start and end, even if the term is not measured in years. No notice is required to end it; it expires on the stated date.");
  Q(108, "A residential tenancy that automatically continues from period to period until proper notice is given is:",
    ["An estate for years", "A periodic tenancy", "A life estate", "A tenancy at sufferance"], 1,
    "A periodic tenancy (month-to-month or year-to-year) renews by operation of the parties' conduct until one of them gives the notice the lease or law requires.");
  Q(108, "A tenancy that can be ended by either party at any time, often with little or no advance notice beyond what statute requires, is:",
    ["An estate for years", "A remainder", "A tenancy at will", "A tenancy at sufferance"], 2,
    "Tenancy at will lasts only so long as both parties wish. Death of either party or sale of the property typically ends it.");
  Q(108, "After a one-year written lease ends, the occupant remains even though the landlord has refused permission to stay. The occupant's estate is:",
    ["A periodic tenancy from the first extra day", "A tenancy at will", "A life estate", "A tenancy at sufferance (holdover)"], 3,
    "Tenancy at sufferance is a holdover after a lawful estate ends. The landlord may evict or, by accepting rent, may create a new periodic tenancy.");
  Q(108, "Under a residential gross (straight) lease, the landlord typically pays:",
    ["Property taxes, insurance, and ordinary operating expenses, while the tenant pays a fixed rent", "Only the mortgage interest", "Nothing; the tenant pays every expense", "A percentage of the tenant's retail sales"], 0,
    "In a gross lease the stated rent is meant to cover the landlord's usual ownership costs. Net leases shift some or all of those costs to the tenant.");
  Q(108, "A commercial tenant pays a base rent plus property taxes, hazard insurance, and common-area maintenance. The lease is best described as:",
    ["A gross lease", "A triple-net (NNN) lease", "A ground lease of vacant land only", "A percentage lease with no base rent"], 1,
    "Triple-net leases pass through taxes, insurance, and maintenance. The landlord is left mainly with debt service and perhaps structural items, depending on the form.");
  Q(108, "A mall shop's rent is a fixed minimum plus a stated percentage of receipts once sales pass a breakpoint. The lease type is:",
    ["A gross residential lease", "A ground lease", "A percentage lease", "A sandwich lease"], 2,
    "Percentage leases are common in retail. The overage rent aligns the landlord's return with the tenant's sales.");
  Q(108, "A long-term lease of land alone, on which the tenant will construct and own the improvements for the term, is:",
    ["A gross apartment lease", "A tenancy at sufferance", "An estate at will", "A ground lease"], 3,
    "Ground leases are typically long (often decades). Improvements usually revert to the landowner at the end unless the lease says otherwise.");
  Q(108, "The original tenant transfers every remaining day of the leasehold to a replacement occupant and keeps no reversionary interest. That transfer is:",
    ["An assignment of the lease", "A sublease", "A surrender of the leasehold back to the landlord", "An attornment by the original landlord to a mortgagee"], 0,
    "Assignment transfers the whole remaining term. A sublease transfers less than the full remaining term, and the original tenant keeps a reversion.");
  Q(108, "A landlord refuses for months to repair a broken furnace in winter after repeated notice, making the dwelling unusable. The tenant moves out. The tenant is claiming:",
    ["Actual eviction by court order", "Constructive eviction", "Adverse possession", "A ground-lease forfeiture"], 1,
    "Constructive eviction occurs when the landlord's wrongful act or omission substantially interferes with use, the tenant gives notice and a chance to cure, and then vacates.");
  Q(108, "A landlord who wants to remove a defaulting tenant through the judicial process is seeking:",
    ["Constructive eviction", "Eminent domain", "Actual (legal) eviction", "A quiet-title decree"], 2,
    "Actual eviction is the court-supervised removal of the tenant. Self-help lockouts are restricted or forbidden in many jurisdictions.");
  Q(108, "The covenant of quiet enjoyment promises the tenant that:",
    ["The premises will be silent after 10 p.m.", "No property taxes will ever be levied", "The rent will never increase", "Possession will not be disturbed by the landlord or by someone with superior title"], 3,
    "Quiet enjoyment is about lawful possession, not noise. The landlord may not harass the tenant or permit a paramount title holder to oust the tenant.");
  Q(108, "The implied warranty of habitability in residential leases generally requires the landlord to:",
    ["Keep the dwelling fit for basic living, including essential services and code-level safety", "Guarantee the tenant a profit if the tenant sublets", "Repaint every six months", "Provide furniture"], 0,
    "Habitability covers heat, water, sanitation, and other basic living conditions. It cannot usually be waived in a residential lease.");
  Q(108, "A property manager employed to operate an apartment community owes primary fiduciary duties to:",
    ["Each tenant equally with the owner", "The owner (the manager's client/principal)", "The mortgage lender only", "The local housing authority"], 1,
    "The management agreement makes the owner the client. Tenants are customers of the operation, not the manager's principals, unless a separate agency is created.");
  Q(108, "The contract that sets a manager's fee, duties, term, and authority to spend and lease is the:",
    ["Listing agreement", "Purchase contract", "Property management agreement", "Deed of trust"], 2,
    "A written management agreement is the employment contract between owner and manager. It should state compensation, reports, reserves, and leasing authority.");
  Q(108, "Buying hazard insurance on a managed building is an example of which risk-management technique?",
    ["Risk avoidance by never owning property", "Risk retention by paying every loss from cash", "Risk control by installing better locks only", "Risk transfer"], 3,
    "Insurance shifts specified financial risk to the insurer in exchange for a premium. Avoidance, retention, and control are the other classic techniques.");
  Q(108, "Under the Americans with Disabilities Act, a property manager of a public accommodation (for example, a retail center) must generally:",
    ["Make reasonable modifications to policies and remove architectural barriers when that removal is readily achievable", "Refuse to rent to anyone who uses a wheelchair because of fire codes", "Charge extra rent equal to the cost of any ramp", "Ignore federal law if the local code is silent"], 0,
    "Title III of the ADA covers public accommodations. It requires reasonable modifications of policies, practices, and procedures, and readily achievable barrier removal. Residential dwellings are addressed primarily by the Fair Housing Act.");
  Q(108, "Before a tenant signs a lease on a dwelling built before 1978, federal lead-based paint rules require the landlord (or agent) to:",
    ["Give the EPA pamphlet and disclose known lead-based paint or hazards", "Remove all paint of every kind", "Test every wall at the landlord's expense in all cases", "Guarantee that no lead exists"], 0,
    "Target housing (pre-1978) requires disclosure of known information, an EPA-approved pamphlet, and a chance to inspect. It does not require the owner to abate in every rental.");
  Q(108, "An owner sells a warehouse and immediately rents it back from the buyer to continue operations. The arrangement is:",
    ["A sale-leaseback", "A ground lease of vacant land", "A tenancy at sufferance", "An option to purchase only"], 0,
    "A sale-leaseback frees capital for the seller-tenant while the buyer-landlord receives a long-term rental stream. The seller becomes a tenant.");
  Q(108, "A commercial lease that adjusts rent by reference to a published cost-of-living index is:",
    ["A gross lease with no adjustments", "An index lease", "A tenancy at will", "A license, not a lease"], 1,
    "Index leases keep the landlord's real return closer to inflation. The index, adjustment dates, and any cap should be spelled out.");
  Q(108, "A clause that raises commercial rent to pass through increases in taxes or operating costs is:",
    ["A subordination clause", "An exculpatory clause", "An escalation (pass-through) clause", "A prepayment penalty"], 2,
    "Escalation or expense-stop clauses shift specified cost increases to the tenant so the landlord's net is more stable.");
  Q(108, "A lease that starts at a lower rent and has scheduled increases at set intervals is:",
    ["A pure percentage lease with no base rent", "A tenancy at sufferance", "A ground lease of land only", "A graduated (step-up) lease"], 3,
    "Graduated leases use predetermined bumps, often to help a new business ramp up. They differ from index leases, which float with an outside index.");
  Q(108, "Security deposits collected from residential tenants should be treated as:",
    ["The landlord's unrestricted operating cash on the day received", "The tenant's money, held according to law and applied only to unpaid rent or documented damage", "A nonrefundable fee in every state", "Commission belonging to the leasing agent"], 1,
    "A security deposit is not rent in advance. It remains the tenant's funds, subject to statutory handling, accounting, and return rules that vary by state.");
  Q(108, "In an office building, usable square footage is the space a tenant actually occupies. Rentable square footage typically also includes:",
    ["Only the parking lot", "The tenant's furniture", "A proportionate share of common areas such as lobbies and corridors", "Public streets adjoining the lot"], 2,
    "Rentable area equals usable area plus the tenant's share of corridors, restrooms, and lobby. A load or add-on factor converts usable feet into the rentable feet used to compute rent.");
  Q(108, "If a landlord accepts rent after a lease expires and the parties do not sign a new term, the holdover often becomes:",
    ["A fee simple", "An easement in gross", "A life estate", "A periodic tenancy"], 3,
    "Acceptance of rent after expiration commonly creates a month-to-month (or other periodic) tenancy on the old terms, except those that conflict with a periodic estate.");

  /* ---------- Unit 109: Transfer of Title and Closing ---------- */
  Q(109, "The deed that usually contains the full set of covenants (seisin, right to convey, against encumbrances, quiet enjoyment, further assurance, and warranty forever) is a:",
    ["Quitclaim deed", "General warranty deed", "Sheriff's deed after a tax sale", "Trustee's deed in foreclosure"], 1,
    "A general warranty deed warrants title against defects arising both before and during the grantor's ownership. It gives the grantee the most deed-based protection.");
  Q(109, "A special warranty deed typically warrants title against defects that:",
    ["Arose during the grantor's period of ownership", "Arose at any time in the chain of title", "The grantor has never heard of", "Only a title insurer may raise"], 0,
    "Special (limited) warranty covers only claims arising by, through, or under the grantor. Earlier defects are not warranted by that grantor.");
  Q(109, "A quitclaim deed conveys:",
    ["A full warranty of marketable title", "An implied covenant of seisin in every state", "Whatever interest the grantor actually has, with no title covenants", "A new fee simple even if the grantor owns nothing"], 2,
    "Quitclaim deeds are used to clear clouds and to transfer uncertain interests. If the grantor owns nothing, the grantee receives nothing.");
  Q(109, "For a deed to transfer title, it must be delivered to and accepted by the grantee during the grantor's lifetime (or by valid escrow). Delivery is primarily a question of:",
    ["The county clerk's filing stamp alone", "Whether the grantee paid cash", "Whether the deed was drafted on a statutory form", "Whether the grantor intended to pass title"], 3,
    "Intent to make a present transfer is the heart of delivery. Recording is not required for validity between the parties, though it is essential for protection against later purchasers.");
  Q(109, "Acknowledgment of a deed (notarization of the grantor's signature) is required primarily so that the deed can be:",
    ["Valid between grantor and grantee in every case", "Recorded in the public land records", "Used as a will substitute", "Tax-free under federal law"], 1,
    "Between the parties, an unacknowledged deed may still pass title if delivered. Recording statutes generally require acknowledgment (or a substitute) before the clerk will accept the instrument.");
  Q(109, "An owner's title insurance policy, once issued, typically remains in force:",
    ["For as long as the owner or the owner's heirs have an interest, up to the policy amount", "Only until the first property-tax bill", "For one year, like a hazard policy", "Only while a mortgage remains unpaid"], 0,
    "Owner's coverage is a one-time premium that protects the named insured and usually the insured's heirs for as long as they hold an interest. A lender's policy declines as the loan is paid and ends when the loan is satisfied.");
  Q(109, "A lender's (mortgagee's) title policy protects:",
    ["The borrower against every title defect without a deductible", "The listing broker's commission", "The lender, generally up to the outstanding loan balance", "The county recorder"], 2,
    "The mortgagee policy insures the lien's priority and validity. The face amount typically tracks the loan and shrinks as principal is paid.");
  Q(109, "A condensed chronological history of recorded instruments affecting a parcel, prepared by an abstractor, is:",
    ["A Torrens certificate in every state", "A closing disclosure", "A bill of sale", "An abstract of title"], 3,
    "An abstract summarizes the public record. An attorney or title examiner then issues an opinion; title insurance is a separate contract of indemnity.");
  Q(109, "A gap, forgery, or undisclosed heir that makes ownership uncertain is commonly called:",
    ["A remainder", "A cloud on title", "A license", "A fixture filing"], 1,
    "A cloud is any claim or defect that impairs marketability. It may be removed by a quitclaim, a release, or a quiet-title action.");
  Q(109, "Recording a deed in the county land records gives the world:",
    ["Constructive notice of the recorded interest", "Actual notice only to people who were at closing", "No notice of any kind", "Inquiry notice only if the deed is unacknowledged"], 0,
    "Constructive notice is the law's presumption that a person knows what the public records would reveal. Actual notice is what a person really knows.");
  Q(109, "In a race-notice recording state, a later bona fide purchaser prevails against a prior unrecorded deed only if the later purchaser:",
    ["Takes with actual knowledge of the prior deed", "Is a donee who paid nothing", "Takes without notice and records first", "Occupies the land without recording"], 2,
    "Race-notice protects a subsequent purchaser for value who lacks notice of the prior claim and who records before that prior claim is recorded.");
  Q(109, "Under the federal TRID rules, a lender must generally provide the Closing Disclosure to the borrower at least:",
    ["One calendar hour before signing", "Seven weeks before application", "On the day of closing only", "Three business days before consummation"], 3,
    "The Closing Disclosure must arrive at least three business days before consummation so the borrower can review cash-to-close, the APR, and other terms. Certain last-minute changes restart the wait.");
  Q(109, "At closing, prepaid but unused property taxes that the seller already paid are typically:",
    ["Ignored because taxes never prorate", "A credit to the seller and a debit to the buyer", "A credit to the broker", "A debit to the seller and a credit to the buyer"], 1,
    "The buyer will enjoy the prepaid period after closing, so the buyer reimburses the seller. Unpaid taxes that cover the seller's period run the opposite way.");
  Q(109, "Which closing cost is customarily a buyer expense on a financed purchase (practice may vary by local custom)?",
    ["The loan origination fee and the lender's title policy", "The existing-loan prepayment penalty", "The brokerage commission specified in the listing", "Unpaid property taxes for the seller's period of ownership"], 0,
    "Buyers typically pay their loan fees and the mortgagee title policy. Sellers typically pay the listing commission and often a transfer tax, subject to contract and local custom.");
  Q(109, "Marketable title is title that:",
    ["Has no recorded history at all", "Is insured for more than the price", "A reasonably well-informed buyer would accept as free from serious defects and litigation risk", "Has been held for at least 99 years"], 2,
    "Marketable title need not be perfect, but it must not expose the buyer to a reasonable threat of litigation or to substantial defects. A purchase contract usually requires it.");
  Q(109, "A lawsuit brought to remove a cloud and confirm ownership against adverse claimants is:",
    ["A partition action among spouses only", "A forcible-entry proceeding", "An interpleader of earnest money only", "A quiet-title action"], 3,
    "Quiet title names possible claimants, gives them a chance to appear, and produces a decree that settles the record. It is a common cure for clouds that deeds will not clear.");
  Q(109, "Closing through a disinterested third party who holds funds and documents until all conditions occur is:",
    ["A face-to-face table closing only", "An escrow closing", "A foreclosure sale", "An abstract continuation"], 1,
    "In escrow, the escrow holder is a dual agent with limited, written instructions. When the conditions are met, the holder records the deed and disburses funds.");
  Q(109, "To be a valid grantor of a deed, a person must generally:",
    ["Be a licensed broker", "Be legally competent and sign the deed", "Be the same age as the grantee", "Have title insurance already in force"], 1,
    "The grantor must be identifiable, competent, and must sign. The grantee must be identifiable and capable of taking title but does not sign a typical warranty deed.");
  Q(109, "At or before closing, which settlement practice does RESPA Section 8 make illegal?",
    ["A borrower independently shopping among competing title companies", "A credit for tax prorations", "Kickbacks and unearned fees for settlement-service referrals on covered federally related loans", "The use of a Closing Disclosure"], 2,
    "Section 8 bars giving or accepting a thing of value for the referral of settlement business. Affiliated-business disclosures and bona fide payments for actual services are the lawful path.");
  Q(109, "The habendum clause in a deed is the clause that typically begins:",
    ["\"To have and to hold\" and describes the estate granted", "\"Know all persons by these presents\" only", "With the tax-map parcel number", "With the notary's jurat"], 0,
    "The granting clause transfers the interest; the habendum (\"to have and to hold\") describes the estate (for example, in fee simple). If they conflict, the granting clause usually controls.");
  Q(109, "A complete successive list of conveyances and encumbrances from a starting point (often a patent or an agreed root) down to the present owner is the:",
    ["Metes-and-bounds description", "Plat book index only", "Chain of title", "Closing protection letter"], 2,
    "The chain of title is the linked series of owners. A gap in the chain, or a stray deed out of the chain, is a classic cloud.");
  Q(109, "Real property passing to heirs when the owner dies without a valid will passes by:",
    ["Devise", "Escheat in every case, even if heirs exist", "Dedication", "Intestate succession (descent)"], 3,
    "Descent is the statutory scheme for intestacy. A devise is a gift of real property by will. Escheat applies only when no eligible heir exists.");
  Q(109, "Title to a refrigerator that is personal property (not a fixture) is transferred at closing by:",
    ["A bill of sale", "A general warranty deed covering the land only", "A quitclaim of the lot", "An easement in gross"], 0,
    "Deeds convey real property. A bill of sale conveys personal property. Whether an appliance is a fixture depends on annexation, intent, and adaptation.");
  Q(109, "A buyer who inspects the property and sees a tenant in possession is charged with:",
    ["No notice of the tenant's rights", "Constructive notice from the deed records only", "Actual notice of the occupancy, and inquiry notice of the tenant's claimed interest", "Marketable title automatically"], 2,
    "Possession is notice. A prudent buyer must ask what rights the occupant claims. Recording statutes do not erase interests a visit would reveal.");
  Q(109, "Adverse possession generally requires possession that is open, notorious, exclusive, hostile, and continuous for the statutory period. \"Hostile\" in this setting means:",
    ["The possessor physically assaulted the owner", "The parties signed a lease", "The possessor had the owner's written permission", "The possession is without the owner's permission and inconsistent with the owner's title"], 3,
    "Hostile means a claim contrary to the true owner's rights, not personal anger. Permission (a lease or license) defeats hostility.");

  /* ---------- Unit 110: Practice of Real Estate ---------- */
  Q(110, "Which class is protected by the federal Fair Housing Act but is not a basis of the Civil Rights Act of 1866?",
    ["Religion", "Race", "Color", "Age"], 0,
    "The 1866 Act reaches racial discrimination in property. The Fair Housing Act of 1968 added religion and national origin (and later sex, disability, and familial status).");
  Q(110, "The Civil Rights Act of 1866 prohibits discrimination in the sale or rental of property on the basis of:",
    ["Age and occupation", "Race and color, with no housing exemptions", "Familial status only", "Disability only"], 1,
    "Jones v. Mayer confirmed that the 1866 Act bars all racial discrimination in property, public or private. Fair Housing Act exemptions do not limit the 1866 Act.");
  Q(110, "A licensee shows families with children only houses near schools and shows childless couples only downtown lofts, based on those family facts. This is:",
    ["Legal target marketing of amenities", "A lawful occupancy-standard practice", "Steering", "Redlining by a lender"], 2,
    "Steering is directing people toward or away from neighborhoods or buildings because of a protected class. Clients may state their own preferences; the agent may not channel them by class.");
  Q(110, "An agent tells owners, \"Sell now—a different racial group is moving in and prices will drop.\" The agent is engaging in:",
    ["Redlining", "A comparative market analysis", "Puffing", "Blockbusting (panic peddling)"], 3,
    "Blockbusting is inducing listings or sales by exploiting prejudice or fear of demographic change. It is illegal under the Fair Housing Act.");
  Q(110, "A lender refuses to make loans in a mixed-race neighborhood regardless of each applicant's credit. This is:",
    ["Redlining", "Steering by a sales agent", "A lawful cultural-affinity program", "Blockbusting by a seller"], 0,
    "Redlining is denying credit or insurance based on the demographics of a geographic area rather than on the applicant and the collateral.");
  Q(110, "In Jones v. Alfred H. Mayer Co., the Supreme Court held that the Civil Rights Act of 1866:",
    ["Applies only to government sellers", "Bans racial discrimination in private property transactions", "Was repealed by the Fair Housing Act", "Covers only commercial leases"], 1,
    "Jones v. Mayer (1968) read 42 U.S.C. § 1982 to prohibit all racial discrimination in the sale or rental of property, including purely private deals.");
  Q(110, "The Fair Housing Amendments Act of 1988 added which protected classes?",
    ["Age and marital status", "Source of income and occupation", "Familial status and disability (handicap)", "Sexual orientation and military status"], 2,
    "Federal fair housing now covers race, color, religion, sex, national origin, familial status, and disability. Age, occupation, and source of income are not federal FHA classes (they may be under other laws or local ordinances).");
  Q(110, "Competing brokerage firms agree that all residential listings will be taken at 6 percent. This agreement is:",
    ["Required to stabilize the MLS", "A lawful trade association rule", "Permitted if disclosed on flyers", "Illegal price-fixing under the Sherman Antitrust Act"], 3,
    "Commission rates must be independently set by each firm and negotiated with the client. An agreement among competitors on fees is per se price-fixing.");
  Q(110, "All but one of the brokerages in a town jointly decide to withhold MLS cooperation from a firm that advertises discounted fees. The agreement is:",
    ["An illegal group boycott", "A lawful exclusive-agency rule", "Required by MLS bylaws in every market", "A tie-in arrangement with a title company"], 0,
    "A group boycott is concerted refusal to deal with a competitor. Each firm may independently choose its own business model; they may not combine to punish another firm.");
  Q(110, "Two competing firms secretly divide the county: one will handle only luxury listings and the other only first-time buyers. This is:",
    ["A lawful designated-agency plan", "Illegal market allocation", "Required by fair-housing law", "A permitted MLS split"], 1,
    "Dividing geographic markets or customer types among competitors suppresses competition and violates the Sherman Act.");
  Q(110, "A listing broker tells a seller, \"I will take the listing only if you agree to buy your home-warranty policy from my affiliate.\" This is:",
    ["A lawful package sale in every case", "Required by RESPA", "An illegal tying (tie-in) arrangement when used to force the extra product", "Price-fixing of commissions"], 2,
    "Tie-in arrangements condition the desired service on the purchase of a second product. The seller must be free to choose settlement providers, subject to lawful affiliated-business disclosures.");
  Q(110, "A broker deposits a buyer's earnest-money check into the broker's general operating account. This is:",
    ["Conversion of the funds to the broker's use", "Proper if the deal is expected to close", "Required so the broker can pay bills", "Commingling"], 3,
    "Commingling is mixing client or customer funds with the broker's own money. Conversion is the next step: actually using those funds.");
  Q(110, "A broker pays the office rent with money from a client's earnest-money trust account. This is:",
    ["Conversion", "Commingling only, because the check still cleared", "A lawful advance on commission", "Required if the operating account is overdrawn"], 0,
    "Conversion is the misappropriation of funds belonging to another. It is grounds for loss of license and may be a crime.");
  Q(110, "Dual agency, where one firm represents both seller and buyer in the same transaction, generally requires:",
    ["No disclosure if the commission is split", "Informed written consent of both parties (as required by applicable agency law)", "Only the seller's consent", "A court order"], 1,
    "Undisclosed dual agency is a breach of fiduciary duty. Informed consent, typically in writing, is the usual legal path; some states restrict or forbid dual agency.");
  Q(110, "Loyalty as a fiduciary duty requires the agent to:",
    ["Follow even illegal instructions", "Guarantee that the property will appraise", "Put the client's interests above the agent's and above others' in the transaction", "Keep every fact secret from the client"], 2,
    "OLD CAR / COALD duties include obedience (to lawful instructions), loyalty, disclosure, confidentiality, accounting, and reasonable care. Loyalty means the client's interest comes first.");
  Q(110, "Federal tax rules generally treat a real estate salesperson as an independent contractor when the salesperson:",
    ["Must keep set office hours and is paid an hourly wage", "Is forbidden in every case from any other employment even off duty", "Receives employee health insurance as the only compensation", "Is licensed, is paid chiefly by commission, and has a written independent-contractor agreement"], 3,
    "A salesperson is a statutory nonemployee for federal tax purposes if licensed, paid chiefly on output rather than hours, and working under a written independent-contractor agreement. The broker must still supervise licensed activity.");
  Q(110, "A seller's agent says, \"This is the most charming cottage on the block.\" That statement is best classified as:",
    ["Puffing (opinion or exaggeration not meant as fact)", "Fraudulent concealment of a latent defect", "A warranty of value", "A trigger term under Regulation Z"], 0,
    "Puffing is subjective opinion. It becomes misrepresentation when it states a material fact that is false or when it conceals a known defect.");
  Q(110, "A hidden structural defect that a reasonably careful visual inspection would not reveal, and that the seller knows about, is:",
    ["A patent defect the buyer must discover unaided", "A latent defect that generally must be disclosed", "Puffing", "A title cloud"], 1,
    "Latent defects are not obvious. Sellers and their agents must disclose known material latent defects; patent defects are visible and the buyer can see them.");
  Q(110, "Federal lead-based paint rules give a buyer of target housing (pre-1978) a period of how many days to conduct a paint inspection or risk assessment, unless the parties agree otherwise?",
    ["One business day with no waiver", "Ninety days that cannot be shortened", "Ten days", "None; inspection is forbidden until after closing"], 2,
    "The buyer must receive a 10-day opportunity (or another agreed period) to inspect. The buyer may waive it. Disclosure of known lead hazards is still required.");
  Q(110, "The federal Do Not Call rules generally allow a licensee to call a consumer whose number is on the registry if the licensee has an established business relationship, for up to:",
    ["18 months after the last transaction (and 3 months after an inquiry)", "Ten years after any website visit", "24 hours after a listing expires", "Only on Sundays"], 0,
    "An established business relationship permits calls for 18 months after a purchase or transaction and 3 months after an inquiry. The consumer may still demand no further calls.");
  Q(110, "The Equal Credit Opportunity Act (ECOA) makes it unlawful for a creditor to discriminate on the basis of race, color, religion, national origin, sex, marital status, age (with limited exceptions), or because the applicant:",
    ["Has a low credit score", "Receives income from a public-assistance program", "Wants a larger loan than the collateral supports", "Refuses to provide a Social Security number"], 1,
    "ECOA protects the credit-application process. Public-assistance income cannot be discounted because of its source. Creditworthiness may still be considered.");
  Q(110, "Under TILA/Regulation Z advertising rules, if a licensee's ad states a triggering term such as the amount of a monthly payment, the ad must also state:",
    ["The broker's home address only", "A slogan approved by the MLS", "The APR and other required credit terms", "The seller's motivation"], 2,
    "General statements such as \"easy financing\" do not trigger full disclosure. Specific terms (down payment, payment amount, number of payments, or finance charge) do, and the APR must appear.");
  Q(110, "In designated (appointed) agency within one firm, the broker typically:",
    ["Represents neither party", "Must keep both files in a single shared folder with no walls", "Acts as a dual agent for every in-house deal automatically", "Appoints separate licensees to represent the seller and the buyer, with information barriers"], 3,
    "Designated agency lets one firm give each party a dedicated agent. The broker remains responsible for supervision and for protecting confidential information.");
  Q(110, "Client funds held by a broker must be placed in a trust (escrow) account that is:",
    ["The broker's personal savings account", "Combined with the brokerage operating account each Friday", "Used to pay unlicensed assistants first", "Separate from the broker's operating and personal funds"], 3,
    "A trust account is a fiduciary account, usually demand-deposit and federally insured, used only for other people's money. Mixing or using those funds is commingling or conversion.");
  Q(110, "A material false statement of fact that a buyer relies on to purchase, made by an agent who knew it was false, is:",
    ["Puffing", "A lawful opinion of value", "An antitrust violation", "Fraudulent misrepresentation"], 3,
    "Fraud requires a false material fact, knowledge or reckless disregard, intent that the other party rely, actual reliance, and damage. Innocent misrepresentation can still support rescission without the intent element.");

  /* ---------- Unit 111: Real Estate Calculations ---------- */
  Q(111, "A $420,000 closing generates a 6% brokerage fee. The listing office and selling office split the fee 50/50. The listing salesperson is on a 60% split with the listing office. The listing salesperson's share is:",
    ["$7,560", "$12,600", "$15,120", "$25,200"], 0,
    "Total commission is $420,000 × 0.06 = $25,200. The listing side is one-half, or $12,600. Sixty percent of $12,600 is $7,560.");
  Q(111, "A seller wants to net $282,000 after a 6% commission. Ignoring other costs, the minimum sale price is:",
    ["$282,000", "$300,000", "$298,920", "$265,080"], 1,
    "Price × 0.94 = $282,000, so price = $282,000 ÷ 0.94 = $300,000. Check: 6% of $300,000 is $18,000, and $300,000 − $18,000 = $282,000.");
  Q(111, "A rectangular parcel measures 220 feet by 396 feet. How many acres does it contain?",
    ["1 acre", "1.5 acres", "2 acres", "5 acres"], 2,
    "220 × 396 = 87,120 square feet. One acre is 43,560 square feet, so 87,120 ÷ 43,560 = 2 acres.");
  Q(111, "A property is valued at $300,000 and the loan amount is $240,000. The loan-to-value ratio (LTV) is:",
    ["75%", "125%", "20%", "80%"], 3,
    "LTV = loan ÷ value = $240,000 ÷ $300,000 = 0.80, or 80%.");
  Q(111, "A lender charges 2 discount points on a $180,000 loan. The cost of the points is:",
    ["$3,600", "$1,800", "$3,600 per year", "$36,000"], 0,
    "One point is 1% of the loan amount. Two points = 0.02 × $180,000 = $3,600, paid in cash at closing unless financed.");
  Q(111, "A $200,000 loan bears 6% annual interest. Using a 360-day year and a 30-day month, the interest for one month is:",
    ["$1,200", "$1,000", "$600", "$3,600"], 1,
    "Annual interest is $200,000 × 0.06 = $12,000. One 30-day month is 30/360 = 1/12 of the year, so $12,000 ÷ 12 = $1,000.");
  Q(111, "Calendar-year taxes of $3,600 were prepaid by the seller. Closing is July 31; the seller owns the day of closing. Using a 360-day year (12 months of 30 days), the tax proration is a credit to the seller of:",
    ["$2,100", "$3,600", "$1,500", "$1,200"], 2,
    "Daily rate = $3,600 ÷ 360 = $10. The seller used January–July (7 × 30 = 210 days). Unused days remaining for the buyer: 360 − 210 = 150. Credit to seller = 150 × $10 = $1,500 (or 5/12 × $3,600).");
  Q(111, "An investor pays $600,000 for a property with net operating income of $48,000. The capitalization rate is:",
    ["6%", "7%", "12%", "8%"], 3,
    "Cap rate = NOI ÷ value = $48,000 ÷ $600,000 = 0.08, or 8%.");
  Q(111, "A fourplex sells for $360,000. Monthly gross rent is $2,000. The monthly gross rent multiplier (GRM) is:",
    ["180", "15", "6", "8"], 0,
    "Monthly GRM = sale price ÷ monthly rent = $360,000 ÷ $2,000 = 180.");
  Q(111, "Residential rental property is depreciated for federal tax purposes over 27.5 years using straight line. If the building (improvements only) is worth $275,000, the annual depreciation deduction is:",
    ["$27,500", "$10,000", "$7,051", "$39,000"], 1,
    "$275,000 ÷ 27.5 = $10,000 per year. Land is not depreciated; only the improvement basis is divided by 27.5 years.");
  Q(111, "A property is assessed at $180,000. The tax rate is 25 mills. The annual property tax is:",
    ["$450", "$2,500", "$4,500", "$45,000"], 2,
    "A mill is $1 per $1,000 of assessed value, so 25 mills = 0.025. Tax = $180,000 × 0.025 = $4,500.");
  Q(111, "A broker earns $18,000 on a $450,000 sale. The commission rate was:",
    ["3%", "4.5%", "5%", "4%"], 3,
    "$18,000 ÷ $450,000 = 0.04, or 4%.");
  Q(111, "A seller wants to net $194,000 after paying a 3% commission. Ignoring other costs, the listing price must be:",
    ["$200,000", "$194,000", "$199,820", "$188,180"], 0,
    "Price × 0.97 = $194,000, so price = $194,000 ÷ 0.97 = $200,000. Check: 3% of $200,000 is $6,000; $200,000 − $6,000 = $194,000.");
  Q(111, "A rectangular lot is 90 feet by 121 feet. Its area in acres is:",
    ["0.50 acre", "0.25 acre", "1 acre", "2 acres"], 1,
    "90 × 121 = 10,890 square feet. 10,890 ÷ 43,560 = 0.25 acre (one-quarter acre).");
  Q(111, "A buyer purchases a $250,000 home with an 80% LTV first mortgage. The required down payment is:",
    ["$200,000", "$20,000", "$50,000", "$80,000"], 2,
    "Loan = 0.80 × $250,000 = $200,000. Down payment = $250,000 − $200,000 = $50,000 (20% of price).");
  Q(111, "Three discount points are charged on a $250,000 loan. The borrower pays points of:",
    ["$750", "$2,500", "$3,000", "$7,500"], 3,
    "Three points = 3% of the loan = 0.03 × $250,000 = $7,500.");
  Q(111, "Interest-only monthly payment on a $150,000 loan at 4% annual interest (12 equal months) is:",
    ["$500", "$6,000", "$4,000", "$1,500"], 0,
    "Annual interest = $150,000 × 0.04 = $6,000. Monthly interest-only payment = $6,000 ÷ 12 = $500.");
  Q(111, "A tenant paid $1,800 rent in advance for a 30-day month. Closing is on the 11th; the seller owns the day of closing. Using a 30-day month, the rent credit to the buyer is:",
    ["$1,140", "$660", "$1,800", "$60"], 0,
    "Daily rent = $1,800 ÷ 30 = $60. The seller keeps 11 days ($660). The buyer is credited for the remaining 19 days: 19 × $60 = $1,140.");
  Q(111, "A property produces $36,000 of NOI. Investors require a 9% cap rate. The indicated value is:",
    ["$400,000", "$324,000", "$40,000", "$3,240,000"], 0,
    "Value = NOI ÷ cap rate = $36,000 ÷ 0.09 = $400,000.");
  Q(111, "A house sells for $240,000 and the monthly gross rent is $1,500. The monthly GRM is:",
    ["6.25", "160", "13.3", "180"], 1,
    "GRM = $240,000 ÷ $1,500 = 160. Using that GRM, a similar house renting for $1,600 per month would indicate $256,000.");
  Q(111, "Nonresidential real property is depreciated over 39 years straight line. If the building basis is $390,000, annual depreciation is:",
    ["$27,500", "$15,000", "$10,000", "$39,000"], 2,
    "$390,000 ÷ 39 = $10,000 per year. Residential rental improvements use 27.5 years; land is never depreciated.");
  Q(111, "Assessed value is $240,000. The tax rate is $2.50 per $100 of assessed value. Annual tax is:",
    ["$600", "$2,400", "$960", "$6,000"], 3,
    "$240,000 ÷ $100 = 2,400 taxable hundreds. 2,400 × $2.50 = $6,000. Equivalently, $240,000 × 0.025 = $6,000.");
  Q(111, "A 7% commission on a $500,000 sale is split 55% to the listing office and 45% to the selling office. The selling office's share is:",
    ["$19,250", "$15,750", "$35,000", "$17,500"], 1,
    "Total commission = $500,000 × 0.07 = $35,000. Selling office = 0.45 × $35,000 = $15,750.");
  Q(111, "A parcel contains 871,200 square feet. How many acres is that?",
    ["10 acres", "15 acres", "20 acres", "43.56 acres"], 2,
    "871,200 ÷ 43,560 = 20 acres. (43,560 × 20 = 871,200.)");
  Q(111, "A buyer is obtaining a 90% LTV loan on a $320,000 purchase and will pay 1.5 points. The dollar amount of the points is:",
    ["$4,800", "$3,200", "$2,880", "$4,320"], 3,
    "Loan = 0.90 × $320,000 = $288,000. Points = 0.015 × $288,000 = $4,320. Points are computed on the loan, not on the price.");
})((window.NYRE = window.NYRE || {}));
