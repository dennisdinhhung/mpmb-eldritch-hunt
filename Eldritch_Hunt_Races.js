if (sheetVersion < 13001012) {
  throw "This script was made for a newer version of the sheet (v13.1.14). Please use the latest version and try again.\nYou can get the latest version at www.flapkan.com.";
}
var iFileName = "Eldritch_Hunt_Race.js";
RequiredSheetVersion("13.1.12");

SourceList["EldritchHunt"] = {
  name: "Steinhardt's Guide to the Eldritch Hunt",
  abbreviation: "SGttEldHunt",
  abbreviationSpellsheet: "SGttEldHunt",
  group: "3rd Party Campaign Sourcebooks",
  date: "2024/07/01",
};

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
