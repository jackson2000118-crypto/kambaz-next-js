"use client";

import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import CounterBroken from "./CounterBroken";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ProfileForm from "./profile/ProfileForm";
import ParentStateComponent from "./ParentStateComponent";
import ContextExamples from "./context/ContextExamples";
import ZustandExamples from "./zustand/ZustandExamples";
import Link from "next/link";
import ReduxExamples from "./redux/ReduxExamples";
import UrlEncoding from "./UrlEncoding";

export default function Lab4() {
  const sayHello = (message: string) => {
    alert(message);
  };

  const sayMyName = () => {
    alert("My name is MinHsun");
  };

  const sampleFromParent = () => {
    alert("Sample from parent");
  };

  return (
    <div id="wd-lab4">
      <h2>Lab 4</h2>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions
        message="Hello from Lab 4"
        theFunction={sayHello}
        sayMyName={sayMyName}
        theOtherFunction={sampleFromParent}
      />
      <CounterBroken />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ProfileForm />
      <ParentStateComponent />
      <ContextExamples />
      <ZustandExamples />
      <Link
        href="/labs/lab4/profile-form"
        className="text-blue-600 underline"
      >
        Compare Profile Forms
      </Link>
      <ReduxExamples />
      <Link
        href="/labs/lab4/hooks"
        className="block text-blue-600 underline"
      >
        Custom Hooks
      </Link>
      <UrlEncoding />
      <div className="my-3 flex flex-wrap gap-3">
        <Link
          href="/labs/lab4/url-encoding/query-params?a=5&b=10"
          className="text-blue-600 underline"
        >
          Query Calculator: 5 + 10
        </Link>

        <Link
          href="/labs/lab4/url-encoding/path-params/5/10"
          className="text-blue-600 underline"
        >
          Path Calculator: 5 + 10
        </Link>
      </div>
    </div>
  );
}