import { productId } from '../utils/productid.js';
import { readJsonFile } from '../utils/fileHandlers.js';
import paths from '../utils/paths';

export default class ProductsManager {
  #jsonFilename
  #products

  constructor() {
    this.#jsonFilename = "products.json";
  }

  //Busca un producto por su Id
    async #findOneById(id) {
      this.#products = await this.getAll();
      const productFound = this.#products.find((item) => item.id === Number(id));

      if (!productFound) {
        throw new Error(`No se encontró el producto con id: ${id}`);
      }
      return productFound;
  };
  
  //Traer todos los productos
  async getAll() {
    try {
      this.#products = await readJsonFile(paths.files, this.#jsonFilename);
      return this.#products;
    } catch (error) {
      throw new Error("Fallo al obtener todos");
      
    }
  }

//Traer solos un producto por ID
  async getOneById(id) {
  try {
            const productFound = await this.#findOneById(id);
            return productFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
  
//Ingresar un producto
  async insertOne(id) {
  try {
      const productFound = await this.#findOneById(id);
    return productFound;;
    } catch (error) {
      throw new Error("Fallo al obtener todos");
    }
  }

//Agregar un producto
      async insertOne(data) {
        try {
            const { title, status, stock } = data;

            if (!title || !status || !stock ) {
              throw new ErrorManager("Faltan datos obligatorios");
            }

            const product = {
                id: productId(await this.getAll()),
                title,
                status:(status),
                stock:(stock),
            };

            this.#products.push(product);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

            return product;
        } catch (error) {
          throw new ErrorManager("Producto invalido")
        }
    }

//Actualizar un producto por ID
  async updateOne(id, data) {
  try {
    const { title, status, stock } = data;
    const productFound = await this.#findOneById(id);

    const product = {
      id: productFound.id,
      title: title || productFound.title,
      status: status ? (status) : productFound.status,
      stock: stock ? Number(stock) : productFound.stock,
    };

    const index = this.#products.findIndex((item) => item.id === Number(id));
    this.#products[index] = product;
    await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

    return product;
  }
  catch (error) {
    throw new Error("Fallo al actualizar");
  }
};

//Eliminar un producto
  async deleteOneById (id) {
    try {  
      const index = this.#products.findIndex((item) => item.id === Number(id));
      this.#products.splice(index, 1);
      await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }
};