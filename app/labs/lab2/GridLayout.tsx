export default function GridLayout() {
  return (
    <div id="wd-css-grid-layout">
      <h2>Grid layout</h2>

      {/* Teacher example: 50% + 50% */}
      <div className="wd-grid-row">
        <div className="wd-grid-col-half-page wd-bg-color-yellow">
          <h3>Left half</h3>
        </div>

        <div className="wd-grid-col-half-page wd-bg-color-blue wd-fg-color-white">
          <h3>Right half</h3>
        </div>
      </div>

      {/* Teacher example: 20% + 60% + 20% */}
      <div className="wd-grid-row">
        <div className="wd-grid-col-left-sidebar wd-bg-color-yellow">
          <h3>Side bar</h3>
        </div>

        <div className="wd-grid-col-main-content wd-bg-color-blue wd-fg-color-white">
          <h3>Main content</h3>
        </div>

        <div className="wd-grid-col-right-sidebar wd-bg-color-green wd-fg-color-white">
          <h3>Side bar</h3>
        </div>
      </div>

    <div id="wd-your-grid" className="wd-grid-row">
        <div className="wd-grid-col-main-content wd-bg-color-green">
            <h3>My One third</h3>
        </div>

        <div className="wd-your-grid wd-bg-color-blue wd-fg-color-white">
            <h3>My Two thirds</h3>
        </div>
    </div>


      {/* AI example: 33% + 67% */}
      <div id="wd-ai-grid" className="wd-grid-row">
        <div className="wd-grid-col-third-page wd-bg-color-yellow">
          <h3>One third</h3>
        </div>

        <div className="wd-grid-col-two-thirds-page wd-bg-color-blue wd-fg-color-white">
          <h3>Two thirds</h3>
        </div>
      </div>

      <div className="wd-float-done" />
    </div>
  );
}