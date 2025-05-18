import axios from 'axios';
import { getDBConnection } from '../modules/product';

export const syncProducts = async () => {
    const db = await getDBConnection();
    const unsync = await db.getAllAsync('SELECT * FROM product WHERE is_synced = 0');

    for (let product of unsync) {
        try {
            await axios,post('API endpoint', product);
            await db.runAsync('UPDATE product SET is_synced = 1 WHERE id = ?', [product.id]);
        } catch (error) {
            console.log('Sync failed for product', product.id, error.message);
        }
    }
};