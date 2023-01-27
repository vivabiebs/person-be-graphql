
import { Gender } from "@prisma/client";
import { prisma } from "../index";

const Query = {
  async person(parent: any, args: any, ctx: any, info: any) {
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
      people = await prisma.person.findMany({
        orderBy:
        {
          id: 'asc',
        },
      })
      return people;
    }
    const { age, gender, status } = args.filter;
    const enumGender = gender + "" === 'MALE' ? Gender.MALE : gender + "" === 'FEMALE' ? Gender.FEMALE : Gender.OTHER;

    let query = {};
    if (!age && !gender && !status) {
      people = await prisma.person.findMany({
        orderBy:
        {
          id: 'asc',
        },
      })
      return people;
    }

    if (age && gender && status) {
      query = {
        orderBy:
        {
          id: 'asc',
        },
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
        orderBy:
        {
          id: 'asc',
        },
        where: {
          age: {
            equals: age,
          },
        },
      }

      if (gender) {
        query = {
          orderBy:
          {
            id: 'asc',
          },
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
          orderBy:
          {
            id: 'asc',
          },
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
        orderBy:
        {
          id: 'asc',
        },
        where: {
          gender: {
            equals: enumGender,
          },
        },
      }
      if (status) {
        query = {
          orderBy:
          {
            id: 'asc',
          },
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
        orderBy:
        {
          id: 'asc',
        },
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

export default Query;
