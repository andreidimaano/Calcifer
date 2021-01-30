export let canceledPomodoroMembers: string[] = [];
export let canceledBreakMembers: string[] = [];

export let isCanceledBreak = (author_tag: string) :boolean => {
    return (canceledBreakMembers.find(member_tag => member_tag === author_tag)) ? true : false;
};

export let isCanceledPomodoro = (author_tag: string) :boolean => {
    return (canceledPomodoroMembers.find(member_tag => member_tag === author_tag)) ? true : false;
};

