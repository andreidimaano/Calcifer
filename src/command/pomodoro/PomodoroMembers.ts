export let currentMembersStudying: string[] = [];

export let removeMember = (array: string[], author_tag: string) :string[] => {
    let index = array.indexOf(author_tag);
    if(index > -1) {
        return array.splice(index, 1);
    }

    return array;
};

export let currentlyStudying = (author_tag: string) :boolean => {
    console.log(currentMembersStudying);
    return (currentMembersStudying.find(member_tag => member_tag === author_tag)) ? true : false;
};