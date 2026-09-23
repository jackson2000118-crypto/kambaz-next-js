export default function Checkboxes() {
  return (
    <div>
      <h5>Checkboxes</h5>
      Favorite movie genre:
      <br />

      <input
        id="wd-chkbox-comedy"
        type="checkbox"
        name="check-genre"
        value="COMEDY"
      />
      <label htmlFor="wd-chkbox-comedy">Comedy</label>
      <br />

      <input
        id="wd-chkbox-drama"
        type="checkbox"
        name="check-genre"
        value="DRAMA"
      />
      <label htmlFor="wd-chkbox-drama">Drama</label>
      <br />

      <input
        id="wd-chkbox-scifi"
        type="checkbox"
        name="check-genre"
        value="SCIFI"
      />
      <label htmlFor="wd-chkbox-scifi">Science Fiction</label>
      <br />

      <input
        id="wd-chkbox-fantasy"
        type="checkbox"
        name="check-genre"
        value="FANTASY"
      />
      <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
    </div>
  );
}