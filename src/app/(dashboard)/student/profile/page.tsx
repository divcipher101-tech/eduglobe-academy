import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { User, Mail, Calendar, GraduationCap, MapPin, Phone, Award, BookOpen, Clock } from "lucide-react";

export default async function StudentProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch full student profile details
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      studentProfile: true,
      courseEnrollments: {
        where: { status: "ACTIVE" }
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-12">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-glass-border shadow-sm overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 relative z-10">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden shrink-0">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-primary-100 to-primary-50 flex items-center justify-center">
                  <User className="w-12 h-12 text-primary-400" />
                </div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left mb-2">
              <h1 className="text-3xl font-display font-bold text-text-primary">{user.firstName} {user.lastName}</h1>
              <p className="text-primary-600 font-medium flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                <GraduationCap className="w-4 h-4" /> 
                {user.studentProfile?.educationLevel ? user.studentProfile.educationLevel.replace('_', ' ') : "Student"}
              </p>
            </div>
            <div className="mb-2">
              <span className="px-4 py-2 bg-success-50 text-success-700 rounded-full text-sm font-bold border border-success-100">
                Active Student
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Personal Info */}
        <div className="md:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-glass-border shadow-sm">
            <h2 className="text-lg font-bold text-text-primary mb-6">Personal Details</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-text-tertiary font-bold uppercase tracking-wider">Email</p>
                  <p className="text-sm font-medium text-text-primary mt-0.5 break-all">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-text-tertiary font-bold uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-medium text-text-primary mt-0.5">{user.phone || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-text-tertiary font-bold uppercase tracking-wider">Joined</p>
                  <p className="text-sm font-medium text-text-primary mt-0.5">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-text-tertiary font-bold uppercase tracking-wider">Timezone</p>
                  <p className="text-sm font-medium text-text-primary mt-0.5">{user.timezone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Academic Stats */}
        <div className="md:col-span-2 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-glass-border shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{user.courseEnrollments.length}</p>
                <p className="text-sm text-text-secondary font-medium">Active Courses</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-glass-border shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">0</p>
                <p className="text-sm text-text-secondary font-medium">Certificates</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-glass-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text-primary">Learning Overview</h2>
            </div>
            
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
              <div className="w-16 h-16 bg-bg-tertiary rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-text-tertiary" />
              </div>
              <div>
                <p className="font-bold text-text-primary">Your journey is just beginning!</p>
                <p className="text-sm text-text-secondary max-w-sm mt-1">
                  Enroll in a course to see your progress and achievements appear here over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
