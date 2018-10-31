# :mouse: [MH Tools](https://tsitu.github.io/MH-Tools/) &middot; [![Build Status](https://travis-ci.org/tsitu/MH-Tools.svg?branch=master)](https://travis-ci.org/tsitu/MH-Tools) [![](https://data.jsdelivr.com/v1/package/gh/tsitu/MH-Tools/badge)](https://www.jsdelivr.com/package/gh/tsitu/MH-Tools)

Suite of JavaScript tools for the browser game [MouseHunt](https://www.mousehuntgame.com/).

Ongoing forum discussion thread [here](https://www.mousehuntgame.com/forum/showthread.php?132397-MouseHunt-Tools-by-tsitu&goto=newpost).

Feel free to post your questions, comments, or concerns there (or [here](https://github.com/tsitu/MH-Tools/issues) on GitHub).

## :book: Table of Contents

- [Instructions](#instructions)
  - [General Tips](#thought_balloon-general-tips)
  - [Bookmarklets](#bookmark-bookmarklets)
    - [Browser Installation Tips](#Browser-Tips)
    - [Chrome](#Chrome)
    - [Firefox](#Firefox)
    - [Edge / IE](#Edge)
    - [Safari](#Safari)
  - [Catch Rate Estimator](#straight_ruler-catch-rate-estimator)
  - [Map Solver and Mouse Finder](#earth_americas-map-solver-and-mouse-finder)
  - [Best Setup](#trophy-best-setup)
  - [Marketplace Analyzer](#chart_with_upwards_trend-marketplace-analyzer)
  - [Crown Solver](#crown-crown-solver)
  - [Crafting Wizard](#hammer-crafting-wizard)
  - [Trap Setup Powers](#mag-trap-setup-powers)
  - [CRE Tabs](#bookmark_tabs-cre-tabs)
- [Developers](#developers)
  - [Build and Run](#construction_worker-build-and-run)
  - [Coding Style](#barber-coding-style)
- [Miscellaneous](#miscellaneous)
  - [Useful Links](#arrow_down-useful-links)
  - [Thanks](#heart_decoration-thanks-to)

## Instructions

### :thought_balloon: General Tips

Several tools make use of mottie's [tablesorter](https://mottie.github.io/tablesorter/docs/#Introduction) plugin, which includes useful additional features such as multi-column sorting with <kbd>Shift</kbd> or special characters for [filtering](https://mottie.github.io/tablesorter/docs/example-widget-filter.html).

We recommend installing Jack's extension ([Chrome](https://chrome.google.com/webstore/detail/jacks-mousehunt-helper/ghfmjkamilolkalibpmokjigalmncfek), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/jacks-mousehunt-helper/)) if you have not already. It records valuable information from **active hunts** only. Most of the data in support of recent updates has been sourced from Jack's [publicly accessible database backups](https://keybase.pub/devjacksmith/mh_backups/). With your help, we will be able to implement new areas and features sooner with higher accuracy! :rocket:

*Note:* Newer tools like 'Crafting Wizard' and 'Trap Setup Powers' may be incompatible with outdated or feature-constrained browsers such as Internet Explorer, Opera Mini, Samsung Internet, and Blackberry Browser.

### :bookmark: Bookmarklets

Bookmarklets are pieces of JavaScript code that are saved as a bookmark in the user's browser, enabling them to interact with webpages on the fly. We provide 8 different bookmarklets (CRE, Map, Setup: Load Items, Setup: Fields, Analyzer, Silver Crown, Crafting and the all-in-one Loader), each located on their corresponding tool's page.

Using the Auto-Loader is recommended because it automatically grabs the latest version of each bookmarklet without having to manually update.

You **must** be on the official [mousehuntgame.com](https://www.mousehuntgame.com/) website for these bookmarklets to work. This is because the Facebook version loads MouseHunt in an `<iframe>` which (along with CORS restrictions) prevents access to DOM elements as well as the custom `user` JavaScript object. You must also be using the FreshCoat Layout.

*Note for* :iphone:*:* The process of using a bookmarklet in mobile browsers can vary. For example, in Chrome for Android, you must type the first few characters of the bookmarklet's name in the address bar and click it from there for the code to take effect.

Bookmarklet | Functionality
:--: | --
CRE | Automatically fills in the Catch Rate Estimator with your location, sublocation, cheese, charm, weapon, base, and more
Setup: Load Items | Automatically loads your owned weapons, bases, and charms into Best Setup
Setup: Fields | Automatically fills in Best Setup with your location, sublocation, cheese, charm, and more
Analyzer | Gradually (over multiple redirects) loads in your entire Marketplace transaction history via URL
Map | Automatically fills in the Map Solver's mouse name `textarea` with all of the remaining uncaught mice on your Active Map
Crown | Automatically fills in the Crown Solver's `textarea` with the 50 Bronze Crown mice on your 'King's Crowns' page that are closest to reaching Silver status (100 catches)<br><br>*Note:* Favorited Bronze mice will be included regardless of catches
Crafting | Automatically loads your 'Crafting Table' materials into Crafting Wizard
Loader | Generates a pop-up dialog that gives you access to the latest versions of each bookmarklet

<div align="right"><a href="#book-table-of-contents">Top</a></div>

<p align="center">
  <br><b id="Browser-Tips">Browser Installation Tips</b><br>
  Drag the blue bookmarklet link to your browser's bookmarks bar. If that doesn't work, try the following manual instructions. These concepts apply to other browsers (including mobile), but specific steps may vary.<br><br>
  <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/archive/chrome_12-48/chrome_12-48_32x32.png" alt="Chrome" id="Chrome"><br>
  <i>Chrome</i><br>
</p>

1. Bookmark an arbitrary page and name it something memorable, like 'CRE' or 'Auto-Loader'
1. Copy the bookmarklet code by right-clicking the link and selecting `Copy link address`
1. Right-click on your newly created bookmark and select `Edit...`
1. Paste the bookmarklet code into the `URL` field and hit `Save`

<p align="center">
  <br><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/archive/firefox_23-56/firefox_23-56_32x32.png" alt="Firefox" id="Firefox"><br>
  <i>Firefox</i><br>
</p>

1. Right-click on the bookmarklet link, select `Bookmark This Link`, and name it accordingly.

<p align="center">
  <br><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/edge/edge_32x32.png" alt="Edge" id="Edge"> <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/archive/internet-explorer_9-11/internet-explorer_9-11_32x32.png" alt="Edge" id="Edge"><br>
  <i>Edge / IE</i><br>
</p>

1. Edge doesn't seem to natively support saving a bookmark directly from a link or editing a bookmark's URL. However, there is a third-party application called [EdgeManage](http://www.emmet-gray.com/Articles/EdgeManage.html) that purports to add a lot of missing features for managing Favorites - please use at your own discretion.

1. Internet Explorer 11 allows you to drag bookmarklets directly to your favorites bar as well as right-click and `Add to favorites...`. However, it doesn't seem to support certain JavaScript features that enable our bookmarklets to run properly.

<p align="center">
  <br><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/archive/safari_1-7/safari_1-7_32x32.png" alt="Safari" id="Safari"><br>
  <i>Safari</i><br>
</p>

1. Bookmark an arbitrary page and give it a memorable name.
1. Right-click on the bookmarklet link and select `Copy Link`
1. Right-click on the newly created bookmark, select `Edit Address`, paste into the text box, then click `Done`

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :straight_ruler: [Catch Rate Estimator](https://tsitu.github.io/MH-Tools/cre.html)

> Calculates catch rate estimates along with points, gold, minimum luck and more.

**Bookmarklet:** Run the `CRE` bookmarklet from basically any page on the MH website.

Descriptor | Per | Sum or Average (bottom row)
:--: | :--: | :--:
Attraction Rate | Mouse | Sum for this setup
Catch Rate | Mouse | Average for this setup
Catches / 100 hunts (AR * CR)| Mouse | Sum per 100 hunts
Gold | Catch | Average per hunt
Points | Catch | Average per hunt
Tourney Points | Catch | Average per hunt
Min Luck | Mouse | Highest for this particular setup
Rank | Catch | Per hunt
*Loot (coming soon)* | *Catch* | *Per hunt*

<br>

**Sample Size Score:** An indicator of the quality and accuracy of a specific setup's data based on its sample size and the number of mice in its attraction pool. Setups are separated by locations, sublocations, cheeses and occasionally charms (if they have attraction-altering effects i.e. Warpath Warrior Charm in Waves 1-3 of Fiery Warpath). If you have a charm selected that doesn't affect a setup's mouse population pool, its corresponding "No Charm" data is displayed, since they are equivalent.

Previously, the tool displayed a flat sample size number with a rating assigned to it, which looked like `Sample Size: 300 (bad)` or `Sample Size: 100000 (excellent)`. This format was misleading because it didn't encode important contextual information. The current scoring scheme takes into account factors such as number of mice in a particular setup, 95% confidence levels, and relative margins of error. It combines and normalizes these factors into a single number, capped at 100.

*Note:* Certain setups may have low scores or even no sample size data attached to them. This could be because: (1) the data was extracted from HornTracker before we decided to start keeping track of sample sizes, (2) there aren't enough recorded hunts for that setup in Jack's database, (3) our population fetching scripts need to be re-run.

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :earth_americas: [Map Solver and Mouse Finder](https://tsitu.github.io/MH-Tools/map.html)

> Calculates ideal specific locations to hunt for a given list of mice. Based on Chad's and <a href="http://olf.github.io/mhmapsolver/" target="_blank" rel="noopener">Olaf's</a> solvers.

**Bookmarklet:** Run the `Map` bookmarklet from the "Active Map - Mice" section of the UI.

<p>Copy and paste mice from maps, or type names leaving a line break between each. Press <kbd>Enter</kbd> to autocomplete and <kbd>Tab</kbd> to cycle through autocomplete suggestions. Additionally, autocomplete can be toggled on/off (requires a page refresh to take effect).</p>

"Fused" cheeses (e.g. Gouda/Brie/Swiss) will often show up in results. This indicates that attraction proportions from the underlined cheese has been extrapolated due to low sample sizes.

Type of Attraction Rate | Description
-- | --
Raw | Shown for individual mice
Total | Sum for a specific location, sublocation, cheese, and charm
Weighted | Same as Total AR, but with baseline cheese attraction rates factored in

**Cheese Filters:** Allows you to easily hide certain cheeses from the Best Locations table depending on your hunting situation. For example, frugal hunters may want to tick the `Magic Essence` checkbox to hide costly SB+ derived cheeses.

You can `Apply` filters to the first column, `Reset` filters on the table, or `Clear` all of your ticks.

Filter Category | Cheeses
-- | --
Magic Essence | SB+, Moon, Maki, Maki String, Magical String (Empowered SB+ and Magical Rancid Radioactive Blue currently not in population data)
Common | Brie, Brie String, Cheddar, Gouda, Marble, Marble String, Swiss, Swiss String
Marketplace | Crescent, Magical String, Maki, Maki String, Moon, Rancid Radioactive Blue, SB+
Shoppe | All four Camemberts, Fishy Fromage, Grilled, Sunrise (separate niche from common)
Crafted | Resonator, Vanilla Stilton, Vengeful Vanilla Stilton, White Cheddar... (many more)
Potions | TODO (very many)
Event _(not included)_ | Cupcake Colby, Dumpling, Extra Sweet Cupcake Colby, Marshmallow Monterey, Nian Gao'da, Rewind Raclette, Rockforth, Runny

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

**Bookmarklet:** Run the `Analyzer` bookmarklet from Marketplace -> My History, on the tab you would like data to start from (default = 1).

Type | Description
:--: | --
Transaction | Gold spent or received in a single trade
Amount | Total spent or received for a single item and action, including tariffs
Price | Amount ÷ Quantity
Unit Price | Gold spent on a single unit in a transaction
Tariffs | 10% calculated on total amount  = Amount ÷ 1.1 (slightly inaccurate)

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :crown: [Crown Solver](https://tsitu.github.io/MH-Tools/crown.html)

> Calculates the best locations to achieve 10/100/500 catches of mouse breeds (Bronze and Gold coming soon).

**Bookmarklet:** Run the `Crown` bookmarklet from Hunter's Profile -> King's Crowns to automatically populate the 50 Bronze Crown mice that are closest to reaching Silver status (100 catches)

This spin-off of the Map Solver by [vsong](https://github.com/vsong) factors in the difference between 100 and the number of catches you currently have for a breed. All else being equal, a mouse with 99 catches is weighted more heavily than one with 80 catches.

Type of Crown Progress | Description
:--: | --
Raw | Shown for individual mice, factors in attraction rate and catches remaining until 100
Total | Sum for a specific location, sublocation, cheese, and charm
Weighted | Same as Total CP, but with baseline cheese attraction rates factored in

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :hammer: [Crafting Wizard](https://tsitu.github.io/MH-Tools/crafting.html)
> Calculates craftable quantities and missing materials for recipes based on your inventory data.

**Bookmarklet:** Run the `Crafting` bookmarklet from Inventory -> Crafting -> [Crafting Table](https://www.mousehuntgame.com/inventory.php?tab=crafting&subtab=crafting_table). The `Recipes` and `Inventory` tables should be automatically populated, with the former being sortable and filterable. Crafting materials are cached in localStorage.

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :mag: [Trap Setup Powers](https://tsitu.github.io/MH-Tools/powers.html)
> Shows the weapons, bases, and charms that match a specified power range and type. Synergizes with the 'Best Setup: Load Items' bookmarklet to use only items you own.

To understand why this tool exists, we need to take a crash course (or a peek behind the curtain if you will) on MouseHunt's game mechanics.

The best formula we have for calculating catch rate and minimum luck was [derived in 2011](https://mhanalysis.wordpress.com/2011/01/05/mousehunt-catch-rates-3-0/). As you can see, it takes into account several variables: trap type effectiveness, trap power, trap luck, and mouse power. It turns out that total trap power and luck are easy to calculate, since item and effect stats are present in-game. However, neither mouse powers nor exact type effectiveness values are as easily obtained.

Given the unknowns, you may wonder how folks have determined these hidden mouse power numbers with such precision in the past. Kristian G wrote an [essential guide](https://www.mousehuntgame.com/forum/showthread.php?106764-how-do-people-find-mouse-power-values&p=1166955&viewfull=1#post1166955) on this trial and error process a few years back - please read it. The TL;DR gist is that we equip different weapons, bases, and charms to attain a specific total trap power. Then, we look at the description page of the mouse we're targeting and note its 'Difficulty' rating. Depending on what that label says and what boundary is targeted (i.e. Challenging/Difficult, Easy/Moderate), we can deduce upper/lower bounds for the mouse's power. Kristian's post goes into much more detail and provides several examples.

With that explained, you may also wonder whether there are tools out there that make this process less tedious. No matter what, we have to manually tweak trap setups in-game and refresh mouse pages to glean information from their 'Difficulty' ratings. But, it would be helpful if we could at least specify a range of total trap powers, and have a tool spit out setups that match. From what I can gather, HornTracker's [Trap Combinations](http://horntracker.com/trapsetups.php?minpower=6466&maxpower=7075&ptype=4&tabs=1) was the most popular tool for this purpose, along with tehhowch's GetPower sheet on [MH Reference](https://drive.google.com/file/d/0B38esHSXteUJZTRhMDNjMzItMmU4My00YWU0LThiODctMDk0OWRjOGFkMDE4/view?hl=en). Unfortunately, both tools have not been updated in some time. As such, they don't include the latest items or effects.

This is where I hope my new 'Trap Setup Powers' tool comes in. As of 22 Oct 2018, you can specify a variety of power-altering parameters as well as whether to use owned or all items. In order to take advantage of using owned items, run the 'Best Setup: Load Items' bookmarklet before returning to the Powers tool.

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :bookmark_tabs: [CRE Tabs](https://tsitu.github.io/MH-Tools/tabs.html)

> Provides a convenient way to spin up multiple independent instances of the CRE tool. Each instance is located in its own `<iframe>` and setups are easily copy-pasted between tabs. Great for quickly comparing setups that are mostly identical.

Keyboard Shortcut | Description
:--: | :--:
<kbd>Alt + C</kbd> | Copy setup in current tab
<kbd>Alt + V</kbd> | Paste setup to current tab
<kbd>←</kbd> <kbd>→</kbd> | Navigate between tabs (when one is highlighted)

<div align="right"><a href="#book-table-of-contents">Top</a></div>

## Developers

### :construction_worker: Build and Run

1. Download [Node.js](https://nodejs.org/) for your operating system

1. Run `npm install` to download project dependencies

1. Build required wisdom/population JSON and minified JS files locally using `npm run build`

1. Serve the tools for local testing using `npm run serve`, which spins up an instance of [http-server](https://www.npmjs.com/package/http-server) on port 8000

### :barber: Coding Style

We use ESLint ([`config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base)) configured with Prettier ([`prettier/recommended`](https://prettier.io/docs/en/eslint.html#why-not-both)) to enforce consistent coding conventions.

*This is still a work in progress, along with converting the codebase to align with modern ES2015+ best practices.*

<div align="right"><a href="#book-table-of-contents">Top</a></div>

## Miscellaneous

### :arrow_down: Useful Links

1. Marketplace Analyzer ([forum thread](https://www.mousehuntgame.com/forum/showthread.php?126255-Marketplace-Analyzer&goto=newpost))
1. Population Data ([CSV](https://github.com/tsitu/MH-Tools/blob/master/data/populations.csv) | [source](https://docs.google.com/spreadsheets/d/1Y_urUwbp7XpbL9vRV4w4uoexkIM_DbuAc5Fb1JL_u20/edit?usp=sharing))
1. Mouse Power Values ([spreadsheet](https://docs.google.com/spreadsheets/d/1cGu0eG0Fgwf-OWFAfed_tVJC0GQh-j6utxiSDdWRFZE/))
1. Mouse Wisdom Values ([spreadsheet](https://docs.google.com/spreadsheets/d/1nzD6iiHauMMwD2eHBuAyRziYJtCVnNwSYzCKbBnrRgc/edit?usp=sharing))
1. New Area Mouse Powers + Effectiveness ([spreadsheet](https://docs.google.com/spreadsheets/d/1pnS4UVFMUndjX2H2s6hfyf5flMcppZyhZrn8EUH23S8/edit?usp=sharing))
1. Discord (join the community's [server](https://discordapp.com/invite/Ya9zEdk)!)

### :heart_decoration: Thanks to...

- Our contributors :thumbsup:
- haoala for the [original tools](https://dl.dropboxusercontent.com/u/14589881/index.html) (no longer maintained or hosted)
- [Start Bootstrap](https://github.com/davidtmiller) for the index.html theme

<div align="right"><a href="#book-table-of-contents">Top</a></div>
