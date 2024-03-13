import IconBasket from "@/assets/ui/navbar/IconBasket";
import IconCloset from "@/assets/ui/navbar/IconCloset";
import IconHome from "@/assets/ui/navbar/IconHome";
import IconCalendar from "@/assets/ui/navbar/IconCalendar";

const navConfig = [
  {
    title: "home",
    path: "/home",
    Icon: IconHome,
    name: "홈",
  },
  {
    title: "calendar",
    path: "/calendar",
    Icon: IconCalendar,
    name: "캘린더",
  },
  {
    title: "closet",
    path: "/closet",
    Icon: IconCloset,
    name: "옷장",
  },
  {
    title: "basket",
    path: "/basket",
    Icon: IconBasket,
    name: "모아보기",
  },
];

export default navConfig;
