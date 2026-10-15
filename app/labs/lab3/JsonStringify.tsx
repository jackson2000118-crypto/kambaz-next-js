export default function JsonStringify() {
  const squares = [1, 4, 16, 25, 36];

  // On your own
  const course = { course: "CS5500", credits: 4 }

  return (
    <div id="wd-json-stringify">
      <h3>JSON Stringify</h3>

      squares = {JSON.stringify(squares)}
      <br />

      {/* On your own */}
      course = {JSON.stringify(course)}

      {/* With AI */}
      sampleCourse = {JSON.stringify({ course: "RS102", modules: 3 })}

      <hr />
    </div>
  );
}