"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function PageAnimate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setIsFinished(false);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsFinished(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      key={pathname}
      className={isFinished ? "fade-in-finished" : "fade-in-start"}
    >
      {/* Just a clean wrapper, no height constraints */}
      <div className="w-full">{children}</div>
    </div>
  );
}
