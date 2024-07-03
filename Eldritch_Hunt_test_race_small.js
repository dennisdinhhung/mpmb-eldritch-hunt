if (sheetVersion < 13001012) { throw "This script was made for a newer version of the sheet (v13.1.14). Please use the latest version and try again.\nYou can get the latest version at www.flapkan.com."; };
var iFileName = "Eldritch_Hunt_test_race.js";
RequiredSheetVersion("13.1.12");

SourceList["EldritchHunt"] = {
  name: "Steinhardt's Guide to the Eldritch Hunt",
  abbreviation: "SGttEldHunt",
  abbreviationSpellsheet: "SGttEldHunt",
  group: "Campaign Sourcebooks",
  date: "2024/07/01"
};



// RaceList["aranea scourgeborne"] = {
//   regExpSearch: /aranea-scourgeborne/i,
//   name: "Aranea Scourgeborne",
// 	sortname : "Scourgeborne, Aranea",
//   source: [["EldritchHunt", 108]],
//   plural: " Aranea Scourgeborne",
//   size: 3,
//   speed: {
//     walk: { spd: 30, enc: 20 },
//     climb : { spd : 30, enc : 20 },
//   },
// 	scores : [0, 0, 1, 1, 0, 0], //[Str, Dex, Con, Int, Wis, Cha]
//   trait : "Aranea Scourgeborne (+1 Constitution, +1 Intelligence, +1 any of your choice)",
// 	languageProfs : ["Common", 1],
//   vision : [["Darkvision", 120]], //120ft
//   calcChanges: {
// 		atkAdd : [
// 			function (fields, v) {
// 				if (v.baseWeaponName == "unarmed strike") {
// 					if (fields.Damage_Die == 1 || fields.Damage_Die == "1d4") fields.Damage_Die = '1d6';
// 					fields.Description = (fields.Description ? '; ' : '') + 'Piercing (d8)'; //! check this out again
// 				};
// 			},
// 			"My unarmed strikes deal 1d6 damage instead of 1, which increases to 1d8 if I'm Evil aligned",
// 			1
// 		]
// 	},
//   features: {
//     eldritch_curse: {
//       name: "Eldritch Curse",
//       source: [["EldritchHunt", 108]],
//       minlevel : 1,
//       toNotesPage : [{
// 				name : "Eldritch Curse",
// 				note : [
// 					"our curse is not something mere mortals can undo. You are immune to any spell that would alter your form. (e.g., alter self, polymorph...)",
//         ],
// 				page3notes : true
// 			}]
//     },
//     born_of_madness: {
//       name: "Born of Madness",
//       source: [["EldritchHunt", 106]],
//       minlevel : 1,
//       toNotesPage : [{
// 				name : "Born of Madness",
// 				note : [
// 					"• If your alignment is Good, you gain control over your darkest impulses. You have advantage on saving throws against madness.",
//           "• If your alignment is Evil you let the depraved monster within you influence you. You have disadvantage on saving throws against madness but gain a bonus to Dexterity saving throws equal to your Proficiency bonus.",
//         ],
// 				page3notes : true
// 			}]
//     }
//   },
//   age : "Scourgeborne are made not born. This means that they mature at the same rate as the race they originally belonged to.",
// }


RaceList["aranea scourgeborne"] = {
  regExpSearch: /scourgeborne/i,
  name: "Aranea Scourgeborne",
  source: [["EldritchHunt", 108]],
  plural: "Aranea Scourgeborne",
  size: 3,
  speed: {
    walk: { spd: 30, enc: 20 },
  },
	scores : [0, 0, 1, 1, 0, 0], //[Str, Dex, Con, Int, Wis, Cha]
  trait : "Scourgeborne (+1 Constitution, +1 Intelligence)",
	languageProfs : ["Common", 1],
  vision : [["Darkvision", 120]],
  calcChanges: {
		atkAdd : [
			function (fields, v) {
				if (v.baseWeaponName == "unarmed strike") {
					if (fields.Damage_Die == 1 || fields.Damage_Die == "1d4") fields.Damage_Die = '1d6';
					fields.Description = (fields.Description ? '; ' : '') + 'Piercing (d8)'; //! check this out again
				};
			},
			"My unarmed strikes deal 1d6 damage instead of 1, which increases to 1d8 if I'm Evil aligned",
			1
		]
	},
  features: {
    eldritch_curse: {
      name: "Eldritch Curse",
      source: [["EldritchHunt", 108]],
      minlevel : 1,
      toNotesPage : [{
				name : "Eldritch Curse",
				note : [
					"our curse is not something mere mortals can undo. You are immune to any spell that would alter your form. (e.g., alter self, polymorph...)",
        ],
				page3notes : true
			}]
    },
    born_of_madness: {
      name: "Born of Madness",
      source: [["EldritchHunt", 106]],
      minlevel : 1,
      toNotesPage : [{
				name : "Born of Madness",
				note : [
					"• If your alignment is Good, you gain control over your darkest impulses. You have advantage on saving throws against madness.",
          "• If your alignment is Evil you let the depraved monster within you influence you. You have disadvantage on saving throws against madness but gain a bonus to Dexterity saving throws equal to your Proficiency bonus.",
        ],
				page3notes : true
			}]
    },
    spider_climb: {
      name: "Spider Climb",
      source: [["EldritchHunt", 109]],
      minlevel : 1,
			recovery : "long rest",
      oncelr : true,
      toNotesPage : [{
				name : "Spider Climb",
				note : [
					"You have a climbing speed of 30 feet. In addition, you can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.",
          "You can only do so for a number of minutes equal to your proficiency bonus and you regain all expended minutes when you finish a long rest."
        ],
				page3notes : true
			}]
    },
    web_spit: {
      name: "Web Spit",
      source: [["EldritchHunt", 109]],
      minlevel : 1,
      action : [["bonus action", ""]],
			recovery : "long rest",
      oncelr : true,
      toNotesPage : [{
				name : "Web Spit",
				note : [
					"As a bonus action, you hurl sticky web at a creature within 60 feet of you; it must succeed on a Dexterity saving throw (DC = 8 + your proficiency bonus + your Constitution modifier) or be restrained by the webbing",
          "As an action, the restrained target can make a Strength check against the DC, bursting the webbing and freeing itself on a success.",
          "The webbing can also be attacked and destroyed (AC 10; HP equal to 3 times your proficiency bonus; vulnerability to fire damage; immunity to bludgeoning, poison, and psychic damage).",
          "Once you use this trait, you can't use it again until you finish a long rest."
        ],
				page3notes : true
			}]
    }
  },
  age : "Scourgeborne are made not born. This means that they mature at the same rate as the race they originally belonged to.",
}