/* NY Real Estate Prep — original practice questions, units 1–3.
 * Q(unit, question, [choices], correctIndex, explanation). Choices are shuffled at display time
 * (numeric choice sets are shown in ascending order instead). */
(function (NYRE) {
  NYRE.questions = NYRE.questions || [];
  function Q(u, q, c, a, e) { NYRE.questions.push({ u: u, q: q, c: c, a: a, e: e }); }

  /* ---------- Unit 1: License Law and Regulations ---------- */
  Q(1, "What is the minimum age to be licensed as a NY real estate salesperson?",
    ["Over 18", "16", "20", "21"], 0,
    "RPL §440-a: a salesperson must be over 18. A broker must be at least 20.");
  Q(1, "What is the minimum age to be licensed as a NY real estate broker?",
    ["18", "19", "20", "21"], 2,
    "Brokers must be 20 or older (RPL §440-a).");
  Q(1, "How many hours of approved qualifying education must a salesperson applicant complete?",
    ["45", "75", "77", "152"], 2,
    "The salesperson qualifying course is 77 hours (plus a school final exam).");
  Q(1, "An applicant for a broker's license must complete a total of how many hours of qualifying education?",
    ["75", "77", "120", "152"], 3,
    "Brokers need 152 hours: the 77-hour salesperson course plus the 75-hour broker course.");
  Q(1, "A NY real estate license is issued for a term of:",
    ["1 year", "2 years", "3 years", "4 years"], 1,
    "RPL §441-a(7): licenses are issued for 2 years.");
  Q(1, "How many hours of continuing education must a licensee complete each license term?",
    ["15", "22.5", "24", "30"], 1,
    "22.5 hours per 2-year term, including cultural competency, fair housing, implicit bias, ethics, recent legal matters and agency.");
  Q(1, "During a salesperson's FIRST two-year license term, how many hours of agency instruction are required as part of continuing education?",
    ["None", "2 hours", "1 hour", "3 hours"], 1,
    "RPL §441(3)(a): salespersons need 2 hours of agency in the initial term and 1 hour in later terms.");
  Q(1, "The Department of State may impose a fine on a licensee of up to how much per violation?",
    ["$500", "$1,000", "$2,000", "$5,000"], 2,
    "RPL §441-c: up to $2,000, with half going to the anti-discrimination in housing fund.");
  Q(1, "After a license is revoked, how long must the person wait before being eligible to be relicensed?",
    ["6 months", "2 years", "1 year", "They may never be relicensed"], 2,
    "RPL §441-c(4): ineligible for 1 year from the date of revocation.");
  Q(1, "A broker receives a buyer's deposit check. Under 19 NYCRR 175.1, it must be deposited into a separate special account:",
    ["Within 5 business days", "Within 10 days", "Before the end of the month", "Within 3 business days"], 3,
    "Deposits must go into a separate, special, federally insured account within 3 business days.");
  Q(1, "Mixing a client's money with the broker's own business or personal funds is called:",
    ["Commingling", "Conversion", "Escrow", "Rebating"], 0,
    "Commingling is prohibited (175.1). Conversion is actually using the client's money for yourself.");
  Q(1, "A salesperson closes a deal and the grateful seller wants to hand the salesperson a $1,000 bonus check directly. The salesperson may:",
    ["Accept it if the broker is told afterward", "Accept compensation only through their sponsoring broker", "Accept it only if it is under $500", "Accept it because it is a gift"], 1,
    "RPL §442-a: a salesperson may receive compensation only from the broker they are associated with.");
  Q(1, "A seller tells the listing broker: \"Get me $400,000 net and you can keep anything above that.\" This arrangement is:",
    ["An exclusive agency listing", "Legal if put in writing", "A net listing, which is prohibited in NY", "An open listing"], 2,
    "Net listings are prohibited by 19 NYCRR 175.19.");
  Q(1, "Acting as a real estate broker without a license is:",
    ["Not punishable", "Only a civil matter", "A felony", "A misdemeanor"], 3,
    "RPL §442-e: any violation of Article 12-A is a misdemeanor.");
  Q(1, "A person who collected a commission while violating Article 12-A can be sued by an aggrieved party for a penalty of up to:",
    ["Four times the commission", "Twice the commission", "The amount of the commission", "Ten times the commission"], 0,
    "RPL §442-e(3): between 1 and 4 times the amount received.");
  Q(1, "To sue for a commission in a NY court, the plaintiff must prove they were:",
    ["A member of a REALTOR association", "Licensed on the date the cause of action arose", "The listing agent", "Licensed for at least two years"], 1,
    "RPL §442-d: licensure on the date the claim arose is a prerequisite to suing for compensation.");
  Q(1, "Which of the following may negotiate a real estate sale for another for a fee WITHOUT a real estate license?",
    ["An apartment information vendor", "A tenant relocator", "A NY-admitted attorney at law", "A person who manages rentals for a neighbor for a fee"], 2,
    "RPL §442-f exempts attorneys at law, along with court-appointed persons and public officers.");
  Q(1, "A broker's license is suspended by the Department of State. What happens to the licenses of the salespersons associated with that broker?",
    ["Nothing", "They are revoked", "They are transferred automatically to the office manager", "They are suspended until the salespersons associate with another broker (or the suspension ends)"], 3,
    "RPL §441-d: the broker's suspension or revocation suspends the associated salespersons' licenses.");
  Q(1, "A broker can be disciplined for a salesperson's violation of the license law when the broker:",
    ["Had actual knowledge of it or kept the benefits after notice of it", "Was on vacation when it happened", "Employs more than 10 salespersons", "Did not personally train the salesperson"], 0,
    "RPL §442-c: broker liability requires actual knowledge, or retaining the benefits after notice.");
  Q(1, "A salesperson's association with Broker A ends on Friday. On Saturday, before associating with any other broker, the salesperson:",
    ["May continue working on pending deals", "May not perform any licensed activity", "May show property but not negotiate", "May act as an unlicensed assistant for a commission"], 1,
    "RPL §442-b: after termination, a salesperson may not perform licensed acts until associated with a new broker.");
  Q(1, "When a salesperson leaves a brokerage, 19 NYCRR 175.14 requires the salesperson to:",
    ["Take their listings with them", "Notify every client in writing", "Turn over all listing information to the broker", "Pay a $20 fee to the broker"], 2,
    "All listing information obtained during the association belongs to the broker and must be turned over.");
  Q(1, "For how long must a broker keep transaction records for residential sales under 19 NYCRR 175.23?",
    ["1 year", "2 years", "3 years", "7 years"], 2,
    "Transaction records are kept for 3 years.");
  Q(1, "An exclusive listing agreement says it \"renews automatically for successive 90-day periods unless canceled.\" This clause is:",
    ["Standard and enforceable", "Allowed if initialed by the seller", "Allowed only for commercial property", "Prohibited by DOS regulations"], 3,
    "19 NYCRR 175.15 prohibits automatic continuation beyond the fixed termination date.");
  Q(1, "A broker may place a \"For Sale\" sign on a property:",
    ["Only with the owner's consent", "Whenever it is listed on the MLS", "Only after a contract is signed", "Only on vacant land"], 0,
    "19 NYCRR 175.11: no sign without the owner's consent.");
  Q(1, "Under DOS advertising rules, which is true about advertisements by a salesperson?",
    ["A salesperson may advertise any property on the MLS", "The ad must include the name of the salesperson's broker or brokerage", "A salesperson's ads never need broker approval", "Only the salesperson's cell phone may appear"], 1,
    "175.25: only the broker places ads, a salesperson needs the broker's approval, and the broker's name must appear.");
  Q(1, "Which title is PROHIBITED in NY real estate advertising?",
    ["Licensed Real Estate Salesperson", "Associate Real Estate Broker", "Licensed Sales Agent", "Licensed Real Estate Broker"], 2,
    "175.25(c)(4) prohibits \"sales associate,\" \"licensed sales agent,\" and plain \"broker\" (for someone who isn't one).");
  Q(1, "Three salespersons at the same firm want to market themselves together. Which name complies with DOS team rules?",
    ["The Skyline Group", "Skyline Realty Associates", "Skyline Partners", "The Skyline Team at ABC Realty"], 3,
    "Team names must use the word \"team\" (not group, realty or associates) and, if members aren't named, add \"at/of\" the brokerage.");
  Q(1, "An advertisement that does not reveal that the advertiser is a real estate broker is called a:",
    ["Blind ad", "Classified ad", "Institutional ad", "Pocket listing"], 0,
    "Blind ads are prohibited. Ads must identify the broker or brokerage.");
  Q(1, "A licensee who disagrees with a Department of State disciplinary decision may seek court review through:",
    ["Small claims court", "An Article 78 proceeding", "The State Real Estate Board", "A SCAR petition"], 1,
    "RPL §441-f: DOS decisions are reviewable under CPLR Article 78.");
  Q(1, "A licensee's pocket card must be:",
    ["Posted in the office window", "Kept by the broker at all times", "Shown on demand", "Renewed every year"], 2,
    "RPL §441-a(6): pocket cards must be shown on demand.");
  Q(1, "A licensee convicted of a felony must send DOS a certified copy of the judgment of conviction within how many days of sentencing?",
    ["At renewal", "10 days", "30 days", "5 days"], 3,
    "RPL §441-a(12): within 5 days of the imposition of sentence.");
  Q(1, "The NY Property Condition Disclosure Statement is required in the sale of:",
    ["One-to-four family houses", "Condominium units", "Cooperative apartments", "Vacant land"], 0,
    "RPL Art. 14 covers 1–4 family dwellings. Condos, co-ops and unimproved land are excluded.");
  Q(1, "Since March 20, 2024, a seller subject to the Property Condition Disclosure Act must:",
    ["Either deliver the statement or give a $500 credit", "Deliver the disclosure statement before the buyer signs a binding contract", "Deliver the statement at closing", "Deliver it only if the buyer requests it"], 1,
    "The 2023 amendment eliminated the $500 credit option. The PCDS must be delivered before the buyer signs the contract.");
  Q(1, "A seller's listing agent learns that a death by natural causes occurred in the house last year. Under RPL §443-a, this fact:",
    ["Must be disclosed in the PCDS", "Must be disclosed by the agent orally", "Is not a material defect; the buyer may ask in writing and the seller may choose whether to respond", "Voids the listing"], 2,
    "Deaths, homicides, suicides and felonies on a property are not material defects under §443-a.");
  Q(1, "A seller who knows of uncapped natural gas wells on the property must disclose them:",
    ["Only if asked", "At the closing", "Within 30 days after closing", "Before entering into a contract of sale"], 3,
    "RPL §242(3): before entering into a contract.");
  Q(1, "A broker wants to pay a $500 finder's fee to an unlicensed neighbor who referred a buyer. This is:",
    ["Prohibited: brokers may share commissions only with licensees (or out-of-state brokers)", "Allowed if disclosed", "Allowed for referrals under $1,000", "Allowed with DOS approval"], 0,
    "RPL §442 bars paying compensation to unlicensed persons for help with a transaction.");
  Q(1, "A broker may give part of the commission to the buyer in the transaction as long as:",
    ["The buyer is a licensee", "It is not payment for performing licensed activity", "The seller pays it", "It is less than 1% of the price"], 1,
    "RPL §442 allows rebates to the parties, as long as they are not compensation for licensed services.");
  Q(1, "After a buyer's offer has been accepted, a mortgage broker's friend demands a \"referral fee\" from the listing broker for sending that buyer. Under RPL §442-l this fee:",
    ["Must be paid", "Is legal if under $250", "Is an illegal after-the-fact referral fee absent reasonable cause", "Is legal if paid by the seller"], 2,
    "§442-l prohibits after-the-fact referral fees without reasonable cause.");
  Q(1, "Under 19 NYCRR 175.21, broker supervision of salespersons must be:",
    ["Annual and written", "Delegated to the MLS", "Only when problems arise", "Regular, frequent and consistent"], 3,
    "The regulation requires \"regular, frequent and consistent personal guidance, instruction, oversight and superintendence.\"");
  Q(1, "A salesperson may NOT own:",
    ["Voting stock in the brokerage corporation with which they are associated", "Rental property", "Shares in a REIT", "Their own home"], 0,
    "19 NYCRR 175.22.");
  Q(1, "A Florida broker applies for a NY nonresident license. The applicant must file:",
    ["A $10,000 bond", "An irrevocable consent designating the NY Secretary of State to receive service of process", "Proof of NY residency", "A NY office lease"], 1,
    "RPL §442-g(2) requires an irrevocable consent to service of process.");
  Q(1, "Before DOS holds a disciplinary hearing, the licensee must receive written notice of the charges at least:",
    ["3 days before", "10 days before", "30 days before", "60 days before"], 1,
    "RPL §441-e(2): at least 10 days prior to the hearing.");
  Q(1, "Which task may an unlicensed assistant perform?",
    ["Hosting an open house alone", "Negotiating a rent concession", "Scheduling showing appointments for a licensee", "Explaining contract terms to a buyer"], 2,
    "Unlicensed assistants may do clerical tasks like scheduling. They may not show, host open houses or negotiate.");
  Q(1, "An applicant has a prior criminal conviction. Under NY law:",
    ["The applicant is permanently barred", "The applicant must wait 10 years", "Only misdemeanors are considered", "The conviction is not an automatic bar; DOS evaluates it under Correction Law Article 23-A"], 3,
    "RPL §440-a refers to Correction Law Article 23-A, which requires an individualized assessment.");
  Q(1, "A broker wants to move the main office across town. The broker must:",
    ["Get prior approval from the Department of State", "Just update the website", "Notify the local REALTOR board", "Wait until the license renewal"], 0,
    "19 NYCRR 175.20(d): no relocation without the department's prior approval. Moving without notice suspends the license.");
  Q(1, "A broker's office is on the 12th floor of an office building. The broker's sign requirement is satisfied by:",
    ["A neon sign in the window", "Posting the name and \"licensed real estate broker\" in the building's directory space", "No sign at all", "A sign on the broker's car"], 1,
    "RPL §441-a(3): in office, apartment or hotel buildings, post in the space provided for occupants' names.");
  Q(1, "How much is the fee for an initial salesperson license (including the fair-housing surcharge)?",
    ["$15", "$55", "$65", "$185"], 2,
    "$55 plus a $10 surcharge = $65. The exam is $15; a broker license is $185.");
  Q(1, "A salesperson changes sponsoring brokers. The fee to file the new record of association is:",
    ["$10", "$50", "$20", "No fee"], 2,
    "RPL §441-a(11): $20.");

  /* ---------- Unit 2: Law of Agency ---------- */
  Q(2, "Which is NOT one of the fiduciary duties listed on the NY agency disclosure form?",
    ["Undivided loyalty", "Obedience", "Duty to account", "Guaranteeing the property will appraise"], 3,
    "The six duties are reasonable care, undivided loyalty, confidentiality, full disclosure, obedience, and duty to account.");
  Q(2, "A listing expires without a sale. The former listing agent later works with a buyer interested in the same property. The agent:",
    ["Must still keep the former client's confidential information private", "May reveal the seller's lowest acceptable price", "May share confidential information after 30 days", "Must represent the former seller again"], 0,
    "The duty of confidentiality survives the end of the agency.");
  Q(2, "In a seller-agency relationship, the buyer who is not represented is the agent's:",
    ["Client", "Customer", "Principal", "Subagent"], 1,
    "The client (principal) is owed fiduciary duties. A customer is owed honesty and fair dealing.");
  Q(2, "A broker hired to find a buyer for one specific house is what type of agent?",
    ["Universal agent", "General agent", "Special agent", "Dual agent"], 2,
    "A listing broker is a special agent, authorized for one specific task.");
  Q(2, "A property manager who handles leasing, rent collection and maintenance for an owner is usually what type of agent?",
    ["Special agent", "Subagent", "Universal agent", "General agent"], 3,
    "Property managers are general agents with broad authority in one area.");
  Q(2, "In a typical listing, the salesperson who takes the listing is the:",
    ["Agent of the broker and subagent of the seller", "Principal", "Seller's attorney-in-fact", "Buyer's agent"], 0,
    "The broker is the seller's agent. The salesperson acts for the broker and is the seller's subagent.");
  Q(2, "An agency relationship created by the words and actions of the parties, without a formal agreement, is:",
    ["Express agency", "Implied agency", "Agency by estoppel", "Dual agency"], 1,
    "Implied agency arises from conduct.");
  Q(2, "A salesperson, without authority, negotiates a deal for an owner. The owner later accepts the benefits of the deal. Agency has been created by:",
    ["Estoppel", "Express agreement", "Ratification", "Operation of law"], 2,
    "Ratification is approving an unauthorized act after the fact.");
  Q(2, "An owner lets a third party reasonably believe that a person is the owner's agent, and the third party relies on it. The owner may be bound by agency by:",
    ["Ratification", "Implication", "Novation", "Estoppel"], 3,
    "Estoppel keeps the principal from denying an agency its conduct created.");
  Q(2, "A buyer's agent will be paid out of the listing broker's commission. Whom does the buyer's agent represent?",
    ["The buyer", "The seller, because the seller pays", "Both parties", "The listing broker only"], 0,
    "Who pays does not determine who is represented.");
  Q(2, "An agency relationship terminates automatically upon:",
    ["A drop in market prices", "The death of the principal", "The agent taking a vacation", "The listing being entered into the MLS"], 1,
    "Death or incapacity of either party, destruction of the property, and similar events end the agency.");
  Q(2, "Two competing brokers agree that neither will charge less than 6%. This is:",
    ["A legal industry standard", "Market allocation", "Price fixing, an antitrust violation", "A tie-in arrangement"], 2,
    "Agreeing on commission rates is price fixing under the Sherman Act.");
  Q(2, "Several brokers agree not to cooperate with a new discount brokerage. This is:",
    ["Steering", "Market allocation", "Price fixing", "Group boycotting"], 3,
    "A group boycott is a concerted refusal to deal.");
  Q(2, "Two brokers agree that one will work only north of Main Street and the other only south. This is:",
    ["Market allocation", "A tie-in arrangement", "Legal specialization", "Group boycotting"], 0,
    "Dividing territories or customers among competitors is market allocation.");
  Q(2, "A developer says, \"I'll sell you this lot only if you agree to list your current home with my brokerage.\" This is:",
    ["Price fixing", "A tie-in arrangement", "A net listing", "Dual agency"], 1,
    "Conditioning one product or service on buying another is a tie-in.");
  Q(2, "Dual agency in NY is permitted only if:",
    ["The broker discloses it at closing", "The broker splits the commission equally", "Both parties give informed consent in writing", "The property is commercial"], 2,
    "Dual agency requires the informed written consent of both buyer and seller (or landlord and tenant).");
  Q(2, "A broker represents a buyer and, without telling anyone, also takes a fee from the seller. Possible consequences include:",
    ["Nothing, if the deal closes", "A warning letter only", "A reduced commission only", "Loss of commission, rescission of the deal, and license discipline"], 3,
    "Undisclosed dual agency is illegal and can cost the commission, the deal and the license.");
  Q(2, "In a dual agency with designated sales agents, who is the dual agent?",
    ["The broker", "Each designated sales agent", "The buyer's attorney", "No one"], 0,
    "The broker remains the dual agent; designated salespersons advocate for each side.");
  Q(2, "A designated sales agent representing the buyer in an in-house transaction:",
    ["Owes the buyer undivided loyalty", "Advocates for the buyer but cannot provide undivided loyalty", "Represents both parties equally", "Represents only the broker"], 1,
    "Designated sales agents function as advocates, but like the dual agent they cannot provide undivided loyalty.");
  Q(2, "A seller has no vicarious liability for the acts of which cooperating agent?",
    ["A subagent", "The listing agent", "A broker's agent", "The listing salesperson"], 2,
    "A broker's agent has no direct relationship with the seller. The listing agent who engaged it bears the liability.");
  Q(2, "Why might a seller be vicariously liable for the misrepresentations of a cooperating broker?",
    ["Sellers are never liable", "Because every cooperating broker is a buyer's agent", "Because the seller paid the MLS fee", "Because the cooperating broker was acting as the seller's subagent"], 3,
    "Subagents act for the seller, so the seller can be vicariously liable.");
  Q(2, "The RPL §443 agency disclosure requirements apply to:",
    ["Sales and rentals of 1–4 family homes and condo/co-op units", "Vacant land sales", "All commercial leases", "Only new construction"], 0,
    "§443 applies to residential real property: 1–4 family dwellings and condo and co-op units, for sales and rentals.");
  Q(2, "A listing agent must give the seller the §443 agency disclosure form:",
    ["At closing", "Prior to entering into the listing agreement", "Within 3 days after listing", "Only if the seller asks"], 1,
    "§443(3)(a).");
  Q(2, "A seller's agent must give the §443 disclosure form to a prospective buyer:",
    ["At the contract signing", "After the buyer's offer is accepted", "At the time of the first substantive contact", "Never"], 2,
    "§443(3)(b): at the first substantive contact with the buyer.");
  Q(2, "A buyer refuses to sign the acknowledgment on the §443 form. The agent must:",
    ["Stop working with the buyer", "Nothing further", "Have the broker sign for the buyer", "Prepare a written declaration of the facts under oath or affirmation and keep it at least 3 years"], 3,
    "§443(3)(e).");
  Q(2, "How long must an agent keep a signed §443 acknowledgment?",
    ["3 years", "2 years", "1 year", "Until closing"], 0,
    "At least 3 years.");
  Q(2, "The NY agency disclosure form states that it:",
    ["Is a binding listing contract", "Is not a contract", "Obligates the buyer to use the agent", "Sets the commission"], 1,
    "It says \"THIS IS NOT A CONTRACT.\"");
  Q(2, "An owner lists with Broker A under an exclusive right to sell. The owner's cousin buys the house without any broker involvement. Who is owed a commission?",
    ["No one", "The cousin", "Broker A", "Any MLS broker"], 2,
    "Under an exclusive right to sell, the broker is paid no matter who finds the buyer.");
  Q(2, "Under an exclusive agency listing, the owner owes NO commission if:",
    ["A cooperating broker finds the buyer", "The property sells above list price", "The listing broker finds the buyer", "The owner personally finds the buyer"], 3,
    "The exclusive agency listing lets the owner sell without a commission.");
  Q(2, "An owner gives open listings to three brokers. Which broker earns the commission?",
    ["The broker who is the procuring cause of the sale", "The first broker to sign", "All three equally", "None, because open listings are illegal"], 0,
    "Open listings pay only the broker who procures the buyer.");
  Q(2, "A seller's agent knows the roof leaks, and the seller asks the agent not to mention it. The agent should:",
    ["Obey the seller", "Disclose the known material defect to buyers", "Tell only buyers who ask", "Withdraw without comment"], 1,
    "Agents must disclose known facts that materially affect value or desirability. Obedience doesn't extend to concealment.");
  Q(2, "An agent says a house has \"the most charming kitchen in the county.\" This statement is most likely:",
    ["Fraud", "Negligent misrepresentation", "Puffing", "A breach of confidentiality"], 2,
    "Puffing is an obvious opinion or exaggeration, not a statement of fact.");
  Q(2, "A landlord tells the leasing agent not to rent to families with young children. The agent should:",
    ["Follow the instruction under the duty of obedience", "Follow it if written", "Follow it only for older buildings", "Refuse, because the instruction is illegal"], 3,
    "The duty of obedience covers only lawful instructions. Familial status is protected.");
  Q(2, "A seller's agent holds the buyer's earnest money deposit. Which fiduciary duty governs handling it properly?",
    ["Duty to account", "Loyalty", "Obedience", "Confidentiality"], 0,
    "The duty to account covers safeguarding and accounting for money and property.");
  Q(2, "A buyer asks the seller's agent, \"What's the lowest price the seller will take?\" The seller's agent should:",
    ["Disclose the bottom line to keep things moving", "Keep it confidential", "Tell the buyer's attorney only", "Guess based on comparables"], 1,
    "The seller's bottom line is confidential information.");
  Q(2, "After an offer is accepted but before contract, a seller's agent receives a second, higher offer. The agent should:",
    ["Ignore it", "Give it to the first buyer", "Present it to the seller", "Hold it until closing"], 2,
    "Full disclosure requires presenting offers to the client unless the client has given other written instructions.");
  Q(2, "Which is a key requirement for a salesperson to be treated as an independent contractor for federal tax purposes (IRC §3508)?",
    ["They are paid an hourly wage", "They are paid a salary with a bonus", "They work only from the broker's office", "Substantially all pay is tied to sales or output, not hours"], 3,
    "§3508 requires a license, pay tied to output, and a written contract.");
  Q(2, "Along with being licensed and paid based on output, IRC §3508 requires:",
    ["A written contract stating the salesperson won't be treated as an employee for tax purposes", "A non-compete clause", "Health insurance", "Membership in the MLS"], 0,
    "A written contract is required.");
  Q(2, "If salespersons are reclassified as employees, the broker becomes responsible for:",
    ["Nothing new", "Withholding taxes, unemployment insurance, workers' comp and disability", "Only the salespersons' MLS dues", "Their license fees"], 1,
    "Employee status brings payroll tax, unemployment, workers' comp and disability obligations.");
  Q(2, "An agreement in which a buyer hires a broker to locate property and represent the buyer is often called:",
    ["An exclusive right to sell", "An open listing", "An exclusive right to represent", "A net listing"], 2,
    "A buyer agency agreement is often styled an exclusive right to represent.");
  Q(2, "Where can a seller or buyer indicate advance informed consent to dual agency?",
    ["Only in the purchase contract", "Only verbally", "On the deed", "On the §443 agency disclosure form"], 3,
    "The NY disclosure form includes checkboxes for advance informed consent.");
  Q(2, "A brokerage has a policy of representing sellers only. A buyer who comes to that firm is treated as:",
    ["A customer", "A client", "A subagent", "A dual-agency principal"], 0,
    "Under seller-agency-only, buyers are customers, owed honesty and fair dealing but not fiduciary loyalty.");
  Q(2, "Before a buyer consents to dual agency, the agent must explain that the buyer will be giving up:",
    ["The right to a home inspection", "The right to undivided loyalty", "The right to an attorney", "The mortgage contingency"], 1,
    "The form warns that consenting to dual agency means giving up undivided loyalty.");
  Q(2, "Vicarious liability means:",
    ["Liability for one's own intentional acts", "Liability only for fraud", "Liability of a principal for the acts of its agent", "Liability of a buyer for the seller's taxes"], 2,
    "A principal can be responsible for an agent's (or subagent's) acts within the scope of the agency.");
  Q(2, "A buyer's agent learns that the buyer's loan application was denied. In dealings with the seller, the buyer's agent should:",
    ["Hide it to protect the buyer", "Say nothing until closing", "Tell only the buyer's attorney", "Disclose facts materially affecting the buyer's ability to perform"], 3,
    "The form requires disclosure of facts materially affecting the buyer's ability or willingness to perform.");
  Q(2, "A fire destroys a listed house before any sale. The listing agency:",
    ["Terminates", "Continues until its expiration date", "Converts to an open listing", "Converts to a buyer agency"], 0,
    "Destruction of the property terminates the agency.");
  Q(2, "A salesperson has been acting as a buyer's agent and now wants to act as the seller's agent in the same deal. This requires:",
    ["No action", "New disclosure and the informed written consent of the parties", "Only the broker's approval", "A DOS waiver"], 1,
    "Changing roles requires new disclosure and consent.");
  Q(2, "A broker cooperates with a listing agent to find a buyer but was hired by, and takes direction from, the listing agent rather than the seller. This broker is a:",
    ["Subagent", "Dual agent", "Broker's agent", "Principal"], 2,
    "A broker's agent is engaged by the listing agent or buyer's agent, not the client.");
  Q(2, "Which statement about compensation and agency is correct?",
    ["The party who pays the commission is always the client", "Commissions must be 6%", "NY law sets commission rates", "Compensation arrangements must be negotiated between the broker and the client and do not by themselves determine agency"], 3,
    "Commissions are negotiable. Payment doesn't determine agency.");
  Q(2, "The duty of reasonable care requires an agent to:",
    ["Use the skill and diligence expected of a competent licensee", "Guarantee results", "Give legal advice", "Answer only in writing"], 0,
    "Reasonable care means competence and diligence, not guarantees. Agents should refer legal and tax questions to professionals.");
  Q(2, "Under industry rules adopted Aug. 17, 2024 (not a NY statute), before an MLS agent tours a home with a buyer, the agent must have:",
    ["A signed contract of sale", "A written agreement with the buyer", "A preapproval letter", "The seller's attorney's consent"], 1,
    "The NAR settlement practice changes require written buyer agreements before touring.");

  /* ---------- Unit 3: Legal Issues: Estates, Liens, Deeds, Closings ---------- */
  Q(3, "The most complete form of ownership, lasting forever and fully inheritable, is:",
    ["Life estate", "Estate for years", "Fee simple absolute", "Fee simple determinable"], 2,
    "Fee simple absolute is the highest form of ownership.");
  Q(3, "A deed conveys land to a church \"so long as the land is used for religious purposes.\" The church holds a:",
    ["Fee simple absolute", "Leasehold", "Life estate", "Fee simple determinable"], 3,
    "\"So long as\" creates a determinable fee that ends automatically if the condition is broken.");
  Q(3, "Maria gets a life estate measured by the life of her uncle. This is a life estate:",
    ["Pur autre vie", "In remainder", "By the entirety", "In severalty"], 0,
    "Pur autre vie means \"for the life of another.\"");
  Q(3, "A grants a life estate to B, with the property going to C when B dies. C is the:",
    ["Life tenant", "Remainderman", "Reversioner", "Grantor"], 1,
    "A third party who takes after a life estate is the remainderman. If it went back to A, that would be a reversion.");
  Q(3, "A life tenant cuts down all the timber and lets the house collapse. This is called:",
    ["Escheat", "Laches", "Waste", "Accretion"], 2,
    "A life tenant must not commit waste against the remainderman's interest.");
  Q(3, "A lease runs from June 1, 2026 to May 31, 2027. This is an:",
    ["Estate at sufferance", "Periodic estate", "Estate at will", "Estate for years"], 3,
    "A lease with a definite start and end is an estate for years, no matter its length.");
  Q(3, "A month-to-month tenancy that renews automatically until notice is given is a(n):",
    ["Periodic estate", "Estate for years", "Estate at sufferance", "Life estate"], 0,
    "A periodic estate renews automatically.");
  Q(3, "A tenant stays after the lease expires without the landlord's consent. This is an:",
    ["Estate at will", "Estate at sufferance", "Estate for years", "Periodic estate"], 1,
    "An estate at sufferance is a holdover without consent.");
  Q(3, "Ownership by one person or one corporation alone is ownership in:",
    ["Tenancy in common", "Joint tenancy", "Severalty", "Partnership"], 2,
    "Severalty means \"severed\" from others: a sole owner.");
  Q(3, "Two unmarried friends buy a house, and the deed doesn't specify the form of ownership. In NY they hold as:",
    ["Joint tenants", "Owners in severalty", "Tenants by the entirety", "Tenants in common"], 3,
    "Co-owners who aren't married are presumed tenants in common unless joint tenancy is expressly stated.");
  Q(3, "Which feature distinguishes joint tenancy from tenancy in common?",
    ["Right of survivorship", "Undivided interests", "Ability to sell your share", "Equal right to possession"], 0,
    "Joint tenancy has survivorship. Both forms have undivided interests and unity of possession.");
  Q(3, "The four unities required for a joint tenancy are:",
    ["Time, title, income and purpose", "Time, title, interest and possession", "Title, marriage, possession and survivorship", "Interest, deed, recording and possession"], 1,
    "Remember T-TIP: time, title, interest, possession.");
  Q(3, "Tenancy by the entirety is available only to:",
    ["Business partners", "Any two related people", "Married couples", "Corporations"], 2,
    "Only spouses can hold as tenants by the entirety. It can't be severed by one spouse alone.");
  Q(3, "Three tenants in common can't agree on whether to sell. Any of them can ask a court to divide the property or order its sale through:",
    ["Escheat", "Specific performance", "Eminent domain", "An action for partition"], 3,
    "Partition divides co-owned property or orders its sale.");
  Q(3, "In a trust, the party holding legal title for the benefit of another is the:",
    ["Trustee", "Beneficiary", "Trustor", "Settlor"], 0,
    "The trustee holds title for the beneficiary. The trustor (settlor) creates the trust.");
  Q(3, "A buyer of a cooperative apartment receives:",
    ["A deed to the unit", "Shares of stock and a proprietary lease", "A life estate", "An easement"], 1,
    "Co-op interests are personal property: stock plus a proprietary lease.");
  Q(3, "Which is NOT one of the tests commonly used to decide whether an item is a fixture?",
    ["Method of attachment", "Adaptation to the property", "The item's purchase price", "Intention of the parties"], 2,
    "The tests are method of annexation, adaptation, intention, agreement and the relationship of the parties.");
  Q(3, "A restaurant tenant installs ovens and booths for its business. When the lease ends, these items:",
    ["Belong to the landlord", "Become common elements", "Must be sold to the next tenant", "Are trade fixtures the tenant may remove before the lease ends"], 3,
    "Trade fixtures remain the tenant's property if removed before the lease ends.");
  Q(3, "Rights of an owner whose land borders a flowing river are:",
    ["Riparian rights", "Littoral rights", "Air rights", "Subsurface rights"], 0,
    "Riparian means rivers and streams. Littoral means lakes and oceans.");
  Q(3, "Land gradually builds up along a riverbank through natural deposits of soil. This process is:",
    ["Avulsion", "Accretion", "Erosion", "Escheat"], 1,
    "Accretion is the gradual addition of land. The deposited soil is called alluvion.");
  Q(3, "A storm suddenly washes away part of a parcel. This is:",
    ["Reliction", "Accretion", "Avulsion", "Alluvion"], 2,
    "Avulsion is a sudden loss.");
  Q(3, "When a person dies without a will and without heirs, the property passes to the state by:",
    ["Eminent domain", "Devise", "Adverse possession", "Escheat"], 3,
    "Escheat.");
  Q(3, "Which is a GENERAL lien?",
    ["A judgment", "A real estate tax lien", "A mortgage", "A mechanic's lien"], 0,
    "Judgments attach to all the debtor's property. The others attach to one specific property.");
  Q(3, "Which lien generally has priority regardless of when it was recorded?",
    ["A first mortgage", "A real property tax lien", "A mechanic's lien", "A judgment lien"], 1,
    "Real property taxes and special assessments take priority over other liens.");
  Q(3, "A contractor who wasn't paid for building an addition to a single-family home in NY should file a mechanic's lien within:",
    ["2 years", "4 months after completion", "8 months after completion", "30 days"], 1,
    "Lien Law: generally 8 months, but 4 months for a single-family dwelling.");
  Q(3, "A recorded notice that a lawsuit affecting title to a property is pending is a:",
    ["Subordination", "Satisfaction", "Lis pendens", "Quitclaim"], 2,
    "A lis pendens warns buyers and lenders of the pending action.");
  Q(3, "A first-mortgage lender agrees to let a new loan take priority over its own lien. This is done with a:",
    ["Release clause", "Lis pendens", "Novation", "Subordination agreement"], 3,
    "A subordination agreement changes lien priority by agreement.");
  Q(3, "Which is an encumbrance?",
    ["An easement", "A fee simple estate", "The bundle of rights", "A deed"], 0,
    "Encumbrances include liens, easements, deed restrictions and encroachments.");
  Q(3, "Lot A has a recorded right to cross Lot B to reach the road. Lot A is the:",
    ["Servient tenement", "Dominant tenement", "Easement in gross", "Licensee"], 1,
    "The benefited parcel is dominant; the burdened parcel (B) is servient.");
  Q(3, "A utility company's right to run lines across private land is typically an:",
    ["Easement appurtenant", "Encroachment", "Easement in gross", "Estate at will"], 2,
    "An easement in gross benefits a person or company, with no dominant parcel.");
  Q(3, "In NY, an easement by prescription requires open, notorious, continuous and hostile use for:",
    ["5 years", "10 years", "15 years", "20 years"], 1,
    "10 years in NY.");
  Q(3, "A parcel with no access to a public road may obtain an:",
    ["Escheat", "Easement in gross", "Encroachment", "Easement by necessity"], 3,
    "Landlocked parcels can get an easement by necessity.");
  Q(3, "The owner of the dominant tenement buys the servient tenement. The easement:",
    ["Terminates by merger", "Continues", "Becomes an easement in gross", "Must be re-recorded"], 0,
    "When one owner holds both parcels, the easement ends by merger.");
  Q(3, "A neighbor gives permission to park in her driveway during a party, revocable at any time. This is a:",
    ["Easement appurtenant", "License", "Lease", "Life estate"], 1,
    "A license is personal, revocable permission, not an interest in land.");
  Q(3, "A survey shows that a neighbor's garage extends 2 feet onto the property. This is an:",
    ["Easement", "Accretion", "Encroachment", "Appurtenance"], 2,
    "An encroachment is an improvement extending onto another's land.");
  Q(3, "Which is NOT required for a deed to be valid?",
    ["A competent grantor", "A legal description", "Delivery and acceptance", "Recording in the county clerk's office"], 3,
    "Recording protects the buyer by giving constructive notice, but isn't required for validity.");
  Q(3, "Title to real property passes when the deed is:",
    ["Delivered and accepted", "Acknowledged before a notary", "Signed by the grantor", "Recorded"], 0,
    "Delivery and acceptance transfer title.");
  Q(3, "The clause beginning \"to have and to hold\" that defines the estate granted is the:",
    ["Granting clause", "Habendum clause", "Subject-to clause", "Merger clause"], 1,
    "The habendum clause.");
  Q(3, "Which deed gives the buyer the MOST protection?",
    ["Quitclaim deed", "Bargain and sale deed without covenants", "Full covenant and warranty deed", "Referee's deed"], 2,
    "The full covenant and warranty deed includes seizin, quiet enjoyment, against encumbrances, further assurances and warranty.");
  Q(3, "A deed that contains no warranties and is often used to clear a cloud on title is a:",
    ["Bargain and sale with covenants", "Warranty deed", "Executor's deed", "Quitclaim deed"], 3,
    "A quitclaim conveys whatever interest the grantor may have, with no promises.");
  Q(3, "The deed commonly used downstate in NY residential sales, where the grantor promises only that they did nothing to encumber the title, is the:",
    ["Bargain and sale deed with covenant against grantor's acts", "Full covenant and warranty deed", "Quitclaim deed", "Referee's deed"], 0,
    "A bargain and sale deed with covenants is standard in downstate NY residential closings.");
  Q(3, "A property sold at a court-ordered foreclosure sale is conveyed by a:",
    ["Warranty deed", "Referee's deed", "Quitclaim deed", "Gift deed"], 1,
    "A court-appointed referee conveys title after a judicial foreclosure.");
  Q(3, "Recording a deed gives:",
    ["Actual notice", "Title insurance", "Constructive notice to the world", "A warranty of title"], 2,
    "Recording provides constructive (legal) notice.");
  Q(3, "A legal description that begins at a point of beginning and follows courses and distances around the parcel is:",
    ["Lot and block", "Street address", "Rectangular survey", "Metes and bounds"], 3,
    "Metes and bounds must return to the point of beginning.");
  Q(3, "Which method of legal description is NOT used in New York?",
    ["Rectangular (government) survey system", "Reference to a filed subdivision map", "Metes and bounds", "Monuments"], 0,
    "NY uses metes and bounds and lot/block. The government survey system is used in other states.");
  Q(3, "A title insurance policy that protects the buyer's ownership interest is the:",
    ["Mortgagee policy", "Owner's policy", "Hazard policy", "Umbrella policy"], 1,
    "The owner's policy protects the owner. The lender's (mortgagee) policy protects the lender.");
  Q(3, "The recorded history of a property's ownership is the:",
    ["Abstract of title", "Deed restriction", "Chain of title", "Survey"], 2,
    "The chain of title is the sequence of owners. An abstract summarizes the recorded documents.");
  Q(3, "RESPA prohibits:",
    ["Title insurance", "Seller concessions", "Adjustable-rate mortgages", "Kickbacks and unearned referral fees in settlement services"], 3,
    "RESPA Section 8 bans kickbacks.");
  Q(3, "Under federal TRID rules, a borrower must receive the Closing Disclosure at least how long before consummation?",
    ["1 business day", "3 business days", "7 business days", "30 days"], 1,
    "3 business days before closing. The Loan Estimate is due within 3 business days of application.");
  Q(3, "The seller prepaid the annual property taxes. At closing, the proration will:",
    ["Credit the seller and debit the buyer", "Credit the buyer and debit the seller", "Debit both parties", "Not appear on the statement"], 0,
    "The seller paid for days the buyer will own, so the buyer reimburses the seller.");
  Q(3, "The seller collected the full month's rent from a tenant before closing on the 10th. At closing, the rent proration will:",
    ["Credit the seller", "Credit the buyer for the days after closing", "Be ignored", "Be paid to the tenant"], 1,
    "The seller holds rent for days the buyer owns, so the buyer is credited.");
  Q(3, "Tenant security deposits held by the seller are transferred at closing as a:",
    ["Debit to the buyer", "Credit to the seller", "Credit to the buyer and debit to the seller", "Payment to the tenant"], 2,
    "The buyer assumes responsibility for the deposits, so the buyer is credited.");
  Q(3, "In a residential sale of $1.2 million in NY, the 1% mansion tax is customarily paid by the:",
    ["Seller", "Lender", "Broker", "Buyer"], 3,
    "The mansion tax is the buyer's cost on residential sales of $1M or more.");
  Q(3, "Under NY GOL §5-1311, if a house is destroyed by fire after the contract is signed but before title or possession passes, the loss generally falls on the:",
    ["Seller", "Buyer", "Broker", "Title company"], 0,
    "Risk of loss stays with the seller until title or possession transfers, unless the contract provides otherwise.");
  Q(3, "In NY, adverse possession requires possession for:",
    ["5 years", "10 years", "15 years", "21 years"], 1,
    "10 years, under a claim of right, and open, notorious, exclusive, continuous and hostile.");
  Q(3, "A person who dies without a will dies:",
    ["Testate", "Intestate", "In severalty", "By devise"], 1,
    "Intestate. Property passes to heirs by descent through an administrator.");
  Q(3, "A gift of real property by will is a:",
    ["Bequest", "Legacy", "Devise", "Grant"], 2,
    "A devise transfers real property by will to a devisee.");
  Q(3, "Which is an example of INVOLUNTARY alienation?",
    ["Selling by deed", "Giving property by will", "Gifting to a child", "Eminent domain"], 3,
    "Involuntary alienation includes eminent domain, foreclosure, adverse possession, escheat and tax sales.");
  Q(3, "Real estate plus the bundle of legal rights of ownership is called:",
    ["Real property", "Land", "Personal property", "Chattel"], 0,
    "Real property = real estate + the bundle of rights.");
  Q(3, "A NY judgment lien against real property generally lasts:",
    ["1 year", "10 years", "5 years", "Forever"], 1,
    "Generally 10 years, and it can be renewed.");
  Q(3, "What makes a title \"marketable\"?",
    ["It is insured", "It has been recorded twice", "It is reasonably free of doubts, liens and defects so a prudent buyer would accept it", "It has no mortgage"], 2,
    "Marketable title is free of reasonable doubt as to its validity.");
})((window.NYRE = window.NYRE || {}));
