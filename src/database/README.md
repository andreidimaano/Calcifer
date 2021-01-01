<h1 align="center">💾Calcifer Database💾</h1>

>**I'm so sorry but that would be confidential information.**

For Calcifer's database, I used <a href="https://www.mongodb.com/">MongoDB</a> because 1. there's a nice free tier and 2. Google Firestore only works well when you're hosting on Google Firebase 💢😠💢. I've found that <ahttps://mongoosejs.com/>Mongoose</a> is a great library for working with MongoDB in node. Overall, the CRUD operations are pretty simple in MongoDB. The documentation for Mongoose is great. I had a few bumps here and there while working with the callbacks(which totally was not working for me) but I was able to get it to work.

<h1>Users</h1>
<p><a href="https://github.com/andreidimaano/Calcifer/blob/database/src/database/models/User.ts">Users</a> is a collection of users. Each Guild has it's own database populated with its Users. It is made purely for statistics. Click this <a href="https://github.com/andreidimaano/Calcifer/blob/database/src/database/resolvers/GuildResolver.ts">link</a> to look at the Guild database functions (explained below).</p>

<h3>Data Fields</h3>

`discordId: Your Discord Id`<br />
`discordTag: Your Discord Tag`<br />
`minutesStudied: How long you have studied for`<br />

<h3>Create</h3>

If you are not currently in the database, starting and *finishing* a pomodoro will add you to the database.

<h3>Read</h3>

You can query the time you have studied by typing ```c: productivity```. If you do not exist in the database, your time will be 0.

<h3>Update</h3>

Everytime a user starts and *finishes* a pomodoro, the user's total time studied will be updated. If you change your Discord Tag, the bot will still work because I reference your Discord ID, however, I won't be able to look you up on the database if you happen to Private Message me on Discord. 

<h3>Future</h3>

I'm considering adding a field where members can check for their weekly, monthly, and/or yearly time spent studying. It would cost more money though, so I'm not sure.

<h1>Discord Guild</h1>

<p> The <a href="https://github.com/andreidimaano/Calcifer/blob/database/src/database/models/DiscordGuild.ts">Guilds</a> collection contains all the servers that use Calcifer. It is made purely for statistics. Click this <a href="https://github.com/andreidimaano/Calcifer/blob/database/src/database/resolvers/UserResolver.ts">link</a> to look at the Guild database functions (explained below).</p></p>

<h3>Data Fields</h3>

`guildId: Server Identifier`<br />
`guildName: Name of the Server`<br />
`guildOwner: Discord Id of Server Owner (in case I have to reprimand the owner's constituents :)`<br />
`guildMemberCount: How many Users are in the Server`<br />


<h3>Create</h3>

Everytime a client adds a guild to a server, ```client.on('guildCreate')``` will be activated. Upon occurence aforementioned function, Calcifer executes a Create operation that will add information about the new guild to the database. Calcifer exists on a couple servers at the moment. To handle the database addition, I've added a temporary fix for the create function - everytime a user sends a message in one of these servers, the Calcifer checks if the server exists in the database and will add it accordingly.

<h3>Update</h3>

Everytime a new member is added to a guild, ```client.on('guildMemberAdd')``` will be activated and Calcifer will execute an Update operation that will update the guild's member information. The same operation occurs when a member is removed from a guild.
