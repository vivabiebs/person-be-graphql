import { Person } from "../db";

const addParentstoChildren = (
  id: string,
  children: string[],
  people: Person[]
) => {
  let parents = [];
  children.forEach((child) => {
    people.forEach((person, i) => {
      if (child === person.id) {
        parents = [...person.parents, id];
        people[i].parents = parents;
      }
    });
  });
};

const addChildrenToParents = (
  id: string,
  parents: string[],
  people: Person[]
) => {
  let children = [];
  parents.forEach((parent) => {
    people.forEach((person, i) => {
      if (parent === person.id) {
        children = [...person.children, id];
        people[i].children = children;
      }
    });
  });
};

const deleteRelationship = (
  person: Person,
  people: Person[],
  childrenIds: string[],
  parentsIds: string[]
) => {
  person.children.forEach((child) => {
    if (!childrenIds.includes(child)) {
      const index = findPersonIndex(child, people);
      people[index].parents = filter(
        people[index].parents.slice(),
        person.id
      );
    }
  });
  person.parents.forEach((parent) => {
    if (!parentsIds.includes(parent)) {
      const index = findPersonIndex(parent, people);
      people[index].children = filter(
        people[index].children.slice(),
        person.id
      );
    }
  });
};

const findPersonIndex = (id: string, people: Person[]) => {
  const index = people.findIndex((person: Person) => {
    return person.id === id;
  });

  return index;
};

const filter = (input: string[], id: string) => {
  const array = input.filter((o) => o !== id);
  return array;
};

export { addParentstoChildren, addChildrenToParents, deleteRelationship };
