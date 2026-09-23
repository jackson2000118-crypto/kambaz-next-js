export default function Textarea() {
  return (
    <div>
      <h5>Text boxes</h5>
      <label htmlFor="wd-textarea">Biography:</label>
      <br />
      <textarea
        id="wd-textarea"
        cols={30}
        rows={10}
        defaultValue="Lorem ipsum dolor sit amet..."
      />
    </div>
  );
}