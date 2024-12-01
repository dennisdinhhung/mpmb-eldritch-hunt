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
    "All crea in the sphere gain x2 jump distance, speed +10ft, ADV on Acrobatics, 0 fall dmg ",
  descriptionFull:
    "You focus your powers to lessen the call of gravity in a 60-foot-radius sphere that moves with you, centered on you. All creatures of your choice in the sphere have their jump distance doubled and their speed increased by 10 feet. They also have advantage on Acrobatics checks and ignore falling damage if they end their fall within the sphere.",
};

//TODO: ITEMS

// GearList["rain catcher"] = {
// 	infoname : "Rain catcher [1 gp]",
// 	name : "Rain catcher",
// 	source : [["ToA", 32]],
// 	amount : 1,
// 	weight : 5
// };

// WeaponsList["yklwa"] = {
// 	regExpSearch : /yklwa/i,
// 	name : "Yklwa",
// 	source : [["ToA", 32]],
// 	list : "melee",
// 	ability : 1,
// 	type : "Simple",
// 	damage : [1, 8, "piercing"],
// 	range : "Melee, 10/30 ft",
// 	weight : 3,
// 	description : "Thrown",
// 	monkweapon : true,
// 	abilitytodamage : true
// };

// AmmoList["oversized arrow"] = {
// 	name : "Oversized Arrows",
// 	source : [["WDH", 201]],
// 	icon : "Arrows",
// 	weight : 0.10,
// 	defaultExcluded : true
// };

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
