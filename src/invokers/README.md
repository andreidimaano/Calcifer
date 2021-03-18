### ParseArguments

The parser goes from string to array to another array. 
```let args = content.split(' '); ```
We first split the string into an array based on the ' ' character. However if a user types `c:  pom  20`, the array becomes 
```["", "pom", "", "20"]```.
Thus, if we only using the .split() method, errors occur. We want the array to become `["pom", "20"]`. In order to achieve this, we need to trim get rid of all the empty strings in the array.
```let args = content.split(' ').filter((argument) =>  argument.length > 0 );```.


### Group Pom
I forgot to take into account user behavior for group poms. I created macros `c: pom ` and `c: pom pom`. The current code works only for these macros but does not work for the group pom.

Breaking down the structure of the parser function, we see that for `c: group pom`, the array becomes `["group", "pom"]`. arg[1] is now 'pom' which sets the work time to 50.

We can instead break down the pom into different states and then reduce the states based on similarities.

Current States:
- c: pom
- c: pom pom
- c: pom 20
- c: pom 20 break 20
- c: group 20
- c: group pom
- c: group pom pom
- c: help
- c: cook
- c: cancel
- c: productivity

We can group the states based on output:

| just commands: | timers 1: | timers 2: | timers 3: | timers 4:
| --- | --- | --- | --- | --- |
| `c: pom` </br> `c: help` </br> `c: cook` </br> `c: cancel` </br> `c: productivity` | `c: pom 20 break 20` | `c: group pom` | `c: pom 20` </br> `c: group 20` | `c: group pom pom` </br> `c: pom pom` |

timers 1 and 2 are edge cases. timers 3 and 4 group outputs based on whether we parseInt or if we manually set workTime.
Basing the states based on output means we can group conditions based on What the worktime will be.
