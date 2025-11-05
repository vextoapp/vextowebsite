interface XIconProps {
  size?: number;
  className?: string;
}

export default function XIcon({ size = 24, className = '' }: XIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4l16 16m0-16L4 20" />
    </svg>
  );
}
