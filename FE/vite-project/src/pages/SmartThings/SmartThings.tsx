import {
  Container,
  Title,
  Plus,
  ClothingCare,
} from "@/pages/SmartThings/smartStyle";
import SmartBottomNavbar from "@/components/smartbottomnavbar";
import image from "@/assets/homeclothingcare.png";
import { useNavigate } from "react-router-dom";

function SmartThings() {
  const navigate = useNavigate();

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
