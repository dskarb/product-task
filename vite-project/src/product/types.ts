// ─── Primitive value types ───────────────────────────────────────────────────

export type Color = 'red' | 'blue' | 'yellow' | 'green' | 'black' | 'white' | (string & {});
export type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export type Currency = 'PLN' | 'USD' | 'EUR';

// ─── Option value descriptors ─────────────────────────────────────────────────

export type ColorValue = {
  value: Color;
  label: string;
  hexCode?: string;
};

export type SizeValue = {
  value: Size;
  label: string;
};

export type ComponentValue = {
  /** Unique identifier for this value, e.g. "rtx-4090" */
  value: string;
  label: string;
  /** Added to the base product price when selected */
  priceModifier?: number;
};

// ─── Option types (discriminated union on `kind`) ─────────────────────────────
//
// React components can narrow to the exact option shape with a `kind` check:
//   if (option.kind === 'color') { /* option.values is ColorValue[] */ }

export type ColorOption = {
  kind: 'color';
  id: string;
  label: string;
  values: ColorValue[];
};

export type SizeOption = {
  kind: 'size';
  id: string;
  label: string;
  values: SizeValue[];
};

export type ComponentOption = {
  kind: 'component';
  id: string;
  label: string;
  values: ComponentValue[];
};

/** Union of every option kind a product can expose */
export type ProductOption = ColorOption | SizeOption | ComponentOption;

// ─── Current selection (discriminated union on `kind`) ────────────────────────
//
// Mirrors ProductOption so components can carry both together and stay in sync.

export type ColorSelection = {
  kind: 'color';
  optionId: string;
  value: Color;
};

export type SizeSelection = {
  kind: 'size';
  optionId: string;
  value: Size;
};

export type ComponentSelection = {
  kind: 'component';
  optionId: string;
  value: string;
};

/** Union of all possible user selections */
export type ProductSelection = ColorSelection | SizeSelection | ComponentSelection;

// ─── Helper: derive the selection type from an option type ────────────────────

export type SelectionFromOption<T extends ProductOption> =
  T extends ColorOption     ? ColorSelection     :
  T extends SizeOption      ? SizeSelection      :
  T extends ComponentOption ? ComponentSelection :
  never;

// ─── Selection Rules ──────────────────────────────────────────────────────────

/**
 * The "if" side of a rule — which option+value triggers the rule.
 * Discriminated on `kind` so the `value` field is always the right type.
 */
export type SelectionCondition =
  | { kind: 'color';     optionId: string; value: Color  }
  | { kind: 'size';      optionId: string; value: Size   }
  | { kind: 'component'; optionId: string; value: string };

/**
 * The "then" side of a rule — what happens when the condition is met.
 *
 *  - `out_of_stock`     : the entire product cannot be purchased.
 *  - `unavailable`      : one specific option value becomes un-selectable.
 *  - `restrict_values`  : another option's available values are reduced to
 *                         `allowedValues` (e.g., choosing Motherboard X limits CPUs).
 */
export type SelectionEffect =
  | { effect: 'out_of_stock' }
  | { effect: 'unavailable';     optionId: string; value: string           }
  | { effect: 'restrict_values'; optionId: string; allowedValues: string[] };

export type SelectionRule = {
  if: SelectionCondition;
  then: SelectionEffect;
};

// ─── Product ──────────────────────────────────────────────────────────────────

/**
 * Generic product keyed on the option kinds it supports.
 *
 *  Product<ColorOption | SizeOption>  → simple product (mug, t-shirt)
 *  Product<ComponentOption>           → configurable product (custom PC)
 *  Product<ProductOption>             → default: any mix of options
 */
export type Product<TOption extends ProductOption = ProductOption> = {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  currency: Currency;
  stock: number;
  /** All configurable dimensions for this product */
  options: TOption[];
  selectionRules?: SelectionRule[];
};

// ─── Convenience aliases ──────────────────────────────────────────────────────

/** A simple product that only has color and/or size choices */
export type SimpleProduct = Product<ColorOption | SizeOption>;

/** A fully configurable product whose options are hardware/software components */
export type ConfigurableProduct = Product<ComponentOption>;
