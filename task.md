**The Scenario:**
We are building a highly customizable product page. Some products are simple (a mug), while others are complex (a custom PC where selecting a specific Motherboard limits the available CPUs and RAM).
 
**The Task:**
Without writing the UI yet, write the **TypeScript types/interfaces** for this product configurator.
 
**Requirements:**
1. Create a data structure that can handle varying product options (e.g., Color, Size, Component).
2. Use **Discriminated Unions** or **Generics** so that our React components can infer exactly what type of selection is being made.
3. Define a type for a `SelectionRule` (e.g., "If Color is Red, Size XXL is out of stock").
 