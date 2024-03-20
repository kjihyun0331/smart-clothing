import Layout from "@/components/Layout";
import { Header } from "@/sections/closet/ClosetStyle";
import BasketState from "@/sections/basket/BasketState";

function Basket() {
  return (
    <Layout>
      <Header style={{ textAlign: "center" }}>모아보기</Header>
      <BasketState />
    </Layout>
  );
}

export default Basket;
