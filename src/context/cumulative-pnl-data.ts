// Instead of using csv-parse, we'll parse the data directly
const parseCSV = (csvData: string) => {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj: any, header, index) => {
      obj[header.trim()] = header === 'Date' ? values[index].trim() : parseFloat(values[index]);
      return obj;
    }, {});
  });
};

const csvData = `Date,EQ Backcast
1/2/24,13309.97
1/3/24,29265.42
1/4/24,40926.40
1/5/24,53573.97
1/6/24,67179.11
1/7/24,78002.84
1/8/24,90857.43
1/9/24,110688.65
1/10/24,124579.95
1/11/24,133366.41
1/12/24,146690.74
1/13/24,152691.74
1/14/24,170122.80
1/15/24,1486349.23`;

export const cumulativePnLData = parseCSV(csvData);