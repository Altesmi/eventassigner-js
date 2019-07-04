const groups = [{
  id: 1,
  size: 2,
  pref: [1, 2, 3],
},
{
  id: 2,
  size: 1,
  pref: [2, 3],
},
{
  id: 3,
  size: 2,
  pref: [3],
},
]

const events = [{
  id: 1,
  min: 1,
  max: 3,
  groups: [],
},
{
  id: 2,
  min: 1,
  max: 1,
  groups: [],
},
{
  id: 3,
  min: 1,
  max: 3,
  groups: [],
},
]

let L = [
  {
    id: 1,
    size: 2,
    event: 1,
    gain: 1,
  },
  {
    id: 1,
    size: 2,
    event: 2,
    gain: 0.5,
  },
  {
    id: 1,
    size: 2,
    event: 3,
    gain: 0.33,
  },
  {
    id: 2,
    size: 1,
    event: 2,
    gain: 1,
  },
  {
    id: 2,
    size: 1,
    event: 3,
    gain: 0.5,
  },
  {
    id: 3,
    size: 2,
    event: 3,
    gain: 1,
  },
]

L = L.sort((a, b) => {
  if (a.gain >= b.gain) {
    return 1
  } else {
    return -1
  }
})

const updateL = input => input.list

const input = {
  groups,
  events,
  list: L,
  updateL,
}
module.exports = { input }
