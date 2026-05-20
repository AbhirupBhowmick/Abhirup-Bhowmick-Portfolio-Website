import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, customSubject, message, honeypot } = body;

    // 1. Anti-Spam Honeypot Verification
    if (honeypot) {
      console.warn("[SECURITY] Honeypot field filled. Silently ignoring submission.");
      return NextResponse.json({ 
        success: true, 
        message: "system~ Communication node established." 
      });
    }

    // 2. Server-side Inputs Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name field is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    const finalSubject = subject === "Custom" ? (customSubject || "General Inquiry") : (subject || "General Inquiry");

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message content cannot be empty." }, { status: 400 });
    }

    // Sanitize message content to prevent HTML injections in logs/previews
    const sanitizedMessage = message.replace(/<[^>]*>/g, "");

    // 3. Initialize Resend Client
    const apiKey = process.env.RESEND_API_KEY;
    const isDev = process.env.NODE_ENV === "development";
    
    // Fallback: If no Resend API Key is defined, simulate successful delivery in Dev/Demo environments.
    if (!apiKey) {
      console.warn("[WARNING] RESEND_API_KEY environment variable is not defined. Simulating delivery.");
      
      // Simulate minor network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "system~ Secure communication channel established (Simulated mode)."
      });
    }

    const resend = new Resend(apiKey);
    const dateStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    // 4. Dispatch email transaction
    const { data, error } = await resend.emails.send({
      from: "Portfolio Connection <onboarding@resend.dev>",
      to: "abhirupbhowmick111777@gmail.com",
      subject: `[PORTFOLIO] ${finalSubject} - ${name}`,
      html: `
        <div style="font-family: monospace; background-color: #09090b; color: #a1a1aa; padding: 40px; border: 1px solid #27272a; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ffffff; font-size: 16px; border-bottom: 1px solid #27272a; padding-bottom: 15px; margin-top: 0; margin-bottom: 20px; letter-spacing: 0.1em; text-transform: uppercase;">
            SYSTEM TRANSMISSION // CONNECT REQUEST
          </h1>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 12px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #ffffff; width: 120px; text-transform: uppercase;">SENDER:</td>
              <td style="padding: 6px 0; color: #e4e4e7;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #ffffff; text-transform: uppercase;">EMAIL:</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #ffffff; text-transform: uppercase;">CATEGORY:</td>
              <td style="padding: 6px 0; color: #e4e4e7;">${finalSubject}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #ffffff; text-transform: uppercase;">TIMESTAMP:</td>
              <td style="padding: 6px 0; color: #e4e4e7;">${dateStr} (IST)</td>
            </tr>
          </table>
          <div style="border-top: 1px solid #27272a; padding-top: 20px;">
            <p style="font-size: 12px; font-weight: bold; color: #ffffff; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em;">MESSAGE PAYLOAD:</p>
            <p style="font-size: 13px; white-space: pre-wrap; line-height: 1.6; color: #e4e4e7; background-color: #030303; padding: 15px; border: 1px solid #18181b; margin: 0;">${sanitizedMessage}</p>
          </div>
          <div style="margin-top: 40px; border-top: 1px solid #27272a; padding-top: 15px; font-size: 10px; color: #71717a; text-align: right;">
            PORTFOLIO ENGINE v2.0 // COMMUNICATIONS LOG
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[ERROR] Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      id: data?.id,
      message: "system~ Secure communication channel established." 
    });
  } catch (error: any) {
    console.error("[ERROR] Contact Route Error:", error);
    return NextResponse.json({ error: "Secure relay timeout detected." }, { status: 500 });
  }
}
