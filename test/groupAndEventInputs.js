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
  {
    id: 13,
    size: 1,
    pref: [551, 1, 53],
  },
  {
    id: 14,
    size: 1,
    pref: [551, 1],
  },
  {
    id: 15,
    size: 1,
    pref: [551],
  },
  {
    id: 44,
    size: 1,
    pref: [53],
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
  groups: [1124],
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
  min: 4,
  max: 5,
  groups: [53],
},
{
  id: 25,
  min: 1,
  max: 5,
  groups: [],
},
{
  id: 53,
  min: 2,
  max: 5,
  groups: [13, 44],
},
{
  id: 1,
  min: 1,
  max: 5,
  groups: [13, 14],
},
{
  id: 551,
  min: 3,
  max: 5,
  groups: [13, 14, 15],
}]

const assignment = [{
  id: 1124,
  assignment: 12,
},
{
  id: 53,
  assignment: -1,
},
{
  id: 332,
  assignment: -1,
},
{
  id: 33,
  assignment: -1,
},
{
  id: 13,
  assignment: 551,
},
{
  id: 14,
  assignment: -1,
},
{
  id: 15,
  assignment: -1,
},
{
  id: 44,
  assignment: -1,
}]

module.exports = { groups, eventWithGroups, assignment }
