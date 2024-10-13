if (sheetVersion < 13001012) {
  throw "This script was made for a newer version of the sheet (v13.1.14). Please use the latest version and try again.\nYou can get the latest version at www.flapkan.com.";
}
var iFileName = "Eldritch_Hunt_Feats_Backgrounds.js";
RequiredSheetVersion("13.1.12");

SourceList["EldritchHunt"] = {
  name: "Steinhardt's Guide to the Eldritch Hunt",
  abbreviation: "SGttEH",
  abbreviationSpellsheet: "SGttEH",
  group: "3rd Party Campaign Sourcebooks",
  date: "2024/07/01",
};

FeatsList["brutal attacker"] = {
  name: "Brutal Attacker",
  source: [["EldritchHunt", 172]],
  descriptionFull: desc([
    "You master a reckless approach that maximizes your offensive capabilities.",
    "• You can wield a two-handed weapon in one hand, as long as your other hand is empty or wielding a one handed weapon.",
    "• When you reduce a creature to 0 hit points, your next attack roll before the end of your next turn gains advantage.",
  ]),
  description: "",
  prereqeval: function (v) {
    return classes.known.jaeger.level >= 1 && What("Str") >= 18;
  },
};

FeatsList["cannoneer"] = {
  name: "Cannoneer",
  source: [["EldritchHunt", 172]],
  weaponProfs: [false, false, ["cannon"]],
  descriptionFull: desc([
    "You can reload cannons as a bonus action instead of an action. You can use this bonus action only if you haven’t moved during your turn, and after you use the bonus action, your speed is 0 until the end of your turn. Starting at 11th level, this doesn't hinder your movement, and you can use one of your attacks to reload instead. Starting at 20th level, you can ignore the artillery property of cannons.",
    "You know how to expertly handle cannons and their ammunition; the weight of cannons and cannonballs count as half for you.",
    "Your attacks with cannons deal double damage against objects and structures.",
  ]),
  description:
    "Your STR increase by 1 (max 20) and gain proficiency with cannons.",
  scores: [1, 0, 0, 0, 0, 0],
  prereqeval: function (v) {
    return v.characterLevel >= 8 && What("Str") >= 19;
  },
};

FeatsList["cosmos touched"] = {
  name: "Cosmos Touched",
  source: [["EldritchHunt", 173]],
  spellcastingBonus: {
    name: "Cosmos Touched",
    spells: ["alter self"],
    selection: ["alter self"],
    firstCol: "oncelr",
  },
  descriptionFull: desc([
    "You learn the alter self spell and one 1st-level abjuration or transmutation spell of your choice. You can cast each of these spells once without expending a spell slot. Once you cast either of these feat’s spells, you can't cast that spell in this way again until you finish a long rest. You can also cast these spells using spell slots you have of the appropriate level. Your spellcasting ability for these spells is the ability score increased by this feat.",
  ]),
  description:
    "Your Int, Wis or Cha increase by 1 (max 20) and you learn 'alter self' and one 1st level abjuration or transmutation",
  // scores : [0, 0, 0, 1, 1, 1],
  scorestxt: "+1 Intelligence or Wisdom or Charisma (max 20)",
  prereqeval: function (v) {
    return v.characterLevel >= 8 && What("Str") >= 19;
  },
};

FeatsList["focused hunter"] = {
  name: "Focused Hunter",
  source: [["EldritchHunt", 173]],
  descriptionFull: desc([
    "You gain 1 Focus Point (adding to your existing Focus Points if you already have Focus Points), and learn one new Focus Art, choosing from Weapon Parry, Dodge Step, or any of the jaeger’s Additional Focus Arts. You regain all expended Focus Points when you finish a short or long rest.",
  ]),
  description: "",
  // scores : [0, 0, 0, 1, 1, 1],
  scorestxt: "+1 Strength or Dexterity (max 20)",
};

FeatsList["marksman"] = {
  name: "Marksman",
  source: [["EldritchHunt", 173]],
  descriptionFull: desc([
    "• Weapons with the Barrel (S) property count as weapons with the Barrel (F) property for you.",
    "• You can ignore the Barrel property of weapons with the Barrel (F) property.",
    "• Being within 5 feet of a hostile creature doesn’t impose disadvantage on your ranged attack rolls.",
    "• You do not have disadvantage on ranged attacks against prone creatures within 30 feet of you.",
  ]),
  description:
    "• Increase your Strength or Dexterity score by 1, to a maximum of 20.",
  scores: [0, 1, 0, 0, 0, 0],
};

FeatsList["osteomantic adept"] = {
  name: "Osteomantic Adept",
  source: [["EldritchHunt", 173]],
  descriptionFull: desc([
    "When you cast an osteomancy* spell of 1st level or higher, you can sacrifice your life force to empower it, increasing the level this spell is cast at by one. You then roll a number of d6s equal to half the original spell’s level (rounded up, minimum of 1), taking necrotic damage equal to the number rolled, which cannot be reduced in any way.",
    "* Osteomancy Spells: Bone Claws, Bone Shield, Fractured Shell, Phalangeal Shot, Arm Cannon, Bone Cocoon, Calcified Memories, Rolling Bones, Rupturing Curse, Skeletal Tail, Displacing Maw, Osseous Cage, Osseous Impalement, Rubber Bones, Dread Scarecrow, Graveyard Shuffle, Maiden of Bones, Chisel Skull, Forest of Dread, Wall of Bones, Amputate, Boneyard, Aspect of Death, Osteophagia.",
  ]),
  description:
    "Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20",
  // scores : [0, 0, 0, 0, 0, 0],
  scorestxt: "+1 Intelligence or Wisdom or Charisma (max 20)",
};

FeatsList["optional: great weapon adept"] = {
  name: "Optional: Great Weapon Adept",
  source: [["EldritchHunt", 173]],
  descriptionFull: desc([
    "Once on each of your turns when you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can immediately make one melee weapon attack (no action required).",
    "Before you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage. You cannot do so if the attack is made with the opposite end of your weapon.",
  ]),
  description:
    "After killing an enemy with a crit hit, you can make another attack. Before making an attack with a great weapon, you can take a -5 to hit and +10 to damage (does not apply if using the end of a weapon)",
  prereqeval: function (v) {
    return v.characterLevel >= 4;
  },
};

FeatsList["optional: sharp-shooter"] = {
  name: "Optional: Sharp-shooter",
  source: [["EldritchHunt", 173]],
  descriptionFull: desc([
    "The normal and long range of ranged and thrown weapons is doubled for you.",
    "Your ranged weapon attacks ignore half cover, and three-quarters cover is considered half cover for you.",
    "Once on each of your turns when you make a ranged weapon attack, you can add your proficiency bonus to the damage roll.",
  ]),
  description:
    "Your range double, you ignore half-cover and 3/4 cover is now half cover. Once per turn, you can add your proficiency bonus to your attack roll.",
  prereqeval: function (v) {
    return v.characterLevel >= 4;
  },
};

//BACKGROUND

BackgroundList["amnesiac"] = {
  regExpSearch: /^(?=.*amnesiac).*$/i,
  name: "Amnesiac",
  source: [["EldritchHunt", 174]],
  skills: ["Insight", "Investigation"],
  toolProfs: [["Artisan's tools", 1]],
  gold: 10,
  // equipleft : [
  // 	["Disguise kit", "", 3],
  // 	["Tools for chosen con", "", ""]
  // ],
  equipright: [
    ["Common clothes", "", 1],
    ["A small keepsake from your forgotten past", "", 1],
    ["A set of artisan's tools with which you are proficient", "", 1],
    ["Belt pouch (with coins)", "", 1],
  ],
  feature: "Lingering Echoes",
  trait: [
    "I feel a deep sense of loss that I can't explain.",
    "I am fascinated by new experiences and sensations.",
    "I get frustrated when others know more about me than I do.",
    "I feel an inexplicable connection to certain places or things.",
    "I have an unquenchable thirst for knowledge, to fill the void left by my forgotten past.",
    "I have a wary nature due to the uncertainty of my identity.",
    "My dreams are full of cryptic symbols and images that I try to decipher.",
    "I have a heightened empathy for the suffering of others.",
  ],
  ideal: [
    [
      "Order",
      "Order. My life is in chaos. I will establish rules to make sense of the world around me. (Lawful)",
    ],
    [
      "Resilience",
      "Resilience. I will endure all challenges until I find the answers I seek. (Any)",
    ],
    [
      "Freedom",
      "Freedom. I have lost myself once; now I will seize 3 control of my fate and carve my own path, regardless of the rules. (Chaotic)",
    ],
    [
      "Isolation",
      "Isolation. The less I involve myself with others, the less harm my past can cause them. (Neutral).",
    ],
    [
      "Sanity",
      "Sanity. I must ensure that no one else loses themselves, be it to amnesia, madness or scourge.(Good)",
    ],
    [
      "Ruthlessness",
      "Ruthlessness. I will ensure that those responsible for my memory loss pay. (Evil)",
    ],
  ],
  bond: [
    "I am drawn to a particular landmark; I must see what’s inside it with my own eyes.",
    "An item I carry is the key to my past; I will protect it at all costs",
    "I dream of a person who seems important; I must find them.",
    "An unsettling symbol haunts my dreams; I must uncover its meaning.",
    "I feel a deep bond with a new acquaintance, a connection that transcends both our memories.",
    "The fear in the eyes of Luyarnha’s citizens resonates with me; I must alleviate it.",
  ],
  flaw: [
    "I have a fear of losing my newfound identity.",
    "I often hesitate, fearing my past actions might catch up with me.",
    "I distrust people, thinking they know more about me than they let on.",
    "I avoid forming attachments, afraid they will forget about me too.",
    "I obsess over small details, convinced they hold the key to my past.",
    "I am overly defensive, afraid that others will take advantage of my amnesia.",
  ],
  lifestyle: "poor",
};

BackgroundList["beast hunter"] = {
  regExpSearch: /^(?=.*beast)(?=.*hunter).*$/i,
  name: "Beast Hunter",
  source: [["EldritchHunt", 175]],
  // skills : ["Insight", "Investigation"],
  skillstxt:
    "Choose one between Acrobatic or Athletics; and one between Medicine or Survival",
  toolProfs: ["Herbalism kit"],
  gold: 10,
  // equipleft : [
  // 	["Disguise kit", "", 3],
  // 	["Tools for chosen con", "", ""]
  // ],
  equipright: [
    ["Common clothes", "", 1],
    ["A trophy from a beast you've slain", "", 1],
    [
      "A hunter’s kit (includes 20 lead bullets, a silvered dagger, a flare, and a silver flask)",
      "",
      1,
    ],
    ["A healer's kit", "", 1],
    ["Belt pouch (with coins)", "", 1],
  ],
  feature: "Born of the Hunt",
  trait: [
    "I keep my emotions under control, for I fear the day I lose control over them and my humanit",
    "I am stoic, rarely showing any signs of distress. The beasts smell fear.",
    "I have a crude sense of humor. Laughter keeps the fear at bay.",
    "I am haunted by the beasts I have slain.",
    "I am deeply spiritual. I believe the Church is our only hope for salvation.",
    "I value strength above all else. The weak will not survive.",
    "I am always alert. Danger can appear at any moment.",
    "I am fiercely protective of my fellow citizens.",
  ],
  ideal: [
    [
      "Protection",
      "Protection. It is my duty to protect the innocent from the Scourge. (Good)",
    ],
    [
      "Anger",
      "Anger. The beasts must pay for the lives they've taken. (Chaotic)",
    ],
    [
      "Faith",
      "Faith. I trust in the Church. Their wisdom guides 3 my blade. (Lawful)",
    ],
    [
      "Survival",
      "Survival. The most important thing is to survive another night. (Neutral)",
    ],
    [
      "Cunning",
      "Cunning. Understanding my prey is key to trapping, torturing and otherwise defeating them. (Evil)",
    ],
    [
      "Courage",
      "Courage. I must stand tall in the face of fear. Only then can I inspire others to do the same. (Good)",
    ],
  ],
  bond: [
    "The Church trained me and I owe them my life",
    "I hunt to avenge my loved ones taken by the Scourge.",
    "I fight to protect the people of my neighborhood.",
    "I am hunting a specific beast that took a part of me.",
    "My weapon is a symbol of my duty and a keepsake from a mentor.",
    "The war veterans taught me everything I know about fighting. I owe them a great debt.",
  ],
  flaw: [
    "I have a reckless streak that often gets me into trouble.",
    "I struggle with the brutal nature of the hunt, and fear it's changing me.",
    "I am overly suspicious of everyone and everything.",
    "I carry a deep guilt for those I couldn't save.",
    "I am obsessively hunting a particular beast, disregarding all else.",
    "I harbor a deep-seated fear of losing my humanity in my bestial fury.",
  ],
  lifestyle: "modest",
};

BackgroundList["cult initiate"] = {
  regExpSearch: /^(?=.*cult)(?=.*initiate).*$/i,
  name: "Cult Initiate",
  source: [["EldritchHunt", 176]],
  // skills : ["Insight", "Investigation"],
  skillstxt:
    "Choose one between Arcana or Religion; and one between Persuasion or Survival",
  toolProfs: [["Artisan's tools or Musical instrument", 1]],
  gold: 5,
  languageProfs: [["Deep Speech or Infernal or Sylvan", 1]],
  // equipleft : [
  // 	["Disguise kit", "", 3],
  // 	["Tools for chosen con", "", ""]
  // ],
  equipright: [
    ["Common clothes", "", 1],
    ["A brimmed cloak", "", 1],
    ["A trinket or symbol representing your cult", "", 1],
    ["A piece of jewelry worth 10 gp", "", 1],
    ["A hooded lantern", "", 1],
    ["Flasks of oil", "", 5],
  ],
  feature: "Cult Secrets",
  trait: [
    "I always keep my thoughts and emotions hidden, a habit from my cult days.",
    "I am curious about other belief systems and constantly compare them to my own.",
    "I feel most comfortable following rituals and routines.",
    "I am always questioning everything and seeking deeper meanings.",
    "I feel lost and disconnected after leaving my cult.",
    "I can be charismatic and persuasive when I need to be.",
    "I distrust authority figures and institutions.",
    "I have a habit of slipping into old cult phrases or mannerisms.",
  ],
  ideal: [
    [
      "Freedom",
      "Freedom: I have left the cult and cherish my newfound liberty. I'll never let anyone control my life again. (Any)",
    ],
    [
      "Unity",
      "Unity: As a current cult member, I believe that our unified purpose is more significant than individual desires. (Lawful)",
    ],
    [
      "Knowledge",
      "Knowledge: The cult's teachings are hidden truths that the world deserves to know. (Any)",
    ],
    [
      "Purity",
      "Purity: As a former cultist, I realize the cult's teachings were wrong. I seek to cleanse myself and the world of its influence. (Good)",
    ],
    [
      "Domination",
      "Domination: I believe the cult's teachings should be enforced, creating a new world order. (Evil)",
    ],
    [
      "Redemption",
      "Redemption: I have done terrible things in the name of the cult. I must atone for my sins. (Good)",
    ],
  ],
  bond: [
    "I left someone I care about behind in the cult and am determined to rescue them.",
    "I am still part of the cult, and I will protect my brothers and sisters at all costs.",
    "Someone I loved was sacrificed for the cult's cause. Their memory haunts me",
    "I harbor a dangerous secret about the cult that others would kill to uncover",
    "The leader of the cult still holds a dark sway over me, and I struggle against their influence",
    "I am seeking revenge against those who forced me out of the cult.",
  ],
  flaw: [
    "I am paranoid and distrustful, always expecting a cultist to appear and enact revenge.",
    "I secretly miss the structure and unity of the cult and sometimes consider returning.",
    "I am easily swayed by charismatic leaders.",
    "The cult's influence has left me with warped moral views that others find shocking or abhorrent.",
    "I will go to any length to destroy the cult, even if it harms innocent bystanders.",
    "I struggle with guilt over the actions I took as part of the cult.",
  ],
  lifestyle: "modest",
};

BackgroundList["disciple divine guidance"] = {
  regExpSearch: /^(?=.*disciple)(?=.*divine)(?=.*guidance).*$/i,
  name: "Disciple, Divine Guidance",
  source: [["EldritchHunt", 178]],
  skills: ["Religion", "Persuasion"],
  // skillstxt:
  //   "Choose one between Arcana or Religion; and one between Persuasion or Survival",
  toolProfs: [["Calligrapher's supplies"]],
  gold: 15,
  languageProfs: [["Elvish or Orcish", 1]],
  // equipleft : [
  // 	["Disguise kit", "", 3],
  // 	["Tools for chosen con", "", ""]
  // ],
  equipright: [
    ["A holy symbol of the Radiant One", "", 1],
    ["A prayer book", "", 1],
    ["Stick of Incense", "", 5],
    ["Vestments", "", 1],
    ["A set of common clothes", "", 1],
  ],
  feature: "Divine Guidance",
  trait: [
    "I am deeply philosophical and enjoy pondering the mysteries of the universe.",
    "I'm optimistic and always looking for a silver lining.",
    "I strive to be a beacon of hope and strength for others.",
    "I am assertive and never back down from what I believe in.",
    "I often recount stories and parables from the Radiant Church.",
    "I always try to offer guidance to those who seem lost.",
    "I have a peaceful demeanor and a comforting presence.",
    "I am strict and expect others to abide by the teachings of the Church.",
  ],
  ideal: [
    [
      "Strength",
      "Strength: I must be strong so that I can guide others through adversity. (Lawful)",
    ],
    [
      "Hope",
      "Hope: I am a beacon of light in the darkness, showing the way to a brighter future. (Good)",
    ],
    [
      "Faith",
      "Faith: My faith in the Radiant One gives me strength and purpose. (Any)",
    ],
    [
      "Knowledge",
      "Knowledge: The true path to enlightenment is the pursuit of knowledge. (Neutral)",
    ],
    [
      "Charity",
      "Charity: It's my duty to help those in need, and to provide for the less fortunate. (Good)",
    ],
    [
      "Independence",
      "Independence: I must question and challenge my faith to truly understand it. (Chaotic)",
    ],
  ],
  bond: [
    "I owe my life to the Church, and I will serve it until my last breath.",
    "I believe that the Radiant One has a grand destiny in store for me.",
    "I will bring the teachings of the Radiant Church to those who live in darkness.",
    "I aim to preserve the unity of the Church amidst its division into factions.",
    "I feel responsible for those who stray from the path of the Radiant One.",
    "I will redeem the Church from its insidious corruption and restore its noble ideals.",
  ],
  flaw: [
    "I am dogmatic and find it hard to accept beliefs that contradict the teachings of the Church.",
    "I am naive and often overoptimistic, which sometimes leads me to underestimate dangers.",
    "I am plagued by an overwhelming fear of divine judgment, constantly doubting whether my actions are in accordance with the teachings of my faith.",
    "I struggle with doubt and question my faith, particularly when facing the unfairness of life.",
    "I have high expectations for myself and others, which often leads to disappointment.",
    "I find it hard to forgive myself for past mistakes and often dwell on them.",
  ],
  lifestyle: "modest",
};

BackgroundList["disciple forceful miracle"] = {
  regExpSearch: /^(?=.*disciple)(?=.*forceful)(?=.*miracle).*$/i,
  name: "Disciple, Forceful Miracle",
  source: [["EldritchHunt", 178]],
  skills: ["Religion", "Persuasion"],
  // skillstxt:
  //   "Choose one between Arcana or Religion; and one between Persuasion or Survival",
  toolProfs: [["Calligrapher's supplies"]],
  gold: 15,
  languageProfs: [["Elvish or Orcish", 1]],
  // equipleft : [
  // 	["Disguise kit", "", 3],
  // 	["Tools for chosen con", "", ""]
  // ],
  equipright: [
    ["A holy symbol of the Radiant One", "", 1],
    ["A prayer book", "", 1],
    ["Stick of Incense", "", 5],
    ["Vestments", "", 1],
    ["A set of common clothes", "", 1],
  ],
  feature: "Divine Guidance",
  trait: [
    "I am deeply philosophical and enjoy pondering the mysteries of the universe.",
    "I'm optimistic and always looking for a silver lining.",
    "I strive to be a beacon of hope and strength for others.",
    "I am assertive and never back down from what I believe in.",
    "I often recount stories and parables from the Radiant Church.",
    "I always try to offer guidance to those who seem lost.",
    "I have a peaceful demeanor and a comforting presence.",
    "I am strict and expect others to abide by the teachings of the Church.",
  ],
  ideal: [
    [
      "Strength",
      "Strength: I must be strong so that I can guide others through adversity. (Lawful)",
    ],
    [
      "Hope",
      "Hope: I am a beacon of light in the darkness, showing the way to a brighter future. (Good)",
    ],
    [
      "Faith",
      "Faith: My faith in the Radiant One gives me strength and purpose. (Any)",
    ],
    [
      "Knowledge",
      "Knowledge: The true path to enlightenment is the pursuit of knowledge. (Neutral)",
    ],
    [
      "Charity",
      "Charity: It's my duty to help those in need, and to provide for the less fortunate. (Good)",
    ],
    [
      "Independence",
      "Independence: I must question and challenge my faith to truly understand it. (Chaotic)",
    ],
  ],
  bond: [
    "I owe my life to the Church, and I will serve it until my last breath.",
    "I believe that the Radiant One has a grand destiny in store for me.",
    "I will bring the teachings of the Radiant Church to those who live in darkness.",
    "I aim to preserve the unity of the Church amidst its division into factions.",
    "I feel responsible for those who stray from the path of the Radiant One.",
    "I will redeem the Church from its insidious corruption and restore its noble ideals.",
  ],
  flaw: [
    "I am dogmatic and find it hard to accept beliefs that contradict the teachings of the Church.",
    "I am naive and often overoptimistic, which sometimes leads me to underestimate dangers.",
    "I am plagued by an overwhelming fear of divine judgment, constantly doubting whether my actions are in accordance with the teachings of my faith.",
    "I struggle with doubt and question my faith, particularly when facing the unfairness of life.",
    "I have high expectations for myself and others, which often leads to disappointment.",
    "I find it hard to forgive myself for past mistakes and often dwell on them.",
  ],
  lifestyle: "modest",
};

BackgroundList["disciple scribe of radiance"] = {
  regExpSearch: /^(?=.*disciple)(?=.*scribe)(?=.*radiance).*$/i,
  name: "Disciple, Scribe of Radiance",
  source: [["EldritchHunt", 178]],
  skills: ["Religion", "Persuasion"],
  // skillstxt:
  //   "Choose one between Arcana or Religion; and one between Persuasion or Survival",
  toolProfs: [["Calligrapher's supplies"]],
  gold: 15,
  languageProfs: [["Elvish or Orcish", 1]],
  // equipleft : [
  // 	["Disguise kit", "", 3],
  // 	["Tools for chosen con", "", ""]
  // ],
  equipright: [
    ["A holy symbol of the Radiant One", "", 1],
    ["A prayer book", "", 1],
    ["Stick of Incense", "", 5],
    ["Vestments", "", 1],
    ["A set of common clothes", "", 1],
  ],
  feature: "Divine Guidance",
  trait: [
    "I am deeply philosophical and enjoy pondering the mysteries of the universe.",
    "I'm optimistic and always looking for a silver lining.",
    "I strive to be a beacon of hope and strength for others.",
    "I am assertive and never back down from what I believe in.",
    "I often recount stories and parables from the Radiant Church.",
    "I always try to offer guidance to those who seem lost.",
    "I have a peaceful demeanor and a comforting presence.",
    "I am strict and expect others to abide by the teachings of the Church.",
  ],
  ideal: [
    [
      "Strength",
      "Strength: I must be strong so that I can guide others through adversity. (Lawful)",
    ],
    [
      "Hope",
      "Hope: I am a beacon of light in the darkness, showing the way to a brighter future. (Good)",
    ],
    [
      "Faith",
      "Faith: My faith in the Radiant One gives me strength and purpose. (Any)",
    ],
    [
      "Knowledge",
      "Knowledge: The true path to enlightenment is the pursuit of knowledge. (Neutral)",
    ],
    [
      "Charity",
      "Charity: It's my duty to help those in need, and to provide for the less fortunate. (Good)",
    ],
    [
      "Independence",
      "Independence: I must question and challenge my faith to truly understand it. (Chaotic)",
    ],
  ],
  bond: [
    "I owe my life to the Church, and I will serve it until my last breath.",
    "I believe that the Radiant One has a grand destiny in store for me.",
    "I will bring the teachings of the Radiant Church to those who live in darkness.",
    "I aim to preserve the unity of the Church amidst its division into factions.",
    "I feel responsible for those who stray from the path of the Radiant One.",
    "I will redeem the Church from its insidious corruption and restore its noble ideals.",
  ],
  flaw: [
    "I am dogmatic and find it hard to accept beliefs that contradict the teachings of the Church.",
    "I am naive and often overoptimistic, which sometimes leads me to underestimate dangers.",
    "I am plagued by an overwhelming fear of divine judgment, constantly doubting whether my actions are in accordance with the teachings of my faith.",
    "I struggle with doubt and question my faith, particularly when facing the unfairness of life.",
    "I have high expectations for myself and others, which often leads to disappointment.",
    "I find it hard to forgive myself for past mistakes and often dwell on them.",
  ],
  lifestyle: "modest",
};

AddBackgroundVariant("disciple", "forceful miracle", {
  regExpSearch: /^(?=.*disciple)(?=.*forceful)(?=.*miracle).*$/i,
  name: "Forceful Miracle Disciple",
  source: [["EldritchHunt", 178]],
  skills: ["Religion", "Persuasion"],
  gold: 15,
  equipright: [
    ["A holy symbol of the Radiant One", "", 1],
    ["A prayer book", "", 1],
    ["Stick of Incense", "", 5],
    ["Vestments", "", 1],
    ["A set of common clothes", "", 1],
  ],
  feature: "Forceful Miracle",
  languageProfs: [["Elvish or Orcish", 1]],
  lifestyle: "modest",
});

AddBackgroundVariant("disciple", "scribe of radiance", {
  regExpSearch: /^(?=.*disciple)(?=.*scribe)(?=.*radiance).*$/i,
  name: "Scribe of Radiance Disciple",
  source: [["EldritchHunt", 178]],
  skills: ["Religion", "Persuasion"],
  gold: 15,
  equipright: [
    ["A holy symbol of the Radiant One", "", 1],
    ["A prayer book", "", 1],
    ["Stick of Incense", "", 5],
    ["Vestments", "", 1],
    ["A set of common clothes", "", 1],
  ],
  feature: "Scribe of Radiance",
  languageProfs: [["Elvish or Orcish", 1]],
  lifestyle: "modest",
});

BackgroundList["inquisitor"] = {
  regExpSearch: /^(?=.*inquisitor).*$/i,
  name: "Inquisitor",
  source: [["EldritchHunt", 179]],
  skills: ["Religion", "Intimidation"],
  toolProfs: [["Torture tools"]],
  // skillstxt:
  // 	"Choose one between Arcana or Religion; and one between Persuasion or Survival",
  // toolProfs : [["Artisan's tools or Musical instrument", 1]],
  gold: 10,
  languageProfs: ["Common", ["Deep Speech or Primordial", 1]],
  // equipleft : [
  // 	["Disguise kit", "", 3],
  // 	["Tools for chosen con", "", ""]
  // ],
  equipright: [
    ["Common clothes", "", 1],
    ["A holy symbol of the Radiant Church", "", 1],
    ["A set of manacles", "", 1],
    ["Torture tools", "", 1],
    ["A tome containing the teachings of the Radiant Church", "", 1],
  ],
  feature: "Zealous Authority",
  trait: [
    "I am fervently dedicated to my faith and the teachings of the Radiant Church.",
    "I am often suspicious of others, especially those who do not share my beliefs.",
    "I am stern and serious, with little time for humor or frivolity.",
    "I am not easily swayed by emotional appeals, preferring to deal in facts and evidence.",
    "I am meticulous and thorough in my investigations, leaving no stone unturned.",
    "I believe that the ends justify the means when it comes to preserving the Church and its teachings.",
    "I tend to view things in black and white, with little room for moral ambiguity.",
    "Despite my stern exterior, I am deeply compassionate and driven by a desire to protect the innocent.",
  ],
  ideal: [
    [
      "Faith",
      "Faith: My faith in the Radiant Church is unwavering, and I will do whatever it takes to protect it. (Any)",
    ],
    [
      "Order",
      "Order: The laws and teachings of the Church must be upheld at all times. (Lawful)",
    ],
    ["Purity", "Purity: Corruption and heresy will be purged (Lawful)"],
    [
      "Justice",
      "Justice: Those who harm or deceive the Church must be brought to justice. (Lawful",
    ],
    [
      "Power",
      "Power: The Church's authority must be respected and feared. I will ensure it. (Evil)",
    ],
    [
      "Sacrifice",
      "Sacrifice: I am willing to sacrifice anything, even my life, for the Church. (Good)",
    ],
  ],
  bond: [
    "I am loyal to a mentor or superior within the Church who has guided me on my path.",
    "I once failed to stop a heretic, and that failure haunts me.",
    "I have a family member or loved one who doesn't understand my dedication to the Church.",
    "I am seeking to bring a particular heretic or enemy of the Church to justice.",
    "The Church is my family, and I will protect it at all costs.",
    "I seek to convert or save those who have strayed from the path.",
  ],
  flaw: [
    "My zealous devotion to the Church can make me blind to its flaws.",
    "I am unforgiving and tend to hold grudges, especially against perceived heretics.",
    "I can be overly suspicious, seeing threats to the Church where there are none.",
    "I am rigid and inflexible, struggling to adapt when things don't go according to plan.",
    "My stern demeanor often drives people away.",
    "I sometimes resort to extreme measures in the name of preserving the Church, which can lead to unnecessary conflict.",
  ],
  lifestyle: "modest",
};

BackgroundList["investigator"] = {
  regExpSearch: /^(?=.*investigator).*$/i,
  name: "Investigator",
  source: [["EldritchHunt", 181]],
  skills: ["Investigation", "Insight"],
  toolProfs: [["One tool related to your investigation method", 1]],
  // skillstxt:
  // 	"Choose one between Arcana or Religion; and one between Persuasion or Survival",
  // toolProfs : [["Artisan's tools or Musical instrument", 1]],
  gold: 10,
  languageProfs: [1],
  // equipleft : [
  // 	["Disguise kit", "", 3],
  // 	["Tools for chosen con", "", ""]
  // ],
  equipright: [
    ["Common clothes", "", 1],
    ["A notebook and charcoal pencil", "", 1],
    ["a set of artisan's tools you are proficient with", "", 1],
    ["a mysterious artifact or document related to your investigation", "", 1],
  ],
  feature: "Inquisitive Mind",
  trait: [
    "I am relentlessly curious and always eager to learn something new.",
    "My determination to uncover the truth sometimes leads me to take unnecessary risks.",
    "I believe that every mystery can be solved with enough time and thought.",
    "I tend to keep my theories to myself until I have solid evidence.",
    "I often get lost in my own thoughts and become oblivious to my surroundings.",
    "I am haunted by a terror afflicting Luyarnha (e.g., Scourge, cults, etc..) and its effects on people, and I won't rest until I've uncovered its origins.",
    "I often come off as distant or cold, but I'm deeply compassionate towards those affected by the mysteries I investigate.",
    "I have a cynical sense of humor, often making light of grim situations to keep my spirits up.",
  ],
  ideal: [
    [
      "Truth",
      "Truth: I will uncover the truth, no matter how grim or inconvenient it may be. (Neutral)",
    ],
    [
      "Justice",
      "Justice: Those responsible for the city's plight must be brought to justice. (Lawful)",
    ],
    [
      "Hope",
      "Hope: The truth could lead to salvation. We can't give up hope. (Good)",
    ],
    [
      "Knowledge",
      "Knowledge: Knowledge is power, and I must know it all. (Any)",
    ],
    [
      "Whistleblower",
      "Whistleblower: Everyone has the right to know the truth about what's happening in the city. (Chaotic)",
    ],
    [
      "Survival",
      "Survival: The mysteries I investigate are a threat to all life. Stopping them is all that matters. (Any)",
    ],
  ],
  bond: [
    "I lost someone important to me to the Scourge. I'll do anything to prevent others from experiencing the same pain.",
    "I was once saved by a hunter, and I owe them a debt I can never repay.",
    "I have an old friend or mentor who has lost their way. I want to save them.",
    "I've been bribed to look the other way before, my greed cost many their lives, never again.",
    "I have a rival investigator who is always one step ahead of me. One day, I will outshine them.",
    "I believe some people know more about the Scourge than they're letting on. I must uncover their secrets.",
  ],
  flaw: [
    "I am so obsessed with my investigations that I often neglect my own well-being.",
    "I trust my theories more than the testimony of others, which can lead to conflict.",
    "I have a hard time letting go of unsolved mysteries, even when it's necessary for my safety.",
    "I enjoy riches, and am not above investigating wealthy individuals to blackmail them later.",
    "I tend to see mysteries everywhere, even where they don't exist.",
    "I have a dark secret related to my investigation that I fear others may discover.",
  ],
  lifestyle: "modest",
};

BackgroundList["marked for death"] = {
  regExpSearch: /^(?=.*marked)(?=.*for)(?=.*death).*$/i,
  name: "Marked For Death",
  source: [["EldritchHunt", 182]],
  skills: ["Arcana", "Survival"],
  // skillstxt:
  // 	"Choose one between Arcana or Religion; and one between Persuasion or Survival",
  // toolProfs : [["Artisan's tools or Musical instrument", 1]],
  gold: 10,
  languageProfs: ["Deep Speech"],
  // equipleft : [
  // 	["Disguise kit", "", 3],
  // 	["Tools for chosen con", "", ""]
  // ],
  equipright: [
    ["Common clothes", "", 1],
    ["A flare", "", 1],
    ["A small knife for carving runes", "", 1],
    ["A journal detailing your experiences since rebirth", "", 1],
    ["Eldritch Carving: Sacrificial Brand (scarified)", "", 1],
  ],
  feature: "6th Sense",
  trait: [
    "I am extremely cautious, having learned the fragility of life firsthand.",
    "I am fascinated by the mysteries of life, death, and the forces that bind them.",
    "I feel a deep connection to the moon, often seeking solace in its light.",
    "I am driven to uncover the purpose behind my resurrection.",
    "I am haunted by the memories of my past life and the circumstances of my death.",
    "I am fiercely protective of those I care about, as I know the pain of loss.",
    "I believe that my resurrection has given me a second chance to make a difference in the world.",
    "I have become detached from the everyday concerns of the living.",
  ],
  ideal: [
    [
      "",
      "Balance. Life and death are part of a delicate cosmic balance that must be maintained. (Neutral)",
    ],
    [
      "",
      "Knowledge. Understanding the mysteries of the cosmos is the key to mastering life and death. (Any)",
    ],
    [
      "",
      "Protection. I will do everything in my power to protect the living from the horrors beyond the veil. (Good)",
    ],
    [
      "",
      "Vengeance. I seek the power to destroy the eldritch forces that toy with life. (Lawful",
    ],
    [
      "",
      "Power. I have been given a rare opportunity, and I will use it to seize control. (Evil)",
    ],
    [
      "",
      "Freedom. This new life is a chance to break free from the constraints of my past. (Chaotic)",
    ],
  ],
  bond: [
    "I feel a strong connection to others who bear the Sacrificial Brand.",
    "I owe my resurrection to the Blood Moon, and I am determined to uncover its secrets.",
    "I left behind loved ones in my past life, and I will do anything to protect them from harm.",
    "I am haunted by a vision or prophecy that I received during my resurrection.",
    "I am hunted by Death and must escape its clutches.",
    "I am determined to prevent others from experiencing the pain and confusion that I have endured.",
  ],
  flaw: [
    "I am paranoid, fearing that my resurrection has attracted the attention of sinister forces.",
    "I struggle with feelings of guilt and shame from my past life, making it difficult for me to trust myself and others.",
    "I am obsessed with uncovering the secrets of my resurrection, sometimes to the detriment of my relationships and goals.",
    "I have difficulty forming new relationships, as I am still mourning the loss of my previous life and connections.",
    "I am prone to bouts of rage and anger, fueled by the knowledge of my impending doom.",
    "I am reckless in the face of danger, believing that I have already cheated death once and can do so again.",
  ],
  lifestyle: "poor",
};

BackgroundList["scion"] = {
  regExpSearch: /^(?=.*scion).*$/i,
  name: "Scion",
  source: [["EldritchHunt", 181]],
  skills: ["Investigation", "Arcana"],
  toolProfs: [
    "Tinker's tools",
    ["one type of artisan's tools of your choice", 1],
  ],
  // skillstxt:
  // 	"Choose one between Arcana or Religion; and one between Persuasion or Survival",
  // toolProfs : [["Artisan's tools or Musical instrument", 1]],
  gold: 15,
  languageProfs: [1],
  // equipleft : [
  // 	["Disguise kit", "", 3],
  // 	["Tools for chosen con", "", ""]
  // ],
  equipright: [
    ["Tinker's tools", "", 1],
    ["Artisan's tools", "", 1],
    ["A notebook full of your scientific sketches and notes", "", 1],
    ["A bottle of black ink & a quill", "", 1],
    ["A small experimental creation of your design", "", 1],
  ],
  feature: "Scion’s Creation",
  trait: [
    "I am deeply curious, always seeking to understand the world around me.",
    "I am meticulous and organized in all my work.",
    "I often get lost in thought, contemplating my latest theories and inventions.",
    "I'm fascinated by life and what makes something alive.",
    "I have a morbid sense of humor, often making light of death and the macabre.",
    "I am obsessive over my creations, seeing them as my children.",
    "I am arrogant, considering myself superior due to my intellect and capabilities.",
    "I believe that through science and invention, all of Luyarnha’s problems can be solved.",
  ],
  ideal: [
    [
      "Knowledge",
      "Knowledge: The pursuit of understanding is the highest aim. (Neutral)",
    ],
    [
      "Creation",
      "Creation: I strive to create life and new inventions to improve the world. (Good)",
    ],
    ["Power", "Power: I want to master the forces of life and death. (Evil)"],
    [
      "Progress",
      "Progress: We must push the boundaries of science and magic, no matter the cost. (Chaotic)",
    ],
    [
      "Discovery",
      "Discovery: The world is full of wonders waiting to be discovered and understood. (Any)",
    ],
    [
      "Duty",
      "Duty: With great power comes great responsibility. I must use my abilities wisely. (Lawful)",
    ],
  ],
  bond: [
    "I am devoted to the Scions, and will do whatever I can to protect and further our work.",
    "One of my creations has developed a will of its own. I must understand why and what this means.",
    "I have a rival Scion whose success drives me to be better.",
    "A mistake in my past cost a lot of people their lives. I must make amends.",
    "One of the city's higher-ups has taken a special interest in my work. I must not disappoint them.",
    "My greatest invention is still incomplete. I must gather the necessary resources and knowledge to finish it.",
  ],
  flaw: [
    "I am so consumed by my work that I often neglect my own health and relationships.",
    "I am reckless in my pursuit of knowledge, often putting myself and others in danger.",
    "I will do anything to protect my creations, even if it means harming others.",
    "I believe that I am above the laws and ethics that bind lesser individuals.",
    "I am haunted by the lifeless eyes of the beings I've created.",
    "I am desperate for recognition and fear obscurity more than death.",
  ],
  lifestyle: "modest",
};

BackgroundList["worthless husk dweller"] = {
  regExpSearch: /^(?=.*worthless)(?=.*husk).*$/i,
  name: "Worthless Husk (Bottom Dweller)",
  source: [["EldritchHunt", 184]],
  skills: ["Stealth", "Survival"],
  // skillstxt:
  // 	"Choose one between Arcana or Religion; and one between Persuasion or Survival",
  // toolProfs : [["Artisan's tools or Musical instrument", 1]],
  gold: 1,
  // languageProfs: [1],
  // equipleft : [
  // 	["Disguise kit", "", 3],
  // 	["Tools for chosen con", "", ""]
  // ],
  equipright: [
    ["Common clothes", "", 1],
    ["A small rusted knife", "", 1],
    ["A key to an important location", "", 1],
  ],
  feature: "Bottom Dweller",
  trait: [
    "I am quiet and withdrawn, preferring to remain in the background and observe.",
    "I am fiercely determined to prove my worth and show that I am more than just a waste of skin.",
    "I am quick to mistrust, always suspecting others' motives due to my past experiences.",
    "I've developed a sharp sense of humor as a coping mechanism.",
    "I have a tendency to hoard items, never knowing when I might need them.",
    "I am always scheming, to be ready for whatever life throws at me.",
    "I often underestimate my worth and potential, always expecting to fail.",
    "I've grown to appreciate the little joys in life, as they are far and few between.",
  ],
  ideal: [
    [
      "Perseverance",
      "Perseverance: No matter how many times I'm knocked down, I will keep getting back up. (Any)",
    ],
    [
      "Growth",
      "Growth: I seek to find my hidden potential and make a difference in this harsh world. (Good)",
    ],
    [
      "Independence",
      "Independence: I will rely on no one but myself. I am all I need. (Chaotic)",
    ],
    [
      "Vengeance",
      "Vengeance: I will show those who discarded me the error of their ways. (Evil)",
    ],
    [
      "Acceptance",
      "Acceptance: I strive to find a place where I am accepted as I am. (Neutral)",
    ],
    [
      "Redemption",
      "Redemption: I seek to prove that everyone, even someone like me, can change for the better. (Lawful)",
    ],
  ],
  bond: [
    "I will protect the few friends I have made in this dark city, as they have shown me kindness when others would not.",
    "I am searching for a person who can help me unlock my true potential and find my place in this world.",
    "I am determined to create a better life for the other discarded souls in the city.",
    "I harbor a desire to confront those who cast me aside and show them how far I've come.",
    "Precious memories, the only thing I have from my past, drives me to keep going.",
    "I've made a secret promise to myself that I’d rather die than stay worthless",
  ],
  flaw: [
    "I possess a crippling fear of abandonment, leading me to cling to unhealthy relationships even when they are detrimental to my well-being.",
    "My self-destructive tendencies manifest in addictive behaviors, using substances or vices as a means to escape from my own perceived worthlessness.",
    "I have a hard time letting go of any perceived slights or insults, often holding grudges.",
    "My survival instincts can make me selfish, often choosing my wellbeing over others.",
    "I tend to push people away, afraid that they will eventually discard me like the rest.",
    "I am often reckless, after all, I have nothing to lose.",
  ],
  lifestyle: "squalid",
};

BackgroundList["worthless husk worthless"] = {
  regExpSearch: /^(?=.*worthless)(?=.*husk).*$/i,
  name: "Worthless Husk (Worthless)",
  source: [["EldritchHunt", 184]],
  skills: ["Stealth", "Survival"],
  // skillstxt:
  // 	"Choose one between Arcana or Religion; and one between Persuasion or Survival",
  // toolProfs : [["Artisan's tools or Musical instrument", 1]],
  gold: 1,
  // languageProfs: [1],
  // equipleft : [
  // 	["Disguise kit", "", 3],
  // 	["Tools for chosen con", "", ""]
  // ],
  equipright: [
    ["Common clothes", "", 1],
    ["A small rusted knife", "", 1],
    ["A key to an important location", "", 1],
  ],
  feature: "Worthless",
  trait: [
    "I am quiet and withdrawn, preferring to remain in the background and observe.",
    "I am fiercely determined to prove my worth and show that I am more than just a waste of skin.",
    "I am quick to mistrust, always suspecting others' motives due to my past experiences.",
    "I've developed a sharp sense of humor as a coping mechanism.",
    "I have a tendency to hoard items, never knowing when I might need them.",
    "I am always scheming, to be ready for whatever life throws at me.",
    "I often underestimate my worth and potential, always expecting to fail.",
    "I've grown to appreciate the little joys in life, as they are far and few between.",
  ],
  ideal: [
    [
      "Perseverance",
      "Perseverance: No matter how many times I'm knocked down, I will keep getting back up. (Any)",
    ],
    [
      "Growth",
      "Growth: I seek to find my hidden potential and make a difference in this harsh world. (Good)",
    ],
    [
      "Independence",
      "Independence: I will rely on no one but myself. I am all I need. (Chaotic)",
    ],
    [
      "Vengeance",
      "Vengeance: I will show those who discarded me the error of their ways. (Evil)",
    ],
    [
      "Acceptance",
      "Acceptance: I strive to find a place where I am accepted as I am. (Neutral)",
    ],
    [
      "Redemption",
      "Redemption: I seek to prove that everyone, even someone like me, can change for the better. (Lawful)",
    ],
  ],
  bond: [
    "I will protect the few friends I have made in this dark city, as they have shown me kindness when others would not.",
    "I am searching for a person who can help me unlock my true potential and find my place in this world.",
    "I am determined to create a better life for the other discarded souls in the city.",
    "I harbor a desire to confront those who cast me aside and show them how far I've come.",
    "Precious memories, the only thing I have from my past, drives me to keep going.",
    "I've made a secret promise to myself that I’d rather die than stay worthless",
  ],
  flaw: [
    "I possess a crippling fear of abandonment, leading me to cling to unhealthy relationships even when they are detrimental to my well-being.",
    "My self-destructive tendencies manifest in addictive behaviors, using substances or vices as a means to escape from my own perceived worthlessness.",
    "I have a hard time letting go of any perceived slights or insults, often holding grudges.",
    "My survival instincts can make me selfish, often choosing my wellbeing over others.",
    "I tend to push people away, afraid that they will eventually discard me like the rest.",
    "I am often reckless, after all, I have nothing to lose.",
  ],
  lifestyle: "squalid",
};

// BackgroundList["marked for death"] = {
//   regExpSearch: /^(?=.*marked)(?=.*for)(?=.*death).*$/i,
//   name: "Marked For Death",
//   source: [["EldritchHunt", 182]],
//   skills: ["Arcana", "Survival"],
//   // skillstxt:
//   // 	"Choose one between Arcana or Religion; and one between Persuasion or Survival",
//   // toolProfs : [["Artisan's tools or Musical instrument", 1]],
//   gold: 10,
//   languageProfs: [["Deep Speech"]],
//   // equipleft : [
//   // 	["Disguise kit", "", 3],
//   // 	["Tools for chosen con", "", ""]
//   // ],
//   equipright: [
//     ["Common clothes", "", 1],
//     ["A flare", "", 1],
//     ["A small knife for carving runes", "", 1],
//     ["A journal detailing your experiences since rebirth", "", 1],
//     ["Eldritch Carving: Sacrificial Brand (scarified)", "", 1],
//   ],
//   feature: "6th Sense",
//   trait: ["", "", "", "", "", "", "", ""],
//   ideal: [
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//     ["", ""],
//   ],
//   bond: ["", "", "", "", "", ""],
//   flaw: ["", "", "", "", "", ""],
//   lifestyle: "modest",
// };

//Add BG feature info here

BackgroundFeatureList["lingering echoes"] = {
	description:
		"The echoes of your lost memories sometimes surface in surprising ways. When you enter a new location or meet a new person, there's a chance something about them will trigger a faint recollection from your past. The GM might allow you to recall a small detail about the world, give you a hint about the situation at hand, or allow you to use your proficiency with a skill or tool you aren't normally proficient with for a single roll.",
	source: [["EldritchHunt", 174]],
};

BackgroundFeatureList["born of the hunt"] = {
	description:
		"Your continuous battles against the beasts have fortified your body and mind against the horrors of the Scourge. When an aberration or beast forces you to make a saving throw against the frightened condition, you gain a bonus on saving throws equal to your proficiency bonus. Additionally, you share a strong bond with fellow hunters, allowing you to request favors from them",
	source: [["EldritchHunt", 175]],
};

BackgroundFeatureList["cult secrets"] = {
	description:
		"You know the secret signs, phrases, rituals, and traditions of your cult, and can recognize them anywhere. in addition you can recognize similar signals from other cults. furthermore, you have advantage on checks made to pass yourself off as a member of similar cults, potentially gaining trust or access to resources.",
	source: [["eldritchhunt", 176]],
};

BackgroundFeatureList["forceful miracle"] = {
	description:
		"Through your dedicated service, you have harnessed the powers of the Radiant One. In the most dire of situations, you may extract this power for a miracle. However, these miracles are not to be taken lightly and should not be used frivolously. The miracle cannot be stronger in power than a spell of level equal to half your character level (rounded down, minimum 1st level). After a miracle has been granted, your hit points maximum are lowered by an amount equal to your character level for 1d12 days, and you must perform a significant service for the Radiant One to regain this miracle.",
	source: [["EldritchHunt", 178]],
};

BackgroundFeatureList["scribe of radiance"] = {
	description:
      "You've spent years studying the ancient scripts and texts of the Radiant Church, and with time, you've become a skilled scribe. Not only can you flawlessly replicate any scripture, but you can also identify and understand most religious texts related to your faith. This ability can prove invaluable when deciphering forgotten scriptures or understanding cryptic prophecies.",
    source: [["EldritchHunt", 178]],
};
BackgroundFeatureList["zealous authority"] = {
	description:
      "As an Inquisitor of the Radiant Church, you command a certain level of respect and fear among church members and outsiders who recognize the authority of the Church. You can leverage your authority to gain access to resources, information, or aid from those who fear the Church's wrath, revere its power, or follow its teachings.",
    source: [["EldritchHunt", 178]],
};
BackgroundFeatureList["inquisitive mind"] = {
	description:
      "Your constant searching for answers has trained your mind to find connections and insights where others see none. You have an uncanny knack for seeing through lies and half-truths, and people tend to reveal more information to you, either intentionally or not. You have a knack for getting people to open up to you, whether it's through kindness, intimidation, or trickery.",
    source: [["EldritchHunt", 178]],
};
BackgroundFeatureList["6th sense"] = {
	description:
      "You can sense the presence and general direction of powerful eldritch energies and artifacts within a 1-mile radius, particularly if they are connected to the Blood Moon of Rebirth or the Mother of a Thousand Young.",
    source: [["EldritchHunt", 182]],
};
BackgroundFeatureList["scion’s creation"] = {
	description:
			"Your time as a Scion has made you an expert in the creation and maintenance of complex machinery and constructs. You can spend an hour to perform maintenance on a construct, restoring a number of hit points to it equal to your level; a creature can only benefit from this feature once per day. Additionally, you can identify, inspect, and assess the function and value of mechanical or arcane devices or constructs. This does not mean you know how to operate such a device if you have never handled it before.",
		source: [["EldritchHunt", 183]],
};
BackgroundFeatureList["bottom dweller"] = {
	description:
			"Having been discarded by society, you're familiar with desperation. You know the darkest corners of the city like the back of your hand. Whether it's the dank sewers, abandoned buildings, or the shadowy back alleys, you can navigate these places with ease and can often find shelter or a safe passage where others would see only squalor and danger. You require half as much food and water as a regular member of your race to survive, and have advantage on all Survival checks made to maintain a Wretched lifestyle.",
		source: [["EldritchHunt", 183]],
};
BackgroundFeatureList["worthless"] = {
	description:
			"You are worthless, but you show a sliver of potential. When you choose this background at 1st level, reduce your highest ability score until the sum of your six ability scores is equal to 72 or fewer. Then, reduce each ability score by 1. When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2 or you can increase two ability scores of your choice by 1. You can't increase an ability score above 18 using this feature.",
		source: [["EldritchHunt", 183]],
};
