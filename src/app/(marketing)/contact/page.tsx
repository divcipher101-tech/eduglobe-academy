import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-bg-primary min-h-screen pt-24 pb-32">
      <div className="container">
        
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-600 font-medium text-sm mb-6">
            <MessageSquare className="w-4 h-4 mr-2" />
            We're Here to Help
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-text-primary mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-text-secondary">
            Have questions about our curriculum, enterprise solutions, or need technical support? Our global team is ready to assist you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto animate-fade-in-up delay-100">
          
          {/* Contact Form */}
          <div className="flex-1 bg-white p-10 md:p-12 rounded-[2.5rem] border border-glass-border shadow-2xl shadow-primary-900/5">
            <h3 className="text-2xl font-bold text-text-primary mb-8">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary">First Name</label>
                  <input type="text" placeholder="John" className="w-full px-5 py-4 rounded-2xl border border-glass-border focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all bg-bg-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full px-5 py-4 rounded-2xl border border-glass-border focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all bg-bg-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full px-5 py-4 rounded-2xl border border-glass-border focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all bg-bg-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary">How can we help?</label>
                <textarea rows={5} placeholder="Tell us more about your inquiry..." className="w-full px-5 py-4 rounded-2xl border border-glass-border focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all bg-bg-primary resize-none"></textarea>
              </div>
              <button type="button" className="w-full btn btn-primary py-4 text-lg rounded-2xl shadow-xl shadow-primary-500/20 flex items-center justify-center gap-2">
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="w-full lg:w-[400px] shrink-0 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-glass-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary text-lg mb-1">Email Us</h4>
                <p className="text-text-secondary text-sm mb-3">Our team typically replies within 24 hours.</p>
                <a href="mailto:support@eduglobe.com" className="font-medium text-primary-600 hover:text-primary-700">support@eduglobe.com</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-glass-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary text-lg mb-1">Call Us</h4>
                <p className="text-text-secondary text-sm mb-3">Available Mon-Fri, 9am-6pm (WAT).</p>
                <a href="tel:+2347052085561" className="font-medium text-primary-600 hover:text-primary-700">+234 705 208 5561</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-glass-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning-50 text-warning-600 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary text-lg mb-1">Headquarters</h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  EduGlobe Academy Campus<br/>
                  Poka Road, Epe<br/>
                  Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
