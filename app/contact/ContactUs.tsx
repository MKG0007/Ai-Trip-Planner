'use client'

import { useState } from 'react'
import { Loader2, Mail, User, MessageSquare } from 'lucide-react'
import emailjs from '@emailjs/browser'

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    // Replace with your EmailJS credentials
    const serviceId = 'service_q4bquxy'
    const templateId = 'template_k3rvz3j'
    const publicKey = '4ZC9CRC7zFfWQrdMDUIBv'

    emailjs
      .send(serviceId, templateId, formData, publicKey)
      .then(() => {
        setLoading(false)
        setSuccess('Your message has been sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      })
      .catch(() => {
        setLoading(false)
        setError('Oops! Something went wrong. Please try again later.')
      })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 px-4">
      <div className="w-full max-w-2xl shadow-2xl rounded-2xl bg-white dark:bg-neutral-900">
        {/* Header */}
        <div className="text-center p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-3xl font-bold text-primary">Contact Us</h2>
          <p className="text-muted-foreground mt-2">
            Have questions? Fill out the form below and we’ll get back to you
            soon.
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="flex items-center gap-2">
              <User className="text-primary w-5 h-5" />
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <Mail className="text-primary w-5 h-5" />
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Subject */}
            <div className="flex items-center gap-2">
              <MessageSquare className="text-primary w-5 h-5" />
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Message */}
            <textarea
              placeholder="Write your message here..."
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full h-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3 text-lg font-semibold flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {/* Success / Error Messages */}
            {success && <p className="text-green-600 text-center">{success}</p>}
            {error && <p className="text-red-600 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
