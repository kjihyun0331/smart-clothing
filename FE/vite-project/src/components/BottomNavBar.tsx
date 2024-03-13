import styled from "styled-components";
import { theme } from "@/styles/theme";
import navConfig from "./config-bottomnavbar";
import { useLocation, useNavigate } from "react-router-dom";

// import { useLocation, useNavigate } from "react-router-dom";

function BottomNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <NavbarContainer>
      {navConfig.map(({ Icon, path, title, name }) => {
        const isActive = location.pathname.includes(title);
        return (
          <NavMenu key={title} onClick={() => navigate(path)}>
            <Icon isActive={isActive} />
            <p className="name">{name}</p>
          </NavMenu>
        );
      })}
    </NavbarContainer>
  );
}

export default BottomNavBar;

const NavbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 12dvh;
  background-color: white;
  border-top: 1px solid ${theme.colors.lightgrey};
  display: flex;
  box-sizing: border-box;
  justify-content: space-around;
  padding-bottom: 1.5rem;
  max-width: 450px;
  min-width: 320px;
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 0.5rem;

  .name {
    color: ${theme.colors.lightgrey};
    opacity: 0.7;
    font-size: 0.7rem;
  }
`;
