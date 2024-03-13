import { NavbarUITypes } from "types/smartNavbarUi/smartNavbarUi";
import { theme } from "@/styles/theme";

export default function IconCalendar({ isActive }: NavbarUITypes) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill={isActive ? theme.colors.pointcolor : theme.colors.grey}
      height="1.5em"
      width="1.5em"
      opacity={isActive ? 1 : 0.6}
    >
      <path
        fill={isActive ? theme.colors.pointcolor : theme.colors.grey}
        d="M5 6h2v2H5zm3 0h2v2H8zm3 0h2v2h-2zm-9 6h2v2H2zm3 0h2v2H5zm3 0h2v2H8zM5 9h2v2H5zm3 0h2v2H8zm3 0h2v2h-2zM2 9h2v2H2zm11-9v1h-2V0H4v1H2V0H0v16h15V0h-2zm1 15H1V4h13v11z"
      />
    </svg>
  );
}
