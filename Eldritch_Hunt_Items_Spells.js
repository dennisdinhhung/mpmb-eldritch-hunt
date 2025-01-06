if (sheetVersion < 13001012) {
  throw "This script was made for a newer version of the sheet (v13.1.14). Please use the latest version and try again.\nYou can get the latest version at www.flapkan.com.";
}
var iFileName = "Eldritch_Hunt_Items_Spells.js";
RequiredSheetVersion("13.1.12");

SourceList["EldritchHunt"] = {
  name: "Steinhardt's Guide to the Eldritch Hunt",
  abbreviation: "SGttEldHunt",
  abbreviationSpellsheet: "SGttEldHunt",
  group: "3rd Party Campaign Sourcebooks",
  date: "2024/07/01",
};

//TODO: SPELLS

// SpellsList["ashardalon's stride"] = { // contains contributions by Nod_Hero (Flame Stride in UA:DO)
// 	name : "Ashardalon's Stride",
// 	nameAlt : "Flame Stride",
// 	classes : ["artificer", "ranger", "sorcerer", "wizard"],
// 	source : [["FToD", 19], ["UA:DO", 6]],
// 	level : 3,
// 	school : "Trans",
// 	time : "1 bns",
// 	range : "Self",
// 	components : "V,S",
// 	duration : "Conc, 1 min",
// 	description : "+20+5/SL ft speed; provoke no opp atks for moving; all crea/obj in 5 ft of path 1d6+1d6/SL Fire dmg",
// 	descriptionShorter : "+20+5/SL ft spd; no opp atks with move; all crea/obj in 5 ft of path 1d6+1d6/SL Fire dmg",
// 	descriptionMetric : "+6+1,5/SL m spd; provoke no opp atks in move; all crea/obj in 1,5 m of path 1d6+1d6/SL Fire dmg",
// 	descriptionShorterMetric : "+6+1,5/SL m spd; no opp atks in move; all crea/obj in 1,5 m of path 1d6+1d6/SL Fire dmg",
// 	descriptionFull : "The billowing flames of a dragon blast from your feet, granting you explosive speed. For the duration, your speed increases by 20 feet and moving doesn't provoke opportunity attacks."+
// 	"\n   When you move within 5 feet of a creature or an object that isn't being worn or carried, it takes 1d6 fire damage from your trail of heat. A creature or object can take this damage only once during a turn."+
// 	AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, increase your speed by 5 feet for each spell slot level above 3rd. The spell deals an additional 1d6 fire damage for each slot level above 3rd."
// };

SpellsList["bestial roar"] = {
  name: "Bestial Roar",
  classes: ["bard", "druid", "sorcerer", "warlock"],
  source: [["EldritchHunt", 187]],
  level: 0,
  school: "Trans",
  time: "1 a",
  range: "Self",
  components: "V",
  duration: "Instantaneous",
  description:
    "Each creature within 10ft of you must succeed on a Strength saving throw or be pushed 10ft away from you and knocked prone. Spell radius +5 per level 5, 11, 17.",
  descriptionMetric:
    "Each creature within 3m of you must succeed on a Strength saving throw or be pushed 3m away from you and knocked prone. Spell radius +5 per level 5, 11, 17.",
  descriptionFull:
    "You release a loud, monstrous roar mimicking those of ravenous beasts, causing shockwaves around you. Each creature within 10 feet of you must succeed on a Strength saving throw or be pushed 10 feet away from you and knocked prone. \nThis spell’s radius increases by 5 feet when you reach 5th level (15 feet), 11th level (20 feet), and 17th level (25 feet).",
};

SpellsList["brittle bone throw"] = {
  name: "Brittle Bone Throw",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 187]],
  level: 0,
  school: "Conj",
  time: "1 a",
  range: "60 ft",
  components: "V,S,M",
  duration: "Instantaneous",
  description:
    "You do a spell atk. On a hit, the target takes 1d8 piercing. On a miss, you make another atk towards a creature within 15ft of the OG target, the creature will take 1d4 piercing if hit. Damage + 1d8 or +1d4 (for second target) at lvl 5, 11, 17.",
  descriptionFull:
    "You hurl a splintered bone fragment at a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d8 piercing damage. On a miss, you can shatter the bone mid-air and redirect the remnant towards another creature within 15 feet of the original target. Make another ranged spell attack. On a hit, the new target takes 1d4 piercing damage. \nThis spell's damage increases by 1d8 and 1d4, respectively, when you reach 5th level (2d8, 2d4), 11th level (3d8, 3d4), and 17th level (4d8, 4d4).",
};

SpellsList["cosmic eye"] = {
  name: "Cosmic Eye",
  classes: ["sorcerer"],
  source: [["EldritchHunt", 187]],
  level: 0,
  school: "Trans",
  time: "1 a",
  range: "150 ft",
  components: "M",
  compMaterial: "an eldritch parasite",
  duration: "Instantaneous",
  description:
    "You do a ranged spell atk. If hit, the target takes 1d8 necrotic dmg. If crit, reroll the dmg die if its 4 or lower until its higher than 4. Spell dmg +1d8 per level 5, 11, 17.",
  descriptionFull:
    "Your eye darkens under the influence of the eldritch madness, appearing as an endless starry sky. Make a ranged spell attack against a creature within range as you fire a projectile of eldritch energy from your eye. On a hit, the target takes 1d8 necrotic damage. If you score a critical hit, you can reroll any roll of 4 or lower on the damage die until you get a higher result. \nThis spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
};

SpellsList["gravity spike"] = {
  name: "Gravity Spike",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 187]],
  level: 0,
  school: "Trans",
  time: "1 a",
  range: "60 ft",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "A creature on the ground within range must make a Dex save. If fail, the crea takes 1d4 piercing and knocked prone. If success, the crea takes half dmg and not knocked prone. Spell dmg +1d4 per level 5, 11, 17.",
  descriptionFull:
    "You create a localized gravitational field that temporarily shifts the landscape to impale a creature. Choose a creature on the ground you can see within range. The creature must make a Dexterity saving throw. On a failed save, the target takes 1d4 piercing damage and is knocked prone. On a successful save, the target takes half as much damage and isn’t knocked prone. \nThis spell’s damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).",
};

SpellsList["gravity whip"] = {
  name: "Gravity Whip",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 187]],
  level: 0,
  school: "Evoc",
  time: "1 a",
  range: "10 ft",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Make a melee atk to a crea within range. If hit, the crea takes 1d4 bludgeoning dmg and pushed 10ft in a straight line of your choice and the crea's speed is reduced by 5ft until next turn. Spell dmg +1d4 per level 5, 11, 17.",
  descriptionFull:
    "You weave gravity in your palm before striking. Make a melee spell attack against a creature within range. On a hit, it takes 1d4 bludgeoning damage and is pushed 10 feet in a straight line in a direction of your choice. In addition, its speed is reduced by 5 feet until the start of your next turn. \nThis spell’s damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).",
};

//1st level spell
SpellsList["bone claws"] = {
  name: "Bone Claws",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 188]],
  level: 1,
  school: "Trans",
  time: "1 a",
  range: "30 ft",
  components: "V,S,M",
  compMaterial: "a tiger’s claw",
  duration: "Conc, 1 min",
  description:
    "For the duration, the target's unarmed atk deals extra 1d4 piercing dmg when hit. When upcast, dmg increase to 1d6 (lv2), 2d4 (lv3), 2d6 (lv4), 3d4 (lv5).",
  descriptionFull:
    "Choose a creature you can see within range. You infuse them with osteomantic energy, growing sharp claws from their carpal bones. For the duration, the target’s unarmed attacks deal an extra 1d4 slashing damage on a hit." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 2nd level or higher, the damage increases to 1d6 at 2nd level, 2d4 at 3rd level, 2d6 at 4th level, and 3d4 at 5th level.",
};

SpellsList["bone shield"] = {
  name: "Bone Shield",
  classes: ["druid", "ranger", "warlock"],
  source: [["EldritchHunt", 188]],
  level: 1,
  school: "Abjur",
  time: "1 rea",
  range: "Self",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Reduce damage by 1d12(+1d12/SL), if the attacking enemy is within 10ft of you, the shield explodes and deal slashing dmg = the amount it reduces.",
  descriptionFull:
    "You generate a barrier of elongated femurs that protects you. You reduce the incoming damage by 1d12, and if the attacking enemy is within 10 feet of you, the osseous barrier explodes, dealing slashing damage to them equal to the amount reduced." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 2nd level or higher, the damage reduction increases by 1d12 for each slot level above 1st.",
};

SpellsList["electrify"] = {
  name: "Electrify",
  classes: ["ranger", "sorcerer", "wizard"],
  source: [["EldritchHunt", 188]],
  level: 1,
  school: "Evoc",
  time: "1 bns",
  range: "Self",
  components: "V,S",
  duration: "1 rnd",
  description:
    "The next time you hit a melee (melee spell counts), before your next turn, the target takes 1d12(+1d12/SL) lightning dmg and must take a Con save. If fail, the target is stunned until its next turn.",
  descriptionFull:
    "You channel lightning into your hands. The next time you hit a creature with a melee attack (including a melee spell attack) before the start of your next turn, the target takes 1d12 lightning damage and must make a Constitution saving throw. On a failed save, the target becomes stunned until the start of its next turn. The spell ends after dealing damage, or at the start of your next turn, whichever occurs first." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d12 for each slot level above 1st.",
};

SpellsList["fall"] = {
  name: "Fall",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 188]],
  level: 1,
  school: "Trans",
  time: "1 a",
  range: "Self",
  components: "V,M",
  compMaterial: "an elastic band",
  duration: "Instantaneous",
  description:
    "You can change the way gravity pulls and fall 200ft in that direction. You take fall damage based on how far you fall.",
  descriptionFull:
    "As an action, you can temporarily change which way gravity pulls you and immediately fall 200 feet in that direction. If you hit a solid surface, you take falling damage based on the distance you have traveled.",
};

SpellsList["fractured shell"] = {
  name: "Fractured Shell",
  classes: ["warlock", "wizard"],
  source: [["EldritchHunt", 188]],
  level: 1,
  school: "Trans",
  time: "1 a",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "a porcupine's carapace",
  duration: "Conc, 10 min",
  description:
    "The target takes 1 piercing damage. For the duration of the spell, the first time each turn that the target is hit with a melee atk, the attacking creature takes 2d4 piercing dmg. When upcasting, +1d4 per level. If spell slot lv5 or higher, no need to concentrate.",
  descriptionFull:
    "You touch a willing creature, forcing spiked bone plates to grow and pierce through its skin. It takes 1 point of piercing damage. For the duration of the spell, the first time each turn that the target is hit with a melee attack, the attacking creature takes 2d4 piercing damage." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 2nd level or higher, the damage dealt to attacking creatures increases by 1d4 for each slot level above 1st. If you use a spell slot of 5th level or higher, the spell doesn’t require concentration.",
};

SpellsList["gravity leap"] = {
  name: "Gravity Leap",
  classes: ["druid", "ranger", "sorcerer"],
  source: [["EldritchHunt", 188]],
  level: 1,
  school: "Trans",
  time: "1 a",
  range: "Touch",
  components: "V,S",
  duration: "Conc, 1 min",
  description:
    "Your jump distance is tripled. Once per turn, after jumping, all creature within 5ft of the space you left will take a Str save. If fail, the creature is prone.",
  descriptionFull:
    "You enhance the gravitational field around your body, allowing you to jump higher and farther. For the duration, your jump distance is tripled. Additionally, once per turn immediately after you jump, a wave of gravity is unleashed, and each creature within 5 feet of the space you left must make a Strength saving throw. On a failed save, a creature is knocked prone.",
};

SpellsList["gravity well"] = {
  name: "Gravity Well",
  classes: ["cleric", "druid", "ranger", "sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 188]],
  level: 1,
  school: "Evoc",
  time: "1 a",
  range: "60 ft",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Ranged spell atk. Enemy takes 2d8 force dmg and pulled 20ft towards you.",
  descriptionFull:
    "You fire a projectile of condensed gravitational force toward a creature you can see within range. Make a ranged spell attack against the target. On a hit, the target takes 2d8 force damage and is pulled 20 feet in a straight line toward you.",
};

SpellsList["phalangeal shot"] = {
  name: "Phalangeal Shot",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 189]],
  level: 1,
  school: "Evoc",
  time: "1 a",
  range: "Self (30ft line)",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Every creature in a 1ft wide, 30ft long line makes a Dex save or take 2d8+1d8/SL piercing dmg.",
  descriptionFull:
    "You point your fingers forward and your phalangeal bones fire outwards, akin to the bullets of a gun. They regrow immediately, leaving your hand unscathed. All creatures in a 1-foot-wide, 30-foot-long line in front of you must succeed on a Dexterity saving throw or take 2d8 piercing damage. " +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
};

SpellsList["silvered shell"] = {
  name: "Silvered Shell",
  classes: ["paladin", "ranger"],
  source: [["EldritchHunt", 189]],
  level: 1,
  school: "Trans",
  time: "1 bns",
  range: "Self",
  components: "V,S,M",
  compMaterial: "an empty phantasm shell",
  duration: "1m",
  description:
    "Your weapon becomes Silvered and deals extra 1d4 force dmg. Upcasting increase the duration to 10m (lv2), 1h (lv3), 8h (lv4), 24h (lv5).",
  descriptionFull:
    "You touch a weapon and imbue it with otherworldly bile. For the duration, it becomes silvered and, while you are holding it, it deals an additional 1d4 force damage on a hit" +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 2nd level or higher, you can increase the duration to 10 minutes (2nd level), 1 hour (3rd level), 8 hours (4th level), or 24 hours (5th level).",
};

SpellsList["spectral slash"] = {
  name: "Spectral Slash",
  classes: ["paladin", "ranger"],
  source: [["EldritchHunt", 189]],
  level: 1,
  school: "Conj",
  time: "1 bns",
  range: "20ft",
  components: "V,S,M",
  compMaterial: "a melee weapon worth at least 1 sp",
  duration: "Instantaneous",
  description:
    "A spectral copy makes a melee spell attack at creature within 20ft(+10ft/SL). The creature takes 1d8(+1d8/SL) of the weapon you hold. After, use an action to move 20ft(+10ft/SL) to the target and atk it. (need a melee weapon)",
  descriptionFull:
    "You send forth a spectral copy of yourself to strike down your foe. Make a melee spell attack against a creature within 20 feet of you. On a hit, the target takes 1d8 damage of your weapon’s damage type. You can then use an action to move up to 20 feet in a straight line towards the target, streaking through a spectral trail, and take the Attack action against it. To use this action, you must attack with a melee weapon." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 and the range and distance you can move increase by 10 feet for each slot level above 1st.",
};

//2nd level spell

SpellsList["arm cannon"] = {
  name: "Arm Cannon",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 189]],
  level: 2,
  school: "Evoc",
  time: "1 a",
  range: "30ft",
  components: "V,S",
  duration: "1 rnd",
  description:
    "Make ranged spell attack, the target takes 4d8(+1d8/SL) piercing dmg and make a Str Save or pushed back 15ft. If pushed into obstacle, target is restrained. Large crea have advantage on the save.",
  descriptionFull:
    "You fire out the bones of your forearm through your hand, leaving a severe wound that immediately regrows and heals. Make a ranged spell attack against a creature within range. On a hit, the target takes 4d8 piercing damage and must succeed on a Strength saving throw or be pushed back 15 feet. If pushed into an obstacle, the target is impaled on it and is restrained by the bone until the end of its next turn. Creatures that are Large or larger have advantage on this saving throw." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.",
};

SpellsList["blind ambush"] = {
  name: "Blind Ambush",
  classes: ["bard", "druid", "ranger", "warlock"],
  source: [["EldritchHunt", 190]],
  level: 2,
  school: "Conj",
  time: "1 a",
  range: "60ft (10ft sq)",
  components: "V,S,M",
  compMaterial: "a whistle",
  duration: "1m",
  description:
    "Choose a ground point. When a crea moves in the zone, all crea in the zone takes 2d10(+1d10/SL) piercing and knocked prone. If SL of 5 or above, the zone triggers twice.",
  descriptionFull:
    "You blow on a whistle, releasing an inaudible sound. Choose a point on the ground within range. The first time a creature moves while within a 10-foot square centered on that point before the spell ends, an eldritch maw immediately erupts from beneath the ground, dealing 2d10 piercing damage to each creature within the square and knocking them prone. The spell then ends." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d10 for each slot level above 2nd. If you use a spell slot of 5th level or higher, the spell can trigger a second time before it ends.",
};

SpellsList["bone cocoon"] = {
  name: "Bone Cocoon",
  classes: ["druid", "sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 190]],
  level: 2,
  school: "Abjur",
  time: "1 reac (when a crea drop to 0hp)",
  range: "30ft",
  components: "V,M",
  compMaterial: "a shrunk and gilded rib cage worth at least 50 gp",
  duration: "Conc, 1m",
  description:
    "Conjure a cocoon on a crea with 0hp. The crea can't be dmged, effected, has full cover, is restrained and has ADV death saves. Cocoon has 25hp and AC=11+spell mod. RES to cold, fire, necrotic, immune to poison and psychic. Cocoon disppear on unConc.",
  descriptionFull:
    "You conjure a cocoon made of cartilage and bones, which protects the creature that dropped to 0 hit points. While in the cocoon, the creature can’t be damaged by attacks or effects originating from outside, has total cover, is considered restrained, and makes death saving throws at advantage. The cocoon has 25 hit points and an AC of 11 + your spellcasting ability modifier. It has resistance to cold, fire, and necrotic damage, and immunity to poison and psychic damage. If you lose concentration or the cocoon is reduced to 0 hit points, it is destroyed.",
};

SpellsList["bludgeoning horror"] = {
  name: "Bludgeoning Horror",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 191]],
  level: 2,
  school: "Conj",
  time: "1 a",
  range: "15ft",
  components: "V,S,M",
  compMaterial: "the body part of a Great One",
  duration: "Instantaneous",
  description:
    "On a hit, target takes 3d6(+1d6 & 5ft per SL) bludgeoning dmg. If crit, target is stunned til your next turn.",
  descriptionFull:
    "You summon a large number of tentacles and slugs from your palm to strike a creature within range. Make a melee spell attack against the target. On a hit, it takes 3d6 bludgeoning damage. If you score a critical hit, the target is also stunned until the start of your next turn." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 and range increases by 5 feet for each slot level above 2nd.",
};

SpellsList["calcified memories"] = {
  name: "Calcified Memories",
  classes: ["warlock", "wizard"],
  source: [["EldritchHunt", 191]],
  ritual: true,
  level: 2,
  school: "Div",
  time: "1 a",
  range: "Touch",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "You see the last 6 seconds of the crea's action before death but not the monster. Limit once/24h.",
  descriptionFull:
    "You touch the bones of a deceased creature. When you do so, a ghostly grey illusion of the fallen creature appears above its corpse to reenact the last 6 seconds of its life. The illusion only shows the creature’s actions, such as reacting to an unseen monster or choking from poisonous gas, but does not show the monster or effect causing the behavior. This spell has no effect on undead creatures. Once a corpse's death has been revealed in this way, it can’t be shown again for 24 hours",
};

SpellsList["graviturgic smite"] = {
  name: "Graviturgic Smite",
  classes: ["paladin"],
  source: [["EldritchHunt", 191]],
  level: 2,
  school: "Evoc",
  time: "1 bns",
  range: "Self",
  components: "V",
  duration: "Conc, 1m",
  description:
    "Your next atk deals 2d6(+1d6/SL) bludgeoning dmg. The target makes a Str save. If fail, its speed -10ft until the spell ends. If success, its speed -10ft but min of 10ft.",
  descriptionFull:
    "The next time you hit a creature with a weapon attack before this spell ends, you can add energy stolen from black holes. Your attack deals an extra 2d6 bludgeoning damage to the target, which must make a Strength saving throw. On a failure, its speed is reduced to 10 feet until the spell ends. On a success, its speed is reduced by 10 feet until the spell ends,to a minimum of 10 feet." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd.",
};

SpellsList["gravity storm"] = {
  name: "Gravity Storm",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 191]],
  level: 2,
  school: "Trans",
  time: "1 a",
  range: "120ft(20ft rad)",
  components: "V,S",
  duration: "2 rnd",
  description:
    "Choose a point in range. When casted and at your turn start, for 2 rnds (+1rnd/SL), each crea in 20ft (+5ft/SL) of the point, makes a Dex save. If fail, takes 2d6 (+1d6/SL) bludgeon and is prone. If success, takes half dmg and isn't prone.",
  descriptionFull:
    "You create a localized gravitational field that unleashes a storm of gravity waves. Choose a point within range that you can see. When you cast this spell and at the start of each of your subsequent turns for the duration, each creature within 20 feet of that point must make a Dexterity saving throw. On a failure, a target takes 2d6 bludgeoning damage and is knocked prone. On a success, a target takes half as much damage and isn’t knocked prone" +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6, the radius increases by 5 feet, and the duration increases by 1 round, for each slot level above 2nd.",
};

SpellsList["gravity storm"] = {
  name: "Gravity Storm",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 191]],
  level: 2,
  school: "Trans",
  time: "1 a",
  range: "120ft(20ft rad)",
  components: "V,S",
  duration: "2 rnd",
  description:
    "Choose a point in range. When casted and at your turn start, for 2 rnds (+1rnd/SL), each crea in 20ft (+5ft/SL) of the point, makes a Dex save. If fail, takes 2d6 (+1d6/SL) bludgeon and is prone. If success, takes half dmg and isn't prone.",
  descriptionFull:
    "You create a localized gravitational field that unleashes a storm of gravity waves. Choose a point within range that you can see. When you cast this spell and at the start of each of your subsequent turns for the duration, each creature within 20 feet of that point must make a Dexterity saving throw. On a failure, a target takes 2d6 bludgeoning damage and is knocked prone. On a success, a target takes half as much damage and isn’t knocked prone" +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6, the radius increases by 5 feet, and the duration increases by 1 round, for each slot level above 2nd.",
};

SpellsList["ligtning charged"] = {
  name: "Lightning Charged",
  classes: ["druid", "ranger", "sorcerer", "wizard"],
  source: [["EldritchHunt", 191]],
  level: 2,
  school: "Evoc",
  time: "1 a",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "a piece of metal once use in a lightning rod",
  duration: "10m",
  description:
    "When the enhanced cre atk another crea, is struck, is grappled or grappling, the other crea takes 1d6 lightning. Afer 6(+2/SL) times, spell ends.",
  descriptionFull:
    "You channel lightning energy into a creature. The energy is harmless to the creature, but escapes in dangerous bursts to other nearby creatures. Every time that creature strikes another creature with a melee attack or a spell with a range of touch, is struck by another creature with a melee attack, or ends their turn while grappling or being grappled by another creature, they deal 1d6 lightning damage to that creature. Once this spell has discharged 6 times (dealing up to 6d6 total damage), the spell ends." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 3rd level or higher, the spell can discharge damage 2 additional times (dealing up to 2d6 more total damage) before the spell ends for each slot level above 2nd.",
};

SpellsList["otherworldly gaze"] = {
  name: "Otherworldly Gaze",
  classes: ["bard", "druid", "ranger"],
  source: [["EldritchHunt", 192]],
  level: 2,
  school: "Div",
  time: "1 a",
  range: "Self",
  components: "V,S",
  duration: "10m",
  description:
    "You gain ADV Perception; sense abera, cele, friends in 120ft; see true form of crea in 30ft; if blind, gain sight.",
  descriptionFull:
    "You tap into the eldritch forces of the universe, gaining heightened senses and the ability to see beyond the veil of reality. For the duration, your eyes turn black and you gain the following benefits: " +
    "\n● You have advantage on Perception checks." +
    "\n● You can automatically sense the presence of eldritch creatures within 120 feet of you, including aberrations, celestials, and fiends." +
    "\n● You can see the true form of any shapechanger or creature that is transformed by magic within 30 feet of you." +
    "\n● If you are blind, you regain sight for the duration of this spell.",
};

SpellsList["pressure cage"] = {
  name: "Pressure Cage",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 192]],
  level: 2,
  school: "Trans",
  time: "1 a",
  range: "60ft(10ft rad sphere)",
  components: "V,S,M",
  compMaterial: "a shard of ball and chain",
  duration: "Conc, 1m",
  description:
    "Area (10ft+5ft/SL) is difficult terrain. When a crea enters the first time/start its turn inside, crea does a Str Save. If success, nothing. If fail, speed = 0 til next turn. With bns action, you can move the sphere 20ft.",
  descriptionFull:
    "Gravity increases within a 10-foot-radius sphere centered on a point you choose within range, causing immense pressure to be applied to all within, and the area is difficult terrain. When a creature enters the sphere for the first time on a turn or starts its turn there, it must succeed on a Strength saving throw or its speed is reduced to 0 until the start of its next turn. On subsequent turns, as a bonus action, you can move the sphere up to 20 feet in any direction." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 3rd level or higher, the radius increases by 5 feet for each slot level above 2nd.",
};

SpellsList["rolling bones"] = {
  name: "Rolling Bones",
  classes: ["cleric", "druid", "warlock", "wizard"],
  source: [["EldritchHunt", 192]],
  ritual: true,
  level: 2,
  school: "Div",
  time: "1m",
  range: "Self",
  components: "V,S,M",
  duration: "Instantaneous",
  description:
    "You roll a d6 to get a future omen, on subsequent use, the might get a false read.",
  descriptionFull:
    "You roll bones, allowing fate to give you an omen of the future. Roll 1d6." +
    "\n● On a roll of 5 or 6, you know if you are: not likely, likely, or very likely to encounter hostile creatures within the next hour. You also learn the type of creature you’re most likely to encounter." +
    "\n● On a roll of 2, 3, or 4, you learn if you are: not likely, likely, or very likely to encounter hostile creatures within the next hour." +
    "\n● On a roll of 1, the material components of the spell are consumed, and you take 1 psychic damage as fate rebels. You don’t learn any information and you can’t cast this spell again until you finish a short rest." +
    "\nIf you cast the spell two or more times before finishing your next long rest, there is a cumulative 25 percent chance for each casting after the first that you get a false reading. The GM makes this roll in secret.",
};

SpellsList["rupturing curse"] = {
  name: "Rupturing Curse",
  classes: ["warlock", "wizard"],
  source: [["EldritchHunt", 192]],
  level: 2,
  school: "Evoc",
  time: "1 a",
  range: "60ft",
  components: "V,S",
  duration: "Conc, 1m",
  description:
    "Crea makes a Con Save, or take 3d6(+2d6/SL) piercing dmg & knocked prone. And if the crea takes bludgeoning dmg >= 5xCon mod, then speed = 0. Spell ends with crea doesn't take that dmg next turn. Boneless crea is immune.",
  descriptionFull:
    "You focus your magic to shatter the body of your foe. Choose one creature you can see within range; it must succeed on a Constitution saving throw or take 3d6 piercing damage and be knocked prone by the pain. In addition, if the target takes bludgeoning damage equal to 5 times its Constitution modifier (minimum of 5) or more in a single turn, its skeleton shatters, reducing its speed to 0 for the duration of the spell. If it does not take such damage before the start of its next turn, the spell ends. A creature without bones is immune to this effect." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 3rd level or higher, the piercing damage increases by 2d6 for each slot level above 2nd.",
};

SpellsList["skeletal tail"] = {
  name: "Skeletal Tail",
  classes: ["druid", "ranger"],
  source: [["EldritchHunt", 193]],
  level: 2,
  school: "Conj",
  time: "1 a",
  range: "Self",
  components: "V,S,M",
  compMaterial: "a scorpion’s tail",
  duration: "1 min",
  description:
    "When a creature moves within 20ft of you, you can use a Reaction to pierce them. The target make a Dex save or take 2d4+2d4/SL piercing dmg and be pulled into an empty space adjacent to you.",
  descriptionFull:
    "You grow a long, scorpion-like tail made of sharpened bones. Whenever a creature moves while within 20 feet of you centered on you, you can use your reaction to try and pierce them with your tail. The target must succeed on a Dexterity saving throw or take 2d4 piercing damage and be pulled to an empty space adjacent to you as your tail drags them in." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 3rd level of or higher, the damage increases by 2d4 for each slot level above 2nd.",
};

//3rd level spell

SpellsList["astral barrage"] = {
  name: "Astral Barrage",
  classes: ["druid", "ranger", "sorcerer", "wizard"],
  source: [["EldritchHunt", 193]],
  level: 3,
  school: "Conj",
  time: "1 a",
  range: "60ft",
  components: "V,S",
  duration: "Conc, 1 min",
  description:
    "A crea makes a Dex Save or take 7d6(+2d6/SL) bludgeoning dmg. You can use an action to keep the portal open next turn to target another crea. While in Conc, speed = 1/2.",
  descriptionFull:
    "You create a portal to the cosmos and send asteroids hurtling through it. A creature of your choice that you can see within range must succeed on a Dexterity saving throw or take 7d6 bludgeoning damage. You can use an action on subsequent turns to keep the portal open and target another creature, which must make the same saving throw. The spell ends if you use your action to do anything else. While concentrating on this spell, your speed is halved." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 4th level or higher, larger asteroids fly through the portal and the damage increases by 2d6 for each slot level above 3rd.",
};

SpellsList["dampen gravity"] = {
  name: "Dampen Gravity",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 193]],
  level: 3,
  school: "Trans",
  time: "1 a",
  range: "Self(60ft sphere)",
  components: "V,S,M",
  compMaterial: "a feather",
  duration: "1h",
  description:
    "All crea of choice in the sphere gain x2 jump distance, speed +10ft, ADV on Acrobatics, 0 fall dmg ",
  descriptionFull:
    "You focus your powers to lessen the call of gravity in a 60-foot-radius sphere that moves with you, centered on you. All creatures of your choice in the sphere have their jump distance doubled and their speed increased by 10 feet. They also have advantage on Acrobatics checks and ignore falling damage if they end their fall within the sphere.",
};

SpellsList["displacing maw"] = {
  name: "Displacing Maw",
  classes: ["warlock", "wizard"],
  source: [["EldritchHunt", 194]],
  level: 3,
  school: "Conj",
  time: "1 a",
  range: "10ft",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Crea makes a Str Save. If fail, takes 4d8(+1d8/SL) piercing dmg & transported to a point in 60ft(+10ft/SL). If success, takes half dmg and not transported.",
  descriptionFull:
    "Your rib cage opens up violently, forming a maw that attempts to devour a creature within range. The creature must make a Strength saving throw. On a failure, it takes 4d8 piercing damage and is transported through magic to a point of your choice on the ground within 60 feet of you, where the maw reappears and regurgitates them. On a success, it takes half as much damage and is not transported." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8, and the teleportation range increases by 10 feet, for each slot level above 3rd.",
};

SpellsList["malicious rancor"] = {
  name: "Malicious Rancor",
  classes: ["warlock"],
  source: [["EldritchHunt", 194]],
  level: 3,
  school: "Evoc",
  time: "1 a",
  range: "60ft(10ft radius)",
  components: "V,S,M",
  compMaterial:
    "(a skull that belonged to a creature that succumbed to a curse, worth at least 1 sp, which the spell consumes",
  duration: "1 rnd",
  description:
    "Ranged spell atk. Crea takes 1d10 necrotic dmg. Hit or miss, the skull explodes, creas in 10ft make a Wis Save, take 5d4(+2d4/SL) psychic, or half if success. Til your next turn, if a crea enters or end turns there, they do the Save.",
  descriptionFull:
    "You hurl a deformed skull covered in scratches and holes and strewn in curses at a creature within range, where the skull explodes with violent hatred. Make a ranged spell attack against the creature. On a hit, the target takes 1d10 necrotic damage. Hit or miss, the skull then detonates, emitting a psychic wailing from that point. Each creature within 10 feet of that point must make a Wisdom saving throw, taking 5d4 psychic damage on a failed save, or half as much damage on a successful one. Until the start of your next turn, if a creature enters the area or ends its turn there, it must make the saving throw against the skull’s damage." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 4th level or higher, the psychic damage increases by 2d4 for each slot level above 3rd.",
};

SpellsList["malicious rancor"] = {
  name: "Malicious Rancor",
  classes: ["warlock"],
  source: [["EldritchHunt", 194]],
  level: 3,
  school: "Evoc",
  time: "1 a",
  range: "60ft(10ft radius)",
  components: "V,S,M",
  compMaterial:
    "a skull that belonged to a creature that succumbed to a curse, worth at least 1 sp, which the spell consumes",
  duration: "1 rnd",
  description:
    "Ranged spell atk. Crea takes 1d10 necrotic dmg. Hit or miss, the skull explodes, creas in 10ft make a Wis Save, take 5d4(+2d4/SL) psychic, or half if success. Til your next turn, if a crea enters or end turns there, they do the Save.",
  descriptionFull:
    "You hurl a deformed skull covered in scratches and holes and strewn in curses at a creature within range, where the skull explodes with violent hatred. Make a ranged spell attack against the creature. On a hit, the target takes 1d10 necrotic damage. Hit or miss, the skull then detonates, emitting a psychic wailing from that point. Each creature within 10 feet of that point must make a Wisdom saving throw, taking 5d4 psychic damage on a failed save, or half as much damage on a successful one. Until the start of your next turn, if a creature enters the area or ends its turn there, it must make the saving throw against the skull’s damage." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 4th level or higher, the psychic damage increases by 2d4 for each slot level above 3rd.",
};

SpellsList["osseous cage"] = {
  name: "Osseous Cage",
  classes: ["druid", "warlock", "wizard"],
  source: [["EldritchHunt", 194]],
  level: 3,
  school: "Conj",
  time: "1 a",
  range: "Self(10ft-radius sphere)",
  components: "V,S",
  duration: "10m",
  description:
    "A cage surrounds a 10ft sphere of you and give 3/4 cover. You can use a reaction to let a crea pass thru the cage. Large/Larger crea cannot enter and a pushed away when casted. Cage has AC 12, 100HP(+20HP/SL), and VULN to bludgeon.",
  descriptionFull:
    "You cause a cage of cartilage and bones to erupt from the ground that surrounds a 10-foot-radius sphere centered on you. The bones are thick and provide three-quarters cover to creatures inside and outside. When you or any other creature attempts to pass through the cage, you can use your reaction to let them through. Large or Larger creatures cannot enter the cage, and are pushed to the nearest unoccupied space if they are within the cage’s area when it first appears. The osseous cage has AC 12, 100 hit points, and vulnerability to bludgeoning damage. If you cast this spell again while you already have a cage summoned, the previous cage turns to dust." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 4th level or higher, the cage has an additional 20 hit points for each slot level above 3rd.",
};

SpellsList["Osseous Impalement"] = {
  name: "Osseous Impalement",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 194]],
  level: 3,
  school: "Conj",
  time: "1 a",
  range: "60ft",
  components: "V,S,M",
  compMaterial: "a calcified bamboo stick",
  duration: "Conc, 1m",
  description:
    "Target up to 4 crea, they make Dex Save or take 3d10(+1d10/SL) piercing dmg, is restrained and take another 1d10(+1d10/SL) piercing at turn start. A crea can use its action to do an Ath Check vs. your Spell Save DC to free itself.",
  descriptionFull:
    "Massive bone spikes sprout under up to four creatures on the ground of your choice you can see within range. They must succeed on a Dexterity saving throw or take 3d10 piercing damage and be impaled by the spike, becoming restrained and held aloft 5 feet in the air for the duration. A creature restrained in this way takes 1d10 piercing damage at the start of each of its turns. A creature can use its action to make an Athletics check contested by your spell save DC, breaking the bone spike and freeing itself on a success." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 4th level or higher, the damage (both initial and ongoing) increases by 1d10 for each slot level above 3rd.",
};

SpellsList["radiant bell"] = {
  name: "Radiant Bell",
  classes: ["bard", "cleric"],
  source: [["EldritchHunt", 195]],
  level: 3,
  school: "Conj",
  time: "1 a",
  range: "Self(30ft radius)",
  components: "V,S,M",
  compMaterial:
    "a silvered choir bell* worth at least 5 gp, which the spell consumes",
  duration: "Instantaneous",
  description:
    "Any crea of choice in 30ft can end a conditions: charmed, frightened, poisoned, petrified, or stunned. Does not work on deafened crea.",
  descriptionFull:
    "You ring an arcane, silver bell, imbuing it with healing magics that cure the afflicted. Choose any number of creatures within 30 feet. For each target, you can end one of the following conditions: charmed, frightened, poisoned, petrified, or stunned. This cure does not work if a target is deafened.",
};

SpellsList["radiant slaughter"] = {
  name: "Radiant Slaughter",
  classes: ["cleric", "paladin", "warlock"],
  source: [["EldritchHunt", 195]],
  level: 3,
  school: "Conj",
  time: "1 a",
  range: "Self(30ft radius)",
  components: "V,S,M",
  compMaterial: "the petrified fetus of a Great One",
  duration: "Instantaneous",
  description:
    "Each crea in range make a Dex Save. If fail, crea takes 2d6 force, 3d6 radiant & prone. If success, half dmg & isnt prone. Crea within 5ft make it with DISADV",
  descriptionFull:
    "You summon a small nova of eldritch power in this secret technique from the Obitus Scholare. Each creature within 30 feet of you must make a Dexterity saving throw. On a failure, a creature takes 2d6 force damage, 3d6 radiant damage, and is knocked prone. On a success, it takes half as much damage and isn’t knocked prone. Creatures within 5 feet of you make this saving throw with disadvantage." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 4th level or higher, the force and radiant damage both increase by 1d6 for each slot level above 3rd.",
};

SpellsList["rubber bones"] = {
  name: "Rubber Bones",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 195]],
  level: 3,
  school: "Trans",
  time: "1 a",
  range: "Touch",
  components: "V,S",
  duration: "Conc, 10m",
  description:
    "Gain: escape grapple with 5ft of movement, squeeze thru space for crea 2 sizes smaller, ADV on Dex Save, RES to Bludgeon and +5ft reach. +1 target per SL.",
  descriptionFull:
    "You touch a willing creature. Its bones become soft and rubbery, and it gains the following benefits:" +
    +"\n● It can spend 5 feet of movement to escape a grapple without requiring an ability check and can squeeze through a space that is large enough for a creature two sizes smaller than it." +
    +"\n● It has advantage on Dexterity saving throws." +
    "\n● It has resistance to bludgeoning damage." +
    +"\n● Its reach with melee attacks increases by 5 feet." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 4th level or higher, you can target one additional creature for each slot level above 3rd.",
};

SpellsList["spectral fury"] = {
  name: "Spectral Fury",
  classes: ["paladin", "ranger"],
  source: [["EldritchHunt", 195]],
  level: 3,
  school: "Conj",
  time: "1 a",
  range: "30ft",
  components: "V,S,M",
  compMaterial: "a melee weapon worth at least 1 sp",
  duration: "Instantaneous",
  description:
    "3 spectral dupes hits enemy. Roll hit for each. Crea takes 4d8(+2d8/SL) dmg of your weapon dmg type. BnsA to move up to 30ft in a straight line to a target (no opp.atk) and make a single melee atk.",
  descriptionFull:
    "You send forth three spectral duplicates of yourself to strike down enemies within 30 feet of you. You can order them to strike one target or several. Make a melee spell attack for each spectral duplicate. On a hit, a target takes 4d8 damage of your weapon’s damage type." +
    +"\nYou can then use a bonus action to move up to 30 feet in a straight line towards one of the targets without provoking opportunity attacks, streaking through a spectral trail, and make a single melee weapon attack." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 4th level or higher, the damage your spectral duplicates inflict increases by 2d8 for each slot level above 3rd.",
};

//Spell level 4

SpellsList["dread scarecrow"] = {
  name: "Dread Scarecrow",
  classes: ["bard", "warlock", "wizard"],
  source: [["EldritchHunt", 196]],
  level: 4,
  school: "Illus",
  time: "1 a",
  range: "Self(30ft radius)",
  components: "V,S,M",
  compMaterial: "a flute made of a femur worth 50 gp",
  duration: "Conc, 1m",
  description:
    "Each crea in range make a Wis Save or become frightened. While frigtened, speed=0, is prone. If crea takes dmg, it repeat the save at the end of next turn.",
  descriptionFull:
    "You magically create the horrifying illusion of all your bones breaking and your body bending in impossible ways, accompanied by the sound of a shattered skull. Each creature of your choice in a 30-foot-radius sphere centered on you must succeed on a Wisdom saving throw or become frightened for the duration. While frightened by this spell, a creature's speed becomes 0 and it falls prone, its legs giving out under the fear. If an affected creature takes damage, it can repeat the saving throw at the end of its next turn, ending the effect on itself on a success.",
};

SpellsList["fling"] = {
  name: "Fling",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 196]],
  level: 4,
  school: "Evoc",
  time: "1 a",
  range: "Touch",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Target makes Str save. On fail: 6d10(+1d10/SL) bludgeoning dmg & pushed 120ft(+30ft/SL), stopping early if hitting a solid surface or a creature of its size or larger. Success: half dmg, no push. Creatures in the target’s path must make Dex saves: 1d10 bludgeoning dmg on fail, half on success, +1d10 dmg per size smaller than the target",
  descriptionFull:
    "You flick your finger against a creature. The target is impacted by a devastating gravitational force and must make a Strength saving throw. On a failed save, it takes 6d10(+1d10/SL) bludgeoning damage and is pushed 120ft (+30ft/SL) away from you. The push stops early if the creature hits a solid surface or is pushed into a creature of its size or larger. On a successful save, a creature takes half as much damage and isn't pushed." +
    "\nIf the target is pushed into or through the space of a creature, that creature must make a Dexterity saving throw, taking 1d10 bludgeoning damage on a failed save, or half as much damage on a successful one. This damage is increased by 1d10 per size smaller the creature is than the target." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 5th level or higher, the target takes an extra 1d10 bludgeoning damage and is pushed 30 additional feet for each slot level above 4th.",
};

SpellsList["graveyard shuffle"] = {
  name: "Graveyard Shuffle",
  classes: ["cleric", "druid"],
  source: [["EldritchHunt", 196]],
  level: 4,
  school: "Necro",
  time: "1 a",
  range: "30ft",
  components: "V,S,M",
  compMaterial:
    "a piece of spinal bone and an opal worth at least 300 gold, which the spell consumes",
  duration: "Instantaneous",
  description:
    "If hit, target takes 4d6 necro. Another crea in range regain HP=1/2 dmg dealt, if crea was dead for <1m, revive crea = dmg dealt. Doesnt work on boneless crea, crea died of old age and cant restore body parts.",
  descriptionFull:
    "You drain the bone marrow of a creature, attempting to steal its life force and transfer it to another creature of your choice. Make a ranged spell attack against a creature within range. On a hit, the target takes 4d6 necrotic damage. Choose another creature within range; it regains a number of hit points equal to half the damage dealt, or if it was dead for less than 1 minute, the creature returns to life with hit points equal to the number regained. If any of the targets do not have bones, the spell fails. This spell can't return to life a creature that has died of old age, nor can it restore any missing body parts.",
};

SpellsList["gravitational distortion"] = {
  name: "Gravitational distortion",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 197]],
  level: 4,
  school: "Trans",
  time: "1 a",
  range: "60ft(30ft radius sphere)",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Each crea in 30ft radius sphere make Str Save, if fail takes 6d6 bludgeon & is pushed 30ft in a straight line any direction, if succ, half dmg.",
  descriptionFull:
    "Reality swirls in a 30-foot-radius sphere centered on a point you can see within range. Each creature in the area must make a Strength saving throw, taking 6d6 bludgeoning damage on a failed save, or half as much damage on a successful one. Additionally, any creature that fails this saving throw is pushed 30 feet in a straight line in a direction of your choice.",
};

SpellsList["gravity barrier"] = {
  name: "Gravity Barrier",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 197]],
  level: 4,
  school: "Evoc",
  time: "1 a",
  range: "60ft",
  components: "V,S",
  duration: "Conc, 10m",
  description:
    "Make a 20x10x1ft wall, or a 20x20x1ft ringed wall and last for the duration & is difficult terrain. Ranged weap atk thru wall fails, other ranged have DIS. Crea pass thru make Str Save or take 4d8 bludgeon, knock prone, speed=0 for 1 turn.",
  descriptionFull:
    "You create a wall of increased gravity on the ground at a point you can see within range. You can make the wall up to 30 feet long, 10 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick. The wall lasts for the duration and its space is difficult terrain." +
    "\nRanged weapon attacks that pass through the wall’s space automatically fail, and other ranged attacks have disadvantage. Any creature that tries to pass through the wall’s space must succeed on a Strength saving throw or take 4d8 bludgeoning damage, be knocked prone, and have its speed reduced to 0 until the end of its turn.",
};

SpellsList["jumping jolt"] = {
  name: "Jumping Jolt",
  classes: ["sorcerer", "wizard"],
  source: [["EldritchHunt", 197]],
  level: 4,
  school: "Evoc",
  time: "1 a",
  range: "60ft",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "On hit, crea takes 4d12(+1d12/SL) lightning, and spell jumps to another crea in 20ft, make another atk roll. Spell jumps max 5 times. If miss, target takes half dmg, spell doesnt jump.",
  descriptionFull:
    "You release an arc of lighting at a creature within range. Make a ranged spell attack against the creature. On a hit, the target takes 4d12 lightning damage, and you can cause the spell to repeatedly jump to another target within 20 feet of the previous target, making a separate attack roll for each target. The spell cannot hit the same target twice, or jump to a target out of the spell's range. The spell can jump a maximum of five times. On a miss, the target takes half as much damage and the spell does not jump to a new target.",
};

SpellsList["maiden of bones"] = {
  name: "Maiden of Bones",
  classes: ["walock", "wizard"],
  source: [["EldritchHunt", 198]],
  level: 4,
  school: "Conj",
  time: "1 a",
  range: "60ft",
  components: "V,S,M",
  compMaterial: "a virgin's carpal bone",
  duration: "1m",
  description:
    "A crea make a Str Save or trapped. Crea is restrained, incapacitated, full cover, immune from outside source, and take 3d6 piercing start of its turn. At turn end, crea makes Save. Bone maiden: AC:14, 80HP, poison, psychic immune, bludgeon VULN. If maiden broke, crea = free.",
  descriptionFull:
    "A creature within range must succeed on a Strength saving throw or be trapped inside an iron maiden formed of bone that appears in its space. The creature is considered restrained, incapacitated, behind total cover, can’t be damaged by attacks or effects originating from outside, and takes 3d6 piercing damage at the start of each of its turns as spikes of bone pierce its body. At the end of each of its turns, a trapped creature can repeat the saving throw, escaping and ending the spell on a success. The bone maiden has AC 14, 80 hit points, immunity to psychic and poison damage, and vulnerability to bludgeoning damage. If the maiden is destroyed, the creature trapped inside is freed and the spell ends.",
};

SpellsList["vanishing step"] = {
  name: "Vanishing Step",
  classes: ["walock", "wizard"],
  source: [["EldritchHunt", 198]],
  level: 4,
  school: "Conj",
  time: "1 a",
  range: "60ft",
  components: "V,S,M",
  compMaterial: "the bone of an old hunter",
  duration: "1m",
  description:
    "Once per turn, use 15ft to teleport within 15ft. Fail if prone/incap. If hit by atk, use Reaction to tele. If so, -15ft speed.",
  descriptionFull:
    "For the duration, once on each of your turns, you can use 15 feet of your movement to teleport to an unoccupied space you can see within 15 feet of you. This fails if you are prone or incapacitated." +
    "\nIn addition, when you are hit by an attack or targeted by a spell, you can use your reaction to teleport to an unoccupied space you can see within 15 feet of you, causing the attack to miss you or the spell to not affect you if you leave its range or radius. When you do so, until the end of your next turn, your speed is reduced by 15 feet.",
};

SpellsList["world breaker"] = {
  name: "World Breaker",
  classes: ["druid", "ranger"],
  source: [["EldritchHunt", 198]],
  level: 4,
  school: "Evoc",
  time: "1 a",
  range: "90ft (30ft cone)",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Rip 5x5ft cube of nonmagical terrain and hurl it at a point within range, shattering in a 30ft cone. Ech crea Dex save or take 4d8 bludgeoning damage and be pushed 15ft.",
  descriptionFull:
    "You destroy your surroundings to break your foes. You rip a 5-foot by 5-foot cube of nonmagical terrain from the ground and hurl it at a point you can see within range, where it shatters in a 30-foot cone extending away from you. Each creature in the area must succeed on a Dexterity saving throw or take 4d8 bludgeoning damage and be pushed 15 feet in a straight line away from you.",
};

//5th lvl spell
SpellsList["ancestral bond"] = {
  name: "Ancestral Bond",
  classes: ["bard", "cleric", "druid", "sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 198]],
  level: 5,
  school: "Div",
  time: "1 min",
  range: "Self",
  components: "V,S,M",
  compMaterial: "the bone of a humanoid, which the spell may consume",
  duration: "Instantaneous",
  description:
    "Touch a humanoid corpse, you see a vision of its descendants and see how many living relatives of said humanoid left behind. You can select a descendant and burn the corpse to locate the person. Target make Wis Save or be located.",
  descriptionFull:
    "You touch the corpse of a humanoid, and visions of its descendants come to you, as ephemeral spirits scour the world. You learn how many living relatives the humanoid left behind and if they have any living descendants." +
    "\nIn addition, you can select one of the descendants whose existence you can feel through the spell. By destroying the corpse to amplify the power of the magic, you can attempt to determine their location. The target must make a Wisdom saving throw. On a failed save, you learn their exact location, no matter where they are.",
};

SpellsList["chisel skull"] = {
  name: "Chisel Skull",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 198]],
  level: 5,
  school: "Evoc",
  time: "1 a",
  range: "60ft",
  components: "S,M",
  compMaterial: "a piece of skull bone",
  duration: "Instantaneous",
  description:
    "Target must make Con save. Fail: 8d10 piercing and paralyzed until end of next turn. Success: half dmg, no paralyze. Immune if no skull.",
  descriptionFull:
    "Choose a creature you can see within range. You cause its skull to snap, piercing its insides. The creature must make a Constitution saving throw. On a failed save, the target takes 8d10 piercing damage and is paralyzed until the end of its next turn. On a successful save, the target takes half as much damage and isn’t paralyzed. A creature without a skull is immune to this spell.",
};

SpellsList["divine order: reveal"] = {
  name: "Divine Order: Reveal",
  classes: ["bard", "cleric", "warlock"],
  source: [["EldritchHunt", 199]],
  level: 5,
  school: "Div",
  time: "1 a",
  range: "30ft",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Target must make Cha save. On fail, you learn its origins, AbiSco, skill prof, dmg vuln, res, immunities, saving throw profs, proficiencies, alignment, and traits. Success: crea immune 24 hrs.",
  descriptionFull:
    "You attempt to gaze upon the soul of a creature within range. It must make a Charisma saving throw. On a failure, its origins are revealed to you, and you learn all of the creature’s ability scores, skill proficiencies, damage vulnerabilities, damage resistances, damage immunities, condition immunities, saving throw proficiencies, weapon and armor proficiencies, alignment, and traits. \n\nIf a creature succeeds on this saving throw, it is immune to this spell for the next 24 hours.",
};

SpellsList["forest of dread"] = {
  name: "Forest of Dread",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 199]],
  level: 5,
  school: "Conj",
  time: "1 a",
  range: "Self (30ft radius)",
  components: "V,S",
  duration: "Conc, 10m",
  description:
    "20-ft-tall bone trees sprout in 30-ft radius. Creas of choice make Dex save: 4d8 piercing on fail, half on success. Area becomes difficult terrain; creatures take 2d8 piercing per 5 ft moved. Provides half cover. You are immune.",
  descriptionFull:
    "You touch the ground under you and 20-foot-tall tree-like bones sprout from the ground in a 30-foot radius centered on you. Each creature of your choice in the radius must make a Dexterity saving throw, taking 4d8 piercing damage on a failure, or half as much damage on a success.\n\nFor the duration, the area becomes difficult terrain, and when a creature moves into or within the area, it takes 2d8 piercing damage for every 5 feet it travels; you are immune to this effect. The forest of dread provides half cover to any creatures inside the area. The bones disintegrate when the spell ends.",
};

SpellsList["starfall"] = {
  name: "Starfall",
  classes: ["druid", "sorcerer", "wizard"],
  source: [["EldritchHunt", 200]],
  level: 5,
  school: "Ench",
  time: "1 bns",
  range: "Self (30ft radius)",
  components: "V,S",
  duration: "Conc, 1m",
  description:
    "On cast & as a bonus action each turn, choose creatures within 30 ft; each takes 1d10+1(+1d6/SL) radiant dmg.",
  descriptionFull:
    "You create a violent star shower. When you cast this spell and as a bonus action on your subsequent turns, you can bring down stars on creatures of your choice within 30 feet of you. Each creature struck by a star takes 1d10 + 1 radiant damage." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d6 for each slot level above 5th.",
};

//6th lvl spell

SpellsList["erupting lightning"] = {
  name: "Erupting Lightning",
  classes: ["druid", "sorcerer", "wizard"],
  source: [["EldritchHunt", 200]],
  level: 6,
  school: "Evoc",
  time: "1 a",
  range: "120ft",
  components: "V,S,M",
  compMaterial: "the vertebrae of a Lightning Vessel barbarian",
  duration: "Instantaneous",
  description:
    "Create up to seven (+two/SL) 5-ft lightning cubes, each adjacent to another. Creatures in area make Dex save: 7d10 lightning dmg & fall prone on fail, half dmg & no prone on success.",
  descriptionFull:
    "You slam the ground with the palm of your hand, causing pillars of lightning to erupt from the ground beneath your foes. The area of lightning consists of up to seven 5-foot cubes, which you can arrange as you wish. Each cube must have at least one face adjacent to the face of another cube. Each creature in the area must make a Dexterity saving throw. It takes 7d10 lightning damage and falls prone on a failed save, or half as much damage and doesn’t fall prone on a successful one." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 7th level or higher, you can generate two additional 5-foot cubes of lightning for each slot level above 6th.",
};

SpellsList["unbound chamber"] = {
  name: "Unbound Chamber",
  classes: ["druid", "sorcerer", "wizard"],
  source: [["EldritchHunt", 200]],
  level: 6,
  school: "Trans",
  ritual: true,
  time: "10 min",
  range: "500ft",
  components: "V,S",
  duration: "8h",
  description:
    "Distort gravity in a 200x200x200 ft chamber. Creatures take no fall dmg, triple jump distance, gain fly speed = walk speed, and can hover. Chamber is perma after 365 casting days.",
  descriptionFull:
    "Using a ritual of ancient magic, you distort the gravitational balance of an enclosed space of your choice for the duration. The chamber can be of any shape up to 200 feet wide, 200 feet tall, and 200 feet long. While in the chamber, a creature doesn’t take falling damage, has its jump distance tripled, has a flying speed equal to its walking speed, and can hover.\n\nCasting this spell on the same spot every day for a year makes this effect permanent.",
};

SpellsList["void walk"] = {
  name: "Void Walk",
  classes: ["bard", "sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 204]],
  level: 6,
  school: "Trans",
  time: "1 a",
  range: "Touch",
  components: "V,S",
  duration: "8h",
  description:
    "Touch willing creature (+1 target/SL); it gains fly speed = walk speed & can hover.",
  descriptionFull:
    "You touch a willing creature. For the duration, it gains a flying speed equal to its walking speed and can hover." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 7th level or higher, you can target one additional creature for each slot level above 6th.",
};

SpellsList["wall of bones"] = {
  name: "Wall of Bones",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 205]],
  level: 6,
  school: "Conj",
  time: "1 a",
  range: "60ft",
  components: "V,S,M",
  compMaterial: "a calcified eggshell",
  duration: "Conc, 10m",
  description:
    "Create a 60x10x5 ft bone wall (AC 15, 150 HP, vuln to bludgeoning). Blocks line of sight. Creatures in its space make Dex save: 4d8 bludgeoning dmg (half on success). Sacrifice 20 HP from the wall to summon a hostile minotaur skeleton.",
  descriptionFull:
    "A grim wall of fractured bones appears at a point you choose within range. The wall appears in any orientation you choose: horizontally, vertically, or diagonally. It must rest on a solid surface. The wall can be up to 60 feet long, 10 feet high, and 5 feet thick.\n\nThe wall blocks line of sight, and creatures can’t pass through it. The wall is an object and has AC 15, 150 hit points, immunity to poison and psychic damage, and vulnerability to bludgeoning damage. Reducing it to 0 hit points destroys it.\n\nWhen the wall appears, each creature in its space is pushed out of it by the shortest route and must make a Dexterity saving throw. On a failed save, a creature takes 4d8 bludgeoning damage, or half as much damage on a successful save.\n\nUntil the spell ends, and as long as the wall has sufficient hit points, you can use an action to sacrifice 20 hit points from the wall to summon a minotaur skeleton that has murderous intent. The creature appears in an unoccupied space of your choice adjacent to the wall. When you summon a minotaur skeleton in this way, designate a creature you can see within 60 feet of it; that creature becomes the sole enemy of the summoned creature. The minotaur skeleton ignores any orders you give, tries to kill its target by any means, and is immune to being charmed. Once its target is dead, it vanishes in a pile of dust.\n\nYou can have a maximum of three creatures summoned by this spell at a time.",
};

//7th level spell

SpellsList["amputate"] = {
  name: "Amputate",
  classes: ["druid", "warlock", "wizard"],
  source: [["EldritchHunt", 202]],
  level: 7,
  school: "Evoc",
  time: "1 a",
  range: "Touch",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Melee spell attack: 10d8 slashing dmg. On hit, sever a limb unless immune to slashing dmg or has legendary actions. Such creatures take +5d8 dmg instead. Higher levels: +4d8 dmg & +2d8 alt dmg/SL above 7th.",
  descriptionFull:
    "You coat your hand with vicious osteomancy. Make a melee spell attack against a creature within your reach. On a hit, you deal 10d8 slashing damage. In addition, you rip off one of the creature's limbs (leg, arm, or other similar appendage).\n\nA creature is immune to this effect if it is immune to slashing damage, has legendary actions, or the GM decides that the creature is too big for its limbs to be cut off with this spell. Such a creature takes an extra 5d8 slashing damage instead." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 8th level or higher, the initial damage increases by 4d8, and the alternative damage by 2d8, for each slot level above 7th.",
};

SpellsList["boneyard"] = {
  name: "Boneyard",
  classes: ["cleric", "sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 202]],
  level: 7,
  school: "Necro",
  time: "24 h",
  range: "Touch",
  components: "V,S,M",
  compMaterial: "enchanted bones, incense, and herbs worth at least 1000 gold, which the spell consumes",
  duration: "Until dispelled",
  description:
    "Infuse 120-ft radius area. Know location/thoughts of undead, remove necrotic/piercing resistances. As reaction, resurrect non-undead creature that dies in area; undead obeys for 1 turn, then dies.",
  descriptionFull:
    "You touch a point and infuse an area around it with osteomancy. The area can have a radius of up to 120 feet, and the spell fails if the radius includes an area already under the effect of a *boneyard* or *hallow* spell. The affected area is subject to the following effects:\n\n- You know the exact location and hear the thoughts (if any) of any undead creature within the area, and you know if they are under someone’s control.\n- All creatures within the area lose resistance and immunity to necrotic and piercing damage.\n- As a reaction whenever a non-undead creature dies within the area, you can choose to rip its skeleton from its flesh and force it to rise again under your control. If you do, the creature is resurrected with 1 hit point, its creature type becomes undead, it becomes immune to all damage, it loses access to any legendary actions it had (if any), and you can mentally command its actions. At the end of its next turn, it dies and cannot be resurrected by any means short of a *wish* spell.",
};

SpellsList["crush"] = {
  name: "Crush",
  classes: ["sorcerer", "warlock", "wizard"],
  source: [["EldritchHunt", 202]],
  level: 7,
  school: "Evoc",
  time: "1 a",
  range: "60ft",
  components: "V,S,M",
  compMaterial: "bone powder",
  duration: "Instantaneous",
  description:
    "Target must make Str save or take 12d10 bludgeoning dmg & be stunned until start of your next turn. (+1 target/SL)",
  descriptionFull:
    "You attempt to trap one creature you can see within range in a field of gravity that compresses and folds in on itself. The target must succeed on a Strength saving throw or take 12d10 bludgeoning damage and be stunned until the start of your next turn as it reels from the pain." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 8th level or higher, you can target one additional creature for each slot level above 7th.",
};

SpellsList["divine order: transcend"] = {
  name: "Divine Order: Transcend",
  classes: ["bard", "cleric", "warlock"],
  source: [["EldritchHunt", 202]],
  level: 7,
  school: "Div",
  time: "1 a",
  range: "Self",
  components: "V,S",
  duration: "Conc, 1m",
  description:
    "Gain ability to cast any 5th-level or lower warlock spell without a slot/preparation. Cast one such spell as part of this casting. End of turn: DC 18 Int save or take 2d10 psychic dmg; spell ends early & gain short-term madness on 2 fails.",
  descriptionFull:
    "You call upon the power of the Great Ones, seeking their guidance. Until the spell ends, you gain the ability to cast any spell from the warlock spell list of 5th level or lower without expending a spell slot or needing to prepare the spell. As part of casting this spell, you can cast a spell with a casting time of an action from your newfound spell list. However, the cost of using this power is steep. At the end of each of your turns, you must succeed on a DC 18 Intelligence saving throw or take 2d10 psychic damage. If you fail this saving throw two times, the spell ends early and you gain a short-term madness." +
    AtHigherLevels +
    "When you cast this spell using a spell slot of 9th level, it no longer requires concentration, though you can choose to end the spell whenever.",
};

SpellsList["bury"] = {
  name: "Bury",
  classes: ["bard", "sorcerer", "wizard"],
  source: [["EldritchHunt", 203]],
  level: 8,
  school: "Trans",
  time: "1 a",
  range: "120ft",
  components: "V,S",
  duration: "Conc, 10m",
  description:
    "30-ft-radius, 300-ft-high cylinder. Creatures are knocked prone, can't lose prone, and take 4d6 bludgeoning dmg. Flying creatures fall prone. Strength save needed to move or act; movement costs +3 ft. End turn: prone creatures must Str save or become restrained/incapacitated in ground.",
  descriptionFull:
    "You dramatically increase the pull of gravity in a 30-foot-radius, 300-foot-high cylinder centered on a point on the ground within range. Creatures in this area are knocked prone and cannot lose this condition while there. A creature that enters the area for the first time on a turn or starts its turn there is knocked prone and takes 4d6 bludgeoning damage. A flying creature in the area immediately falls to the ground and is knocked prone. A creature must succeed on a Strength saving throw to move or perform any action. Each foot of movement while in the area costs a creature 3 extra feet." +
    "\n\nA prone creature that ends its turn in the cylinder must succeed on a Strength saving throw or be forced into the ground as gravity pulls it down. It is restrained and incapacitated by the crushing pressure and the ground around it, but it gains the benefits of three-quarters cover, as only the upper part of its body is visible. A creature can repeat the saving throw at the end of each of its turns, freeing itself from the ground on a success." +
    "\n\nIf the spell lasts for its full duration, the ground cracks under the tremendous weight generated and becomes difficult terrain. Each 5-foot-square area requires at least 1 minute to clear by hand to remove the difficult terrain.",
};

SpellsList["aspect of death"] = {
  name: "Aspect of Death",
  classes: ["warlock"],
  source: [["EldritchHunt", 203]],
  level: 9,
  school: "Conj",
  time: "1 a",
  range: "Self",
  components: "V,S,M",
  compMaterial: "the skull of a fallen hero, embedded with jewels worth at least 4,000 gp",
  duration: "Conc, 1m",
  description:
    "Summon a Large avatar of bones centered on you. Grants 3/4 cover, resistance to all dmg, immunity to grapple, and +1 to spell attack rolls/saves. Spells dealing B/P/S dmg use a slot 2 lvls higher (+2 max lvl 9).",
  descriptionFull:
    "You focus threads of magical energy around you which coalesce into the aspect of death, an avatar made of bones, which surrounds you and fights on your behalf. The avatar is Large, is centered on you, and moves with you. While it is summoned, it protects you from foes; you are considered behind three-quarters cover at all times, have resistance to all damage, are immune to being grappled, and no other creature can enter the space of the avatar." +
    "\n\nIn addition, while active, you gain a +1 bonus to spell attack rolls and saving throws, and when you cast a spell that deals bludgeoning, piercing, or slashing damage, it is cast with a spell slot 2 levels higher than the one expended (to a maximum of 9th level).",
};

SpellsList["divine order: sacrifice"] = {
  name: "Divine Order: Sacrifice",
  classes: ["bard", "cleric", "warlock"],
  source: [["EldritchHunt", 204]],
  level: 9,
  school: "Conj",
  time: "1 a",
  range: "120 ft",
  components: "V,S",
  duration: "Conc, 1m",
  description:
    "Target within range takes 8d6 psychic dmg, then makes a Cha save. On fail: pulled into void, incapacitated, takes 3d6 cold & 3d6 psychic dmg/turn, DC 20 Int save vs madness. Success: long-term madness.",
  descriptionFull:
    "When you cast this spell, you create a crack in the world, letting the will of a Great One smother a creature of your choice within range. The direct contact with the eldritch being causes the target to take 8d6 psychic damage, and it must make a Charisma saving throw. On a failure, the creature is pulled in through the tear to the cosmos. On a success, it isn't pulled but gains a long-term madness, and the spell ends." +
    "\n\nWhile in the cosmos, the target is incapacitated. At the beginning of each of its turns while there, it takes 3d6 cold damage, 3d6 psychic damage, and must succeed on a DC 20 Intelligence saving throw or gain a short-term madness." +
    "\n\nWhen the spell ends, if the target is still alive, it reappears in the space it left or in the nearest unoccupied space if that space is occupied. If the creature is killed while in the void, its corpse never returns. A body that disappears in this way can never be recovered, not even with a wish spell." +
    "\n\nIf your concentration on the spell ends early, you must succeed on a DC 20 Intelligence saving throw or gain a long-term madness as the eldritch whispers revolt and assault your mind." +
    "\n\nWhen the spell ends, roll a d100. On a 1, the breach doesn’t close and instead only expands, threatening to absorb the entire world.",
};

SpellsList["osteophagia"] = {
  name: "Osteophagia",
  classes: ["warlock", "wizard"],
  source: [["EldritchHunt", 212]],
  level: 9,
  school: "Conj",
  time: "1 a",
  range: "Touch",
  components: "V,S",
  duration: "Instantaneous",
  description:
    "Target within reach must make a Con save or die. On success: 10d6 necrotic dmg. Creatures without bones and those with CR/level >= caster’s are immune.",
  descriptionFull:
    "The most lethal osteomantic power. You can cause the skeleton of a creature to liquefy in a matter of seconds, causing the body to collapse in on itself. Choose a creature within your reach; it must succeed on a Constitution saving throw or die." +
    "\n\nA successful save prevents the death by skeletal collapse, but the creature still takes 10d6 necrotic damage. Creatures without bones and creatures whose CR or character level is equal to or higher than the caster’s CR or character level are immune to this spell.",
};

AmmoList["modern bullet"] = {
  name: "Bullets, Modern",
  source: [["D", 268]],
  weight: 0.1,
  icon: "Bullets",
  checks: [".Bullet"],
  display: 50,
  invName: "Bullets, modern",
  alternatives: [/^(?=.*bullet)(?=.*modern).*$/i],
  defaultExcluded: true,
};

MagicItemsList["bag of cannonballs"] = {
  name: "Bag of Cannonballs",
  source: [["EldritchHunt", 205]],
  type: "wonderous item",
  rarity: "uncommon",
  description:
    "You store cannonballs in this bag (max 100) and take out or store 3 cannonballs each turn (no action required)",
  descriptionFull:
    "You can store up to 100 cannonballs in this bag. The bag weighs 3 pounds, no matter how many cannonballs are stored. You can store or take out up to 3 cannonballs at a time once on each of your turns with no actions required.",
  weight: 3, // weight of bag
};

MagicItemsList["damascena"] = {
  name: "Damascena",
  source: [["EldritchHunt", 205]],
  type: "wonderous item",
  rarity: "uncommon",
  description:
    "As an action, project in a 15ft cone flame. Creature has to make a Dex save (11 + prof bonus), if fail take 4d4 + prof bonus number of d4s, on success, half the dmg. Each use costs 5 lead bullets.",
  descriptionFull:
    "As an action, you can cause the damascena to project blue flames in a 15-foot cone in front of you. Each creature in the cone must make a Dexterity saving throw (DC 11 + your proficiency bonus), taking 4d4 fire damage + a number of d4s equal to your proficiency bonus on a failed save, or half as much damage on a successful one. Each use of the damascena consumes 5 lead bullets.",
  action: [["action", ""]],
};

MagicItemsList["hand of glory"] = {
  name: "Hand of Glory",
  source: [["EldritchHunt", 206]],
  type: "wonderous item",
  rarity: "very rare",
  description:
    "Add 1 attunement slot only for ring type. Can use an action to turn invisible. Cast 10ft bright light only for the holder, can cast knock within the same radius.",
  descriptionFull:
    "A hand of glory is crafted from the hand of a hanged scourgeborne after it was covered in corpse wax and left to ferment in a casket. \nWhile holding the hand of glory, you can attune to one additional magical item. This magical item can only be a ring, and must be worn on the hand of glory. \nWhile holding the hand, you can use an action to set a digit of the hand ablaze and cast the invisibility spell on yourself. While a finger is ablaze, it casts bright light in a 10-foot radius that is only visible to the wearer of the hand. The spell ends early if the flame is extinguished by the wearer (no action required). In addition, while a finger is ablaze, you can cast the knock spell at will on objects within the radius of the light. The hand has 5 digits and regenerates 1 burnt digit daily at dusk.",
  action: [["action", ""]],
  usages: 5,
  recovery: "dusk", //TODO: recheck if this is working
  additional: "regains 1",
  spellcastingBonus: [
    {
      name: "Invisiblility (hand candle on)",
      spells: ["invisiblility"],
      selection: ["invisiblility"],
      firstCol: 1,
    },
    {
      name: "Knock (hand candle on)",
      spells: ["knock"],
      selection: ["knock"],
      firstCol: 1,
    },
  ],
};

MagicItemsList["white fungic tea"] = {
  name: "White Fungic Tea",
  source: [["EldritchHunt", 206]],
  type: "wonderous item",
  rarity: "uncommon",
  description:
    "Relieve the effects of one short-term madness for 1 hour or til' the madness ends. You must make a Con Save (DC 12), on failure, you puke the tea and gain nothing. The tea can be poured into 2d4 cups.",
  descriptionFull:
    "Known for temporarily alleviating the effects of madness, the darker the tea, the more potent and challenging to brew. Once ingested, the afflicted individual is relieved of the affected madness for 1 hour or until the madness ends, whichever is shorter. However, upon swallowing the tea, you must make a Constitution saving throw with a DC listed in the table below. On a failure, you can’t stomach the appalling taste, regurgitate the tea, and don’t gain the benefits. \nThe tea is made in kettles that can pour up to 2d4 cups.",
  action: [["action", ""]],
};

MagicItemsList["yellow fungic tea"] = {
  name: "Yellow Fungic Tea",
  source: [["EldritchHunt", 206]],
  type: "wonderous item",
  rarity: "rare",
  description:
    "Relieve the effects of all short-term madness and one long-term for 1 hour or til' the madness ends. You must make a Con Save (DC 14), on failure, you puke the tea and gain nothing. The tea can be poured into 2d4 cups.",
  descriptionFull:
    "Known for temporarily alleviating the effects of madness, the darker the tea, the more potent and challenging to brew. Once ingested, the afflicted individual is relieved of the affected madness for 1 hour or until the madness ends, whichever is shorter. However, upon swallowing the tea, you must make a Constitution saving throw with a DC listed in the table below. On a failure, you can’t stomach the appalling taste, regurgitate the tea, and don’t gain the benefits. \nThe tea is made in kettles that can pour up to 2d4 cups.",
  action: [["action", ""]],
};

MagicItemsList["blue fungic tea"] = {
  name: "Blue Fungic Tea",
  source: [["EldritchHunt", 206]],
  type: "wonderous item",
  rarity: "very rare",
  description:
    "Relieve the effects of all short-term madness and long-term for 1 hour or til' the madness ends. You must make a Con Save (DC 16), on failure, you puke the tea and gain nothing. The tea can be poured into 2d4 cups.",
  descriptionFull:
    "Known for temporarily alleviating the effects of madness, the darker the tea, the more potent and challenging to brew. Once ingested, the afflicted individual is relieved of the affected madness for 1 hour or until the madness ends, whichever is shorter. However, upon swallowing the tea, you must make a Constitution saving throw with a DC listed in the table below. On a failure, you can’t stomach the appalling taste, regurgitate the tea, and don’t gain the benefits. \nThe tea is made in kettles that can pour up to 2d4 cups.",
  action: [["action", ""]],
};

MagicItemsList["black fungic tea"] = {
  name: "Black Fungic Tea",
  source: [["EldritchHunt", 206]],
  type: "wonderous item",
  rarity: "legendary",
  description:
    "Relieve the effects of all short-term, long-term and one indefinite madness for 1 hour or til' the madness ends. You must make a Con Save (DC 16), on failure, you puke the tea and gain nothing. The tea can be poured into 2d4 cups.",
  descriptionFull:
    "Known for temporarily alleviating the effects of madness, the darker the tea, the more potent and challenging to brew. Once ingested, the afflicted individual is relieved of the affected madness for 1 hour or until the madness ends, whichever is shorter. However, upon swallowing the tea, you must make a Constitution saving throw with a DC listed in the table below. On a failure, you can’t stomach the appalling taste, regurgitate the tea, and don’t gain the benefits. \nThe tea is made in kettles that can pour up to 2d4 cups.",
  action: [["action", ""]],
};