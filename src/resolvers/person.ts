import persons from "../db";

const Person = {
  children(parent: any, args: any, ctx: any, info: any) {
    let people = ctx ? ctx.persons : persons;
    const child = people.filter((person) => {
      return parent.children.includes(person.id);
    });

    return child.length ? child : null;
  },
  parents(parent: any, args: any, ctx: any, info: any) {
    let people = ctx ? ctx.persons : persons;
    const parents = people.filter((person) => {
      return parent.parents.includes(person.id);
    });

    return parents.length ? parents : null;
  },
};

export default Person;
