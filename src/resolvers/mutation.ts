import { Person } from "../db";
import { addChildren, addParents } from "../utils/createPerson";
import { pubsub } from "../index";
import {
  addChildrenToParents,
  addParentstoChildren,
  deleteRelationship,
} from "../utils/addRelation";

const Mutation = {
  createPerson(parent: any, args: any, ctx: any, info: any) {
    let personToCreate = {
      ...args.input,
    };

    let children: string[] = [];
    if (personToCreate.haveChild && personToCreate.children) {
      children = addChildren(personToCreate, ctx.persons);
    }

    let parents: string[] = [];
    if (personToCreate.parents) {
      parents = addParents(personToCreate, ctx.persons);
    }
    personToCreate = {
      ...personToCreate,
      children,
      parents,
    };

    ctx.persons.push(personToCreate);
    pubsub.publish("CREATED", {
      createPerson: { ...personToCreate, children, parents },
    });
    return personToCreate;
  },
  updatePerson(parent: any, args: any, ctx: any, info: any) {
    const person: Person = ctx.persons.find(
      (person: Person) => person.id === args.id
    );

    if (!person) {
      throw new Error("Person not found!");
    }

    person.firstname = args.input.firstname ?? person.firstname;
    person.lastname = args.input.lastname ?? person.lastname;
    person.gender = args.input.gender ?? person.gender;
    person.status = args.input.status ?? person.status;
    person.age = args.input.age ?? person.age;
    person.birthdate = args.input.birthdate ?? person.age;
    person.haveChild = args.input.haveChild ?? person.haveChild;

    let childrenIds = [];
    if (args.input.children) {
      args.input.children.forEach((child: Person) => {
        childrenIds.push(child.id);
      });

      addParentstoChildren(person.id, childrenIds, ctx.persons);
    }

    let parentsIds = [];
    if (args.input.parents) {
      args.input.parents.forEach((parent: Person) => {
        parentsIds.push(parent.id);
      });

      addChildrenToParents(person.id, parentsIds, ctx.persons);
    }
    deleteRelationship(person, ctx.persons, childrenIds, parentsIds);
    person.children = args.input.children ? childrenIds : person.children;
    person.parents = args.input.parents ? parentsIds : person.parents;

    pubsub.publish("UPDATED", { updatePerson: person });
    return person;
  },
  deletePerson(parent: any, args: any, ctx: any, info: any) {
    const personIndex = ctx.persons.findIndex(
      (person: Person) => person.id === args.id
    );
    if (personIndex === -1) {
      throw new Error("Person not found!");
    }
    const deletePerson: Person = ctx.persons.splice(personIndex, 1);

    for (let i = 0; i < ctx.persons.length; i++) {
      const person: Person = ctx.persons[i];
      if (person.parents.includes(deletePerson[0].id)) {
        person.parents = person.parents.filter(
          (p, i) => p[i] !== deletePerson[0].id
        );
      }
      if (person.children.includes(deletePerson[0].id)) {
        person.children = person.children.filter(
          (c, i) => c[i] !== deletePerson[0].id
        );
      }
    }

    pubsub.publish("DELETED", {
      deletePerson: deletePerson[0],
    });
    return deletePerson[0];
  },
};

export default Mutation;
