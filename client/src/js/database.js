import { openDB } from 'idb';

const initDB = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to READ all from the database
export const getDB = async () => {
  console.log("GET from the database");
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log(result);
  return result;
};

// Function to UPDATE the database
export const putDB = async (content) => {
  console.log('PUT to the database');
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ text: content });
  const result = await request;
  console.log('🚀 - data saved to the database');
};

initDB();
