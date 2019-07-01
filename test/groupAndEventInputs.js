const groups = [
  {
    id: 1124,
    size: 5,
    pref: [12, 25, 2],
  },
  {
    id: 53,
    size: 2,
    pref: [12, 22, 2],
  },
  {
    id: 332,
    size: 1,
    pref: [1, 52, 3],
  },
  {
    id: 33,
    size: 2,
    pref: [3, 4, 5],
  },
]

const eventWithGroups = [{
  id: 2,
  min: 1,
  max: 5,
  groups: [53],
},
{
  id: 3,
  min: 1,
  max: 5,
  groups: [332, 33],
},
{
  id: 4,
  min: 1,
  max: 5,
  groups: [],
},
{
  id: 5,
  min: 1,
  max: 5,
  groups: [],
},
{
  id: 12,
  min: 1,
  max: 5,
  groups: [1124],
},
{
  id: 22,
  min: 1,
  max: 5,
  groups: [],
},
{
  id: 25,
  min: 1,
  max: 5,
  groups: [],
},
{
  id: 53,
  min: 1,
  max: 5,
  groups: [],
},
{
  id: 1,
  min: 1,
  max: 5,
  groups: [],
}]

module.exports = { groups, eventWithGroups }
