export let currentMembersOnBreak: string[] = [];

export let currentlyOnBreak = (author_tag: string) :boolean => {
    return (currentMembersOnBreak.find(member_tag => member_tag === author_tag)) ? true : false;
};
