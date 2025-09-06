"use client"

import React, { useState } from "react"
import { Github, Linkedin, Mail, FileText, Send, MapPin, Phone } from "lucide-react"

const ContactLayout = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const contactMethods = [
    { 
      icon: Mail, 
      title: "Email", 
      value: "hello@example.com",
      href: "mailto:hello@example.com"
    },
    { 
      icon: Phone, 
      title: "Phone", 
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    { 
      icon: MapPin, 
      title: "Location", 
      value: "Available Worldwide",
      href: null
    },
  ]

  const socialLinks = [
    { 
      icon: Github, 
      title: "GitHub", 
      href: "https://github.com",
      label: "View repositories"
    },
    { 
      icon: Linkedin, 
      title: "LinkedIn", 
      href: "https://linkedin.com",
      label: "Connect professionally"
    },
    { 
      icon: FileText, 
      title: "Resume", 
      href: "#",
      label: "Download PDF"
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
            Get in Touch
          </h1>
          <div className="w-16 h-px bg-black mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Im always open to discussing new opportunities and interesting projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12">
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl font-light mb-8 tracking-tight">Contact Information</h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-10 h-10 border border-black flex items-center justify-center">
                      <method.icon size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-sm uppercase tracking-wider text-gray-600 mb-1">
                        {method.title}
                      </p>
                      {method.href ? (
                        <a 
                          href={method.href}
                          className="text-black hover:text-gray-600 transition-colors duration-200"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-black">{method.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h2 className="text-2xl font-light mb-8 tracking-tight">Connect</h2>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center justify-between p-4 border border-gray-200 hover:border-black transition-colors duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <link.icon size={20} className="group-hover:text-gray-600 transition-colors duration-200" />
                      <div>
                        <p className="font-medium">{link.title}</p>
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

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-light mb-8 tracking-tight">Send a Message</h2>
            
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
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-black focus:outline-none transition-colors duration-200 bg-transparent"
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
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-black focus:outline-none transition-colors duration-200 bg-transparent"
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
                  rows={4}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-black focus:outline-none transition-colors duration-200 bg-transparent resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-4 px-6 hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="text-center py-4 text-gray-600">
                  Message sent successfully!
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Available for freelance work and full-time opportunities
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactLayout;