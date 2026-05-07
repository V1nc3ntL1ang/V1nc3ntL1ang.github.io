type IconProps = {
  className?: string;
  size?: number;
};

export function GitHubIcon({ className = "", size = 18 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.649.5.5 5.649.5 12a11.5 11.5 0 0 0 7.864 10.912c.575.107.786-.25.786-.556 0-.274-.01-1-.016-1.962-3.2.696-3.877-1.542-3.877-1.542-.523-1.328-1.277-1.682-1.277-1.682-1.044-.713.079-.698.079-.698 1.155.081 1.763 1.186 1.763 1.186 1.026 1.759 2.692 1.251 3.348.956.104-.743.402-1.251.731-1.539-2.554-.29-5.24-1.277-5.24-5.684 0-1.255.448-2.282 1.183-3.086-.119-.29-.513-1.459.112-3.042 0 0 .965-.309 3.162 1.179a10.95 10.95 0 0 1 5.758 0c2.195-1.488 3.159-1.179 3.159-1.179.627 1.583.233 2.752.114 3.042.737.804 1.181 1.831 1.181 3.086 0 4.418-2.69 5.391-5.254 5.675.413.356.781 1.058.781 2.133 0 1.54-.014 2.782-.014 3.161 0 .309.207.669.791.555A11.502 11.502 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z" />
    </svg>
  );
}

export function MailIcon({ className = "", size = 20 }: IconProps) {
  const bodyX = 2.8;
  const bodyY = 6.4;
  const bodyWidth = 18.4;
  const bodyHeight = 11.2;
  const bodyRadius = 1.65;
  const centerX = bodyX + bodyWidth / 2;
  const topY = bodyY + 1.2;
  const centerY = bodyY + 6.45;
  const bleed = 0.9;
  const leftOuterX = bodyX - bleed;
  const rightOuterX = bodyX + bodyWidth + bleed;
  const foldPath = `M${leftOuterX} ${topY} L${centerX} ${centerY} L${rightOuterX} ${topY}`;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <rect
        x={bodyX}
        y={bodyY}
        width={bodyWidth}
        height={bodyHeight}
        rx={bodyRadius}
        ry={bodyRadius}
        fill="currentColor"
      />
      <path
        d={foldPath}
        fill="none"
        stroke="#050505"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
