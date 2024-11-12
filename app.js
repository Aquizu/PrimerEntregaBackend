import express from "express";

// Importar rutas
import cartRoutes from "./routes/carts-routes.js";
import productRoutes from "./routes/product-routes.js";

//Constantes
const app = express();
const PORT = 8080;


app.use(express.json());
app.use(urlencoded({extended: true}));

//Declaracion de rutas
app.use('./api/products', productRoutes);
app.use('./api/carts', cartRoutes);

//Puerto que escucha el servidor
app.listen(PORT, () => {
  console.log(`Ejecutandose en http://localhost:${PORT}`);
});
