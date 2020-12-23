export let canceledPomodoroMembers: string[] = [];

export let isCanceledPomodoro = (author_tag: string) :boolean => {
    return (canceledPomodoroMembers.find(member_tag => member_tag === author_tag)) ? true : false;
};