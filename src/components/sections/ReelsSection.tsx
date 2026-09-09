import { REELS } from "@/lib/reels";
import type { Reel } from "@/lib/reels";

/**
 * Reels strip — Column 1 reference (screenshot 181149).
 *
 * Geometry measured from the Figma frame (340px ≈ 375pt design):
 * three light panels in a 1 : 2.8 : 1 rhythm, ~95vw tall on mobile,
 * labels in the site serif positioned ~36% from the panel top.
 *
 * Labels below are VERBATIM from the reference. The outer two read as
 * clipped placeholder fragments ("eel", "Hee"); only the middle "Reel"
 * is a complete word. Replace alongside real reel content if required.
 */
const PANEL_LABELS = ["eel", "Reel", "Ree"] as const;

function ReelCard({ reel }: { reel: Reel }) {
  return (
    <figure className="relative h-[86vw] sm:h-[440px] md:h-[480px] lg:h-[520px] overflow-hidden bg-sand-300">
      <video
        src={reel.src}
        poster={reel.poster}
        controls
        playsInline
        preload="metadata"
        aria-label={reel.title ?? "Restaurant reel"}
        className="h-full w-full object-cover"
      />
    </figure>
  );
}

export default function ReelsSection() {
  const hasReels = REELS.length > 0;

  return (
    <section
      aria-labelledby="reels-heading"
      className="w-full bg-white px-4 sm:px-8 lg:px-12 pb-6 sm:pb-8"
    >
      <h2 id="reels-heading" className="sr-only">
        Reels
      </h2>

      <div className="mx-auto max-w-4xl grid grid-cols-[1fr_2.8fr_1fr] gap-2 sm:gap-3">
        {hasReels ? (
          REELS.map((reel) => <ReelCard key={reel.id} reel={reel} />)
        ) : (
          PANEL_LABELS.map((label) => (
            <div
              key={label}
              className="relative h-[86vw] sm:h-[440px] md:h-[480px] lg:h-[520px] bg-sand-300"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-[36%] text-center font-serif text-2xl sm:text-3xl font-normal text-dark-900"
              >
                {label}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
