import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import { YouTubeComponent } from "./youtube";

// ... (Table, Callout, CustomLink, RoundedImage components remain unchanged)

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  if (!data || !data.headers) return null;
  let headers = data.headers.map((header: string, index: number) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row: string[], index: number) => (
    <tr key={index}>
      {row.map((cell: string, cellIndex: number) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));
  return (
    <table>
      <thead>
        <tr className="text-left">{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function Callout(props: { emoji: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="px-4 py-3 bg-[#F7F7F7] dark:bg-[#181818] rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout leading-relaxed">{props.children}</div>
    </div>
  );
}

function CustomLink(props: { href: string; children: React.ReactNode }) {
  const { href, children, ...rest } = props;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...rest} />;
}

// ... inside your components file

function StandardImage(props: { src: string; alt: string }) {
  // Removed "rounded-lg"
  return <Image src={props.src} alt={props.alt} className="" />;
}

function SmartImage(props: { src: string; title?: string; alt: string }) {
  const { title, alt, src, ...rest } = props;

  return (
    <span className="block -mt-10">
      <span className="relative block w-full h-[450px]">
        <Image
          src={src}
          className="object-contain"
          fill
          alt={alt || ""}
          {...rest}
        />
      </span>
      {title && (
        <span className="-mt-14 mb-6 block text-sm text-center text-neutral-500 dark:text-neutral-400">
          {title}
        </span>
      )}
    </span>
  );
}

// Simple spacer for blank lines
function Spacer() {
  return <div className="py-4" />;
}

function Code({ children, ...props }: { children: React.ReactNode }) {
  let codeHTML = highlight(String(children));
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function Strikethrough(props: { children: React.ReactNode }) {
  return <del {...props} />;
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = (props: { children: React.ReactNode }) => {
    let slug = slugify(String(props.children));
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      props.children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  img: SmartImage, // This handles the markdown ![]() syntax
  Image: SmartImage, // This allows the <Image /> tag to also have subtext
  br: Spacer, // This handles the <br /> tag for blank lines
  a: CustomLink,
  YouTube: YouTubeComponent,
  code: Code,
  Table,
  Callout,
};

export async function CustomMDX(props: { source: string; components?: object }) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}