import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

//function  for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category ,subCategory } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const images = [image1].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            subCategory,
            price: Number(price),
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id, name, description, price, category,subCategory  } = req.body;

    await productModel.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      subCategory,
    });

    res.json({ success: true, message: "Product Updated" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//function  for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//function  for removing product
const removeProduct = async (req, res) => {

    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}
//function for single product Info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



export { listProducts, addProduct, removeProduct, singleProduct,updateProduct }

