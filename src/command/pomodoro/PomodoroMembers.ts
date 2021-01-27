export let currentMembersWorking: string[] = [];

export let currentlyWorking = (author_tag: string) :boolean => {
    return (currentMembersWorking.find(member_tag => member_tag === author_tag)) ? true : false;
};