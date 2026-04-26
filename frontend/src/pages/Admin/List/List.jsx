import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";
import "./List.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const List = ({ token }) => {
  
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const { backendUrl, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchList();
    AOS.init({ duration: 800, once: true });
  }, []);

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");

      if (res.data.success) {
        setList(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Deleted Successfully");
        fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ SEARCH FILTER
  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="list-container">

      {/* HEADER */}
      <div className="list-header-top" data-aos="fade-down">
        <h2>🍽 Menu Management</h2>

        <input
          type="text"
          placeholder="🔍 Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE HEADER */}
      <div className="list-header">
        <span>Item</span>
        <span>Category</span>
        <span>Price</span>
        <span>Actions</span>
      </div>

      {/* ITEMS */}
      {filteredList.map((item, index) => (
        <div
          className="list-row"
          key={item._id}
          data-aos="fade-up"
          data-aos-delay={index * 50}
        >
          {/* LEFT */}
          <div className="item-info">
            <img src={item.image[0]} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>{item.description?.slice(0, 40)}...</p>
            </div>
          </div>

          <p className="category">{item.category}</p>
          <p className="price">{currency}{item.price}</p>

          {/* ACTIONS */}
          <div className="actions">
            <button
              className="edit-btn"
              onClick={() => navigate("/add", { state: item })}
            >
              ✏️
            </button>

            <button
              className="delete-btn"
              onClick={() => removeProduct(item._id)}
            >
              🗑
            </button>
          </div>
        </div>
      ))}

      {filteredList.length === 0 && (
        <p className="no-data">No items found</p>
      )}

    </div>
  );
};

export default List;