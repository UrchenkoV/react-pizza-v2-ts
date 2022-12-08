import CartEmpty from "../components/CartEmpty";
import CartWrapper from "../components/CartWrapper";

export default function Cart() {
  return <>{10 ? <CartWrapper /> : <CartEmpty />}</>;
}
