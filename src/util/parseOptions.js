let parseInteractionOptions = (options) => {
  let parsed = { work: null, rest: null, error: { pom: "", rest: "" } };

  options.forEach((option) => {
    if (option.name === "break") {
      parsed.rest = option.value;
    } else {
      parsed[option.name] = option.value;
    }
  });

  if (parsed.work !== null && (parsed.work < 10 || parsed.work > 120)) {
    parsed.work = 25;
    parsed.error.pom =
      "\n```Error: work time specified is not within work time limits\nFix: work time set to 25```";
  }

  if (
    parsed.rest !== null &&
    parsed.rest !== 0 &&
    (parsed.rest > 30 || parsed.rest < 5)
  ) {
    parsed.rest = 5;
    parsed.error.rest =
      "\n```Error: break time is not within break time limits\nFix: break time set to 5```";
  }

  if (parsed.work === null) {
    parsed["work"] = 25;
  }

  return parsed;
};

let parseMessageOptions = (work, rest) => {
  let parsed = { work: work, rest: rest, error: { pom: "", rest: "" } };

  if (parsed.work !== null && (parsed.work < 10 || parsed.work > 120)) {
    parsed.work = 25;
    parsed.error.pom =
      "\n```Error: work time specified is not within work time limits\nFix: work time set to 25```";
  }

  if (
    parsed.rest !== null &&
    parsed.rest !== 0 &&
    (parsed.rest > 30 || parsed.rest < 5)
  ) {
    parsed.rest = 5;
    parsed.error.rest =
      "\n```Error: break time is not within break time limits\nFix: break time set to 5```";
  }

  if (parsed.work === null) {
    parsed["work"] = 25;
  }

  return parsed;
};

module.exports = {
  parseInteractionOptions,
  parseMessageOptions,
};
