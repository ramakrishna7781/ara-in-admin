import { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductPopup from "../components/ProductPopup";

export default function AdminHome() {
  const [products, setProducts] = useState([]);
  const [popupMode, setPopupMode] = useState(null);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    const token = localStorage.getItem("admin_token");
    const res = await axios.get("/product/getAllProducts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Do you want to delete this product?")) return;
    if (!window.confirm("This cannot be undone. Confirm delete?")) return;

    const token = localStorage.getItem("admin_token");
    await axios.delete(`/product/deleteProduct/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchAllProducts();
  };

  // ---------------- ADD PRODUCT ----------------
  const handleAddSubmit = async (data) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("admin_token");
      const formData = new FormData();

      const productJson = {
        productName: data.productName,
        description: data.description,
        price: data.price,
        couponCode: "COUPON10",
        type: data.type,
        sizes: data.sizes,
      };

      formData.append("product", JSON.stringify(productJson));

      data.images.forEach((file) => formData.append("files", file));

      await axios.post("/product/addProduct", formData, {
        headers: { Authorization: `Bearer ${token}` },
        transformRequest: (d) => d, // important
      });

      alert("Product Added Successfully");
      setPopupMode(null);
      fetchAllProducts();
    } finally {
      setLoading(false);
    }
  };

  // ---------------- EDIT PRODUCT ----------------
  const handleEditSubmit = async (data) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("admin_token");
      const formData = new FormData();

      const productJson = {
        productName: data.productName,
        description: data.description,
        price: data.price,
        couponCode: "COUPON10", // hardcoded
        type: data.type,
        sizes: data.sizes,
        imageUrls: editData.imageUrls, // keep old image URLs
      };

      formData.append("product", JSON.stringify(productJson));

      await axios.put(`/product/updateProduct/${editData.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        transformRequest: (d) => d,
      });

      alert("Product Updated Successfully");
      setPopupMode(null);
      fetchAllProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: 20,
        background: "#ff4081",
        height: "100vh",
        color: "white",
        position: "relative",
        overflowY: "auto",
      }}
    >
      {/* LOGOUT BUTTON */}
      <button
        onClick={() => {
          localStorage.removeItem("admin_token");
          // window.location.href = "/#/login";
          window.location.href = `${window.location.origin}/#/login`;
          // window.location.hash = "#/login";
          // window.location.replace("#/login");
        }}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "10px 16px",
          background: "white",
          color: "#ff4081",
          borderRadius: 10,
          border: "2px solid white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>

      <button
        onClick={() => setPopupMode("add")}
        style={{
          margin: "20px auto",
          display: "block",
          padding: "15px 20px",
          background: "white",
          color: "#ff4081",
          borderRadius: 10,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        + Add Product
      </button>

      {/* PRODUCT LIST */}
      <div style={{ marginTop: 30 }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "rgba(255,255,255,0.3)",
              padding: 15,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 15,
              marginBottom: 20,
            }}
          >
            <img
              src={p.imageUrls?.[0]}
              alt=""
              style={{
                width: 70,
                height: 70,
                borderRadius: 10,
                objectFit: "cover",
              }}
            />

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{p.productName}</h3>
              <p style={{ marginTop: 5 }}>₹{p.price}</p>
            </div>

            <button
              onClick={() => {
                setEditData(p);
                setPopupMode("edit");
              }}
              style={{
                padding: "8px 14px",
                background: "yellow",
                color: "black",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDeleteProduct(p.id)}
              style={{
                padding: "8px 14px",
                background: "red",
                color: "white",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* POPUPS */}
      {popupMode === "add" && (
        <ProductPopup
          mode="add"
          onClose={() => setPopupMode(null)}
          onSubmit={handleAddSubmit}
          loading={loading}
        />
      )}

      {popupMode === "edit" && (
        <ProductPopup
          mode="edit"
          initialData={editData}
          onClose={() => setPopupMode(null)}
          onSubmit={handleEditSubmit}
          loading={loading}
        />
      )}
    </div>
  );
}
