"use client";

import { useState } from "react";

interface ReservationFormState {
  name: string;
  mobile: string;
  time: string;
  date: string;
  guests: string;
}

const EMPTY_FORM: ReservationFormState = {
  name: "",
  mobile: "",
  time: "",
  date: "",
  guests: "2",
};

const PARTY_OPTIONS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1)
);

const labelClass =
  "block text-[11px] uppercase tracking-[0.2em] text-muted-foreground";

const inputClass =
  "w-full bg-transparent border-0 border-b border-sand-400 py-2.5 text-[15px] text-dark-900 placeholder:text-dark-600/50 focus:outline-none focus:border-gold-600 transition-colors rounded-none";

/**
 * Editorial reservation form inside the cream panel: underline inputs,
 * paired rows (Name/Mobile, Time/Date), full-width party size select.
 * No backend yet — a valid submission shows a local confirmation state.
 */
export default function ReservationForm() {
  const [form, setForm] = useState<ReservationFormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof ReservationFormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement
      >
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
        <h3 className="mt-6 font-serif text-2xl sm:text-[28px] font-medium text-dark-900">
          Request Received
        </h3>
        <p className="mt-4 text-[15px] text-dark-700 leading-relaxed max-w-md mx-auto">
          Thank you, {form.name.split(" ")[0] || "guest"}. Your reservation
          request for {form.guests}{" "}
          {Number(form.guests) === 1 ? "guest" : "guests"}
          {form.date ? ` on ${form.date}` : ""}
          {form.time ? ` at ${form.time}` : ""} has been noted. Our team
          will call you shortly to confirm your table.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 text-[12px] uppercase tracking-[0.22em] text-dark-900 underline underline-offset-8 hover:text-gold-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
        <div>
          <label htmlFor="reservation-name" className={labelClass}>
            Name
          </label>
          <input
            id="reservation-name"
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
          <label htmlFor="reservation-mobile" className={labelClass}>
            Mobile
          </label>
          <input
            id="reservation-mobile"
            name="mobile"
            type="tel"
            autoComplete="tel"
            required
            pattern="[0-9+\-\s()]{6,20}"
            value={form.mobile}
            onChange={update("mobile")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="reservation-time" className={labelClass}>
            Time
          </label>
          <input
            id="reservation-time"
            name="time"
            type="time"
            required
            value={form.time}
            onChange={update("time")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="reservation-date" className={labelClass}>
            Date (DD-MM-YYYY)
          </label>
          <input
            id="reservation-date"
            name="date"
            type="date"
            required
            value={form.date}
            onChange={update("date")}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="reservation-guests" className={labelClass}>
            Number of people
          </label>
          <select
            id="reservation-guests"
            name="guests"
            required
            value={form.guests}
            onChange={update("guests")}
            className={inputClass}
          >
            {PARTY_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count} {Number(count) === 1 ? "person" : "people"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 border-t border-sand-300 pt-8">
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-10 py-4 bg-dark-900 text-sand-50 hover:bg-dark-800 transition-all duration-300 text-[13px] uppercase tracking-[0.28em] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-100 active:scale-[0.99]"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}
