export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center text-sm" style={{ color: "rgba(26,26,46,0.4)" }}>
      <p>&copy; {new Date().getFullYear()} Lulu Yang. Built with Next.js &amp; Claude Code.</p>
    </footer>
  );
}
