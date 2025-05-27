import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate the request data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if we have email credentials
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS

    // For local development without environment variables
    if (!emailUser || !emailPass) {
      console.log("Email credentials not found. Using local development mode.")
      console.log("Form submission:", { name, email, subject, message })

      // Return success for local testing
      return NextResponse.json({
        success: true,
        message: "Local development mode: Email would be sent in production",
        data: { name, email, subject, message },
      })
    }

    // Create a transporter with provided credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    // Email content
    const mailOptions = {
      from: emailUser,
      to: "shubhmehta2604@gmail.com", // Your email address
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    }

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions)
      console.log("Email sent successfully:", info.response)
      return NextResponse.json({ success: true, message: "Email sent successfully" })
    } catch (emailError) {
      console.error("Error sending email:", emailError)
      return NextResponse.json(
        {
          error: "Failed to send email",
          details: emailError.message,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json(
      {
        error: "Server error processing request",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
