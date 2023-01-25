import persons from "../db";
// import { Person } from "../db";
import { Gender, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ['query', 'info'] });

const Person = {
  async children(parent: any, args: any, ctx: any, info: any) {
    // let people = ctx ? ctx.persons : persons;
    // const child = people.filter((person) => {
    //   return parent.children.includes(person.id);
    // });

    // return child.length ? child : null;

    if (!parent.children?.length) return null;
    const children = await Promise.all(parent.children.map(async (p) => {
      return await prisma.person.findUnique({
        where: {
          id: p
        },
      })
    }))
    // let parents = parent.parents[0];
    // const person = await prisma.person.findUnique({
    //   where: {
    //     id: parents
    //   },
    // })
    console.log(children)
    return children;
  },
  async parents(parent: any, args: any, ctx: any, info: any) {
    console.log(parent)
    if (!parent.parents?.length) return null;
    const parents = await Promise.all(parent.parents.map(async (p) => {
      return await prisma.person.findUnique({
        where: {
          id: p
        },
      })
    }))
    // let parents = parent.parents[0];
    // const person = await prisma.person.findUnique({
    //   where: {
    //     id: parents
    //   },
    // })
    console.log(parents)
    return parents;
    // let people = ctx ? ctx.persons : persons;
    // const parents = people.filter((person) => {
    //   return parent.parents.includes(person.id);
    // });

    // return parents.length ? parents : null;
  },
};

export default Person;
