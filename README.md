# :mouse: [MH Tools](https://tsitu.github.io/MH-Tools/) &middot; [![Build Status](https://travis-ci.org/tsitu/MH-Tools.svg?branch=master)](https://travis-ci.org/tsitu/MH-Tools)

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
  - [CRE Tabbed Demo](#bookmark_tabs-cre-tabbed-demo)
- [Developers](#developers)
  - [Build](#construction_worker-build)
  - [Coding Style](#barber-coding-style)
- [Miscellaneous](#miscellaneous)
  - [Useful Links](#arrow_down-useful-links)
  - [Thanks](#heart_decoration-thanks-to)

## Instructions

### :thought_balloon: General Tips

Several tools make use of mottie's [tablesorter](https://mottie.github.io/tablesorter/docs/#Introduction) plugin, which includes useful additional features such as multi-column sorting with <kbd>Shift</kbd> or special characters for [filtering](https://mottie.github.io/tablesorter/docs/example-widget-filter.html).

We recommend installing Jack's extension ([Chrome](https://chrome.google.com/webstore/detail/jacks-mousehunt-helper/ghfmjkamilolkalibpmokjigalmncfek), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/jacks-mousehunt-helper/)) if you have not already. It records valuable information from **active hunts** only. Most of the data for recent releases and features has been a direct result of Jack publicly sharing his database. With your help, we will be able to implement new areas sooner with higher levels of accuracy. :rocket:

### :bookmark: Bookmarklets

Bookmarklets are pieces of JavaScript code that are saved as a bookmark in the user's browser, enabling them to interact with webpages on the fly. We provide 6 different bookmarklets (CRE, Setup, Map, Analyzer, Crown, and the all-in-one Loader), each located underneath the title of its corresponding tool's page. 

Using the Auto-Loader is recommended, as it automatically grabs the latest version of each bookmarklet without having to manually update.

You **must** be on the official [mousehuntgame.com](https://www.mousehuntgame.com/) website for our bookmarklets to work. This is because the Facebook version loads MouseHunt in an `<iframe>` which (along with CORS restrictions) prevents access to DOM elements as well as the custom `user` JavaScript object.

Bookmarklet | Functionality
:--: | --
CRE | Automatically fills in the Catch Rate Estimator with your location, sublocation, cheese, charm, weapon, base, charm, and more
Setup | Gradually loads your owned weapons, bases, and charms into Best Setup by passing them in via URL over multiple redirects
Analyzer | Gradually loads in your entire Marketplace transaction history via URL over multiple redirects
Map | Automatically fills in the Map Solver's mouse name `textarea` with all of the remaining uncaught mice on your Active Map
Crown | Automatically fills in the Crown Solver's `textarea` with the 30 Bronze mice on your 'King's Crowns' page that are closest to reaching Silver status (100 catches). The rest of the Bronze mice are copied to your clipboard for pasting if desired (this may or may not work depending on your browser)
Loader | Generates a pop-up dialog that gives you access to the latest versions of each bookmarklet

<div align="right"><a href="#book-table-of-contents">Top</a></div>

<p align="center">
  <br><b id="Browser-Tips">Browser Installation Tips</b><br>
  Drag the blue bookmarklet link to your browser's bookmarks bar. If that doesn't work, try the following manual instructions. These concepts apply to other browsers (including mobile), but specific processes may vary.<br><br>
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

1. Edge doesn't seem to natively support saving a bookmark directly from a link or editing a bookmark's URL (at least on my machine, having tried Favorites and Reading List). However, there is a third-party application for Edge called [EdgeManage](http://www.emmet-gray.com/Articles/EdgeManage.html) that purports to add a lot of missing features for managing your favorites - use at your own discretion.

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
*(!) Loot* | *Catch* | *Per hunt*

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :earth_americas: [Map Solver and Mouse Finder](https://tsitu.github.io/MH-Tools/map.html)

> Calculates ideal specific locations to hunt for any given list of mice. Based on Chad's and <a href="http://olf.github.io/mhmapsolver/" target="_blank" rel="noopener">Olaf's</a> solvers.

<p>Copy and paste mice from maps, or type names leaving a line break between each. Press <kbd>Enter</kbd> to autocomplete and <kbd>Tab</kbd> to cycle through autocomplete suggestions.</p>

"Fused" cheeses (e.g. Gouda/Brie/Swiss) will often show up in results. This indicates that attraction proportions from the underlined cheese has been extrapolated due to low sample sizes.

Type of Attraction Rate | Description
-- | --
Raw | Shown for individual mice
Total | Sum for a specific location, sublocation, cheese, and charm
Weighted | Same as Total AR, but with baseline cheese attraction rates factored in

Filter Category | Cheeses
-- | --
Magic Essence | SB+, Moon, Maki, Maki String, Magical String (Toxic SB+ and Magical Rancid Radioactive Blue currently not in population data)
Common | Brie, Brie String, Cheddar, Gouda, Marble, Marble String, Swiss, Swiss String
Marketplace | Crescent, Magical String, Maki, Maki String, Moon, Rancid Radioactive Blue, SB+
Shoppe | All four Camemberts, Fishy Fromage, Grilled, Sunrise (separate niche from common)
Crafted | Resonator, Vanilla Stilton, Vengeful Vanilla Stilton, White Cheddar... (many more)
Potions | TODO (very many)
Event _(not included)_ | Cupcake Colby, Dumpling, Extra Sweet Cupcake Colby, Marshmallow Monterey, Nian Gao'da, Rewind Raclette, Rockforth, Runny

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :trophy: [Best Setup](https://tsitu.github.io/MH-Tools/setup.html)

> Calculates the best weapon and base setup to use for a particular location, sublocation, and cheese.

*Note:* This tool will be receiving optimizations in the near future to reduce lengthy loading times and store owned items more efficiently.

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :chart_with_upwards_trend: [Marketplace Analyzer](https://tsitu.github.io/MH-Tools/analyzer.html)

> Provides a record of every marketplace transaction as well as summary tables with useful aggregations.

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

> Calculates the best locations to hunt to progress towards achieving 100 catches of mouse breeds.

This spin-off of the Map Solver by vsong factors in the difference between 100 and the number of catches you currently have for a breed (e.g. all else being equal, a mouse at 99 catches is weighted more heavily than one at 80 catches).

Type of Crown Progress | Description
:--: | --
Raw | Shown for individual mice, factors in attraction rate and catches remaining until 100
Total | Sum for a specific location, sublocation, cheese, and charm
Weighted | Same as Total CP, but with baseline cheese attraction rates factored in

<div align="right"><a href="#book-table-of-contents">Top</a></div>

---

### :bookmark_tabs: [CRE Tabbed Demo](https://tsitu.github.io/MH-Tools/tabs.html)

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

1. Certain files (wisdom/population JSON and minified bookmarklets) are generated by Travis CI when the master branch is pushed. To build these files locally, run `npm run build`

1. The easiest way to serve the tools for local testing is `npm run serve`, which spins up an instance of [http-server](https://www.npmjs.com/package/http-server) on port 8000

### :barber: Coding Style

We use ESLint ([`config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base)) configured with Prettier ([`prettier/recommended`](https://prettier.io/docs/en/eslint.html#why-not-both)) to enforce consistent coding conventions.

*This is still a work in progress, along with converting the codebase to align with modern ES2015+ JavaScript best practices.*

<div align="right"><a href="#book-table-of-contents">Top</a></div>

## Miscellaneous

### :arrow_down: Useful Links

1. Marketplace Analyzer ([forum thread](https://www.mousehuntgame.com/forum/showthread.php?126255-Marketplace-Analyzer&goto=newpost))
1. Population Data ([CSV](https://github.com/tsitu/MH-Tools/blob/master/data/populations.csv) | [source](https://docs.google.com/spreadsheets/d/1Y_urUwbp7XpbL9vRV4w4uoexkIM_DbuAc5Fb1JL_u20/edit?usp=sharing))
1. Mouse Power Values ([spreadsheet](https://docs.google.com/spreadsheets/d/1cGu0eG0Fgwf-OWFAfed_tVJC0GQh-j6utxiSDdWRFZE/))
1. Mouse Wisdom Values ([spreadsheet](https://docs.google.com/spreadsheets/d/1nzD6iiHauMMwD2eHBuAyRziYJtCVnNwSYzCKbBnrRgc/edit?usp=sharing))
1. BWRift/MoPi Mouse Powers + Effectiveness ([spreadsheet](https://docs.google.com/spreadsheets/d/1pnS4UVFMUndjX2H2s6hfyf5flMcppZyhZrn8EUH23S8/edit?usp=sharing))

### :heart_decoration: Thanks to...

- Our contributors :thumbsup:
- haoala for the [original tools](https://dl.dropboxusercontent.com/u/14589881/index.html) (no longer maintained or hosted)
- [Start Bootstrap](https://github.com/davidtmiller) for the index.html theme

<div align="right"><a href="#book-table-of-contents">Top</a></div>
