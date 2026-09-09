import type { Metadata } from "next";
import DiningExperiencePage from "@/components/pages/DiningExperiencePage";

export const metadata: Metadata = {
  title: "Family Dining | Art of Dum",
  description: "Reserve a family dining experience at Art of Dum.",
};

export default function FamilyDiningPage() {
  return <DiningExperiencePage title="Family Dining" />;
}
