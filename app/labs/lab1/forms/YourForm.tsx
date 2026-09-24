export default function YourForm(){
    return (
        <div id="wd-your-form">
            <h5>Student Profile</h5>

            <label htmlFor="StudentFields-Username">UserName:</label>
            <input
            id="StudentFields-Username"
            type="text"
            placeholder="Jackson"
            />
            <br />

            <label htmlFor="StudentEmail">Email:</label>
            <input
            id="StudentEmail"
            type="email"
            placeholder="123@321.edu"
            />
            <br />

            <label htmlFor="StudentPassword">Password:</label>
            <input
            id="StudentPassword"
            type="password"
            placeholder="password"
            />
            <br />

            <label htmlFor="StudentID">StudentID:</label>
            <input
            id="StudentID"
            type="text"
            placeholder="N12345678"
            />
            <br />

            <label htmlFor="Studentbirthday">Date:</label>
            <input
            id="Studentbirthday"
            type="date"
            />
            <br />

            <label htmlFor="StudentBiography">About me:</label>
            <br />
            <textarea
            id="StudentBiography"
            cols={30}
            rows={10}
            placeholder="Introduce yourself here."
            />
            <br />


            <h5>Select your Major</h5>
            <input
            id="student-major-business"
            type="radio"
            name="student-major"
            value="Business"
            />
            <label htmlFor="student-major-business">Business</label>
            <br />
            
            <input
            id="student-major-computer-science"
            type="radio"
            name="student-major"
            value="ComputerScience"
            />
            <label htmlFor="student-major-business">ComputerScience</label>
            <br />

            <h5>Courses</h5>
            <label htmlFor="student-courses">Select your courses:</label>
            <br />

            <select
            id="student-courses"
            multiple
            defaultValue={["WEB"]}
            >
            <option value="WEB">Web Development</option>
            <option value="DATABASE">Database Management</option>
            <option value="ALGORITHMS">Algorithms</option>
            <option value="Marketing">Marketing</option>
            <option value="Management">Management</option>
            </select>
            <br />

            <h5>Interests</h5>
            <input
            id="student-interest-gaming"
            type="checkbox"
            name="student-interests"
            value="GAMING"
            />
            <label htmlFor="student-interest-gaming">Gaming</label>
            <br />

            <input
            id="student-interest-music"
            type="checkbox"
            name="student-interests"
            value="MUSIC"
            />
            <label htmlFor="student-interest-music">Music</label>
            <br />

            <input
            id="student-interest-sports"
            type="checkbox"
            name="student-interests"
            value="SPORTS"
            />
            <label htmlFor="student-interest-sports">Sports</label>
            <br />

            <h5>Grade</h5>
            <label htmlFor="Student-select-your-grade">
                Select your grade
            </label>
            <br />

            <select id="Student-select-your-grade" defaultValue="Year1">
                <option value="Year1">Year1</option>
                <option value="Year2">Year2</option>
                <option value="Year3">Year3</option>
                <option value="Year4">Year4</option>
            </select>
            <br />

            <label htmlFor="Student-income">
            Student Income
            </label>
            <input
            id="Student-income"
            type="number"
            placeholder="1000"
            defaultValue="1000000000"
            />
            <br />

            <label htmlFor="Student-mental-health">
                Mental Health
            </label>
            <input
            id="Student-mental-health"
            type="range"
            max="10"
            defaultValue="4"
            />
            <br />

            <label htmlFor="Student-upload">Photo Upload:</label>
            <input 
            id="Student-upload"
            type="file"
            />

            <br />
            <button id="My-save" type="button">
            Save
            </button>

            <button id="My-cancel" type="button">
            Cancel
            </button>
        </div>
    )
}