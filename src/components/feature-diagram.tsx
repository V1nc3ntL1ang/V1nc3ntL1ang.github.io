import type { CSSProperties } from "react";

type FeatureDiagramProps = {
  variant: "stack" | "cluster" | "speed";
};

const lineStyle = {
  borderColor: "rgba(255,255,255,0.16)",
} satisfies CSSProperties;

export function FeatureDiagram({ variant }: FeatureDiagramProps) {
  if (variant === "stack") {
    return (
      <div className="wire-panel relative h-72">
        {[96, 72, 48, 24, 0].map((offset) => (
          <div
            key={offset}
            className="absolute left-1/2 h-28 w-52 rounded-[1.35rem] border"
            style={{
              ...lineStyle,
              transform: `translateX(-50%) translateY(${offset}px)`,
            }}
          />
        ))}
        <div
          className="absolute left-1/2 top-4 h-30 w-56 rounded-[1.5rem] border"
          style={{
            ...lineStyle,
            transform: "translateX(-50%) rotate(-29deg)",
          }}
        />
        <div className="absolute left-1/2 top-12 h-18 w-18 -translate-x-1/2 rounded-full border border-border-subtle" />
        <div className="absolute left-1/2 top-16 h-px w-24 -translate-x-1/2 bg-border-subtle" />
        <div className="absolute left-1/2 top-19 h-px w-20 -translate-x-1/2 bg-border-subtle" />
        <div className="absolute left-1/2 top-22 h-px w-18 -translate-x-1/2 bg-border-subtle" />
      </div>
    );
  }

  if (variant === "cluster") {
    return (
      <div className="wire-panel relative h-72">
        <div className="absolute left-12 top-18 h-34 w-34 rounded-[1rem] border border-border-subtle" />
        <div className="absolute left-34 top-4 h-28 w-28 rounded-[1rem] border border-border-subtle" />
        <div className="absolute right-12 top-18 h-34 w-34 rounded-[1rem] border border-border-subtle" />
        <div className="absolute left-26 bottom-6 h-24 w-28 rounded-[1rem] border border-border-subtle" />

        <div className="absolute left-10 top-28 h-10 w-36 rounded-[0.9rem] border border-border-subtle opacity-45" />
        <div className="absolute right-13 top-18 h-12 w-32 rounded-[0.9rem] border border-border-subtle opacity-45" />
        <div className="absolute right-13 top-31 h-12 w-32 rounded-[0.9rem] border border-border-subtle opacity-45" />

        <div className="absolute left-20 top-10 h-3 w-5 rounded-sm border border-border-subtle" />
        <div className="absolute left-40 top-6 h-3 w-5 rounded-sm border border-border-subtle" />
        <div className="absolute left-41 top-37 h-3 w-5 rounded-sm border border-border-subtle" />
      </div>
    );
  }

  return (
    <div className="wire-panel relative h-72">
      {Array.from({ length: 11 }).map((_, index) => {
        const width = 82 + index * 18;
        const height = 16 + index * 15;

        return (
          <div
            key={index}
            className="absolute bottom-8 left-1/2 rounded-[0.4rem] border"
            style={{
              ...lineStyle,
              width: `${width}px`,
              height: `${height}px`,
              transform: `translateX(-50%) translateX(${index * 8}px)`,
              opacity: 1 - index * 0.05,
            }}
          />
        );
      })}
    </div>
  );
}
