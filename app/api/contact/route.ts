// Receives "Find your fit" enquiries from the contact page.
// Set CONTACT_WEBHOOK_URL (e.g. a Zapier, Make, Formspree or Slack webhook) to
// receive each lead. Without it, the endpoint returns 503 and the form shows
// visitors a direct email link instead of pretending the message was sent.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field
  if (clean(body.website)) {
    return Response.json({ ok: true });
  }

  const lead = {
    need: clean(body.need, 20),
    start: clean(body.start, 50),
    budget: clean(body.budget, 50),
    name: clean(body.name),
    email: clean(body.email),
    company: clean(body.company),
    hearAbout: clean(body.hearAbout, 50),
    submittedAt: new Date().toISOString(),
  };

  if (!EMAIL_RE.test(lead.email) || !["products", "custom"].includes(lead.need)) {
    return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.error("[contact] CONTACT_WEBHOOK_URL is not set — lead not delivered:", lead.email);
    return Response.json({ error: "Form delivery is not configured." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        // Readable summary for chat-style webhooks (Slack, Teams, Discord)
        text: `New enquiry from ${lead.name || lead.email} (${lead.company || "no company"}) — ${lead.need}, start: ${lead.start}, budget: ${lead.budget || "n/a"}, email: ${lead.email}`,
      }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[contact] Failed to deliver lead:", err);
    return Response.json({ error: "Could not send your message." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
