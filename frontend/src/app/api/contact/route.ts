import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  console.log("[API_CONTACT] === REQUEST RECEIVED ===");

  try {
    // ─── Parse body ────────────────────────────────────────────────────────────
    let body: any;
    try {
      body = await req.json();
      console.log("[API_CONTACT] Body parsed:", JSON.stringify(body));
    } catch (parseError) {
      console.error("[API_CONTACT] Body parse FAILED:", parseError);
      return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, subject, customSubject, message, honeypot } = body;

    // ─── Honeypot ───────────────────────────────────────────────────────────────
    if (honeypot) {
      console.warn("[API_CONTACT][SECURITY] Honeypot triggered — silently dropping.");
      return NextResponse.json({ success: true });
    }

    // ─── Validation ─────────────────────────────────────────────────────────────
    if (!name?.trim()) {
      return NextResponse.json({ success: false, error: "Name is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "A valid email is required." }, { status: 400 });
    }

    if (!message?.trim()) {
      return NextResponse.json({ success: false, error: "Message cannot be empty." }, { status: 400 });
    }

    const finalSubject =
      subject === "Custom"
        ? customSubject?.trim() || "General Inquiry"
        : subject || "General Inquiry";

    const sanitizedMessage = message.replace(/<[^>]*>/g, "").trim();

    // ─── API Key check ──────────────────────────────────────────────────────────
    const apiKey = process.env.RESEND_API_KEY;
    console.log("[API_CONTACT] RESEND_API_KEY present:", !!apiKey);

    if (!apiKey) {
      console.error("[API_CONTACT] RESEND_API_KEY is MISSING from environment.");
      return NextResponse.json(
        { success: false, error: "Email service not configured. Contact the administrator." },
        { status: 500 }
      );
    }

    // ─── Send via Resend ────────────────────────────────────────────────────────
    const resend = new Resend(apiKey);
    const dateStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    console.log("[API_CONTACT] Sending email via Resend...");
    console.log("[API_CONTACT] From: Portfolio Contact <onboarding@resend.dev>");
    console.log("[API_CONTACT] To: abhirupbhowmick111777@gmail.com");
    console.log("[API_CONTACT] Subject:", `[PORTFOLIO] ${finalSubject} — ${name}`);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["abhirupbhowmick111777@gmail.com"],
      replyTo: email,
      subject: `[PORTFOLIO] ${finalSubject} — ${name}`,
      html: `
        <div style="font-family: 'Courier New', monospace; background-color: #09090b; color: #a1a1aa; padding: 40px; border: 1px solid #27272a; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ffffff; font-size: 14px; border-bottom: 1px solid #27272a; padding-bottom: 15px; margin-top: 0; margin-bottom: 20px; letter-spacing: 0.12em; text-transform: uppercase;">
            SYSTEM TRANSMISSION // PORTFOLIO CONNECT REQUEST
          </h1>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 12px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717a; width: 110px; text-transform: uppercase; letter-spacing: 0.05em;">Sender</td>
              <td style="padding: 8px 0; color: #e4e4e7;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Category</td>
              <td style="padding: 8px 0; color: #e4e4e7;">${finalSubject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Timestamp</td>
              <td style="padding: 8px 0; color: #e4e4e7;">${dateStr} IST</td>
            </tr>
          </table>

          <div style="border-top: 1px solid #27272a; padding-top: 20px;">
            <p style="font-size: 11px; font-weight: bold; color: #71717a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Message Payload</p>
            <p style="font-size: 13px; white-space: pre-wrap; line-height: 1.7; color: #e4e4e7; background-color: #0c0c0e; padding: 16px; border: 1px solid #18181b; margin: 0; border-radius: 2px;">${sanitizedMessage}</p>
          </div>

          <div style="margin-top: 40px; border-top: 1px solid #18181b; padding-top: 14px; font-size: 10px; color: #3f3f46; text-align: right; letter-spacing: 0.08em;">
            PORTFOLIO ENGINE v2.1 // SECURE COMMUNICATIONS LOG
          </div>
        </div>
      `,
    });

    // ─── Resend error handling ──────────────────────────────────────────────────
    if (error) {
      console.error("[API_CONTACT] Resend returned error:", JSON.stringify(error));
      return NextResponse.json(
        { success: false, error: error.message || "Email delivery failed." },
        { status: 502 }
      );
    }

    console.log("[API_CONTACT] Email sent successfully. Resend ID:", data?.id);
    return NextResponse.json({
      success: true,
      id: data?.id,
      message: "system~ Secure communication channel established.",
    });
  } catch (err: any) {
    console.error("[API_CONTACT] Unhandled exception:", err?.message || err);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please retry." },
      { status: 500 }
    );
  }
}
