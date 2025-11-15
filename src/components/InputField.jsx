export default function InputField({
  label,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div
      style={{
        marginBottom: "15px",
        textAlign: "left",
        width: "100%",               // ⭐ FIX: full width wrapper
        display: "flex",             // ⭐ FIX: align input correctly
        flexDirection: "column",
      }}
    >
      <label style={{ color: "white", fontSize: "14px" }}>{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",              // ⭐ ensure input stays left aligned
          padding: "12px",
          marginTop: "6px",
          borderRadius: "10px",
          border: "none",
          background: "rgba(255,255,255,0.3)",
          color: "white",
          outline: "none",
          fontSize: "16px",
        }}
      />
    </div>
  );
}
