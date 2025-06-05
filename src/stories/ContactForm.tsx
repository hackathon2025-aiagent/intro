import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  skills?: string;
  subject: string;
  message: string;
  inquiryType: string;
  preferredContact?: 'email' | 'phone';
}

export interface FieldConfig {
  label: string;
  required: boolean;
  placeholder?: string;
  helperText?: string;
}

export interface InquiryTypeConfig {
  label: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}

export interface ContactFormConfig {
  fields: {
    name: FieldConfig;
    email: FieldConfig;
    phone?: FieldConfig;
    company?: FieldConfig;
    skills?: FieldConfig;
    inquiryType: InquiryTypeConfig;
    subject: FieldConfig;
    message: FieldConfig;
  };
  showContactPreference?: boolean;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
}

export interface ContactFormProps {
  /** Configuration for form fields and behavior */
  config?: ContactFormConfig;
  /** API endpoint for form submission */
  apiEndpoint?: string;
  /** Callback when form is successfully submitted */
  onSuccess?: (data: ContactFormData) => void;
  /** Callback when form submission fails */
  onError?: (error: string) => void;
  /** Whether form is in loading state */
  loading?: boolean;
}

const defaultConfig: ContactFormConfig = {
  fields: {
    name: { label: "Full Name", required: true },
    email: { label: "Email Address", required: true },
    company: { label: "Company (Optional)", required: false },
    inquiryType: {
      label: "Inquiry Type",
      options: [
        { value: "business", label: "Business Inquiry" },
        { value: "technical", label: "Technical Support" },
        { value: "partnership", label: "Partnership" },
        { value: "other", label: "Other" }
      ]
    },
    subject: { label: "Subject", required: true },
    message: { label: "Message", required: true, placeholder: "Tell us how we can help you..." }
  },
  submitButtonText: "Send Message",
  successMessage: "Thank you! Your message has been sent. We'll get back to you soon.",
  errorMessage: "Sorry, there was an error sending your message. Please try again."
};

const ContactForm: React.FC<ContactFormProps> = ({
  config = defaultConfig,
  apiEndpoint = '/api/contact',
  onSuccess,
  onError,
  loading: externalLoading = false,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    skills: '',
    subject: '',
    message: '',
    inquiryType: config.fields.inquiryType.defaultValue || config.fields.inquiryType.options[0]?.value || '',
    preferredContact: 'email',
  });
  
  // Update inquiryType when config changes (for URL parameter support)
  useEffect(() => {
    if (config.fields.inquiryType.defaultValue) {
      setFormData(prev => ({
        ...prev,
        inquiryType: config.fields.inquiryType.defaultValue || prev.inquiryType
      }));
    }
  }, [config.fields.inquiryType.defaultValue]);
  
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    // Validate based on config
    if (config.fields.name.required && !formData.name.trim()) {
      newErrors.name = `${config.fields.name.label} is required`;
    }
    
    if (config.fields.email.required && !formData.email.trim()) {
      newErrors.email = `${config.fields.email.label} is required`;
    } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (config.fields.phone?.required && !formData.phone?.trim()) {
      newErrors.phone = `${config.fields.phone.label} is required`;
    }
    
    if (config.fields.company?.required && !formData.company?.trim()) {
      newErrors.company = `${config.fields.company.label} is required`;
    }
    
    if (config.fields.skills?.required && !formData.skills?.trim()) {
      newErrors.skills = `${config.fields.skills.label} is required`;
    }
    
    if (config.fields.subject.required && !formData.subject.trim()) {
      newErrors.subject = `${config.fields.subject.label} is required`;
    }
    
    if (config.fields.message.required && !formData.message.trim()) {
      newErrors.message = `${config.fields.message.label} is required`;
    }

    // Validate that at least one contact method is provided
    if (config.showContactPreference && !formData.email.trim() && !formData.phone?.trim()) {
      newErrors.email = 'Please provide either email or phone number';
      newErrors.phone = 'Please provide either email or phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setIsFormDisabled(true);
    setSubmitStatus('idle');

    try {
      // TODO: Replace with actual API call
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        onSuccess?.(formData);
        // Keep form disabled after success - user can manually reset if needed
        // resetForm();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus('error');
      setIsFormDisabled(false); // Re-enable form on error
      onError?.(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      skills: '',
      subject: '',
      message: '',
      inquiryType: config.fields.inquiryType.defaultValue || config.fields.inquiryType.options[0]?.value || '',
      preferredContact: 'email',
    });
    setErrors({});
    setIsFormDisabled(false);
    setSubmitStatus('idle');
  };

  const isLoading = isSubmitting || externalLoading;
  const isDisabled = isLoading || isFormDisabled;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      {submitStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {config.successMessage}
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={resetForm}
              sx={{ mr: 1 }}
            >
              Send Another Message
            </Button>
          </Box>
        </Alert>
      )}
      
      {submitStatus === 'error' && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {config.errorMessage}
        </Alert>
      )}

      {isFormDisabled && submitStatus === 'success' && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Form submitted successfully. All fields are now disabled. Click "Send Another Message" above to send another message.
        </Alert>
      )}

      {/* Name Field */}
      <TextField
        fullWidth
        label={config.fields.name.label}
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        error={!!errors.name}
        helperText={errors.name || config.fields.name.helperText}
        margin="normal"
        required={config.fields.name.required}
        disabled={isDisabled}
      />

      {/* Email Field */}
      <TextField
        fullWidth
        label={config.fields.email.label}
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        error={!!errors.email}
        helperText={errors.email || config.fields.email.helperText}
        margin="normal"
        required={config.fields.email.required}
        disabled={isDisabled}
      />

      {/* Phone Field */}
      {config.fields.phone && (
        <TextField
          fullWidth
          label={config.fields.phone.label}
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone || config.fields.phone.helperText}
          placeholder={config.fields.phone.placeholder}
          margin="normal"
          required={config.fields.phone.required}
          disabled={isDisabled}
        />
      )}

      {/* Contact Preference */}
      {config.showContactPreference && (config.fields.email || config.fields.phone) && (
        <FormControl component="fieldset" margin="normal" fullWidth>
          <FormLabel component="legend">Preferred Contact Method</FormLabel>
          <RadioGroup
            value={formData.preferredContact}
            onChange={(e) => handleInputChange('preferredContact', e.target.value)}
            row
          >
            {config.fields.email && (
              <FormControlLabel 
                value="email" 
                control={<Radio />} 
                label="Email" 
                disabled={isDisabled}
              />
            )}
            {config.fields.phone && (
              <FormControlLabel 
                value="phone" 
                control={<Radio />} 
                label="Phone/Text" 
                disabled={isDisabled}
              />
            )}
          </RadioGroup>
        </FormControl>
      )}

      {/* Company Field */}
      {config.fields.company && (
        <TextField
          fullWidth
          label={config.fields.company.label}
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          error={!!errors.company}
          helperText={errors.company || config.fields.company.helperText}
          placeholder={config.fields.company.placeholder}
          margin="normal"
          required={config.fields.company.required}
          disabled={isDisabled}
        />
      )}

      {/* Skills Field */}
      {config.fields.skills && (
        <TextField
          fullWidth
          label={config.fields.skills.label}
          value={formData.skills}
          onChange={(e) => handleInputChange('skills', e.target.value)}
          error={!!errors.skills}
          helperText={errors.skills || config.fields.skills.helperText}
          placeholder={config.fields.skills.placeholder}
          margin="normal"
          required={config.fields.skills.required}
          disabled={isDisabled}
        />
      )}

      {/* Inquiry Type */}
      <FormControl fullWidth margin="normal">
        <InputLabel>{config.fields.inquiryType.label}</InputLabel>
        <Select
          value={formData.inquiryType}
          onChange={(e) => handleInputChange('inquiryType', e.target.value)}
          label={config.fields.inquiryType.label}
          disabled={isDisabled}
        >
          {config.fields.inquiryType.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Subject Field */}
      <TextField
        fullWidth
        label={config.fields.subject.label}
        value={formData.subject}
        onChange={(e) => handleInputChange('subject', e.target.value)}
        error={!!errors.subject}
        helperText={errors.subject || config.fields.subject.helperText}
        placeholder={config.fields.subject.placeholder}
        margin="normal"
        required={config.fields.subject.required}
        disabled={isDisabled}
      />

      {/* Message Field */}
      <TextField
        fullWidth
        label={config.fields.message.label}
        multiline
        rows={4}
        value={formData.message}
        onChange={(e) => handleInputChange('message', e.target.value)}
        error={!!errors.message}
        helperText={errors.message || config.fields.message.helperText}
        placeholder={config.fields.message.placeholder}
        margin="normal"
        required={config.fields.message.required}
        disabled={isDisabled}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isDisabled}
        startIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
        sx={{ mt: 3, py: 1.5 }}
      >
        {isLoading 
          ? 'Sending...' 
          : submitStatus === 'success' 
            ? 'Message Sent Successfully!' 
            : config.submitButtonText
        }
      </Button>
    </Box>
  );
};

export default ContactForm;
