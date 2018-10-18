const utils = require("../_utils")

const cheeses = [
  'Gouda',
  'Brie',
  'SB+',
  'Crescent',
  'Moon',
]

module.exports = {
  default: {
    location: utils.genVarField('location', 'Fort Rox'),
    cheese: utils.genVarField('cheese', cheeses)
  },
  series: [
    { // day
      config: [ {
        vars: { stage: { Day: true } },
        fields: { stage: 'Day' },
        opts: {
          include: [
            'Hardworking Hauler',
            'Meteorite Miner',
            'Meteorite Mover',
            'Meteorite Snacker',
            'Mining Materials Manager',
            'Mischievous Meteorite Miner'
          ]
        }
      } ]
    },
    { // twilight
      config: [ {
        vars: { stage: { Twilight: true } },
        fields: { stage: 'Twilight' },
        opts: {
          include: [
            'Alpha Weremouse',
            'Battering Ram',
            'Mischievous Wereminer',
            'Night Shift Materials Manager',
            'Nightmancer',
            'Reveling Lycanthrope',
            'Werehauler',
            'Wereminer'
          ]
        }
      } ]
    },
    { // Midnight
      config: [ {
        vars: { stage: { Midnight: true } },
        fields: { stage: 'Midnight' },
        opts: {
          include: [
            'Alpha Weremouse',
            'Arcane Summoner',
            'Battering Ram',
            'Hypnotized Gunslinger',
            'Meteorite Golem',
            'Mischievous Wereminer',
            'Night Shift Materials Manager',
            'Night Watcher',
            'Nightmancer',
            'Reveling Lycanthrope',
            'Wealthy Werewarrior',
            'Werehauler',
            'Wereminer'
          ]
        }
      } ]
    },
    { // Pitch
      config: [ {
        vars: { stage: { Pitch: true } },
        fields: { stage: 'Pitch' },
        opts: {
          include: [
            'Alpha Weremouse',
            'Arcane Summoner',
            'Battering Ram',
            'Cursed Taskmaster',
            'Hypnotized Gunslinger',
            'Meteorite Golem',
            'Meteorite Mystic',
            'Mischievous Wereminer',
            'Night Shift Materials Manager',
            'Night Watcher',
            'Nightfire',
            'Nightmancer',
            'Reveling Lycanthrope',
            'Wealthy Werewarrior',
            'Werehauler',
            'Wereminer'
          ]
        }
      } ]
    },
    { // Utter Darkness
      config: [ {
        vars: { stage: { 'Utter Darkness': true } },
        fields: { stage: 'Utter Darkness' },
        opts: {
          include: [
            'Alpha Weremouse',
            'Arcane Summoner',
            'Battering Ram',
            'Cursed Taskmaster',
            'Hypnotized Gunslinger',
            'Meteorite Golem',
            'Meteorite Mystic',
            'Mischievous Wereminer',
            'Night Shift Materials Manager',
            'Night Watcher',
            'Nightfire',
            'Nightmancer',
            'Reveling Lycanthrope',
            'Wealthy Werewarrior',
            'Werehauler',
            'Wereminer'
          ]
        }
      } ]
    },
    { // First Light
      config: [ {
        vars: { stage: { 'First Light': true } },
        fields: { stage: 'First Light' },
        opts: {
          include: [
            'Arcane Summoner',
            'Battering Ram',
            'Cursed Taskmaster',
            'Hypnotized Gunslinger',
            'Meteorite Golem',
            'Meteorite Mystic',
            'Night Watcher',
            'Nightfire'
          ]
        }
      } ]
    },
    { // Dawn
      config: [ {
        vars: { stage: { 'Dawn': true } },
        fields: { stage: 'Dawn' },
        opts: {
          include: [
            'Battering Ram',
            'Dawn Guardian',
            'Monster of the Meteor'
          ]
        }
      } ]
    }
  ]
}
