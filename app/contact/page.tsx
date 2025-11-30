'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Contact Form Submission')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:contact@example.com?subject=${subject}&body=${body}`
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container py-16">
      <h1 className="text-[40px] md:text-[40px] font-semibold mb-8">Contact</h1>
      
      <div className="space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-black px-4 py-2 bg-white text-black focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-black px-4 py-2 bg-white text-black focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={8}
              className="w-full border border-black px-4 py-2 bg-white text-black focus:outline-none focus:ring-0 resize-none"
            />
          </div>

          <button
            type="submit"
            className="border border-black px-6 py-2 bg-white text-black"
          >
            Send
          </button>
        </form>

        <div className="pt-8 border-t border-black">
          <p className="mb-4">Or send an email directly:</p>
          <a href="mailto:contact@example.com" className="hover:underline">
            contact@example.com
          </a>
        </div>
      </div>
    </div>
  )
}

