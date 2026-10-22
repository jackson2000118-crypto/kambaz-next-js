import "./Classes.css";

export default function Classes() {
  const color = "blue";
  const dangerous = true;

  // On your own：
  const check = true;
  const myBackGround = check ? "wd-bg-green" : "wd-fg-black";

  // With AI
  const shade = "green";

  return (
    <div id="wd-classes">
      <h2>Classes</h2>

      <div className="wd-bg-yellow wd-fg-black wd-padding-10px">
        Yellow background
      </div>

      <div className="wd-bg-blue wd-fg-black wd-padding-10px">
        Blue background
      </div>

      <div className="wd-bg-red wd-fg-black wd-padding-10px">
        Red background
      </div>

      <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
        Dynamic Blue background
      </div>

      {/* 使用三元運算子選擇 class */}
      <div
        className={`${
          dangerous ? "wd-bg-red" : "wd-bg-green"
        } wd-fg-black wd-padding-10px`}
      >
        Dangerous background
      </div>

      {/* On your own */}
      <div className={`${myBackGround} wd-fg-black wd-padding-10px`}>
      {check ? "My Green background" : "My Yellow background"}
      </div>

      {/* With AI */}
      <div className={`wd-bg-${shade} wd-fg-black wd-padding-10px`}>
        Dynamic Green background
      </div>

      <hr />
    </div>
  );
}