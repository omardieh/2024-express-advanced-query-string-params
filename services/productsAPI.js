const axios = require("axios");
const baseURL = "https://fakestoreapi.com";

function useProductsAPI() {
  const getAllProducts = () => {
    return axios.get(baseURL + "/products");
  };

  const getProductByID = (productID) => {
    return axios.get(baseURL + "/products/" + productID);
  };

  return {
    getAllProducts,
    getProductByID,
  };
}

module.exports = {
  useProductsAPI,
};
