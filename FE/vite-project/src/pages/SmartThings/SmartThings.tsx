import {
  Container,
  Title,
  Plus,
  ClothingCare,
} from "@/pages/SmartThings/smartStyle";
import SmartBottomNavbar from "@/components/smartbottomnavbar";
import image from "@/assets/homeclothingcare.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SmartThings() {
  const navigate = useNavigate();
  useEffect(() => {
    // 페이지나 컴포넌트가 마운트될 때 색상을 변경
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "#648FBA");

    // 컴포넌트가 언마운트될 때 원래 색상으로 복원(선택적)
    return () => {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#ffffff");
    };
  }, []);

  return (
    <Container>
      <Title>SmartThings</Title>
      <Plus>+</Plus>
      <ClothingCare
        onClick={() => {
          navigate("/agreement");
        }}
      >
        <img src={image} alt="" />
      </ClothingCare>
      <SmartBottomNavbar />
    </Container>
  );
}

export default SmartThings;
