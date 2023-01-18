import { Person } from "../db";

const Query = {
  person(parent: any, args: any, ctx: any, info: any) {
    const person = ctx.persons.find((p: Person) => p.id === args.id);
    if (!person) {
      throw new Error("Person not found!");
    }
    return person;
  },
  people(parent: any, args: any, ctx: any, info: any) {
    if (!args.filter) {
      return ctx.persons;
    }
    const { age, gender, status } = args.filter;
    let people: Person[] = [];

    if (!age && !gender && !status) {
      return ctx.persons;
    }

    if (age) {
      const filteredByAge: Person[] = ctx.persons.filter(
        (person: Person) => person.age === age
      );
      people = filteredByAge;
    }
    if (gender) {
      people = age ? people : ctx.persons;
      const filteredByGender: Person[] = people.filter((person: Person) =>
        gender.includes(person.gender)
      );
      people = filteredByGender;
    }
    if (status) {
      people = people.length ? people : ctx.persons;
      const filteredByStatus: Person[] = people.filter(
        (person: Person) => person.status === status
      );
      people = filteredByStatus;
    }
    return people.length ? people : [];
  },
};

export default Query;
