function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-14 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center" /* Hover/Transition logic moved to CSS */
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/jonathan-lin-136270185/"
          >
            <ArrowIcon />
            {/* The text is in a separate span to ensure the underline-offset works perfectly */}
            <span className="ml-2">linkedin</span>
          </a>
        </li>
        <li>
          <a
            className="flex items-center"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.instagram.com/lovemyfamily9783/"
          >
            <ArrowIcon />
            <span className="ml-2">instagram</span>
          </a>
        </li>
        <li>
          <a
            className="flex items-center"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/duckadence/portfolio"
          >
            <ArrowIcon />
            <span className="ml-2">site source</span>
          </a>
        </li>
      </ul>
      <p className="mt-7 text-neutral-600 dark:text-neutral-400 lowercase tracking-tight">
        © {new Date().getFullYear()} Jonathan Lin
      </p>
    </footer>
  )
}
