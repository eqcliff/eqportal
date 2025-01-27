export const SettlementCodeColorMap: Record<string, string> = {
  ECRS: "#ffa1a0",
  "Reg Up": "#4a79a7",
  "DA Energy": "#947769",
  "Non Spin": "#b478a0",
  "Reg Down": "#fb8b22",
  RRS: "#5b9656",
  "RT Energy Imbalance": "#6cafaa",
  "RT Reliability Deployment AS Imbalance": "#e15a58",
  "RT AS Imbalance": "#f3c639",
  // Keep additional mappings for backwards compatibility
  "ENERGY_DA": "#947769",
  "ENERGY_RT": "#6cafaa",
  "REGUP_DA": "#4a79a7",
  "REGUP_RT": "#4a79a7",
  "REGDN_DA": "#fb8b22",
  "REGDN_RT": "#fb8b22",
  "RRS_DA": "#5b9656",
  "RRS_RT": "#5b9656",
  "NSPIN_DA": "#b478a0",
  "NSPIN_RT": "#b478a0",
  "ECRS_DA": "#ffa1a0",
  "ECRS_RT": "#ffa1a0"
}

export type SettlementCode = keyof typeof SettlementCodeColorMap