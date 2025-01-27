// Instead of using csv-parse, we'll parse the data directly
const parseCSV = (csvData: string) => {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj: any, header, index) => {
      obj[header.trim()] = header === 'date' ? values[index].trim() : parseFloat(values[index]);
      return obj;
    }, {});
  });
};

const csvData = `date,daily_discharge_mwh,cumulative_discharge_mwh,daily_charge_mwh,cumulative_charge_mwh,daily_soc_min,daily_soc_max
1/2/24,104.588,103.867,304.647,306.814,131.324,237.188
1/3/24,171.066,274.932,200.884,507.698,174.973,223.813
1/4/24,217.424,492.357,263.366,771.065,166.79,221.285
1/5/24,285.009,777.706,307.858,1078.922,160.396,215.521
1/6/24,155.978,933.395,324.345,1405.434,124.775,240.405
1/7/24,96.922,1030.128,136.354,1541.788,177.245,223.277
1/8/24,138.083,1168.558,160.236,1702.024,173.373,228.252
1/9/24,203.857,1372.114,264.722,1966.611,140.142,238.596
1/10/24,155.325,1527.15,323.669,2292.447,139.568,239.657
1/11/24,145.565,1672.578,191.851,2484.298,170.334,224.959
1/12/24,271.749,1944.463,315.63,2799.928,135.515,240.852
1/13/24,163.658,2107.69,227.453,3027.379,196.792,233.21
1/14/24,242.856,2350.546,398.609,3427.964,129.446,239.845
1/15/24,871.869,3222.416,1210.016,4637.982,56.866,260`;

export const dailyEnergyData = parseCSV(csvData);