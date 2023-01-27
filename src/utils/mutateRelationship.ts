import { pubsub, prisma } from "../index";
import { filterDup, removeElement } from "./functions";

async function addChildrenToParents(createPerson: any) {
    let children = [];
    createPerson.parents.map(async (id) => {
        let parent = await prisma.person.findUnique({
            where: {
                id: id
            }
        })

        children = parent.children;
        children.push(createPerson.id);
        children = filterDup(children);
        let updatePerson = await prisma.person.update({
            where: {
                id: id
            }
            , data: {
                children: children
            }
        })
        pubsub.publish("UPDATED", { updatePerson: updatePerson });
    })
};

async function addParentstoChildren(createPerson: any) {
    let parents = [];
    createPerson.children.map(async (id) => {
        let child = await prisma.person.findUnique({
            where: {
                id: id
            }
        })

        parents = child.parents;
        parents.push(createPerson.id);
        parents = filterDup(parents);
        let updatePerson = await prisma.person.update({
            where: {
                id: id
            }
            , data: {
                parents: parents
            }
        })
        pubsub.publish("UPDATED", { updatePerson: updatePerson });
    })
};

async function deleteChildrenFromParents(deletePerson: any) {
    // console.log(deletePerson.parents)
    deletePerson.parents.map(async (id) => {
        let parent = await prisma.person.findUnique({
            where: {
                id: id
            }
        })

        // console.log('parent', parent)

        let children = parent.children;
        children = removeElement(children, deletePerson.id);
        // console.log('children of parent after delete', parent.children)
        let updatePerson = await prisma.person.update({
            where: {
                id: id
            }
            , data: {
                children: children
            }
        })
        pubsub.publish("UPDATED", { updatePerson: updatePerson });
    })
};

async function deleteChildrenFromParentsUpdate(deletePerson: any, idToDelete: number) {
    let children = deletePerson.children;
    children = removeElement(children, idToDelete);
    let updatePerson = await prisma.person.update({
        where: {
            id: deletePerson.id
        }
        , data: {
            children: children
        }
    })
    pubsub.publish("UPDATED", { updatePerson: updatePerson });
};

async function deleteParentsFromChildrenUpdate(deletePerson: any, idToDelete: number) {
    let parents = deletePerson.parents;
    parents = removeElement(parents, idToDelete);
    let updatePerson = await prisma.person.update({
        where: {
            id: deletePerson.id
        }
        , data: {
            parents: parents
        }
    })
    pubsub.publish("UPDATED", { updatePerson: updatePerson });
};

async function deleteParentsFromChildren(deletePerson: any) {
    deletePerson.children.map(async (id) => {
        let child = await prisma.person.findUnique({
            where: {
                id: id
            }
        })

        let parents = child.parents;
        parents = removeElement(parents, deletePerson.id)
        let updatePerson = await prisma.person.update({
            where: {
                id: id
            }
            , data: {
                parents: parents
            }
        })
        pubsub.publish("UPDATED", { updatePerson: updatePerson });
    })
};

async function updateChildrenOfParents(idToUpdate: any, childrenToUpdate: []) {
    let updatePerson = await prisma.person.update({
        where: {
            id: idToUpdate
        }, data: {
            children: childrenToUpdate
        }
    })

    pubsub.publish("UPDATED", { updatePerson: updatePerson });
};

async function updateParentsOfChildren(idToUpdate: any, parentsToUpdate: []) {
    let updatePerson = await prisma.person.update({
        where: {
            id: idToUpdate
        }, data: {
            parents: parentsToUpdate
        }
    })

    pubsub.publish("UPDATED", { updatePerson: updatePerson });
};


export {
    addChildrenToParents, addParentstoChildren,
    deleteChildrenFromParents, deleteParentsFromChildren,
    updateChildrenOfParents, updateParentsOfChildren,
    deleteChildrenFromParentsUpdate,
    deleteParentsFromChildrenUpdate
};