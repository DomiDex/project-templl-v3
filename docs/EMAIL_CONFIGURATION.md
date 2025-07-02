# Email Configuration for Authentication

## Development Setup

During development, Supabase has email rate limits (3-4 emails per hour) for free projects. Here are your options:

### Option 1: Use Supabase Inbucket (Recommended for Development)

1. Go to your Supabase dashboard
2. Navigate to Authentication > Email Templates
3. Enable "Inbucket" for local email testing
4. Access emails at: `http://localhost:54324/inbucket`

### Option 2: Configure Custom SMTP

1. Go to Supabase dashboard > Settings > Auth
2. Scroll to "SMTP Settings"
3. Enable custom SMTP and configure:
   - Host: Your SMTP server (e.g., smtp.gmail.com)
   - Port: 587 (for TLS) or 465 (for SSL)
   - Username: Your email address
   - Password: Your email password or app-specific password
   - Sender email: The "from" address for emails

### Option 3: Use Development Mode (Current Setup)

The application now includes better error handling for email issues:
- Clear error messages when email service is not configured
- Helpful instructions for developers
- The user account is still created even if email fails

## Production Setup

For production, you **must** configure proper SMTP settings:

1. Use a reliable email service (SendGrid, AWS SES, Postmark, etc.)
2. Configure SPF, DKIM, and DMARC records for deliverability
3. Set up proper email templates in Supabase
4. Test email delivery thoroughly

## Troubleshooting

### "Error sending confirmation email"

This error typically means:
1. SMTP is not configured in Supabase
2. Rate limits have been exceeded
3. Email service is down

### Users Not Receiving Emails

Check:
1. Spam/junk folders
2. Email logs in Supabase dashboard
3. SMTP configuration is correct
4. Domain verification (for production)

## Environment Variables

Make sure these are set:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Development
NEXT_PUBLIC_SITE_URL=https://yourdomain.com # Production
```

This URL is used for the email verification callback.