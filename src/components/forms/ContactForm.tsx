"use client";

import { useState } from "react";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const EMPTY_FORM: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const labelClass =
  "block text-[11px] uppercase tracking-[0.2em] text-muted-foreground";

const inputClass =
  "w-full bg-transparent border-0 border-b border-sand-400 py-2.5 text-[15px] text-dark-900 placeholder:text-dark-600/50 focus:outline-none focus:border-gold-600 transition-colors rounded-none";

/**
 * Editorial contact form: thin underline inputs, three fields in a row
 * on desktop, full-width message. No backend yet — a valid submission
 * shows a local confirmation state.
 */
export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof ContactFormState) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-6" role="status">
        <span
          aria-hidden="true"
          className="mx-auto block h-px w-10 bg-gold-600/70"
        />
        <h2 className="mt-6 font-serif text-3xl font-medium text-dark-900">
          Message Sent
        </h2>
        <p className="mt-4 text-[15px] text-dark-700 leading-relaxed max-w-md mx-auto">
          Thank you for reaching out, {form.name.split(" ")[0] || "guest"}. Our
          team will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 text-[12px] uppercase tracking-[0.22em] text-dark-900 underline underline-offset-8 hover:text-gold-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-8">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={update("name")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={update("email")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone number <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            pattern="[0-9+\-\s()]{6,20}"
            value={form.phone}
            onChange={update("phone")}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-8">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={update("message")}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="mt-12 text-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center px-10 py-4 border border-dark-900/80 text-dark-900 hover:bg-dark-900 hover:text-sand-50 transition-all duration-300 text-[13px] uppercase tracking-[0.28em] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50 active:scale-[0.98]"
        >
          Submit Now
        </button>
      </div>
    </form>
  );
}
