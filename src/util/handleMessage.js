let prefix = "c: ";
let parseArguments = (messageContent) => {
  let content = messageContent.slice(prefix.length);
  let args = content.split(" ").filter((argument) => argument.length > 0);
  let workTime = 0,
    breakTime = 0;
  let command = args[0].toLowerCase();
  let isGroup = false;

  if (args.length >= 4 && args[2] === "break") {
    let parsedWorkTime = parseInt(args[1]);
    let parsedBreakTime = parseInt(args[3]);
    workTime = isNaN(parsedWorkTime) ? 0 : parsedWorkTime;
    breakTime = isNaN(parsedBreakTime) ? 0 : parsedBreakTime;
  } else if (args.length >= 2) {
    if (
      (args.length === 3 &&
        command === "group" &&
        args[1] === "pom" &&
        args[2] === "pom") ||
      (command == "pom" && args[1] === "pom")
    ) {
      workTime = 50;
    } else if (command === "group" && args[1] === "pom") {
      workTime = 25;
    } else if (command === "cancel" && args[1] === "group") {
      isGroup = true;
    } else {
      workTime = parseInt(args[1]);
    }
  }

  if (
    args[0].toLowerCase() === "group" &&
    args[1] &&
    args[1].toLowerCase() === "cancel"
  ) {
    command = "cancel";
    workTime = 0;
    breakTime = 0;
    isGroup = true;
  }

  return {
    command: command,
    work: workTime,
    rest: breakTime,
    isGroup: isGroup,
  };
};

let invalidMessage = (message) => {
  return !message.content.toLowerCase().startsWith(prefix);
};
let handleMessage = (message) => {
  let options = null;

  if (!message.guild) return options;
  if (invalidMessage(message)) return options;

  return parseArguments(message.content.toLowerCase());
};

module.exports = {
  handleMessage,
};
