const inputWithOnlyL = { L: 0 }
const inputWithOnlyEvents = { events: {} }
const inputwithOnlyGroups = { groups: {} }
const inputWithoutGroups = {
  events: [{
    id: 1,
    min: 0,
    max: 2,
  },
  {
    id: 2,
    min: 1,
    max: 6,
  }],
  L: [{
    group: 1,
    event: 1,
    gain: 1,
  },
  {
    group: 1,
    event: 2,
    gain: 0.5,
  },
  {
    group: 2,
    event: 1,
    gain: 0,
  },
  {
    group: 2,
    event: 2,
    gain: 1,
  }],
  updateL(L, groups, gInd) {
    let newL = L
    if (groups[gInd].id === 1) {
      newL = L.filter(l => l.gain === 0)
    }
    return { newL }
  },
}
const inputwithOnlyUpdateL = {
  updateL() {
    return 1
  },
}
const inputWithNoMinInEvents = {
  events: [{
    id: 1,
    max: 2,
  },
  {
    id: 2,
    min: 1,
    max: 6,
  }],
}

const inputWithNoMaxInEvents = {
  events: [{
    id: 1,
    min: 0,
  },
  {
    id: 2,
    min: 1,
    max: 6,
  }],
}

const inputWithDuplicateIdInEvents = {
  events: [{
    id: 1,
    min: 0,
    max: 1,
  },
  {
    id: 1,
    min: 1,
    max: 6,
  }],
}

const correctInput = {
  events: [{
    id: 1,
    min: 0,
    max: 2,
  },
  {
    id: 2,
    min: 1,
    max: 6,
  }],
  groups: [{
    id: 1,
    size: 1,
    pref: [1, 2],
  },
  {
    id: 2,
    size: 5,
    pref: [2],
  },
  ],
  L: [{
    group: 1,
    event: 1,
    gain: 1,
  },
  {
    group: 1,
    event: 2,
    gain: 0.5,
  },
  {
    group: 2,
    event: 1,
    gain: 0,
  },
  {
    group: 2,
    event: 2,
    gain: 1,
  }],
  updateL(L, groups, gInd) {
    let newL = L
    if (groups[gInd].id === 1) {
      newL = L.filter(l => l.gain === 0)
    }
    return { newL }
  },
}


const inputWithWrongPref = {
  events: [{
    id: 1,
    min: 0,
    max: 2,
  },
  {
    id: 2,
    min: 1,
    max: 6,
  }],
  groups: [{
    id: 1,
    size: 1,
    pref: [1, 2],
  },
  {
    id: 2,
    size: 5,
    pref: 2,
  },
  ],
  L: [{
    group: 1,
    event: 1,
    gain: 1,
  },
  {
    group: 1,
    event: 2,
    gain: 0.5,
  },
  {
    group: 2,
    event: 1,
    gain: 0,
  },
  {
    group: 2,
    event: 2,
    gain: 1,
  }],
  updateL(L, groups, gInd) {
    let newL = L
    if (groups[gInd].id === 1) {
      newL = L.filter(l => l.gain === 0)
    }
    return { newL }
  },
}


const inputWithWrongPrefId = {
  events: [{
    id: 1,
    min: 0,
    max: 2,
  },
  {
    id: 2,
    min: 1,
    max: 6,
  }],
  groups: [{
    id: 1,
    size: 1,
    pref: [1, 5],
  },
  {
    id: 2,
    size: 5,
    pref: [2],
  },
  ],
  L: [{
    group: 1,
    event: 1,
    gain: 1,
  },
  {
    group: 1,
    event: 2,
    gain: 0.5,
  },
  {
    group: 2,
    event: 1,
    gain: 0,
  },
  {
    group: 2,
    event: 2,
    gain: 1,
  }],
  updateL(L, groups, gInd) {
    let newL = L
    if (groups[gInd].id === 1) {
      newL = L.filter(l => l.gain === 0)
    }
    return { newL }
  },
}

module.exports = {
  inputWithDuplicateIdInEvents,
  inputWithNoMaxInEvents,
  inputWithNoMinInEvents,
  inputWithOnlyEvents,
  inputWithOnlyL,
  correctInput,
  inputwithOnlyUpdateL,
  inputwithOnlyGroups,
  inputWithoutGroups,
  inputWithWrongPref,
  inputWithWrongPrefId,
}
