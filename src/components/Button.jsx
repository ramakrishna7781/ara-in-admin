// src/components/Button.jsx
export default function Button({ text, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "12px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        ...style,
      }}
    >
      {text}
    </button>
  );
}
