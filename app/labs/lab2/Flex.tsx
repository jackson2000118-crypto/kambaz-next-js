import "./index.css";

export default function Flex() {
  return (
    <div id="wd-css-flex">
      <h2>Flex</h2>

      {/* Teacher row 1: basic horizontal layout */}
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow">
          Column 1
        </div>

        <div className="wd-bg-color-blue wd-fg-color-white">
          Column 2
        </div>

        <div className="wd-bg-color-red wd-fg-color-white">
          Column 3
        </div>
      </div>

      {/* Teacher row 2: the last column grows */}
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow">
          Column 1
        </div>

        <div className="wd-bg-color-blue wd-fg-color-white">
          Column 2
        </div>

        <div className="wd-bg-color-red wd-fg-color-white wd-flex-grow-1">
          Column 3
        </div>
      </div>

      {/* Teacher row 3: fixed first column, growing last column */}
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow wd-width-75px">
          Column 1
        </div>

        <div className="wd-bg-color-blue wd-fg-color-white">
          Column 2
        </div>

        <div className="wd-bg-color-red wd-fg-color-white wd-flex-grow-1">
          Column 3
        </div>
      </div>

      <div id= "wd-your-flex" className="wd-flex-row-container">
        <div className="wd-flex-grow-1 wd-bg-color-blue">
            My own work 1
        </div>

        <div className="wd-flex-row-container wd-bg-color-green">
            My own work 2
        </div>
      </div>

      {/* AI example */}
      <div id="wd-ai-flex" className="wd-flex-row-container">
        <div className="wd-width-75px wd-bg-color-yellow">
          AI fixed
        </div>

        <div className="wd-bg-color-blue wd-fg-color-white">
          AI natural
        </div>

        <div className="wd-flex-grow-1 wd-bg-color-red wd-fg-color-white">
          AI growing
        </div>
      </div>
    </div>
  );
}