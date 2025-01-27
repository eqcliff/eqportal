export const ProductColorMap = {
  "RT Energy": "#14c8b1",
  "DA Energy": "#ecd365",
  "Reg Up": "#ff6b6b",
  "Reg Down": "#45b7d1",
  "RRS": "#ff9f1c",
  "NonSpin": "#2ec4b6",
  "ECRS": "#14c8b1"
} as const

export type Product = keyof typeof ProductColorMap