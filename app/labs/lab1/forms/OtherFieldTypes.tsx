export default function OtherFieldTypes() {
  return (
    <div>
      <h5>Other HTML field types</h5>

      <label htmlFor="wd-text-fields-email">Email:</label>
      <input
        id="wd-text-fields-email"
        type="email"
        placeholder="jdoe@somewhere.com"
      />
      <br />

      <label htmlFor="wd-text-fields-salary-start">
        Starting salary:
      </label>
      <input
        id="wd-text-fields-salary-start"
        type="number"
        placeholder="1000"
        defaultValue="100000"
      />
      <br />

      <label htmlFor="wd-text-fields-rating">Rating:</label>
      <input
        id="wd-text-fields-rating"
        type="range"
        max="5"
        defaultValue="4"
      />
      <br />

      <label htmlFor="wd-text-fields-dob">Date of birth:</label>
      <input
        id="wd-text-fields-dob"
        type="date"
        defaultValue="2000-01-21"
      />
    </div>
  );
}