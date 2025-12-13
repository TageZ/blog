import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("xnnewwvr");
  if (state.succeeded) {
      return (
        <div className="form-success">
          <p>Thanks for your message! I'll get back to you soon.</p>
        </div>
      );
  }
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          type="email" 
          name="email"
          placeholder="your.email@example.com"
          required
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
          className="form-error"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Your message here..."
          rows={6}
          required
        />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
          className="form-error"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={state.submitting}
        className="form-submit-btn"
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

export default ContactForm;