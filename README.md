# :mouse: [MH Tools](https://tsitu.github.io/MH-Tools/) &middot; [![Build Status](https://app.travis-ci.com/tsitu/MH-Tools.svg?branch=master)](https://app.travis-ci.com/github/tsitu/MH-Tools)

Suite of JavaScript tools for the browser game [MouseHunt](https://www.mousehuntgame.com/).

Feel free to post your questions, comments, or concerns on the [forum thread](https://www.mousehuntgame.com/forum/showthread.php?132397-MouseHunt-Tools-by-tsitu&goto=newpost), or right here on [GitHub](https://github.com/tsitu/MH-Tools/issues). Alternatively, [join the discussion](https://discordapp.com/invite/Ya9zEdk) on Discord's `#community-tools` channel for faster responses.

## :book: Table of Contents

- [Instructions](#instructions)
  - [General Tips](#thought_balloon-general-tips)
  - [Bookmarklets](#bookmark-bookmarklets)
    - [Browser Installation Tips](#-browser-installation-tips)
    - [Chrome](#user-content-chrome)
    - [Firefox](#user-content-firefox)
    - [Edge / IE](#user-content-edge)
    - [Safari](#user-content-safari)
  - [Catch Rate Estimator](#straight_ruler-catch-rate-estimator)
    - [New Formula](#-new-formula)
    - [Sample Size Score](#-sample-size-score)
    - [Special Catch Rate Effects](#-special-catch-rate-effects)
  - [Map Solver and Mouse Finder](#earth_americas-map-solver-and-mouse-finder)
    - [Cheese Filters](#-cheese-filters)
  - [Best Setup](#trophy-best-setup)
  - [Marketplace Analyzer](#chart_with_upwards_trend-marketplace-analyzer)
  - [Crown Solver](#crown-crown-solver)
  - [Crafting Wizard](#hammer-crafting-wizard)
  - [Trap Setup Powers](#mag-trap-setup-powers)
    - [Worksheet](#-worksheet)
  - [CRE Tabs](#bookmark_tabs-cre-tabs)
- [Developers](#developers)
  - [Build and Run](#construction_worker-build-and-run)
  - [Populations](#clipboard-populations)
  - [Coding Style](#barber-coding-style)
- [Miscellaneous](#miscellaneous)
  - [Useful Links](#arrow_down-useful-links)
  - [Thanks](#heart_decoration-thanks-to)
- [License](#license)

## Instructions

### :thought_balloon: General Tips

Several tools make use of mottie's [tablesorter](https://mottie.github.io/tablesorter/docs/#Introduction) plugin, which includes useful additional features such as multi-column sorting with <kbd>Shift</kbd> or special characters for [filtering](https://mottie.github.io/tablesorter/docs/example-widget-filter.html).

We recommend installing the [MHCT extension](https://github.com/DevJackSmith/mh-helper-extension#mousehunt-helper-extension) if you have not already. It records valuable information from **active hunts** only. Virtually all data for recent updates has been sourced from MHCT's publicly accessible database backups.

_Disclaimer:_ Newer tools like 'Crafting Wizard' and 'Trap Setup Powers' may be incompatible with outdated or feature-constrained browsers such as Internet Explorer, Opera Mini, Samsung Internet, and Blackberry Browser. Older tools may also become incompatible with these browsers at any point.

### :bookmark: Bookmarklets

Bookmarklets are pieces of JavaScript code that are saved as a bookmark in the user's browser, enabling them to interact with webpages on the fly. We provide 9 different bookmarklets: Catch Rate Estimator, Map Solver, Best Setup: Load Items, Best Setup: Fields, Marketplace Analyzer, Crown Solver, Crafting Wizard, Powers: Worksheet and the all-in-one Auto-Loader. They are each available on their corresponding tool's page.

Using the Auto-Loader is recommended because it automatically grabs the latest version of each bookmarklet without having to manually update.

You **must** be on the official [mousehuntgame.com](https://www.mousehuntgame.com/) website for these bookmarklets to work. Same-origin policy blocks access to DOM elements and requests to server endpoints while playing in Facebook's `<iframe>`.

_Note:_ Mobile browsers can vary in their approach to accessing bookmarklets. For example, in Chrome for Android, you must type the first few characters of a bookmarklet's name in the address bar and click it from there for the code to take effect.

|    Bookmarklet    | Functionality                                                                                                                                                                                                                      |
| :---------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|        CRE        | Automatically fills in the Catch Rate Estimator with your location, sublocation, cheese, charm, weapon, base, and more                                                                                                             |
| Setup: Load Items | Automatically loads your owned weapons, bases, and charms into Best Setup                                                                                                                                                          |
|   Setup: Fields   | Automatically fills in Best Setup with your location, sublocation, cheese, charm, and more                                                                                                                                         |
|     Analyzer      | Generates a pop-up dialog that allows you to download your entire Marketplace transaction history and send it to the tool                                                                                                          |
|        Map        | Automatically fills in the Map Solver's mouse name `textarea` with all of the remaining uncaught mice on your Active Map                                                                                                           |
|       Crown       | Generates a pop-up dialog that allows you to select the crown types and corresponding catch cutoff values that you'd like to send over to the Crown Solver<br><br>_Note:_ Favorited mice will be prioritized in the resulting list |
|     Crafting      | Automatically loads your 'Crafting Table' materials into Crafting Wizard                                                                                                                                                           |
| Powers: Worksheet | Generates a pop-up dialog that allows you to select a mouse group/subgroup to target with your current trap setup                                                                                                                  |
|      Loader       | Generates a pop-up dialog that gives you access to the latest versions of each bookmarklet                                                                                                                                         |

<div align="right"><a href="#book-table-of-contents">Top</a></div>

#### &sect; Browser Installation Tips

On desktop, drag the blue bookmarklet link to your browser's bookmarks bar. On mobile, first tap the corresponding clipboard icon to copy the bookmarklet code to your clipboard, then paste it into the URL field of a new bookmark. The following instructions illustrate the basic concepts for 4 major browsers - these concepts should apply to other browsers as well (including mobile), but specific steps may vary.

<br><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/archive/chrome_12-48/chrome_12-48_32x32.png" alt="Chrome" id="chrome"><br>
_Google Chrome_

1. Bookmark an arbitrary page and give it a memorable name like 'CRE' or 'Auto-Loader'
1. Copy the bookmarklet code by right-clicking its link and selecting `Copy link address`
1. Right-click on your newly created bookmark and select `Edit...`
1. Paste the bookmarklet code into the `URL` field and hit `Save`

<br><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/archive/firefox_23-56/firefox_23-56_32x32.png" alt="Firefox" id="firefox"><br>
_Mozilla Firefox_

1. Right-click on the bookmarklet link, select `Bookmark This Link`, and name it accordingly

<br><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/edge/edge_32x32.png" alt="Edge" id="Edge"> <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/archive/internet-explorer_9-11/internet-explorer_9-11_32x32.png" alt="Edge" id="edge"><br>
_Microsoft Edge / Internet Explorer_

1. Bookmark an arbitrary page and give it a memorable name like 'CRE' or 'Auto-Loader'
1. Copy the bookmarklet code by right-clicking its link and selecting `Copy link`
1. Go to 'Hub -> Favorites', right-click on your newly created bookmark and click `Edit URL`
1. Paste the bookmarklet code into the text field and hit <kbd>Enter</kbd> to save
1. If that doesn't work, there is a third-party application called [EdgeManage](http://www.emmet-gray.com/Articles/EdgeManage.html) that claims to add a lot of missing features for managing Favorites - please use at your own discretion
1. Internet Explorer 11 allows you to drag bookmarklets directly to your favorites bar, or right-click and choose `Add to favorites`. However, it doesn't seem to support certain JavaScript features that enable the bookmarklets to run properly

<br><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/archive/safari_1-7/safari_1-7_32x32.png" alt="Safari" id="safari"><br>
_Apple Safari_

1. Bookmark an arbitrary page and give it a memorable name
1. Right-click on the bookmarklet link and select `Copy Link`
1. Right-click on the newly created bookmark, select `Edit Address`, paste into the text box, and click `Done`

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :straight_ruler: [Catch Rate Estimator](https://tsitu.github.io/MH-Tools/cre.html)

> Calculates catch rate estimates along with points, gold, minimum luck and more.

**Bookmarklet:** Run the `CRE` bookmarklet from basically any page on the MH website.

|            Descriptor            |  Per  |    Sum or Average (bottom row)    |
| :------------------------------: | :---: | :-------------------------------: |
|         Attraction Rate          | Mouse |        Sum for this setup         |
|            Catch Rate            | Mouse |      Average for this setup       |
| Catches (AR \* CR per 100 hunts) | Mouse |         Sum per 100 hunts         |
|               Gold               | Catch |         Average per hunt          |
|              Points              | Catch |         Average per hunt          |
|          Tourney Points          | Catch |         Average per hunt          |
|             Min Luck             | Mouse | Highest for this particular setup |
|               Rank               | Catch |             Per hunt              |

<br>

#### &sect; New Formula

<!-- https://tex-image-link-generator.herokuapp.com/ -->

In September of 2020, a new catch rate formula was implemented into MH Tools. For years, the classic [3-eff formula](https://mhanalysis.wordpress.com/2011/01/05/mousehunt-catch-rates-3-0/) served as our closest approximation of MouseHunt's true catch rate mechanics. This formula was regularly challenged, thanks to community reports of misses using setups exceeding predicted "minimum luck" values (ML) that purported to guarantee a mouse's catch. One especially significant challenge came recently, when HitGrab stated in a [Feedback Friday episode](https://www.youtube.com/watch?v=kKVgMk4prqI&t=59m31s) that weapon type effectiveness is [capped at 140%](https://www.youtube.com/watch?v=kKVgMk4prqI&t=65m29s), instead of the assumed 200%.

In light of these discrepancies, Discord user mmalks ran a regression analysis on open-source data from MHCT and posted his [results](https://discordapp.com/channels/275500976662773761/355474934601875457/683355234558673028), which appeared to correct many of the "off-by-1" MLs that the classic formula generated. <!-- One interesting quirk of this new formula is that an initial ML check with an exponent of 2 on the luck term is done prior to the main catch calculation, which itself uses a less aggressive exponent of 1.975. mmalks uses this seemingly unintuitive distinction to account for and smooth out catch rates that appear to be overestimated for setups approaching ML. -->

After observing the increased accuracy of mmalks' new catch rate and ML formulas over an extended period of time, we have decided to incorporate them into the tools. Further research is being conducted to improve on them, and catch rate estimates are liable to change as we inch closer to a fully complete model of MH's catch logic. With that said, please continue to report misses at or above displayed minimum luck values.

Classic catch rate formula: <img src="https://render.githubusercontent.com/render/math?math=%5Clarge+%5Cdisplaystyle+CR+%3D+%5Cfrac%7BE+%2A+T+%2B+%5C+%283+-+min%282%2C+E%29%29+%2A+%28min%282%2C+E%29+%2A+L%29%5E%7B2%7D%7D%7BE+%2A+T+%2B+%5C+M%7D" alt="CR = \frac{E * T + \ (3 - min(2, E)) * (min(2, E) * L)^{2}}{E * T + \ M}"><br><br>

New catch rate formula: <img src="https://render.githubusercontent.com/render/math?math=%5CLarge+CR+%3D+%5Cfrac%7BE+%2A+T+%2B+%5C+2+%2A+%28floor%28min%281.4%2C+E%29+%2A+L%29%29%5E%7B2%7D%7D%7BE+%2A+T+%2B+%5C+M%7D" alt="CR = \frac{E * T + \ 2 * (floor(min(1.4, E) * L))^{2}}{E * T + \ M}"><br><br>

<!-- New catch rate formula: <img src="https://render.githubusercontent.com/render/math?math=%5CLarge+CR+%3D+%5Cfrac%7BE+%2A+T+%2B+%5C+2+%2A+%28floor%28min%281.4%2C+E%29+%2A+L%29%29%5E%7B1.975%7D%7D%7BE+%2A+T+%2B+%5C+M%7D" alt="CR = \frac{E * T + \ 2 * (floor(min(1.4, E) * L))^{1.975}}{E * T + \ M}"><br><br> -->

Classic minimum luck formula: <img src="https://render.githubusercontent.com/render/math?math=%5CLarge+%5Cdisplaystyle+ML+%3D+%5Cceil%28%5Cfrac%7B%5Csqrt%7B%5Cfrac%7BM%7D%7B3+-+min%282%2C+E%29%7D%7D%7D%7Bmin%282%2C+E%29%7D%29" alt="ML = \ceil(\frac{\sqrt{\frac{M}{3 - min(2, E)}}}{min(2, E)})"><br><br>


New minimum luck formula: <img src="https://render.githubusercontent.com/render/math?math=\huge ML = \ceil({\frac{\ceil({\sqrt{\frac{M}{2}})}}{min(1.4, E)}})"><br><br>

- E = Weapon Type Effectiveness %
- T = Trap Power
- L = Trap Luck
- M = Mouse Power

For minimum luck, there's an extra wrinkle due to floating point arithmetic errors in MouseHunt. To match MouseHunt in detail, all of the above formulas must be computed using 64-bit floating point arithmetic. Then, check if the minimum luck is actually enough to guarantee 100% catch rate (i.e. if `2 * floor(min(1.4, E) * L)^2 >= M`); if not, increment the minluck by 1. This is described further by [beeejk's post](https://mh.beeejk.net/minluck).

#### &sect; Sample Size Score

An indicator of the quality and accuracy of a specific setup's data based on its sample size and the number of mice in its attraction pool. Setups are separated by locations, sublocations, cheeses and occasionally charms (if they have attraction-altering effects i.e. Warpath Warrior Charm in Waves 1-3 of Fiery Warpath). If you have a charm selected that doesn't affect a setup's mouse population pool, its corresponding "No Charm" data is displayed, since they are equivalent.

Previously, the tool displayed a flat sample size number with a rating assigned to it, which looked like `Sample Size: 300 (bad)` or `Sample Size: 100000 (excellent)`. This format was misleading because it didn't encode important contextual information. The current scoring scheme takes into account factors such as number of mice in a particular setup, 95% confidence levels, and relative margins of error. It combines and normalizes these factors into a single number, capped at 100.

_Note:_ Certain setups may have low scores or even no sample size data attached to them. This could be because: (1) the data was extracted from HornTracker before we decided to start keeping track of sample sizes, (2) there aren't enough recorded hunts for that setup in MHCT, (3) our population fetching scripts need to be re-run.

#### &sect; Special Catch Rate Effects

The following special effects _are included in catch rate calculations_ for both CRE and Best Setup

- Final Catch Rate Modifiers

  |            Name             |                                                                                                       Modifier                                                                                                       |
  | :-------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
  | Anniversary Weapon variants |                                                                             Up to 10% increased catch rate, i.e. `CR + (0.1 * (1 - CR))`                                                                             |
  |        Bounty Hunter        |                                                                                 100% catch rate with Sheriff's Badge Charm equipped                                                                                  |
  |          Fort Rox           | &middot; Up to 50% increased catch rate when upgrades are level 2 or 3<br>&middot; 100% catch rate on Nightmancer and Nightfire when upgrades are level 3<br>&middot; TODO: Mage Tower effect is not yet implemented |
  |    Ultimate Anchor Charm    |                                                                                    100% catch rate while on a dive in Sunken City                                                                                    |
  |       Ultimate Charm        |                                                                                              100% catch rate everywhere                                                                                              |
  |  Zugzwang's Ultimate Move   |                                                               Up to 50% increased catch rate in Seasonal Garden & Zugzwang's Tower when amplifier > 0%                                                               |
  |     Zurreal the Eternal     |                                                                                    0% catch rate without Zurreal's Folly equipped                                                                                    |

- Special Bonuses & Effects

  |            Name            |                                                                                                      Effect                                                                                                      |
  | :------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
  |       Champion Charm       |                                                                       +2/3/4 Luck when equipped with Bronze/Silver/Golden Tournament Base                                                                        |
  | Dragonbane Charm variants  |                                                                                  +300/600/900/1200% Power Bonus on Dragon-type mice                                                                                   |
  |        EMP400 Charm        |                                                                                      +25000 Power with Fusion Fondue armed                                                                                       |
  |  Golem Guardian variants   |                                      &middot; +6 Luck when equipped with Glowing Golem Guardian Base<br>&middot; Charge levels are set in CRE and carry over to Best Setup                                       |
  |    Physical Brace Base     |                                                                              +25% Power Bonus when equipped with a Physical weapon                                                                               |
  |  Polluted Charm variants   |                                                                   +4/6/10/15 Luck when equipped with Polluted Base or Refined Pollutinum Base                                                                    |
  | Soiled & Living Grove Base | &middot; +100 Power, +3% Power Bonus, +5% Attraction Bonus, +4 Luck when equipped with Growth Charm<br>&middot; +300 Power, +8% Power Bonus, +20% Attraction Bonus, +9 Luck when equipped with Wild Growth Charm |
  |  Snowball Charm variants   |                                                                               +20% Power Bonus when equipped with Festive weapons                                                                                |
  |      Spellbook Charm       |                                                                         +500 Power and +8% Power Bonus when equipped with Spellbook Base                                                                         |
  |   Spooky Charm variants    |                                                                              +20% Power Bonus when equipped with Halloween weapons                                                                               |

- Location Specific Effects

  |          Location          |                                                                                                                                                           Effect                                                                                                                                                           |
  | :------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
  |       Claw Shot City       |                                                                               Claw Shot Base gives +1000 Power when equipped with a S.L.A.C. variant, and +2500 Power when equipped with both a S.L.A.C. variant and a Cactus Charm variant                                                                                |
  |       Fiery Warpath        |                &middot; Flamebane Charm gives +150 Power<br>&middot; Warden Slayer Trap gives +2500 Power and +2500% Power Bonus when equipped in Wave 4 or Portal<br>&middot; Super Warpath Charms give +50 Power on corresponding groups<br>&middot; TODO: Warpath Thrasher effect is not yet implemented                |
  |          Fort Rox          |                                                                                                                    Nightlight Charm gives +1/3/5/7/9/12/15% Power Bonus depending on the stage of night                                                                                                                    |
  |  Gnawnian Express Station  |                                                                                           Supply Grabber, Bandit Deflector, and Engine Doubler give +1500 Power in Supply Depot, Raider River, and Daredevil Canyon respectively                                                                                           |
  | Iceberg & Slushy Shoreline | &middot; Steam Laser Mk. I gives +1750 Power and +3 Luck<br>&middot; Steam Laser Mk. II gives +1250 Power and +2 Luck<br>&middot; Steam Laser Mk. III gives +1500 Power and +2 Luck<br>&middot; Deep Freeze Base and Ultimate Iceberg Base give +665 Power and +9 Luck in Icewing's Lair, Hidden Depths, and The Deep Lair |
  |      Jungle of Dread       |                                                                                                              &middot; Dreaded Totem Trap gives +8500 Power<br>&middot; Dreaded Charm gives +300% Power Bonus                                                                                                               |
  |        Sand Crypts         |                                                                                                               Salt level applies a logarithmic function to decrease mouse power for King Grub & King Scarab                                                                                                                |
  |      Seasonal Garden       |        &middot; Seasonal Base gives +18% Power Bonus<br>&middot; Soul Harvester and Terrifying Spider Trap give +10 Luck during Fall<br>&middot; Chesla's Revenge has a 12.5% chance to proc an additional charge<br>&middot; TODO: Sandcastle Shard's effect is not implemented due to current/max amp requirement        |
  |        Sunken City         |                                                                                                                                    Depth Charge Base gives +1000 Power while on a dive                                                                                                                                     |
  |       Town of Digby        |                                                                               &middot; +30% Power Bonus if Limelight cheese and Mining Charm are equipped<br>&middot; TODO: Only against Digby Dirt Dwellers plus increased BBB/I-BB chance?                                                                               |
  |        Toxic Spill         |                                                                        &middot; Washboard Base gives +5% Power Bonus and +5 Luck<br>&middot; Soap Charm gives +5000 Power and +10 Luck<br>&middot; Super Soap Charm gives +8000 Power and +12 Luck                                                                         |
  |        Tribal Isles        |                                                                                &middot; Tiki Base gives +6 Luck<br>&middot; Tribe-specific power charms (Derr/Nerg/Elub) give +600 Power and +5% Power Bonus in their respective locations                                                                                 |
  |     Whisker Woods Rift     |                                                                                                                             Taunting Charm only applies Rift Set bonuses on minibosses and MBW                                                                                                                             |
  |      Zugzwang's Tower      |               &middot; Obvious Ambush and Blackstone Pass give +1800 Power on corresponding side, -2400 Power on opposite side<br>&middot; Pawn Pinchers give +10920 Power on corresponding Pawn, -60 Power and -5 Luck on opposite Pawn<br>&middot; Rook Crumble Charm gives +300% Power Bonus on Rook mice               |

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :earth_americas: [Map Solver and Mouse Finder](https://tsitu.github.io/MH-Tools/map.html)

> Calculates ideal specific locations to hunt for a given list of mice. Based on Chad's and <a href="http://olf.github.io/mhmapsolver/" target="_blank" rel="noopener">Olaf's</a> solvers.

**Bookmarklet:** Run the `Map` bookmarklet from the "Active Map - Mice" section of the UI.

<p>Copy and paste mice from maps, or type names leaving a line break between each. Press <kbd>Enter</kbd> to autocomplete and <kbd>Tab</kbd> to cycle through autocomplete suggestions. Additionally, autocomplete can be toggled on/off (requires a page refresh to take effect).</p>

"Fused" cheeses (e.g. Gouda/Brie/Swiss) will often show up in results. This indicates that attraction proportions from the underlined cheese has been extrapolated due to low sample sizes.

| Type of Attraction Rate | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| Raw                     | Shown for individual mice                                               |
| Total                   | Sum for a specific location, sublocation, cheese, and charm             |
| Weighted                | Same as Total AR, but with baseline cheese attraction rates factored in |

#### &sect; Cheese Filters

Cheese filters allow you to easily hide certain cheeses from the Best Locations table depending on your hunting situation. For example, frugal hunters may want to tick the `Magic Essence` checkbox to hide costly SB+ derived cheeses.

| Filter Category        | Cheeses                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Magic Essence          | SB+, Moon, Maki, Maki String, Magical String, Magical Rancid Radioactive Blue                                                  |
| Common                 | Brie, Brie String, Cheddar, Gouda, Marble, Marble String, Swiss, Swiss String                                                  |
| Marketplace            | Crescent, Magical String, Maki, Maki String, Moon, Rancid Radioactive Blue, SB+                                                |
| Shoppe                 | All four Camemberts, Fishy Fromage, Grilled, Sunrise (separate niche from common?)                                             |
| Crafted                | Resonator, Vanilla Stilton, Vengeful Vanilla Stilton, White Cheddar... (many more TBD)                                         |
| Event (_not included_) | Cupcake Colby, Dumpling, Extra Sweet Cupcake Colby, Marshmallow Monterey, Nian Gao'da, Rewind Raclette, Rockforth, Runny, etc. |

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :trophy: [Best Setup](https://tsitu.github.io/MH-Tools/setup.html)

> Calculates the best trap setup to use for a particular location, sublocation, cheese and/or charm.

**Bookmarklet(s):** Run the `Setup: Load Items` bookmarklet on the Camp page and your items will be automatically loaded, ticked, and cached on the Best Setup page. Run the `Setup: Fields` bookmarklet on basically any page on the MH website and your hunting setup will be automatically loaded into the tool.

To check whether all of your items have properly loaded, you may want to open up the [JavaScript console](https://webmasters.stackexchange.com/a/77337) in your browser, both on your MH Camp page and on the Best Setup page. You will then want to compare `Number of bases/weapons/charms: # detected` values from the former with `Bases/Weapons/Charms: # owned / # total` from the latter.

'Number of rows to display' is set at 50 by default, with options for 100, 500, 1000, or All rows. When running calculations with close to the maximum number of weapons and bases selected, **keep the number of rows low** if possible to avoid excessive CPU/RAM usage.

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :chart_with_upwards_trend: [Marketplace Analyzer](https://tsitu.github.io/MH-Tools/analyzer.html)

> Displays all of your marketplace transactions along with some useful aggregations.

**Bookmarklet:** Run the `Analyzer` bookmarklet, and click 'Send to Tool' once you have gathered enough transactions using 'Fetch'.

|    Type     | Description                                                      |
| :---------: | ---------------------------------------------------------------- |
| Transaction | Gold spent or received in a single trade                         |
|   Amount    | Total spent or received for an item or action (includes tariffs) |
|    Price    | Amount ÷ Quantity (includes tariffs)                             |
| Unit Price  | Gold spent on a single unit in a transaction (excludes tariffs)  |
|   Tariffs   | 10% of 'Buy' actions (`Amount - (Math.floor(Amount ÷ 1.1))`)     |

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :crown: [Crown Solver](https://tsitu.github.io/MH-Tools/crown.html)

> Calculates the best locations to achieve crowns of given mouse breeds based on number of catches.

**Bookmarklet:** Run the `Crown` bookmarklet to automatically populate the a list of mice that are closest to a crown

This spin-off of the Map Solver inspired by [vsong](https://github.com/vsong) factors in the difference between 10/100/500/1000/2500/5000 and the number of catches you currently have for a breed. All else being equal, a mouse that's closer to any given crown is weighted more heavily than one that's further away (e.g. a mouse with 99 catches vs. a mouse with 3).

| Type of Crown Progress | Description                                                                             |
| :--------------------: | --------------------------------------------------------------------------------------- |
|          Raw           | Shown for individual mice, factors in attraction rate and catches remaining until crown |
|         Total          | Sum for a specific location, sublocation, cheese, and charm                             |
|        Weighted        | Same as Total CP, but with baseline cheese attraction rates factored in                 |

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :hammer: [Crafting Wizard](https://tsitu.github.io/MH-Tools/crafting.html)

> Calculates craftable quantities and missing materials for recipes based on your inventory data.

**Bookmarklet:** Run the `Crafting` bookmarklet from Inventory -> Crafting -> [Crafting Table](https://www.mousehuntgame.com/inventory.php?tab=crafting&subtab=crafting_table). The `Recipes` and `Inventory` tables should be automatically populated, with the former being sortable and filterable. Crafting materials are saved in localStorage.

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :mag: [Trap Setup Powers](https://tsitu.github.io/MH-Tools/powers.html)

> Shows the weapons, bases, and charms that match a specified power range and type. Synergizes with the 'Best Setup: Load Items' bookmarklet to use only items you own.

To understand why this tool exists, we need to take a quick crash course on MouseHunt's game mechanics.

The best formula we have for calculating catch rate and minimum luck was [derived in 2011](https://mhanalysis.wordpress.com/2011/01/05/mousehunt-catch-rates-3-0/). As you can see, it takes into account several variables: power type effectiveness, trap power, trap luck, and mouse power. Total trap power and luck are easy to calculate, since item and effect stats are present in-game. However, neither mouse powers nor exact type effectiveness values are as easily obtained.

Given the unknowns, you may wonder how folks have determined these hidden mouse power numbers with such precision in the past. Kristian G wrote an [essential guide](https://www.mousehuntgame.com/forum/showthread.php?106764-how-do-people-find-mouse-power-values&p=1166955&viewfull=1#post1166955) on this process a few years back - please read it. The TL;DR gist is that we equip different weapons, bases, and charms to attain a specific total trap power. Then, we look at the description page of the mouse we're targeting and note its 'Difficulty' rating. Depending on what that label says and what boundary is targeted (i.e. Challenging/Difficult, Easy/Moderate), we can deduce upper/lower bounds for the mouse's power. Kristian's post goes into much more detail and provides several examples.

With that explained, you may be wondering whether there are tools out there that make this process less tedious. No matter what, we'll have to manually tweak trap setups in-game and refresh mouse pages to glean information from their 'Difficulty' ratings. But, it would be helpful if we could specify a range of desired total trap powers, and have a tool spit out corresponding trap setups. From what I can gather, HornTracker's [Trap Combinations](http://horntracker.com/trapsetups.php?minpower=6466&maxpower=7075&ptype=4&tabs=1) was the best tool for this purpose, along with tehhowch's GetPower sheet on [MH Reference](https://drive.google.com/file/d/0B38esHSXteUJZTRhMDNjMzItMmU4My00YWU0LThiODctMDk0OWRjOGFkMDE4/view?hl=en). Unfortunately, both tools haven't been updated in some time. Thus, they don't include the latest items and effects.

This is where 'Trap Setup Powers' comes in. With this new tool, you can: [1] hone in on one power type at a time, or include all 10 at once (be aware that a large number of power types ticked with a narrow power range will slow down processing by a significant amount), [2] specify a variety of power-altering parameters, and [3] choose whether to use only owned items or all items. In order to take advantage of showing only items you own, run the 'Best Setup: Load Items' bookmarklet before returning to the Powers tool.

#### &sect; Worksheet

This supplementary tool provides a mostly automated way to derive many mouse power values at once. Using the 'Powers: Worksheet' bookmarklet on [mousehuntgame.com](https://www.mousehuntgame.com/), select a mouse group/subgroup to target with your current trap setup and Rift Set tier. Then, hit 'Go' and a new tab will open with 3 tables: [1] Mouse Powers - displays sortable columns for mouse group/subgroup/name, and all 10 power type effectiveness values along with their respective min/max boundaries (calculated using your total trap power and mouse difficulty ratings), [2] Mouse Details - displays mouse group/subgroup/name as well as gold/points and links to specific Adversaries pages, and [3] Trap History - displays a reverse chronological history of the power types and precise/displayed powers captured from the bookmarklet.

There are several options to refine the 'Mouse Powers' table view. You can tick the checkboxes for the power types you'd like to be shown, select the mouse group/subgroup/name you'd like to filter down to, and then click 'Reload Table' to apply your preferences. 'Save Preferences' stores your settings in localStorage for future sessions. 'Reset Data' clears all worksheet data. It may be prudent to reset data if performance starts to take a noticeable hit, or if some unexpected data corruption occurs.

The recommended way to use this tool is to focus on a couple groups of mice and narrow down each mouse's min/max power ranges using a variety of setups generated by the main Powers tool. Once you're satisfied, copy/paste the entire 'Mouse Powers' table into Google Sheets (it should copy over very cleanly!) for further manual refinement, allowing you to reset the worksheet data.

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :bookmark_tabs: [CRE Tabs](https://tsitu.github.io/MH-Tools/tabs.html)

> Provides a convenient way to spin up multiple independent instances of the CRE tool. Each instance is located in its own `<iframe>` and setups are easily copy-pasted between tabs. Great for quickly comparing setups that are mostly identical.

|     Keyboard Shortcut     |                   Description                   |
| :-----------------------: | :---------------------------------------------: |
|    <kbd>Alt + C</kbd>     |            Copy setup in current tab            |
|    <kbd>Alt + V</kbd>     |           Paste setup to current tab            |
| <kbd>←</kbd> <kbd>→</kbd> | Navigate between tabs (when one is highlighted) |

<div align="right"><a href="#book-table-of-contents">Top</a></div>

## Developers

### :construction_worker: Build and Run

1. Download [Node.js](https://nodejs.org/) for your operating system

1. Run `npm install` to download project dependencies

1. Build required wisdom/population JSON and minified JS files locally using `npm run build`

1. Serve the tools for local testing using `npm run serve`, which spins up an instance of [http-server](https://www.npmjs.com/package/http-server) on port 8000

### :clipboard: Populations

To update population data, download a copy of the most recent MHCT database dump from [Keybase](https://keybase.pub/devjacksmith/mh_backups/nightly/) (refresh the page if it says 'Not found'). Then, import the data into your SQL client of choice (takes around an hour on MySQL Workbench 8.0 with MySQL Server 5.7.24 on Windows 10). Alternatively, consider downloading and running the [Docker](https://hub.docker.com/r/tsitu/mhct-db-docker) images. Finally, use commands such as `npm run pop:queso` (full list in [package.json](https://github.com/tsitu/MH-Tools/blob/master/package.json)) to write updated populations to CSV files in `data/pop-csv`, or use `npm run pop` to fetch them all simultaneously.

If you would like to merge new data into the master branch, feel free to open a pull request - Travis CI will build it automatically and run the `build/process-sample-size.js` script, which generates sample size score deltas ([example](https://travis-ci.com/tsitu/MH-Tools/builds/91738912#L528)). We use this to verify that data is trending towards improvement.

### :barber: Coding Style

We use ESLint ([`config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base)) configured with Prettier ([`prettier/recommended`](https://prettier.io/docs/en/eslint.html#why-not-both)) to enforce consistent coding conventions.

_This is still a work in progress, along with converting the codebase to align with modern ES2015+ best practices._

<div align="right"><a href="#book-table-of-contents">Top</a></div>

## Miscellaneous

### :arrow_down: Useful Links

- MH Data Repository - MP/E, Gold/Points, Groups ([spreadsheet](https://docs.google.com/spreadsheets/d/1l6P9Cp2HceKSXgJKzcOy26lK_5BEAsAO9HhoiSYviTY/edit?usp=sharing))
- Mouse Wisdom Values ([spreadsheet](https://docs.google.com/spreadsheets/d/1nzD6iiHauMMwD2eHBuAyRziYJtCVnNwSYzCKbBnrRgc/edit?usp=sharing))
- New Area Mouse Powers + Effectiveness Values ([spreadsheet](https://docs.google.com/spreadsheets/d/1pnS4UVFMUndjX2H2s6hfyf5flMcppZyhZrn8EUH23S8/edit?usp=sharing))
- Marketplace Analyzer ([forum thread](https://www.mousehuntgame.com/forum/showthread.php?126255-Marketplace-Analyzer&goto=newpost))
- Useful Userscripts ([Reddit wiki page](https://www.reddit.com/r/mousehunt/wiki/user-scripts))
- Discord (join the [community server](https://discordapp.com/invite/Ya9zEdk))

### :heart_decoration: Thanks to...

- Our contributors :thumbsup:
- haoala for the [original tools](https://dl.dropboxusercontent.com/u/14589881/index.html) (no longer maintained or hosted)
- [Start Bootstrap](https://github.com/davidtmiller) for the index.html theme

<div align="right"><a href="#book-table-of-contents">Top</a></div>

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftsitu%2FMH-Tools.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftsitu%2FMH-Tools?ref=badge_large)
