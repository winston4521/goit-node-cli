const { program } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();

      return contactsList;

    case "get":
      const contact = await getContactById(id);

      return contact;

    case "add":
      const newContact = await addContact({ name, email, phone });

      return newContact;

    case "remove":
      const removedContact = await removeContact(id);

      return removedContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
