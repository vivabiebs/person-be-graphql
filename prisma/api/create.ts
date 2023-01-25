import { PrismaClient, Prisma, Person, Gender, Status } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'info'] })

async function main() {
    let person: Prisma.PersonCreateInput
    person = {
        id: 1,
        firstname: "Viva",
        lastname: "Biebs",
        age: 23,
        gender: Gender.FEMALE,
        status: Status.SINGLE,
        birthdate: "09-05-2000",
        haveChild: false,
        children: [],
        parents: [2, 3]
    };

    // Pass 'person' object into query
    const createPerson = await prisma.person.create({ data: person })
    console.log(createPerson)
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