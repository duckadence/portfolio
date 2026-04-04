function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0" // Prevents the icon from squishing
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

const FOOTER_LINKS = [
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/jonathan-lin-136270185/",
  },
  { name: "instagram", href: "https://www.instagram.com/lovemyfamily9783/" },
  { name: "site source", href: "https://github.com/duckadence/portfolio" },
];

export default function Footer() {
  return (
    <footer className="mb-16 mt-14">
      <nav>
        <ul className="flex flex-col space-y-2 md:flex-row md:space-x-5 md:space-y-0">
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                /* The global CSS for 'footer a' now handles:
                   - baseline alignment (items-baseline)
                   - the blue underline
                   - the hover highlight
                */
              >
                <ArrowIcon />
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mt-7 -mb-7 text-sm text-slate-500 dark:text-slate-500 lowercase tracking-tight opacity-60">
        © {new Date().getFullYear()} Jonathan Lin
      </p>
    </footer>
  );
}
