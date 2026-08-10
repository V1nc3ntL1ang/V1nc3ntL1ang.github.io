"use client";

import { useEffect, useRef } from "react";

const mapMyVisitorsScriptSrc =
  "https://mapmyvisitors.com/map.js?cl=9aa3ad&w=300&t=m&d=boo1wjUctx6Tn22ca62R7fZORv6GWkBYxrthKO1YPYw&co=050505&cmo=1f9bff&cmn=ff5a6b";
const mapMyVisitorsStatsUrl = "https://mapmyvisitors.com/web/1c7fe";

export function MapMyVisitorsWidget() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.replaceChildren();

    const script = document.createElement("script");
    script.id = "mapmyvisitors";
    script.src = mapMyVisitorsScriptSrc;
    script.async = true;
    host.appendChild(script);

    const normalizeStatsLink = () => {
      const link = host.querySelector<HTMLAnchorElement>("#mapmyvisitors-widget");
      if (!link) return;

      if (link.href !== mapMyVisitorsStatsUrl) link.href = mapMyVisitorsStatsUrl;
      if (link.target !== "_blank") link.target = "_blank";
      if (link.rel !== "noreferrer") link.rel = "noreferrer";
      if (link.getAttribute("aria-label") !== "Visitor statistics") {
        link.setAttribute("aria-label", "Visitor statistics");
      }
    };
    const observer = new MutationObserver(normalizeStatsLink);
    observer.observe(host, {
      attributes: true,
      attributeFilter: ["aria-label", "href", "rel", "target"],
      childList: true,
      subtree: true,
    });
    normalizeStatsLink();

    return () => {
      observer.disconnect();
      host.replaceChildren();
    };
  }, []);

  return (
    <div className="mapmyvisitors-widget w-full text-center">
      <div ref={hostRef} className="mapmyvisitors-script-host" />
    </div>
  );
}
