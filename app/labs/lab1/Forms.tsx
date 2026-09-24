import TextFields from "./forms/TextFields"
import YourForm from "./forms/YourForm"
import Textarea from "./forms/Textarea";
import Buttons from "./forms/Buttons";
import FileUpload from "./forms/FileUpload";
import RadioButtons from "./forms/RadioButtons";
import Checkboxes from "./forms/Checkboxes";
import Dropdowns from "./forms/Dropdowns";
import OtherFieldTypes from "./forms/OtherFieldTypes";

export default function Forms() {
  return (
    <div id="wd-forms">
      <h4>Forms</h4>
      <TextFields />
      <Textarea />
      <Buttons />
      <FileUpload />
      <RadioButtons />
      <Checkboxes />
      <Dropdowns />
      <OtherFieldTypes />      
      <YourForm />
    </div>
  );
}