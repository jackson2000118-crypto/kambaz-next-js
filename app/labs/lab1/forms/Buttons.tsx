"use client";

export default function Buttons() {
  function sayHello() {
    alert("Life is Good!");
  }

  return (
    <div>
      <h5 id="wd-buttons">Buttons</h5>

      <button id="wd-html-button-save" type="button">
        Save
      </button>

      <button id="wd-html-button-cancel" type="button">
        Cancel
      </button>

      <button
        id="wd-all-good"
        type="button"
        onClick={sayHello}
      >
        Hello World!
      </button>
    </div>
  );
}