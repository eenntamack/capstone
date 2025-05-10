import axios from 'axios'
import React from 'react'

export default function Seed() {
  const handleSeed = async () => {
    try {
      const res = await axios.get("http://localhost:3000/seed/populate")
      console.log(res.data)
      alert("User seeded: " + res.data.user.username)
    } catch (err) {
      console.error(err)
      alert("Failed to seed user.")
    }
  }

  return (
    <button onClick={handleSeed}>
      Seed User
    </button>
  )
}