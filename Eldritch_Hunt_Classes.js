if (sheetVersion < 13001012) { throw "This script was made for a newer version of the sheet (v13.1.14). Please use the latest version and try again.\nYou can get the latest version at www.flapkan.com."; };
var iFileName = "Eldritch_Hunt_Classes.js";
RequiredSheetVersion("13.1.12");

SourceList["EldritchHunt"] = {
  name: "Steinhardt's Guide to the Eldritch Hunt",
  abbreviation: "SGttEldHunt",
  abbreviationSpellsheet: "SGttEldHunt",
  group: "3rd Party Campaign Sourcebooks",
  date: "2024/07/01"
};


//Warlock: Pact of the Trigger
AddWarlockPactBoon("Pact of the Trigger", {
  name: "Pact of the Trigger",
  source: [["EldritchHunt", 168]],
  description : desc([
		"You can choose the form that this spellcasting focus takes each time you create it. It can either be a Revolver or a Sniper (detailed below).",
		"Your hex gun disappears if it is more than 5 feet away from you for 1 minute. It also disappears if you use this feature again, if you dismiss it (no action required), or if you die.",
		"Your hex gun acts as a spellcasting focus, and when you cast cantrips with it, it channels them as bullets (these still count as spells). Instead of increasing the damage of the cantrip when you reach certain levels, you can cast the cantrip additional times as part of the same action (except for Eldritch Blast, which is cast as normal). To be cast in this way, the cantrip must deal damage, must make a spell attack or require a saving throw, and must have a range other than self.",
		"When you cast a cantrip in this manner, you cast it 2 times at 5th level, 3 times at 11th level, and 4 times at 17th level. The cantrip can deal its damage more than once, but its other effects can't be applied again.",
    //Revolver Form
    "Revolver Form: Being within 5 feet of a hostile creature doesn’t impose disadvantage on your ranged spell attack rolls cast through the hex gun. While wielding this weapon, you know the shocking grasp cantrip.",
    //Sniper Form
    "Sniper Form: Your ranged spell attack rolls cast through the hex gun have their range doubled and ignore half-cover. While wielding this weapon, you know the ray of frost cantrip."
	]),
  spellcastingBonus : [{
		name : "Pact of the Trigger (Revolver)",
		spells : ["shocking grasp"],
		selection : ["shocking grasp"],
	}, {
		name : "Pact of the Trigger (Sniper)",
		spells : ["ray of frost"],
		selection : ["ray of frost"],
	}]
})

AddWarlockInvocation("Agonizing Shots (prereq: Pact of the Trigger feature)", {
  name : "Agonizing Shots",
	source : [["EldritchHunt", 168]],
	submenu : "[improves Pact of the Trigger]",
	description : "When you cast a cantrip with your hex gun, add your Charisma modifier to the damage it deals on a hit (if you don't already add your Charisma modifier to it).",
	prereqeval : function(v) {
		return GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the trigger") !== -1;
	},
})

AddWarlockInvocation("Bullet Hell (prereq: level 5 warlock, Pact of the Trigger feature (Revolver Form))", {
	name : "Bullet Hell",
	source : [["EldritchHunt", 168]],
	submenu : "[improves Pact of the Trigger]",
	description : "As a bonus action, you temporarily duplicate your hex gun to unleash a flurry of bullets. All creatures within a 15-foot cone in front of you must succeed a Dexterity saving throw against your spell save DC or take 2d10 force damage. This damage increases to 3d10 at 11th level and 4d10 at 17th level. To use this bonus action, you need to be holding your hex gun in one hand and have the other hand free.\nYou can use this invocation a number of times equal to twice your Charisma modifier (minimum of twice), and you regain all expended uses when you finish a long rest.",
	action : [["bonus action", ""]],
	prereqeval : function(v) {
		return classes.known.warlock.level >= 5 && GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the trigger") !== -1;
	},
	usages: "Two times Charisma modifer",
	usagescalc : "event.value = Math.max(2, What('Cha Mod')*2)",
	recovery: "long rest",
  oncelr : true,
});

AddWarlockInvocation("Crippling Shot (prereq: Pact of the Trigger feature (Revolver Form))", {
	name : "Crippling Shot",
	source : [["EldritchHunt", 168]],
	submenu : "[improves Pact of the Trigger]",
	description : "Once on each of your turns when you damage a creature with an attack made using your hex gun, you can force it to make a Strength saving throw against your spell save DC or fall prone and have its speed reduced to 0 until the start of your next turn.\nYou can use this invocation a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a long rest.",
	prereqeval : function(v) {
		return GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the trigger") !== -1;
	},
	usages: "Cha Mod",
	usagescalc : "event.value = Math.max(1, What('Cha Mod'))",
	recovery: "long rest",
  oncelr : true,
});

AddWarlockInvocation("Dead Eye (prereq: level 15 warlock, Pact of the Trigger feature (Sniper Form))", {
	name : "Dead Eye",
	source : [["EldritchHunt", 168]],
	submenu : "[improves Pact of the Trigger]",
	description : "If you haven't moved this turn, you can take aim as a bonus action, reducing your speed to 0 and granting you advantage on all attacks you make using your hex gun until the end of your turn.",
	prereqeval : function(v) {
		return classes.known.warlock.level >= 15 && GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the trigger") !== -1;
	},
});

AddWarlockInvocation("Headshots (prereq: level 9 warlock, Pact of the Trigger feature (Sniper Form))", {
  name : "Headshots",
  source : [["EldritchHunt", 168]],
  submenu : "[improves Pact of the Trigger]",
  action : [["bonus action", ""]],
  description : "As a bonus action, you can enhance your focus to see the weak spots of your foes. For the next minute, attacks you make using your hex gun score a critical hit on a roll of 19 or 20. Once you've used this invocation, you can't use it again until you finish a short or long rest.",
  prereqeval : function(v) {
    return classes.known.warlock.level >= 9 && GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the trigger") !== -1;
  },
  usages: 1,
  recovery: "short rest"
});

AddWarlockInvocation("Quickstep (prereq: level 7 warlock, Pact of the Trigger feature)", {
	name : "Quick Step",
	source : [["EldritchHunt", 169]],
	submenu : "[improves Pact of the Trigger]",
  action : [["reaction", ""]],
	description : "Your reflexes are honed. As a reaction, when an enemy makes a melee attack against you, before being hit, if your speed isn't 0, you can move 5 feet away from the foe without triggering opportunity attacks, potentially avoiding the attack if you leave its range.\nYou can use this invocation a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a long rest.",
	prereqeval : function(v) {
		return classes.known.warlock.level >= 7 && GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the trigger") !== -1;
	},
	usages: "Cha Mod",
	usagescalc : "event.value = Math.max(1, What('Cha Mod'))",
	recovery: "long rest"
});

AddWarlockInvocation("Reckless Fire (prereq: Pact of the Trigger feature)", {
	name : "Reckless Fire",
	source : [["EldritchHunt", 169]],
	submenu : "[improves Pact of the Trigger]",
	description : "Your shots are like a rain of lead. When you roll a 1 or 2 on a damage die for a cantrip you cast with your hex gun, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2.",
	prereqeval : function(v) {
		return GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the trigger") !== -1;
	},
	usages: "Cha Mod",
	usagescalc : "event.value = Math.max(1, What('Cha Mod'))",
	recovery: "long rest"
});


AddWarlockInvocation("Repeating Cantrips (prereq: level 5 warlock, Pact of the Trigger feature)", {
	name : "Repeating Cantrips",
	source : [["EldritchHunt", 169]],
	submenu : "[improves Pact of the Trigger]",
	description : "When you fire a cantrip through your hex gun, its non- damaging effects (such as the speed reduction from ray of frost) can apply multiple times but not more than once per creature.",
	prereqeval : function(v) {
		return classes.known.warlock.level >= 5 && GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the trigger") !== -1;
	},
});

AddWarlockInvocation("Ricochet (prereq: level 7 warlock, Pact of the Trigger feature)", {
	name : "Ricochet",
	source : [["EldritchHunt", 169]],
	submenu : "[improves Pact of the Trigger]",
	description : "Until the end of your turn, you enhance your hex gun. When you hit a creature with a cantrip cast with your hex gun, you can immediately cause the hit to wound a second creature within 15 feet of the original target. The second target takes damage (of the type of the cantrip) equal to your Charisma modifier (minimum 1).\nYou can use this invocation to enhance your hex gun a number of times equal to your Charisma modifier, and you regain all expended uses when you finish a short or long rest.",
	prereqeval : function(v) {
		return classes.known.warlock.level >= 7 && GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the trigger") !== -1;
	},
	usages: "Cha Mod",
	usagescalc : "event.value = What('Cha Mod')",
	recovery: "short rest"
});

AddWarlockInvocation("Riposte (prereq: level 7 warlock, Pact of the Trigger feature (Revolver Form))", {
	name : "Riposte",
	source : [["EldritchHunt", 169]],
	submenu : "[improves Pact of the Trigger]",
	description : "When an enemy attacks you with a melee attack, you can fire a special bullet to counter it as a reaction before being hit. Make a melee or ranged spell attack. On a hit, the enemy takes 1d10 force damage, its attack fails, and it is stunned until the end of its current turn.\nOnce you’ve used this invocation to damage an enemy, you can’t use it again until you finish a short or long rest.",
	prereqeval : function(v) {
		return classes.known.warlock.level >= 7 && GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the trigger") !== -1;
	},
	usages: 1,
	recovery: "short rest"
});

//Barbarian

//Path of the Earthbreaker
AddSubClass("barbarian", "path of the earthbreaker", {
  regExpSearch : /^(?=.*\bearthbreaker\b)(?=.*(warrior|marauder|barbarian|viking|(norse|tribes?|clans?)(wo)?m(a|e)n)).*$/i,
	subname : "Path of the Earthbreaker",
  source: [["EldritchHunt", 128]],
	abilitySave : 1, //Strength save
  features: {
    "earthbreaker3.1": {
      name: "Overwhelming Power",
      source: [["EldritchHunt", 128]],
      minLevel: 3,
      description: desc(
        [
          "Starting at 3rd level, you have learned to channel destructive energy through your fists and other body parts.\nWhen you hit with an unarmed strike, you can deal bludgeoning damage equal to 1d6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.\nThis die increases to 1d8 at 6th level, 1d10 at 10th level, and 1d12 at 14th level.\nWhen you make an unarmed strike against a creature on your turn, you can use a bonus action to make another unarmed strike against the same creature.",
          "Your sheer power puts a massive strain on most weapons, shattering them.\nWhen you hit with a melee attack with a nonmagical weapon, the weapon breaks in your hand and can’t be used to make attacks until it is repaired.\nIn addition, the range of thrown weapons is doubled for you.\nIf you hit with a ranged attack with a thrown weapon, you can use the damage die above in place of the weapon’s usual damage dice."
        ]
      ),
      calcChanges: {
        atkAdd : [
          function (fields, v) {
            if (v.baseWeaponName == "unarmed strike") {
              if (fields.Damage_Die == 1 || fields.Damage_Die == "1d4") fields.Damage_Die = '1d6';
              if (classes.known.barbarian && classes.known.barbarian.level > 5) fields.Damage_Die = '1d8';
              if (classes.known.barbarian && classes.known.barbarian.level > 9) fields.Damage_Die = '1d10';
              if (classes.known.barbarian && classes.known.barbarian.level > 13) fields.Damage_Die = '1d12';
    
              fields.Description = (fields.Description ? '; ' : '') + 'Bludgeoning'; //! check this out again
            };
          },
          "My unarmed strikes deal 1d6 damage instead of 1. This die increases to 1d8 at 6th level, 1d10 at 10th level, and 1d12 at 14th level",
          1
        ]
      },
    },
    "earthbreaker3.2": {
      name: "Gravitational Rage",
      source: [["EldritchHunt", 128]],
      minLevel: 3,
      description: desc(
        [
          "At 3rd level, once per turn, when you deal damage to a creature with an unarmed strike, you can choose one of the following effects. These effects use your Earthbreaker save DC.",
          "• Burying Hands. The target must succeed on a Strength saving throw or have its speed reduced to 0 until the start of your next turn, as you partially bury it in the ground. If the target fails the saving throw by 5 or more, it is also knocked prone. If the target isn’t on the ground when it fails this save, it immediately falls instead, even if it can hover.",
          "• Bulldozing Punch. You push the target 10 feet away from you or upward. If pushed into an obstacle or another creature, the target takes bludgeoning damage equal to your Strength modifier (minimum of 1). Creatures with a Strength score equal to or greater than yours can make a Strength saving throw to resist this effect, avoiding it on a success. If you push the target upward, it can make a DC 10 Dexterity saving throw, avoiding any fall damage on a success."
        ]
      ),
    },
    "earthbreaker6.1": {
      name: "Ruination",
      source: [["EldritchHunt", 129]],
      minLevel: 3,
      description: desc(
        [
          "Starting at 6th level, the strength you wield is capable of toppling the arcane rules of the world. Your unarmed strikes count as magical for the purpose of overcoming resistance and immunity.",
          "In addition, when you hit a physical barrier created by a spell with an unarmed strike, such as the effect of a wall of force or forcecage spell, or any other wall spell (such as wall of fire, gravity wall󨖙, or prismatic wall), you can make a Strength check (DC = 10 + the spell’s level), rupturing the arcane and dispelling the spell on a success.",
        ]
      ),
    },
    "earthbreaker6.2": {
      name: "Imperious Gravity",
      source: [["EldritchHunt", 129]],
      minLevel: 3,
      description: desc(
        [
          "Also at 6th level, you increase your mastery over gravity. On each of your turns while raging, you can use a bonus action to create one of the following effects, using your Earthbreaker save DC. The range of these abilities, and the distance they move creatures, doubles at 14th level",
          "• Attractive Field. You unleash a gravitational wave. Each creature in a 15-foot cone originating from you must succeed on a Strength saving throw or be pulled up to 10 feet towards you.",
          "• Repulsive Field. You condense a bubble of gravity around yourself. The next time a creature would hit you with a melee attack, the bubble bursts in a roaring explosion. Each creature within 10 feet of you must succeed on a Strength saving throw or be pushed up to 10 feet away from you. If this pushes the attacker beyond its reach of you, the attack misses you. If the bubble doesn’t burst by the start of your next turn, it harmlessly dissipates.",
          "• Stomp. You stomp the ground, causing a destructive quake in a 10-foot-long, 5-foot-wide line on the ground originating from you. Each creature in the area must succeed on a Dexterity saving throw or take 1d4 bludgeoning damage and have disadvantage on its next Strength saving throw before the start of your next turn as it is thrown off balance. Additionally, the ground in that area becomes difficult terrain until cleared. Each 5-foot-square portion of the area requires at least 1 minute to clear by hand."
        ]
      ),
    },
    "earthbreaker10": {
      name: "Unyielding",
      source: [["EldritchHunt", 129]],
      minLevel: 3,
      description: desc(
        [
          "Beginning at 10th level, your unarmed strikes deal double damage to structures and you can ignore difficult terrain.",
          "In addition, your crushing power seeps into all the aspects of your life. You can add your Constitution modifier to any Strength checks and Intimidation checks you make.",
        ]
      ),
    },
    "earthbreaker14": {
      name: "Unyielding",
      source: [["EldritchHunt", 129]],
      minLevel: 3,
      usages: "Str Mod",
      usagescalc : "event.value = What('Str Mod')",
      recovery: "short rest",
      description: desc(
        [
          "Once you reach 14th level, your blows can level the world. Once on each of your turns while you are raging, when you make a melee attack, you can fracture the world. On a hit, the target takes an extra 3d12 bludgeoning damage and is pushed up to 30 feet away from you. In addition, hit or miss, the area in a 90-foot cone in front of you breaks, as per the earthquake spell (save DC equals your Earthbreaker save DC), although the spell only lasts until the start of your next turn, doesn’t require concentration, and can create only 1d4 fissures in the area.",
          "You can use this feature a number of times equal to your Strength modifier, and you regain all expended uses when you finish a short or long rest.",
        ]
      ),
    },
  },
})

//Path of the Lightning Vessel
AddSubClass("barbarian", "path of the lightning vessel", {
  regExpSearch : /^(?=.*\blightning\b)(?=.*\bvessel\b)(?=.*(warrior|marauder|barbarian|viking|(norse|tribes?|clans?)(wo)?m(a|e)n)).*$/i,
	subname : "Path of the Lightning Vessel",
  source: [["EldritchHunt", 130]],
	abilitySave : 3, //Consitution save
  features: {
    "lightningvessel3": {
      name: "Overwhelming Power",
      source: [["EldritchHunt", 128]],
      minLevel: 3,
      dmgres: ["lightning; if existed, reduce by another 1d6"],
      description: desc(
        [
          "While raging, you can unleash the lightning within. For the duration of your rage, you can use your bonus action to unleash various powers.",
          "• Electrified Chains. You can use your bonus action to create chains of lightning that wrap around your weapon. The next time you hit a creature this turn, it takes additional lightning damage equal to twice your Constitution modifier and becomes ensnared by the chains, which anchor to the floor, until the start of your next turn. Each time it attempts to move more than 10 feet while ensnared, it must make an Athletics check contested by your Athletics check, freeing itself on a success. On a failure, it takes the lightning damage again and its speed is reduced to 0 until the start of your next turn.",
          "• Fulgurant Strike. When you hit a creature with a melee weapon attack, you can leave the weapon embedded in their chest for a brief moment and immediately use a bonus action to call down lightning from the heavens to strike them, using the weapon as a conduit, before retrieving it. The target takes lightning damage equal to twice your Constitution modifier, and all creatures within a 5-foot radius must succeed on a Dexterity saving throw against your Vessel save DC or also take that damage. You have advantage on this saving throw.",
          "• Lightning Step. As a bonus action, you can move up to half your speed. During this rush, your body becomes supercharged; if you end this movement within 5 feet of a creature, it takes lightning damage equal to twice your Constitution modifier as the lightning leaps to them. If there are multiple creatures, choose one that takes the damage."
        ]
      ),
    },
    "lightningvessel6": {
      name: "Roaring Crash",
      source: [["EldritchHunt", 131]],
      minLevel: 6,
      description: desc(
        [
          "At 6th level, you are ready to leap into battle at a moment’s notice, crashing down on your foes like thunder from the heavens. As part of entering your rage, you can leap into the air, before crashing down on a point on the ground that you can see within 30 feet of you that isn't occupied by a Huge or larger creature. All creatures in a 10-foot radius centered on that point must succeed on a Dexterity saving throw against your Vessel save DC or take a number of d8s of lightning damage equal to your Constitution modifier (minimum of 1d8), or half as much damage on a success.",
          "If a creature is in the space on which you land, they have disadvantage on the saving throw and are pushed 5 feet out of your space into an unoccupied space of their choice. If no unoccupied space is within range, the creature instead falls prone in your space.",
          "At 10th level, the distance you can leap increases to 60 feet, and you can land in spaces occupied by Huge creatures. At 14th level, the distance increases to 90 feet, and you can land in spaces occupied by Gargantuan creatures."
        ]
      ),
    },
    "lightningvessel10": {
      name: "Lightning Reflexes",
      source: [["EldritchHunt", 131]],
      minLevel: 10,
      description: desc(
        [
          "At 10th level, the lightning you wield enhances your reflexes past what your body could normally handle. As a result, whenever you make a Dexterity check, you gain a bonus to the check equal to your Constitution modifier (minimum of +1).",
          "In addition, while raging, you can use Lightning Step once on each of your turn without using a bonus action."
        ]
      ),
    },
    "earthbreaker14": {
      name: "Electric Beast",
      source: [["EldritchHunt", 131]],
      minLevel: 14,
      description: desc(
        [
          "The damage from your Galvanic Heart’s abilities increases to three times your Constitution modifier, and they improve in the following way:",
          "• Electrified Chains. The creature cannot move more than 5 feet without attempting the check, and on a failure, they can’t take reactions until the start of your next turn.",
          "• Fulgurant Strike. The lightning strike’s radius increases to 10 feet, and you can choose a number of creatures equal to your Constitution modifier that automatically succeed on the saving throw.",
          "• Lightning Step. You can now move up to your full speed, and you can choose to merge with the lightning, teleporting the distance moved instead."
        ]
      ),
    },
  },
})