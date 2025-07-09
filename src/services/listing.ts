import rawSampleData from './sample.json';
import type { IAPIResponse, IListing } from '../types/types';

const sampleData = rawSampleData as IListing[];

const mockFetchListing = async(page=1, pageSize=20): Promise<IAPIResponse<IListing[]>> => {

  console.log("Fetching Network call");

  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const slicedList = sampleData.slice(start, end);

      resolve({
        success: true,
        data: slicedList,
      })
    }, 1500)
})
}

export {mockFetchListing};