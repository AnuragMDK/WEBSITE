import { useState } from "react"
import { supabase } from "./supabase"

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setStatus("Sending...")

    const { error } = await supabase.from("contact").insert([form])

    if (error) {
      setStatus("Error sending message.")
    } else {
      setStatus("Message sent successfully!")
      setForm({ name: "", email: "", message: "" })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl font-bold text-primary mb-6">
          Cyber Vision UAE
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Advanced Cybersecurity, Firewall, CCTV & Network Solutions in UAE.
        </p>
      </section>

      <section className="py-20 px-6 bg-secondary">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <input
            className="w-full p-3 bg-black border border-gray-700 rounded"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="w-full p-3 bg-black border border-gray-700 rounded"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />

          <textarea
            className="w-full p-3 bg-black border border-gray-700 rounded"
            placeholder="Message"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            required
          />

          <button className="w-full bg-primary text-black p-3 rounded font-bold">
            Send Message
          </button>

          {status && <p className="text-center">{status}</p>}
        </form>
      </section>
    </div>
  )
}
