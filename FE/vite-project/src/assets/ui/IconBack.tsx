type IconBackProps = {
  onClick: () => void;
};

// Device({ isActive }: SmartNavbarUITypes) {

function IconBack({ onClick }: IconBackProps) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" height="2em" width="2em">
      <path
        onClick={onClick}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35}
        d="M328 112L184 256l144 144"
      />
    </svg>
  );
}

export default IconBack;
