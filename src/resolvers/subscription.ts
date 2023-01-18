import { pubsub } from "../index";
const Subscription = {
  person: {
    subscribe() {
      return pubsub.asyncIterator("PERSON");
    },
  },
  createPerson: {
    subscribe() {
      return pubsub.asyncIterator("CREATED");
    },
  },
  deletePerson: {
    subscribe() {
      return pubsub.asyncIterator("DELETED");
    },
  },
  updatePerson: {
    subscribe() {
      return pubsub.asyncIterator("UPDATED");
    },
  },
};

export default Subscription;
