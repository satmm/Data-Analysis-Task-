import data from '../data.json';

// Interface to define the structure of CropData
export interface CropData {
  Country: string;
  Year: string;
  CropName: string;
  CropProduction: number;
  YieldOfCrops: number;
  AreaUnderCultivation: number;
}

// Function to load data from the JSON file
export function loadData(): CropData[] {
  return data.map((item: any) => ({
    Country: item.Country,
    Year: item.Year,
    CropName: item["Crop Name"],
    CropProduction: item["Crop Production (UOM:t(Tonnes))"] || 0,
    YieldOfCrops: item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0,
    AreaUnderCultivation: item["Area Under Cultivation (UOM:Ha(Hectares))"] || 0
  }));
}

// Function to aggregate max and min production data per year
export function aggregateMaxMinProduction(data: CropData[]): any[] {
  const result: any[] = [];
  const years = [...new Set(data.map(item => item.Year))]; // Extract unique years

  years.forEach(year => {
    const cropsInYear = data.filter(item => item.Year === year); // Filter data by year
    const maxCrop = cropsInYear.reduce((prev, current) => (prev.CropProduction > current.CropProduction) ? prev : current);
    const minCrop = cropsInYear.reduce((prev, current) => (prev.CropProduction < current.CropProduction) ? prev : current);

    result.push({
      Year: year,
      MaxProductionCrop: maxCrop.CropName,
      MinProductionCrop: minCrop.CropName
    });
  });

  return result;
}

// Function to aggregate average yield and cultivation area for each crop
export function aggregateCropAverages(data: CropData[]): any[] {
  const result: any[] = [];
  const crops = [...new Set(data.map(item => item.CropName))]; // Extract unique crops

  crops.forEach(crop => {
    const cropsData = data.filter(item => item.CropName === crop); // Filter data by crop name
    const avgYield = cropsData.reduce((sum, item) => sum + item.YieldOfCrops, 0) / cropsData.length;
    const avgArea = cropsData.reduce((sum, item) => sum + item.AreaUnderCultivation, 0) / cropsData.length;

    result.push({
      Crop: crop,
      AvgYield: avgYield.toFixed(3),
      AvgArea: avgArea.toFixed(3)
    });
  });

  return result;
}
