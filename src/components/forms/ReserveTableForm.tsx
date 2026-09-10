"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { RESERVE_EXPERIENCE_LINKS } from "@/lib/navigation";
import {
  RESTAURANT_CLOSES_AT,
  RESTAURANT_HOURS,
  RESTAURANT_OPENS_AT,
  RESTAURANT_PHONE_DISPLAY,
  RESTAURANT_PHONE_TEL,
  RESTAURANT_WHATSAPP_NUMBER,
} from "@/lib/restaurant";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

/** Booking confirmation channels offered after the form fields. */
type BookingMethod = "whatsapp" | "call";

type FieldName = "name" | "experience" | "guests" | "date" | "time";

interface FormValues {
  name: string;
  experience: string;
  guests: string;
  date: string;
  time: string;
}

type FormErrors = Partial<Record<FieldName, string>>;

const EMPTY_FORM: FormValues = {
  name: "",
  experience: "",
  guests: "2",
  date: "",
  time: "",
};

const FIELD_ORDER: readonly FieldName[] = [
  "name",
  "experience",
  "guests",
  "date",
  "time",
];

/** Experience options reuse the canonical navigation labels. */
const EXPERIENCE_OPTIONS: readonly string[] = RESERVE_EXPERIENCE_LINKS.map(
  (link) => link.label
);

/**
 * Preferred time is a free-form native time picker (any minute within
 * opening hours — 11 am to 11 pm per the published RESTAURANT_HOURS),
 * not a fixed list of slots.
 */

const MONTHS_SHORT: readonly string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Locale-independent ISO date (YYYY-MM-DD) for comparisons. */
const toIsoDate = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

/** "2026-09-12" → "12 Sep 2026" (locale-independent). */
const formatDate = (iso: string): string => {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${MONTHS_SHORT[month - 1]} ${year}`;
};

/** "19:45" → "7:45 pm" (locale-independent 12-hour display). */
const formatTime = (value: string): string => {
  const [hourStr, minuteStr] = value.split(":");
  const hour = Number(hourStr);
  if (Number.isNaN(hour) || !minuteStr) return value;
  const suffix = hour < 12 ? "am" : "pm";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minuteStr} ${suffix}`;
};

/** Build the wa.me deep link with a pre-filled reservation request. */
const buildWhatsAppUrl = (values: FormValues): string => {
  const message = [
    "Reservation Request — Art of Dum",
    "",
    `Name: ${values.name.trim()}`,
    `Experience: ${values.experience}`,
    `Guests: ${values.guests}`,
    `Date: ${formatDate(values.date)}`,
    `Time: ${formatTime(values.time)}`,
  ].join("\n");
  return `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
};

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  if (!values.name.trim()) {
    errors.name = "Please enter your full name.";
  }
  if (!values.experience) {
    errors.experience = "Please choose a type of experience.";
  }
  const guests = Number(values.guests);
  if (values.guests.trim() === "" || !Number.isInteger(guests)) {
    errors.guests = "Please enter the number of guests.";
  } else if (guests < 1) {
    errors.guests = "Please enter at least 1 guest.";
  } else if (guests > 20) {
    errors.guests = "For parties over 20, please reserve by phone.";
  }
  if (!values.date) {
    errors.date = "Please choose a date.";
  } else if (values.date < toIsoDate(new Date())) {
    errors.date = "Please choose a date from today onwards.";
  }
  if (!values.time) {
    errors.time = "Please choose a preferred time.";
  } else if (
    values.time < RESTAURANT_OPENS_AT ||
    values.time > RESTAURANT_CLOSES_AT
  ) {
    errors.time = `Please choose a time between ${formatTime(
      RESTAURANT_OPENS_AT
    )} and ${formatTime(RESTAURANT_CLOSES_AT)}.`;
  }
  return errors;
};

/* ------------------------------------------------------------------ */
/* Styling (matches the existing editorial form language)              */
/* ------------------------------------------------------------------ */

const labelClass =
  "block text-[11px] uppercase tracking-[0.2em] text-muted-foreground";

const inputClass =
  "w-full bg-transparent border-0 border-b border-sand-400 py-2.5 text-[15px] text-dark-900 placeholder:text-dark-600/50 focus:outline-none focus:border-gold-600 transition-colors rounded-none";

const primaryButtonClass =
  "w-full inline-flex min-h-[52px] items-center justify-center gap-2.5 bg-dark-900 px-10 py-4 text-sand-50 hover:bg-gold-700 transition-all duration-300 text-[13px] uppercase tracking-[0.28em] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-100 active:scale-[0.99]";

/** Inline error — marker + text, never colour alone. */
function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      className="mt-2 flex items-start gap-1.5 text-[13px] leading-snug text-dark-900"
    >
      <span
        aria-hidden="true"
        className="mt-px flex h-4 w-4 flex-none items-center justify-center rounded-full border border-gold-700 text-[9px] font-bold text-gold-700"
      >
        !
      </span>
      <span>{message}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * Premium reservation request form. Collects the party details, then
 * hands off to the chosen confirmation channel — a pre-filled
 * WhatsApp chat or a phone call. Nothing is booked by the website
 * itself; the restaurant team confirms every request.
 */
export default function ReserveTableForm() {
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [method, setMethod] = useState<BookingMethod>("whatsapp");
  const [whatsappOpened, setWhatsappOpened] = useState(false);
  const [stage, setStage] = useState<"form" | "call">("form");

  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});

  /* Keep the native date picker's earliest selectable day in sync with
     the calendar (DOM-only, so the prerendered markup stays stable;
     past dates are rejected again during validation). */
  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.min = toIsoDate(new Date());
    }
  }, []);

  const update =
    (field: FieldName) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear a field's error as soon as the guest edits it again.
      setErrors((prev) =>
        prev[field] ? { ...prev, [field]: undefined } : prev
      );
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWhatsappOpened(false);

    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    if (method === "whatsapp") {
      window.open(buildWhatsAppUrl(form), "_blank", "noopener,noreferrer");
      setWhatsappOpened(true);
    } else {
      setStage("call");
    }
  };

  /* ---------------------------------------------------------------- */
  /* Call hand-off — recap + tel: action, never a fake confirmation.  */
  /* ---------------------------------------------------------------- */
  if (stage === "call") {
    return (
      <div className="py-4 text-center" role="status">
        <span
          aria-hidden="true"
          className="mx-auto block h-px w-10 bg-gold-600/70"
        />
        <h3 className="mt-6 font-serif text-2xl font-medium text-dark-900 sm:text-[28px]">
          Almost There
        </h3>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-dark-700">
          Call us with your reservation request — {form.name.trim()},{" "}
          {form.experience}, {form.guests}{" "}
          {Number(form.guests) === 1 ? "guest" : "guests"},{" "}
          {formatDate(form.date)} at {formatTime(form.time)} — and our
          team will confirm your table.
        </p>
        <a
          href={`tel:${RESTAURANT_PHONE_TEL}`}
          className={`mt-8 sm:w-auto ${primaryButtonClass}`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          Call {RESTAURANT_PHONE_DISPLAY}
        </a>
        <p className="mt-4 text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
          {RESTAURANT_HOURS}
        </p>
        <button
          type="button"
          onClick={() => setStage("form")}
          className="mt-6 text-[12px] uppercase tracking-[0.22em] text-dark-900 underline underline-offset-8 transition-colors hover:text-gold-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          Edit Request
        </button>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Form                                                              */
  /* ---------------------------------------------------------------- */
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label htmlFor="reserve-table-name" className={labelClass}>
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            ref={(el) => {
              fieldRefs.current.name = el;
            }}
            id="reserve-table-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "reserve-table-name-error" : undefined}
            value={form.name}
            onChange={update("name")}
            className={inputClass}
          />
          {errors.name && (
            <FieldError id="reserve-table-name-error" message={errors.name} />
          )}
        </div>

        {/* Type of Experience */}
        <div>
          <label htmlFor="reserve-table-experience" className={labelClass}>
            Type of Experience <span aria-hidden="true">*</span>
          </label>
          <select
            ref={(el) => {
              fieldRefs.current.experience = el;
            }}
            id="reserve-table-experience"
            name="experience"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.experience)}
            aria-describedby={
              errors.experience ? "reserve-table-experience-error" : undefined
            }
            value={form.experience}
            onChange={update("experience")}
            className={inputClass}
          >
            <option value="" disabled>
              Select an experience
            </option>
            {EXPERIENCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.experience && (
            <FieldError
              id="reserve-table-experience-error"
              message={errors.experience}
            />
          )}
        </div>

        {/* Number of Guests */}
        <div>
          <label htmlFor="reserve-table-guests" className={labelClass}>
            Number of Guests <span aria-hidden="true">*</span>
          </label>
          <input
            ref={(el) => {
              fieldRefs.current.guests = el;
            }}
            id="reserve-table-guests"
            name="guests"
            type="number"
            inputMode="numeric"
            autoComplete="party-size"
            min={1}
            max={20}
            step={1}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={
              errors.guests ? "reserve-table-guests-error" : undefined
            }
            value={form.guests}
            onChange={update("guests")}
            className={inputClass}
          />
          {errors.guests && (
            <FieldError
              id="reserve-table-guests-error"
              message={errors.guests}
            />
          )}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="reserve-table-date" className={labelClass}>
            Date <span aria-hidden="true">*</span>
          </label>
          <input
            ref={(el) => {
              fieldRefs.current.date = el;
              dateInputRef.current = el;
            }}
            id="reserve-table-date"
            name="date"
            type="date"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.date)}
            aria-describedby={
              errors.date ? "reserve-table-date-error" : undefined
            }
            value={form.date}
            onChange={update("date")}
            className={inputClass}
          />
          {errors.date && (
            <FieldError
              id="reserve-table-date-error"
              message={errors.date}
            />
          )}
        </div>

        {/* Preferred Time — native picker, any minute within opening hours */}
        <div className="sm:col-span-2">
          <label htmlFor="reserve-table-time" className={labelClass}>
            Preferred Time <span aria-hidden="true">*</span>
          </label>
          <input
            ref={(el) => {
              fieldRefs.current.time = el;
            }}
            id="reserve-table-time"
            name="time"
            type="time"
            min={RESTAURANT_OPENS_AT}
            max={RESTAURANT_CLOSES_AT}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.time)}
            aria-describedby={
              errors.time ? "reserve-table-time-error" : undefined
            }
            value={form.time}
            onChange={update("time")}
            className={inputClass}
          />
          {errors.time && (
            <FieldError
              id="reserve-table-time-error"
              message={errors.time}
            />
          )}
        </div>
      </div>

      {/* Booking method */}
      <fieldset className="mt-12 border-t border-sand-300 pt-8">
        <legend className="w-full font-serif text-xl font-medium text-dark-900 sm:text-[22px]">
          How would you like to confirm your reservation?
        </legend>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* WhatsApp */}
          <label
            className={`relative flex cursor-pointer items-center gap-4 border px-5 py-4 transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-500 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-sand-100 ${
              method === "whatsapp"
                ? "border-gold-600 bg-white/60"
                : "border-sand-300 hover:border-sand-400"
            }`}
          >
            <input
              type="radio"
              name="booking-method"
              value="whatsapp"
              checked={method === "whatsapp"}
              onChange={() => setMethod("whatsapp")}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border transition-colors ${
                method === "whatsapp"
                  ? "border-gold-600"
                  : "border-sand-400"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full bg-gold-600 transition-opacity duration-200 ${
                  method === "whatsapp" ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
            <span>
              <span className="block text-[13px] font-medium uppercase tracking-[0.18em] text-dark-900">
                WhatsApp
              </span>
              <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">
                Send your request in a chat
              </span>
            </span>
          </label>

          {/* Call */}
          <label
            className={`relative flex cursor-pointer items-center gap-4 border px-5 py-4 transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-500 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-sand-100 ${
              method === "call"
                ? "border-gold-600 bg-white/60"
                : "border-sand-300 hover:border-sand-400"
            }`}
          >
            <input
              type="radio"
              name="booking-method"
              value="call"
              checked={method === "call"}
              onChange={() => setMethod("call")}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border transition-colors ${
                method === "call" ? "border-gold-600" : "border-sand-400"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full bg-gold-600 transition-opacity duration-200 ${
                  method === "call" ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
            <span>
              <span className="block text-[13px] font-medium uppercase tracking-[0.18em] text-dark-900">
                Call
              </span>
              <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">
                Speak with our team to confirm
              </span>
            </span>
          </label>
        </div>
      </fieldset>

      {/* Submit */}
      <div className="mt-10 border-t border-sand-300 pt-8">
        <button type="submit" className={primaryButtonClass}>
          {method === "whatsapp" ? (
            <>
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Continue with WhatsApp
            </>
          ) : (
            "Request Reservation"
          )}
        </button>

        {whatsappOpened && method === "whatsapp" && (
          <p
            role="status"
            className="mt-5 text-center text-[13px] leading-relaxed text-dark-700"
          >
            WhatsApp opened in a new tab with your reservation request —
            press send there to deliver it to our team.
          </p>
        )}
      </div>
    </form>
  );
}
