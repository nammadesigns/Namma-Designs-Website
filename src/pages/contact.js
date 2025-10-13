// pages/api/contact.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const formResponse = await fetch("https://formspree.io/f/xovlgyzr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (formResponse.ok) {
      return res.status(200).json({ success: true });
    } else {
      const data = await formResponse.json();
      return res
        .status(400)
        .json({ success: false, error: data.error || "Formspree failed" });
    }
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
