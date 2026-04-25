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

    if (reduceMotion.matches) {
      return;
    }

    const totalLength = referencePath.getTotalLength();
    const segmentLength = totalLength * segmentRatio;
    const samples = Math.max(2, Math.round(sampleCount));
    let animationFrame = 0;
    let startTime: number | null = null;

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
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const cycleProgress = (elapsed % durationMs) / durationMs;
      runnerPath.setAttribute("d", buildSegmentPath(cycleProgress * totalLength));
      animationFrame = window.requestAnimationFrame(animate);
    };

    runnerPath.setAttribute("d", buildSegmentPath(0));
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [d, durationMs, sampleCount, segmentRatio]);

  return (
    <>
      <path ref={referencePathRef} d={d} fill="none" opacity="0" />
      <path className="open-ended-reference-curved-runner" fill="none" ref={runnerPathRef} />
    </>
  );
}
