export let removeMember = (array: string[], author_tag: string) :string[] => {
    let index = array.indexOf(author_tag);
    if(index > -1) {
        return array.splice(index, 1);
    }

    return array;
};

export let printArray = (array: string[]) : void => {
    console.log(array);
}