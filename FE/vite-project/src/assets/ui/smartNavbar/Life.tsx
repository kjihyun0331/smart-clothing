import { NavbarUITypes } from "types/smartNavbarUi/smartNavbarUi";

export default function Life({ isactive }: NavbarUITypes) {
  return (
    <svg
      fill="white"
      viewBox="0 0 16 16"
      height="2rem"
      width="2em"
      opacity={isactive ? 1 : 0.6}
    >
      <path d="M12 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2zM4.5 3h5a.5.5 0 010 1h-5a.5.5 0 010-1zm0 2h7a.5.5 0 01.5.5v8a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-8a.5.5 0 01.5-.5z" />
    </svg>
  );
}
