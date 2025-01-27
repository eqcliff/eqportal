import { hourlySimulatedSettlementsPnLData } from "./simulatedSettlementsPnLData";

export interface CumulativePnlDataPoint {
  timestamp: string;
  cumulativePnL: number;
  intervalPnL: number;
}

export const cumulativePnlFifteenMinData: CumulativePnlDataPoint[] = [];

let cumulativePnL = 0;
const startTime = new Date("2024-01-15T00:15:00");
const endTime = new Date("2024-01-16T00:00:00");

// Calculate total number of 15-minute intervals
const fifteenMinIntervals = (endTime.getTime() - startTime.getTime()) / (15 * 60 * 1000) + 1;

for (let i = 0; i < fifteenMinIntervals; i++) {
  const currentIntervalTime = new Date(startTime.getTime() + i * 15 * 60 * 1000);

  // Find corresponding hourly data, handling the day change
  let correspondingHourlyData = hourlySimulatedSettlementsPnLData.find((data) => {
    const dataTime = new Date(data.operating_dt);
    return (
      dataTime.getHours() === currentIntervalTime.getHours() && 
      dataTime.getDate() === currentIntervalTime.getDate()
    );
  });

  // If no corresponding data is found for the current day, try the previous day's last hour
  if (!correspondingHourlyData && currentIntervalTime.getHours() === 0) {
    correspondingHourlyData = hourlySimulatedSettlementsPnLData[hourlySimulatedSettlementsPnLData.length - 1];
  }

  if (correspondingHourlyData) {
    const hourlyTotal = Object.values(correspondingHourlyData).reduce((sum, value) => {
      return typeof value === "number" ? sum + value : sum;
    }, 0) - correspondingHourlyData.operating_hr;

    const intervalPnL = hourlyTotal / 4;
    cumulativePnL += intervalPnL;

    cumulativePnlFifteenMinData.push({
      timestamp: currentIntervalTime.toISOString(),
      cumulativePnL,
      intervalPnL,
    });
  }
}