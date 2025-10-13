// src/pages/api/contact.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const response = await fetch("https://formspree.io/f/xovlgyzr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: "Failed to send message" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
