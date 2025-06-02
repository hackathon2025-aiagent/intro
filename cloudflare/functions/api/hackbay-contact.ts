// Cloudflare D1 Database types
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  run(): Promise<D1Result>;
}

interface D1Result {
  success: boolean;
  meta?: {
    last_row_id?: number;
    changes: number;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  skills: string;
  subject: string;
  message?: string;
  inquiryType: 'python-cli' | 'typescript' | 'marketing' | 'general';
  preferredContact?: 'email' | 'phone';
}

export interface Env {
  // D1 Database binding
  DB: D1Database;
  // Email service API key
  RESEND_API_KEY: string;
  // Target email for contact form
  CONTACT_EMAIL?: string;
  // Allowed origins for CORS (comma-separated)
  ALLOWED_ORIGINS?: string;
}

// Get CORS headers based on environment
function getCorsHeaders(request: Request, env: Env) {
  const origin = request.headers.get('Origin');
  
  // Default allowed origins for development
  const defaultOrigins = [
    'http://localhost:6006',
    'http://localhost:6007', 
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8000',
  ];
  
  // Get allowed origins from environment or use defaults
  const allowedOrigins = env.ALLOWED_ORIGINS 
    ? env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : defaultOrigins;
  
  // Check if origin is allowed, or use wildcard for development
  const allowedOrigin = origin && allowedOrigins.includes(origin) 
    ? origin 
    : '*'; // Allow all for now
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

// Handle OPTIONS requests for CORS preflight
export const onRequestOptions = async (context: any) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request, env);
  
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
};

export const onRequestPost = async (context: any) => {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request, env);

  try {
    // Parse form data
    const formData: ContactFormData = await request.json();

    // Validate required fields
    const errors = validateFormData(formData);
    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Validation failed', 
          details: errors 
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // 1. Save to database first (most important)
    let savedToDb = false;
    let applicationId: number | null = null;
    
    try {
      if (env.DB) {
        const result = await saveToDatabase(formData, env.DB);
        applicationId = result.applicationId;
        savedToDb = result.success;
        console.log('✅ Saved to database:', { applicationId, savedToDb });
      } else {
        console.log('❌ DB not available');
      }
    } catch (dbError) {
      console.error('❌ Database save failed:', dbError);
      // Continue to try email even if DB fails
    }

    // 2. Send email notification (secondary)
    let emailSent = false;
    try {
      if (env.RESEND_API_KEY) {
        emailSent = await sendContactEmail(formData, env);
        console.log('Email result:', emailSent);
        
        // Update database with email status if we saved to DB
        if (savedToDb && applicationId && env.DB) {
          await updateEmailStatus(applicationId, emailSent, env.DB);
        }
      } else {
        console.log('RESEND_API_KEY not found, skipping email');
      }
    } catch (emailError) {
      console.error('Email send failed:', emailError);
      // Continue even if email fails - data is safely in DB
    }

    // Log the submission (for development)
    console.log('Hackbay contact form submission:', {
      name: formData.name,
      email: formData.email,
      inquiryType: formData.inquiryType,
      applicationId,
      savedToDb,
      emailSent
    });

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Application submitted successfully!',
        applicationId,
        savedToDb,
        emailSent
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
};

async function saveToDatabase(formData: ContactFormData, db: D1Database): Promise<{success: boolean, applicationId: number | null}> {
  try {
    const result = await db.prepare(`
      INSERT INTO hackbay_applications (
        name, email, phone, company, skills, subject, message, 
        inquiry_type, preferred_contact, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      formData.name,
      formData.email,
      formData.phone || null,
      formData.company || null,
      formData.skills,
      formData.subject,
      formData.message || null,
      formData.inquiryType,
      formData.preferredContact || 'email'
    ).run();

    return {
      success: result.success,
      applicationId: result.meta?.last_row_id || null
    };
  } catch (error) {
    console.error('Database save error:', error);
    return { success: false, applicationId: null };
  }
}

async function updateEmailStatus(applicationId: number, emailSent: boolean, db: D1Database): Promise<void> {
  try {
    await db.prepare(`
      UPDATE hackbay_applications 
      SET email_sent = ? 
      WHERE id = ?
    `).bind(emailSent, applicationId).run();
    
    console.log(`Updated email status for application ${applicationId}: ${emailSent}`);
  } catch (error) {
    console.error('Failed to update email status:', error);
  }
}

function validateFormData(data: ContactFormData): string[] {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push('Name is required');
  }

  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('Email is invalid');
  }

  if (!data.skills?.trim()) {
    errors.push('Skills are required');
  }

  if (!data.subject?.trim()) {
    errors.push('Subject is required');
  }

  if (!['python-cli', 'typescript', 'marketing', 'general'].includes(data.inquiryType)) {
    errors.push('Invalid inquiry type');
  }

  return errors;
}

async function sendContactEmail(formData: ContactFormData, env: Env): Promise<boolean> {
  try {
    console.log('Attempting to send email with Resend...');
    console.log('API Key present:', !!env.RESEND_API_KEY);
    console.log('Target email:', env.CONTACT_EMAIL);
    
    const emailPayload = {
      from: 'contact@microwiseai.com',
      to: env.CONTACT_EMAIL || 'info@microwiseai.com',
      subject: `New Team Application: ${formData.name} - ${getPositionLabel(formData.inquiryType)}`,
      html: generateEmailHTML(formData),
      reply_to: formData.email || undefined,
    };
    
    console.log('Email payload to:', emailPayload.to);
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const responseData = await response.json();
    console.log('Resend API response status:', response.status);
    console.log('Resend API response data:', responseData);
    
    if (response.ok) {
      console.log('✅ Email sent successfully to Resend');
      return true;
    } else {
      console.error('❌ Resend API error:', responseData);
      return false;
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

function getPositionLabel(inquiryType: string): string {
  const positions: Record<string, string> = {
    'python-cli': 'Python CLI Developer',
    'typescript': 'TypeScript Developer',
    'marketing': 'Marketing & Business Developer',
    'general': 'General Interest / Multiple Roles'
  };
  
  return positions[inquiryType] || inquiryType;
}

function generateEmailHTML(formData: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New TaskHub Team Application</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { background: #f4f4f4; padding: 20px; border-radius: 8px; }
        .content { margin: 20px 0; }
        .field { margin: 15px 0; }
        .label { font-weight: bold; color: #333; }
        .value { margin-top: 5px; padding: 10px; background: #f9f9f9; border-radius: 4px; }
        .inquiry-type { 
          display: inline-block; 
          background: #007cba; 
          color: white; 
          padding: 4px 12px; 
          border-radius: 16px; 
          font-size: 12px;
          text-transform: uppercase;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>🆕 New TaskHub Team Application</h2>
        <p>Received: ${new Date().toLocaleString()}</p>
      </div>
      
      <div class="content">
        <div class="field">
          <div class="label">👤 Name:</div>
          <div class="value">${formData.name}</div>
        </div>
        
        <div class="field">
          <div class="label">📧 Email:</div>
          <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
        </div>
        
        ${formData.phone ? `
        <div class="field">
          <div class="label">📱 Phone:</div>
          <div class="value">${formData.phone}</div>
        </div>
        ` : ''}
        
        ${formData.company ? `
        <div class="field">
          <div class="label">🏢 Company:</div>
          <div class="value">${formData.company}</div>
        </div>
        ` : ''}
        
        <div class="field">
          <div class="label">🏷️ Position Interest:</div>
          <div class="value">
            <span class="inquiry-type">${getPositionLabel(formData.inquiryType)}</span>
          </div>
        </div>
        
        <div class="field">
          <div class="label">🛠️ Skills:</div>
          <div class="value">${formData.skills.replace(/\n/g, '<br>')}</div>
        </div>
        
        <div class="field">
          <div class="label">💡 Why Join Our Team:</div>
          <div class="value">${formData.subject.replace(/\n/g, '<br>')}</div>
        </div>
        
        ${formData.message ? `
        <div class="field">
          <div class="label">💬 Additional Notes:</div>
          <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
        </div>
        ` : ''}
        
        <div class="field">
          <div class="label">📞 Preferred Contact:</div>
          <div class="value">${formData.preferredContact || 'email'}</div>
        </div>
      </div>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 14px;">
        This email was automatically generated from the TaskHub team application form.
      </p>
    </body>
    </html>
  `;
}