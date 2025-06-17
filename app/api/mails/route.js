import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, subject, message } = await request.json();
    
    const data = await resend.emails.send({
      from: 'Portfolio Website <onboarding@resend.dev>',
      to: 'fredolds180@gmail.com',
      reply_to: email,
      subject: subject,
      html: `
        <h2>Nuevo mensaje desde el portafolio</h2>
        <p><strong>De:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}