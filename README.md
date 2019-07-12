# eventassigner-js
An NPM package to assign groups / persons to events based on their preference

# How to use version 0.1.*

## Install the package

```Bash
npm install --save eventassigner-js
```

## Require the package 

```javascript
const ea = require('eventassigner-js')
```

## Define event assignment problem

function ea.eventAssignment(input) takes an object which has to following fields

groups: list of objects whose each entry must have the following fields 
1. id: unique identifier
2. size: size of the group. Must be a number
3. pref: Array whose elements maps to event identifiers. Must be at least an empty array.

events: list of objects whose each entry must have the following fields
1. id: unique identfier. -1 can not be an id
2. min: minimum number of attendees the event needs for it to happen. Must be a number.
3. max: maximum number of attendees the event can hold. Must be a number.
4. groups: groups that are attending to this event. Must be at least an empty array.

list: list of objects whose each entry must have the following fields. 
1. id: id of a group
2. size: size of the group
3. event: id of the event where to assign the group
4. gain: Numeric value which describes how much the algorithm gains if this group is assigned to this event

This list is traversed in the optimization starting from the last index and moving towards the first index with
Array.prototype.pop() function. At least currently the algorithm does not sort the list. Any list element with gain: 0
is removed before any optimization happens.

updateL: a function which takes an object as a input and returns a new list. This function is called every time handling one entry in 'list'
does not result to a new assignment and, thus, the function can be used to update the gains in 'list' during the optimization. The input to the function
includes following fields
1. groups: same as the input 
2. events, same as the input
3. assignment: current assignment which has the following fields
..1.  id: group id
..2. assignment: the events id where this group is assigned. -1 means no assignment
4. unassignedGroups: groups that are not assigned. Has the same fields as an entry in 'groups'
5. deficit: number which describes how many places there is deficit i.e. the sum of the minimum amount of attendees in every event that is not yet happening but have at least one attendee because there is less than minimum number of attendees minus the amount of players in those events
6. list: current 'list' array

updateL()-function must return a list object. Minimum working function is

```javascript
const updateL = input => input.list
```
## Call the eventAssignment function

```javascript
const assignment = ea.eventAssignment(input)
```

## Evaluate output

upon successful run eventAssignment() function returns the assignment array of objects whose every entry has following fields
1.  id: group id
2. assignment: the events id where this group is assigned. -1 means no assignment

The function returns 0 if the input is not correct. 

If the input is correct but for some reason the assignment is not correct the return value
is an object whose fields are
1. result: 0 i.e. the assignment is not correct
2. events: events that have either less than minimum number of players assigned to them and are not happening or events that have more than maximum number of players assigned to them.
3. flag: string which describes what went wrong

The assignment can be wrong if
1. There is less than minimum number of players assigned to any event.
2. There is more than max number of players assigned to any event.

# Working example

```javascript
const ea = require('eventassigner-js');

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

const input = {groups,
events,
list: L,
updateL}

const arrangement = ea.eventAssignment(input)

console.log(arrangement)
```