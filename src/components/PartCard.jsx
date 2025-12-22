export default function PartCard({ part }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <h3>{part.name}</h3>
      <p>Category: {part.category}</p>
      <p>Condition: {part.condition}</p>
      <p>Location: {part.location}</p>
      <strong>{part.price} GEL</strong>
    </div>
  );
}
