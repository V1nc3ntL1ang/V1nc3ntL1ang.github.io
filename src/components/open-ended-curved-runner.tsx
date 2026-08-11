"use client";

import { useEffect, useRef } from "react";

type OpenEndedCurvedRunnerProps = {
  d: string;
  durationMs?: number;
  sampleCount?: number;
  segmentRatio?: number;
};

export function OpenEndedCurvedRunner({
  d,
  durationMs = 3800,
  sampleCount = 24,
  segmentRatio = 0.085,
}: OpenEndedCurvedRunnerProps) {
  const referencePathRef = useRef<SVGPathElement | null>(null);
  const runnerPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const referencePath = referencePathRef.current;
    const runnerPath = runnerPathRef.current;

    if (!referencePath || !runnerPath) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const totalLength = referencePath.getTotalLength();
    const segmentLength = totalLength * segmentRatio;
    const samples = Math.max(2, Math.round(sampleCount));
    let animationFrame = 0;
    let elapsed = 0;
    let previousTimestamp: number | null = null;
    let isIntersecting = false;
    let isDocumentVisible = !document.hidden;
    let prefersReducedMotion = reduceMotion.matches;

    const buildSegmentPath = (startLength: number) => {
      const commands: string[] = [];

      for (let index = 0; index <= samples; index += 1) {
        const progress = index / samples;
        const currentLength = (startLength + progress * segmentLength) % totalLength;
        const point = referencePath.getPointAtLength(currentLength);
        commands.push(
          `${index === 0 ? "M" : "L"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
        );
      }

      return commands.join(" ");
    };

    const animate = (timestamp: number) => {
      if (previousTimestamp !== null) {
        elapsed += timestamp - previousTimestamp;
      }

      previousTimestamp = timestamp;
      const cycleProgress = (elapsed % durationMs) / durationMs;
      runnerPath.setAttribute("d", buildSegmentPath(cycleProgress * totalLength));
      animationFrame = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
      previousTimestamp = null;
    };

    const updateAnimationState = () => {
      const shouldAnimate =
        isIntersecting && isDocumentVisible && !prefersReducedMotion;

      if (shouldAnimate && !animationFrame) {
        animationFrame = window.requestAnimationFrame(animate);
      } else if (!shouldAnimate) {
        stopAnimation();
      }
    };

    const visibilityTarget = referencePath.ownerSVGElement ?? referencePath;
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            isIntersecting = entry.isIntersecting;
            updateAnimationState();
          });

    if (observer) {
      observer.observe(visibilityTarget);
    } else {
      isIntersecting = true;
    }

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      updateAnimationState();
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      updateAnimationState();
    };

    runnerPath.setAttribute("d", buildSegmentPath(0));
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reduceMotion.addEventListener("change", handleReducedMotionChange);
    updateAnimationState();

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reduceMotion.removeEventListener("change", handleReducedMotionChange);
      stopAnimation();
    };
  }, [d, durationMs, sampleCount, segmentRatio]);

  return (
    <>
      <path ref={referencePathRef} d={d} fill="none" opacity="0" />
      <path className="open-ended-reference-curved-runner" fill="none" ref={runnerPathRef} />
    </>
  );
}
