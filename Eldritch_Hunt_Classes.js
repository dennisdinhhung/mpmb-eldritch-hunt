if (sheetVersion < 13001012) {
  throw "This script was made for a newer version of the sheet (v13.1.14). Please use the latest version and try again.\nYou can get the latest version at www.flapkan.com.";
}
var iFileName = "Eldritch_Hunt_Classes.js";
RequiredSheetVersion("13.1.12");

SourceList["EldritchHunt"] = {
  name: "Steinhardt's Guide to the Eldritch Hunt",
  abbreviation: "SGttEH",
  abbreviationSpellsheet: "SGttEH",
  group: "3rd Party Campaign Sourcebooks",
  date: "2024/07/01",
};

//Warlock: Pact of the Trigger
AddWarlockPactBoon("Pact of the Trigger", {
  name: "Pact of the Trigger",
  source: [["EldritchHunt", 168]],
  description: desc([
    "You can choose the form that this spellcasting focus takes each time you create it. It can either be a Revolver or a Sniper (detailed below).",
    "Your hex gun disappears if it is more than 5 feet away from you for 1 minute. It also disappears if you use this feature again, if you dismiss it (no action required), or if you die.",
    "Your hex gun acts as a spellcasting focus, and when you cast cantrips with it, it channels them as bullets (these still count as spells). Instead of increasing the damage of the cantrip when you reach certain levels, you can cast the cantrip additional times as part of the same action (except for Eldritch Blast, which is cast as normal). To be cast in this way, the cantrip must deal damage, must make a spell attack or require a saving throw, and must have a range other than self.",
    "When you cast a cantrip in this manner, you cast it 2 times at 5th level, 3 times at 11th level, and 4 times at 17th level. The cantrip can deal its damage more than once, but its other effects can't be applied again.",
    //Revolver Form
    "Revolver Form: Being within 5 feet of a hostile creature doesn’t impose disadvantage on your ranged spell attack rolls cast through the hex gun. While wielding this weapon, you know the shocking grasp cantrip.",
    //Sniper Form
    "Sniper Form: Your ranged spell attack rolls cast through the hex gun have their range doubled and ignore half-cover. While wielding this weapon, you know the ray of frost cantrip.",
  ]),
  spellcastingBonus: [
    {
      name: "Pact of the Trigger (Revolver)",
      spells: ["shocking grasp"],
      selection: ["shocking grasp"],
    },
    {
      name: "Pact of the Trigger (Sniper)",
      spells: ["ray of frost"],
      selection: ["ray of frost"],
    },
  ],
});

AddWarlockInvocation("Agonizing Shots (prereq: Pact of the Trigger feature)", {
  name: "Agonizing Shots",
  source: [["EldritchHunt", 168]],
  submenu: "[improves Pact of the Trigger]",
  description:
    "When you cast a cantrip with your hex gun, add your Charisma modifier to the damage it deals on a hit (if you don't already add your Charisma modifier to it).",
  prereqeval: function (v) {
    return (
      GetFeatureChoice("class", "warlock", "pact boon").indexOf(
        "pact of the trigger"
      ) !== -1
    );
  },
});

AddWarlockInvocation(
  "Bullet Hell (prereq: level 5 warlock, Pact of the Trigger feature (Revolver Form))",
  {
    name: "Bullet Hell",
    source: [["EldritchHunt", 168]],
    submenu: "[improves Pact of the Trigger]",
    description:
      "As a bonus action, you temporarily duplicate your hex gun to unleash a flurry of bullets. All creatures within a 15-foot cone in front of you must succeed a Dexterity saving throw against your spell save DC or take 2d10 force damage. This damage increases to 3d10 at 11th level and 4d10 at 17th level. To use this bonus action, you need to be holding your hex gun in one hand and have the other hand free.\nYou can use this invocation a number of times equal to twice your Charisma modifier (minimum of twice), and you regain all expended uses when you finish a long rest.",
    action: [["bonus action", ""]],
    prereqeval: function (v) {
      return (
        classes.known.warlock.level >= 5 &&
        GetFeatureChoice("class", "warlock", "pact boon").indexOf(
          "pact of the trigger"
        ) !== -1
      );
    },
    usages: "Two times Charisma modifer",
    usagescalc: "event.value = Math.max(2, What('Cha Mod')*2)",
    recovery: "long rest",
    oncelr: true,
  }
);

AddWarlockInvocation(
  "Crippling Shot (prereq: Pact of the Trigger feature (Revolver Form))",
  {
    name: "Crippling Shot",
    source: [["EldritchHunt", 168]],
    submenu: "[improves Pact of the Trigger]",
    description:
      "Once on each of your turns when you damage a creature with an attack made using your hex gun, you can force it to make a Strength saving throw against your spell save DC or fall prone and have its speed reduced to 0 until the start of your next turn.\nYou can use this invocation a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a long rest.",
    prereqeval: function (v) {
      return (
        GetFeatureChoice("class", "warlock", "pact boon").indexOf(
          "pact of the trigger"
        ) !== -1
      );
    },
    usages: "Cha Mod",
    usagescalc: "event.value = Math.max(1, What('Cha Mod'))",
    recovery: "long rest",
    oncelr: true,
  }
);

AddWarlockInvocation(
  "Dead Eye (prereq: level 15 warlock, Pact of the Trigger feature (Sniper Form))",
  {
    name: "Dead Eye",
    source: [["EldritchHunt", 168]],
    submenu: "[improves Pact of the Trigger]",
    description:
      "If you haven't moved this turn, you can take aim as a bonus action, reducing your speed to 0 and granting you advantage on all attacks you make using your hex gun until the end of your turn.",
    prereqeval: function (v) {
      return (
        classes.known.warlock.level >= 15 &&
        GetFeatureChoice("class", "warlock", "pact boon").indexOf(
          "pact of the trigger"
        ) !== -1
      );
    },
  }
);

AddWarlockInvocation(
  "Headshots (prereq: level 9 warlock, Pact of the Trigger feature (Sniper Form))",
  {
    name: "Headshots",
    source: [["EldritchHunt", 168]],
    submenu: "[improves Pact of the Trigger]",
    action: [["bonus action", ""]],
    description:
      "As a bonus action, you can enhance your focus to see the weak spots of your foes. For the next minute, attacks you make using your hex gun score a critical hit on a roll of 19 or 20. Once you've used this invocation, you can't use it again until you finish a short or long rest.",
    prereqeval: function (v) {
      return (
        classes.known.warlock.level >= 9 &&
        GetFeatureChoice("class", "warlock", "pact boon").indexOf(
          "pact of the trigger"
        ) !== -1
      );
    },
    usages: 1,
    recovery: "short rest",
    oncesr: true,
  }
);

AddWarlockInvocation(
  "Quickstep (prereq: level 7 warlock, Pact of the Trigger feature)",
  {
    name: "Quick Step",
    source: [["EldritchHunt", 169]],
    submenu: "[improves Pact of the Trigger]",
    action: [["reaction", ""]],
    description:
      "Your reflexes are honed. As a reaction, when an enemy makes a melee attack against you, before being hit, if your speed isn't 0, you can move 5 feet away from the foe without triggering opportunity attacks, potentially avoiding the attack if you leave its range.\nYou can use this invocation a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a long rest.",
    prereqeval: function (v) {
      return (
        classes.known.warlock.level >= 7 &&
        GetFeatureChoice("class", "warlock", "pact boon").indexOf(
          "pact of the trigger"
        ) !== -1
      );
    },
    usages: "Cha Mod",
    usagescalc: "event.value = Math.max(1, What('Cha Mod'))",
    recovery: "long rest",
    oncelr: true,
  }
);

AddWarlockInvocation("Reckless Fire (prereq: Pact of the Trigger feature)", {
  name: "Reckless Fire",
  source: [["EldritchHunt", 169]],
  submenu: "[improves Pact of the Trigger]",
  description:
    "Your shots are like a rain of lead. When you roll a 1 or 2 on a damage die for a cantrip you cast with your hex gun, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2.",
  prereqeval: function (v) {
    return (
      GetFeatureChoice("class", "warlock", "pact boon").indexOf(
        "pact of the trigger"
      ) !== -1
    );
  },
  usages: "Cha Mod",
  usagescalc: "event.value = Math.max(1, What('Cha Mod'))",
  recovery: "long rest",
  oncelr: true,
});

AddWarlockInvocation(
  "Repeating Cantrips (prereq: level 5 warlock, Pact of the Trigger feature)",
  {
    name: "Repeating Cantrips",
    source: [["EldritchHunt", 169]],
    submenu: "[improves Pact of the Trigger]",
    description:
      "When you fire a cantrip through your hex gun, its non- damaging effects (such as the speed reduction from ray of frost) can apply multiple times but not more than once per creature.",
    prereqeval: function (v) {
      return (
        classes.known.warlock.level >= 5 &&
        GetFeatureChoice("class", "warlock", "pact boon").indexOf(
          "pact of the trigger"
        ) !== -1
      );
    },
  }
);

AddWarlockInvocation(
  "Ricochet (prereq: level 7 warlock, Pact of the Trigger feature)",
  {
    name: "Ricochet",
    source: [["EldritchHunt", 169]],
    submenu: "[improves Pact of the Trigger]",
    description:
      "Until the end of your turn, you enhance your hex gun. When you hit a creature with a cantrip cast with your hex gun, you can immediately cause the hit to wound a second creature within 15 feet of the original target. The second target takes damage (of the type of the cantrip) equal to your Charisma modifier (minimum 1).\nYou can use this invocation to enhance your hex gun a number of times equal to your Charisma modifier, and you regain all expended uses when you finish a short or long rest.",
    prereqeval: function (v) {
      return (
        classes.known.warlock.level >= 7 &&
        GetFeatureChoice("class", "warlock", "pact boon").indexOf(
          "pact of the trigger"
        ) !== -1
      );
    },
    usages: "Cha Mod",
    usagescalc: "event.value = What('Cha Mod')",
    recovery: "short rest",
    oncelr: true,
  }
);

AddWarlockInvocation(
  "Riposte (prereq: level 7 warlock, Pact of the Trigger feature (Revolver Form))",
  {
    name: "Riposte",
    source: [["EldritchHunt", 169]],
    submenu: "[improves Pact of the Trigger]",
    description:
      "When an enemy attacks you with a melee attack, you can fire a special bullet to counter it as a reaction before being hit. Make a melee or ranged spell attack. On a hit, the enemy takes 1d10 force damage, its attack fails, and it is stunned until the end of its current turn.\nOnce you’ve used this invocation to damage an enemy, you can’t use it again until you finish a short or long rest.",
    prereqeval: function (v) {
      return (
        classes.known.warlock.level >= 7 &&
        GetFeatureChoice("class", "warlock", "pact boon").indexOf(
          "pact of the trigger"
        ) !== -1
      );
    },
    usages: 1,
    recovery: "short rest",
    oncesr: true,
  }
);

//Barbarian

//Path of the Earthbreaker
AddSubClass("barbarian", "path of the earthbreaker", {
  regExpSearch:
    /^(?=.*earthbreaker)(?=.*(warrior|marauder|barbarian|viking|(norse|tribes?|clans?)(wo)?m(a|e)n)).*$/i,
  subname: "Path of the Earthbreaker",
  source: [["EldritchHunt", 128]],
  abilitySave: 1, //Strength save DC (from Gravitational Rage)
  features: {
    "subclassfeature3.1": {
      name: "Overwhelming Power",
      source: [["EldritchHunt", 128]],
      minlevel: 3,
      description: desc([
        "Starting at 3rd level, you have learned to channel destructive energy through your fists and other body parts.\nWhen you hit with an unarmed strike, you can deal bludgeoning damage equal to 1d6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.\nThis die increases to 1d8 at 6th level, 1d10 at 10th level, and 1d12 at 14th level.\nWhen you make an unarmed strike against a creature on your turn, you can use a bonus action to make another unarmed strike against the same creature.",
        "Your sheer power puts a massive strain on most weapons, shattering them.\nWhen you hit with a melee attack with a nonmagical weapon, the weapon breaks in your hand and can’t be used to make attacks until it is repaired.\nIn addition, the range of thrown weapons is doubled for you.\nIf you hit with a ranged attack with a thrown weapon, you can use the damage die above in place of the weapon’s usual damage dice.",
      ]),
      calcChanges: {
        atkAdd: [
          function (fields, v) {
            if (v.baseWeaponName == "unarmed strike") {
              if (fields.Damage_Die == 1 || fields.Damage_Die == "1d4")
                fields.Damage_Die = "1d6";
              if (classes.known.barbarian && classes.known.barbarian.level > 5)
                fields.Damage_Die = "1d8";
              if (classes.known.barbarian && classes.known.barbarian.level > 9)
                fields.Damage_Die = "1d10";
              if (classes.known.barbarian && classes.known.barbarian.level > 13)
                fields.Damage_Die = "1d12";

              fields.Description =
                (fields.Description ? "; " : "") + "Bludgeoning"; //! check this out again
            }
          },
          "My unarmed strikes deal 1d6 damage instead of 1. This die increases to 1d8 at 6th level, 1d10 at 10th level, and 1d12 at 14th level",
          1,
        ],
      },
    },
    "subclassfeature3.2": {
      name: "Gravitational Rage",
      source: [["EldritchHunt", 128]],
      minlevel: 3,
      description: desc([
        "At 3rd level, once per turn, when you deal damage to a creature with an unarmed strike, you can choose one of the following effects. These effects use your Earthbreaker save DC.",
        "• Burying Hands. The target must succeed on a Strength saving throw or have its speed reduced to 0 until the start of your next turn, as you partially bury it in the ground. If the target fails the saving throw by 5 or more, it is also knocked prone. If the target isn’t on the ground when it fails this save, it immediately falls instead, even if it can hover.",
        "• Bulldozing Punch. You push the target 10 feet away from you or upward. If pushed into an obstacle or another creature, the target takes bludgeoning damage equal to your Strength modifier (minimum of 1). Creatures with a Strength score equal to or greater than yours can make a Strength saving throw to resist this effect, avoiding it on a success. If you push the target upward, it can make a DC 10 Dexterity saving throw, avoiding any fall damage on a success.",
      ]),
    },
    "subclassfeature6.1": {
      name: "Ruination",
      source: [["EldritchHunt", 129]],
      minlevel: 6,
      description: desc([
        "Starting at 6th level, the strength you wield is capable of toppling the arcane rules of the world. Your unarmed strikes count as magical for the purpose of overcoming resistance and immunity.",
        "In addition, when you hit a physical barrier created by a spell with an unarmed strike, such as the effect of a wall of force or forcecage spell, or any other wall spell (such as wall of fire, gravity wall󨖙, or prismatic wall), you can make a Strength check (DC = 10 + the spell’s level), rupturing the arcane and dispelling the spell on a success.",
      ]),
    },
    "subclassfeature6.2": {
      name: "Imperious Gravity",
      source: [["EldritchHunt", 129]],
      minlevel: 6,
      description: desc([
        "Also at 6th level, you increase your mastery over gravity. On each of your turns while raging, you can use a bonus action to create one of the following effects, using your Earthbreaker save DC. The range of these abilities, and the distance they move creatures, doubles at 14th level",
        "• Attractive Field. You unleash a gravitational wave. Each creature in a 15-foot cone originating from you must succeed on a Strength saving throw or be pulled up to 10 feet towards you.",
        "• Repulsive Field. You condense a bubble of gravity around yourself. The next time a creature would hit you with a melee attack, the bubble bursts in a roaring explosion. Each creature within 10 feet of you must succeed on a Strength saving throw or be pushed up to 10 feet away from you. If this pushes the attacker beyond its reach of you, the attack misses you. If the bubble doesn’t burst by the start of your next turn, it harmlessly dissipates.",
        "• Stomp. You stomp the ground, causing a destructive quake in a 10-foot-long, 5-foot-wide line on the ground originating from you. Each creature in the area must succeed on a Dexterity saving throw or take 1d4 bludgeoning damage and have disadvantage on its next Strength saving throw before the start of your next turn as it is thrown off balance. Additionally, the ground in that area becomes difficult terrain until cleared. Each 5-foot-square portion of the area requires at least 1 minute to clear by hand.",
      ]),
    },
    subclassfeature10: {
      name: "Unyielding",
      source: [["EldritchHunt", 129]],
      minlevel: 10,
      description: desc([
        "Beginning at 10th level, your unarmed strikes deal double damage to structures and you can ignore difficult terrain.",
        "In addition, your crushing power seeps into all the aspects of your life. You can add your Constitution modifier to any Strength checks and Intimidation checks you make.",
      ]),
    },
    subclassfeature14: {
      name: "World Breaker",
      source: [["EldritchHunt", 129]],
      minlevel: 14,
      usages: "Str Mod",
      usagescalc: "event.value = What('Str Mod')",
      recovery: "short rest",
      oncesr: true,
      description: desc([
        "Once you reach 14th level, your blows can level the world. Once on each of your turns while you are raging, when you make a melee attack, you can fracture the world. On a hit, the target takes an extra 3d12 bludgeoning damage and is pushed up to 30 feet away from you. In addition, hit or miss, the area in a 90-foot cone in front of you breaks, as per the earthquake spell (save DC equals your Earthbreaker save DC), although the spell only lasts until the start of your next turn, doesn’t require concentration, and can create only 1d4 fissures in the area.",
        "You can use this feature a number of times equal to your Strength modifier, and you regain all expended uses when you finish a short or long rest.",
      ]),
    },
  },
});

//Path of the Lightning Vessel
AddSubClass("barbarian", "path of the lightning vessel", {
  regExpSearch:
    /^(?=.*\blightning\b)(?=.*\bvessel\b)(?=.*(warrior|marauder|barbarian|viking|(norse|tribes?|clans?)(wo)?m(a|e)n)).*$/i,
  subname: "Path of the Lightning Vessel",
  source: [["EldritchHunt", 130]],
  abilitySave: 3, //Consitution save DC
  features: {
    lightningvessel3: {
      name: "Overwhelming Power",
      source: [["EldritchHunt", 128]],
      minlevel: 3,
      dmgres: ["Lightning", "Lightning; if existed, reduce by another 1d6"],
      description: desc([
        "While raging, you can unleash the lightning within. For the duration of your rage, you can use your bonus action to unleash various powers.",
        "• Electrified Chains. You can use your bonus action to create chains of lightning that wrap around your weapon. The next time you hit a creature this turn, it takes additional lightning damage equal to twice your Constitution modifier and becomes ensnared by the chains, which anchor to the floor, until the start of your next turn. Each time it attempts to move more than 10 feet while ensnared, it must make an Athletics check contested by your Athletics check, freeing itself on a success. On a failure, it takes the lightning damage again and its speed is reduced to 0 until the start of your next turn.",
        "• Fulgurant Strike. When you hit a creature with a melee weapon attack, you can leave the weapon embedded in their chest for a brief moment and immediately use a bonus action to call down lightning from the heavens to strike them, using the weapon as a conduit, before retrieving it. The target takes lightning damage equal to twice your Constitution modifier, and all creatures within a 5-foot radius must succeed on a Dexterity saving throw against your Vessel save DC or also take that damage. You have advantage on this saving throw.",
        "• Lightning Step. As a bonus action, you can move up to half your speed. During this rush, your body becomes supercharged; if you end this movement within 5 feet of a creature, it takes lightning damage equal to twice your Constitution modifier as the lightning leaps to them. If there are multiple creatures, choose one that takes the damage.",
      ]),
    },
    lightningvessel6: {
      name: "Roaring Crash",
      source: [["EldritchHunt", 131]],
      minlevel: 6,
      description: desc([
        "At 6th level, you are ready to leap into battle at a moment’s notice, crashing down on your foes like thunder from the heavens. As part of entering your rage, you can leap into the air, before crashing down on a point on the ground that you can see within 30 feet of you that isn't occupied by a Huge or larger creature. All creatures in a 10-foot radius centered on that point must succeed on a Dexterity saving throw against your Vessel save DC or take a number of d8s of lightning damage equal to your Constitution modifier (minimum of 1d8), or half as much damage on a success.",
        "If a creature is in the space on which you land, they have disadvantage on the saving throw and are pushed 5 feet out of your space into an unoccupied space of their choice. If no unoccupied space is within range, the creature instead falls prone in your space.",
        "At 10th level, the distance you can leap increases to 60 feet, and you can land in spaces occupied by Huge creatures. At 14th level, the distance increases to 90 feet, and you can land in spaces occupied by Gargantuan creatures.",
      ]),
    },
    lightningvessel10: {
      name: "Lightning Reflexes",
      source: [["EldritchHunt", 131]],
      minlevel: 10,
      description: desc([
        "At 10th level, the lightning you wield enhances your reflexes past what your body could normally handle. As a result, whenever you make a Dexterity check, you gain a bonus to the check equal to your Constitution modifier (minimum of +1).",
        "In addition, while raging, you can use Lightning Step once on each of your turn without using a bonus action.",
      ]),
    },
    lightningvessel14: {
      name: "Electric Beast",
      source: [["EldritchHunt", 131]],
      minlevel: 14,
      description: desc([
        "The damage from your Galvanic Heart’s abilities increases to three times your Constitution modifier, and they improve in the following way:",
        "• Electrified Chains. The creature cannot move more than 5 feet without attempting the check, and on a failure, they can’t take reactions until the start of your next turn.",
        "• Fulgurant Strike. The lightning strike’s radius increases to 10 feet, and you can choose a number of creatures equal to your Constitution modifier that automatically succeed on the saving throw.",
        "• Lightning Step. You can now move up to your full speed, and you can choose to merge with the lightning, teleporting the distance moved instead.",
      ]),
    },
  },
});

//Bard: College of the Apocalypse
AddSubClass("bard", "college of the apocalypse", {
  regExpSearch:
    /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*apocalypse).*$/i,
  subname: "College of the Apocalypse",
  source: [["EldritchHunt", 133]],
  features: {
    "apocalypse3.1": {
      name: "Endless Symphony",
      source: [["EldritchHunt", 133]],
      minlevel: 3,
      additional: [
        "d6",
        "d6",
        "d6",
        "d6",
        "d6",
        "d6",
        "d6",
        "d6",
        "d6",
        "d8",
        "d8",
        "d8",
        "d8",
        "d8",
        "d10",
        "d10",
        "d10",
        "d10",
        "d10",
        "d10",
      ],
      usages: "Charisma modifier per ",
      usagescalc:
        "event.value = Math.max(1, What('Cha Mod') + (classes.known.bard.level < 3 ? 0 : (classes.known.bard.level < 6 ? 1 : (classes.known.bard.level < 14 ? 2 : 3))));",
      recovery: levels.map(function (n) {
        return n < 5 ? "long rest" : "short rest"; //short rest at level 5 due to Font of Inspiration
      }),
      action: ["bonus action", ""],
      description:
        "At 3rd level, you gain another use of your Bardic Inspiration feature (and one each at 6th and 14th).\nIn exchange, your Bardic Inspiration die doesn’t change at 5th level, remaining a d6; it becomes a d8 at 10th level, and a d10 at 15th level.",
    },
    "apocalypse3.2": {
      name: "Eldritch Choir",
      extraname: "Eldritch Choir",
      source: [["EldritchHunt", 133]],
      minlevel: 3,
      description: desc([
        'Use the "Choose Feature" button above to add Eldritch Melodies to the third page',
        "You know 2 Eldritch Melodies at level 3. You learn one additional Eldritch Melody of your choice at 6th and 14th level.",
        "You can use a melody as an action, expending one use of your Bardic Inspiration. After you use a melody, you can’t use that melody again until you finish a short or long rest. If a melody requires a saving throw, it uses your spell save DC. For a creature to become affected by one of your melodies, it must be able to hear you when you take the action.",
        "When you finish a long rest, you can delve into what lies beyond the veil, replacing one or more melodies you know with another one. Each time you attempt to replace a melody, make a DC 17 Charisma saving throw. On a failed save, you lose control over your mental journey into the void; you gain one short-term madness, don’t replace that melody, and you can’t replace any other melodies until you finish a long rest.",
      ]),
      additional: levels.map(function (n) {
        return n < 2 ? "" : (n < 4 ? 2 : n < 7 ? 3 : 4) + " melodies known";
      }),
      extrachoices: [
        "Ballad of the Nameless City (prereq: 3rd level)",
        "Concord of the Depths (prereq: 3rd level)",
        "Epode For Whom the Bell Tolls (prereq: 3rd level)",
        "Transcendence of Flesh (prereq: 3rd level)",
        "Aria of the Reviled Stalker (prereq: 6th level)",
        "Ode to Subjugation (prereq: 6th level)",
        "Requiem of Chaos (prereq: 6th level)",
        "Song of Abject Birth (prereq: 6th level)",
        "Assonance of Dreams (prereq: 14th level)",
        "Euphony of Self-Destruction (prereq: 14th level)",
        "Nightmare of the Abyss (prereq: 14th level)",
        "Whispers of the Flesh-Defiler (prereq: 14th level)",
      ],
      extraTimes: levels.map(function (n) {
        return n < 4 ? 2 : n < 7 ? 3 : 4;
      }),
      action: [["action", ""]],
      "ballad of the nameless city (prereq: 3rd level)": {
        name: "Ballad of the Nameless City",
        source: [["EldritchHunt", 134]],
        description: desc([
          "You channel the name of the lost city of the Great Ones, warping reality. Each creature within 30 feet of you must succeed on a Strength saving throw or be pushed up to 10 feet in a direction of your choice and knocked prone.",
          "The number of feet up to which a creature is pushed increases to 20 feet at 6th level and 30 feet at 14th level.",
        ]),
        minlevel: 3,
        // prereqeval : function(v) { return classes.known.bard.level >= 3; },
      },
      "concord of the depths (prereq: 3rd level)": {
        name: "Concord of the Depths",
        source: [["EldritchHunt", 134]],
        description: desc([
          "Choose one creature within 60 feet of you. It must succeed on a Wisdom saving throw or become incapacitated and have its speed reduced to 0 for 1 minute, until it takes damage, or until someone uses an action to shake or slap it out of its stupor.",
          "Starting at 6th level, you can target two creatures, and at 14th level, you can target a number of creatures equal to your Charisma modifier (minimum of three).",
        ]),
        minlevel: 3,
        // prereqeval : function(v) { return classes.known.bard.level >= 3; },
      },
      "epode for whom the bell tolls (prereq: 3rd level)": {
        name: "Epode For Whom the Bell Tolls",
        source: [["EldritchHunt", 134]],
        description: desc([
          "Choose up to five creatures within 30 feet of you. Each creature gains a bonus to their attack and damage rolls equal to half your Charisma modifier (rounded up) for 2 rounds, ending at the end of your subsequent turn.",
          "Starting at 6th level, the bonus to damage rolls equals your Charisma modifier, and at 14th level, the bonus to both attack and damage rolls becomes equal to your Charisma modifier.",
        ]),
        minlevel: 3,
        // prereqeval : function(v) { return classes.known.bard.level >= 3; },
      },
      "transcendence of flesh (prereq: 3rd level)": {
        name: "Transcendence of Flesh",
        source: [["EldritchHunt", 134]],
        description: desc([
          "Each willing creature of your choice within 30 feet of you gains temporary hit points equal to half your bard level + your Charisma modifier, as tentacles sprout from its mouth, eyes, and ears, defending them without impeding their abilities. In addition, they have advantage on Strength checks and Strength saving throws until the end of your next turn.",
        ]),
        minlevel: 3,
        // prereqeval : function(v) { return classes.known.bard.level >= 3; },
      },
      "aria of the reviled stalker (prereq: 6th level)": {
        name: "Aria of the Reviled Stalker",
        source: [["EldritchHunt", 134]],
        description: desc([
          "Choose one creature within 30 feet of you. It is partially absorbed by the cosmos for 1 hour, gaining a +10 bonus to Stealth checks and becoming unable to be tracked except by magical means. In addition, as an action, the creature can become incorporeal and move through other creatures and objects as if they were difficult terrain until the end of its turn. If it ends its turn inside an object, it takes 5 (1d10) force damage and is immediately shunted to the nearest unoccupied space. Once the creature uses this action, it can’t do so again for the duration of the transformation.",
          "Starting at 14th level, when the creature uses an action to become incorporeal, the effect lasts for 10 minutes instead.",
        ]),
        minlevel: 6,
        // prereqeval : function(v) { return classes.known.bard.level >= 3; },
      },
      "ode to subjugation (prereq: 6th level)": {
        name: "Ode to Subjugation",
        source: [["EldritchHunt", 135]],
        description: desc([
          "Each creature of your choice that you can see within 30 feet of you must make a Dexterity saving throw, becoming restrained for 1 minute on a failed save. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
          "Starting at 14th level, a restrained creature takes 3d6 necrotic damage at the start of each of its turns.",
        ]),
        minlevel: 6,
        // prereqeval : function(v) { return classes.known.bard.level >= 3; },
      },
      "requiem of chaos (prereq: 6th level)": {
        name: "Requiem of Chaos",
        source: [["EldritchHunt", 134]],
        description: desc([
          "Choose up to two creatures within 60 feet of you. They have disadvantage on Wisdom checks and Wisdom saving throws until the end of your next turn.",
          "Starting at 14th level, you can target a number of creatures equal to your Charisma modifier (minimum of 3).",
        ]),
        minlevel: 6,
        // prereqeval : function(v) { return classes.known.bard.level >= 3; },
      },
      "song of abject birth (prereq: 6th level)": {
        name: "Song of Abject Birth",
        source: [["EldritchHunt", 134]],
        description: desc([
          "Each creature in a 30- foot cone originating from you must make a Dexterity saving throw, taking a number of d4s of necrotic damage equal to your level in this class on a failed save, or half as much damage on a successful one.",
          "Starting at 14th level, the cone’s size increases to 60 feet.",
        ]),
        minlevel: 6,
        // prereqeval : function(v) { return classes.known.bard.level >= 3; },
      },
      "assonance of dreams (prereq: 14th level)": {
        name: "Assonance of Dreams",
        source: [["EldritchHunt", 134]],
        description: desc([
          "You conjure a circular portal up to 20 feet in diameter linking an unoccupied space you can see within 10 feet of you to a precise location you are very familiar with within 1 mile of you on the same plane of existence as you. You can orient the portal in any direction you choose. The portal lasts for 1 minute. Anything that travels through the portal is instantly transported to the location you chose, appearing in an unoccupied space nearest to the location.",
          "Starting at 14th level, the cone’s size increases to 60 feet.",
        ]),
        minlevel: 14,
        // prereqeval : function(v) { return classes.known.bard.level >= 3; },
      },
      "euphony of self-destruction (prereq: 14th level)": {
        name: "Euphony of Self-Destruction",
        source: [["EldritchHunt", 134]],
        description: desc([
          "Choose one creature you can see within 60 feet of you. It must succeed on a Charisma saving throw or be drawn through it to an unknown destination. At the end of your next turn, the target returns to the space it previously occupied, or the nearest unoccupied space. If the target isn’t an aberration, it takes 5d12 psychic damage and must succeed on a Wisdom saving throw or gain a long-term madness.",
        ]),
        minlevel: 14,
        // prereqeval : function(v) { return classes.known.bard.level >= 3; },
      },
      "nightmare of the abyss (prereq: 14th level)": {
        name: "Nightmare of the Abyss",
        source: [["EldritchHunt", 134]],
        description: desc([
          "Each creature of your choice within 60 feet of you must succeed on a Wisdom saving throw or be stunned until the end of your next turn.",
        ]),
        minlevel: 14,
        // prereqeval : function(v) { return classes.known.bard.level >= 3; },
      },
      "whispers of the flesh-defiler (prereq: 14th level)": {
        name: "Whispers of the Flesh-Defiler",
        source: [["EldritchHunt", 134]],
        description: desc([
          "For 1 minute, a 30-foot-radius sphere of writhing worms appears at a point that you can see within 60 feet of you. When a creature enters the area for the first time on a turn or starts its turn there, it is devoured by it and must make a Constitution saving throw. It takes 5d6 necrotic damage and is poisoned for 1 minute on a failed save, or half as much damage and isn’t poisoned on a successful one. A poisoned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. On each of your turns after you summon the swarm, you can use a bonus action to move it up to 30 feet in any direction. This effect ends early if you take fire or radiant damage.",
        ]),
        minlevel: 14,
        // prereqeval : function(v) { return classes.known.bard.level >= 3; },
      },
    },
    "apocalypse6.1": {
      name: "Knowledge from Beyond the Stars",
      source: [["EldritchHunt", 133]],
      minlevel: 6,
      languageProfs: ["Deep Speech"],
      description:
        "You learn to speak, read, and write Deep Speech. Additionally, whenever you make an Intelligence check that relates to the cosmos or the eldritch, you gain a bonus on that check equal to one roll of your Bardic Inspiration die (this doesn’t expend the die).",
    },
    "apocalypse6.2": {
      name: "Devouring Maw",
      source: [["EldritchHunt", 133]],
      minlevel: 6,
      description:
        "When a creature that possesses a Bardic Inspiration die from you is targeted by an attack, it can use its reaction to expend the die, summoning an eldritch maw that engulfs and protects it. Until the start of its next turn, it gains a bonus to its AC equal to the number rolled. If this causes the triggering attack to miss, the targeted creature can choose to be ripped through space by the maw, teleporting it to a point within 30 feet of it that it can see; if it does so, it loses the bonus to its AC.",
    },
    apocalypse14: {
      name: "Devouring Maw",
      source: [["EldritchHunt", 133]],
      minlevel: 6,
      //TODO: might need custom spells to add this in
      // spellcastingExtra: ["divine order: transcend"],
      // spellcastingBonus : {
      //   name : "Drow Magic (level 1)",
      //   spells : ["dancing lights"],
      //   selection : ["dancing lights"],
      //   firstCol : "atwill"
      // },
      description:
        "Starting at 14th level, you learn the spell divine order: transcend. It doesn't count against the number of spells you know. You can also cast it once without expending a spell slot, and you regain the ability to do so when you finish a long rest. When you cast the spell in this way, the apocalypse flows through you; damage can't break your concentration on this spell, and you automatically succeed on the saving throws to keep control over the spell.",
    },
  },
});

AddSubClass("cleric", "guardian domain", {
  regExpSearch: /^(?=.*(cleric|priest|clergy|acolyte))(?=.*guardian).*$/i,
  subname: "Guardian Domain",
  source: [["EldritchHunt", 136]],
  spellcastingExtra: [
    "protection from evil and good",
    "sanctuary",
    "aid",
    "warding bond",
    "protection from energy",
    "slow",
    "guardian of faith",
    "resilient sphere",
    "anilife shell",
    "wall of force",
  ],
  features: {
    bonus_profienciency: {
      name: "Bonus Profieciency",
      source: [["EldritchHunt", 136]],
      armorProfs: [false, false, true, false],
    },
    protective_magic: {
      name: "Protective Magic",
      source: [["EldritchHunt", 136]],
      description:
        "When you cast a spell that restores hit points, the targeted creature also gains half as many temporary hit points (rounded down). If a spell targets multiple creatures, choose one creature that benefits from this effect.",
    },
    subclassfeature2: {
      name: "Channel Divinity: Knowledge of Ages",
      source: [["EldritchHunt", 136]],
      minlevel: 2,
      description: desc([
        "As an action, you present your holy symbol, and in a flash of radiance, a Guardian Angel appears in an empty space of your choice within 5 feet of you. The angel is friendly to you and your companions and obeys your commands. When you gain this feature, choose the nature of your angel: radiant or necrotic. This will affect abilities in the stat block.",
        "In combat, the angel shares your initiative count, but it takes its turn immediately after yours. The only action it takes on its turn is the Dodge action, unless you take a bonus action on your turn to command it to take another action. That action can be one in its stat block or some other action. If you are incapacitated, the angel can take any action of its choice, not just Dodge.",
        "The guardian appears for 1 hour, until it is reduced to 0 hit points, until you use this feature to summon the angel again, or until you die.",
      ]),
      action: ["action", ""],
    },
    subclassfeature6: {
      name: "Angelic Protection",
      source: [["EldritchHunt", 136]],
      minlevel: 6,
      description: desc([
        "When you use your Channel Divinity to summon a Guardian Angel, it immediately casts warding bond (no action required) on a friendly creature that it can see (you included), ignoring the components of the spell.",
      ]),
    },
    subclassfeature8: {
      name: "Divine Strike",
      source: [["EldritchHunt", 136]],
      minlevel: 8,
      description: desc([
        "You gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 radiant damage to the target. When you reach 14th level, the extra damage increases to 2d8.",
        "Your Guardian Angel also gains this feature.",
      ]),
    },
    subclassfeature17: {
      name: "Aura of Defense",
      source: [["EldritchHunt", 136]],
      minlevel: 8,
      description: desc([
        "When your Guardian Angel casts warding bond, it can target a number of allied creatures (including you) equal to your Wisdom modifier (minimum 1). The spell functions as if the angel had created a warding bond with each individual creature. In addition, upon being summoned, the Guardian Angel gains temporary hit points equal to 5 times the number of creatures targeted by the spell.",
        "Once you use this feature, you can’t use it again until you finish a long rest.",
      ]),
      usages: 1,
      recovery: "long rest",
      oncelr: true,
    },
  },
});

AddSubClass("druid", "circle of symbiosis", {
  regExpSearch:
    /^(?=.*(druid|shaman))((?=.*\bsymbiosis\b)|((?=.*\bmany\b)(?=.*\bforms?\b))).*$/i,
  subname: "Circle of Symbiosis",
  source: [["EldritchHunt", 137]],
  features: {
    subclassfeature2: {
      name: "Spells",
      source: [["EldritchHunt", 137]],
      minlevel: 2,
      description: desc([
        "At 2nd level, you learn the shillelagh cantrip. This cantrip doesn’t count against the number of druid cantrips you know.",
        "At 3rd, 5th, 7th, and 9th level you gain access to the spells listed for that level in the Circle of Symbiosis Spells table. Once you gain access to one of these spells, you always have it prepared, and it doesn't count against the number of spells you can prepare each day. If you gain access to a spell that doesn't appear on the druid spell list, the spell is nonetheless a druid spell for you.",
      ]),
      spellcastingBonus: {
        name: "Circle Spells",
        spells: ["shillelagh"],
        selection: ["shillelagh"],
      },
      //TODO: need to add custom Eldritch Hunt spells
      spellcastingExtra: [
        "barkskin",
        "skeletal tail",
        "osseous cage",
        "plant growth",
        "maiden of bones",
        "stoneskin",
        "forest of dread",
        "tree stride",
      ],
    },
    "subclassfeature2.1": {
      name: "Wickerbone Behemoth",
      source: [["EldritchHunt", 140]],
      minlevel: 2,
      action: ["action", ""],
      description: desc([
        "As an action, you may expend a use of your Wild Shape to awaken Nature’s anger, turning into a behemoth, rather than transforming into a beast form. A deer skull, wooden skin, goat hooves, or other such natural gifts overtake your body. While this feature is active, you gain the following benefits:",
        "● Your arms count as clubs, each under the effect of the shillelagh spell.",
        "● You are under the effect of the barkskin spell, although you do not need to concentrate on it. In addition, whenever a creature damages you with an attack, your skin splinters and all creatures of your choice within 5 feet of you take 1d4 magical piercing damage. This damage increases to 2d4 at 10th level.",
        "● The stress of battle stimulates your organism to fight and survive. At the start of each of your turns, you regain hit points equal to half the damage taken since the start of your previous turn (rounded down, minimum of 0), up to a maximum of three times your Wisdom modifier. This regeneration doesn’t work if you are unconscious.",
        "These benefits last for 10 minutes, or until you use your Wild Shape again. You cannot use this transformation if you are wearing armor.",
      ]),
    },
    "subclassfeature2.2": {
      name: "Grafted Powers",
      source: [["EldritchHunt", 140]],
      minlevel: 2,
      extraname: "Grafted Powers",
      extrachoices: ["Bear Back", "Deer Head", "Goat Hooves"],
      extraTimes: [1],
      "bear back": {
        name: "Bear Back",
        source: [["EldritchHunt", 141]],
        description: desc([
          "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift, as well as for grappling checks. In addition, you can add your Wisdom modifier to any Strength check that you make.",
        ]),
      },
      "deer head": {
        name: "Deer Head",
        source: [["EldritchHunt", 141]],
        description: desc([
          "You have advantage on Perception checks that rely on sight or smell.",
        ]),
      },
      "goat hooves": {
        name: "Goat Hooves",
        source: [["EldritchHunt", 141]],
        description: desc([
          "You have advantage on Strength and Dexterity saving throws made against effects that would knock you prone. You gain a climbing speed equal to your walking speed.",
        ]),
      },
      description: desc([
        "The multiple aspects of Nature that you forcefully implanted within you manifest themselves in other aspects of your life. At 2nd level, you gain one of the following benefits.",
      ]),
    },
    subclassfeature6: {
      name: "Extra Attack",
      source: [["EldritchHunt", 140]],
      minlevel: 6,
      description: desc([
        "At 6th level, you can attack twice, instead of once, whenever you take the Attack action on your turn. Moreover, you can cast one of your cantrips in place of one of those attacks.",
      ]),
    },
    subclassfeature10: {
      name: "Nature’s Wrath",
      source: [["EldritchHunt", 140]],
      minlevel: 10,
      description: desc([
        "You are permanently under the effect of the barkskin spell.",
        "In addition, when you use your Wickerbone Behemoth transformation, your size becomes Large, and whenever you damage a creature with bludgeoning, piercing or slashing damage, you gain temporary hit points equal to 1d8 + your Wisdom modifier.",
      ]),
    },
    subclassfeature14: {
      name: "Briarheart",
      source: [["EldritchHunt", 140]],
      minlevel: 10,
      usages: 1,
      recovery: "long rest",
      oncelr: true,
      calcChanges: {
        //changes: add Wis mod to melee atk
        atkAdd: [
          function (fields, v) {
            if (!v.isSpell && v.isMeleeWeapon) {
              fields.Damage_Bonus = What("Wis Mod");
            }
          },
          "Your melee weapon attacks deal extra damage equal to your Wisdom modifier on a hit.",
        ],
      },
      description: desc([
        "Your melee weapon attacks deal extra damage equal to your Wisdom modifier on a hit.",
        "In addition, when you drop to 0 hit points, choose two willing creatures that you can see within 30 feet of you to empower with your connection to Nature. They gain the benefits of your Wickerbone Behemoth feature for 1 minute, using your Wisdom modifier, and can choose to immediately transform (no action required), even if they are wearing armor.",
        "Once you use this feature, you must finish a long rest before you can use it again.",
      ]),
    },
  },
});

AddSubClass("fighter", "blood archer", {
  regExpSearch: /^(?=.*blood)(?=.*archer).*$/i,
  subname: "Blood Archer",
  fullname: "Blood Archer",
  source: [["EldritchHunt", 142]],
  abilitySave: 3, //Con save (from Blood Shot)
  features: {
    subclassfeature3: {
      name: "Blood Shot",
      source: [["EldritchHunt", 142]],
      minlevel: 3,
      description: desc([
        "You learn three Blood Shot options of your choice",
        "Once per turn when you fire an arrow from a shortbow or longbow as part of the Attack action, you can apply one of your Blood Shot options to that arrow",
      ]),
      recovery: "short rest",
      oncesr: true,
      usages: "Con Mod",
      usagescalc: "event.value = Math.max(1, 1 + What('Con Mod'))",
      extraname: "Blood Shot",
      extrachoices: [
        "Bewitching Arrow",
        "Bloodboil Arrow",
        "Bloodshard Arrow",
        "Constraining Arrow",
        "Exiling Arrow",
        "Hunting Arrow",
        "Shadowblood Arrow",
        "Thunderblood Arrow",
        "Withering Arrow",
      ],
      extraTimes: [3],
      "bewitching arrow": {
        name: "Bewitching Arrow",
        source: [["EldritchHunt", 143]],
        description: desc([
          "The creature hit by the arrow takes an extra 2d6 psychic damage and must make a Wisdom saving throw. If it fails the save, you can choose one of the target's allies within 30 feet of it; the target now considers this ally as an enemy until the start of your next turn.",
          "The psychic damage increases to 4d6 when you reach 18th level in this class.",
        ]),
      },
      "bloodboil arrow": {
        name: "Bloodboil Arrow",
        source: [["EldritchHunt", 143]],
        description: desc([
          "The arrow detonates in a cloud of ignited blood after your attack. Immediately after the arrow hits the creature, the target and all other creatures within 10 feet of it take 2d6 fire damage as their bodies start burning. This fire damage ignores resistance.",
          "The fire damage increases to 4d6 when you reach 18th level in this class.",
        ]),
      },
      "bloodshard arrow": {
        name: "Bloodshard Arrow",
        source: [["EldritchHunt", 143]],
        description: desc([
          "You fire forward a 1-foot- wide, 30-foot-long line bloodshard before disappearing. The arrow passes harmlessly through objects, ignoring cover. Each creature in that line must make a Dexterity saving throw, taking damage as if it were hit by the arrow plus an extra 1d6 piercing damage on a failed save, or half as much damage on a successful one.",
          "This extra piercing damage increases to 2d6 when you reach 18th level in this class.",
        ]),
      },
      "constraining arrow": {
        name: "Constraining Arrow",
        source: [["EldritchHunt", 143]],
        description: desc([
          "The creature hit by the arrow takes an extra 2d6 acid damage, its speed is reduced by 10 feet, and it takes 2d6 acid damage the first time on each turn it moves 1 foot or more without teleporting. A creature can use its action to make an Athletics check against your Blood Shot save DC, removing the tendrils from itself or another creature within its reach on a success. Otherwise, the tendrils last for 1 minute or until you use this option again.",
          "Both acid damages increase to 4d6 when you reach 18th level in this class.",
        ]),
      },
      "exiling arrow": {
        name: "Exiling Arrow",
        source: [["EldritchHunt", 143]],
        description: desc([
          "The creature hit by the arrow must also succeed on a Charisma saving throw or be banished. While banished in this way, its speed is 0 and it is incapacitated. At the end of its next turn, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied.",
          "After you reach 18th level in this class, the target also takes 2d6 radiant damage when the arrow hits it.",
        ]),
      },
      "hunting arrow": {
        name: "Hunting Arrow",
        source: [["EldritchHunt", 144]],
        description: desc([
          "Instead of an attack roll, choose one creature you have seen in the past minute. The arrow flies toward that creature, moving around corners if necessary, and ignoring three- quarters cover and half cover. If the target is within the weapon’s range and there is a path large enough for the arrow to travel to the target, the target must make a Dexterity saving throw. On a failed save, it takes damage as if it were hit by the arrow plus an extra 1d6 piercing damage, and you learn the target’s current location.",
          "The extra piercing damage increases to 2d6 when you reach 18th level in this class.",
        ]),
      },
      "shadowblood arrow": {
        name: "Shadowblood Arrow",
        source: [["EldritchHunt", 144]],
        description: desc([
          "The creature hit by the arrow takes an extra 2d6 necrotic damage and its blood forms a dark red mist that rises in a 10- foot radius around the target. This mist is magical darkness and spreads around corners. A creature with darkvision can't see through this darkness, and nonmagical light can't illuminate it. It lasts until the start of your next turn.",
          "The necrotic damage increases to 4d6 when you reach 18th level in this class.",
        ]),
      },
      "thunderblood arrow": {
        name: "Thunderblood Arrow",
        source: [["EldritchHunt", 144]],
        description: desc([
          "The arrow detonates immediately after it hits your target; the creature takes an extra 2d6 thunder damage and is pushed back 15 feet. In addition, it must succeed on a Strength saving throw against your Blood Shot save DC or be knocked prone.",
          "The thunder damage increases to 4d6 when you reach 18th level in this class.",
        ]),
      },
      "withering arrow": {
        name: "Withering Arrow",
        source: [["EldritchHunt", 143]],
        description: desc([
          "The creature hit by the arrow takes an extra 2d6 necrotic damage. The target must also succeed on a Constitution saving throw against your Blood Shot save DC, or the damage dealt by its weapon attacks is halved until the start of your next turn.",
          "The necrotic damage increases to 4d6 when you reach 18th level in this class.",
        ]),
      },
    },
    "subclassfeature3.1": {
      name: "Blood Archer Anatomy",
      source: [["EldritchHunt", 142]],
      minlevel: 3,
      dmgres: "Poison",
      savetxt: {
        immune: ["disease"],
        adv_vs: ["poison"],
      },
      description: desc([
        "At 3rd level, your body adapts to the tarblood within. You are immune to disease, have resistance to poison damage, and have advantage on saving throws against poison.",
        "In addition, once you've fought a creature, you can relentlessly track it, sensing the blood of your prey. You have advantage on any Perception or Survival check you make to find a creature you've dealt damage to and has blood.",
      ]),
    },
    subclassfeature7: {
      name: "Blood Arrows",
      source: [["EldritchHunt", 142]],
      minlevel: 7,
      description: desc([
        "At 7th level, you gain the ability to create arrows with your blood. When you make a ranged attack using a shortbow or longbow, you can create a blood arrow in place of standard ammunition. Blood arrows are considered magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.",
        "In addition, when you use your Blood Shot feature, you can add your Constitution modifier to the damage roll of the effect.",
      ]),
    },
    subclassfeature10: {
      name: "Blood Recall",
      source: [["EldritchHunt", 143]],
      minlevel: 10,
      action: [["bonus action", ""]],
      description: desc([
        "At 10th level, you learn how to recall your arrows. When you make an attack roll with a blood arrow and miss, you can use a bonus action to reroll the attack roll against the original target, as the arrow flies back towards you.",
      ]),
    },
    subclassfeature15: {
      name: "Blood of Creation",
      source: [["EldritchHunt", 143]],
      minlevel: 15,
      action: [["action", ""]],
      description: desc([
        "Starting at 15th level, as an action, you can choose to sacrifice your lifeforce to reinvigorate control over your blood magic. You take necrotic damage equal to 1d10 + your Constitution modifier, which you cannot reduce in any way, and regain 1d4 uses of your Blood Shot.",
      ]),
    },
  },
});

AddSubClass("fighter", "living nightmare", {
  regExpSearch: /^(?=.*living)(?=.*nightmare).*$/i,
  subname: "Living Nightmare",
  fullname: "Living Nightmare",
  source: [["EldritchHunt", 145]],
  abilitySave: 3, //Con save DC (from Eldritch Weaponry)
  features: {
    subclassfeature3: {
      name: "Awakened Mutation",
      source: [["EldritchHunt", 145]],
      minlevel: 3,
      description: desc([
        "You forever lose proficiency with shields and heavy armor, as your ever-changing body cannot hold on to them.",
        "Your flesh hardens and your reflexes grow, empowered by other-wordly ichor. While you are not wearing any armor, your Armor Class equals 11 + your Dexterity modifier + your Constitution modifier.",
      ]),
      armorOptions: [
        {
          regExpSearch:
            /^(?=.*(awake|awoke|awakened))(?=.*(mutation|mutate)).*$/i,
          name: "Awakened Mutation",
          source: [["EldritchHunt", 142]],
          ac: "11+Con",
          selectNow: true,
        },
      ],
    },
    "subclassfeature3.1": {
      name: "Eldritch Weaponry",
      source: [["EldritchHunt", 145]],
      minlevel: 3,
      action: [["bonus action", ""]],
      description: desc([
        "Also at 3rd level, as a bonus action, you can mutate your body, transforming it into various weapons of destruction. They count as simple melee weapons for you, and you add your Strength modifier to the attack and damage rolls when you attack with them, as normal. When you use these weapons, you drop any items you are holding with those limbs.",
        "You choose the weapon’s form each time you make an attack roll:",
        "* Stinger. One of your limbs grows into a razor-sharp blade. It deals 1d8 piercing damage on a hit. When you take the Attack action to attack with it on your turn, you can use a bonus action to turn another limb into a Stinger and strike with it, making a single additional attack.",
        "* Hammer Arm. Your arms turn into a black-tinted bone club. On a hit, it deals 2d6 bludgeoning damage and you can choose to push the target 5 feet away.",
        "* Tendinous Lash. One of your limbs replaces its bones with tough coiled ligaments, allowing it to stretch a disturbing distance without breaking. It deals 1d4 slashing damage on a hit and has a reach of 15 feet. In addition, the first time on a turn you deal damage with your lash, the target must succeed on a Strength saving throw against your Living Nightmare save DC or be knocked prone as the limb sweeps their feet.",
        "Alternatively, you can transform your limb into a shield: \n* Sinister Aegis. Whenever you are targeted by an attack that you can see, you can use your reaction to temporarily turn one of your arms into a fleshy shield, gaining a +2 bonus to AC until the start of your next turn.",
        "In addition, your eldritch flesh is capable of devouring some magical items to gain their properties. As part of a short or long rest, you can devour the following types of magic items, absorbing their properties:",
        "- A rapier; its properties are added to your Stinger.",
        "- A maul; its properties are added to your Hammer Arm.",
        "- A whip; its properties are added to your Tendinous Lash.",
        "- A shield; its properties are added to your Sinister Aegis.",
        "If you absorb another magical item of the same type, the previous magic item of that type is destroyed.",
      ]),
    },
    subclassfeature7: {
      name: "Macabre Appetite",
      source: [["EldritchHunt", 145]],
      minlevel: 7,
      action: [["action", ""]],
      description: desc([
        "When you stand within 5 feet of the corpse of a creature that has died less than 1 week ago, you can use your action to touch it and let your eldritch appendages devour it. You regain a number of hit points equal to the creature’s CR (minimum of 0, rounded down). In addition, for the next 24 hours, you can use an action to assume the creature’s appearance and voice, though none of your game statistics change. You stay in the new form until you use an action to revert to your true form or until you die.",
        "After 24 hours, or if you consume another creature, you lose the ability to take the appearance of the consumed being.",
      ]),
    },
    subclassfeature10: {
      name: "Ascended Being",
      source: [["EldritchHunt", 145]],
      minlevel: 10,
      recovery: "long rest",
      oncelr: true,
      usages: "Con Mod ",
      usagescalc: "event.value = Math.max(1, What('Con Mod'))",
      action: [["bonus action", ""]],
      description: desc([
        "Whenever you consume a creature with your Macabre Appetite, you also inherit all their memories from the last week before their death.",
        "In addition, as a bonus action, you can grow a pair of eldritch wings, giving yourself a flying speed of 30 feet for 1 minute. You can use this bonus action a number of times equal to your Constitution modifier (minimum of 1), and you regain all expended uses when you finish a long rest.",
      ]),
    },
    subclassfeature15: {
      name: "Nightmarish Weaponry",
      source: [["EldritchHunt", 145]],
      minlevel: 15,
      recovery: "long rest",
      oncelr: true,
      usages: "Con Mod",
      usagescalc: "event.value = Math.max(1, What('Con Mod'))",
      description: desc([
        "Once on each of your turns when you make use of your Eldritch Weaponry, you can strain your body to generate a more violent eldritch power, replacing one of your attacks:",
        "* Stinger. You can replace one of your Stinger attacks. Instead, each creature in a 30-foot cone in front of you must succeed on a Dexterity saving throw against your Living Nightmare save DC or take damage equal to 3 hits from your Stinger.",
        "* Hammer Arm. You can replace one of your Hammer Arm attacks. Instead, you smash the ground below you, causing quakes and sending fragments flying. Each creature within 20 feet of you must succeed on a Dexterity saving throw against your Living Nightmare save DC or take damage equal to 2 hits from your Hammer Arm and be knocked prone.",
        "* Tendinous Lash. You can replace one of your Tendinous Lash attacks, swiping those around you instead. Each creature within 15 feet of you must succeed on a Strength saving throw against your Living Nightmare save DC or take damage equal to 1 hit from your Lash, be pulled 10 feet in a straight line towards you, and be restrained until the start of your next turn.",
      ]),
    },
    subclassfeature18: {
      name: "Eldritch Contamination",
      source: [["EldritchHunt", 145]],
      minlevel: 18,
      spellcastingAbility: 3, // 3 for CON
      spellcastingBonus: {
        name: "Eldritch Contamination",
        spells: ["dominate monster"],
        selection: ["dominate monster"],
      },
      usages: 2,
      recovery: "long rest",
      oncelr: true,
      description: desc([
        "You can temporarily infect creatures with the nightmare that lives within you, turning them into puppets. You can cast the dominate monster spell, requiring no components, and your spellcasting ability for the spell is Constitution. Once you use this feature twice, you can’t do so again until you finish a long rest.",
      ]),
    },
  },
});

AddSubClass("monk", "way of the fire dancer", {
  regExpSearch:
    /^(?=.*\bfire)(?=.*\b(dancer))((?=.*(monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
  subname: "Way of the Fire Dancer",
  source: [["EldritchHunt", 147]],
  features: {
    subclassfeature3: {
      name: "Blazing Performer",
      source: [["EldritchHunt", 147]],
      minlevel: 3,
      skillstxt:
        "Choose one of Performance or Acrobatics, your proficiency bonus is doubled for any ability check you make that uses the chosen proficiency.",
      dmgres: ["Fire", "Fire; if existed, reduce another 1d6"],
      description: desc([
        "You gain proficiency in the Performance or Acrobatics skill (your choice), and your proficiency bonus is doubled for any ability check you make that uses the chosen proficiency.",
        "In addition, you gain resistance to fire damage. If you already have this resistance, instead, if you take fire damage, you can reduce that damage by 1d6 (after the resistance applies).",
      ]),
    },
    "subclassfeature3.1": {
      name: "Dance of Fire",
      source: [["EldritchHunt", 147]],
      minlevel: 3,
      action: [["reaction", ""]],
      description: desc([
        "When you spend a ki point during your turn, your monk weapons and unarmed strikes catch fire until the start of your next turn. While on fire, they deal extra fire damage equal to your Wisdom modifier, and you gain a bonus to your AC equal to half your Wisdom modifier for the duration.",
        "In addition, while your flames are active, if a creature misses you with a melee attack, you can use your reaction to make an unarmed strike or spend a ki point to use your Flurry of Blows feature against it.",
      ]),
    },
    subclassfeature6: {
      name: "Scorching Vortex",
      source: [["EldritchHunt", 147]],
      minlevel: 6,
      usages: "Wis Mod",
      usagescalc: "event.value = Math.max(1, 1 + What('Wis Mod'))",
      action: [
        ["action", ""],
        ["reaction", " (enemy misses)"],
      ],
      description: desc([
        "When you use Step of the Wind, if you move through each space adjacent to a creature on your turn, you create a vortex of fire around them. The target must make a Dexterity saving throw against your ki save DC, taking 2d6 fire damage and becoming trapped in a vortex of flames that appears in its space on a failed save. On a successful save, the target takes half as much damage and the vortex fails to appear. The vortex is opaque and obstructs line of sight. If the target attempts to move out of the flames, it must first succeed on a Wisdom saving throw against your ki save DC. On a failure, it takes 1d6 fire damage and is charmed by the flames, reducing its speed to 0 until the start of its next turn, at which point the vortex and its effects end. On a success, it moves through the vortex, ending the effect. These flames do not damage other creatures.",
        "In addition, while your flames are active, if a creature misses you with a melee attack, you can use your reaction to make an unarmed strike or spend a ki point to use your Flurry of Blows feature against it.",
      ]),
    },
    subclassfeature11: {
      name: "Flames of Redemption",
      source: [["EldritchHunt", 147]],
      minlevel: 11,
      description: desc([
        "At 11th level, any fire damage that you deal ignores fire resistance. In addition, the clarity of your mind allows you to generate flames that many would call divine; you can replace any fire damage that you deal with radiant damage.",
      ]),
    },
    "subclassfeature11.1": {
      name: "Purifying Flames",
      source: [["EldritchHunt", 147]],
      minlevel: 11,
      action: [["action", ""]],
      description: desc([
        "At 11th level, your flames burn away all impurities. As an action, you can spend 2 ki points to touch a creature and infuse them with your flames. The target can end one poison, charm, or short-term madness afflicting it.",
      ]),
    },
    subclassfeature17: {
      name: "One With The Fire",
      source: [["EldritchHunt", 147]],
      minlevel: 17,
      description: desc([
        "When you deal fire damage with a monk weapon, if the target is a creature or a flammable object, it ignites. Until the target or a creature within 5 feet of it takes an action to douse the flames, the target takes fire damage equal to your Wisdom modifier at the start of each of its turns.",
        "In addition, while under the effects of Dance of Fire, your body merges with the flames. For the duration, you become immune to fire damage and have resistance to bludgeoning, piercing, and slashing damage.",
      ]),
    },
  },
});

AddSubClass("paladin", "oath of the eldritch hunt", {
  regExpSearch:
    /^(?=.*(eldritch))(?=.*(hunt))(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))).*$/i,
  subname: "Oath of the Eldritch Hunt",
  source: [["EldritchHunt", 149]],
  spellcastingExtra: [
    "faerie fire",
    "spectral slash",
    "moonbeam",
    "hold person",
    "displacing maw",
    "spectral fury",
    "black tentacles",
    "maiden of bones",
    "contact other plane",
    "hold monster",
  ],
  features: {
    subclassfeature3: {
      name: "Channel Divinity: Hunt the Prey",
      source: [["EldritchHunt", 149]],
      minlevel: 3,
      action: [["bonus action", ""]],
      description: desc([
        "Hunt the Prey. As a bonus action, you can call upon the sanctified hunt. You designate a creature within 60 feet of you as your prey, marking the target for 1 minute. As part of casting this channel divinity, and as a bonus action on subsequent turns, you can magically teleport up to 30 feet to an unoccupied space you can see within 5 feet of the marked target. To teleport in this way, you must be able to see the marked target.",
      ]),
      action: ["bonus action", ""],
    },
    "subclassfeature3.1": {
      name: "Channel Divinity: Stolen Eldritch Gift",
      source: [["EldritchHunt", 149]],
      minlevel: 3,
      action: [["bonus action", ""]],
      description: desc([
        "Stolen Eldritch Gift. As a bonus action, you use your channel divinity to enhance your body beyond your mortal limits. For 10 minutes, you can add your Charisma modifier to any Athletics, Acrobatics, and Perception checks that you make.",
      ]),
      action: ["bonus action", ""],
    },
    subclassfeature7: {
      name: "Sharpened Senses",
      source: [["EldritchHunt", 150]],
      minlevel: 7,
      description: desc([
        "You have blindsight with a range of 10 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. Moreover, within that range, no creature can hide from you.",
        "At 18th level, this range increases to 30 feet.",
      ]),
    },
    subclassfeature15: {
      name: "Find Weakness",
      source: [["EldritchHunt", 150]],
      minlevel: 15,
      description: desc([
        "When you deal damage to a creature, you learn any damage resistances, immunities, or vulnerabilities that it has.",
        "In addition, whenever you use your Hunt the Prey channel divinity, you can make a single weapon attack against the marked target when you reappear, as part of the same bonus action.",
      ]),
    },
    subclassfeature20: {
      name: "Perfect Hunter",
      source: [["EldritchHunt", 150]],
      minlevel: 20,
      action: ["bonus action", ""],
      recovery: "long rest",
      oncelr: true,
      usages: 1,
      description: desc([
        "As a bonus action, you activate the power of the true hunter. For the next minute, you gain the following benefits:",
        "● You become invisible.",
        "● You cannot be grappled, restrained, or paralyzed.",
        "● Your weapon attacks deal an extra 1d8 necrotic damage, which bypasses resistance.",
      ]),
    },
  },
});

AddSubClass("ranger", "lunar warden", {
  regExpSearch: /^(?=.*lunar)(?=.*warden).*$/i,
  subname: "Lunar Warden",
  source: [["EldritchHunt", 152]],
  fullname: "Lunar Warden",
  features: {
    subclasfeature3: {
      name: "Astral Affinity",
      source: [["EldritchHunt", 152]],
      minlevel: 3,
      spellcastingBonus : {
        name : "Astral Affinity",
        spells : ["light"],
        selection : ["light"],
        firstCol : 'atwill'
      },
      savetxt: {
        adv_vs: ["direct effects from Eldritch Moons"],
      },
      vision: [["Darkvision", 60]],
    },
    "subclassfeature3.1": {
      name: "Moon Conduit",
      source: [["EldritchHunt", 153]],
      minlevel: 3,
      recovery: levels.map(function (n) {
        return n < 7 ? "long rest" : "short rest"; //turn to short rest at level 7 due to Moon Conduit
      }),
      oncelr: true,
      usages: "Wis Mod ",
      usagescalc: "event.value = What('Wis Mod')",
      description: desc([
        "You learn all the following Moon Conduits. You can use Conduits a number of times equal to your Wisdom modifier and regain all expended uses after you finish a long rest. Starting at 7th level, you regain all expended uses after you finish a short or long rest.",
        "Lunar Alignment. If you use a Moon Conduit that belongs to the moon currently looming over the world, your abilities become more powerful, detailed in the Lunar Alignment section of each Conduit.",
        "\n\nList of Moon Conduits:",
        "\nBlood Moon of Rebirth: \nAs an action, you beckon the powers of a black goat. You and a number of creatures of your choice up to your Wisdom modifier within 30 feet of you that you can see regain a number of hit points equal to your level in this class.\nLunar Alignment. When you use this Conduit, you can affect yourself and any number of creatures of your choice within 60 feet of you that you can see, which regain a number of hit points equal 1d4 x your level in this class. This healing also regrows any missing limbs, as per the regenerate spell.",
        "\nHowling Moon:\nYou harness the beast within you as a bonus action. For the next minute, you grow fur, fangs, and devastating claws. You are proficient with your unarmed strikes, which deal 1d6 plus your Wisdom modifier magical slashing damage on a hit, and you can use your Strength or Dexterity modifier for your attack and damage rolls with these claws. If your unarmed strikes already deal 1d4 or 1d6 damage before the transformation, the damage die becomes a d8.\nLunar Alignment. You unleash your lunar bloodlust. You have advantage on an attack roll with your claws against a creature if at least one of your allies is within 5 feet of the creature and the ally isn’t incapacitated, and the damage die becomes a d12.",
        "\nShattered Moon:\nYou beckon the shattered powers of the moon, attempting to break the magic in front of you. When you or a creature that you can see within 30 feet of you makes a saving throw against a spell or magical effect, you can use your reaction to dampen the magic, granting advantage on the saving throw.\nLunar Alignment. When this Conduit gives a creature advantage on a saving throw, they can reroll one of the dice once. Alternatively, you can use this reaction to instead cast counterspell at 5th level, though it automatically fails against spells of 6th level or higher. Wisdom is your spellcasting modifier for this spell.",
        "\nScorching Moon:\nYou wreathe yourself in flames to scorch your foes. If you move at least 20 feet in a straight line toward a creature and then hit it with a melee attack on the same turn, you can force the target to make a Strength saving throw against your spell save DC. On a failure, they are knocked prone and take a number of d4s of fire damage equal to your Wisdom modifier.\nLunar Alignment. Creatures automatically fail their saving throw against this Conduit, and the fire damage they take becomes d6s instead of d4s and ignores resistance to fire damage.",
        "\nVacuous Moon:\nYou step through the void. After being damaged by a ranged attack, you can use your reaction to teleport to an empty space you can see within 10 feet of the attacker. If the attacker is further than 60 feet away, this reaction fails.\nLunar Alignment. When you use this Conduit, you can teleport to an empty space you can see within 30 feet of the attacker and make a single weapon attack against them. If the attacker is further than 300 feet away, this reaction fails.",
        "\nGlowering Moon:\nYou subjugate your foes to the crushing woe of hopelessness. You can cast the bane spell at 2nd level without expanding a spell slot. If the targets are in direct moonlight, they have disadvantage on the saving throw.\nLunar Alignment. Creatures in direct moonlight now automatically fail the saving throw, and creatures under the effect of the spell take psychic damage equal to your level in this class at the start of each of their turns. If a creature remains under the effect of the spell for its entire duration, they fall unconscious. The condition ends if someone else uses an action to shake the creature out of its stupor.",
      ]),
    },
    subclassfeature7: {
      name: "Lunar Guidance",
      source: [["EldritchHunt", 153]],
      minlevel: 7,
      dmgres: [
        "Radiant",
        "Radiant; if existed, choose Cold of Necrotic resistance",
      ],
      description: desc([
        "Each time you use a Moon Conduit, a shard of the lunar energy remains within your body for 1 minute or until you expend it or use another Moon Conduit. You can expend this energy to gain advantage on one ability check, attack roll, or saving throw (no action required).",
      ]),
    },
    subclassfeature11: {
      name: "Additional Moon Conduits",
      source: [["EldritchHunt", 154]],
      minlevel: 11,
      description: desc([
        "You learn to use new Moon Conduits that channel the powers of Eldritch Moons oft unseen.",
        "\n\nList of Additional Moon Conduits:",
        "\nGlacial Moon: \nAs an action, you cover your body in a frozen armor. You gain temporary hit points equal to 1 + twice your Wisdom modifier. If a creature hits you with a melee attack while you have these hit points, the creature takes cold damage equal to 1 + twice your Wisdom modifier.\nLunar Alignment. When you use this Conduit, you instead gain temporary hit points equal to 5 x your Wisdom modifier (minimum of 1). If a creature hits you with a melee attack while you have these hit points, the creature takes cold damage equal to 5 x your Wisdom modifier (minimum of 1). This damage ignores resistance to cold damage.",
        "\nSlumbering Moon:\nYou can warp your body through eldritch means. You can cast misty step without expending a spell slot or using material components.\nLunar Alignment. You can cast dimension door without expending a spell slot or using material components.",
        "\nKrakenlight:\nYou create a bioluminescent lure before you. As an action, you can create a light above your head that emits dim light in a 10-foot radius centered on you. Hostile creatures within 30 feet of you that see the lure must make a Wisdom saving throw against your spell save DC or be charmed. While charmed, they are incapacitated and are compelled to move towards the lure with their movement each turn, only ending their movement when in the light. The charm effect lasts for 1 minute or until the creature takes damage.\nLunar Alignment. When you create this lure, the range is doubled, creatures have disadvantage on the saving throw, and the first time they take damage the effect doesn’t end.",
        "\nCreeping Tarlight:\nYou can weave the tar lurking in the shadows to slow your foes. As an action choose up to three creatures within 30 feet of you can see, they must succeed on a Dexterity saving throw or be covered by tar for 1 minute. While covered in tar, their speed is halved, and they take a -2 penalty to AC and Dexterity saving throws. An affected creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. Creatures standing in darkness have disadvantage on this saving throw. You must concentrate on this effect as you would concentrate on a spell.\nLunar Alignment. You can harness more of the tar and can choose up to six creatures. While covered in tar, creatures are instead affected by the slow spell. You do not need to concentrate on this effect.",
        "\nSanguine Eclipse:\nYou cause your foes to turn against each other. As an action, you can choose a creature within 30 feet of you that you can see that must make an Intelligence saving throw. On a failed save, it regards another creature of your choice that you can see within 90 feet of you as its mortal enemy until the start of your next turn. It must use its actions to attempt to kill its mortal enemy, disregarding all other creatures. Creatures that are immune to the charmed condition are immune to this ability.\nLunar Alignment. The duration of this Conduit extends to 1 minute. An affected creature can repeat the saving throw at the end of each of its turns to end the effect early. The effect also ends early if the target's quarry dies.",
      ]),
    },
    subclassfeature15: {
      name: "Celestial Tide",
      source: [["EldritchHunt", 154]],
      minlevel: 15,
      recovery: "long rest",
      oncelr: true,
      usages: 1,
      action: ["action", ""],
      description: desc([
        "As an action, you can cast the reverse gravity spell without expending a spell slot or using material components, and the area of the spell is illuminated by direct moonlight.",
        "When the spell ends, the lunar energy disperses and flows towards you, refreshing your lunar powers. You regain all expended uses of your Moon Conduit feature.",
        "Once you use this feature, you can't do so again until you finish a long rest.",
      ]),
    },
  },
});

AddSubClass("ranger", "torturer conclave", {
  regExpSearch: /^(?=.*torturer)(?=.*conclave).*$/i,
  subname: "Torturer Conclave",
  source: [["EldritchHunt", 155]],
  fullname: "Torturer Conclave",
  abilitySave: 5, //Wis save DC (from Torturer Technique)
  features: {
    subclassfeature1: {
      name: "Torture Tools",
      source: [["EldritchHunt", 156]],
      description: desc([
        "This satchel contains various small implements that can bludgeon, cut, and pierce in ways designed to maximize pain. Meant to extract the truth, many use these tools with far more nefarious intentions. Proficiency with these tools grants the following benefits:",
        ,
        "Exhaustion. Using these tools for 1 hour on a restrained creature causes them to gain 1 level of exhaustion, after which you must make a Dexterity (torture tools) check. The DC is equal to 20 - the creature’s Constitution modifier. On a failure, the creature takes 10 points of your choice of bludgeoning, piercing, or slashing damage.",
        "Intimidation. When you make an Intimidation check against a creature whom you used these tools against, you gain a bonus equal to your proficiency bonus + twice the level of exhaustion the creature has.",
        "Cost: 50 gp / Weight: 10 lb",
      ]),
    },
    subclassfeature3: {
      name: "Tools of the Trade",
      source: [["EldritchHunt", 157]],
      minlevel: 3,
      toolProfs: ["Torturer's Tools", "Dex"],
      skills: ["Insight", ["Insight", "full"]],
      description: desc([
        "You gain proficiency with torture tools and Insight checks, and your proficiency bonus is doubled for any ability check you make that uses them.",
      ]),
    },
    "subclassfeature3.1": {
      name: "Torturer Techniques",
      source: [["EldritchHunt", 157]],
      minlevel: 3,
      recovery: "long rest",
      oncelr: true,
      usages: "2 per technique per long rest",
      action: ["action", ""],
      description: desc([
        "You learn to use techniques. You can use each technique twice and regain the ability to do so again when you finish a long rest, or when you expend a spell slot of 1st level or higher to reuse it.",
        "Techniques. When you make a melee weapon attack against a creature while you have torture tools in one hand (or a free hand and the presence of torture tools at your disposal, such as strapped around your leg), as part of that attack, you can use a technique to enhance it in some way. You must use the technique before the attack roll is made, and regardless of the outcome, the use or the spell slot is expended. You can only use a technique once per turn, though you can use multiple different techniques in the same turn, and you can only use one technique per attack.",
        "Empowered Techniques. At certain levels in this class, you gain the ability to empower your torturer techniques using magic. When you expend a spell slot to use a technique, you inflict extra damage, and the target suffers a penalty to saving throws it makes against the technique, as shown on the following table. You can’t empower a technique using a spell slot of a level you haven’t unlocked, even if you have higher level spell slots (e.g., through multiclassing or items).",
        "Additionally, the first two times you use a technique after you finish a long rest, you can expend a spell slot of 1st level or higher, in which case the technique is empowered as if you had expended a spell slot one level higher (up to a maximum of the highest spell slot you’ve unlocked).",
        "\nSpell slot lvl 1: Wis Mod (extra dmg) | Enemy Saving Throw Penalty: -1d4",
        "\nSpell slot lvl 2: 2x Wis Mod (extra dmg) | Enemy Saving Throw Penalty: -2d4",
        "\nSpell slot lvl 3: 3x Wis Mod (extra dmg) | Enemy Saving Throw Penalty: -3d4",
        "\nSpell slot lvl 4: 4x Wis Mod (extra dmg) | Enemy Saving Throw Penalty: -4d4",
        "\nSpell slot lvl 5: 5x Wis Mod (extra dmg) | Enemy Saving Throw Penalty: -5d4",
      ]),
    },
    "subclassfeature3.2": {
      name: "Techniques",
      source: [["EldritchHunt", 157]],
      description: desc([
        "Combing:\nYou scrape, tear, and flay the victim's flesh. On a hit, the target takes an extra 1d12 slashing damage. \nStarting at 7th level, if you damage a target two rounds in a row with this technique, it must make a Constitution saving throw against your technique save DC. On a failure, you tear away so much flesh that its body starts to bleed deeply. It takes 1d8 necrotic damage at the start of each of its turns (this damage can’t be reduced or ignored in any way) for 1 minute. A bleeding creature can repeat the saving throw at the end of each of its turns, ending the effect on a success. Any extra damage from empowering this technique also applies to this necrotic damage. A creature can’t suffer multiple instances of this effect at once.",
        "Enucleation:\nYou aim a vicious strike at the target's eye, reducing their vision to a macabre blur. On a hit, the target takes an extra 1d6 of the weapon’s damage type and must succeed on a Constitution saving throw or have disadvantage on Perception checks and be blinded beyond 60 feet for 1 minute. Any healing ends this effect. The target can repeat this saving throw with disadvantage at the end of each of its turns, ending the effect on a success.\nStarting at 11th level, if the target fails its saving throw against this technique two rounds in a row, it becomes blinded for 1 minute. Creatures with more than 2 eyes have advantage on this saving throw. The target can repeat this saving throw at the end of each of its turns, ending the effect on a success.",
        "Hamstringing:\nYou slash at the tendons. On a hit, the target takes an extra 1d8 slashing damage and must succeed on a Constitution saving throw or have its speed reduced to 0 until the start of your next turn.\nStarting at 7th level, if the target fails its saving throw against this technique two rounds in a row, you sever its tendons, and its walking speed becomes 0 for 1 minute. The target can repeat this saving throw at the end of each of its turns, ending the effect on a success.",
        "Nerve Scraping:\nYou damage the target’s nerves, causing its body to writhe in pain. On a hit, it takes an extra 1d8 psychic damage. The target must then succeed on a Constitution saving throw or lose its grip on reality, unable to differentiate friend from foe through the veil of pain; until the start of your next turn, it must use its action before moving on each of its turns to make a melee attack against a randomly determined creature within its reach other than itself. If no creature is within its reach, it acts as normal, though still can’t discern allies and enemies, and if it makes an attack, it randomly determines a target within its reach or range other than itself.\nStarting at 11th level, if the target fails its saving throw against this technique two rounds in a row, it suffers a 1d4 penalty to its attack rolls and saving throws for 1 minute. The target can repeat this saving throw at the end of each of its turns, ending the effect on a success.",
        "Throat Chop:\nYou deliver a fierce cleave to the target's throat, severely impairing its ability to breathe and speak. On a hit, the target takes an extra 1d8 bludgeoning damage and can’t speak or use the verbal components of spells until the start of your next turn.\nStarting at 11th level, if you hit a target two rounds in a row with this technique, it must make a Constitution saving throw against your technique save DC. On a failure, the pain shocks the target, which becomes stunned until the end of your next turn.",
        "Tympanic Rupture:\nYou slam the target’s ears in an attempt to destabilize it. On a hit, the target takes an extra 1d10 bludgeoning damage and must succeed on a Constitution saving throw or become deafened for 1 minute. A deafened creature can repeat the saving throw at the end of each of its turns, ending the effect on a success\nStarting at 7th level, if the target fails its saving throw against this technique two rounds in a row, it is disoriented for the duration. While disoriented, the target can’t take reactions.",
      ]),
    },
    subclassfeature7: {
      name: "Depraved Mind",
      source: [["EldritchHunt", 158]],
      minlevel: 7,
      dmgres: "Psychic",
      savetxt: {
        immune: ["frightened"],
      },
      description: desc([
        "You are immune to the frightened condition and gain resistance to psychic damage.",
        "In addition, if a creature attempts to read your mind or telepathically talk to you against your will, it must first make a Wisdom saving throw against your technique save DC. On a failure, it witnesses the horrors within your mind and fails to communicate with you, taking psychic damage equal to your level. On a success, it must repeat the saving throw after each minute spent reading your mind or telepathically talking to you against your will.",
      ]),
    },
    subclassfeature11: {
      name: "Depraved Mind",
      source: [["EldritchHunt", 158]],
      minlevel: 11,
      usages: "Wid mod",
      usagescalc: "event.value = Math.max(1, What('Wis Mod'))",
      recovery: "long rest",
      oncelr: true,
      description: desc([
        "Starting at 11th level, when you damage a creature with your torturer techniques, you can attempt to rattle its mind with the pain. It must succeed on a Wisdom saving throw against your technique save DC or start dissociating your presence, its mind refusing to acknowledge the anguish you are causing it, only perceiving you as a flicker; you become heavily obscured to it for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on a success.",
        "You can use this feature a number of times equal to your Wisdom modifier (minimum 1) and regain all expended uses when you finish a long rest.",
      ]),
    },
    subclassfeature15: {
      name: "Depraved Mind",
      source: [["EldritchHunt", 158]],
      minlevel: 15,
      description: desc([
        "At 15th level, you know how to cause pain to your quarry both physically and mentally. When a creature that you can see within 60 feet of you that failed its saving throw against one of your torturer techniques since the start of your last turn makes a Wisdom, Charisma, or Intelligence saving throw, you can use your reaction to flourish your blades, smile, or perform a similar terrifying display, imposing a -1d10 penalty to the saving throw. Creatures that are immune to the frightened condition are immune to this effect.",
      ]),
    },
  },
});

AddSubClass("rogue", "blade of radiance", {
  regExpSearch: /^(?=.*blade)(?=.*radiance).*$/i,
  subname: "Blade of Radiance",
  fullname: "Blade of Radiance",
  source: [["EldritchHunt", 159]],
  abilitySave: 5, //Wis save DC (from Divine Blessings)
  features: {
    subclassfeature3: {
      name: "Sanctified Champion",
      source: [["EldritchHunt", 159]],
      minlevel: 3,
      armorProfs: [false, true, false, false],
      weaponProfs: [false, true],
      description: desc([
        "At 3rd level, at the end of a long rest, you can perform a ritual on a melee weapon you are proficient with that deals piercing or slashing damage, sanctifying it. It becomes your sanctified blade, and you can only have one such blade at a time. When in your hands, your sanctified blade has the finesse property and is considered silvered.",
      ]),
    },
    "subclassfeature3.1": {
      name: "Divine Blessings",
      source: [["EldritchHunt", 159]],
      minlevel: 3,
      recovery: "short rest",
      oncesr: true,
      usages: "Wis mod",
      usagescalc: "event.value = Math.max(1, 1 + What('Wis Mod'))",
      description: desc([
        "You know the following features that each use your Divine points.",
        "● Armor of the Faithful. When a creature targets you with an attack, you can expend one Divine point as a reaction. The target must make a Wisdom saving throw against your Radiance save DC. On a failed save, the creature must choose a new target or lose the attack or spell, and the creature can’t target you until the start of your next turn. This feature doesn't protect you from area effects, such as the explosion of a fireball.",
        "● Divine Inspiration. When you make a Religion, a History, or an Insight check, you can expend one Divine point to reroll the die and must use the new result. You can choose to do so after you roll the die, but before the outcome is determined. You gain a bonus to the check equal to your Wisdom modifier.",
        "● Rend the Blasphemous. On your turn after taking the Attack action with your sanctified blade, you can expend one Divine point as bonus action to let the divine hand guide you. Make a weapon attack against a creature within your reach. You gain a bonus to your attack roll equal to your Wisdom modifier.",
      ]),
    },
    subclassfeature9: {
      name: "Righteous Armament",
      source: [["EldritchHunt", 160]],
      minlevel: 9,
      description: desc([
        "At 9th level your faith gives you the power to rebel against fate itself. You learn the following features that each use your Divine points:",
        "● Chains of Judgement. When you hit a creature with your sanctified blade, you can expend one Divine point to create radiant chains that restrain the creature. The target must succeed on a Strength saving throw against your Radiance save DC or take radiant damage equal to your Wisdom modifier and become restrained until the end of your next turn.",
        "● Divine Retaliation. When a creature damages you with a melee attack, you can use your reaction and expend one Divine point to make a melee weapon attack with your sanctified blade against the creature. If you hit, you gain a bonus to the attack's damage roll equal to your Wisdom modifier.",
        "● Erupting Blades. When you hit a creature with an attack that could apply your Sneak Attack damage, you can expend one Divine point to cause a rain of radiant blades to fall on the battlefield. Instead of damaging the creature with your Sneak Attack, all creatures in a 20-foot-cone originating from the target (including the target) must make a Dexterity saving throw against your Radiance save DC, taking radiant damage equal to your Wisdom modifier + half your Sneak Attack damage on a failed saving throw, or half as much damage on a successful one.",
      ]),
    },
    subclassfeature13: {
      name: "Saintly Revelations",
      source: [["EldritchHunt", 160]],
      minlevel: 13,
      description: desc([
        "You can speak a command word (no action required) to cause your blade to emit bright light in a 30-foot radius and dim light for an additional 30 feet. The light lasts until you speak the command word again or you stow your weapon. While emitting light in this way, the weapon is considered a magic weapon and attacks made with it deal an extra 2d4 radiant damage on a hit.",
        "In addition, while wielding the blade, as an action, you can cast spirit guardians, requiring no components. Creatures within the area of the spell are considered within 5 feet of an enemy for the purposes of your Sneak Attack. Once you cast the spell in this way, you can't do so again until you finish a long rest, unless you expend three Divine points to use it again.",
      ]),
    },
  },
});

AddSubClass("rogue", "shadow", {
  regExpSearch: /^(?=.*eldritch|shadow).*$/i,
  subname: "Shadow Rogue",
  fullname: "Shadow Rogue",
  source: [["EldritchHunt", 161]],
  features: {
    subclassfeature3: {
      name: "Umbral Weapon",
      source: [["EldritchHunt", 162]],
      weaponProfs: [false, false, ["firearm"]],
      description: desc([
        "You learn to make an umbral weapon by wreathing a rifle in shadows with a grim ritual. You perform the ritual over the course of 1 hour, which can be done during a short rest or long rest. The rifle must be within your reach throughout the ritual, at the conclusion of which you touch the weapon and bond with it.",
        "Once you have bonded a rifle to yourself, you can't be disarmed of it unless you are incapacitated. If it is on the same plane of existence, you can summon the rifle (no action required) on your turn, causing it to teleport instantly to your hand. Your umbral weapon keeps its original properties with the following alterations when you use it: it doesn't have the Barrel property, it doesn’t require ammunition, and it doesn’t make sound when fired.",
        "You can only have one bonded weapon. If you attempt to bond with a second weapon, your bond with the first one ends.",
      ]),
    },
    "subclassfeature3.1": {
      name: "Shadow Movement",
      source: [["EldritchHunt", 162]],
      description: desc([
        "When you are in darkness, you can use your bonus action to take the Hide action with advantage on the Stealth check and turn into a shadowy, amorphous version of yourself. While in this form, you have advantage on Stealth checks, can move through a space as narrow as 1 inch wide without squeezing, have a climbing speed equal to your walking speed, and are incapacitated. This transformation ends after 1 minute, if you enter dim or bright light, or if you take damage.",
        "You can choose to end the transformation early (no action required) on your turn. If you do so and are in darkness, you can make one weapon attack with your umbral weapon, weaving shadows into a bullet; if you miss, your location isn’t revealed. The damage die of this attack is 1d4, instead of the weapon’s regular damage die.",
      ]),
    },
    subclassfeature9: {
      name: "Tenebrous Body",
      source: [["EldritchHunt", 162]],
      vision: [["Normal vision", 120]],
      description: desc([
        "You can see normally in darkness and dim light, both magical and nonmagical, to a distance of 120 feet. In addition, you can maintain the transformation of your Shadow Movement for up to 1 hour.",
      ]),
    },
    subclassfeature13: {
      name: "Grim Curse",
      source: [["EldritchHunt", 162]],
      abilitySave: 2, //Dex save DC (from Grim Curse)
      description: desc([
        "When you hit a creature with your umbral weapon and deal Sneak Attack damage to it, you can sacrifice up to three of your Sneak Attack damage dice. Each die sacrificed in this way doesn't deal damage. Instead, the target must make a saving throw (DC equals 8 + your Dexterity modifier + your proficiency bonus). On a failure, it suffers a condition until the start of your next turn. If you and the target are in darkness, the target suffers a - 1d6 penalty to its saving throw. The type of saving throw and resulting condition are based on the number of Sneak Attack damage dice you sacrifice.",
        "1 Sneak Attack Die Sacrifice: cause Prone + Dex Save",
        "2 Sneak Attack Dice Sacrifice: cause Restrained + Str Save",
        "3 Sneak Attack Dice Sacrifice: cause Blinded + Con Save",
      ]),
    },
    subclassfeature17: {
      name: "Veil of Shadows",
      source: [["EldritchHunt", 162]],
      description: desc([
        "When you use your Uncanny Dodge feature, you can choose to teleport to an unoccupied space you can see within 30 feet of you that is in darkness and make one attack with your umbral weapon against the attacker. If there are no such spaces available, you can’t teleport, but you can make the attack if you are already in darkness.",
      ]),
    },
  },
});

AddSubClass("sorcerer", "scion of madness", {
  regExpSearch: /^(?=.*madness)(?=.*scion).*$/i,
  subname: "Scion of Madness",
  fullname: "Scion of Madness",
  source: [["EldritchHunt", 161]],
  features: {
    subclassfeature1: {
      name: "Mind of Madness",
      source: [["EldritchHunt", 164]],
      description: desc([
        "Whenever you gain a madness, you can choose to reroll on the appropriate table, gaining the new effect instead.",
        "In addition, when a creature attempts to read your thoughts or scry on you, they can only witness the insanity that ravages you. They take psychic damage equal to your level in this class, their magic or ability fails, and they must succeed on a Wisdom saving throw against your spell save DC or gain a short-term madness.",
      ]),
    },
    "subclassfeature1.1": {
      name: "Spread of Chaos",
      source: [["EldritchHunt", 164]],
      description: desc([
        "When you cast a spell of 1st level or higher that doesn’t have a range of self, you can cause each creature affected by the spell to make a Wisdom saving throw against your spell save DC or gain a short- term madness.",
        "If your spell targets more than one creature, you must make a Charisma saving throw against a DC equal to 10 + the spell level + the number of creatures targeted by the spell. On a failure, the spell fails and you gain one short- term madness, but you do not expend the spell slot nor the use of this feature. On a success, each creature is affected as normal. Once you use this feature, you must finish a long rest before you can use it again.",
        "Any time before you regain the use of this feature, the GM can have you roll on the Short-Term Madness table (see page 271) immediately after you cast a sorcerer spell of 1st level or higher. You then regain the use of this feature.",
      ]),
    },
    subclassfeature6: {
      name: "Depths of Depravity",
      source: [["EldritchHunt", 164]],
      description: desc([
        "When a creature that you can see within 120 feet of you must make a saving throw, if you are affected by at least one madness, you can use your reaction to add insanity to the magic, giving the creature disadvantage on the saving throw. If the creature fails the saving throw, you feed on the ensuing chaos; you regain a sorcery point for each madness affecting you.",
        "Once you use this feature to regain sorcery points, you can't use it again until you finish a short or long rest.",
      ]),
    },
    subclassfeature14: {
      name: "Powers of Insanity",
      source: [["EldritchHunt", 164]],
      description: desc([
        "At 14th level, whenever you roll on a madness table and roll a d10 to determine which specific aspect of the madness overtakes you, you can roll a second d10 and choose the lower result of the two. In addition, gaining a madness doesn’t cause you to be stunned.",
      ]),
    },
    subclassfeature18: {
      name: "Maddening Hunger",
      source: [["EldritchHunt", 164]],
      description: desc([
        "At 18th level, whenever you gain a madness, you regain sorcery points: short term madness, 1d4 sorcery points; long- term madness, 2d4 sorcery points; and indefinite madness, 4d4 sorcery points.",
      ]),
    },
  },
});

AddSubClass("warlock", "the void", {
  regExpSearch: /^(?=.*void).*$/i,
  subname: "The Void",
  fullname: "The Void",
  source: [["EldritchHunt", 165]],
  spellcastingExtra: [
    "feather fall",
    "gravity leap",
    "otherworldly gaze",
    "pressure cage",
    "astral barrage",
    "blink",
    "black tentacles",
    "resilient sphere",
    "telekinesis",
    "starfall",
  ],
  features: {
    subclassfeature1: {
      name: "Fugite Omnis",
      source: [["EldritchHunt", 165]],
      description: desc([
        "You gain the ability to hover a few inches off the ground. You can ascend and descend as part of your movement. You can’t hover more than a foot above the ground and fall if you are above that height. If you were to be knocked prone while hovering, you are instead made to stand on the ground.",
      ]),
    },
    "subclassfeature1.1": {
      name: "Voracious Void",
      source: [["EldritchHunt", 166]],
      action: [["bonus action", ""]],
      usages: 1,
      recovery: "long rest",
      oncelr: true,
      description: desc([
        "At 1st level, as a bonus action, you can create a miniature black hole, in the form of a 5-foot-diamater sphere, centered on a point on the ground that you can see within 60 feet. This black hole has a domain of influence of 5 feet beyond its own radius. It lasts for 1 minute or until your concentration is broken (as if you are concentrating on a spell). The black hole is considered difficult terrain for all creatures except for you.",
        "When the sphere appears and at the start of each of your turns until the ability ends, unsecured objects within the domain of influence of the miniature black hole are pulled toward the sphere's center, ending in an unoccupied space as close to the center as possible.",
        "As part of creating the sphere, and on subsequent turns as a bonus action, you can choose a creature within the domain of influence of the black hole, increasing the pull of gravity around them. They must succeed on a Strength saving throw against your spell save DC or be pulled straight toward the sphere's center, ending in an unoccupied space as close to the center as possible. A creature that enters the black hole’s space for the first time on a turn or starts its turn there takes 1d6 magical bludgeoning damage and its speed is halved until the start of its next turn.",
        "Once you use this feature, you can’t use it again until you finish a long rest, unless you expend a warlock spell slot to use it again.",
        "This miniature black hole grows with you. When your pact magic increases in power, so does this feature:",
        "● At 3rd level in this class, when a creature enters the black hole's space for the first time on a turn or starts its turn there, it is restrained for the duration. A restrained creature can attempt to free itself by using an action to make an Athletics check against your spell save DC. On a success, the creature is no longer restrained by the black hole and is moved to the nearest unoccupied space outside the black hole.",
        "● At 5th level in this class, the domain of influence of the sphere increases to 10 feet and is considered difficult terrain for all creatures except for you. A creature reduced to 0 hit points while inside the black hole is annihilated, along with any nonmagical items it is wearing or carrying.",
        "● At 9th level in this class, the damage increases to 2d6 and the sphere’s domain of influence to 20 feet. You can summon the black hole at any point that you can see, not just on the ground. If the sphere is in the air, creatures restrained by it hover inside the black hole.",
      ]),
    },
    subclassfeature6: {
      name: "Voracious Void",
      source: [["EldritchHunt", 166]],
      action: [["reaction", ""]],
      description: desc([
        "At 6th level, when a creature you can see within 120 feet of you is targeted by a ranged attack, if your Voracious Void is active, you can use your reaction to divert the strike. If the attack passes through the miniature black hole or its domain of influence, you can make a ranged spell attack. If you roll higher than their attack roll, you deflect the trajectory and the target takes no damage. If you roll lower, you reduce the damage by 1d6 + your Charisma modifier. If you roll a 20, the attack is deflected and streaks towards the center of the black hole, randomly hitting one of the creatures inside, if any are present.",
      ]),
    },
    subclassfeature10: {
      name: "Warp Gravity",
      source: [["EldritchHunt", 166]],
      // speed: {
      //   fly : { spd : What("speed.walk.spd"), enc : What("speed.walk.spd") - 10 },
      // },
      description: desc([
        "At 10th level, you can bend gravity around you at will, allowing you to move through the air as if you were walking on solid ground. You gain a flying speed equal to your walking speed and can hover. You can grant these benefits to one creature that is touching you. They lose this flying speed immediately if they are no longer in contact with you.",
      ]),
    },
    subclassfeature14: {
      name: "Oblivion",
      source: [["EldritchHunt", 166]],
      usages: 1,
      recovery: "long rest",
      oncelr: true,
      description: desc([
        "At 14th level, you can unleash the ravenous hunger of the void. When you use your Voracious Void ability, you can choose to let it run wild. In that case, rather than as a bonus action, whenever a creature starts its turn within the black hole or its domain of influence, they must succeed on a Strength saving throw against your spell save DC or be pulled to the center. You and your choice of a number of creatures equal to your Charisma modifier (minimum 1) aren't affected by this effect.",
        "Once you use this feature, you can’t do so again until you finish a long rest.",
      ]),
    },
  },
});

AddSubClass("wizard", "osteomancer", {
  regExpSearch: /^(?=.*osteomancer).*$/i,
  subname: "Osteomancer",
  fullname: "Osteomancer",
  source: [["EldritchHunt", 170]],
  features: {
    subclassfeature2: {
      name: "Brittle Bone Armor",
      source: [["EldritchHunt", 170]],
      action: [["bonus action", ""]],
      usages: 1,
      recovery: "short rest",
      oncesr: true,
      description: desc([
        "Starting at 2nd level, you learn the basics of osteomancy, using it for protection. As a bonus action, if you're not wearing armor or wielding a shield, you can force a frame of bones out of your body to protect you. This grants you temporary hit points equal to 2 times your level in this class.",
        "This armor lasts for one minute, or until you lose the temporary hit points. While you have these temporary hit points, you gain resistance to slashing and piercing damage, and you gain a bonus to AC equal to one-third your level in this class (rounded down, minimum of 1). Once you've used this feature, you can't use it again until you finish a short or long rest.",
      ]),
    },
    "subclassfeature2.1": {
      name: "Anatomical Expert",
      source: [["EldritchHunt", 171]],
      skills: ["Medicine"],
      description: desc([
        "You gain proficiency in Medicine checks, and when you make a Medicine check, you gain a bonus to the check equal to your Intelligence modifier. In addition, when this check concerns a creature that possesses a skeleton, you add double your proficiency bonus to the check, instead of your normal proficiency bonus.",
      ]),
    },
    subclassfeature6: {
      name: "Bone Puppetry",
      source: [["EldritchHunt", 171]],
      action: [["action", ""]],
      usages: "Int mod",
      usagescalc: "event.value = Math.max(1, 1 + What('Int Mod'))",
      recovery: "long rest",
      oncelr: true,
      description: desc([
        "Beginning at 6th level, as an action, you focus your grim magic towards a creature with bones within 60 feet of you. It must make a Strength saving throw against your spell save DC. On a failure, you take total and precise control of its skeleton. Until the end of the creature's next turn, it takes only the actions you choose and doesn't do anything that you don't allow it to do. In the creature’s efforts to resist your command, attack rolls it makes against its allies have disadvantage, and its allies have advantage on saving throws from effects caused by the creature.",
        "You can only have one such creature under your control at a time. You can use this feature a number of times equal to your Intelligence modifier (a minimum of once), and you regain all expended uses when you finish a long rest.",
      ]),
    },
    subclassfeature10: {
      name: "Skeletal Mastery",
      source: [["EldritchHunt", 171]],
      action: [["action", "Dissolve Bones"], ["bonus action", "Regenerate hand bones"]],
      spellcastingBonus : {
        name : "Skeletal Mastery",
        spells : ["alter self"],
        selection : ["alter self"],
        firstCol : 'atwill'
      },
      description: desc([
        "You can cast alter self at will, without expending a spell slot or needing to concentrate on the spell. When you cast this spell using this feature, you can only use the Change Appearance or Natural Weapons options.",
        "In addition, you also gain the ability to dissolve or restore your own skeleton as an action. While boneless, you can move yourself through sheer muscular and magical control. In this form, your speed becomes 10 feet, and you can move through a space as narrow as 5 inches without squeezing. Further, you are considered prone, cannot use your hands, and you can’t attack or cast spells. As a bonus action, you can regenerate the bones in your hands to exert finer control over them until the end of your next turn."
      ]),
    },
    subclassfeature10: {
      name: "Improved Bone Puppetry",
      source: [["EldritchHunt", 171]],
      description: desc([
        "When a creature fails its saving throw against your Bone Puppetry feature, your control of the creature lasts for 1 minute instead. The creature can’t resist your command; it doesn’t suffer disadvantage on attacks against its allies, nor do they have advantage on saves against effects caused by the creature. The creature can repeat the saving throw at the end of each of its turns, ending the effect on a success. You must concentrate on this feature as you would concentrate on a spell, and damage can't break your concentration.",
        "Once under your control, when the creature repeats the saving throw against your Bone Puppetry, you can choose to expend one additional use of the feature to give the creature disadvantage on the save. You must decide to do so before seeing the result of the roll."
      ]),
    },
  },
});
