import { redirect } from "next/navigation";

/**
 * The former reservation hub has been retired — table reservations now
 * live at /reserve-a-table. Any legacy link to this route (e.g. the
 * Home page's "Reserve an Experience" CTA) is redirected there. The
 * four dining-experience subroutes keep working as before.
 */
export default function ReserveExperienceRedirectPage() {
  redirect("/reserve-a-table");
}
