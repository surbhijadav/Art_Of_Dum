/**
 * Reels content source.
 *
 * The Figma's Reels area is a design placeholder — real reels will be
 * supplied later by the content team. Add entries here and the Reels
 * section renders them automatically (native video players with optional
 * poster frames). No component changes are required.
 */

export interface Reel {
  /** Stable unique identifier */
  id: string;
  /** Video source — a public asset path (e.g. "/reels/aod-reel-1.mp4") or an external CDN URL */
  src: string;
  /** Optional poster/thumbnail shown before playback */
  poster?: string;
  /** Optional short title / metadata if the design needs it later */
  title?: string;
}

export const REELS: Reel[] = [];
