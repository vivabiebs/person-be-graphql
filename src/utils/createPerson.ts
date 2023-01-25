import { Person } from "../db";
import Mutation from "../resolvers/mutation";
import Query from "../resolvers/query";


const addChildren = (newPerson: any) => {
  const children: number[] = [];
  newPerson.children.forEach((id: number) => {
    // let child = Query.person(id);
    // if (child) {
      //if exist : assign parent of this child , which is this newPerson
      // persons[childIndex] = {
      //   ...persons[childIndex],
      //   parents: [...persons[childIndex].parents, newPerson.id],
      // };
    // }
  })
  return children;
};

const addParents = (newPerson: any) => {
  const parents: number[] = [];
  // newPerson.parents.forEach((parent: Person) => {
  //   const parentIndex = persons.findIndex(
  //     (person: Person) => parent.id === person.id
  //   );
  //   if (parentIndex === -1) {
  //     parent.children = [newPerson.id];
  //     persons.push(parent);
  //   }
  //   else {
  //     persons[parentIndex].children = [...persons[parentIndex].children, newPerson.id];
  //   }
  // });
  return parents;
};

export { addChildren, addParents };

// const a = {
  // async addChildren(newPerson: any, persons: Person[]) {
  //   const children: number[] = [];

    // newPerson.children.forEach((id: number) => {
    //   let child = await Query.person(id);
    //   if (!child) {
        //   child = { ...child, children: [], parents: [] };
        //   const newChildPerson = {
        //     ...child,
        //     parents: [newPerson.id],
        //     children: child.children ?? [],
        //   };

        //   persons.push(newChildPerson);
    //   } else {

    //   }
    // },

    // newPerson.children.forEach((child: Person) => {
    //   const childIndex = persons.findIndex(
    //     (person: Person) => person.id === child.id
    //   );

      //find if this child exist
      // if (childIndex === -1) {
      //   //if not : create new one
      //   child = { ...child, children: [], parents: [] };
      //   const newChildPerson = {
      //     ...child,
      //     parents: [newPerson.id],
      //     children: child.children ?? [],
      //   };

      //   persons.push(newChildPerson);
      // }
      // else {
      //   //if exist : assign parent of this child , which is this newPerson
      //   persons[childIndex] = {
      //     ...persons[childIndex],
      //     parents: [...persons[childIndex].parents, newPerson.id],
      //   };
      // }

    //   children.push(parseInt(child.id));
    // });
    // return children;
  // },

  // async addParents(newPerson: any, persons: Person[]) {
  //   const parents: string[] = [];
  //   newPerson.parents.forEach((parent: Person) => {
  //     const parentIndex = persons.findIndex(
  //       (person: Person) => parent.id === person.id
  //     );
  //     if (parentIndex === -1) {
  //       parent.children = [newPerson.id];
  //       persons.push(parent);
  //     }
  //     else {
  //       persons[parentIndex].children = [...persons[parentIndex].children, newPerson.id];
  //     }
  //     parents.push(parent.id);
  //   });
  //   return parents;
  // }
// },

  // export { addChildren, addParents };