"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, Star, Clock, BookOpen, ChevronRight, X, AlertCircle } from "lucide-react";

export default function CourseCatalogClient({ initialCourses }: { initialCourses: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Courses");
  const [visibleCount, setVisibleCount] = useState(12);

  // Extract unique categories from the courses
  const categories = useMemo(() => {
    const cats = new Set<string>();
    initialCourses.forEach((c) => {
      if (c.subject?.name) {
        cats.add(c.subject.name);
      }
    });
    return ["All Courses", ...Array.from(cats)];
  }, [initialCourses]);

  // Filter courses based on search query and active category
  const filteredCourses = useMemo(() => {
    return initialCourses.filter((course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === "All Courses" || course.subject?.name === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialCourses, searchQuery, activeCategory]);

  const visibleCourses = filteredCourses.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCourses.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const getCategoryColor = (categoryName: string) => {
    if (!categoryName) return "bg-primary-500";
    if (categoryName.includes("Primary")) return "bg-info-500";
    if (categoryName.includes("Secondary") || categoryName.includes("WAEC")) return "bg-secondary-500";
    if (categoryName.includes("IGCSE") || categoryName.includes("A-Level")) return "bg-accent-500";
    if (categoryName.includes("Technology")) return "bg-primary-600";
    return "bg-warning-500";
  };

  return (
    <>
      {/* Header Section */}
      <div className="relative pt-36 pb-20 overflow-hidden bg-primary-950">
        <div className="absolute inset-0 bg-black/5 opacity-20 mix-blend-overlay"></div>
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-40 blur-3xl -z-10"
          style={{ backgroundImage: "radial-gradient(ellipse at top, var(--primary-600) 0%, transparent 70%)" }}
        ></div>
        
        <div className="container relative z-10 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Global Curriculum</span>
          </h1>
          <p className="text-xl text-primary-100/80 max-w-2xl mx-auto mb-10">
            World-class education tailored to international standards. Find the perfect course to advance your learning journey.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-primary-500/20 rounded-2xl blur-xl group-hover:bg-primary-500/30 transition-all -z-10"></div>
            <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-2xl transition-all">
              <Search className="absolute left-6 w-6 h-6 text-primary-200" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for subjects, topics, or exam boards..." 
                className="w-full pl-14 pr-4 py-4 bg-transparent text-white placeholder:text-primary-200/60 outline-none text-lg"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-6 p-1 rounded-full hover:bg-white/10 text-primary-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bg-primary min-h-screen py-12">
        <div className="container">
          
          {/* Category Horizontal Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 custom-scrollbar hide-scrollbar-on-mobile animate-fade-in-up delay-100">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(12); // Reset pagination on filter
                }}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all border ${
                  activeCategory === category
                    ? "bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20"
                    : "bg-white text-text-secondary border-glass-border hover:border-primary-300 hover:text-primary-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in-up delay-200">
            <h2 className="text-xl font-bold text-text-primary">
              {filteredCourses.length} {filteredCourses.length === 1 ? "Course" : "Courses"} Found
            </h2>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12 animate-fade-in-up delay-300">
                {visibleCourses.map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <div className="h-full bg-white border border-glass-border rounded-3xl overflow-hidden flex flex-col group cursor-pointer hover:shadow-xl hover:border-primary-200 transition-all hover:-translate-y-1">
                      
                      {/* Thumbnail Area */}
                      <div className="relative h-56 w-full overflow-hidden">
                        <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity ${getCategoryColor(course.subject?.name)}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                        
                        {/* Fake image using gradient if no thumbnail is set */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url(${course.thumbnailUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.title)}&background=random&color=fff&size=512`})` }}
                        />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                          <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                            {course.subject?.name || 'General'}
                          </span>
                        </div>
                        
                        {/* Price Tag */}
                        <div className="absolute bottom-4 right-4 z-20 bg-white text-text-primary px-4 py-1.5 rounded-xl font-black text-sm shadow-lg transform group-hover:-translate-y-1 transition-transform">
                          {course.currency === 'NGN' ? '₦' : course.currency}{Number(course.price).toLocaleString()}
                        </div>
                      </div>
                      
                      {/* Content Area */}
                      <div className="p-6 flex-1 flex flex-col relative bg-white">
                        <div className="flex items-center justify-between mb-4 text-sm text-text-secondary">
                          <div className="flex items-center gap-1.5 text-warning-500 font-bold bg-warning-50 px-2 py-1 rounded-lg border border-warning-100">
                            <Star className="w-4 h-4 fill-current" />
                            4.8
                          </div>
                          <div className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-4 h-4 text-primary-400" />
                            Self-paced
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-display font-bold text-text-primary mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        
                        <p className="text-sm text-text-secondary mb-6 flex-1 line-clamp-3">
                          {course.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-glass-border mt-auto">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs">
                              {course.tutor ? course.tutor.firstName[0] : 'E'}
                            </div>
                            <span className="text-sm font-bold text-text-primary">
                              {course.tutor ? `${course.tutor.firstName} ${course.tutor.lastName}` : 'EduGlobe Tutor'}
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                            <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-12 animate-fade-in-up">
                  <button 
                    onClick={handleLoadMore}
                    className="btn btn-secondary px-8 py-4 bg-white hover:bg-bg-secondary rounded-2xl shadow-sm hover:shadow-md border border-glass-border font-bold text-primary-600 flex items-center gap-2 transition-all"
                  >
                    Load More Courses
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in-up">
              <div className="w-24 h-24 rounded-full bg-bg-secondary flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-text-tertiary" />
              </div>
              <h3 className="text-2xl font-display font-bold text-text-primary mb-2">No courses found</h3>
              <p className="text-text-secondary max-w-md mx-auto mb-8">
                We couldn't find any courses matching your current filters and search query. Try adjusting them to see more results.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All Courses");
                }}
                className="btn btn-primary"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
