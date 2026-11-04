import ProfileForm from "../profile/ProfileForm";
import ContextProfileForm from "../context/ContextProfileForm";
import ZustandProfileForm from "../zustand/ZustandProfileForm";

export default function ProfileFormPage() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <h1>Profile Form Comparison</h1>

      <ProfileForm />
      <ContextProfileForm />
      <ZustandProfileForm />
    </div>
  );
}