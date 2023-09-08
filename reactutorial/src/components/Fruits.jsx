export default function Fruits() {
  const fruits = [
    { name: "Apple", price: 10, color: "red" },
    { name: "Banana", price: 20, color: "yellow" },
    { name: "Orange", price: 30, color: "orange" },
    { name: "Grapes", price: 40, color: "green" },
    { name: "Mango", price: 50, color: "yellow" },
  ];
  return (
    <div>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.name}>
            {" "}
            {fruit.color} {fruit.name} {fruit.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
