import { Person } from "../db";

const addChildren = (newPerson: any, persons: Person[]) => {
  const children: string[] = [];

  newPerson.children.forEach((child: Person) => {
    const childIndex = persons.findIndex(
      (person: Person) => person.id === child.id
    );
    
    if (childIndex === -1) {
      child = { ...child, children: [], parents: [] };
      const newChildPerson = {
        ...child,
        parents: [newPerson.id],
        children: child.children ?? [],
      };

      persons.push(newChildPerson);
    }
    else {
      persons[childIndex] = {
        ...persons[childIndex],
        parents: [...persons[childIndex].parents, newPerson.id],
      };
    }

    children.push(child.id);
  });
  return children;
};

const addParents = (newPerson: any, persons: Person[]) => {
  const parents: string[] = [];
  newPerson.parents.forEach((parent: Person) => {
    const parentIndex = persons.findIndex(
      (person: Person) => parent.id === person.id
    );
    if (parentIndex === -1) {
      parent.children = [newPerson.id];
      persons.push(parent);
    }
    else {
      persons[parentIndex].children = [...persons[parentIndex].children, newPerson.id];
    }
    parents.push(parent.id);
  });
  return parents;
};

export { addChildren, addParents };
