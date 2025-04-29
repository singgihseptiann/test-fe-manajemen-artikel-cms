"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a[href]");
      anchorElements.forEach((anchor) =>
        anchor.addEventListener("click", (event) =>
          handleAnchorClick(event as MouseEvent),
        ),
      );
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      NProgress.done();
    };
  }, []);

  return null;
}
