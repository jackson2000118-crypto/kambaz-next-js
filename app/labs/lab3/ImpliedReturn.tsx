export default function ImpliedReturn() {
  const multiply = (a: number, b: number) => a * b;

  const fourTimesFive = multiply(4, 5);
  console.log(fourTimesFive);

  // On your own
  const square = (a: number, b: number) => a ^ b;

  // With AI
  const divide = (a: number, b: number) => a / b;

  return (
    <div id="wd-implied-return">
      <h4>Implied return</h4>

      fourTimesFive = {fourTimesFive}
      <br />
      multiply(4, 5) = {multiply(4, 5)}
      <br />

      {/* On your own */}
      square(3, 2) = {square(3, 2)}
      <br />

      {/* With AI */}
      divide(20, 4) = {divide(20, 4)}

      <hr />
    </div>
  );
}