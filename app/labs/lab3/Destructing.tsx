export default function Destructing() {
  // With AI：加入 city 屬性
  const person = {
    name: "John",
    age: 25,
    city: "Boston",
  };

  const { name, age, city } = person;

  // On your own
  const numbers = ["one", "two", "three"];
  numbers.push("four");

  const [first, second, third, fourth] = numbers;

  return (
    <div id="wd-destructing">
      <h2>Destructing</h2>

      <h3>Object Destructing</h3>
      const &#123; name, age, city &#125; = person
      <br />
      <br />

      name = {name}
      <br />
      age = {age}
      <br />

      {/* With AI */}
      city = {city}
      <br />

      <h3>Array Destructing</h3>
      const [first, second, third] = numbers
      <br />
      <br />

      first = {first}
      <br />
      second = {second}
      <br />
      third = {third}
      <br />

      {/* On your own */}
      fourth = {fourth}
      <br />

      <hr />
    </div>
  );
}