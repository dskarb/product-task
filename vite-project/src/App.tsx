
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Product from "./product/Product";
import type { SimpleProduct, ConfigurableProduct } from "./product/types";

// ── Simple product: a mug with color and size options ─────────────────────────
const mug: SimpleProduct = {
  id: "mug-001",
  name: "Classic Mug",
  description: "A ceramic mug — pick your colour and size.",
  basePrice: 29,
  currency: "PLN",
  stock: 200,
  options: [
    {
      kind: "color",
      id: "color",
      label: "Color",
      values: [
        { value: "red",   label: "Red",   hexCode: "#ef4444" },
        { value: "blue",  label: "Blue",  hexCode: "#3b82f6" },
        { value: "white", label: "White", hexCode: "#ffffff" },
      ],
    },
    {
      kind: "size",
      id: "size",
      label: "Size",
      values: [
        { value: "s",  label: "Small (250 ml)"  },
        { value: "xl", label: "Large (500 ml)" },
      ],
    },
  ],
  selectionRules: [
    {
      // Red + XXL → out of stock
      if:   { kind: "color", optionId: "color", value: "red" },
      then: { effect: "unavailable", optionId: "size", value: "xxl" },
    },
  ],
};

// ── Configurable product: a custom PC where component choices are linked ──────
const customPc: ConfigurableProduct = {
  id: "pc-001",
  name: "Custom PC Builder",
  description: "Build your perfect machine — motherboard choice limits CPU and RAM options.",
  basePrice: 999,
  currency: "USD",
  stock: 50,
  options: [
    {
      kind: "component",
      id: "motherboard",
      label: "Motherboard",
      values: [
        { value: "mb-am5",  label: "ASUS ROG X670E (AM5)",  priceModifier: 450 },
        { value: "mb-lga",  label: "MSI MEG Z790 (LGA1700)", priceModifier: 380 },
      ],
    },
    {
      kind: "component",
      id: "cpu",
      label: "CPU",
      values: [
        { value: "ryzen-9-7950x", label: "AMD Ryzen 9 7950X", priceModifier: 700 },
        { value: "core-i9-13900k", label: "Intel Core i9-13900K", priceModifier: 650 },
      ],
    },
    {
      kind: "component",
      id: "ram",
      label: "RAM",
      values: [
        { value: "ddr5-32gb", label: "32 GB DDR5", priceModifier: 180 },
        { value: "ddr4-32gb", label: "32 GB DDR4", priceModifier: 90  },
      ],
    },
  ],
  selectionRules: [
    {
      // AM5 motherboard → only DDR5 RAM is compatible
      if:   { kind: "component", optionId: "motherboard", value: "mb-am5" },
      then: { effect: "restrict_values", optionId: "ram", allowedValues: ["ddr5-32gb"] },
    },
    {
      // AM5 motherboard → only AMD CPUs are compatible
      if:   { kind: "component", optionId: "motherboard", value: "mb-am5" },
      then: { effect: "restrict_values", optionId: "cpu", allowedValues: ["ryzen-9-7950x"] },
    },
    {
      // LGA1700 motherboard → only Intel CPUs are compatible
      if:   { kind: "component", optionId: "motherboard", value: "mb-lga" },
      then: { effect: "restrict_values", optionId: "cpu", allowedValues: ["core-i9-13900k"] },
    },
    {
      // LGA1700 motherboard → only DDR4 RAM is compatible
      if:   { kind: "component", optionId: "motherboard", value: "mb-lga" },
      then: { effect: "restrict_values", optionId: "ram", allowedValues: ["ddr4-32gb"] },
    },
  ],
};

const productsList = [mug, customPc];

function App() {
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        {productsList.map((item, i) => (
          <Product key={i} product={item} />
        ))}
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
