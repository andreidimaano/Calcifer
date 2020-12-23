export let currentMembersWorking: string[] = [];

export let removeMemberWorking = (array: string[], author_tag: string) :string[] => {
    let index = array.indexOf(author_tag);
    if(index > -1) {
        return array.splice(index, 1);
    }

    return array;
};

export let currentlyWorking = (author_tag: string) :boolean => {
    console.log(currentMembersWorking);
    return (currentMembersWorking.find(member_tag => member_tag === author_tag)) ? true : false;
};