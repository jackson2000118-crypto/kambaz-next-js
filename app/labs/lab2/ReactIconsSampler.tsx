import "@/app/labs/lab2/tailwind/utilities.css";

import { FaCalendar, FaEnvelopeOpenText, FaRegClock } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBookBible } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
//ON my own
import { AiFillApple } from "react-icons/ai";
import { ImAirplane } from "react-icons/im";
// AI: two additional icon families
import { MdHome } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi2";


export default function ReactIconsSampler() {
  return (
    <div id="wd-react-icons-sampler" className="mb-4 font-sans">
      <h2 className="text-lg font-semibold">React Icons Sampler</h2>

      <div className="flex gap-3 text-3xl">
        {/* Teacher: six sample icons */}
        <VscAccount />
        <AiOutlineDashboard />
        <FaBookBible />
        <FaCalendar />
        <FaEnvelopeOpenText />
        <FaRegClock />

        {/* AI: two additional sample icons */}
        <MdHome className="text-4xl text-blue-600" />
        <HiAcademicCap className="text-4xl text-blue-600" />

        <AiFillApple className="text-4xl text-white-600"/>
        <ImAirplane className="text-4xl text-yellow-600"/>
      </div>
    </div>
  );
}