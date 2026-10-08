import "./MediaQueriesDemo.css";

export default function MediaQueriesDemo() {
  return (
    <div className="wd-media-queries-demo">
      <h2>Media Query Demo</h2>

      <p>
        This demo changes colors based on the browser viewport width.
      </p>

      <ul>
        <li className="wd-mq-rule-default">
          Base style: white text on green, before media overrides
        </li>

        <li className="wd-mq-rule-750">
          750px to below 1000px: black text on yellow
        </li>

        <li className="wd-mq-rule-1000">
          1000px to below 1250px: white text on blue
        </li>

        <li className="wd-mq-rule-1250">
          1250px and above: white text on red
        </li>

        <li className="wd-mq-rule-your">
        1500px and above: white text on teal
        </li>
        <li className="wd-mq-rule-1250">
        1250px to below 1500px: white text on red
        </li>

        <li className="wd-mq-rule-ai">
          749px and below: white text on purple
        </li>
      </ul>
    </div>
  );
}