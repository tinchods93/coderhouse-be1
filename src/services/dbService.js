const { readFileSync, writeFileSync } = require('fs'); // filesystem
const { resolve } = require('path');

// Este servicio se encarga de leer y escribir en la base de datos
// La base de datos es un archivo JSON que se encuentra en la carpeta resources/db
// Cada archivo representa una tabla de la base de datos
// --------------------------------------------------------------------------------------------
// A futuro, se puede reemplazar por una base de datos real
// y cambiar la implementación de este servicio sin cambiar el resto de la aplicación.
// Es por eso que, a pesar de que este servicio es completamente "SYNC",
// voy a ponerlo como "ASYNC" para que sea más fácil cambiarlo en el futuro.
// --------------------------------------------------------------------------------------------

const readDb = (dbName) => {
  const dbPath = resolve(__dirname, `../../resources/db/${dbName}.json`);
  // leo el archivo y lo parseo a JSON
  return JSON.parse(readFileSync(dbPath, 'utf-8') || '{}');
};

const writeDb = (dbName, db) => {
  const dbPath = resolve(__dirname, `../../resources/db/${dbName}.json`);
  // escribo el archivo
  writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

const createItem = async (payload) => {
  const { item, dbName } = payload;

  // leo la db
  const db = readDb(dbName);

  // reviso si el item existe, si existe, tiro un error
  if (db[item.id]) {
    throw new Error(`El item con id ${item.id} ya existe`);
  }

  // si no existe, lo guardamos en la db
  db[item.id] = item;

  // escribimos la db
  writeDb(dbName, db);
};

const getItems = async (dbName) => {
  const db = readDb(dbName);
  return Object.values(db) || [];
};

const getItem = async (payload) => {
  const { id, dbName } = payload;
  const db = readDb(dbName);

  return db[id];
};

const updateItem = async (payload) => {
  const { item, dbName } = payload;
  const db = readDb(dbName);

  if (!db[item.id]) {
    throw new Error(`El item con id ${item.id} no existe`);
  }

  const actualDbItem = db[item.id];
  const updatedItem = { ...actualDbItem, ...item };
  // actualizamos el item
  db[item.id] = updatedItem;

  writeDb(dbName, db);
  return updatedItem;
};

const deleteItem = async (payload) => {
  const { id, dbName } = payload;
  const db = readDb(dbName);

  if (!db[id]) {
    throw new Error(`El item con id ${id} no existe`);
  }

  delete db[id];

  writeDb(dbName, db);
};

// busca items en la db que contengan el query en alguno de sus valores
const searchItems = async (payload) => {
  const { query, dbName } = payload;
  const db = readDb(dbName);

  // filtramos los items que contengan el query en alguno de sus valores
  return Object.values(db).filter((item) =>
    // revisamos si alguno de los valores del item incluye el query
    Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(query.toLowerCase())
    )
  );
};

module.exports = {
  readDb,
  writeDb,
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  searchItems,
};
