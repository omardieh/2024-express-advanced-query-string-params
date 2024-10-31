require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { useProductsAPI } = require("./services/productsAPI");

const app = express();
app.use(morgan("dev"));

app.get("/api/products", async (req, res) => {
  const { getAllProducts } = useProductsAPI();
  try {
    const response = await getAllProducts();
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error, something went wrong" });
  }
});

app.get("/api/products/:productID", async (req, res) => {
  const { productID } = req.params;
  const { getProductByID } = useProductsAPI();
  try {
    const response = await getProductByID(productID);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error, something went wrong" });
  }
});

app.get("/api/top-products", async (req, res) => {
  const { getAllProducts } = useProductsAPI();
  const { priceLimit } = req.query;
  try {
    const response = await getAllProducts();
    const filteredProducts = response.data.filter(
      (element) => element.price <= priceLimit
    );
    res.json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error, something went wrong" });
  }
});

// app.get("/api/products/:productID", async (req, res) => {
//   const { productID } = req.params;
//   axios
//     .get("https://fakestoreapi.com/products/" + productID)
//     .then((resp) => {
//       console.log(resp.data);
//       res.json(resp.data);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ message: "Error, something went wrong" });
//     });
// });

const port = process.env.PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.info("app is running, please visit : http://localhost:" + port);
});
