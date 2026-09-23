export default function RadioButtons() {
  return (
    <div>
      <h5>Radio buttons</h5>
      Favorite movie genre:
      <br />

      <input
        id="wd-radio-comedy"
        type="radio"
        name="radio-genre"
        value="COMEDY"
      />
      <label htmlFor="wd-radio-comedy">Comedy</label>
      <br />

      <input
        id="wd-radio-drama"
        type="radio"
        name="radio-genre"
        value="DRAMA"
      />
      <label htmlFor="wd-radio-drama">Drama</label>
      <br />

      <input
        id="wd-radio-scifi"
        type="radio"
        name="radio-genre"
        value="SCIFI"
      />
      <label htmlFor="wd-radio-scifi">Science Fiction</label>
      <br />

      <input
        id="wd-radio-fantasy"
        type="radio"
        name="radio-genre"
        value="FANTASY"
      />
      <label htmlFor="wd-radio-fantasy">Fantasy</label>
      <br />

      How often do you watch movies?
      <br />

      <input
        id="wd-radio-daily"
        type="radio"
        name="radio-frequency"
        value="DAILY"
      />
      <label htmlFor="wd-radio-daily">Daily</label>
      <br />

      <input
        id="wd-radio-weekly"
        type="radio"
        name="radio-frequency"
        value="WEEKLY"
      />
      <label htmlFor="wd-radio-weekly">Weekly</label>
      <br />

      <input
        id="wd-radio-rarely"
        type="radio"
        name="radio-frequency"
        value="RARELY"
      />
      <label htmlFor="wd-radio-rarely">Rarely</label>
    </div>
  );
}