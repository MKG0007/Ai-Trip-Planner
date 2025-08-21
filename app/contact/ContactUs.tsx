'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'   // ✅ uncommented
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'  // ✅ uncommented
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    // Replace these with your EmailJS values
    const serviceId = 'your_service_id'
    const templateId = 'your_template_id'
    const publicKey = 'your_public_key'

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
      <Card className="w-full max-w-2xl shadow-2xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Contact Us</CardTitle>
          <p className="text-muted-foreground mt-2">
            Have questions? Fill out the form below and we’ll get back to you soon.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="flex items-center gap-2">
              <User className="text-primary w-5 h-5" />
              <Input
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <Mail className="text-primary w-5 h-5" />
              <Input
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Subject */}
            <div className="flex items-center gap-2">
              <MessageSquare className="text-primary w-5 h-5" />
              <Input
                type="text"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message */}
            <Textarea
              placeholder="Write your message here..."
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="h-32"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg font-semibold flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? 'Sending...' : 'Send Message'}
            </Button>

            {/* Success / Error Messages */}
            {success && <p className="text-green-600 text-center">{success}</p>}
            {error && <p className="text-red-600 text-center">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactUs
