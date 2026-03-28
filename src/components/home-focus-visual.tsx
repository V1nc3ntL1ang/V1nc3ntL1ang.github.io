type HomeFocusVisualProps = {
  variant: "agents" | "learning" | "multimodal";
};

export function HomeFocusVisual({ variant }: HomeFocusVisualProps) {
  if (variant === "agents") {
    return (
      <div className="home-focus-visual home-focus-visual-agents" aria-hidden="true">
        <span className="home-focus-blob home-focus-blob-a" />
        <span className="home-focus-blob home-focus-blob-b" />
        <span className="home-focus-blob home-focus-blob-c" />
        <span className="home-focus-haze home-focus-haze-center" />

        <span className="home-focus-connection home-focus-connection-ab" />
        <span className="home-focus-connection home-focus-connection-ac" />
        <span className="home-focus-connection home-focus-connection-bd" />
        <span className="home-focus-connection home-focus-connection-cd" />
        <span className="home-focus-connection home-focus-connection-bc" />

        <span className="home-focus-node home-focus-node-a" />
        <span className="home-focus-node home-focus-node-b" />
        <span className="home-focus-node home-focus-node-c" />
        <span className="home-focus-node home-focus-node-d" />
      </div>
    );
  }

  if (variant === "learning") {
    return (
      <div className="home-focus-visual home-focus-visual-learning" aria-hidden="true">
        <span className="home-focus-blob home-focus-blob-a" />
        <span className="home-focus-blob home-focus-blob-b" />
        <span className="home-focus-blob home-focus-blob-c" />

        <span className="home-focus-loop home-focus-loop-a" />
        <span className="home-focus-loop home-focus-loop-b" />
        <span className="home-focus-loop home-focus-loop-c" />
        <span className="home-focus-orbit home-focus-orbit-a" />
        <span className="home-focus-orbit home-focus-orbit-b" />
        <span className="home-focus-core home-focus-core-learning" />
      </div>
    );
  }

  return (
    <div className="home-focus-visual home-focus-visual-multimodal" aria-hidden="true">
      <span className="home-focus-blob home-focus-blob-a" />
      <span className="home-focus-blob home-focus-blob-b" />
      <span className="home-focus-blob home-focus-blob-c" />

      <span className="home-focus-channel home-focus-channel-a" />
      <span className="home-focus-channel home-focus-channel-b" />
      <span className="home-focus-channel home-focus-channel-c" />

      <span className="home-focus-stream home-focus-stream-a" />
      <span className="home-focus-stream home-focus-stream-b" />
      <span className="home-focus-stream home-focus-stream-c" />

      <span className="home-focus-core home-focus-core-multimodal" />
      <span className="home-focus-output home-focus-output-a" />
      <span className="home-focus-output home-focus-output-b" />
    </div>
  );
}
