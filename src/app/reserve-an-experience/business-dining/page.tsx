import type { Metadata } from "next";
import DiningExperiencePage from "@/components/pages/DiningExperiencePage";

export const metadata: Metadata = {
  title: "Business Dining | Art of Dum",
  description: "Reserve a business dining experience at Art of Dum.",
};

export default function BusinessDiningPage() {
  return <DiningExperiencePage title="Business Dining" />;
}
