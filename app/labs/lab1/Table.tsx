export default function Tables() {
  return (
    <div id="wd-tables">
      <h4>Table Tag</h4>

      <table border={1}>
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Topic</th>
            <th>Date</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Q1</td>
            <td>HTML</td>
            <td>2/3/21</td>
            <td>85</td>
          </tr>
          <tr>
            <td>Q2</td>
            <td>CSS</td>
            <td>2/10/21</td>
            <td>90</td>
          </tr>
          <tr>
            <td>Q3</td>
            <td>JavaScript</td>
            <td>2/17/21</td>
            <td>95</td>
          </tr>
          <tr>
            <td>Q4</td>
            <td>React</td>
            <td>2/24/21</td>
            <td>80</td>
          </tr>
          <tr>
            <td>Q5</td>
            <td>Props</td>
            <td>3/3/21</td>
            <td>88</td>
          </tr>
          <tr>
            <td>Q6</td>
            <td>State</td>
            <td>3/10/21</td>
            <td>92</td>
          </tr>
          <tr>
            <td>Q7</td>
            <td>Routing</td>
            <td>3/17/21</td>
            <td>84</td>
          </tr>
          <tr>
            <td>Q8</td>
            <td>Node.js</td>
            <td>3/24/21</td>
            <td>96</td>
          </tr>
          <tr>
            <td>Q9</td>
            <td>Database</td>
            <td>3/31/21</td>
            <td>90</td>
          </tr>
          <tr>
            <td>Q10</td>
            <td>Deployment</td>
            <td>4/7/21</td>
            <td>94</td>
          </tr>
        </tbody>

      <tfoot>
        <tr>
          <td colSpan={3}>Average</td>
          <td>89.4</td>
        </tr>
      </tfoot>
      </table>

      <h4>My Favorite Games</h4>

      <table id="wd-your-table" border={1}>
        <thead>
          <tr>
            <th>Game</th>
            <th>Genre</th>
            <th>My Rating</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Monster Hunter: World</td>
            <td>Action RPG</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Sekiro: Shadows Die Twice</td>
            <td>Action RPG</td>
            <td>10</td>
          </tr>
          <tr>
            <td>NBA 2K25</td>
            <td>Sports</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}