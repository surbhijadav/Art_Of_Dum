import type { Metadata } from "next";
import DiningExperiencePage from "@/components/pages/DiningExperiencePage";

export const metadata: Metadata = {
  title: "Sheesha Dining | Art of Dum",
  description: "Reserve a sheesha dining experience at Art of Dum.",
};

export default function SheeshaDiningPage() {
  return <DiningExperiencePage title="Sheesha Dining" />;
}
