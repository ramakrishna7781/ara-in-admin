import { useState, useRef } from "react";

export default function ProductPopup({
  mode,
  initialData = {},
  onClose,
  onSubmit,
  loading,
}) {
  const [productName, setProductName] = useState(initialData.productName || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [type, setType] = useState(initialData.type || "");
  const [sizes, setSizes] = useState(initialData.sizes || []);
  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const hiddenFileInputRef = useRef(null);
  const openFilePicker = () => hiddenFileInputRef.current.click();

  const toggleSize = (s) => {
    setSizes((prev) =>
      prev.includes(s) ? prev.filter((i) => i !== s) : [...prev, s]
    );
  };

  const validateForm = () => {
    if (!productName.trim()) return false;
    if (!description.trim()) return false;
    if (!price.toString().trim()) return false;
    if (!type.trim()) return false;
    if (sizes.length === 0) return false;
    if (mode === "add" && images.length === 0) return false;
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      setErrorMsg("Fill all fields.");
      return;
    }

    const data = {
      productName,
      description,
      price,
      type,
      sizes,
      images: mode === "add" ? images : [],
    };

    onSubmit(data);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: 420,
          background: "#ff69b4",
          padding: 25,
          borderRadius: 20,
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 15 }}>
          {mode === "add" ? "Add Product" : "Edit Product"}
        </h2>

        <input
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={inputStyle(!productName)}
        />

        <textarea
          placeholder="Description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle(!description), height: 90, resize: "none" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle(!price)}
        />

        <input
          placeholder="Type (kurti, tshirt...)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={inputStyle(!type)}
        />

        <p style={{ marginTop: 14 }}>Select Sizes:</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
            <div
              key={s}
              onClick={() => toggleSize(s)}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                border: "1px solid white",
                background: sizes.includes(s) ? "white" : "transparent",
                color: sizes.includes(s) ? "#ff4081" : "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {mode === "add" && (
          <>
            <p style={{ marginTop: 14 }}>Upload Images:</p>

            <input
              type="file"
              multiple
              ref={hiddenFileInputRef}
              onChange={(e) =>
                setImages([...images, ...Array.from(e.target.files)])
              }
              style={{ display: "none" }}
            />

            <div
              onClick={openFilePicker}
              style={{
                padding: "12px 16px",
                background: "white",
                color: "#ff4081",
                textAlign: "center",
                borderRadius: 10,
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: 12,
              }}
            >
              Add Images
            </div>

            {images.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  overflowX: "auto",
                  paddingBottom: 10,
                }}
              >
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 10,
                      objectFit: "cover",
                      border: "2px solid white",
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {errorMsg && (
          <p style={{ color: "yellow", marginTop: 8 }}>{errorMsg}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!validateForm() || loading}
          style={{
            marginTop: 18,
            width: "100%",
            padding: 14,
            background: "white",
            color: "#ff4081",
            borderRadius: 12,
            fontSize: 18,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Processing..." : mode === "add" ? "Add Product" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

const inputStyle = (missing) => ({
  width: "100%",
  padding: "14px 16px",
  marginTop: 14,
  borderRadius: 12,
  border: missing
    ? "2px solid #ffdfdf"
    : "1px solid rgba(255,255,255,0.35)",
  background: "rgba(255,255,255,0.15)",
  color: "white",
  fontSize: 16,
  outline: "none",
  boxSizing: "border-box",
});
