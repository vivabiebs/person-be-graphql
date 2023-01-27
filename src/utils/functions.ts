function removeElement(arr: number[], element: number) {
    const index = arr.findIndex((i) => i === element);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
};

function filterDup(arr: number[]) {
    return arr = arr.filter((value, index) => arr.indexOf(value) === index);
}

export {
    removeElement,
    filterDup
};