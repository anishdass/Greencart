import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// Add product: /api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    const images = req.files;

    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    await Product.create({ ...productData, image: imagesUrl });
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Add product: /api/product/list
export const productList = async (req, res) => {};

// Get single product: /api/product/id
export const productById = async (req, res) => {};

// Get single product: /api/product/stock
export const changeStock = async (req, res) => {};
