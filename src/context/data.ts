import { SettlementCodeColorMap, SettlementCode } from '../utils/SettlementCodeColorMap';

// Types
export interface CumulativePnLData {
  date: string;
  historicalActuals: number;
  eqBacktest: number;
  perfectForesight: number;
}

export interface SettlementData {
  component: SettlementCode;
  value: number;
  color: string;
}

export interface CumulativePnLBackcastData {
  Date: string;
  'EQ Backcast': string;
}

// Settlement Component Data
export const settlementComponentData: SettlementData[] = [
  { component: 'RT AS Imbalance', value: 91388.83, color: SettlementCodeColorMap['RT AS Imbalance'] },
  { component: 'RT Reliability Deployment AS Imbalance', value: 114868.95, color: SettlementCodeColorMap['RT Reliability Deployment AS Imbalance'] },
  { component: 'RT Energy Imbalance', value: -1303008.72, color: SettlementCodeColorMap['RT Energy Imbalance'] },
  { component: 'ECRS', value: 7632843.70, color: SettlementCodeColorMap['ECRS_DA'] },
  { component: 'Non Spin', value: 2064096.79, color: SettlementCodeColorMap['NSPIN_DA'] },
  { component: 'RRS', value: 1939155.60, color: SettlementCodeColorMap['RRS_DA'] },
  { component: 'Reg Up', value: 2729890.11, color: SettlementCodeColorMap['REGUP_DA'] },
  { component: 'Reg Down', value: 2034633.30, color: SettlementCodeColorMap['REGDN_DA'] },
  { component: 'DA Energy', value: 2238486.53, color: SettlementCodeColorMap['ENERGY_DA'] }
];

// Total PnL by Settlement Code Comparison Data
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

// Cumulative PnL Data
export const cumulativePnLData: CumulativePnLData[] = [
  {
    date: '1/2/2024',
    historicalActuals: 8160.49,
    eqBacktest: 13309.97,
    perfectForesight: 16517.99544
  },
  {
    date: '1/3/2024',
    historicalActuals: 14216.67,
    eqBacktest: 29265.42,
    perfectForesight: 31239.40331
  },
  // ... rest of the data
].map(row => ({
  date: row.date,
  historicalActuals: parseFloat(row.historicalActuals.toString()),
  eqBacktest: parseFloat(row.eqBacktest.toString()),
  perfectForesight: parseFloat(row.perfectForesight.toString())
}));

// Helper Functions
export const formatCurrency = (value: number) => {
  if (value === 0) return '$0';
  const absValue = Math.abs(value);
  if (absValue >= 1000000) {
    return `${value < 0 ? '-' : ''}$${(absValue / 1000000).toFixed(2)}M`;
  }
  return `${value < 0 ? '-' : ''}$${(absValue / 1000).toFixed(2)}K`;
};

export const calculatePercentage = (value: number, total: number) => {
  return (Math.abs(value) / total * 100).toFixed(2);
};