export default function ForLoops() {
  let stringArray1 = ["string1", "string3"];

  let stringArray2: string[] = [];

  let stringArray3: string[] = [];

  let stringLengths: number[] = [];

  for (let i = 0; i < stringArray1.length; i++) {
    const string1 = stringArray1[i];

    stringArray2.push(string1.toUpperCase());

    // On your own
    stringArray3.push(string1.toLowerCase());

    // With AI：
    stringLengths.push(string1.length);
  }

  return (
    <div id="wd-for-loops">
      <h4>Looping through arrays</h4>

      stringArray2 = {stringArray2}
      <br />

      {/* With AI */}
      stringLengths = {stringLengths}
      <br />

      {/* On your own：在這裡顯示你的小寫陣列 */}

      <hr />
    </div>
  );
}