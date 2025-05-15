import React, { useState} from "react";
import InventoryView from "./InventoryView";
import ProductEditView from "./ProductEditView";

export default function InventoryWrapper() {
    const [subPage, setSubPage] = useState('Main');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const navigateToEdit = (product) => {
        setSelectedProduct(product);
        setSubPage('Edit');
    };

    const navigateBack = () => {
        setSubPage('Main');
        setSelectedProduct(null);
    };

    return subPage === 'Main' ? (
        <InventoryView onEditProduct={navigateToEdit} />
    ) : (
        <ProductEditView product={selectedProduct} onBack={navigateBack} />
    );
}