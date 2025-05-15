import * as SQLite from 'expo-sqlite';

let db;

// Get or initialize the database connection
export async function getDBConnection() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('inventory.db');
  }
  return db;
}

// Create the 'product' table if it doesn't exist
export async function initProductTable() {
  const db = await getDBConnection();

  // DELETE DB, ONLY USE WHEN THERE IS CHANGE IN DB
  //await db.execAsync(`DROP TABLE IF EXISTS product`);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS product (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      amount INTEGER,
      unit TEXT,
      part_no TEXT,
      manufacturer TEXT,
      category_id INTEGER,
      condition TEXT,
      country TEXT,
      image TEXT,
      is_synced INTEGER DEFAULT 0,
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

// Get all products
export async function getAllProducts() {
  const db = await getDBConnection();
  return await db.getAllAsync('SELECT * FROM product');
}

// Get a product by ID
export async function getProductById(id) {
  const db = await getDBConnection();
  const result = await db.getFirstAsync('SELECT * FROM product WHERE id = ?', [id]);
  return result;
}

// Insert a new product
export async function insertProduct(product) {
  const {
    name, description, amount, unit, part_no,
    manufacturer, category_id, condition, country, image
  } = product;

  const db = await getDBConnection();
  const result = await db.runAsync(
    `INSERT INTO product (name, description, amount, unit, part_no, manufacturer, category_id, condition, country, image, is_synced, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, datetime('now'))`,
    [name, description, amount, unit, part_no, manufacturer, category_id, condition, country, image]
  );
  return result.lastInsertRowId;
}

// Update an existing product
export async function updateProduct(product) {
  const {
    id, name, description, amount, unit, part_no,
    manufacturer, category_id, condition, country
  } = product;

  const db = await getDBConnection();
  const result = await db.runAsync(
    `UPDATE product SET
      name = ?, description = ?, amount = ?, unit = ?,
      part_no = ?, manufacturer = ?, category_id = ?,
      condition = ?, country = ?
     WHERE id = ?`,
    [name, description, amount, unit, part_no, manufacturer, category_id, condition, country, id]
  );
  return result.rowsAffected;
}

// Delete a product by ID
export async function deleteProduct(id) {
  const db = await getDBConnection();
  const result = await db.runAsync('DELETE FROM product WHERE id = ?', [id]);
  return result.rowsAffected;
}
