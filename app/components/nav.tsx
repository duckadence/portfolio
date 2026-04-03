import Link from 'next/link'

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'projects',
  },
  '/resume.pdf': {
    name: 'resume',
	external: true,
  },
}


export function Navbar() {
  return (
    <aside className=" mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav className="flex flex-row items-start relative px-0 pb-0" id="nav">
          {/* Changed space-x-0 to space-x-6 for a clean horizontal gap */}
          <div className="flex flex-row space-x-6 pr-10">
            {Object.entries(navItems).map(([path, { name, external }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  /* Removed px-1 and m-1 for perfect left-alignment */
                  className="flex align-middle relative py0 px-0 group"
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  <span className="nav-link-text">{name}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
