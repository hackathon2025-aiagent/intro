-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT,
  inquiry_type TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create hackbay_applications table for team applications  
CREATE TABLE IF NOT EXISTS hackbay_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  skills TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT,
  inquiry_type TEXT NOT NULL,
  preferred_contact TEXT DEFAULT 'email',
  email_sent BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_hackbay_created_at ON hackbay_applications(created_at);
CREATE INDEX IF NOT EXISTS idx_hackbay_inquiry_type ON hackbay_applications(inquiry_type); 