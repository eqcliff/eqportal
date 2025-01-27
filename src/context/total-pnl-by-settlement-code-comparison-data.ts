import { SettlementCodeColorMap } from '../utils/SettlementCodeColorMap';

export const totalPnlBySettlementCodeComparisonData = [
  {
    Component: 'DA Energy',
    Actuals: 5200000,
    Backtest: 6100000,
    PerfectForesight: 6800000,
    Color: SettlementCodeColorMap['ENERGY_DA']
  },
  {
    Component: 'RT Energy',
    Actuals: 3800000,
    Backtest: 4500000,
    PerfectForesight: 5100000,
    Color: SettlementCodeColorMap['ENERGY_RT']
  },
  {
    Component: 'Reg Up',
    Actuals: 2900000,
    Backtest: 3400000,
    PerfectForesight: 3900000,
    Color: SettlementCodeColorMap['REGUP_DA']
  },
  {
    Component: 'Reg Down',
    Actuals: 2100000,
    Backtest: 2600000,
    PerfectForesight: 3000000,
    Color: SettlementCodeColorMap['REGDN_DA']
  },
  {
    Component: 'RRS',
    Actuals: 1800000,
    Backtest: 2200000,
    PerfectForesight: 2500000,
    Color: SettlementCodeColorMap['RRS_DA']
  },
  {
    Component: 'Non-Spin',
    Actuals: 1200000,
    Backtest: 1500000,
    PerfectForesight: 1700000,
    Color: SettlementCodeColorMap['NSPIN_DA']
  },
  {
    Component: 'ECRS',
    Actuals: 900000,
    Backtest: 1100000,
    PerfectForesight: 1300000,
    Color: SettlementCodeColorMap['ECRS_DA']
  }
];