import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Order | Art of Dum",
  description: "Order Art of Dum online for delivery or pickup.",
};

export default function OnlineOrderPage() {
  return (
    <main className="w-full flex-1 bg-white text-dark-900 px-6 sm:px-8 pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-[40px] sm:text-5xl md:text-[56px] font-medium tracking-tight">
          Online Order
        </h1>
        <p className="mt-7 font-serif font-medium text-xl sm:text-[22px] text-[#2e2a25] leading-[1.8]">
          Order Art of Dum for delivery or pickup. To place an order, call us
          and our team will take care of the rest.
        </p>
        <div className="mt-8 sm:mt-10">
          <a
            href="tel:+971568561276"
            className="inline-flex items-center justify-center px-9 sm:px-11 py-4 border border-dark-900/80 text-dark-900 hover:bg-dark-900 hover:text-sand-50 transition-all duration-300 text-sm uppercase tracking-[0.28em] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            Call to Order
          </a>
        </div>
      </div>
    </main>
  );
}
