if (sheetVersion < 13001012) {
  throw "This script was made for a newer version of the sheet (v13.1.12). Please use the latest version and try again.\nYou can get the latest version at www.flapkan.com.";
}
var iFileName = "Eldritch_Hunt_Jaeger.js";
RequiredSheetVersion("13.1.12");

SourceList["EldritchHunt"] = {
  name: "Steinhardt's Guide to the Eldritch Hunt",
  abbreviation: "SGttEH",
  abbreviationSpellsheet: "SGttEH",
  group: "3rd Party Campaign Sourcebooks",
  date: "2024/07/01",
};

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
