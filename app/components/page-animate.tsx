'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PageAnimate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Reset state on every route change
    setIsFinished(false);

    // Match this timer to your globals.css animation duration (0.6s or 0.8s)
    // We add 50ms buffer to ensure the clip-path is 100% finished.
    const timer = setTimeout(() => {
      setIsFinished(true);
    }, 850); 

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div 
      key={pathname} 
      /* If isFinished is true, we swap the class to allow normal scrolling */
      className={isFinished ? "fade-in-complete" : "fade-in-start"}
    >
      {children}
    </div>
  );
}
