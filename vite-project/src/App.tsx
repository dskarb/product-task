import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Product, { type ProductType } from "./product/Product";

const productsList: ProductType[] = [
  // {
  //   id: "1234",
  //   name: "Test Name",
  //   price: 999,
  //   currency: "PLN",
  //   stock: 1234,
  //   components: [
  //     {
  //       id: "comp1",
  //       name: "Test Component",
  //       price: 999,
  //       currency: "PLN",
  //       stock: 1234,
  //     },
  //     {
  //       id: "comp2",
  //       name: "Test Component 2",
  //       price: 999,
  //       currency: "PLN",
  //       stock: 1234,
  //     },
  //     {
  //       id: "comp3",
  //       name: "Test Component 3",
  //       price: 999,
  //       currency: "PLN",
  //       stock: 1234,
  //     },
  //   ],
  // },

  // { id: "222", name: "Test Name", price: 999, currency: "PLN", stock: 1234 },
  {
    id: "1233334",
    name: "Test Name",
    price: 999,
    currency: "PLN",
    stock: 1234,
    size: "xl",
    color: "blue",
    selectionRules: [
      {
        if: { attribute: "color", value: "blue" },
        then: { effect: "out_of_stock" },
      },
    ],
  },
  // { id: "14234", name: "Test Name", price: 999, currency: "PLN", stock: 1234 },
  // { id: "12434", name: "Test Name", price: 999, currency: "PLN", stock: 1234 },
  // {
  //   id: "1255534",
  //   name: "Test Name",
  //   price: 999,
  //   currency: "PLN",
  //   stock: 1234,
  // },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        {productsList.map((item, i) => (
          <Product key={i} {...item} />
        ))}
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
