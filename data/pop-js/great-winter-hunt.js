const utils = require("../_utils");

const standardCheese = ["Swiss", "Brie", "Gouda"];
const locations = ["Cinnamon Hill", "Golem Workshop", "Ice Fortress"];

const standardAnyMice = ["Hoarder"];
const ppAnyMice = ["Snowflake", "Stuck Snowball"];
const gppAnyMice = ["Glazy", "Joy"];

const mouse_populations = {
  "Cinnamon Hill": {
    Common: [
      "Candy Cane",
      "Nice Knitting",
      "Shorts-All-Year",
      "Snow Scavenger",
      "Toboggan Technician",
      "Young Prodigy Racer"
    ],
    SB: [],
    // Each location has one PP only mouse
    PP: ["Triple Lutz"],
    // PP or GPP
    Event: [
      "Black Diamond Racer",
      "Double Black Diamond Racer",
      "Free Skiing",
      "Great Giftnapper",
      "Nitro Racer",
      "Ol' King Coal",
      "Rainbow Racer",
      "Snow Boulder",
      "Snow Golem Jockey",
      "Snowball Hoarder",
      "Sporty Ski Instructor",
      "Wreath Thief"
    ],
  },
  "Golem Workshop": {
    Common: [
      "Gingerbread",
      "Greedy Al",
      "Mouse of Winter Future",
      "Mouse of Winter Past",
      "Mouse of Winter Present"
    ],
    SB: ["Scrooge"],
    PP: ["Ribbon"],
    Event: [
      "Christmas Tree",
      "Destructoy",
      "Elf",
      "Mad Elf",
      "Nutcracker",
      "Ornament",
      "Present",
      "Ridiculous Sweater",
      "Snow Golem Architect",
      "Stocking",
      "Toy",
      "Toy Tinkerer"
    ],
  },
  "Ice Fortress": {
    Common: [
      "Confused Courier",
      "Frigid Foreman",
      "Miser",
      "Missile Toe",
      "Snowblower",
      "Snowglobe"
    ],
    SB: [],
    PP: ["Builder"],
    Event: [
      "Borean Commander",
      "Glacia Ice Fist",
      "Great Winter Hunt Impostor",
      "Iceberg Sculptor",
      "Naughty Nougat",
      "Reinbo",
      "S.N.O.W. Golem",
      "Slay Ride",
      "Snow Fort",
      "Snow Sorceress",
      "Squeaker Claws",
      "Tundra Huntress"
    ],
  },
};

function generateSeries() {
  // For each location, generate
  // Common then SB+ then PP then GPP
  const series = [];
  for (const location of locations) {
    series.push(
      {
        cheese: utils.genVarField("cheese", standardCheese),
        location: utils.genVarField("location", location),
        config: [
          {
            opts: {
              include: [
                ...standardAnyMice,
                ...mouse_populations[location].Common
              ]
            }
          }
        ]
      },
      {
        cheese: utils.genVarField("cheese", "SB+"),
        location: utils.genVarField("location", location),
        config: [
          {
            opts: {
              include: [
                ...standardAnyMice,
                ...mouse_populations[location].Common,
                ...mouse_populations[location].SB
              ]
            }
          }
        ]
      },
      {
        cheese: utils.genVarField("cheese", "Pecan Pecorino"),
        location: utils.genVarField("location", location),
        config: [
          {
            opts: {
              include: [
                ...ppAnyMice,
                ...mouse_populations[location].PP,
                ...mouse_populations[location].Event
              ]
            }
          }
        ]
      },
      {
        cheese: utils.genVarField("cheese", "Glazed Pecan Pecorino"),
        location: utils.genVarField("location", location),
        config: [
          {
            opts: {
              include: [
                ...ppAnyMice,
                ...gppAnyMice,
                ...mouse_populations[location].Event
              ]
            }
          }
        ]
      },
    );
  }

  return series;
}

module.exports = {
  defaults: {
    after: utils.genVarField("after", 1670302800), // 2022-12-06T00:00:00Z
    before: utils.genVarField("before", 1673384400) // 2023-01-10T14:00:00Z
  },
  series: generateSeries(),
  postProcess: function(data) {
    data.push({
      stage: "Boss",
      location: "Ice Fortress",
      cheese: "SB+",
      mouse: "Frost King",
      attraction: "100.00%",
      sample: 1
    });

    return data;
  }
};
