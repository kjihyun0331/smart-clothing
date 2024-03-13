import { NavbarUITypes } from "types/smartNavbarUi/smartNavbarUi";
import { theme } from "@/styles/theme";

export default function IconHome({ isActive }: NavbarUITypes) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={isActive ? theme.colors.pointcolor : theme.colors.grey}
      height="2em"
      width="2em"
      opacity={isActive ? 1 : 0.6}
    >
      <path d="M21.743 12.331l-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 00-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 001 1h3a1 1 0 001-1v-4h4v4a1 1 0 001 1h3a1 1 0 001-1v-7h2a.998.998 0 00.743-1.669z" />
    </svg>
  );
}
