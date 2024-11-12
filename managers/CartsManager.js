import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { productId } from "../utils/productid.js";

export default class cartsManager {
    #jsonFilename;
    #carts;

    constructor() {
        this.#jsonFilename = "carts.json";
    }

    // Busca un carrito por su numero de ID
    async #findOneById(id) {
        this.#carts = await this.getAll();
        const cartFound = this.#carts.find((item) => item.id === Number(id));

        if (!cartFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return cartFound;
    }

    // Obtiene todos los carritos
    async getAll() {
        try {
            this.#carts = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#carts;
        } catch (error) {
            throw new ErrorManager("No se han podido cargar los carritos");
        }
    }

    // Obtiene un carrito por su numero de ID
    async getOneById(id) {
        try {
            const cartFound = await this.#findOneById(id);
            return cartFound;
        } catch (error) {
            throw new ErrorManager("No se ha podido cargar el carrito");
        }
    }

    // Insertar el carrito
    async insertOne(data) {
        try {
            const products = data?.products?.map((item) => {
                return { product: Number(item.product), quantity: 1 };
            });

            const cart = {
                id: productId(await this.getAll()),
                products: products ?? [],
            };

            this.#carts.push(cart);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

            return cart;
        } catch (error) {
            throw new ErrorManager("No se ha podido insertar al carrito");
        }
    }

    // Agrega un producto a un carrito existente
    addOneIngredient = async (id, productId) => {
        try {
            const cartFound = await this.#findOneById(id);
            const productIndex = cartFound.products.findIndex((item) => item.product === Number(productId));

            if (ingredientIndex >= 0) {
                cartFound.products[productIndex].quantity++;
            } else {
                cartFound.products.push({ ingredient: Number(productId), quantity: 1 });
            }

            const index = this.#carts.findIndex((item) => item.id === Number(id));
            this.#carts[index] = cartFound;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

            return cartFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    };
}