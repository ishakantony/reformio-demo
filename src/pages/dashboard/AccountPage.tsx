import { useState } from "react";
import { getUser, updateUser, changePassword } from "../../auth";
import { useToast } from "../../components/Toast";

export default function AccountPage() {
  const user = getUser()!;
  const { toast } = useToast();

  const [name, setName] = useState(user.name);
  const [profileErr, setProfileErr] = useState("");

  const [ecName, setEcName] = useState(user.emergencyContact?.name ?? "");
  const [ecPhone, setEcPhone] = useState(user.emergencyContact?.phone ?? "");

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwErr, setPwErr] = useState("");

  function saveProfile() {
    if (!name.trim()) {
      setProfileErr("Name cannot be empty.");
      return;
    }
    updateUser({ name: name.trim() });
    setProfileErr("");
    toast("Name updated.");
  }

  function saveEmergencyContact() {
    updateUser({ emergencyContact: { name: ecName.trim(), phone: ecPhone.trim() } });
    toast("Emergency contact updated.");
  }

  function savePassword() {
    setPwErr("");
    if (!newPw) {
      setPwErr("New password cannot be empty.");
      return;
    }
    if (newPw !== confirmPw) {
      setPwErr("New passwords do not match.");
      return;
    }
    const result = changePassword(currentPw, newPw);
    if (!result.ok) {
      setPwErr(result.error);
      return;
    }
    toast("Password changed successfully.");
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
  }

  const inputClass =
    "w-full rounded-lg border border-divider bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-warm-brown/30 focus:border-warm-brown transition-colors duration-200";
  const labelClass = "block text-sm font-medium text-charcoal mb-1.5";
  const btnClass =
    "rounded-lg bg-warm-brown px-5 py-2.5 text-sm font-medium text-cream hover:bg-warm-brown/90 transition-colors duration-200";

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium text-charcoal mb-1">Account</h1>
        <p className="text-muted">Manage your profile and security settings</p>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <section className="rounded-xl border border-divider bg-white p-6">
          <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setProfileErr(""); }}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className={`${inputClass} bg-cream/50 text-muted cursor-not-allowed`}
              />
            </div>
          </div>
          {profileErr && <p className="text-sm text-rose mt-3">{profileErr}</p>}
          <div className="mt-5">
            <button onClick={saveProfile} className={btnClass}>Save</button>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="rounded-xl border border-divider bg-white p-6">
          <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Emergency Contact</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Contact Name</label>
              <input
                type="text"
                value={ecName}
                onChange={(e) => setEcName(e.target.value)}
                placeholder="Full name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input
                type="tel"
                value={ecPhone}
                onChange={(e) => setEcPhone(e.target.value)}
                placeholder="+61 400 000 000"
                className={inputClass}
              />
            </div>
          </div>
          <div className="mt-5">
            <button onClick={saveEmergencyContact} className={btnClass}>Save</button>
          </div>
        </section>

        {/* Change Password */}
        <section className="rounded-xl border border-divider bg-white p-6">
          <h2 className="font-serif text-xl font-medium text-charcoal mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Current Password</label>
              <input
                type="password"
                value={currentPw}
                onChange={(e) => { setCurrentPw(e.target.value); setPwErr(""); }}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>New Password</label>
              <input
                type="password"
                value={newPw}
                onChange={(e) => { setNewPw(e.target.value); setPwErr(""); }}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Confirm New Password</label>
              <input
                type="password"
                value={confirmPw}
                onChange={(e) => { setConfirmPw(e.target.value); setPwErr(""); }}
                className={inputClass}
              />
            </div>
          </div>
          {pwErr && <p className="text-sm text-rose mt-3">{pwErr}</p>}
          <div className="mt-5">
            <button onClick={savePassword} className={btnClass}>Save</button>
          </div>
        </section>
      </div>
    </>
  );
}
