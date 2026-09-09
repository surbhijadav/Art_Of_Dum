import type { Metadata } from "next";
import DiningExperiencePage from "@/components/pages/DiningExperiencePage";

export const metadata: Metadata = {
  title: "Private Dining | Art of Dum",
  description: "Reserve a private dining experience at Art of Dum.",
};

export default function PrivateDiningPage() {
  return <DiningExperiencePage title="Private Dining" />;
}
