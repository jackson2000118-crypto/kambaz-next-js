export default function FindFunction() {
  let numberArray1 = [1, 2, 3, 4, 5];
  let stringArray1 = ["string1", "string2", "string3"];

  const four = numberArray1.find((a) => a === 4);


  const string3 = stringArray1.find((a) => a === "string3");

  // With AI
  const two = numberArray1.find((a) => a === 2);

  // On your own
  const six = numberArray1.find((a) => a === 6);

  return (
    <div id="wd-find-function">
      <h4>Find Function</h4>

      four = {four}
      <br />
      string3 = {string3}
      <br />

      {/* With AI */}
      two = {two}
      <br />

      {/* On your own：
          顯示你找不到值的結果
          先直接顯示，再試著用 String(...) 顯示
      */}
      six = {six}
      <br />
      six = {String(six)}
      <br />
      
      <hr />
    </div>
  );
}