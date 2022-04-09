<h1> pls read: </h1>
<p>
 I'm amazed at how many people have been using this bot. It's so crazy that this bot has gotten so big. I wrote this code about a year ago and it wasn't built to scale to what it is now. I've exceeded the limitations of my database design. I'll have to redo my database and transfer data. It'll take a while because I'm currently on vacation. When I come back, it'll be better than ever :D
 </p>

<h1 align="center">
 🔥 Calcifer 🔥
</h1>

<p align="center">
  Inspired by my Code With Friends <a href="https://github.com/andreidimaano/rodelo">submission</a>, Calcifer is a Discord Study Bot that allows users to start Pomodoro Timers. Click this <a href="https://discord.com/oauth2/authorize?client_id=781277794826715176&scope=bot">link</a> to add it to your server
</p>

# BUGS

Check out the Issues page for recurring bugs. 
If you are not getting notified of the end of your pomodoro session:
1. I pushed a new version of the bot
2. The Heroku Hosting service I use restarted the server which ends all processes
3. There is a memory issue

Case 3 is rare. You can check for case 1 and 2 by running the command c: productivity. If you were attributed points, then the error happens due to case 1 and 2



# Latest Feature:<br />
Start a group pomodoro!

```c: group [time]```

### Get Started With Group Pomodoros:
1. Create a separate text channel whose channel name contains the word 'group'
2. Create a separate voice channel whose channel name contains the word 'group'
3. Connect to the voice channel
4. Type `c: group [time]` in the text channel

### Rules for starting a Group Pomodoro
1. Must have a separate text channel that contains the word 'group' 
2. Must have a voice channel that contains the word 'group'
3. Must be connected to the voice channel that contains the word 'group'
4. A Group Pomodoro must not already be in progress

# All Commands:<br />
`c: pomodoro`<br />
`c: pomodoro [time]`<br />
`c: pom`<br />
`c: pom pom`<br />
`c: pom [time] break [time]`<br />
`c: group [time]`<br />
`c: cancel`<br />
`c: productivity`<br />
`c: help`<br />
`c: cook `<br />

# Current Features

### 🍅 Pomodoro
Start a Pomodoro Timer
<br />
`c: pomodoro` start a 25 minute timer (default timer)<br />
`c: pomodoro [time]` start a [time] minute timer || time must be within 10 - 120<br />
`c: pom` start a 25 minute timerbr />
`c: pom [time]` start an x minute timer <br />
`c: pom pom`<br /> start a 50 minutes timer
`c: pom [time] break [time]`<br /> start an x minute timer and y minute break
`c: group [time]`<br /> start a group timer with friends!
`c: cancel` cancel your work timer or break timer <br />

### 📊 Productivity
View your Stats! The database is finally here. Start some pomodoros and you'll accumulate working hours. To see how much you've been working run the productivity command.
<br /><br />
`c: productivity` will return total amount of time studied
<br />

### :information_source: Help
Need some help? I've added a list of commands to get you started. I've also updated the bot's status. It now displays the help command
<br /><br />
`c: help` will return a list of helpful commands.
<br />

# Future

In the future, I will be implementing a function to check how much time is left on the timer.
If you have any requests, feel free to add them in Issues

I'm currently testing the bot to see how much it would cost to make it available to the general public. I'm only in college, and I don't make money LOL. If you would like to sponsor server fees, Let me Know! :D
