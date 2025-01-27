import { SettlementCodeColorMap } from '../utils/SettlementCodeColorMap';

export const settlementComponentData = [
  { component: 'DA Energy', value: 5200000, color: SettlementCodeColorMap['ENERGY_DA'] },
  { component: 'RT Energy', value: 3800000, color: SettlementCodeColorMap['ENERGY_RT'] },
  { component: 'Reg Up', value: 2900000, color: SettlementCodeColorMap['REGUP_DA'] },
  { component: 'Reg Down', value: 2100000, color: SettlementCodeColorMap['REGDN_DA'] },
  { component: 'RRS', value: 1800000, color: SettlementCodeColorMap['RRS_DA'] },
  { component: 'Non-Spin', value: 1200000, color: SettlementCodeColorMap['NSPIN_DA'] },
  { component: 'ECRS', value: 900000, color: SettlementCodeColorMap['ECRS_DA'] },
];