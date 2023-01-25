import { Person } from "../db";
import { Gender, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ['query', 'info'] });

const Query = {
  async person(parent: any, args: any, ctx: any, info: any) {
    // const person = ctx.persons.find((p: Person) => p.id === args.id);
    const person = await prisma.person.findUnique({
      where: {
        id: parseInt(args.id)
      },
    })
    if (!person) {
      throw new Error("Person not found!");
    }
    return person;
  },

  async people(parent: any, args: any, ctx: any, info: any) {
    let people = [];
    if (!args.filter) {
      people = await prisma.person.findMany()
      return people;
    }
    const { age, gender, status } = args.filter;
    const enumGender = gender + "" === 'MALE' ? Gender.MALE : gender + "" === 'FEMALE' ? Gender.FEMALE : Gender.OTHER;

    let query = {};

    if (age && gender && status) {
      query = {
        where: {
          age: {
            equals: age,
          },
          AND: {
            gender: {
              equals: enumGender,
            },
            status: {
              equals: status,
            },
          },
        },
      }
    } else if (age) {
      query = {
        where: {
          age: {
            equals: age,
          },
        },
      }

      if (gender) {
        query = {
          where: {
            age: {
              equals: age,
            },
            AND: {
              gender: {
                equals: enumGender,
              }
            },
          },
        }
      }

      if (status) {
        query = {
          where: {
            age: {
              equals: age,
            },
            AND: {
              status: {
                equals: status,
              },
            },
          },
        }
      }
    } else if (gender) {
      query = {
        where: {
          gender: {
            equals: enumGender,
          },
        },
      }
      if (status) {
        query = {
          where: {
            gender: {
              equals: enumGender,
            },
            AND: {
              status: {
                equals: status,
              },
            },
          },
        }
      }
    } else if (status) {
      query = {
        where: {
          status: {
            equals: status,
          },
        },
      }
    }

    people = await prisma.person.findMany(query);
    return people.length ? people : [];
  },
};

const Person = {
  parents(parent: any, args: any, ctx: any, info: any){
    console.log(parent)
  }
}

export default Query;
