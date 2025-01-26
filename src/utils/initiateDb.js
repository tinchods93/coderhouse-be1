const fs = require('fs');
const path = require('path');

module.exports = () => {
  const dbPath = path.resolve(__dirname, '../../resources/db');
  const cartsPath = `${dbPath}/carts.json`;
  const productsPath = `${dbPath}/products.json`;
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }
  if (!fs.existsSync(cartsPath)) {
    fs.writeFileSync(cartsPath, '{}');
  }
  if (!fs.existsSync(productsPath)) {
    fs.writeFileSync(productsPath, '{}');
  }
  console.log('** Archivos de base de datos creados **');
};
