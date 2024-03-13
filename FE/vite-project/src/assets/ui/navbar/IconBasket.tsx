import { NavbarUITypes } from "types/smartNavbarUi/smartNavbarUi";
import { theme } from "@/styles/theme";

export default function IconBasket({ isActive }: NavbarUITypes) {
  return (
    <svg
      fill="none"
      stroke={isActive ? theme.colors.pointcolor : theme.colors.grey}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="2em"
      width="2em"
      opacity={isActive ? 1 : 0.6}
    >
      <path d="M5 11l4-7M19 11l-4-7M2 11h20M3.5 11l1.6 7.4a2 2 0 002 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4M9 11l1 9M4.5 15.5h15M15 11l-1 9" />
    </svg>
  );
}
