export type {
  Color,
  Size,
  Currency,
  ColorValue,
  SizeValue,
  ComponentValue,
  ColorOption,
  SizeOption,
  ComponentOption,
  ProductOption,
  ColorSelection,
  SizeSelection,
  ComponentSelection,
  ProductSelection,
  SelectionFromOption,
  SelectionCondition,
  SelectionEffect,
  SelectionRule,
  Product,
  SimpleProduct,
  ConfigurableProduct,
} from './types';

import type { Product as ProductType, ProductOption, SelectionRule } from './types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Resolve which rules are active given the current set of selections */
function getActiveEffects(
  rules: SelectionRule[],
  selections: Map<string, string>,
) {
  return rules.filter((rule) => {
    const selected = selections.get(rule.if.optionId);
    return selected === rule.if.value;
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ProductProps {
  product: ProductType;
  /** optionId → chosen value string */
  selections?: Map<string, string>;
}

const Product = ({ product, selections = new Map() }: ProductProps) => {
  const activeEffects = product.selectionRules
    ? getActiveEffects(product.selectionRules, selections)
    : [];

  const isOutOfStock =
    product.stock === 0 ||
    activeEffects.some((r) => r.then.effect === 'out_of_stock');

  return (
    <div>
      <p>Name: {product.name}</p>
      {product.description && <p>{product.description}</p>}
      <p>
        Price: {product.basePrice} {product.currency}
      </p>
      <p>In stock: {isOutOfStock ? 'No' : product.stock}</p>

      {product.options.map((option: ProductOption) => {
        if (option.kind === 'color') {
          return (
            <p key={option.id}>
              Color options: {option.values.map((v) => v.label).join(', ')}
            </p>
          );
        }
        if (option.kind === 'size') {
          return (
            <p key={option.id}>
              Size options: {option.values.map((v) => v.label).join(', ')}
            </p>
          );
        }
        if (option.kind === 'component') {
          return (
            <div key={option.id}>
              <p>{option.label}:</p>
              {option.values.map((v) => (
                <div key={v.value}>
                  {v.label}
                  {v.priceModifier !== undefined && ` (+${v.priceModifier})`}
                </div>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Product;
