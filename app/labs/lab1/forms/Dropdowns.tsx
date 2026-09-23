export default function Dropdowns() {
  return (
    <div>
      <h5>Dropdowns</h5>

      <h6>Select one</h6>
      <label htmlFor="wd-select-one-genre">
        Favorite movie genre:
      </label>
      <br />

      <select id="wd-select-one-genre" defaultValue="SCIFI">
        <option value="COMEDY">Comedy</option>
        <option value="DRAMA">Drama</option>
        <option value="SCIFI">Science Fiction</option>
        <option value="FANTASY">Fantasy</option>
      </select>

      <h6>Select many</h6>
      <label htmlFor="wd-select-many-genre">
        Favorite movie genres:
      </label>
      <br />

      <select
        id="wd-select-many-genre"
        multiple
        defaultValue={["COMEDY", "SCIFI"]}
      >
        <option value="COMEDY">Comedy</option>
        <option value="DRAMA">Drama</option>
        <option value="SCIFI">Science Fiction</option>
        <option value="FANTASY">Fantasy</option>
      </select>
    </div>
  );
}