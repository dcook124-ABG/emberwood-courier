/*
  The House Ledger. Current events live here and nowhere else.
  Add a new issue at the TOP of the list after each session.

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
    bell: "It rang four times this week.",
    claims: [
      { name: "Brannoc Vell", text: "dwarf, crushed at King's Gate. Paid to his sister in Drannsmund.", status: "Paid" },
      { name: "Sister Ilka of the Flame", text: "taken by bandits near the river. Ransomed and returned whole.", status: "Paid" },
      { name: "The Morrow twins", text: "last seen past College Gate. Search contract posted.", status: "Open" },
      { name: "“Lucky” Dace Hollin", text: "contaminated. Claims he is dead. The house disagrees.", status: "Disputed" }
    ],
    contracts: [
      { title: "The Morrow Twins", text: "Search and recovery, past College Gate. Bring them back or bring back proof." }
    ],
    posted_notices: [
      { where: "At the Watchtower", text: "Scouts to chart the streets past Shepherd's Gate. Fair wage, hot meal, and a Lantern at your back." },
      { where: "On the Chapel door", text: "Strong arms for a shard-burning detail. Bring your own courage. The Order provides the fire." },
      { where: "Left at the Chapel", text: "Word of Pieter Haas, tall, red-bearded, gone through the gate with a crew of six last autumn. Reward for news, more for remains." },
      { where: "On Champion's Way", text: "Guides for a pilgrim band bound for the Crater's Edge. The faithful pay in what they have." },
      { where: "At the Red Lion", text: "Delerium samples, intact and in lead. Notes on the Inscrutable Tower. Enquire discreetly." },
      { where: "Whispered at the Skull & Sword", text: "Couriers for small parcels. No questions asked, none answered. Paid on delivery." }
    ],
    rumors: [],
    risk: []
  }
];
