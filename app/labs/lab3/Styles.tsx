import BackgroundColors from "../lab2/BackgroundColors";

export default function Styles() {
  const colorBlack = { color: "black" };
  const padding10px = { padding: "10px" };

  const bgBlue = {
    backgroundColor: "lightblue",
    color: "black",
    ...padding10px,
  };

  const bgRed = {
    backgroundColor: "lightcoral",
    ...colorBlack,
    ...padding10px,
  };

  // On your own：
  const bgGreen = {
    BackgroundColors: "lightgreen",
    ...colorBlack,
    ...padding10px,
  };

  // With AI
  const bgGray = {
    backgroundColor: "lightgray",
    ...colorBlack,
    ...padding10px,
  };

  return (
    <div id="wd-styles">
      <h2>Styles</h2>

      <div
        style={{
          backgroundColor: "lightyellow",
          color: "black",
          padding: "10px",
        }}
      >
        Yellow background
      </div>

      {/* 使用已宣告的樣式物件 */}
      <div style={bgRed}>Red background</div>

      <div style={bgBlue}>Blue background</div>

      {/* On your own */}
      <div style={bgGreen}>Green background</div>

      {/* With AI */}
      <div style={bgGray}>Gray background</div>
    </div>
  );
}