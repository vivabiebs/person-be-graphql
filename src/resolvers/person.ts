import { prisma } from "../index";

const Person = {
  async children(parent: any, args: any, ctx: any, info: any) {
    if (!parent.children?.length) return null;
    const children = await Promise.all(parent.children.map(async (p) => {
      return await prisma.person.findUnique({
        where: {
          id: p
        },
      })
    }))
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
    return parents;
  },
};

export default Person;
