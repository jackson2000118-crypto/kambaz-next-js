import HeadingTags from "./HeadingTags";
import ParagraphTag from "./ParagraphTag";
import ListTags from "./ListTags";
import Table from "./Table";
import Image from "./Image";
import Forms from "./Forms";
import HighlightedParagraphLab from "./HighlightedParagraph";
import HighlightedBoxLab from "./HighlightedBox";

export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>

      <HeadingTags />
      <ParagraphTag />
      <ListTags />
      <Table />
      <Image />
      <Forms />
      <HighlightedParagraphLab />
      <HighlightedBoxLab />
    </div>
  );
}