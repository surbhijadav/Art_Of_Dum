/**
 * Shared navigation data for the "Reserve an Experience" section.
 * Consumed by the desktop navbar hover submenu and the mobile menu.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const RESERVE_EXPERIENCE_LINKS: readonly NavLink[] = [
  { label: "Private Dining", href: "/reserve-an-experience/private-dining" },
  { label: "Business Dining", href: "/reserve-an-experience/business-dining" },
  { label: "Family Dining", href: "/reserve-an-experience/family-dining" },
  { label: "Sheesha Dining", href: "/reserve-an-experience/sheesha-dining" },
];
