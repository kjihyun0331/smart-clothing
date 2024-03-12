import styled from "styled-components";
import navConfig from "@/components/config-smartbottomnavbar";
import { useLocation, useNavigate } from "react-router-dom";

function SmartBottomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <NavContainer>
      {navConfig.map(({ Icon, path, title }) => {
        const isActive = location.pathname === title;
        console.log(location.pathname);
        return (
          <div key={title} onClick={() => navigate(path)}>
            <Icon isActive={isActive} />;
          </div>
        );
      })}
    </NavContainer>
  );
}

export default SmartBottomNavbar;

const NavContainer = styled.div`
  width: 100%;
  height: 12dvh;
  background-color: #94a1cb;
  position: absolute;
  bottom: 0;
  display: flex;
  box-sizing: border-box;
  padding-top: 1rem;
  justify-content: space-around;
`;

// { navConfig.map(
//   (
//     (title, path, icon)
//   ) => {
//     const isActiveItem = item.path.includes(item.path); // 현재 path를 포함하는지 여부 확인
//     const isOnlyActive = activeIndex === index; // 무조건 하나만 active 상태인지 여부 확인
//     const isactive = !!(isActiveItem && isOnlyActive); // path 일치하고, 무조건 하나만 active인 경우에만 true

//     return (
//       <div
//         key={index}
//         onClick={() => handleItemClick(index)}
//         // isactive={isactive}
//       >
//         {item.icon({ isactive: isactive })}
//       </div>
//     );
//   }
// )}
