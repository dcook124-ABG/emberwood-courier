/*
  The House Ledger. Current events live here and nowhere else.
  Add a new issue at the TOP of the list after each session.
  Written by the Clerks of Harrow & Vane: deadpan, actuarial, politely ghoulish.

  claims:          status can be "Paid", "Open", or "Disputed"
  contracts:       jobs on offer from the firm
  posted_notices:  notices around the village. The first three appear on the Front Page
  rumors:          plain sentences
  risk:            district danger ratings, by name only, e.g. { district: "Old Town", rating: "Severe" }
*/
window.COURIER_LEDGER = [
  {
    issue: 1,
    posted: "4 March 1126",
    bell: "It rang four times this week. The Skull & Sword went quiet for every one.",
    claims: [
      { name: "Brannoc Vell", text: "dwarf, crushed at King's Gate. Paid in full to his sister in Drannsmund, with the firm's condolences.", status: "Paid" },
      { name: "Sister Ilka of the Flame", text: "taken by bandits near the river. Ransomed and returned whole. The bandits report she prayed for them the entire time and seemed glad to see her go.", status: "Paid" },
      { name: "The Morrow twins", text: "last seen past College Gate. Search contract posted. The firm has not yet decided whether this is one claim or two.", status: "Open" },
      { name: "“Lucky” Dace Hollin", text: "contaminated. Claims he is dead. The house disagrees. Mr. Hollin has been asked to stop coming to the Tithe House in person to argue the point.", status: "Disputed" }
    ],
    contracts: [
      { title: "The Morrow Twins", text: "Search and recovery, past College Gate. Bring them back, or bring back proof." }
    ],
    posted_notices: [
      { where: "Nailed to the Watchtower door", text: "SCOUTS WANTED to chart the streets past Shepherd's Gate. Fair wage, hot meal, and a Lantern at your back. Report sober." },
      { where: "On the Chapel door, in a fine hand", text: "Strong arms wanted for a shard-burning detail. Bring your own courage. The Order provides the fire. The Flame provides the rest." },
      { where: "Left at the Chapel, the paper worn soft from handling", text: "Word wanted of Pieter Haas: tall, red-bearded, went through the gate with a crew of six last autumn. Reward for news, more for remains. Please." },
      { where: "Chalked on a post on Champion's Way", text: "Guides wanted for a pilgrim band bound for the Crater's Edge. The faithful pay in what they have. Blessings are included at no charge." },
      { where: "Left at the Red Lion front desk, sealed in violet wax", text: "Delerium samples wanted, intact and in lead. Notes on the Inscrutable Tower also of interest. Enquire discreetly." },
      { where: "Whispered at the Skull & Sword", text: "Couriers wanted for small parcels. No questions asked, none answered. Paid on delivery. You never heard this here." }
    ],
    rumors: [],
    risk: []
  }
];
