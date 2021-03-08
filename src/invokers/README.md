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


