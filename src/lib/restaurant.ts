/**
 * Shared contact details for Art of Dum.
 *
 * Values mirror the configuration already in use across the site
 * (Header WhatsApp link, tel: links on the Contact / Reserve /
 * Online Order pages, Footer and MapSection) so new features reuse a
 * single source of truth instead of re-hardcoding them.
 */

/** E.164 digits used in tel: links (see Contact page / Footer). */
export const RESTAURANT_PHONE_TEL = "+971568561276";

/** International digits used in wa.me links (see Header WhatsApp link). */
export const RESTAURANT_WHATSAPP_NUMBER = "971568561276";

/** Human-readable display format (see Contact page / Footer). */
export const RESTAURANT_PHONE_DISPLAY = "+971 56 856 1276";

/** Opening hours as published on the Contact page and MapSection. */
export const RESTAURANT_HOURS = "Open all days, 11 am to 11 pm";

/** Opening time (HH:mm, 24h) — doors open 11 am per published hours. */
export const RESTAURANT_OPENS_AT = "11:00";

/** Closing time (HH:mm, 24h) — doors close 11 pm per published hours. */
export const RESTAURANT_CLOSES_AT = "23:00";

/**
 * Full restaurant address — the single source of truth for the map,
 * directions link and any location references.
 */
export const RESTAURANT_ADDRESS =
  "Reem Mall - 1st Floor - Al Reem Island - Najmat Abu Dhabi - Abu Dhabi - United Arab Emirates";

/**
 * Restaurant position: the OSM-mapped Reem Mall node, cross-checked
 * against the published Wikipedia/Wikidata coordinates for Reem Mall
 * (24°29′18″N 54°24′2″E). Both sources agree; do not change without
 * re-verifying against RESTAURANT_ADDRESS.
 */
export const RESTAURANT_LATITUDE = 24.4884209;
export const RESTAURANT_LONGITUDE = 54.4005842;

/**
 * Google Maps directions URL for the restaurant — used by the map
 * popup and the "Get Directions" CTA so both point to the exact same
 * destination.
 */
export const RESTAURANT_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Reem%20Mall%2C%20Al%20Reem%20Island%2C%20Abu%20Dhabi%2C%20United%20Arab%20Emirates";

/** Direct WhatsApp chat link, derived from the number above. */
export const RESTAURANT_WHATSAPP_URL = `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}`;

/**
 * Instagram — carries the value already configured in the footer
 * (a placeholder homepage). Replace with the full account URL
 * (e.g. https://instagram.com/artofdum) once the handle is confirmed;
 * no account URL has been invented.
 */
export const RESTAURANT_INSTAGRAM_URL = "https://instagram.com";

/** Official Art of Dum page on Talabat UAE — used for online ordering. */
export const RESTAURANT_TALABAT_URL = "https://www.talabat.com/uae/art-of-dum";
