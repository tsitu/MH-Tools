/**
 * Runny and [Extra Sweet] Cupcake Colby have either null attraction_bonus or low data
 *
 * 2018-07-05: 105/112 cheeses total
 * 2018-11-29: Manually added Crimson
 * 2019-06-26: Manually added Rockforth
 * 2019-09-01: Updated all cheeses via 19 Jul data (should be 112/115 total)
 * 2019-10-08: Manually added Gauntlet String guesstimate
 * 2020-09-13: Manually added Cloud Cheesecake and Pirate Swiss guesstimates
 * 2021-10-14: Updated cheese attraction rate from gameplay update posted on 2021-10-05 https://www.mousehuntgame.com/newspost.php?news_post_id=584
 *  -Standard Cheese AR updates
 *  -if AR < .7 --> new AR is .7
 *  -if AR >= .95 --> new AR is 1
 */

// prettier-ignore
var baselineAttArray = {
  "Abominable Asiago": 1.0000, // 2021-10-05 Gameplay Update
  "Ancient": 1.0000, // 2021-10-05 Gameplay Update
  "Ancient String": 1.0000, // 2021-10-05 Gameplay Update
  "Apprentice Ambert": 1.0000, // Guesstimate - SoSo release
  "Arctic Asiago": 0.9000, // Guesstimate | Calculated: 0.8513, Sample: 10204 (Very High)
  "Ascended": 1.0000, // 2021-10-05 Gameplay Update
  "Beanster": 1.0000, // Added with BB release 09 May 23
  "Bland Queso": 0.9000, // Guesstimate | Calculated: 0.8970, Sample: 163254 (Excellent)
  "Bonefort": 1.0000, // Added with Halloween 2021
  "Brie": 0.8500, // 2021-10-05 Gameplay Update
  "Brie String": 0.8500, // 2021-10-05 Gameplay Update
  "Candy Corn": 0.9000, // Guesstimate | Calculated: 0.9019, Sample: 3601 (High)
  "Checkmate": 1.0000, // 2021-10-05 Gameplay Update
  "Chedd-Ore": 1.0000, // 2021-10-05 Gameplay Update
  "Cheddar": 0.7000, // 2021-10-05 Gameplay Update
  "Cherry": 0.8800, // Confirmed by Michele in #community-tools on discord on 08 Apr 22
  "Clamembert": 1.0000, // Added with FF release
  "Cloud Cheesecake": 1.0000, // 2021-10-05 Gameplay Update
  "Coggy Colby": 1.0000, // 2021-10-05 Gameplay Update
  "Combat": 1.0000, // 2021-10-05 Gameplay Update
  "Creamy Havarti": 1.0000, // 2021-10-05 Gameplay Update
  "Crescent": 1.0000, // Fort Rox update 15 Nov 22
  "Crimson": 0.9000, // Confirmed by Michele in #community-tools on discord on 08 Apr 22
  "Crunchy": 1.0000, // 2021-10-05 Gameplay Update
  "Crunchy Havarti": 1.0000, // 2021-10-05 Gameplay Update
  "Dewthief Camembert": 1.0000, // 2021-10-05 Gameplay Update | Sample: 7402
  "Diamond": 1.0000, // 2021-10-05 Gameplay Update
  "Dragonvine": 1.0000, // 2021-10-05 Gameplay Update
  "Dumpling": 1.0000, // 2021-10-05 Gameplay Update | Sample: 93373
  "Duskshade Camembert": 1.0000, // 2021-10-05 Gameplay Update
  "Elemental Emmental": 1.0000, // 2024-07-13 DD Release
  "Empowered Brie": 0.8500, // 2021-10-05 Gameplay Update
  "Empowered SUPER|brie+": 1.0000, // 2021-10-05 Gameplay Update
  "Extra Rich Cloud Cheesecake": 1.0000, // Added with SP + Gameplay update 10/05
  "Festive Feta": 0.9000, // Sample: 4959 (High)
  "Fiery Fontina": 1.0000, // 2024-07-13 DD Release
  "Final Draft Derby": 1.0000, // Added with FF release
  "First Draft Derby": 1.0000, // Added with FF release
  "Fishy Fromage": 1.0000, // 2021-10-05 Gameplay Update
  "Flamin' Queso": 1.0000, // 2021-10-05 Gameplay Update
  "Fusion Fondue": 1.0000, // 2021-10-05 Gameplay Update
  "Galleon Gouda": 1.0000, // 2021-10-05 Gameplay Update (Confirmed by Michele in #community-tools on discord on 10/5 12:04PM GMT-5)
  "Gauntlet String": 1.0000, // 2021-10-05 Gameplay Update
  "Gemstone": 1.0000, // 2021-10-05 Gameplay Update
  "Ghastly Galleon Gouda": 1.0000, // 2021-10-05 Gameplay Update
  "Ghoulgonzola": 0.8957, // Sample: 3123 (High)
  "Gilded": 0.8500, // Confirmed by Michele in #community-tools on discord on 08 Apr 22
  "Gingerbread": 0.9000, // 2021-10-05 Gameplay Update
  "Glazed Pecan Pecorino": 1.0000, // 2021-10-05 Gameplay Update
  "Glowing Gruyere": 1.0000, // 2021-10-05 Gameplay Update
  "Glutter": 1.0000, // 2021-10-05 Gameplay Update
  "Gnarled": 1.0000, // 2021-10-05 Gameplay Update | Sample: 9458
  "Gouda": 0.9000, // 2021-10-05 Gameplay Update
  "Graveblossom Camembert": 1.0000, // 2021-10-05 Gameplay Update
  "Grilled": 1.0000, // 2021-10-05 Gameplay Update
  "Grubbeen": 1.0000, // Added with FF release
  "Gumbo": 1.0000, // 2021-10-05 Gameplay Update
  "Hot Queso": 1.0000, // 2021-10-05 Gameplay Update
  "Isy Isabirra": 1.0000, // 2024-07-13 DD Release
  "Inferno Havarti": 1.0000, // 2021-10-05 Gameplay Update
  "Lactrodectus Lancashire": 1.0000, // 2021-10-05 Gameplay Update
  "Lavish Beanster": 1.0000, // Added with BB release 09 May 23
  "Limelight": 1.0000, // 2021-10-05 Gameplay Update
  "Lockbox Limburger": 1.0000, // 2021-10-05 Gameplay Update
  "Lunaria Camembert": 1.0000, // 2021-10-05 Gameplay Update
  "Magical Havarti": 1.0000, // 2021-10-05 Gameplay Update
  "Magical Rancid Radioactive Blue": 1.0000, // 2021-10-05 Gameplay Update
  "Magical String": 1.0000, // 2021-10-05 Gameplay Update
  "Maki": 1.0000, // 2021-10-05 Gameplay Update
  "Maki String": 1.0000, // 2021-10-05 Gameplay Update
  "Marble": 0.7500, // 2021-10-05 Gameplay Update
  "Marble String": 0.7500, // 2021-10-05 Gameplay Update
  "Marshmallow Monterey": 1.0000, // 2021-10-05 Gameplay Update
  "Master Fusion": 1.0000, // 2021-10-05 Gameplay Update
  "Master Mimolette": 1.0000, // Guesstimate - SoSo release
  "Medium Queso": 1.0000, // 2021-10-05 Gameplay Update
  "Mild Queso": 1.0000, // 2021-10-05 Gameplay Update
  "Mineral": 1.0000, // 2021-10-05 Gameplay Update
  "Monterey Jack-O-Lantern": 1.0000, // Added with Halloween 2021
  "Moon": 1.0000, // 2021-10-05 Gameplay Update
  "Mozzarella": 0.7000, // 2021-10-05 Gameplay Update
  "Nian Gao'da": 1.0000, // 2021-10-05 Gameplay Update
  "Null Onyx Gorgonzola": 1.0000, // 2021-10-05 Gameplay Update
  "Nutmeg": 0.9000, // 2021-10-05 Gameplay Update
  "Onyx Gorgonzola": 1.0000, // 2021-10-05 Gameplay Update
  "Pecan Pecorino": 1.0000, // 2021-10-05 Gameplay Update
  "Poisonous Provolone": 1.0000, // 2024-07-13 DD Release
  "Polluted Parmesan": 1.0000, // 2021-10-05 Gameplay Update
  "Polter-Geitost": 1.0000, // Added with Halloween 2021
  "Pungent Havarti": 1.0000, // 2021-10-05 Gameplay Update
  "Radioactive Blue": 1.0000, // 2021-10-05 Gameplay Update | Sample: 28100
  "Rainy": 1.0000, // 2021-10-05 Gameplay Update
  "Rancid Radioactive Blue": 1.0000, // 2021-10-05 Gameplay Update
  "Resonator": 1.0000, // 2021-10-05 Gameplay Update
  "Rewind Raclette": 1.0000, // 2021-10-05 Gameplay Update
  "Rift Combat": 1.0000, // 2021-10-05 Gameplay Update
  "Rift Glutter": 1.0000, // 2021-10-05 Gameplay Update
  "Rift Rumble": 1.0000, // 2021-10-05 Gameplay Update
  "Rift Susheese": 1.0000, // 2021-10-05 Gameplay Update
  "Riftiago": 1.0000, // 2021-10-05 Gameplay Update
  "Rockforth": 1.0000, // 2021-10-05 Gameplay Update
  "Royal Beanster": 1.0000, // Added with BB release 09 May 23
  "Rumble": 1.0000, // 2021-10-05 Gameplay Update
  "Runic": 1.0000, // 2021-10-05 Gameplay Update
  "Runic String": 1.0000, // 2021-10-05 Gameplay Update
  "Runny": 1.0000, // 2021-10-05 Gameplay Update
  "SB+": 1.0000, // 2021-10-05 Gameplay Update
  "Scream": 1.0000, // Added with Halloween 2021
  "Seasoned Gouda": 0.9000, // Sample: 4275 (High)
  "Second Draft Derby": 1.0000, // Added with FF release
  "Shell": 1.0000, // 2021-10-05 Gameplay Update
  "Sky Pirate Swiss": 1.0000, // 2021-10-05 Gameplay Update
  "Snowball Bocconcini": 0.9000, // Sample: 4723 (High)
  "Spicy Havarti": 1.0000, // 2021-10-05 Gameplay Update
  "Stormy Clamembert": 1.0000, // Added with FF release
  "Sunrise": 1.0000, // 2021-10-05 Gameplay Update
  "Susheese": 1.0000, // 2021-10-05 Gameplay Update
  "Sweet Havarti": 1.0000, // 2021-10-05 Gameplay Update
  "Swiss": 0.8000, // 2021-10-05 Gameplay Update
  "Swiss String": 0.8000, // 2021-10-05 Gameplay Update
  "Terre Ricotta": 1.0000, // 2021-10-05 Gameplay Update
  "Thousandth Draft Derby": 1.0000, // M1K release 16 Apr 24
  "Tier 2": 1.0000, // 2021-10-05 Gameplay Update
  "Tier 3": 1.0000, // 2021-10-05 Gameplay Update
  "Tier 4": 1.0000, // 2021-10-05 Gameplay Update
  "Tier 5": 1.0000, // 2021-10-05 Gameplay Update
  "Tier 6": 1.0000, // 2021-10-05 Gameplay Update
  "Tier 7": 1.0000, // 2021-10-05 Gameplay Update
  "Tier 8": 1.0000, // 2021-10-05 Gameplay Update
  "Undead Emmental": 1.0000, // 2021-10-05 Gameplay Update
  "Undead String Emmental": 1.0000, // 2021-10-05 Gameplay Update
  "Vanilla Stilton": 1.0000, // Confirmed by Michele in #community-tools on discord on 08 Apr 22
  "Vengeful Vanilla Stilton": 1.0000, // 2021-10-05 Gameplay Update
  "White Cheddar": 0.7000, // 2021-10-05 Gameplay Update
  "Wicked Gnarly": 1.0000, // 2021-10-05 Gameplay Update
  "Wildfire Queso": 1.0000, // 2021-10-05 Gameplay Update
  "Windy": 1.0000, // 2021-10-05 Gameplay Update
};
