"use client";

import { useState } from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  ShieldCheck, 
  Camera,
  Smartphone,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "profile" | "security" | "notifications" | "preferences";

export default function StudentSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-12 relative">
      
      {/* Success Toast */}
      <div className={cn(
        "fixed top-4 right-4 z-50 bg-success-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 transform",
        showSavedToast ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
      )}>
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-bold">Settings saved successfully!</span>
      </div>

      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">Account Settings</h1>
        <p className="text-text-secondary">Manage your personal information, security, and preferences.</p>
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
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-1">Public Profile</h2>
                <p className="text-sm text-text-secondary">This information will be displayed to your tutors and classmates.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-glass-border">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md">
                    JD
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <button className="btn btn-secondary mb-2">Upload new avatar</button>
                  <p className="text-xs text-text-tertiary">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary">First Name</label>
                  <input type="text" className="form-input" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary">Last Name</label>
                  <input type="text" className="form-input" defaultValue="Doe" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-bold text-text-secondary">Email Address</label>
                  <input type="email" className="form-input" defaultValue="daniel222@gmail.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary">Phone Number</label>
                  <input type="tel" className="form-input" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary">Date of Birth</label>
                  <input type="date" className="form-input" />
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-1">Security & Login</h2>
                <p className="text-sm text-text-secondary">Keep your account secure with strong passwords and 2FA.</p>
              </div>

              <div className="space-y-6 pb-8 border-b border-glass-border">
                <h3 className="font-bold text-text-primary">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary">Current Password</label>
                    <input type="password" className="form-input" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary">New Password</label>
                    <input type="password" className="form-input" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary">Confirm New Password</label>
                    <input type="password" className="form-input" placeholder="••••••••" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between p-5 border border-glass-border rounded-2xl bg-bg-secondary">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary mb-1">Two-Factor Authentication (2FA)</h3>
                      <p className="text-sm text-text-secondary">Add an extra layer of security to your account. We'll ask for a code when you log in.</p>
                    </div>
                  </div>
                  <button className="btn btn-secondary whitespace-nowrap">Enable 2FA</button>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-1">Notifications</h2>
                <p className="text-sm text-text-secondary">Choose how and when you want to be notified.</p>
              </div>

              <div className="space-y-6">
                {/* Notification Group 1 */}
                <div className="space-y-4">
                  <h3 className="font-bold text-text-primary border-b border-glass-border pb-2">Classes & Assignments</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">Upcoming Class Reminders</p>
                      <p className="text-sm text-text-secondary">Get notified 30 minutes before a live class starts.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-glass-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">Assignment Deadlines</p>
                      <p className="text-sm text-text-secondary">Get an email reminder 24 hours before an assignment is due.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-glass-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">Grades Posted</p>
                      <p className="text-sm text-text-secondary">Be the first to know when a tutor grades your work.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-glass-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>

                {/* Notification Group 2 */}
                <div className="space-y-4 pt-4 border-t border-glass-border">
                  <h3 className="font-bold text-text-primary border-b border-glass-border pb-2">Billing & Account</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">Payment Receipts</p>
                      <p className="text-sm text-text-secondary">Email me a receipt immediately after a successful payment.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-glass-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === "preferences" && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-1">Preferences</h2>
                <p className="text-sm text-text-secondary">Customize your platform experience.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary">Language</label>
                  <select className="form-input bg-white">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary">Timezone</label>
                  <select className="form-input bg-white">
                    <option>(GMT+01:00) West Central Africa</option>
                    <option>(GMT+00:00) London</option>
                    <option>(GMT-05:00) Eastern Time</option>
                  </select>
                  <p className="text-xs text-text-tertiary">All class times will be displayed in this timezone.</p>
                </div>
              </div>

              <div className="p-5 border border-warning-200 rounded-2xl bg-warning-50 flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-warning-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-warning-800 mb-1">Danger Zone</h3>
                  <p className="text-sm text-warning-700 mb-4">Deleting your account is permanent. All your progress, certificates, and purchases will be lost.</p>
                  <button className="px-4 py-2 bg-white text-danger-600 border border-danger-200 rounded-lg font-bold text-sm hover:bg-danger-50 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Save Button */}
          <div className="mt-10 pt-6 border-t border-glass-border flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="btn btn-primary min-w-[120px]"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
