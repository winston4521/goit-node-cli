const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// ===============Contacts list===================
const listContacts = async () => {
  const contactsArr = await fs.readFile(contactsPath);

  return JSON.parse(contactsArr);
};

// ===============Get Contacts by id==================
const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((con) => con.id === id);

  return contact || null;
};

// ==========Delete contact==============
const removeContact = async (id) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((con) => con.id === id);
  if (index === -1) {
    return null;
  }
  const [deletedBook] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedBook;
};

// ==================Add contact==================
const addContact = async (data) => {
  const allContacts = await listContacts();

  const newContact = {
    id: shortid(),
    ...data,
  };

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
