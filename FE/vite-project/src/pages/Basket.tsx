import Layout from "@/components/Layout";
import BasketState from "@/sections/basket/BasketState";

function Basket() {
  return (
    <Layout>
      <div style={{ height: "7dvh" }}>(뒤) 여기에 헤더 들어갈 자리 (알림)</div>
      <BasketState />
    </Layout>
  );
}

export default Basket;
