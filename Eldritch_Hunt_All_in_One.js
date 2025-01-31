if (sheetVersion < 13001012) {
  throw "This script was made for a newer version of the sheet (v13.1.14). Please use the latest version and try again.\nYou can get the latest version at www.flapkan.com.";
}
var iFileName = "Eldritch_Hunt_All_in_One.js";
RequiredSheetVersion("13.1.12");

SourceList["EldritchHunt"] = {
  name: "Steinhardt's Guide to the Eldritch Hunt",
  abbreviation: "SGttEH",
  abbreviationSpellsheet: "SGttEH",
  group: "3rd Party Campaign Sourcebooks",
  date: "2024/07/01",
};

//Classes and Subclasses


// Define Jaeger-specific Fighting Styles
var JaegerFightingStyles = {
  dueling: {
    name: "Dueling Fighting Style",
    description: desc(
      "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons"
    ),
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          for (var i = 1; i <= FieldNumbers.actions; i++) {
            if (/off.hand.attack/i.test(What("Bonus Action " + i))) return;
          }
          if (
            v.isMeleeWeapon &&
            !v.isNaturalWeapon &&
            !/((^|[^+-]\b)2|\btwo).?hand(ed)?s?\b/i.test(fields.Description)
          )
            output.extraDmg += 2;
        },
        "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists.",
      ],
    },
  },
  great_weapon: {
    name: "Great Weapon Fighting Style",
    description: desc(
      "Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands"
    ),
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (
            v.isMeleeWeapon &&
            /(\bversatile|((^|[^+-]\b)2|\btwo).?hand(ed)?s?)\b/i.test(
              fields.Description
            )
          ) {
            fields.Description +=
              (fields.Description ? "; " : "") +
              "Re-roll 1 or 2 on damage die" +
              (/versatile/i.test(fields.Description) ? " when two-handed" : "");
          }
        },
        "While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once.",
      ],
    },
  },
  flexible_fighting: {
    name: "Flexible Fighting Style",
    description: desc(
      "Engage in two-weapon fighting with any one-handed weapons, including ranged weapons, gaining +1 to both weapons' damage rolls"
    ),
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (v.isMeleeWeapon || v.isRangedWeapon) output.extraDmg += 1;
        },
        "When engaging in two-weapon fighting with any one-handed weapons, including ranged weapons, I gain a +1 bonus to both weapons' damage rolls.",
      ],
    },
  },
  focused_fighting: {
    name: "Focused Fighting Style",
    description: desc("Gain an additional Focus Art and 1 extra Focus Point"),
    addMod: [
      {
        type: "focus points",
        field: "Max",
        mod: 1,
        text: "I gain an extra Focus Point.",
      },
    ],
  },
  two_weapon: {
    name: "Two-Weapon Fighting Style",
    description: desc(
      "Add ability modifier to the damage of off-hand attacks during two-weapon fighting"
    ),
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (v.isOffHand) output.modToDmg = true;
        },
        "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks. If a melee weapon includes 'off-hand' or 'secondary' in its name or description, it is considered an off-hand attack.",
      ],
    },
  },
};

ClassList["jaeger"] = {
  regExpSearch: /jaeger/i,
  name: "Jaeger",
  source: ["SGttEH", 32], // Steinhardt's Guide to the Eldritch Hunt, page 32
  primaryAbility: "Dexterity",
  prereqs: "Dexterity 13",
  die: 8,
  improvements: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
  attacks: [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  saves: ["Dex", "Int"],
  skillstxt:
    "Choose two from Acrobatics, Arcana, Athletics, History, Investigation, Medicine, Nature, Perception, Religion, Sleight of Hand, Stealth, and Survival",
  armorProfs: {
    primary: [true, true, false, false],
    secondary: [true, true, false, false],
  },
  weaponProfs: {
    primary: [true, true],
    secondary: [true, true],
  },
  equipment:
    "Jaeger starting equipment: \n \u2022 Two martial weapons\n \u2022 (a) a pistol and pouch of 20 bullets or (b) any two simple weapons\n \u2022 (a) scale mail or (b) leather armor\n \u2022 (a) a dungeoneer's pack or (b) an explorer's pack",
  subclasses: ["Jaeger Chapter", []],
  features: {
    "flexible combatant": {
      name: "Flexible Combatant",
      source: ["SGttEH", 33],
      description:
        "\nI can draw or stow two one-handed weapons when I would normally only be able to do one." +
        "\nI can reload weapons with the loading, reload, or barrel properties without a free hand." +
        "\nIf I carry a one-handed melee weapon in one hand and a one-handed ranged weapon in the other, I don't have disadvantage on ranged attacks from being within 5 feet of a hostile creature.",
    },
    "eldritch hunter": {
      name: "Eldritch Hunter",
      source: ["SGttEH", 33],
      minlevel: 1,
      description:
        "Also at 1st level, when you make an ability check to track or identify an aberration, celestial, fiend, monstrosity, or undead, you can add your proficiency bonus to the ability check. If you are already proficient in the ability check, you can double your proficiency bonus.",
    },
    "subclassfeature1.1": {
      name: "Focus Points",
      source: ["SGttEH", 33],
      minlevel: 1,
      description:
        "\n   I gain Focus Points to use special Focus Arts. I start with 1 Focus Point and gain more as I level." +
        "\n   I regain all expended Focus Points after a short or long rest." +
        "\n   When I roll a 20 on a saving throw or attack roll, or when I roll initiative with no Focus Points, I regain 1 Focus Point.",
      recovery: "short rest",
      usages: levels.map(function (n) {
        return n < 2 ? 1 : n < 5 ? 2 : n < 9 ? 3 : n < 13 ? 4 : n < 17 ? 5 : 6;
      }),
    },
    "subclassfeature1.2": {
      name: "Focus Arts",
      source: [["SGttEH", 33]],
      minlevel: 1,
      description: "You can expend Focus Points to use Focus Arts.",
      // usages: 0,
      additional: levels.map(function (n) {
        return (
          (n < 2 ? 1 : n < 7 ? 2 : n < 13 ? 3 : n < 17 ? 4 : 5) +
          " extra arts known"
        );
      }),
      toNotesPage: [
        {
          name: "Weapon Parry [Focus Art]",
          source: ["SGttEH", 46],
          minlevel: 6,
          note: "\n   As a reaction when a creature hits me with a melee attack, I can expend 1 Focus Point to add my Momentum die to my AC against that attack, potentially causing it to miss.",
          action: ["reaction", ""],
          page3notes: true,
        },
        {
          name: "Dodge Step [Focus Art]",
          source: ["SGttEH", 46],
          minlevel: 10,
          note: "\n   As a reaction when I am targeted by an attack or forced to make a Dexterity saving throw, I can expend 1 Focus Point to move up to half my speed without provoking opportunity attacks.",
          action: ["reaction", ""],
          page3notes: true,
        },
      ],
      extraname: "Focus Art",
      extrachoices: [
        "Aerial Vault",
        "Elemental Art",
        "Focus Mind",
        "Flourish",
        "I Don't Want To Be Eaten Today",
        "Jaeger's Rush",
        "Jaeger's Assessment",
      ],
      extraTimes: levels.map(function (n) {
        return n < 2 ? 1 : n < 7 ? 2 : n < 13 ? 3 : n < 17 ? 4 : 5;
      }),
      "aerial vault": {
        name: "Aerial Vault [Finisher]",
        source: ["SGttEH", 46],
        description:
          "\n   When you make a jump, you can expend 1 Focus Point to double your jumping distance for that jump, and you can ignore difficult terrain until the end of your turn.\n   The maximum distance you can jump isn’t limited by your walking speed.",
      },
      "elemental art": {
        name: "Elemental Art [Finisher]",
        source: ["SGttEH", 46],
        description:
          "\n   As a bonus action, expend 1 Focus Point and touch a weapon you're carrying. Choose acid, cold, fire, or lightning. For 1 minute, the weapon deals that damage type instead of its normal type.",
        action: ["bonus action", ""],
      },
      "focus mind": {
        name: "Focus Mind [Finisher]",
        source: ["SGttEH", 46],
        description:
          "\n   As a reaction to making a saving throw against being charmed, frightened, or having your mind read, you can expend 1 Focus Point to gain advantage on the roll. If you already have advantage, you can reroll one die.",
        action: ["reaction", ""],
      },
      flourish: {
        name: "Flourish [Finisher]",
        source: ["SGttEH", 46],
        description:
          "\n   As a bonus action, expend 1 Focus Point and gain 1 additional Momentum die (gaining 2 total, including the die from the Momentum feature).",
        action: ["bonus action", ""],
      },
      "i don't want to be eaten today": {
        name: "I Don't Want To Be Eaten Today",
        source: ["SGttEH", 46],
        description:
          "\n   As a reaction to becoming grappled or restrained by an effect with an escape DC, or to making a contested roll against these conditions, you can expend 1 Focus Point to immediately attempt to escape, making an Athletics or Acrobatics check against the escape DC, or gain advantage on the contested roll.",
        action: ["reaction", ""],
      },
      "jaeger's rush": {
        name: "Jaeger's Rush [Finisher]",
        source: ["SGttEH", 46],
        description:
          "\n   As a bonus action, expend 1 Focus Point to take the Dash action.",
        action: ["bonus action", ""],
      },
      "jaeger's assessment": {
        name: "Jaeger's Assessment [Finisher]",
        source: ["SGttEH", 46],
        description:
          "\n   As a bonus action, expend 1 Focus Point to make an Investigation check against a creature within 60 feet, contested by its Deception check. On success, learn its creature type, AC, resistances or immunities, and any spells affecting it. Alternatively, take the Search action.",
        action: ["bonus action", ""],
      },
    },
    momentum: {
      name: "Momentum",
      source: ["SGttEH", 34],
      minlevel: 2,
      description:
        "\n   When I expend a Focus Point, I gain 1 Momentum die (d6). The size increases with my level (d8 at 11th level, d10 at 17th).\n   I can have Momentum dice up to my proficiency bonus + Strength or Dexterity modifier.\n   Momentum dice can be used to execute Brutal Finishers.",
      additional: [
        "",
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
        "d8",
        "d10",
        "d10",
        "d10",
        "d10",
      ],
      usagescalc:
        "event.value = Number(How('Proficiency Bonus')) + Number(Math.max(What('Str Mod'), What('Dex Mod')))", //warning: this is the max amount you can have, not the available number of dice can use.
    },
    "brutal finishers": {
      name: "Brutal Finishers",
      source: ["SGttEH", 47],
      minlevel: 2,
      description:
        "\n   I gain access to Brutal Finishers, powerful attacks that consume Momentum dice.",
      toNotesPage: [
        {
          name: "Breaking Blow [Finisher]",
          source: ["SGttEH", 44],
          note: "\n   When you hit a creature with an attack, expend all Momentum dice to force a saving throw (DC = 8 + Str/Dex mod + prof bonus). On a failure, inflict a condition based on dice expended for 1 minute: Prone [Str Save] (1 die), Blinded [Con Save] (2 dice), Restrained [Str Save] (3 dice), Stunned [Con Save] (4 dice), or Paralyzed [Con Save] (5+ dice). The target can repeat the saving throw at the end of its turns, ending the effect on a success. If the condition is Prone, it ends as normal when standing. Regain 1 Focus Point on a failed save.",
          page3notes: true,
        },
        {
          name: "Chasing Finisher [Finisher]",
          source: ["SGttEH", 44],
          note: "\n   As a bonus action, expend all Momentum dice to move 10 feet per die expended before making a melee attack. Add the Momentum dice to the damage. If you move at least 30 feet, regain 1 Focus Point.",
          action: ["bonus action", ""],
          page3notes: true,
        },
        {
          name: "Hemorrhaging Wound [Finisher]",
          source: ["SGttEH", 44],
          note: "\n   When you hit a creature with an attack, expend all Momentum dice to cause bleeding damage. At the end of each of its turns, the creature loses hit points equal to the Momentum dice expended. Each time it takes this damage, the dice are reduced by 1. The bleeding stops when no dice remain. The target can make a Con save (DC = 8 + Str/Dex mod + prof bonus + half remaining dice) to end the effect at the end of its turns. Applying a new bleed refreshes the dice to the higher of the two values.",
          page3notes: true,
        },
        {
          name: "Opportunistic Shot [Finisher]",
          source: ["SGttEH", 45],
          note: "\n   As a reaction when a creature within 20 feet becomes paralyzed, restrained, or stunned, expend all Momentum dice to make a firearm attack. On a hit, add the Momentum dice to the damage, knock the target prone, and regain 1 Focus Point.",
          action: ["reaction", ""],
          page3notes: true,
        },
        {
          name: "Vicious Finisher [Finisher]",
          source: ["SGttEH", 45],
          note: "\n   As a bonus action, expend all Momentum dice to form a spectral claw and make a melee attack. On a hit, deal 1d12 + Str mod + Momentum dice slashing damage. Reduce the crit range by 2 for each die expended, up to a maximum of 10-20 with 5 dice. Regain 1 Focus Point on a critical hit.",
          action: ["bonus action", ""],
          page3notes: true,
        },
        {
          name: "Volley Finisher [Finisher]",
          source: ["SGttEH", 45],
          note: "\n   As a bonus action while holding a firearm, expend all Momentum dice to fire in a 30-foot cone. Each creature in the cone must make a Dexterity save (DC = 8 + Dex mod + prof bonus) or take piercing damage equal to the Momentum dice expended. Regain 1 Focus Point if 2 or more creatures are damaged.",
          action: ["bonus action", ""],
          page3notes: true,
        },
      ],
    },
    "fighting style": {
      name: "Fighting Style",
      source: ["SGttEH", 45],
      minlevel: 2,
      description: desc(
        'Choose a Fighting Style for the Jaeger using the "Choose Feature" button above'
      ),
      choices: [
        "Dueling",
        "Great Weapon Fighting",
        "Flexible Fighting",
        "Focused Fighting",
        "Two-Weapon Fighting",
      ],
      dueling: JaegerFightingStyles.dueling,
      "great weapon fighting": JaegerFightingStyles.great_weapon,
      "flexible fighting": JaegerFightingStyles.flexible_fighting,
      "focused fighting": JaegerFightingStyles.focused_fighting,
      "two-weapon fighting": JaegerFightingStyles.two_weapon,
    },
    "jaeger chapter": {
      name: "Jaeger Chapter",
      source: ["SGttEH", 45],
      minlevel: 3,
      description: desc(
        'Choose a Jaeger Chapter you strive to emulate and put it in the "Class" field '
      ),
    },
    "piercing gaze": {
      name: "Piercing Gaze",
      source: ["SGttEH", 35],
      minlevel: 3,
      description:
        "\nAlso at 3rd level, you gain the ability to activate a magical sight at will (no action required), allowing you to effortlessly pierce the gloom and see what lurks within. For 1 hour, you gain darkvision out to a range of 60 feet. If you already have darkvision, its range increases to 120 feet. This vision lets you see normally in dim light and darkness, both magical and nonmagical." +
        "\nWhen you reach 7th level, you also gain the effect of see invisibility for the duration, and when you reach 13th level, you additionally gain the effect of true seeing for the duration." +
        "\nOnce you use this feature, you can’t use it again until you finish a long rest.",
      action: ["action", "(free)"],
      usages: 1,
      recovery: "long rest",
    },
    subclassfeature4: {
      name: "Seasoned Survivor",
      source: ["SGttEH", 36],
      minlevel: 4,
      description:
        "\n   I gain advantage on Investigation checks to find secret passages, interpret markings, or determine the fate of creatures from blood stains and remains.",
    },
    "subclassfeature6.1": {
      name: "Hunter's Pursuit",
      source: ["SGttEH", 37],
      minlevel: 6,
      description:
        "\n   At the start of my turn, I can expend 1 Focus Point to move up to half my speed without using my movement and without provoking opportunity attacks.",
    },
    subclassfeature9: {
      name: "Evasion",
      source: ["SGttEH", 38],
      minlevel: 9,
      description:
        "\n   When subjected to an effect that allows me to make a Dexterity saving throw for half damage, I instead take no damage on a success and half damage on a failure.",
    },
    "subclassfeature11.1": {
      name: "Lethal Tempo",
      source: ["SGttEH", 39],
      minlevel: 11,
      description:
        "\n   The first time I hit a creature on my turn, I gain 1 Momentum die. I gain an additional Momentum die when I reduce a creature to 0 hit points.",
    },
    subclassfeature13: {
      name: "Relentless Pursuit",
      source: ["SGttEH", 40],
      minlevel: 13,
      description:
        "\n   When I use Hunter's Pursuit and end my movement next to a hostile creature, I regain the expended Focus Point.",
    },
    "subclassfeature15.1": {
      name: "Inured to Madness",
      source: ["SGttEH", 41],
      minlevel: 15,
      description:
        "\n   I gain advantage on saving throws against being charmed, frightened, and effects causing madness. If I fail a save against madness, I can expend 1 Focus Point to reroll, using the new roll.",
    },
    subclassfeature18: {
      name: "Eternal Watch",
      source: ["SGttEH", 42],
      minlevel: 18,
      description:
        "\n   I am always under the effect of my Piercing Gaze feature.",
    },
    subclassfeature20: {
      name: "Always Ready",
      source: ["SGttEH", 43],
      minlevel: 20,
      description:
        "\n   Once per round at the start of my turn, I gain one additional reaction. This reaction can only be used on a Focus Art requiring a reaction. When I expend a Focus Point on this special reaction, I immediately regain the expended Focus Point.",
    },
  },
};

// Define Jaeger Chapters (Subclasses)
AddSubClass("jaeger", "absolute", {
  regExpSearch: /^(?=.*absolute)(?=.*chapter).*$/i,
  subname: "Absolute Chapter",
  source: ["SGttEH", 38],
  features: {
    subclassfeature3: {
      name: "Counter Strike",
      source: ["SGttEH", 38],
      minlevel: 3,
      description:
        "\n   When I use the Weapon Parry Focus Art, my damage roll increases by half my Jaeger level (rounded down). If the damage blocked exceeds the incoming damage and my attack roll would hit their AC, the target takes the remaining damage.\n   Additionally, whenever I expend a Focus Point on a Focus Art, I gain advantage on my next weapon attack before the end of my next turn.",
    },
    "subclassfeature3.1": {
      name: "Unencumbered Movement",
      source: ["SGttEH", 38],
      minlevel: 3,
      description:
        "\n   While wearing light armor or no armor, my speed increases by 10 feet, and the distance I can move with the Dodge Step Focus Art increases by 5 feet.",
      changeeval: function (v) {
        var jaegerSpd = v.mediumArmor || v.heavyArmor ? "+0" : "+10";
        SetProf(
          "speed",
          jaegerSpd !== "+0",
          { allModes: jaegerSpd },
          "Jaeger: Unencumbered Movement"
        );
      },
    },
    subclassfeature7: {
      name: "Encircling Strike",
      source: ["SGttEH", 38],
      minlevel: 7,
      description:
        "\n   If I move to the opposite side of a creature from where I started my turn, or if I am directly opposite an allied creature, I deal extra damage to the target equal to my Momentum die the first time I hit it with a melee weapon attack.",
    },
    subclassfeature14: {
      name: "Mobile Pursuer",
      source: ["SGttEH", 41],
      minlevel: 14,
      description:
        "\n   When I move as part of my Hunter's Pursuit, I ignore difficult terrain, can pass through hostile creatures, and don’t need to spend extra movement to climb or swim.",
    },
    subclassfeature17: {
      name: "The Hunt",
      source: ["SGttEH", 43],
      minlevel: 17,
      description:
        "\n   I can declare a hunt for 1 minute, gaining the effects of freedom of movement and 2 Momentum dice for each Focus Point expended. This ends early if I become incapacitated or end it early as a bonus action. Once used, I can't use it again until I finish a long rest.",
    },
  },
});

AddSubClass("jaeger", "heretic", {
  regExpSearch: /^(?=.*heretic)(?=.*chapter).*$/i,
  subname: "Heretic Chapter",
  source: ["SGttEH", 39],
  abilitySave: 4,
  spellcastingAbility: 4, //TODO: check this pls
  spellcastingFactor: "warlock3",
  spellcastingList: {
    class: "warlock",
    level: [0, 4],
  },
  spellcastingKnown: {
    cantrips: [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    spells: [0, 0, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7],
  },
  features: {
    subclassfeature3: {
      name: "Heretic Magic",
      source: ["SGttEH", 39],
      minlevel: 3,
      description:
        "\n   I gain the ability to cast spells from the warlock spell list using Intelligence as my spellcasting ability.\n   I learn two cantrips from the warlock spell list and gain spell slots according to the Heretic Spellcasting table.",
      additional: [
        "",
        "",
        "2 cantrips \u0026 2 spells known",
        "2 cantrips \u0026 2 spells known",
        "2 cantrips \u0026 2 spells known",
        "2 cantrips \u0026 3 spells known",
        "2 cantrips \u0026 3 spells known",
        "2 cantrips \u0026 3 spells known",
        "2 cantrips \u0026 4 spells known",
        "3 cantrips \u0026 4 spells known",
        "3 cantrips \u0026 4 spells known",
        "3 cantrips \u0026 5 spells known",
        "3 cantrips \u0026 5 spells known",
        "3 cantrips \u0026 5 spells known",
        "3 cantrips \u0026 6 spells known",
        "3 cantrips \u0026 6 spells known",
        "3 cantrips \u0026 6 spells known",
        "3 cantrips \u0026 7 spells known",
        "3 cantrips \u0026 7 spells known",
        "3 cantrips \u0026 7 spells known",
      ],
    },
    "subclassfeature3.1": {
      name: "Arcane Arts [Focus Art]",
      source: ["SGttEH", 39],
      minlevel: 3,
      description:
        "\n   I learn the Spell Flurry Focus Art, which does not count against my Focus Arts known.",
      toNotesPage: [
        {
          name: "Spell Flurry [Focus Art]",
          source: ["SGttEH", 38],
          minlevel: 6,
          note: "\n   When I cast a cantrip or a spell of 1st level or higher, I can expend 1 Focus Point to make a single weapon attack as a bonus action.",
          action: ["bonus action", ""],
          page3notes: true,
          amendTo: "Focus Arts",
        },
      ],
    },
    subclassfeature7: {
      name: "Shrouded Steps",
      source: ["SGttEH", 41],
      minlevel: 7,
      description:
        "\n   At 7th level, when you use a jaeger feature that allows you to move without spending your movement (such as Jaeger’s Rush or Chasing Finisher), you can teleport the distance moved instead. When you do so for Dodge Step, you automatically succeed on the the saving throw to evade the attack.",
    },
    subclassfeature14: {
      name: "Mystical Momentum",
      source: ["SGttEH", 41],
      minlevel: 14,
      description:
        "Beginning at 14th level, when you expend a spell slot, you gain a number of Momentum dice equal to the level of the spell slot expended.",
    },
    subclassfeature17: {
      name: "Darkness Within",
      source: ["SGttEH", 43],
      minlevel: 17,
      description:
        "\n   Starting at 17th level, you can unleash the twisted powers you've bound to your soul, taking on a terrifying aspect as a bonus action. For 1 minute, you sprout wings of shadow and become wreathed in darkness. You gain the following effects:" +
        "\n• The area within 10 feet of you dims. Bright light becomes dim light, and dim light becomes darkness." +
        "\n• You are heavily obscured by swirling shadows." +
        "\n• You gain a flying speed of 30 feet." +
        "\n• You have resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks that aren't silvered." +
        "\n\nThese effects end early if you become incapacitated, or end this feature early as a bonus action. Once you use this feature, you can’t use it again until you finish a long rest.",
      action: ["bonus action", ""],
      recovery: "long rest",
    },
  },
});

AddSubClass("jaeger", "maraud", {
  regExpSearch: /^(?=.*maraud)(?=.*chapter).*$/i,
  subname: "Maraud Chapter",
  source: ["SGttEH", 41],
  features: {
    subclassfeature3: {
      name: "Path of Gore",
      source: ["SGttEH", 41],
      minlevel: 3,
      description:
        "\n   I learn the Great Cleave Finisher, which does not count against my Finishers known.",
      toNotesPage: [
        {
          name: "Great Cleave [Finisher]",
          source: ["SGttEH", 38],
          minlevel: 6,
          note: "\nWhen you hit a creature with an attack using a weapon with the two-handed property, you can expend all of your Momentum dice. When you do so, the attack deals extra damage equal to 1 Momentum die to the target, and you cleave a number of adjacent targets within reach equal to the number of dice expended. Make a melee weapon attack against each creature targeted. You regain 1 Focus Point for each creature this reduces to 0 hit points, up to your maximum number of Focus Points.",
          page3notes: true,
          amendTo: "Brutal Finishers",
        },
      ],
    },
    "subclassfeature3.1": {
      name: "Marauder Momentum",
      source: ["SGttEH", 0],
      minlevel: 3,
      description: desc([
        "Also at 3rd level, while you are wielding a melee weapon with the two-handed property, the size of your Momentum die is increased by one step (from a d6 to a d8, to a d10 at 11th level, and to a d12 at 17th level). Additionally, while you are wearing medium armor, you can add your Constitution modifier (to a maximum of +2) instead of your Dexterity modifier to determine your Armor Class.",
      ]),
      // limfeaname: "Momentum", // This should be the same name as what originally adds it.
      // additional: levels.map(function (n, fields, v) {
      //   if (
      //     v.isMeleeWeapon &&
      //     /((^|[^+-]\b)2|\btwo).?hand(ed)?s?\b/i.test(fields.Description)
      //   ) {
      //     return [
      //       "",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d10",
      //       "d10",
      //       "d10",
      //       "d10",
      //       "d10",
      //       "d10",
      //       "d12",
      //       "d12",
      //       "d12",
      //       "d12",
      //     ];
      //   } else {
      //     return [
      //       "",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d8",
      //       "d10",
      //       "d10",
      //       "d10",
      //       "d10",
      //       "d10",
      //       "d10",
      //       "d12",
      //       "d12",
      //       "d12",
      //       "d12",
      //     ];
      //   }
      // }),
      additional: [
        "",
        "d8",
        "d8",
        "d8",
        "d8",
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
        "d12",
        "d12",
        "d12",
        "d12",
      ],
      usagescalc:
        "event.value = Number(How('Proficiency Bonus')) + Number(Math.max(What('Dex Mod'), What('Str Mod')))",
      extraAC: {
        mod: Math.min(2, Math.max(What("Con Mod"), What("Dex Mod"))), //auto apply higher mod between Con or Dex
        name: "Marauder Momentum",
        text: "I can use Con Mod (max 2) to AC while wearing armor.",
        stopeval: function (v) {
          return !v.mediumArmor;
        },
      },
      description:
        "\n   While wielding a melee weapon with the two-handed property, my Momentum die increases by one step. Additionally, while wearing medium armor, I can add my Constitution modifier instead of Dexterity to my AC.",
    },
    subclassfeature7: {
      name: "Leap Attack",
      source: ["SGttEH", 41],
      minlevel: 7,
      description:
        "\n   At 7th level, once per turn, if you move more than 15 feet toward a creature (or fall 10 feet or more) immediately before making a weapon attack against them, you deal extra damage on a hit equal to your Momentum die." +
        "\n When falling, you can make this attack prior to hitting the ground if there is a target creature in range where you would fall. On a hit, any falling damage you take is reduced by half, and you do not fall prone from the fall.",
    },
    subclassfeature14: {
      name: "Fell the Leviathan",
      source: ["SGttEH", 41],
      minlevel: 14,
      description:
        "\n   Starting at 14th level, whenever you use a Finisher, the target must succeed on a Strength saving throw (DC = 8 + your Strength modifier + your proficiency bonus) or be knocked prone. Creatures that are Large or larger have disadvantage on this saving throw.",
    },
    subclassfeature17: {
      name: "Titanic Strength",
      source: ["SGttEH", 43],
      minlevel: 17,
      description:
        "\n   Starting at 17th level, your strength is so great that you can wield a two-handed weapon in one hand, and can use two-weapon fighting even when the weapons you are wielding aren't light (including using two- handed weapons). " +
        "\nIf you use two hands to wield a two-handed weapon, your attacks with it deal extra damage equal to half your Strength modifier (rounded up) on a hit. " +
        "\nAdditionally, when you use a Finisher, you can double the number of Momentum dice you have (to no more than your maximum Momentum dice + 1). Once you've doubled your dice, you can't do so again until you finish a long rest.",
    },
  },
});

AddSubClass("jaeger", "salvation", {
  regExpSearch: /^(?=.*salvation)(?=.*chapter).*$/i,
  subname: "Salvation Chapter",
  source: ["SGttEH", 43],
  features: {
    subclassfeature3: {
      name: "Art of Salvation",
      source: ["SGttEH", 43],
      minlevel: 3,
      description:
        "\n   I learn the Prayer of Salvation Focus Art, which does not count against my Focus Arts known.",
      toNotesPage: [
        {
          name: "Prayer of Salvation [Focus Art]",
          source: ["SGttEH", 38],
          minlevel: 6,
          note: "\nAs a bonus action, you expend 1 Focus Point. You and one creature of your choice you can see within 60 feet of you each regain 1d6 hit points and gain an equal number of temporary hit points.",
          action: ["bonus action", ""],
          page3notes: true,
          amendTo: "Focus Arts",
        },
      ],
    },
    "subclassfeature3.1": {
      name: "Savior's Focus",
      source: ["SGttEH", 43],
      minlevel: 3,
      description:
        "\n   Also at 3rd level, you find new strength in the most desperate hours. When an allied creature you can see or hear is reduced to 0 hit points, you regain 1 Focus Point. Once you use this feature, you can’t do so again for 1 minute.",
    },
    subclassfeature7: {
      name: "Sanctifying Light",
      source: ["SGttEH", 43],
      minlevel: 7,
      description:
        "\n   Starting at 7th level, when you expend a Focus Point, you can choose to emit a glow of divine light until the end of your next turn, illuminating a 20-foot radius in bright light and an additional 20 feet in dim light. The light is sunlight. Any allied creature that enters the bright light for the first time on a turn or starts its turn there gains 1d6 + your proficiency bonus hit points. This light is extinguished if you become incapacitated",
    },
    subclassfeature14: {
      name: "Purifying Salvation",
      source: ["SGttEH", 43],
      minlevel: 14,
      description:
        "\n   Starting at 14th level, your Prayer of Salvation Focus Art can target an additional creature, and the number of hit points it restores and temporary hit points it grants increases to 1d12. Additionally, if any of the targets are charmed, frightened, poisoned, or suffering from a short-term madness, you can cleanse the condition from them, ending it.",
    },
    subclassfeature17: {
      name: "Light of Hope",
      source: ["SGttEH", 43],
      minlevel: 17,
      description:
        "\n   Starting at 17th level, as a bonus action, you can unleash a blinding light from within for 1 minute, illuminating the darkness. You gain the following benefits for the duration: " +
        "\n• The radius of your Sanctifying Light increases to 30 feet of bright light and 30 feet of dim light. You and each creature of your choice within the bright light are under the effect of bless. Creatures in the bright light have advantage on death saving throws, do not die at three failed saves, and becomes stable with three successful saves, even if they have three or more failed saves. A creature that is no longer within the bright light of this effect and is not stable dies if they have failed three or more death saving throws." +
        "\n• When you use Prayer of Salvation, you immediately regain the expended Focus Point." +
        "\n\nThese benefits end early if you become incapacitated, or end this feature early as a bonus action. Once you use this feature, you can’t use it again until you finish a long rest.",
      action: ["bonus action", ""],
    },
  },
});

AddSubClass("jaeger", "sanguine", {
  regExpSearch: /^(?=.*sanguine)(?=.*chapter).*$/i,
  subname: "Sanguine Chapter",
  source: ["SGttEH", 44],
  features: {
    subclassfeature3: {
      name: "Vital Consumption",
      source: ["SGttEH", 44],
      minlevel: 3,
      description:
        "\n   I learn the Blood Drain Finisher, which does not count against my Finishers known.",
      toNotesPage: [
        {
          name: "Blood Drain [Finisher]",
          source: ["SGttEH", 38],
          minlevel: 6,
          note: "\nAs a bonus action, you expend 1 Focus Point. You and one creature of your choice you can see within 60 feet of you each regain 1d6 hit points and gain an equal number of temporary hit points.",
          action: ["bonus action", ""],
          page3notes: true,
          amendTo: "Brutal Finishers",
        },
      ],
    },
    "subclassfeature3.1": {
      name: "Crimson Rage",
      source: ["SGttEH", 44],
      minlevel: 3,
      description:
        "\n   When I become bloodied, I regain 1 Focus Point and gain 1 Momentum die. This feature can't be used again for 1 minute.",
    },
    subclassfeature7: {
      name: "Blood Hex",
      source: ["SGttEH", 44],
      minlevel: 7,
      description:
        "\n   When I use my Blood Drain Finisher and the target fails its saving throw, I can invoke a blood hex, choosing from various effects." +
        "\n• Blood Puppet. The target must use its reaction to move up to 5 feet in a direction of your choice (if the target's reaction is unavailable, it cannot move)." +
        "\n• Bound Blood. The target's speed is reduced by half until the start of your next turn." +
        "\n • Burning Blood. The target takes fire damage equal to half the necrotic damage dealt.",
    },
    subclassfeature14: {
      name: "Empowered Blood Hex",
      source: ["SGttEH", 44],
      minlevel: 14,
      description:
        "\n   I gain more powerful blood hexes, which cost 2 Focus Points to invoke." +
        "\n• Blood Puppet (Empowered). The target must use its reaction to move up to 5 feet and make a single weapon attack against a creature of your choice (if the target's reaction is unavailable, it cannot move)." +
        "\n• Bound Blood (Empowered). The target is restrained until the start of your next turn." +
        "\n• Burning Blood (Empowered). At the start of each of its turns, the target takes fire damage equal to the necrotic damage dealt. The target can repeat the saving throw it made against the Blood Drain Finisher at the end of each of its turns, ending the effect on a success.",
    },
    subclassfeature17: {
      name: "Blood Frenzy",
      source: ["SGttEH", 44],
      minlevel: 17,
      description:
        "\n   While bloodied, I gain additional movement, extra attacks, and doubled hit points from Jaeger abilities." +
        "•Your speed is increased by 20 feet." +
        "\n•When you take the attack action, the number of attacks you make increases to three." +
        "\n•All hit points you regain from your jaeger abilities are doubled." +
        "\n•You can use the Blood Craze Focus Art.",
      toNotesPage: [
        {
          name: "Blood Craze [Focus Art]",
          source: ["SGttEH", 38],
          minlevel: 6,
          note: "\nAs a reaction to being reduced to 0 hit points but not killed outright, you can expend 1 Focus Point to drop to 1 hit point instead. (works with Always Ready feature)",
          action: ["reaction", ""],
          page3notes: true,
        },
      ],
    },
  },
});


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
  regExpSearch: /^(?=.*ranger)(?=.*lunar)(?=.*warden).*$/i,
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
  regExpSearch: /^(?=.*ranger)(?=.*torturer)(?=.*conclave).*$/i,
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
  regExpSearch: /^(?=.*rogue)(?=.*blade)(?=.*radiance).*$/i,
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
  regExpSearch: /^(?=.*rogue)(?=.*shadow).*$/i,
  subname: "Shadow",
  fullname: "Shadow",
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

AddSubClass("rogue", "shadow", {
  regExpSearch: /^(?=.*rogue)(?=.*shadow).*$/i,
  subname: "Shadow",
  fullname: "Shadow",
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
  regExpSearch: /^(?=.*warlock)(?=.*void).*$/i,
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
  regExpSearch: /^(?=.*wizard)(?=.*osteomancer).*$/i,
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

//Feats and Backgrounds


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
    "You learn the Alter Self spell and one 1st-level Abjuration or Transmutation spell of your choice. You can cast each of these spells once without expending a spell slot. Once you cast either of these feat’s spells, you can't cast that spell in this way again until you finish a long rest. You can also cast these spells using spell slots you have of the appropriate level. Your spellcasting ability for these spells is the ability score increased by this feat.",
  ]),
  description:
    "Your Int, Wis or Cha increase by 1 (max 20) and you learn 'alter self' and one 1st level abjuration or transmutation",
  // scores : [0, 0, 0, 1, 1, 1],
  spellcastingBonus : [{
		name : "Alter Self",
		spells : ["alter self"],
		selection : ["alter self"],
		firstCol : "oncelr"
	}, {
		name : "1st-level Abjur/Trans spell",
		'class': "any",
		school : ["Abjur", "Trans"],
		level : [1, 1],
		firstCol : "oncelr"
	}],
  allowUpCasting : true,
	choices : ["Intelligence", "Wisdom"],
	"intelligence" : {
		description : "I learn Alter Self and one 1st level Abjuration or Transmutation spell. I can cast each once per long rest at their lowest level without expending a spell slot, and can cast them " + (typePF ? "by expending" : "with") + " a spell slot as normal. Intelligence is my spellcasting ability for these spells. [+1 Intelligence]",
		spellcastingAbility : 4,
		scores : [0, 0, 0, 1, 0, 0]
	},
	"wisdom" : {
		description : "I learn Alter Self and one 1st level Abjuration or Transmutation spell. I can cast each once per long rest at their lowest level without expending a spell slot, and can cast them by expending a spell slot as normal. Wisdom is my spellcasting ability for these spells. [+1 Wisdom]",
		spellcastingAbility : 5,
		scores : [0, 0, 0, 0, 1, 0]
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


//Races


//Race: Accursed Tiefling
RaceList["accursed tiefling"] = {
  regExpSearch: /^(?=.*accursed)(?=.*tiefling).*$/i,
  name: "Accursed Tiefling",
  sortname: "Tiefling, Accursed",
  source: [["EldritchHunt", 87]],
  plural: "Accursed Tieflings",
  size: 3,
  speed: {
    walk: { spd: 30, enc: 20 },
    climb: { spd: 30, enc: 20 },
  },
  scores: [0, 0, 1, 0, 0, 2], //[Str, Dex, Con, Int, Wis, Cha]
  trait: "Accursed Tiefling (+2 Charisma, +1 Constitution)",
  languageProfs: ["Common", "Deep Speech"],
  vision: [["Darkvision", 60]],
  dmgres: ["Necrotic"],
  spellcastingAbility: 3, // 3 is for CON
  spellcastingBonus: {
    name: "Legacy of a Thousand Young (level 1)",
    spells: ["spare the dying"],
    selection: ["spare the dying"],
    atwill: true,
  },
  features: {
    "false life": {
      name: "Legacy of a Thousand Young (level 3)",
      limfeaname: "False Life",
      minLevel: 3,
      usages: 1,
      recovery: "long rest",
      spellcastingBonus: {
        name: "Legacy of a Thousand Young (level 3)",
        spells: ["false life"],
        selection: ["false life"],
        oncelr: true,
      },
    },
    "mirror image": {
      name: "Legacy of a Thousand Young (level 5)",
      limfeaname: "Mirror Image",
      minLevel: 5,
      usages: 1,
      recovery: "long rest",
      spellcastingBonus: {
        name: "Legacy of a Thousand Young (level 5)",
        spells: ["mirror image"],
        selection: ["mirror image"],
        oncelr: true,
      },
    },
    call_of_the_brood: {
      name: "Call of the Brood",
      source: [["EldritchHunt", 87]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Call of the Brood",
          note: [
            "If a Blood Moon is out while you are asleep, you have a dream (as per the spell, save DC 16).",
            "In this dream, the Black Goat places a compulsion within your mind, ordering you to carry out some activity as a torrent of images and sensations",
            "When you awaken, you are automatically affected by a suggestion spell (save DC 16, cast as a 7th-level spell) in addition to the effects of dream, and must carry out the order.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "Tieflings mature at the same rate as humans but live a few years longer.",
};

//Race: Cursed-Blood
//Subrace: Doused
RaceList["doused cursed-blood"] = {
  regExpSearch: /^(?=.*doused)(?=.*cursed)(?=.*blood).*$/i,
  name: "Doused Cursed-Blood",
  sortname: "Cursed-Blood, Doused",
  source: [["EldritchHunt", 88]],
  plural: "Doused Cursed-Bloods",
  size: 4,
  speed: {
    walk: { spd: 25, enc: 15 },
    climb: { spd: 20, enc: 15 },
  },
  scores: [0, 1, 0, 0, 0, 0], //[Str, Dex, Con, Int, Wis, Cha]
  scorestxt: "+1 Dexterity, +1 Strength or Wisdom, +1 of your choice",
  trait:
    "Doused Cursed-Blood (+1 Dexterity, +1 Strength or Wisdom, +1 of your choice)",
  languageProfs: ["Common", "Draconic or Infernal"],
  features: {
    vigilant_nature: {
      name: "Vigilant Nature",
      source: [["EldritchHunt", 89]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Vigilant Nature",
          note: [
            "Your survival instincts are sharper than most.",
            "You can’t be surprised.",
            "On a turn when you would be surprised, you can’t attack or cast spells that affect enemies.",
          ],
          page3notes: true,
        },
      ],
    },
    conjoined_twin: {
      name: "Conjoined Twin",
      source: [["EldritchHunt", 89]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Conjoined Twin",
          note: [
            "Your dead twin manifests on your body in one of the following ways of your choice",
          ],
          page3notes: true,
        },
        {
          name: "Chest Maw",
          note: [
            "The mouth on your abdomen can devour many things, temporarily storing them in a pocket dimension within you.\n It can hold up to 250 pounds of material, not exceeding a volume of 32 cubic feet.\n If you fall unconscious or die, you harmlessly regurgitate all materials in your maw.\n Breathing creatures inside your maw can survive up to 1 minute, after which time they begin to suffocate.\n After 24 hours inside your body, a nonmagical item is destroyed, consumed by your body. If it is a magic item, a creature, or a corpse, you regurgitate it instead.\n Starting at 5th level, you can store materials indefinitely (but still not while unconscious or dead), and the dimension’s volume and weight it can hold doubles.",
          ],
          page3notes: true,
        },
        {
          name: "Heedful Eye",
          action: [["bonus action", ""]],
          note: [
            "As long as the eye in your chest is open, you have darkvision out to 120 feet.\n You can cast detect magic once while the eye is open, regaining the ability to do so when you finish a short or long rest.\n Starting at 5th level, you can cast see invisibility once while the eye is open, regaining the ability to do so when you finish a long rest.\n You can open the eye as a bonus action, and close it at will (no action required).",
          ],
          page3notes: true,
        },
        {
          name: "Gaping Remain",
          note: [
            "Ripped out of your chest, due to your will or perhaps your twin’s, it now only exists within you in spirit, capable of influencing the world through you.",
            " - You can speak telepathically to any creature you can see, provided the creature is within a number of feet of you equal to five times your level. The voice the creature hears isn’t yours, but that of your twin. The telepathic speech is made in a language you know, and the creature understands you only if it knows that language. Starting at 5th level, the creature is able to telepathically respond to you in a language it knows.",
            " - You learn the mage hand cantrip. You can cast it without any somatic or verbal components, and the hand has the appearance of your twin’s. Your spellcasting ability for the spell is Charisma.",
          ],
          page3notes: true,
        },
      ],
    },
    insulated_skin: {
      name: "Insulated Skin",
      source: [["EldritchHunt", 89]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Insulated Skin",
          note: [
            "Choose two damage types that reflect your draconic or demonic ancestors, among acid, cold, fire, lightning, and poison.",
            "Whenever you take damage of one of those types, you can reduce it by an amount equal to your proficiency bonus.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "Cursed-bloods develop much faster than humans, reaching maturity after 5 years, and have shorter lifespans, passing after roughly 60 years, though some rare individuals have lived up to 100.",
};

//Add Subrace: Hulking
RaceList["hulking cursed-blood"] = {
  regExpSearch: /^(?=.*hulking)(?=.*cursed)(?=.*blood).*$/i,
  name: "Hulking Cursed-Blood",
  sortname: "Cursed-Blood, Hulking",
  source: [["EldritchHunt", 88]],
  plural: "Hulking Cursed-Bloods",
  size: 4,
  speed: {
    walk: { spd: 25, enc: 15 },
    climb: { spd: 20, enc: 15 },
  },
  scores: [0, 1, 1, 0, 0, 0], //[Str, Dex, Con, Int, Wis, Cha]
  scorestxt: "+1 Dexterity, +1 Constitution, +1 of your choice",
  trait:
    "Hulking Cursed-Blood (+1 Dexterity, +1 Constitution, +1 of your choice)",
  languageProfs: ["Common", "Draconic or Infernal"],
  features: {
    vigilant_nature: {
      name: "Vigilant Nature",
      source: [["EldritchHunt", 89]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Vigilant Nature",
          note: [
            "Your survival instincts are sharper than most.",
            "You can’t be surprised.",
            "On a turn when you would be surprised, you can’t attack or cast spells that affect enemies.",
          ],
          page3notes: true,
        },
      ],
    },
    conjoined_twin: {
      name: "Conjoined Twin",
      source: [["EldritchHunt", 89]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Conjoined Twin",
          note: [
            "Your dead twin manifests on your body in one of the following ways of your choice",
          ],
          page3notes: true,
        },
        {
          name: "Chest Maw",
          note: [
            "The mouth on your abdomen can devour many things, temporarily storing them in a pocket dimension within you.\n It can hold up to 250 pounds of material, not exceeding a volume of 32 cubic feet.\n If you fall unconscious or die, you harmlessly regurgitate all materials in your maw.\n Breathing creatures inside your maw can survive up to 1 minute, after which time they begin to suffocate.\n After 24 hours inside your body, a nonmagical item is destroyed, consumed by your body. If it is a magic item, a creature, or a corpse, you regurgitate it instead.\n Starting at 5th level, you can store materials indefinitely (but still not while unconscious or dead), and the dimension’s volume and weight it can hold doubles.",
          ],
          page3notes: true,
        },
        {
          name: "Heedful Eye",
          action: [["bonus action", ""]],
          note: [
            "As long as the eye in your chest is open, you have darkvision out to 120 feet.\n You can cast detect magic once while the eye is open, regaining the ability to do so when you finish a short or long rest.\n Starting at 5th level, you can cast see invisibility once while the eye is open, regaining the ability to do so when you finish a long rest.\n You can open the eye as a bonus action, and close it at will (no action required).",
          ],
          page3notes: true,
        },
        {
          name: "Gaping Remain",
          note: [
            "Ripped out of your chest, due to your will or perhaps your twin’s, it now only exists within you in spirit, capable of influencing the world through you.",
            " - You can speak telepathically to any creature you can see, provided the creature is within a number of feet of you equal to five times your level. The voice the creature hears isn’t yours, but that of your twin. The telepathic speech is made in a language you know, and the creature understands you only if it knows that language. Starting at 5th level, the creature is able to telepathically respond to you in a language it knows.",
            " - You learn the mage hand cantrip. You can cast it without any somatic or verbal components, and the hand has the appearance of your twin’s. Your spellcasting ability for the spell is Charisma.",
          ],
          page3notes: true,
        },
      ],
    },
    stone_skin: {
      name: "Stone Skin",
      source: [["EldritchHunt", 90]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Stone Skin",
          note: [
            "When you suffer a critical hit from an attack that deals piercing damage, the attack doesn’t deal extra piercing damage to you from being a critical hit.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "Cursed-bloods develop much faster than humans, reaching maturity after 5 years, and have shorter lifespans, passing after roughly 60 years, though some rare individuals have lived up to 100.",
};

//Add Subrace: Mirage
RaceList["mirage cursed-blood"] = {
  regExpSearch: /^(?=.*mirage)(?=.*cursed)(?=.*blood).*$/i,
  name: "Mirage Cursed-Blood",
  sortname: "Cursed-Blood, Mirage",
  source: [["EldritchHunt", 88]],
  plural: "Mirage Cursed-Bloods",
  size: 4,
  speed: {
    walk: { spd: 25, enc: 15 },
    climb: { spd: 20, enc: 15 },
  },
  scores: [0, 1, 0, 0, 0, 0], //[Str, Dex, Con, Int, Wis, Cha]
  scorestxt: "+1 Dexterity, +1 Interlligence or Charisma, +1 of your choice",
  trait:
    "Mirage Cursed-Blood (+1 Dexterity, +1 Interlligence or Charisma, +1 of your choice)",
  languageProfs: ["Common", "Draconic or Infernal"],
  features: {
    vigilant_nature: {
      name: "Vigilant Nature",
      source: [["EldritchHunt", 89]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Vigilant Nature",
          note: [
            "Your survival instincts are sharper than most.",
            "You can’t be surprised.",
            "On a turn when you would be surprised, you can’t attack or cast spells that affect enemies.",
          ],
          page3notes: true,
        },
      ],
    },
    conjoined_twin: {
      name: "Conjoined Twin",
      source: [["EldritchHunt", 89]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Conjoined Twin",
          note: [
            "Your dead twin manifests on your body in one of the following ways of your choice",
          ],
          page3notes: true,
        },
        {
          name: "Chest Maw",
          note: [
            "The mouth on your abdomen can devour many things, temporarily storing them in a pocket dimension within you.\n It can hold up to 250 pounds of material, not exceeding a volume of 32 cubic feet.\n If you fall unconscious or die, you harmlessly regurgitate all materials in your maw.\n Breathing creatures inside your maw can survive up to 1 minute, after which time they begin to suffocate.\n After 24 hours inside your body, a nonmagical item is destroyed, consumed by your body. If it is a magic item, a creature, or a corpse, you regurgitate it instead.\n Starting at 5th level, you can store materials indefinitely (but still not while unconscious or dead), and the dimension’s volume and weight it can hold doubles.",
          ],
          page3notes: true,
        },
        {
          name: "Heedful Eye",
          action: [["bonus action", ""]],
          note: [
            "As long as the eye in your chest is open, you have darkvision out to 120 feet.\n You can cast detect magic once while the eye is open, regaining the ability to do so when you finish a short or long rest.\n Starting at 5th level, you can cast see invisibility once while the eye is open, regaining the ability to do so when you finish a long rest.\n You can open the eye as a bonus action, and close it at will (no action required).",
          ],
          page3notes: true,
        },
        {
          name: "Gaping Remain",
          note: [
            "Ripped out of your chest, due to your will or perhaps your twin’s, it now only exists within you in spirit, capable of influencing the world through you.",
            " - You can speak telepathically to any creature you can see, provided the creature is within a number of feet of you equal to five times your level. The voice the creature hears isn’t yours, but that of your twin. The telepathic speech is made in a language you know, and the creature understands you only if it knows that language. Starting at 5th level, the creature is able to telepathically respond to you in a language it knows.",
            " - You learn the mage hand cantrip. You can cast it without any somatic or verbal components, and the hand has the appearance of your twin’s. Your spellcasting ability for the spell is Charisma.",
          ],
          page3notes: true,
        },
      ],
    },
    shadowveil_skin: {
      name: "Shadowveil Skin",
      source: [["EldritchHunt", 90]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Shadowveil Skin",
          note: [
            "You can attempt to hide even when you are only lightly obscured by shadows, smog, acid rain, or other urban and industrial phenomena. In addition, you can move through the space of any creature that is of one size larger than yours.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "Cursed-bloods develop much faster than humans, reaching maturity after 5 years, and have shorter lifespans, passing after roughly 60 years, though some rare individuals have lived up to 100.",
};

//Race: Demidritch
//Add Subrace: Oculare
RaceList["oculare demidritch"] = {
  regExpSearch: /^(?=.*oculare)(?=.*demidritch).*$/i,
  name: "Oculare Demidritch",
  sortname: "Demidritch, Oculare",
  source: [["EldritchHunt", 91]],
  plural: "Oculare Demidritch",
  size: 3,
  speed: {
    walk: { spd: 30, enc: 20 },
  },
  scores: [0, 0, 1, 0, 0, 2], //[Str, Dex, Con, Int, Wis, Cha]
  trait: "Oculare Demidritch (+2 Charisma, +1 Constitution)",
  languageProfs: ["Common", "Deep Speech"],
  vision: [["Darkvision", 120]],
  dmgres: ["Cold"], //part of Shard of Inifinity
  savetxt: {
    //part of Astral Being
    adv_vs: ["blinded"],
  },
  skills: ["Perception"],
  features: {
    subraceDC: {
      name: "Subrace DC",
      source: [["EldritchHunt", 92]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Subrace DC",
          note: [
            "The DC for abilities given by the subraces is equal to 8 + twice your proficiency bonus.",
          ],
          page3notes: true,
        },
      ],
    },
    all_seeing_eyes_3: {
      name: "All Seeing Eyes (level 3)",
      source: [["EldritchHunt", 93]],
      minlevel: 3,
      usages: 1,
      recovery: "long rest",
      oncelr: true,
      toNotesPage: [
        {
          name: "All Seeing Eyes (level 3)",
          note: [
            "Starting at 3rd level, you can use your action to unleash your progenitor’s eldritch energy, causing eyes that glow with an ethereal quality to open along your body and clothing for 1 minute.\n For the duration, creatures within 60 feet of you can’t gain advantage on attack rolls against you as a result of being invisible or unseen.",
          ],
          page3notes: true,
        },
      ],
    },
    all_seeing_eyes_12: {
      name: "All Seeing Eyes (level 12)",
      source: [["EldritchHunt", 93]],
      minlevel: 12,
      usages: 1,
      recovery: "long rest",
      oncelr: true,
      toNotesPage: [
        {
          name: "All Seeing Eyes (level 12)",
          note: [
            "Starting at level 12 you also grow eye-covered eldritch wings which grant you a flying speed of 30 feet and the ability to see invisibility out to a range of 60 feet.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "Demidritchs mature faster than humans, reaching adulthood after 10 years. Their eldritch powers cause their body to decay much faster, they can live up to 60 years old.",
};

//Add Subrace: Nebulare
RaceList["nebulare demidritch"] = {
  regExpSearch: /^(?=.*nebulare)(?=.*demidritch).*$/i,
  name: "Nebulare Demidritch",
  sortname: "Demidritch, Nebulare",
  source: [["EldritchHunt", 91]],
  plural: "Nebulare Demidritch",
  size: 3,
  speed: {
    walk: { spd: 30, enc: 20 },
  },
  scores: [1, 0, 0, 0, 0, 2], //[Str, Dex, Con, Int, Wis, Cha]
  trait: "Nebulare Demidritch (+1 Strength, +2 Charisma)",
  languageProfs: ["Common", "Deep Speech"],
  vision: [["Darkvision", 120]],
  dmgres: ["Cold"], //part of Shard of Inifinity
  savetxt: {
    //part of Astral Being
    adv_vs: ["blinded"],
  },
  spellcastingBonus: {
    name: "Glow",
    spells: ["light"],
    selection: ["light"],
    atwill: true,
  },
  features: {
    subraceDC: {
      name: "Subrace DC",
      source: [["EldritchHunt", 92]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Subrace DC",
          note: [
            "The DC for abilities given by the subraces is equal to 8 + twice your proficiency bonus.",
          ],
          page3notes: true,
        },
      ],
    },
    astral_atracttion_3: {
      name: "Astral Attraction (level 3)",
      source: [["EldritchHunt", 93]],
      minlevel: 3,
      usages: 1,
      recovery: "long rest",
      oncelr: true,
      toNotesPage: [
        {
          name: "Astral Attraction (level 3)",
          note: [
            "Starting at 3rd level, you can use your action to unleash the potential energy within yourself, causing your body to erupt with power and transforming it for 1 minute.",
            "When you first transform, each creature other than you in a 10-foot radius centered on you must succeed on a Dexterity saving throw or take a number of d6s of radiant damage from the explosion equal to your proficiency bonus.",
            "While transformed in this way, you shed bright light in a 10-foot radius and dim light for an additional 10 feet. You generate a powerful gravitational field. The area within a 20-foot radius centered on you is considered difficult terrain for creatures of your choice that you can see.",
            "Starting at level 12, this radius increases to 60 feet and you can ignore gravity, granting a flying speed of 30 feet during which you can hover.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "Demidritchs mature faster than humans, reaching adulthood after 10 years. Their eldritch powers cause their body to decay much faster, they can live up to 60 years old.",
};

//Add Subrace: Deep One Dwarf (Y'ha-Nthlei)
RaceList["deep one dwarf"] = {
  regExpSearch: /^(?=.*deep)(?=.*one)(?=.*dwarf).*$/i,
  name: "Deep One Dwarf (Y'ha-Nthlei)",
  sortname: "Dwarf, Deep One (Y'ha-Nthlei)",
  source: [["EldritchHunt", 96]],
  plural: "Deep One Dwarves",
  size: 3,
  speed: {
    walk: { spd: 25, enc: 15 },
    swim: { spd: 25, enc: 15 },
  },
  scores: [0, 0, 2, 0, 0, 1], //[Str, Dex, Con, Int, Wis, Cha]
  trait: "Deep One Dwarves (+2 Constitution, +1 Charisma)",
  languageProfs: ["Common", "Dwarvish", "Deep Speech"],
  vision: [["Darkvision", 120]],
  weaponProfs: [false, false, ["cleavers", "tridents", "firearms"]],
  dmgres: ["Cold"], //part of Otherworldly Resilience
  savetxt: {
    //part of Otherworldly Resilience
    text: ["disadvantage on saving throws against illusions."],
  },
  spellcastingAbility: 6, // 6 is for CHA
  spellcastingBonus: {
    name: "Guiding Light",
    spells: ["dancing lights"],
    selection: ["dancing lights"],
    atwill: true,
  },
  features: {
    illusory_body: {
      name: "Illusory Body",
      source: [["EldritchHunt", 96]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Illusory Body",
          note: [
            "The DC for abilities given by the subraces is equal to 8 + twice your proficiency bonus.",
            "Although your body is covered in tentacles, clams, seashells, and other eldritch appendages, you are covered by an illusion which makes you appear like a normal hill dwarf to others.",
            "You can use an action to turn this illusion on or off. Other Deep Ones can see through this illusion.",
          ],
          page3notes: true,
        },
      ],
    },
    amphibious: {
      name: "Amphibious",
      source: [["EldritchHunt", 96]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Amphibious",
          note: ["You can breathe air and water"],
          page3notes: true,
        },
      ],
    },
    cosmic_knowledge: {
      name: "Cosmic Knowledge",
      source: [["EldritchHunt", 96]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Cosmic Knowledge",
          note: [
            "Whenever you make an History check related to the origin of an eldritch item or construction, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.",
          ],
          page3notes: true,
        },
      ],
    },
    fathomless_limb: {
      name: "Fathomless Limb",
      source: [["EldritchHunt", 96]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Fathomless Limb",
          note: [
            "Your body has been altered beyond recognition by the Slumbering One, giving you one of the following body alterations:",
          ],
          page3notes: true,
        },
        {
          name: "Coiling Arm",
          action: [["bonus action", ""]],
          note: [
            "Your arm is nothing but a writhing mass of tentacles that flail the air. On your turn, after hitting an enemy with a melee attack, you can attempt to grapple them as a bonus action (normal grappling restrictions apply).",
          ],
          page3notes: true,
        },
        {
          name: "Brutal Pincers",
          note: [
            "Your forearm –a massive pincer– is a natural weapon, which you can use to make unarmed strikes. If you hit with it, you deal piercing damage equal to 1d6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike. If you are targeting a creature you are grappling, the damage die becomes a d10 instead. You cannot use this arm to make any precise hand manipulation.",
          ],
          page3notes: true,
        },
        {
          name: "Mucoid Extremities",
          note: [
            "Your hands and feet are palmed and covered in cups. Your swimming speed increases to 30 feet, and you gain a climbing speed of 20 feet.",
          ],
          page3notes: true,
        },
      ],
    },
    dreamers_gift_optional: {
      name: "The Dreamer's Gifts (Optional Trait at the GM’s Discretion)",
      source: [["EldritchHunt", 96]],
      minlevel: 5,
      toNotesPage: [
        {
          name: "The Dreamer's Gifts (Optional Trait at the GM’s Discretion)",
          note: [
            "Your devotion to the cosmic being that warped your species is rewarded. Starting at level 5, you gain the following benefits:",
            "- Whenever you fail an ability check or saving throw, you can draw upon your master’s powers to succeed instead. Once you've used this ability, you can't do so again until the Dreamer has replaced one of your d20 rolls with a 1. The GM decides when this unfortunate moment happens.",
            "- You are immune to the curse of the Slumbering Moon.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "Deep One Dwarves mature much faster than humans, reaching maturity at the age of 10. They cannot die of old age; instead their aging mind progressively loses grip over their body, turning them into brainless servants of He Who Lies Dreaming when they reach 50 years of age.",
};

//RACE: Manikin
//Add Subrace: Custodian
RaceList["custodian manikin"] = {
  regExpSearch: /^(?=.*custodian)(?=.*manikin).*$/i,
  name: "Custodian Manikin",
  sortname: "Manikin, Custodian",
  source: [["EldritchHunt", 105]],
  plural: "Custodian Manikins",
  size: 3,
  speed: {
    walk: { spd: 30, enc: 20 },
  },
  scores: [1, 0, 2, 0, 0, 0], //[Str, Dex, Con, Int, Wis, Cha]
  trait: "Custodian Manikin (+1 Strength, +2 Constitution)",
  languageProfs: ["Common"],
  dmgres: ["Lightning"], //part of Lightning Heart
  savetxt: {
    text: ["disadvantage on insight checks"], //part of Born to Serve
    immune: ["poison"], //part of Living Material
    adv_vs: ["madness"], //part of Living Material
  },
  armorOptions: [
    {
      regExpSearch: /^(?=.*unarmor)(?=.*manikin).*$/i,
      name: "Unarmor (Manikin)",
      source: [["EldritchHunt", 106]],
      ac: 11,
      selectNow: true
    },
    {
      regExpSearch: /^(?=.*medium)(?=.*dex)(?=.*manikin).*$/i,
      name: "Medium Armored (Dex) (Manikin)",
      source: [["EldritchHunt", 106]],
      ac: 13,
      type: "medium",
    },
    {
      regExpSearch: /^(?=.*medium)(?=.*str)(?=.*manikin).*$/i,
      name: "Medium Armored (Str) (Manikin)",
      source: [["EldritchHunt", 106]],
      stealthdis: true,
      ac: "13 + min(Str|3)",
      dex: 0,
      type: "medium",
    },
    {
      regExpSearch: /^(?=.*heavy)(?=.*manikin).*$/i,
      name: "Heavy Armored (Manikin)",
      source: [["EldritchHunt", 106]],
      stealthdis: true,
      ac: "16 + min(Str|2)",
      type: "heavy",
    },
  ],
  features: {
    born_to_serve: {
      name: "Born to Serve",
      source: [["EldritchHunt", 105]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Born to Serve",
          note: [
            "Manikins are made to be unable to hate or resent their creators.",
            "This lapse in judgment affects you in all circumstances. You have disadvantage on Insight checks.",
          ],
          page3notes: true,
        },
      ],
    },
    modular_gold_plating: {
      name: "Modular Gold Plating",
      source: [["EldritchHunt", 105]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Modular Gold Plating",
          note: [
            "Your body has built-in defensive layers, which determine your armor class.",
            "You gain no AC benefit from wearing armor, but if you are using a shield, you apply its bonus as normal.",
            "Through 8 hours of work in a specialized workshop, you can alter your defensive layers to the Medium Armor or Heavy Armor options below, or back into your Unarmored state.",
          ],
          page3notes: true,
        },
        {
          name: "Unarmored",
          note: ["AC = 11 + your Dexterity modifier"],
          page3notes: true,
        },
        {
          name: "Medium Armor proficiency",
          note: [
            "13 + your Dexterity modifier (maximum of 2) or Strength modifier (maximum of 3). Choose which modifier when you gain this state.",
          ],
          page3notes: true,
        },
        {
          name: "Heavy Armor proficiency",
          note: [
            "AC = 16 + your Strength modifier (maximum of 2).",
            "If you use your Strength modifier for AC, you have disadvantage on Stealth checks.",
          ],
          page3notes: true,
        },
      ],
    },
    careful_defender: {
      name: "Careful Defender",
      source: [["EldritchHunt", 106]],
      minlevel: 1,
			usages : "Proficiency bonus per ",
			usagescalc : "event.value = How('Proficiency Bonus');",
      action: [["reaction", ""]],
      recovery: "long rest",
      oncelr: true,
      toNotesPage: [
        {
          name: "Careful Defender",
          note: [
            "Designed to protect, you are adept at throwing yourself in the way of harm to shield others",
            "When a creature within 5 feet of you is targeted by an attack, you can use your reaction to jump in front of it.",
            "If the creature is willing, you switch places with it, becoming the target of the attack instead.",
            "You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
          ],
          page3notes: true,
        },
      ],
    },
    powerful_build: {
      name: "Powerful Build",
      source: [["EldritchHunt", 106]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Powerful Build",
          note: [
            "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "As they are not alive, Manikins do not age. However, their materials slowly lose their magic essence over time, meaning they will ultimately lose control over their entire body and turn back into inanimate objects.",
};

//Add Subrace: Handler
RaceList["handler manikin"] = {
  regExpSearch: /^(?=.*handler)(?=.*manikin).*$/i,
  name: "Handler Manikin",
  sortname: "Manikin, Handler",
  source: [["EldritchHunt", 96]],
  plural: "Handler Manikins",
  size: 3,
  speed: {
    walk: { spd: 30, enc: 20 },
  },
  scores: [0, 1, 2, 0, 0, 0], //[Str, Dex, Con, Int, Wis, Cha]
  trait: "Handler Manikin (+1 Dexterity, +2 Constitution)",
  languageProfs: ["Common"],
  dmgres: ["Lightning"], //part of Lightning Heart
  savetxt: {
    text: ["disadvantage on insight checks"], //part of Born to Serve
    immune: ["poison"], //part of Living Material
    adv_vs: ["madness"], //part of Living Material
  },
  armorOptions: [
    {
      regExpSearch: /^(?=.*unarmor)(?=.*manikin).*$/i,
      name: "Unarmor (Manikin)",
      source: [["EldritchHunt", 106]],
      ac: 11,
      selectNow: true
    },
    {
      regExpSearch: /^(?=.*medium)(?=.*dex)(?=.*manikin).*$/i,
      name: "Medium Armored (Dex) (Manikin)",
      source: [["EldritchHunt", 106]],
      ac: 13,
      type: "medium",
    },
    {
      regExpSearch: /^(?=.*medium)(?=.*str)(?=.*manikin).*$/i,
      name: "Medium Armored (Str) (Manikin)",
      source: [["EldritchHunt", 106]],
      stealthdis: true,
      ac: "13 + min(Str|3)",
      dex: 0,
      type: "medium",
    },
    {
      regExpSearch: /^(?=.*heavy)(?=.*manikin).*$/i,
      name: "Heavy Armored (Manikin)",
      source: [["EldritchHunt", 106]],
      stealthdis: true,
      ac: "16 + min(Str|2)",
      type: "heavy",
    },
  ],
  features: {
    born_to_serve: {
      name: "Born to Serve",
      source: [["EldritchHunt", 105]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Born to Serve",
          note: [
            "Manikins are made to be unable to hate or resent their creators.",
            "This lapse in judgment affects you in all circumstances. You have disadvantage on Insight checks.",
          ],
          page3notes: true,
        },
      ],
    },
    modular_gold_plating: {
      name: "Modular Gold Plating",
      source: [["EldritchHunt", 105]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Modular Gold Plating",
          note: [
            "Your body has built-in defensive layers, which determine your armor class.",
            "You gain no AC benefit from wearing armor, but if you are using a shield, you apply its bonus as normal.",
            "Through 8 hours of work in a specialized workshop, you can alter your defensive layers to the Medium Armor or Heavy Armor options below, or back into your Unarmored state.",
          ],
          page3notes: true,
        },
        {
          name: "Unarmored",
          note: ["AC = 11 + your Dexterity modifier"],
          page3notes: true,
        },
        {
          name: "Medium Armor proficiency",
          note: [
            "13 + your Dexterity modifier (maximum of 2) or Strength modifier (maximum of 3). Choose which modifier when you gain this state.",
          ],
          page3notes: true,
        },
        {
          name: "Heavy Armor proficiency",
          note: [
            "AC = 16 + your Strength modifier (maximum of 2).",
            "If you use your Strength modifier for AC, you have disadvantage on Stealth checks.",
          ],
          page3notes: true,
        },
      ],
    },
    inconspicuous_appearance: {
      name: "Inconspicuous Appearance",
      source: [["EldritchHunt", 106]],
      minlevel: 1,
      skills: ["Stealth"],
      toolProfs: [["Disguise kits"]],
    },
    embedded_armament: {
      name: "Embedded Armament",
      source: [["EldritchHunt", 106]],
      minlevel: 1,
      action: [["bonus action", ""]],
      toNotesPage: [
        {
          name: "Embedded Armament",
          note: [
            "You can have up to two melee weapons embedded within your body.",
            "Each weapon must have either the finesse or light property.",
            "During a short rest, you can remove one or both weapons and exchange them for other appropriate weapons you are holding.",
            "As a bonus action, you can draw or stow one or both of these embedded weapons.",
            "You can’t be disarmed of your embedded weapons, short of having your arms cut off.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "As they are not alive, Manikins do not age. However, their materials slowly lose their magic essence over time, meaning they will ultimately lose control over their entire body and turn back into inanimate objects.",
};

//Add Subrace: Thespian
RaceList["thespian manikin"] = {
  regExpSearch: /^(?=.*thespian)(?=.*manikin).*$/i,
  name: "Thespian Manikin",
  sortname: "Manikin, Thespian",
  source: [["EldritchHunt", 96]],
  plural: "Thespian Manikins",
  size: 3,
  speed: {
    walk: { spd: 30, enc: 20 },
  },
  scores: [0, 0, 2, 0, 0, 1], //[Str, Dex, Con, Int, Wis, Cha]
  trait: "Thespian Manikin (+2 Constitution, +1 Charisma)",
  languageProfs: ["Common"],
  dmgres: ["Lightning"], //part of Lightning Heart
  savetxt: {
    text: ["disadvantage on insight checks"], //part of Born to Serve
    immune: ["poison"], //part of Living Material
    adv_vs: ["madness"], //part of Living Material
  },
  armorOptions: [
    {
      regExpSearch: /^(?=.*unarmor)(?=.*manikin).*$/i,
      name: "Unarmor (Manikin)",
      source: [["EldritchHunt", 106]],
      ac: 11,
      selectNow: true
    },
    {
      regExpSearch: /^(?=.*medium)(?=.*dex)(?=.*manikin).*$/i,
      name: "Medium Armored (Dex) (Manikin)",
      source: [["EldritchHunt", 106]],
      ac: 13,
      type: "medium",
    },
    {
      regExpSearch: /^(?=.*medium)(?=.*str)(?=.*manikin).*$/i,
      name: "Medium Armored (Str) (Manikin)",
      source: [["EldritchHunt", 106]],
      stealthdis: true,
      ac: "13 + min(Str|3)",
      dex: 0,
      type: "medium",
    },
    {
      regExpSearch: /^(?=.*heavy)(?=.*manikin).*$/i,
      name: "Heavy Armored (Manikin)",
      source: [["EldritchHunt", 106]],
      stealthdis: true,
      ac: "16 + min(Str|2)",
      type: "heavy",
    },
  ],
  features: {
    born_to_serve: {
      name: "Born to Serve",
      source: [["EldritchHunt", 105]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Born to Serve",
          note: [
            "Manikins are made to be unable to hate or resent their creators.",
            "This lapse in judgment affects you in all circumstances. You have disadvantage on Insight checks.",
          ],
          page3notes: true,
        },
      ],
    },
    modular_gold_plating: {
      name: "Modular Gold Plating",
      source: [["EldritchHunt", 105]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Modular Gold Plating",
          note: [
            "Your body has built-in defensive layers, which determine your armor class.",
            "You gain no AC benefit from wearing armor, but if you are using a shield, you apply its bonus as normal.",
            "Through 8 hours of work in a specialized workshop, you can alter your defensive layers to the Medium Armor or Heavy Armor options below, or back into your Unarmored state.",
          ],
          page3notes: true,
        },
        {
          name: "Unarmored",
          note: ["AC = 11 + your Dexterity modifier"],
          page3notes: true,
        },
        {
          name: "Medium Armor proficiency",
          note: [
            "13 + your Dexterity modifier (maximum of 2) or Strength modifier (maximum of 3). Choose which modifier when you gain this state.",
          ],
          page3notes: true,
        },
        {
          name: "Heavy Armor proficiency",
          note: [
            "AC = 16 + your Strength modifier (maximum of 2).",
            "If you use your Strength modifier for AC, you have disadvantage on Stealth checks.",
          ],
          page3notes: true,
        },
      ],
    },
    artists_puppet: {
      name: "Artist's Puppet",
      source: [["EldritchHunt", 106]],
      minlevel: 1,
      skills: ["Performance"],
    },
    ethereal_strings: {
      name: "Ethereal Strings",
      source: [["EldritchHunt", 106]],
      minlevel: 1,
      action: [["bonus action", ""]],
      recovery: "long rest",
      oncelr: true,
      toNotesPage: [
        {
          name: "Ethereal Strings",
          note: [
            "As a bonus action, you can attach yourself to a willing creature you can see within 30 feet of you via a set of immaterial strings for 1 hour.",
            "If the creature you’re attached to doesn’t use all of its movement on its turn (if it has multiple movement speeds, pick the highest one), you can use your reaction at the end of the turn to move a number of feet equal to its remaining movement.",
            "Once you attach yourself to a creature in this way, you can’t do so again until you finish a short or long rest.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "As they are not alive, Manikins do not age. However, their materials slowly lose their magic essence over time, meaning they will ultimately lose control over their entire body and turn back into inanimate objects.",
};

//RACE: Scourgeborne
//Subrace: Aranea
RaceList["aranea scourgeborne"] = {
  regExpSearch: /^(?=.*aranea)(?=.*scourgeborne).*$/i,
  name: "Aranea Scourgeborne",
  sortname: "Scourgeborne, Aranea",
  source: [["EldritchHunt", 108]],
  plural: " Aranea Scourgeborne",
  size: 3,
  speed: {
    walk: { spd: 30, enc: 20 },
    climb: { spd: 30, enc: 20 },
  },
  scores: [0, 0, 1, 1, 0, 0], //[Str, Dex, Con, Int, Wis, Cha]
  scorestxt: "+1 Constitution, +1 Intelligence and +1 any of your choice",
  trait:
    "Aranea Scourgeborne (+1 Constitution, +1 Intelligence, +1 any of your choice)",
  languageProfs: ["Common", 1],
  calcChanges: {
    atkAdd: [
      function (fields, v) {
        if (v.baseWeaponName == "unarmed strike") {
          if (fields.Damage_Die == 1 || fields.Damage_Die == "1d4")
            fields.Damage_Die = "1d6";
          fields.Damage_Type = "Piercing";
          if (/^(?=.*evil).*$/i.test(What("Alignment"))) {
            fields.Damage_Die = "1d8";
          }
        }
      },
      "My unarmed strikes deal 1d6 damage instead of 1, which increases to 1d8 if I'm Evil aligned",
      1,
    ],
  },
  features: {
    eldritch_curse: {
      name: "Eldritch Curse",
      source: [["EldritchHunt", 108]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Eldritch Curse",
          note: [
            "our curse is not something mere mortals can undo. You are immune to any spell that would alter your form. (e.g., alter self, polymorph...)",
          ],
          page3notes: true,
        },
      ],
    },
    born_of_madness: {
      name: "Born of Madness",
      source: [["EldritchHunt", 106]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Born of Madness",
          note: [
            "• If your alignment is Good, you gain control over your darkest impulses. You have advantage on saving throws against madness.",
            "• If your alignment is Evil you let the depraved monster within you influence you. You have disadvantage on saving throws against madness but gain a bonus to Dexterity saving throws equal to your Proficiency bonus.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "Scourgeborne are made not born. This means that they mature at the same rate as the race they originally belonged to.",
};

//Subrace: Belua
RaceList["belua scourgeborne"] = {
  regExpSearch: /^(?=.*belua)(?=.*scourgeborne).*$/i,
  name: "Belua Scourgeborne",
  sortname: "Scourgeborne, Belua",
  source: [["EldritchHunt", 108]],
  plural: "Belua Scourgeborne",
  size: 3,
  speed: {
    walk: { spd: 30, enc: 20 },
  },
  scores: [1, 0, 1, 0, 0, 0], //[Str, Dex, Con, Int, Wis, Cha]
  scorestxt: "+1 Strength, +1 Constitution, +1 any of your choice",
  trait:
    "Belua Scourgeborne (+1 Strength, +1 Constitution, +1 any of your choice)",
  languageProfs: ["Common", 1],
  savetxt: {
    //part of Keen Hearing and Smell
    text: [
      "You have advantage on Perception checks that rely on hearing or smell.",
    ],
  },
  calcChanges: {
    atkAdd: [
      function (fields, v) {
        if (v.baseWeaponName == "unarmed strike") {
          if (fields.Damage_Die == 1 || fields.Damage_Die == "1d4")
            fields.Damage_Die = "1d6";
          fields.Damage_Type = "Piercing";
          if (/^(?=.*evil).*$/i.test(What("Alignment"))) {
            fields.Damage_Die = "1d8";
          }
        }
      },
      "My unarmed strikes deal 1d6 damage instead of 1, which increases to 1d8 if I'm Evil aligned",
      1,
    ],
  },
  features: {
    eldritch_curse: {
      name: "Eldritch Curse",
      source: [["EldritchHunt", 108]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Eldritch Curse",
          note: [
            "Your curse is not something mere mortals can undo. You are immune to any spell that would alter your form. (e.g., alter self, polymorph...)",
          ],
          page3notes: true,
        },
      ],
    },
    born_of_madness: {
      name: "Born of Madness",
      source: [["EldritchHunt", 108]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Born of Madness",
          note: [
            "• If your alignment is Good, you gain control over your darkest impulses. You have advantage on saving throws against madness.",
            "• If your alignment is Evil you let the depraved monster within you influence you. You have disadvantage on saving throws against madness but gain a bonus to Dexterity saving throws equal to your Proficiency bonus.",
          ],
          page3notes: true,
        },
      ],
    },
    hungry_jaws: {
      name: "Hungry Jaws",
      source: [["EldritchHunt", 109]],
      minlevel: 1,
      recovery: "long rest",
      oncelr: true,
      action: [["bonus action", ""]],
      toNotesPage: [
        {
          name: "Hungry Jaws",
          note: [
            "As a bonus action, you can attempt to feed off of a creature within 5 feet of you. Make an unarmed strike",
            "On a hit, you regain hit points equal to the damage dealt.",
            "You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "Scourgeborne are made not born. This means that they mature at the same rate as the race they originally belonged to.",
};

//Subrace: Cervus
RaceList["cervus scourgeborne"] = {
  regExpSearch: /^(?=.*cervus)(?=.*scourgeborne).*$/i,
  name: "Cervus Scourgeborne",
  sortname: "Scourgeborne, Cervus",
  source: [["EldritchHunt", 108]],
  plural: "Cervus Scourgeborne",
  size: 3,
  speed: {
    walk: { spd: 40, enc: 30 }, //+10 bonus from Nimble Build
  },
  scores: [0, 0, 1, 0, 0, 0], //[Str, Dex, Con, Int, Wis, Cha]
  scorestxt: "+1 Strength or Wisdom, +1 Constitution, +1 any of your choice",
  trait:
    "Cervus Scourgeborne (+1 Strength or Wisdom, +1 Constitution, +1 any of your choice)",
  languageProfs: ["Common", 1],
  calcChanges: {
    atkAdd: [
      function (fields, v) {
        if (v.baseWeaponName == "unarmed strike") {
          if (fields.Damage_Die == 1 || fields.Damage_Die == "1d4")
            fields.Damage_Die = "1d6";
          fields.Damage_Type = "Piercing";
          if (/^(?=.*evil).*$/i.test(What("Alignment"))) {
            fields.Damage_Die = "1d8";
          }
        }
      },
      "My unarmed strikes deal 1d6 damage instead of 1, which increases to 1d8 if I'm Evil aligned",
      1,
    ],
  },
  features: {
    eldritch_curse: {
      name: "Eldritch Curse",
      source: [["EldritchHunt", 108]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Eldritch Curse",
          note: [
            "Your curse is not something mere mortals can undo. You are immune to any spell that would alter your form. (e.g., alter self, polymorph...)",
          ],
          page3notes: true,
        },
      ],
    },
    born_of_madness: {
      name: "Born of Madness",
      source: [["EldritchHunt", 108]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Born of Madness",
          note: [
            "• If your alignment is Good, you gain control over your darkest impulses. You have advantage on saving throws against madness.",
            "• If your alignment is Evil you let the depraved monster within you influence you. You have disadvantage on saving throws against madness but gain a bonus to Dexterity saving throws equal to your Proficiency bonus.",
          ],
          page3notes: true,
        },
      ],
    },
    goring_charge: {
      name: "Goring Charge",
      source: [["EldritchHunt", 110]],
      minlevel: 1,
      recovery: "long rest",
      oncelr: true,
      toNotesPage: [
        {
          name: "Goring Charge",
          note: [
            "If you move at least 20 feet straight toward a creature and then hit it with a melee attack on the same turn, that target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + your Strength modifier) or be knocked prone",
            "If the target is prone, you can make one melee attack against it as a bonus action.",
            "You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "Scourgeborne are made not born. This means that they mature at the same rate as the race they originally belonged to.",
};

//Subrace: Vespertilio
RaceList["vespertilio scourgeborne"] = {
  regExpSearch: /^(?=.*vespertilio)(?=.*scourgeborne).*$/i,
  name: "Vespertilio Scourgeborne",
  sortname: "Scourgeborne, Vespertilio",
  source: [["EldritchHunt", 108]],
  plural: "Vespertilio Scourgeborne",
  size: 3,
  speed: {
    walk: { spd: 30, enc: 20 },
  },
  scores: [0, 1, 0, 1, 0, 0], //[Str, Dex, Con, Int, Wis, Cha]
  scorestxt: "+1 Dexterity, +1 Constitution, +1 any of your choice",
  trait:
    "Vespertilio Scourgeborne (+1 Dexterity, +1 Constitution, +1 any of your choice)",
  languageProfs: ["Common", 1],
  vision: [["Darkvision", 108]],
  calcChanges: {
    atkAdd: [
      function (fields, v) {
        if (v.baseWeaponName == "unarmed strike") {
          if (fields.Damage_Die == 1 || fields.Damage_Die == "1d4")
            fields.Damage_Die = "1d6";
          fields.Damage_Type = "Piercing";
          if (/^(?=.*evil).*$/i.test(What("Alignment"))) {
            fields.Damage_Die = "1d8";
          }
        }
      },
      "My unarmed strikes deal 1d6 damage instead of 1, which increases to 1d8 if I'm Evil aligned",
      1,
    ],
  },
  features: {
    eldritch_curse: {
      name: "Eldritch Curse",
      source: [["EldritchHunt", 108]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Eldritch Curse",
          note: [
            "Your curse is not something mere mortals can undo. You are immune to any spell that would alter your form. (e.g., alter self, polymorph...)",
          ],
          page3notes: true,
        },
      ],
    },
    born_of_madness: {
      name: "Born of Madness",
      source: [["EldritchHunt", 108]],
      minlevel: 1,
      toNotesPage: [
        {
          name: "Born of Madness",
          note: [
            "• If your alignment is Good, you gain control over your darkest impulses. You have advantage on saving throws against madness.",
            "• If your alignment is Evil you let the depraved monster within you influence you. You have disadvantage on saving throws against madness but gain a bonus to Dexterity saving throws equal to your Proficiency bonus.",
          ],
          page3notes: true,
        },
      ],
    },
    tattered_wings: {
      name: "Tattered Wings",
      source: [["EldritchHunt", 110]],
      minlevel: 1,
      action: [["bonus action", ""]],
      recovery: "short rest",
      oncelr: true,
      oncesr: true,
      toNotesPage: [
        {
          name: "Tattered Wings",
          note: [
            "You can use a bonus action to gain a flying speed of 30 feet until the end of your turn. If nothing is holding you aloft at the end of your turn, you fall.",
            "You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a short or long rest.",
          ],
          page3notes: true,
        },
      ],
    },
  },
  age: "Scourgeborne are made not born. This means that they mature at the same rate as the race they originally belonged to.",
};


//Items and Spells

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

