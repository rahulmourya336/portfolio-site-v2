type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll reveal with no JavaScript at all.
 *
 * The animation is driven by a scroll timeline in CSS (see `.reveal` in
 * globals.css). Browsers without `animation-timeline` simply render the
 * content, and content already on screen at load renders at its final state,
 * so the reveal never delays the largest paint the way a JS observer does.
 */
export const Reveal = ({
  children,
  className = "",
  as: Component = "div",
}: RevealProps) => (
  <Component className={`reveal ${className}`}>{children}</Component>
);

export default Reveal;
