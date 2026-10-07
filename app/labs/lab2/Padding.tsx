export default function Padding() {
  return (
    <div id="wd-css-paddings">
      <h2>Padding</h2>

    <div className="wd-padded-top-left wd-border-fat wd-border-red wd-border-solid wd-bg-color-yellow">
        Padded top left
    </div>

    <div className="wd-padded-bottom-right wd-border-fat wd-border-blue wd-border-solid wd-bg-color-yellow">
        Padded bottom right
    </div>

    <div className="wd-padding-fat wd-border-fat wd-border-yellow wd-border-solid wd-bg-color-blue wd-fg-color-white">
        Padded all around
    </div>

    <div className="wd-your-padding-left wd-border-fat wd-border-black wd-border-dashed wd-bg-color-yellow">
    Padding Own work
    </div>

    <div
        id="wd-ai-padded"
        className="wd-ai-padding-top wd-border-fat wd-border-red wd-border-solid wd-bg-color-yellow"
        >
        This sample box has padding only at the top.
    </div>
    </div>
  );
}