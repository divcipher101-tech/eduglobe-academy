"use client";

import { useState, useRef } from "react";
import { 
  User, Lock, Bell, Globe, Camera, Smartphone, CheckCircle2, AlertCircle, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { updateProfile, updatePassword, updateAvatar } from "@/app/actions/settings";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

type Tab = "profile" | "security" | "notifications" | "preferences";

export function AdminSettingsClient({ user }: { user: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ }) {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  
  // Profile State
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Password State
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const handleSaveProfile = async (formData: FormData) => {
    setIsSavingProfile(true);
    setProfileError("");
    setProfileSuccess(false);
    try {
      await updateProfile(formData);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 4000);
    } catch (err: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
      setProfileError(err.message || "Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSavePassword = async (formData: FormData) => {
    setIsSavingPassword(true);
    setPasswordError("");
    setPasswordSuccess(false);
    try {
      await updatePassword(formData);
      setPasswordSuccess(true);
      if (formRef.current) formRef.current.reset();
      setTimeout(() => setPasswordSuccess(false), 4000);
    } catch (err: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
      setPasswordError(err.message || "Failed to change password");
    } finally {
      setIsSavingPassword(false);
    }
  };

  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  // Format Date for default input (YYYY-MM-DD)
  const formattedDob = user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : "";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-12 relative">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary">System Settings</h1>
        <p className="text-text-secondary mt-1">Manage your administrator profile, security preferences, and system options.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab("profile")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left",
              activeTab === "profile" 
                ? "bg-primary-600 text-white shadow-md" 
                : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
            )}
          >
            <User className="w-5 h-5" /> Public Profile
          </button>
          
          <button 
            onClick={() => setActiveTab("security")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left",
              activeTab === "security" 
                ? "bg-primary-600 text-white shadow-md" 
                : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
            )}
          >
            <Lock className="w-5 h-5" /> Security & Login
          </button>
          
          <button 
            onClick={() => setActiveTab("notifications")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left",
              activeTab === "notifications" 
                ? "bg-primary-600 text-white shadow-md" 
                : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
            )}
          >
            <Bell className="w-5 h-5" /> Notifications
          </button>
          
          <button 
            onClick={() => setActiveTab("preferences")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left",
              activeTab === "preferences" 
                ? "bg-primary-600 text-white shadow-md" 
                : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
            )}
          >
            <Globe className="w-5 h-5" /> Preferences
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-3xl border border-glass-border shadow-sm p-8">
          
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <form action={handleSaveProfile} className="space-y-8 animate-fade-in-up" autoComplete="off">
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-1">Administrator Profile</h2>
                <p className="text-sm text-text-secondary">This information is visible to other system administrators.</p>
              </div>

              {profileError && (
                <div className="p-4 bg-danger-50 text-danger-700 rounded-xl flex items-center gap-3 text-sm font-medium">
                  <AlertCircle className="w-5 h-5 shrink-0" /> {profileError}
                </div>
              )}
              {profileSuccess && (
                <div className="p-4 bg-success-50 text-success-700 rounded-xl flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0" /> Profile updated successfully!
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-glass-border">
                <div className="relative group cursor-pointer w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt="Avatar" width={96} height={96} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary-100 text-primary-600 flex items-center justify-center text-3xl font-bold">
                      {initials}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={async (res) => {
                      if (res?.[0]) {
                        const url = res[0].url;
                        setAvatarUrl(url);
                        await updateAvatar(url);
                        setProfileSuccess(true);
                        setTimeout(() => setProfileSuccess(false), 4000);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      setProfileError(`Avatar upload failed: ${error.message}`);
                    }}
                    appearance={{
                      button: "bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-colors cursor-pointer border-0 outline-none w-auto inline-block",
                      allowedContent: "text-xs text-text-tertiary mt-2",
                      container: "items-start text-left flex flex-col"
                    }}
                    content={{
                      button: "Upload new avatar"
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary">First Name</label>
                  <input type="text" name="firstName" className="form-input" defaultValue={user.firstName} required autoComplete="off" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary">Last Name</label>
                  <input type="text" name="lastName" className="form-input" defaultValue={user.lastName} required autoComplete="off" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-bold text-text-secondary">Email Address</label>
                  <input type="email" name="email" className="form-input" defaultValue={user.email} required autoComplete="off" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary">Phone Number</label>
                  <input type="tel" name="phone" className="form-input" defaultValue={user.phone || ""} placeholder="+1 (555) 000-0000" autoComplete="off" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary">Date of Birth</label>
                  <input type="date" name="dateOfBirth" className="form-input" defaultValue={formattedDob} autoComplete="off" />
                </div>
              </div>

              <div className="flex justify-end border-t border-glass-border pt-6">
                <button type="submit" disabled={isSavingProfile} className="btn btn-primary min-w-[140px]">
                  {isSavingProfile ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Save Profile"}
                </button>
              </div>
            </form>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-1">Security & Login</h2>
                <p className="text-sm text-text-secondary">Keep your account secure with strong passwords and 2FA.</p>
              </div>

              <form ref={formRef} action={handleSavePassword} className="space-y-6 pb-8 border-b border-glass-border" autoComplete="off">
                <h3 className="font-bold text-text-primary">Change Password</h3>

                {passwordError && (
                  <div className="p-4 bg-danger-50 text-danger-700 rounded-xl flex items-center gap-3 text-sm font-medium">
                    <AlertCircle className="w-5 h-5 shrink-0" /> {passwordError}
                  </div>
                )}
                {passwordSuccess && (
                  <div className="p-4 bg-success-50 text-success-700 rounded-xl flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 shrink-0" /> Password updated successfully! You can use it on next login.
                  </div>
                )}

                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary">Current Password</label>
                    <input type="password" name="currentPassword" required className="form-input" placeholder="••••••••" autoComplete="new-password" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary">New Password</label>
                    <input type="password" name="newPassword" required className="form-input" placeholder="••••••••" autoComplete="new-password" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary">Confirm New Password</label>
                    <input type="password" name="confirmPassword" required className="form-input" placeholder="••••••••" autoComplete="new-password" />
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={isSavingPassword} className="btn btn-secondary min-w-[160px]">
                    {isSavingPassword ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Update Password"}
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                <div className="flex items-start justify-between p-5 border border-glass-border rounded-2xl bg-bg-secondary">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary mb-1">Two-Factor Authentication (2FA)</h3>
                      <p className="text-sm text-text-secondary">Add an extra layer of security to your account. We&apos;ll ask for a code when you log in.</p>
                    </div>
                  </div>
                  <button className="btn btn-secondary whitespace-nowrap">Enable 2FA</button>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <div className="py-20 text-center animate-fade-in-up">
              <Bell className="w-16 h-16 text-primary-200 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-text-primary mb-2">Notification Settings</h2>
              <p className="text-text-secondary">Coming soon in the next update.</p>
            </div>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === "preferences" && (
            <div className="py-20 text-center animate-fade-in-up">
              <Globe className="w-16 h-16 text-primary-200 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-text-primary mb-2">System Preferences</h2>
              <p className="text-text-secondary">Coming soon in the next update.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
