import { Person } from "../db";
import * as _ from 'lodash';

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

function reCheck(arr: Person[]){
    arr.map((p)=>{
        if(p.haveChild){
            console.log(p.firstname, p.children.length)
            if(p.children.length===0) p.haveChild=false;
        }
    })
    return arr;
}

export {
    removeElement,
    filterDup,
    reCheck
};