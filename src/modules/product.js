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
  try {
    const db = await getDBConnection();

    // DELETE DB, ONLY USE WHEN THERE IS CHANGE IN DB
    // await db.execAsync(`DROP TABLE IF EXISTS product`);

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
  } catch (err) {
    console.error('initProductTable error:', err);
    throw err;
  }
}

// Get all products
export async function getAllProducts() {
  try {
    const db = await getDBConnection();
    const result = await db.getAllAsync('SELECT * FROM product');
    return result;
  } catch (err) {
    console.error('getAllProducts error:', err);
    return [];
  }
}

// Get a product by ID
export async function getProductById(id) {
  try {
    const db = await getDBConnection();
    const result = await db.getFirstAsync('SELECT * FROM product WHERE id = ?', [id]);
    return result;
  } catch (err) {
    console.error(`getProductById error (id: ${id}):`, err);
    return null;
  }
}

// Insert a new product
export async function insertProduct(product) {
  const {
    name,
    description,
    amount,
    unit,
    part_no,
    manufacturer,
    category_id,
    condition,
    country,
    image
  } = product;

  try {
    const db = await getDBConnection();
    const result = await db.runAsync(
      `INSERT INTO product (
        name,
        description,
        amount,
        unit,
        part_no,
        manufacturer,
        category_id,
        condition,
        country,
        image,
        is_synced,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, datetime('now'))`,
      [name, description, amount, unit, part_no, manufacturer, category_id, condition, country, image]
    );
    return result.lastInsertRowId;
  } catch (err) {
    console.error('insertProduct error:', err);
    return null;
  }
}

// Update an existing product
export async function updateProduct(product) {
  const {
    id,
    name,
    description,
    amount,
    unit,
    part_no,
    manufacturer,
    category_id,
    condition,
    country,
    image
  } = product;

  try {
    const db = await getDBConnection();
    const result = await db.runAsync(
      `UPDATE product SET
        name = ?,
        description = ?,
        amount = ?,
        unit = ?,
        part_no = ?,
        manufacturer = ?,
        category_id = ?,
        condition = ?,
        country = ?,
        image = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
      [name, description, amount, unit, part_no, manufacturer, category_id, condition, country, image, id]
    );
    return result.rowsAffected;
  } catch (err) {
    console.error(`updateProduct error (id: ${product.id}):`, err);
    return 0;
  }
}

// Delete a product by ID
export async function deleteProduct(id) {
  try {
    const db = await getDBConnection();
    const result = await db.runAsync('DELETE FROM product WHERE id = ?', [id]);
    return result.rowsAffected;
  } catch (err) {
    console.error(`deleteProduct error (id: ${id}):`, err);
    return 0;
  }
}

// Get Async Data
export async function markAllAsSynced() {
  const db = await getDBConnection();
  return await db.runAsync(`UPDATE product SET is_synced = 1 WHERE is_synced = 0`);
}