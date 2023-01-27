import { Person } from "../db";
import {
  addChildrenToParents,
  addParentstoChildren,
  deleteChildrenFromParents,
  deleteChildrenFromParentsUpdate,
  deleteParentsFromChildren,
  deleteParentsFromChildrenUpdate,
  updateChildrenOfParents,
  updateParentsOfChildren
} from "../utils/mutateRelationship";
import { pubsub, prisma } from "../index";

const Mutation = {
  async createPerson(parent: any, args: any, ctx: any, info: any) {
    args.input.id = parseInt(args.input.id);
    let personToCreate = {
      ...args.input,
    };

    let children: number[] = [];
    if (args.input.children) {
      children = args.input.children.map((id) => parseInt(id));
    }

    let parents: number[] = [];
    if (args.input.parents) {
      parents = args.input.parents.map((id) => parseInt(id));
    }
    personToCreate = {
      ...personToCreate,
      children,
      parents,
    };

    const createPerson = await prisma.person.create({ data: personToCreate })

    if (createPerson.parents) {
      addChildrenToParents(createPerson);
    }

    if (createPerson.haveChild && createPerson.children) {
      addParentstoChildren(createPerson);
    }
    pubsub.publish("CREATED", {
      createPerson: { ...personToCreate, children, parents },
    });
    return personToCreate;
  },
  async updatePerson(parent: any, args: any, ctx: any, info: any) {
    console.log("input", args.input)

    const id = parseInt(args.id);
    let person = await prisma.person.findUnique({
      where: {
        id: id
      }
    })

    let missingChildren = [];
    let missingParents = [];
    if (args.input.children) {
      args.input.children = args.input.children.map((c) => Number(c));
      missingChildren = person.children.filter(item => args.input.children.indexOf(item) < 0);
      console.log("missing child", missingChildren)
    }

    if (args.input.parents) {
      args.input.parents = args.input.parents.map((p) => Number(p));
      missingParents = person.parents.filter(item => args.input.parents.indexOf(item) < 0);
      console.log("missing parent", missingParents)
    }

    if (missingChildren.length !== 0) {
      console.log("is in missing child")
      missingChildren.map(async (c) => {
        let missed = await prisma.person.findUnique({
          where: {
            id: c
          }
        })
        deleteParentsFromChildrenUpdate(missed, person.id);
      })
    }

    if (missingParents.length !== 0) {
      console.log("is in missing parent")
      missingParents.map(async (p) => {
        let missed = await prisma.person.findUnique({
          where: {
            id: p
          }
        })
        deleteChildrenFromParentsUpdate(missed, person.id);
      })
    }

    person.firstname = args.input.firstname ?? person.firstname;
    person.lastname = args.input.lastname ?? person.lastname;
    person.gender = args.input.gender ?? person.gender;
    person.status = args.input.status ?? person.status;
    person.age = args.input.age ?? person.age;
    person.birthdate = args.input.birthdate ?? person.birthdate;
    person.haveChild = args.input.haveChild ?? person.haveChild;
    person.children = args.input.children ?? person.children;
    person.parents = args.input.parents ?? person.parents;

    if (args.input.children) {
      addParentstoChildren(person);
    }

    if (args.input.parents) {
      addChildrenToParents(person);
    }

    const updatePerson = await prisma.person.update({
      where: {
        id: id
      }
      , data: {
        firstname: person.firstname,
        lastname: person.lastname,
        gender: person.gender,
        status: person.status,
        age: person.age,
        birthdate: person.birthdate,
        haveChild: person.haveChild,
        children: person.children,
        parents: person.parents
      }
    })


    pubsub.publish("UPDATED", { updatePerson: updatePerson });
    return updatePerson;
  },
  async deletePerson(parent: any, args: any, ctx: any, info: any) {
    const id = parseInt(args.id);
    const deletePerson = await prisma.person.delete({
      where: {
        id: id
      },
    })

    if (deletePerson.haveChild && deletePerson.children) {
      deleteParentsFromChildren(deletePerson);
    }

    if (deletePerson.parents) {
      deleteChildrenFromParents(deletePerson)
    }

    pubsub.publish("DELETED", {
      deletePerson: deletePerson,
    });
    return deletePerson;
  },
};

export default Mutation;
