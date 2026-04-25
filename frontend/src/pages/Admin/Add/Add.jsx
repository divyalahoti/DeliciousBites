import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Add.css";
import { toast } from "react-toastify";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Add = ({ token }) => {

  const { backendUrl } = useContext(ShopContext);
  const location = useLocation();
  const editData = location.state;

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("breakfast");
  const [subCategory, setSubCategory] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    if (editData) {
      setIsEdit(true);
      setProductId(editData._id);
      setName(editData.name);
      setDescription(editData.description);
      setPrice(editData.price);
      setCategory(editData.category);
      setSubCategory(editData.subCategory || "");
    }
  }, [editData]);

  // IMAGE PREVIEW
  const handleImage = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        const res = await axios.post(
          backendUrl + "/api/product/update",
          { id: productId, name, description, price, category },
          { headers: { token } }
        );

        res.data.success
          ? toast.success("Updated Successfully ✏️")
          : toast.error(res.data.message);
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("subCategory", subCategory);
        if (image) formData.append("image1", image);

        const res = await axios.post(
          backendUrl + "/api/product/add",
          formData,
          { headers: { token } }
        );

        res.data.success
          ? toast.success("Item Added 🍽️")
          : toast.error(res.data.message);
      }

      // RESET
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
      setPreview("");
      setIsEdit(false);

    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="add-container">

      <h2 className="page-title" data-aos="fade-down">
        {isEdit ? "✏️ Edit Menu Item" : "➕ Add New Item"}
      </h2>

      <form onSubmit={onSubmitHandler} className="add-card">

        {/* IMAGE */}
        <div className="image-box" data-aos="zoom-in">
          {preview ? (
            <img src={preview} alt="preview" />
          ) : (
            <p>Upload Image</p>
          )}

          <input
            type="file"
            onChange={(e) => handleImage(e.target.files[0])}
          />
        </div>

        {/* FORM GRID */}
        <div className="form-grid">

          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price ₹"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>

          {category === "dinner" && (
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">Select Type</option>
              <option>Punjabi</option>
              <option>Gujarati</option>
              <option>South Indian</option>
              <option>Chinese</option>
              <option>Italian</option>
              <option>Desserts & Drinks</option>
            </select>
          )}

        </div>

        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">
          {isEdit ? "Update Item" : "Add Item"}
        </button>

      </form>
    </div>
  );
};

export default Add;