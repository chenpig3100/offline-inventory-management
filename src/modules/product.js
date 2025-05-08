import * as SQLite from 'expo-sqlite';

let db;

export function getDBConnection() {
  if (!db) {
    db = SQLite.openDatabase('inventory.db');
  }
  return db;
}

//initial table
export const initProductTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS product (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                amount INTEGER,
                unit TEXT,
                part_no TEXT,
                manufacturer TEXT,
                category_id INTEGER,
                condition TEXT,
                country TEXT
            );`
        );
    });
};

//get all product
export const getAllProducts = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM product',
            [],
            (_, { row }) => callback(row._array),
            (_, error) => {
                console.log('Error fetching products', error);
                return false;
            }
        );
    });
};

//get product by ID
export const getProductById = (id, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM product WHERE id = ?',
            [id],
            (_, { rows }) => callback(rows._array[0]),
            (_, error) => {
                console.log('Error fetch product by id', error);
                return false;
            }
        );
    });
};

// Create Product

export const insertProduct = (product, callback) => {
    const {name, description, amount, unit, part_no, manufacturer, category_id, condition, country } = product;
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO product (name, description, amount, unit, part_no, manufacturer, category_id, condition, country)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, description, amount, unit, part_no, manufacturer, category_id, condition, country],
            (_, result) => callback(result.insertId),
            (_, error) => {
                console.log('Insert failed', error);
                return false;
            }
        );
    });
};

// Update Product
export const updateProduct = (product, callback) => {
    const { id, name, description, amount, unit, part_no, manufacturer, category_id, condition, country } = product;
    db.transaction(tx => {
        tx.executeSql(
            `UPDATE product SET
                name = ?, description = ?, amount = ?, unit = ?,
                part_no = ?, manufacturer = ?, category_id = ?,
                condition = ?, country = ?
                WHERE id = ?`,
                [name, description, amount, unit, part_no, manufacturer, category_id, condition, country, id],
                (_, result) => callback(result.rowsAffected),
                (_, error) => {
                    console.log('Update failed', error);
                    return false;
                }
        );
    });
};

export const deleteProduct = (id, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM product WHERE id = ?',
            [id],
            (_, result) => callback(result.rowsAffected),
            (_, error) => {
                console.log('Delete failed', error);
                return false;
            }
        );
    });
};