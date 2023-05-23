const utils = require("../_utils");

const cheese = [
  "Gouda",
  "SB+",
  "Beanster",
  "Lavish Beanster",
  "Royal Beanster",
];

module.exports = {
  default: {
    location: utils.genVarField("location", "Bountiful Beanstalk"),
  },
  series: [
    {
      cheese: utils.genVarField("cheese", ["Gouda", "SB+"]),
      stage: utils.genVarField("stage", "Beanstalk"),
      config: [
        {
          opts: {
            include: ["Budrich Thornborn", "Leafton Beanwell"],
          },
        },
      ],
    },
    {
      cheese: utils.genVarField("cheese", ["Gouda", "SB+"]),
      stage: utils.genVarField("stage", "Beanstalk Boss"),
      config: [
        {
          opts: {
            include: ["Vinneus Stalkhome"],
          },
        },
      ],
    },
    {
      cheese: utils.genVarField("cheese", cheese),
      stage: [
        {
          vars: {
            stage: {
              "Dungeon": true,
              "Dungeon - Magic": true,
              "Dungeon - Lavish Lapis": true,
              "Dungeon - Mystery": true,
            },
          },
          fields: {
            stage: "Dungeon",
          },
        },
      ],
    },
    {
      cheese: utils.genVarField("cheese", cheese),
      stage: [
        {
          vars: {
            stage: {
              "Ballroom": true,
              "Ballroom - Royal Ruby": true,
              "Ballroom - Golden Harp String": true,
              "Ballroom - Mystery": true,
            },
          },
          fields: {
            stage: "Ballroom",
          },
        },
      ],
    },
    {
      cheese: utils.genVarField("cheese", cheese),
      stage: [
        {
          vars: {
            stage: {
              "Great Hall": true,
              "Great Hall - Golden Goose Egg": true,
            },
          },
          fields: {
            stage: "Great Hall",
          },
        },
      ],
    },
  ],

  postProcess: function(data) {
    const giants = [
      "Dungeon Master",
      "Malevolent Maestro",
      "Mythical Giant King"
    ];
    giants.forEach((mouse) => {
      data.push({
        stage: "Castle Giants",
        location: "Bountiful Beanstalk",
        cheese: "SB+",
        mouse: mouse,
        attraction: "33.33%",
        sample: giants.length,
      });
    });

    return data;
  },
};
