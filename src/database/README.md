<h1 align="center">💾Calcifer Database💾</h1>

>I'm so sorry but that would be confidential information.

<h1>Guild Users</h1>
Guild Users is a collection of users. Each Guild has it's own database populated with its Users. It is made purely for statistics.

<h3>Data Fields</h3>

`discordId: Your Discord Id`<br />
`discordTag: Your Discord Tag`<br />
`minutesStudied: How long you have studied for`<br />

<h3>Create</h3>

Everytime a user starts and *finishes* a pomodoro, the user's total time studied will be updated. 

<h3>Read</h3>

You can query the time you have studied by typing ```c: productivity```.

<h3>Update</h3>

Everytime a user starts and *finishes* a pomodoro, the user's total time studied will be updated. If you change your Discord Tag, the bot will still work because I reference your Discord ID, however, I won't be able to look you up on the database if you happen to Private Message me on Discord. 

<h3>Future</h3>

I'm considering adding a field where members can check for their weekly, monthly, and/or yearly time spent studying. It would cost more money though, so I'm not sure.

<h1>Discord Guild</h1>

The Guilds collection contains all the servers that use Calcifer. It is made purely for statistics.

<h3>Data Fields</h3>

`guildName: Name of the Server`<br />
`guildOwner: Discord Id of Server Owner (in case I have to reprimand the owner's constituents :)`<br />
`guildMemberCount: How many Users are in the Server`<br />


<h3>Create</h3>

Everytime a client adds a guild to a server, ```client.on('guildCreate')``` will be activated. Upon occurence aforementioned function, Calcifer executes a Create operation that will add information about the new guild to the database.

<h3>Update</h3>

Everytime a new member is added to a guild, ```client.on('guildMemberAdd')``` will be activated. Upon occurence of aforementioned function, Calcifer executes an Update operation that will update the guild's member information. The same operation occurs when a member is removed from a guild.
