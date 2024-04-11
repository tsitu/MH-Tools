const utils = require("../_utils");

const pieces = [
  "Pawn",
  "Knight",
  "Bishop",
  "Rook",
  "Queen",
  "King",
];

const mysticMice = pieces.map(p => `Mystic ${p}`);
const technicMice = pieces.map(p => `Technic ${p}`);

function levelToPieceIndex(progressLevel) {
  if (progressLevel < 8) {
    return 0; // pawn
  } else if (progressLevel < 10) {
    return 1; // knight
  } else if (progressLevel < 12) {
    return 2; // bishop
  } else if (progressLevel < 14) {
    return 3; // rook
  } else if (progressLevel < 15) {
    return 4; // queen
  }
  return 5; // king
}

function chessMice(technicLevel = 0, mysticLevel = 0) {
  return [
    {
      opts: {
        include: [
          ...technicMice.slice(0, levelToPieceIndex(technicLevel) + 1),
          ...mysticMice.slice(0, levelToPieceIndex(mysticLevel) + 1),
          "Chess Master"
        ]
      }
    }
  ];
}

module.exports = {
  default: {
    location: utils.genVarField("location", "Zugzwang's Tower"),
    config: [
      {
        opts: {
          attraction: 0.005,
        },
      },
    ],
  },
  series: [
    {
      trap: utils.genVarField("trap", "Technic Pawn Pincher"),
      mice: chessMice(7, 7),
      stage: [{ fields: { stage: "Technic Pawn Pincher" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:0": true,
              "technic:1": true,
              "technic:2": true,
              "technic:3": true,
              "technic:4": true,
              "technic:5": true,
              "technic:6": true,
              "technic:7": true,
            },
            detail2: {
              "mystic:0": true,
              "mystic:1": true,
              "mystic:2": true,
              "mystic:3": true,
              "mystic:4": true,
              "mystic:5": true,
              "mystic:6": true,
              "mystic:7": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
            stage: "Technic Pawn Pincher"
          }
        }
      ],
    },
    {
      mice: chessMice(9, 7),
      stage: [{ fields: { stage: "Technic Knights" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:8": true,
              "technic:9": true,
            },
            detail2: {
              "mystic:0": true,
              "mystic:1": true,
              "mystic:2": true,
              "mystic:3": true,
              "mystic:4": true,
              "mystic:5": true,
              "mystic:6": true,
              "mystic:7": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(11, 7),
      stage: [{ fields: { stage: "Technic Bishops" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:10": true,
              "technic:11": true,
            },
            detail2: {
              "mystic:0": true,
              "mystic:1": true,
              "mystic:2": true,
              "mystic:3": true,
              "mystic:4": true,
              "mystic:5": true,
              "mystic:6": true,
              "mystic:7": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(13, 7),
      stage: [{ fields: { stage: "Technic Rooks" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:12": true,
              "technic:13": true,
            },
            detail2: {
              "mystic:0": true,
              "mystic:1": true,
              "mystic:2": true,
              "mystic:3": true,
              "mystic:4": true,
              "mystic:5": true,
              "mystic:6": true,
              "mystic:7": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(14, 7),
      stage: [{ fields: { stage: "Technic Queen" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:14": true,
            },
            detail2: {
              "mystic:0": true,
              "mystic:1": true,
              "mystic:2": true,
              "mystic:3": true,
              "mystic:4": true,
              "mystic:5": true,
              "mystic:6": true,
              "mystic:7": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(14, 7),
      stage: [{ fields: { stage: "Technic Queen" } }],
      cheese: utils.genVarField("cheese", "Checkmate"),
      config: [
        {
          vars: {
            detail: {
              "technic:14": true,
            },
            detail2: {
              "mystic:0": true,
              "mystic:1": true,
              "mystic:2": true,
              "mystic:3": true,
              "mystic:4": true,
              "mystic:5": true,
              "mystic:6": true,
              "mystic:7": true,
            },
          },
        }
      ],
    },
    {
      mice: chessMice(15, 7),
      stage: [{ fields: { stage: "Technic King" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:15": true,
            },
            detail2: {
              "mystic:0": true,
              "mystic:1": true,
              "mystic:2": true,
              "mystic:3": true,
              "mystic:4": true,
              "mystic:5": true,
              "mystic:6": true,
              "mystic:7": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(15, 7),
      stage: [{ fields: { stage: "Technic King" } }],
      cheese: utils.genVarField("cheese", "Checkmate"),
      config: [
        {
          vars: {
            detail: {
              "technic:15": true,
            },
            detail2: {
              "mystic:0": true,
              "mystic:1": true,
              "mystic:2": true,
              "mystic:3": true,
              "mystic:4": true,
              "mystic:5": true,
              "mystic:6": true,
              "mystic:7": true,
            },
          },
        }
      ],
    },
    {
      mice: chessMice(16, 1),
      stage: [{ fields: { stage: "Technic Chess Master" } }],
      cheese: utils.genVarField("cheese", "Checkmate"),
      config: [
        {
          vars: {
            detail: {
              "technic:16": true,
            },
            detail2: {
              "mystic:0": true,
              "mystic:1": true,
              "mystic:2": true,
              "mystic:3": true,
              "mystic:4": true,
              "mystic:5": true,
              "mystic:6": true,
              "mystic:7": true,
            },
          },
        }
      ],
    },
    {
      trap: utils.genVarField("trap", "Mystic Pawn Pincher"),
      mice: chessMice(7, 7),
      stage: [{ fields: { stage: "Mystic Pawn Pincher" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:0": true,
              "technic:1": true,
              "technic:2": true,
              "technic:3": true,
              "technic:4": true,
              "technic:5": true,
              "technic:6": true,
              "technic:7": true,
            },
            detail2: {
              "mystic:0": true,
              "mystic:1": true,
              "mystic:2": true,
              "mystic:3": true,
              "mystic:4": true,
              "mystic:5": true,
              "mystic:6": true,
              "mystic:7": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(7, 9),
      stage: [{ fields: { stage: "Mystic Knights" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:0": true,
              "technic:1": true,
              "technic:2": true,
              "technic:3": true,
              "technic:4": true,
              "technic:5": true,
              "technic:6": true,
              "technic:7": true,
            },
            detail2: {
              "mystic:8": true,
              "mystic:9": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(7, 11),
      stage: [{ fields: { stage: "Mystic Bishops" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:0": true,
              "technic:1": true,
              "technic:2": true,
              "technic:3": true,
              "technic:4": true,
              "technic:5": true,
              "technic:6": true,
              "technic:7": true,
            },
            detail2: {
              "mystic:10": true,
              "mystic:11": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(7, 13),
      stage: [{ fields: { stage: "Mystic Rooks" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:0": true,
              "technic:1": true,
              "technic:2": true,
              "technic:3": true,
              "technic:4": true,
              "technic:5": true,
              "technic:6": true,
              "technic:7": true,
            },
            detail2: {
              "mystic:12": true,
              "mystic:13": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(7, 14),
      stage: [{ fields: { stage: "Mystic Queen" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:0": true,
              "technic:1": true,
              "technic:2": true,
              "technic:3": true,
              "technic:4": true,
              "technic:5": true,
              "technic:6": true,
              "technic:7": true,
            },
            detail2: {
              "mystic:14": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(7, 14),
      stage: [{ fields: { stage: "Mystic Queen" } }],
      cheese: utils.genVarField("cheese", "Checkmate"),
      config: [
        {
          vars: {
            detail: {
              "technic:0": true,
              "technic:1": true,
              "technic:2": true,
              "technic:3": true,
              "technic:4": true,
              "technic:5": true,
              "technic:6": true,
              "technic:7": true,
            },
            detail2: {
              "mystic:14": true,
            },
          },
        }
      ],
    },
    {
      mice: chessMice(7, 15),
      stage: [{ fields: { stage: "Mystic King" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:0": true,
              "technic:1": true,
              "technic:2": true,
              "technic:3": true,
              "technic:4": true,
              "technic:5": true,
              "technic:6": true,
              "technic:7": true,
            },
            detail2: {
              "mystic:15": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(7, 15),
      stage: [{ fields: { stage: "Mystic King" } }],
      cheese: utils.genVarField("cheese", "Checkmate"),
      config: [
        {
          vars: {
            detail: {
              "technic:0": true,
              "technic:1": true,
              "technic:2": true,
              "technic:3": true,
              "technic:4": true,
              "technic:5": true,
              "technic:6": true,
              "technic:7": true,
            },
            detail2: {
              "mystic:15": true,
            },
          },
        }
      ],
    },
    {
      mice: chessMice(1, 16),
      stage: [{ fields: { stage: "Mystic Chess Master" } }],
      cheese: utils.genVarField("cheese", "Checkmate"),
      config: [
        {
          vars: {
            detail: {
              "technic:0": true,
              "technic:1": true,
              "technic:2": true,
              "technic:3": true,
              "technic:4": true,
              "technic:5": true,
              "technic:6": true,
              "technic:7": true,
            },
            detail2: {
              "mystic:16": true,
            },
          },
        }
      ],
    },
    {
      trap: utils.genVarField("trap", "Technic Pawn Pincher"),
      mice: chessMice(7, 16),
      stage: [{ fields: { stage: "Technic Pawn Pincher - Double Run" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:0": true,
              "technic:1": true,
              "technic:2": true,
              "technic:3": true,
              "technic:4": true,
              "technic:5": true,
              "technic:6": true,
              "technic:7": true,
            },
            detail2: {
              "mystic:16": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
            stage: "Technic Pawn Pincher"
          }
        }
      ],
    },
    {
      mice: chessMice(9, 16),
      stage: [{ fields: { stage: "Technic Knights - Double Run" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:8": true,
              "technic:9": true,
            },
            detail2: {
              "mystic:16": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(11, 16),
      stage: [{ fields: { stage: "Technic Bishops - Double Run" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:10": true,
              "technic:11": true,
            },
            detail2: {
              "mystic:16": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(13, 16),
      stage: [{ fields: { stage: "Technic Rooks - Double Run" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:12": true,
              "technic:13": true,
            },
            detail2: {
              "mystic:16": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(14, 16),
      stage: [{ fields: { stage: "Technic Queen - Double Run" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:14": true,
            },
            detail2: {
              "mystic:16": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(14, 16),
      stage: [{ fields: { stage: "Technic Queen - Double Run" } }],
      cheese: utils.genVarField("cheese", "Checkmate"),
      config: [
        {
          vars: {
            detail: {
              "technic:14": true,
            },
            detail2: {
              "mystic:16": true,
            },
          },
        }
      ],
    },
    {
      mice: chessMice(15, 16),
      stage: [{ fields: { stage: "Technic King - Double Run" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:15": true,
            },
            detail2: {
              "mystic:16": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(15, 16),
      stage: [{ fields: { stage: "Technic King - Double Run" } }],
      cheese: utils.genVarField("cheese", "Checkmate"),
      config: [
        {
          vars: {
            detail: {
              "technic:15": true,
            },
            detail2: {
              "mystic:16": true,
            },
          },
        }
      ],
    },
    {
      trap: utils.genVarField("trap", "Mystic Pawn Pincher"),
      mice: chessMice(16, 7),
      stage: [{ fields: { stage: "Mystic Pawn Pincher - Double Run" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:16": true,
            },
            detail2: {
              "mystic:0": true,
              "mystic:1": true,
              "mystic:2": true,
              "mystic:3": true,
              "mystic:4": true,
              "mystic:5": true,
              "mystic:6": true,
              "mystic:7": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(16, 9),
      stage: [{ fields: { stage: "Mystic Knights - Double Run" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:16": true,
            },
            detail2: {
              "mystic:8": true,
              "mystic:9": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(16, 11),
      stage: [{ fields: { stage: "Mystic Bishops - Double Run" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:16": true,
            },
            detail2: {
              "mystic:10": true,
              "mystic:11": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(16, 13),
      stage: [{ fields: { stage: "Mystic Rooks - Double Run" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:16": true,
            },
            detail2: {
              "mystic:12": true,
              "mystic:13": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(16, 14),
      stage: [{ fields: { stage: "Mystic Queen - Double Run" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:16": true,
            },
            detail2: {
              "mystic:14": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(16, 14),
      stage: [{ fields: { stage: "Mystic Queen - Double Run" } }],
      cheese: utils.genVarField("cheese", "Checkmate"),
      config: [
        {
          vars: {
            detail: {
              "technic:16": true,
            },
            detail2: {
              "mystic:14": true,
            },
          },
        }
      ],
    },
    {
      mice: chessMice(16, 15),
      stage: [{ fields: { stage: "Mystic King - Double Run" } }],
      config: [
        {
          vars: {
            detail: {
              "technic:16": true,
            },
            detail2: {
              "mystic:15": true,
            },
            cheese: {
              "SB+": true,
              "Gouda": true,
              "Brie": true
            }
          },
          fields: {
            cheese: "SB+/Gouda/Brie",
          }
        }
      ],
    },
    {
      mice: chessMice(16, 15),
      stage: [{ fields: { stage: "Mystic King - Double Run" } }],
      cheese: utils.genVarField("cheese", "Checkmate"),
      config: [
        {
          vars: {
            detail: {
              "technic:16": true,
            },
            detail2: {
              "mystic:15": true,
            },
          },
        }
      ],
    },
    {
      mice: chessMice(16, 16),
      stage: [{ fields: { stage: "Chess Master - Double Run" } }],
      cheese: utils.genVarField("cheese", "Checkmate"),
      config: [
        {
          vars: {
            detail: {
              "technic:16": true,
            },
            detail2: {
              "mystic:16": true,
            },
          },
        }
      ],
    },
  ],
  /**
   *
   * @param {{stage: string, location: string, cheese: string, mouse: string, attraction: string, sample: number, seen: number}[]} data
   * @returns {{stage: string, location: string, cheese: string, mouse: string, attraction: string, sample: number, seen: number}[]}
   */
  postProcess: function(data) {
    // Assuming that technic and mystic pieces have the same AR pool no matter what run you're doing
    // We can "combine" the opposite side run in a clever way to boost the accuracy of the data
    // Consider the MPP or TPP start. Here's a matrix of Trap vs Mouse with AR values
    /*
      +--------------+-----+-----+
      |              | MPP | TPP |
      +--------------+-----+-----+
      | Mystic Pawn  | 90% | 10% |
      | Technic Pawn | 10% | 90% |
      +--------------+-----+-----+
    */
    // Adding together the two 90% samples, and the two 10% samples creates a sample that simulates if you had done either run regardless of piece color.
    // So when you have a data row of MPP stage with Mystic Pawn, you need to get the data row of TPP stage with the Technic Pawn. And vice versa.
    data
    .forEach((run, i) => {
      if (run.stage.startsWith('Mystic')) {
        const oppStage = opposite(run.stage);
        const oppMouse = opposite(run.mouse);

        data
          .forEach((other, j) => {
            if (other.cheese == run.cheese
                  && other.stage == oppStage
                  && other.mouse == oppMouse) {
              // Add seen to each other. Recalc AR.

              data[i].seen += data[j].seen;
              data[i].sample += data[j].sample;

              data[j].seen = data[i].seen;
              data[j].sample = data[i].sample;

              data[i].attraction = (data[i].seen / data[i].sample * 100).toFixed(2) + "%";
              data[j].attraction = (data[j].seen / data[j].sample * 100).toFixed(2) + "%";
            }
        });
      }
    });

    return data;
  },
};

function opposite(name) {
  if (name.indexOf("Mystic") > -1) {
    return name.replace("Mystic", "Technic")
  }

  return name.replace("Technic", "Mystic")
}
