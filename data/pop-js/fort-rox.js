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
      stage: utils.genVarField('stage', 'Day'),
      config: [ {
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
      stage: utils.genVarField('stage', 'Twilight'),
      config: [ {
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
      stage: utils.genVarField('stage', 'Midnight'),
      config: [ {
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
      stage: utils.genVarField('stage', 'Pitch'),
      config: [ {
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
      stage: utils.genVarField('stage', 'Utter Darkness'),
      config: [ {
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
      stage: utils.genVarField('stage', 'First Light'),
      config: [ {
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
      stage: utils.genVarField('stage', 'Dawn'),
      config: [ {
        opts: {
          include: [
            'Battering Ram',
            'Dawn Guardian',
            'Monster of the Meteor'
          ]
        }
      } ]
    },
    { // Heart of the Meteor
      stage: utils.genVarField('stage', 'Heart of the Meteor'),
      cheese: utils.genVarField('cheese', 'Sunrise'),
      config: [ {
        opts: {
          include: [
            'Heart of the Meteor'
          ]
        }
      } ]
    }
  ]
}
