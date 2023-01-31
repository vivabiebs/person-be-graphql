import { prisma } from '../src/index'
import { Gender, Status } from '@prisma/client'

async function main() {
    const createdPeople = await prisma.person.createMany({
        data: [{
            id: 1,
            firstname: 'Vivawan',
            lastname: 'Satur',
            age: 23,
            gender: Gender.FEMALE,
            status: Status.SINGLE,
            birthdate: "09-05-2000",
            haveChild: false,
            children: [3, 4],
            parents: [],
        }, {
            id: 2,
            firstname: 'Mile',
            lastname: 'Phakphum',
            age: 31,
            gender: Gender.MALE,
            status: Status.MARRIED,
            birthdate: "05-01-1992",
            haveChild: true,
            children: [3],
            parents: [],
        }, {
            id: 3,
            firstname: 'Bible',
            lastname: 'Sumettikul',
            age: 26,
            gender: Gender.MALE,
            status: Status.SINGLE,
            birthdate: "25-12-1997",
            haveChild: false,
            children: [],
            parents: [1, 2],
        }, {
            id: 4,
            firstname: 'Jeff',
            lastname: 'Satur',
            age: 27,
            gender: Gender.MALE,
            status: Status.SINGLE,
            birthdate: "05-05-1996",
            haveChild: true,
            children: [6],
            parents: [1],
        }, {
            id: 5,
            firstname: 'Jaehyun',
            lastname: 'Jeong',
            age: 26,
            gender: Gender.MALE,
            status: Status.SINGLE,
            birthdate: "14-03-1997",
            haveChild: false,
            children: [],
            parents: [2],
        }, {
            id: 6,
            firstname: 'B',
            lastname: 'Satur',
            age: 11,
            gender: Gender.MALE,
            status: Status.SINGLE,
            birthdate: "05-05-2012",
            haveChild: false,
            children: [],
            parents: [4],
        }
        ]
    })

    console.log({ "created": createdPeople })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })