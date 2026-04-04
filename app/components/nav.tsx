import Link from "next/link";

// 1. Geometric SVG components to match Footer style
const Icons = {
  home: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  projects: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  resume: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  ),
};

interface NavItem {
  name: string;
  external?: boolean;
  icon: React.ComponentType; // Added icon to the interface
}

const navItems: Record<string, NavItem> = {
  "/": {
    name: "home",
    icon: Icons.home,
  },
  "/blog": {
    name: "projects",
    icon: Icons.projects,
  },
  "/resume.pdf": {
    name: "resume",
    external: true,
    icon: Icons.resume,
  },
};

export function Navbar() {
  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav className="relative px-0 pb-0" id="nav">
          <div className="flex flex-row space-x-6 pr-10">
            {Object.entries(navItems).map(
              ([path, { name, external, icon: Icon }]) => {
                return (
                  <Link
                    key={path}
                    href={path}
                    /* Simplified classes: removed flex/align-middle */
                    className="relative group"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    <span className="nav-link-text">
                      <Icon />
                      {name}
                    </span>
                  </Link>
                );
              },
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}
