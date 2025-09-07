"use client";

import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Send,
  MapPin,
  Phone,
} from "lucide-react";
import emailjs from 'emailjs-com';

const ContactLayout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID, // For Vite. Use process.env.REACT_APP_EMAIL_SERVICE_ID for CRA.
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAIL_USER_ID
      );

      setFormData({ name: "", email: "", message: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Email send error:", error);
      alert("Failed to send message. Try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "crispy.swap@gmail.com",
      href: "mailto:crispy.swap@gmail.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "The Nether",
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      title: "GitHub",
      href: "https://github.com/grilled-swampert",
      label: "View repositories",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/swapnil-ranadive-crispy/",
      label: "Connect professionally",
    },
    {
      icon: FileText,
      title: "Resume",
      href: "https://drive.google.com/file/d/1PYeu5RQ7j1iIo1yBSMnffvjR8B-DtpG-/view?usp=sharing",
      label: "Download PDF",
    },
  ];

  return (
    <div id="contact" className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-200 to-white text-black pt-72">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
            Get in Touch
          </h1>
          <div className="w-16 h-px bg-black mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Im always open to discussing new opportunities and interesting
            ideas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-light mb-8 tracking-tight">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-10 h-10 border border-black flex items-center justify-center">
                      <method.icon size={16} />
                    </div>
                    <div>
                      <p className="font-normal text-sm uppercase tracking-wider text-gray-600 ">
                        {method.title}
                      </p>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="text-black text-2xl hover:text-gray-600 transition-colors duration-200"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-black text-2xl">{method.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-light mb-8 tracking-tight">
                Connect
              </h2>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center justify-between p-4 border border-gray-200 hover:border-black transition-colors duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <link.icon
                        size={20}
                        className="group-hover:text-gray-600 transition-colors duration-200"
                      />
                      <div>
                        <p className="font-medium text-xl">{link.title}</p>
                        <p className="text-sm text-gray-600">{link.label}</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 border border-gray-300 group-hover:border-black transition-colors duration-200 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 group-hover:bg-black transition-colors duration-200"></div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-light mb-8 tracking-tight">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 text-xl border-0 border-b border-gray-300 focus:border-black focus:outline-none transition-colors duration-200 bg-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 text-xl border-0 border-b border-gray-300 focus:border-black focus:outline-none transition-colors duration-200 bg-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-0 py-3 text-xl border-0 border-b border-gray-300 focus:border-black focus:outline-none transition-colors duration-200 bg-transparent resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-xl text-white py-4 px-6 hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>

              {submitted && (
                <div className="text-center text-2xl py-4 text-gray-600">
                  Message sent successfully!
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Available for freelance work and full-time opportunities
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactLayout;
