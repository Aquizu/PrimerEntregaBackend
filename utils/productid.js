export const productId  = () => {

    let maxId = 0;

    products.forEach((product => {
        if (product.id > maxId) {
            maxId = productId;
        }
    }))

    return maxId + 1;
};