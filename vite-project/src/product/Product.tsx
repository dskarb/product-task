type Color = "red" | "blue" | "yellow" | string;
type Size = "s" | "m" | "l" | "xl" | "xxl";
type Currency = "PLN" | "USD";

type SelectionRuleCondition =
  | { attribute: "color"; value: Color }
  | { attribute: "size"; value: Size };

type SelectionRuleEffect =
  | { effect: "out_of_stock" | "unavailable" }
  | { effect: "out_of_stock" | "unavailable" };

export type SelectionRule = {
  if: SelectionRuleCondition;
  then: SelectionRuleEffect;
};

export interface ComponentType {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  stock: number;
}

export interface ProductType {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  stock: number;
  color?: Color;
  size?: Size;
  components?: ComponentType[];
  selectionRules?: SelectionRule[];
}

const Product = (product: ProductType) => {
  return (
    <div>
      <p>Name: {product.name}</p>
      <p>
        Price: {product.price} {product.currency}
      </p>
      {product.size && <p>Size: {product.size}</p>}
      {product.color && <p>Color: {product.color}</p>}
      {product.components && (
        <p>
          Components:{" "}
          {product.components.map((component, i) => (
            <div key={i}>{component.name}</div>
          ))}
        </p>
      )}
      {product.selectionRules &&
        product.selectionRules.map((rule, i) => {
          console.log(rule);
          return (
            rule.if.attribute === 'color' &&
            rule.if.value === product.color &&
            rule.then.effect
          );
        })}
    </div>
  );
};

export default Product;
