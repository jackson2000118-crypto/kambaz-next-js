export default function ReduceFunction() {
  const numbers = [1, 2, 3, 4, 5];

  const sum = numbers.reduce((total, n) => total + n, 0);

  const joined = numbers.reduce((text, n) => text + n, "");

  // On your own：
  const product = numbers.reduce((total, n) => total * n, 1);

  return (
    <div id="wd-reduce-function">
      <h4>Reduce Function</h4>

      sum = {sum}
      <br />

      {/* With AI */}
      joined = {joined}
      <br />

      {/* On your own */}
      product = {product}
      <br />

      <hr />
    </div>
  );
}