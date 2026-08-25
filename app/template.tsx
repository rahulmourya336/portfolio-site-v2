/**
 * Runs on every navigation, so each route fades in. Plain CSS animation,
 * which means the page transition costs zero JavaScript.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}
