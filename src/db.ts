enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
  OTHER = "OTHER"
}

enum Status {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
}

export enum MutationType {
  CREATED = "CREATED",
  DELETED = "DELETED",
  UPDATED = "UPDATED",
}

interface Person {
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: Gender;
  status: Status;
  birthdate: string;
  haveChild: boolean;
  children: number[];
  parents: number[];
}

let persons: Person[] = [
  {
    id: "1",
    firstname: "Viva",
    lastname: "Biebs",
    age: 23,
    gender: Gender.FEMALE,
    status: Status.SINGLE,
    birthdate: "09-05-2000",
    haveChild: false,
    children: [],
    parents: [2, 3],
  },
  {
    id: "2",
    firstname: "Mom",
    lastname: "Biebs",
    age: 47,
    gender: Gender.FEMALE,
    status: Status.MARRIED,
    birthdate: "13-08-1976",
    haveChild: true,
    children: [1, 4],
    parents: [],
  },
  {
    id: "3",
    firstname: "Dad",
    lastname: "Biebs",
    age: 52,
    gender: Gender.MALE,
    status: Status.MARRIED,
    birthdate: "24-04-1971",
    haveChild: true,
    children: [1, 4],
    parents: [],
  },
  {
    id: "4",
    firstname: "Geena",
    lastname: "Biebs",
    age: 21,
    gender: Gender.OTHER,
    status: Status.SINGLE,
    birthdate: "14-03-2002",
    haveChild: false,
    children: [],
    parents: [2, 3],
  },
  {
    id: "5",
    firstname: "Jaehyun",
    lastname: "Jeong",
    age: 26,
    gender: Gender.MALE,
    status: Status.SINGLE,
    birthdate: "14-02-1997",
    haveChild: false,
    children: [],
    parents: [2, 3],
  }
];

export { persons as default, Person };
