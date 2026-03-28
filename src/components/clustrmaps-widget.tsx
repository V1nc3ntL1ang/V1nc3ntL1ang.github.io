"use client";

import { useEffect, useRef } from "react";

const clustrmapsImageSrc =
  "//clustrmaps.com/map_v2.png?cl=9aa3ad&w=300&t=m&d=024_XSDGHqaW8jd_OakM3Cy7vmPgM8uYvEmWqI7XiDo&co=050505&ct=ffffff";

const clustrmapsScriptSrc =
  "//cdn.clustrmaps.com/map_v2.js?cl=9aa3ad&w=300&t=m&d=024_XSDGHqaW8jd_OakM3Cy7vmPgM8uYvEmWqI7XiDo&co=050505&ct=ffffff&cmo=1f9bff&cmn=ff5a6b";

const isDevelopment = process.env.NODE_ENV !== "production";

export function ClustrmapsWidget() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDevelopment) return;

    const host = hostRef.current;
    if (!host) return;

    host.innerHTML = "";

    const script = document.createElement("script");
    script.id = "clustrmaps";
    script.src = clustrmapsScriptSrc;
    script.async = true;
    host.appendChild(script);

    return () => {
      host.innerHTML = "";
    };
  }, []);

  if (isDevelopment) {
    return (
      <div className="clustrmaps-widget w-full text-center">
        <a href="https://clustrmaps.com/site/1c8go" title="Visit tracker" target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={clustrmapsImageSrc}
            alt="Clustrmaps visitor map"
            width={300}
            height={147}
            className="mx-auto clustrmaps-fallback-image"
          />
        </a>
      </div>
    );
  }

  return (
    <div className="clustrmaps-widget w-full text-center">
      <div ref={hostRef} className="clustrmaps-script-host" />
    </div>
  );
}
