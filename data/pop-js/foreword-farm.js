const utils = require("../_utils")

const standardCheese = ['Gouda', 'SB+'];

module.exports = {
  default: {
    location: utils.genVarField('location', 'Foreword Farm'),
  },
  series: [
    { 
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "No Plants"),
      config: [ {
        opts: {
          include: [
            'Grit Grifter',
            'Land Loafer',
            'Root Rummager',
            'Crazed Cultivator'
          ]
        }
      } ]
    },    
    { 
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "One Plant"),
      config: [ {
        opts: {
          include: [
            'Angry Aphid',
            'Grit Grifter',
            'Root Rummager',
            'Crazed Cultivator'
          ]
        }
      } ]
    },
    { 
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Two Plants"),
      config: [ {
        opts: {
          include: [
            'Angry Aphid',
            'Grit Grifter',
            'Wily Weevil',
            'Crazed Cultivator'
          ]
        }
      } ]
    },
    { 
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Three Plants"),
      config: [ {
        opts: {
          include: [
            'Angry Aphid',
            'Mighty Mite',
            'Wily Weevil',
            'Crazed Cultivator'
          ]
        }
      } ]
    },
    { 
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Three Papyrus"),
      config: [ {
        opts: {
          include: [
            'Angry Aphid',
            'Mighty Mite',
            'Wily Weevil',
            'Crazed Cultivator',
            'Loathsome Locust'
          ]
        }
      } ]
    },
    { 
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Boss"),
      config: [ {
        opts: {
          include: [
            'Monstrous Midge'
          ]
        }
      } ]
    },
  ]
}
