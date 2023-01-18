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
  "Abominable Asiago": 1.0000, // Gamplay update 10/05
  "Ancient": 1.0000, // Gamplay update 10/05
  "Ancient String": 1.0000, // Gamplay update 10/05
  "Arctic Asiago": 0.9000, // Guesstimate | Calculated: 0.8513, Sample: 10204 (Very High)
  "Ascended": 1.0000, // Gamplay update 10/05
  "Bland Queso": 0.9000, // Guesstimate | Calculated: 0.8970, Sample: 163254 (Excellent)
  "Brie": 0.8500, // Gamplay update 10/05
  "Brie String": 0.8500, // Gamplay update 10/05
  "Candy Corn": 0.9000, // Guesstimate | Calculated: 0.9019, Sample: 3601 (High)
  "Checkmate": 1.0000, // Gamplay update 10/05
  "Chedd-Ore": 1.0000, // Gamplay update 10/05
  "Cheddar": 0.7000, // Gamplay update 10/05
  "Cherry": 0.8800, // Confirmed by Michele in #community-tools on discord on 08 Apr 22
  "Clamembert": 1.0000, // Added with FF release
  "Cloud Cheesecake": 1.0000, // Gamplay update 10/05
  "Coggy Colby": 1.0000, // Gamplay update 10/05
  "Combat": 1.0000, // Gamplay update 10/05
  "Creamy Havarti": 1.0000, // Gamplay update 10/05
  "Crescent": 1.0000, // Fort Rox update 15 Nov 22
  "Crimson": 0.9000, // Confirmed by Michele in #community-tools on discord on 08 Apr 22
  "Crunchy": 1.0000, // Gamplay update 10/05
  "Crunchy Havarti": 1.0000, // Gamplay update 10/05
  "Dewthief Camembert": 1.0000, // Gamplay update 10/05 | Sample: 7402
  "Diamond": 1.0000, // Gamplay update 10/05
  "Dragonvine": 1.0000, // Gamplay update 10/05
  "Dumpling": 1.0000, // Gamplay update 10/05 | Sample: 93373
  "Duskshade Camembert": 1.0000, // Gamplay update 10/05
  "Empowered Brie": 0.8500, // Gamplay update 10/05
  "Empowered SUPER|brie+": 1.0000, // Gamplay update 10/05
  "Extra Rich Cloud Cheesecake": 1.0000, // Added with SP + Gameplay update 10/05
  "Festive Feta": 0.9000, // Sample: 4959 (High)
  "Final Draft Derby": 1.0000, // Added with FF release
  "Fishy Fromage": 1.0000, // Gamplay update 10/05
  "First Draft Derby": 1.0000, // Added with FF release
  "Flamin' Queso": 1.0000, // Gamplay update 10/05
  "Fusion Fondue": 1.0000, // Gamplay update 10/05
  "Galleon Gouda": 1.0000, // Gamplay update 10/05 (Confirmed by Michele in #community-tools on discord on 10/5 12:04PM GMT-5)
  "Gauntlet String": 1.0000, // Gamplay update 10/05
  "Grubbeen": 1.0000, // Added with FF release
  "Tier 2": 1.0000, // Gamplay update 10/05
  "Tier 3": 1.0000, // Gamplay update 10/05
  "Tier 4": 1.0000, // Gamplay update 10/05
  "Tier 5": 1.0000, // Gamplay update 10/05
  "Tier 6": 1.0000, // Gamplay update 10/05
  "Tier 7": 1.0000, // Gamplay update 10/05
  "Tier 8": 1.0000, // Gamplay update 10/05
  "Gemstone": 1.0000, // Gamplay update 10/05
  "Ghastly Galleon Gouda": 1.0000, // Gamplay update 10/05
  "Ghoulgonzola": 0.8957, // Sample: 3123 (High)
  "Gilded": 0.8500, // Confirmed by Michele in #community-tools on discord on 08 Apr 22
  "Gingerbread": 0.9000, // Gamplay update 10/05
  "Glazed Pecan Pecorino": 1.0000, // Gamplay update 10/05
  "Glowing Gruyere": 1.0000, // Gamplay update 10/05
  "Glutter": 1.0000, // Gamplay update 10/05
  "Gnarled": 1.0000, // Gamplay update 10/05 | Sample: 9458
  "Gouda": 0.9000, // Gamplay update 10/05
  "Graveblossom Camembert": 1.0000, // Gamplay update 10/05
  "Grilled": 1.0000, // Gamplay update 10/05
  "Gumbo": 1.0000, // Gamplay update 10/05
  "Hot Queso": 1.0000, // Gamplay update 10/05
  "Inferno Havarti": 1.0000, // Gamplay update 10/05
  "Lactrodectus Lancashire": 1.0000, // Gamplay update 10/05
  "Limelight": 1.0000, // Gamplay update 10/05
  "Lockbox Limburger": 1.0000, // Gamplay update 10/05
  "Lunaria Camembert": 1.0000, // Gamplay update 10/05
  "Magical Havarti": 1.0000, // Gamplay update 10/05
  "Magical Rancid Radioactive Blue": 1.0000, // Gamplay update 10/05
  "Magical String": 1.0000, // Gamplay update 10/05
  "Maki": 1.0000, // Gamplay update 10/05
  "Maki String": 1.0000, // Gamplay update 10/05
  "Marble": 0.7500, // Gamplay update 10/05
  "Marble String": 0.7500, // Gamplay update 10/05
  "Marshmallow Monterey": 1.0000, // Gamplay update 10/05
  "Master Fusion": 1.0000, // Gamplay update 10/05
  "Medium Queso": 1.0000, // Gamplay update 10/05
  "Mild Queso": 1.0000, // Gamplay update 10/05
  "Mineral": 1.0000, // Gamplay update 10/05
  "Moon": 1.0000, // Gamplay update 10/05
  "Mozzarella": 0.7000, // Gamplay update 10/05
  "Nian Gao'da": 1.0000, // Gamplay update 10/05
  "Null Onyx Gorgonzola": 1.0000, // Gamplay update 10/05
  "Nutmeg": 0.9000, // Gamplay update 10/05
  "Onyx Gorgonzola": 1.0000, // Gamplay update 10/05
  "Pecan Pecorino": 1.0000, // Gamplay update 10/05
  "Polluted Parmesan": 1.0000, // Gamplay update 10/05
  "Pungent Havarti": 1.0000, // Gamplay update 10/05
  "Radioactive Blue": 1.0000, // Gamplay update 10/05 | Sample: 28100
  "Rainy": 1.0000, // Gamplay update 10/05
  "Rancid Radioactive Blue": 1.0000, // Gamplay update 10/05
  "Resonator": 1.0000, // Gamplay update 10/05
  "Rewind Raclette": 1.0000, // Gamplay update 10/05
  "Rift Combat": 1.0000, // Gamplay update 10/05
  "Rift Glutter": 1.0000, // Gamplay update 10/05
  "Rift Rumble": 1.0000, // Gamplay update 10/05
  "Rift Susheese": 1.0000, // Gamplay update 10/05
  "Riftiago": 1.0000, // Gamplay update 10/05
  "Rockforth": 1.0000, // Gamplay update 10/05
  "Rumble": 1.0000, // Gamplay update 10/05
  "Runic": 1.0000, // Gamplay update 10/05
  "Runic String": 1.0000, // Gamplay update 10/05
  "Runny": 1.0000, // Gamplay update 10/05
  "SB+": 1.0000, // Gamplay update 10/05
  "Seasoned Gouda": 0.9000, // Sample: 4275 (High)
  "Second Draft Derby": 1.0000, // Added with FF release
  "Shell": 1.0000, // Gamplay update 10/05
  "Sky Pirate Swiss": 1.0000, // Gamplay update 10/05
  "Snowball Bocconcini": 0.9000, // Sample: 4723 (High)
  "Spicy Havarti": 1.0000, // Gamplay update 10/05
  "Stormy Clamembert": 1.0000, // Added with FF release
  "Sunrise": 1.0000, // Gamplay update 10/05
  "Susheese": 1.0000, // Gamplay update 10/05
  "Sweet Havarti": 1.0000, // Gamplay update 10/05
  "Swiss": 0.8000, // Gamplay update 10/05
  "Swiss String": 0.8000, // Gamplay update 10/05
  "Terre Ricotta": 1.0000, // Gamplay update 10/05
  "Undead Emmental": 1.0000, // Gamplay update 10/05
  "Undead String Emmental": 1.0000, // Gamplay update 10/05
  "Vanilla Stilton": 1.0000, // Confirmed by Michele in #community-tools on discord on 08 Apr 22
  "Vengeful Vanilla Stilton": 1.0000, // Gamplay update 10/05
  "White Cheddar": 0.7000, // Gamplay update 10/05
  "Wicked Gnarly": 1.0000, // Gamplay update 10/05
  "Wildfire Queso": 1.0000, // Gamplay update 10/05
  "Windy": 1.0000, // Gamplay update 10/05
};
