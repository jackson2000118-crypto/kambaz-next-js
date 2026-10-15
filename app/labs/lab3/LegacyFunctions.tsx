function add(a: number, b: number) {
  return a + b;
}

// On your own
function subtract(a: number, b: number) {
    return a - b;
}

// With AI
function multiply(a: number, b: number) {
  return a * b;
}

export default function LegacyFunctions() {
  const twoPlusFour = add(2, 4);
  console.log(twoPlusFour);

  // On your own
  const twoMinusOne = subtract(2, 1);
  console.log(twoMinusOne);

  // With AI
  const threeTimesSeven = multiply(3, 7);
  console.log(threeTimesSeven);

  return (
    <div id="wd-legacy-functions">
      <h4>Functions</h4>
      <h5>Legacy ES5 functions</h5>

      twoPlusFour = {twoPlusFour}
      <br />
      add(2, 4) = {add(2, 4)}
      <br />

      {/* On your own */}
      twoMinusOne = {twoMinusOne}
      <br />
      subtract(2, 1) = {subtract(2, 1)}

      {/* With AI */}
      threeTimesSeven = {threeTimesSeven}
      <br />
      multiply(3, 7) = {multiply(3, 7)}

      <hr />
    </div>
  );
}