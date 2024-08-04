import {getDoc, deleteDoc, patchDoc, postDoc} from "@/utils/api-wrappers"; 


// get user domains/business
export const getDomains = async (page?: string, limit?: number, q?: string) => {
    let res = await getDoc(`/business?page=${page || 0}&limit=${limit || 30}${q ? `&q=${q}`: ""}`, true); 
    return res?.data || false; 
}; 

// count business
export const getBusinessCount = async () => {
    let res = await getDoc(`/business/list/count`, true);
    return res?.data?.count || false; 
}

// get domain/business
export const getDomain = async (domainId: string) => {
    let res = await getDoc(`/business/${domainId}`, true); 
     
    return res?.data || false; 
};

// update domain/business
export const updateDomain = async (domainId: string, data: any) => {
    let res = await patchDoc(`/business/${domainId}`, data, true);
    return res?.status === "success" || false; 
};

// delete domain
export const deleteDomain = async (domainId: string) => {
    let res = await deleteDoc(`/business/${domainId}`, true); 
    return res?.status === "success" || false; 
}; 

// create domain || business
export const createDomain = async (data: any) => {
    let res = await postDoc(`/business`, data, true); 
    return res?.data || false; 
};

// get domain users 
export const getDomainUsers = async (domainId: string, page?: string, limit?: number, q?: string) => {
    let url = `/business/users/${domainId}`;
    url = `${url}?page=${page || 0}`; 
    url = `${url}&limit=${limit || 40}`; 
    if (q) url = `${url}&q=${q}`; 
    // `/business/users/${domainId}?page=${page || 0}&limit=${limit || 40}&${q ? "q=" + q: ""}`
    let res = await getDoc(url, true);
    return res?.data || false; 
};

// add user to domain
export const addUserToDomain = async (domainId: string, data: any, group?: boolean) => {
    let res = await postDoc(`/business/users/${group ? "group/": ""}${domainId}`, data, true);
    return res?.status === "success" || false; 
};

// update user in domain 
// export const updateDomainUser = async (domainId: string, )


// get dashboard graphs
export type TimelineType = "90d" | "30d" | "7d" | "365d"; 

export const getDashboardGraphs = async (timeline: TimelineType) => {
    let res = await getDoc(`/business/list/graphs/${timeline}`, true);
    return res?.data || false; 
};

export const getDomainGraphs = async (domainId: string, timeline: TimelineType) => {
    let res = await getDoc(`/business/graphs/${domainId}/${timeline}`, true); 
    return res?.data || false; 
};


// helper functions for graphs 
export function generateChartConfig(domains: string[]) {
    // Base colors for the chart
    const baseColors = [
      "--chart-1", "--chart-2", "--chart-3", "--chart-4",
      "--chart-5"
    ];
  
    // Helper function to generate HSL color variables
    const getColor = (index: number) => `hsl(var(${baseColors[index % baseColors.length]}))`;
  
    // Generate the chart configuration object
    const chartConfig = domains.reduce((config: any, domain, index) => {
      config[domain] = {
        label: domain.charAt(0).toUpperCase() + domain.slice(1),
        color: getColor(index)
      };
      return config;
    }, {});
  
    return chartConfig;
  }
  
  // Example usage
  export function generateRandomColor() {
    const hue = Math.floor(Math.random() * 360); // Random hue value between 0 and 359
    const baseSaturation = Math.floor(Math.random() * 21) + 60; // Saturation between 60% and 80%
    const baseLightness = Math.floor(Math.random() * 21) + 40; // Lightness between 40% and 60%
  
    // Generate stroke color and fill color with partial transparency
    const strokeColor = `hsl(${hue}, ${baseSaturation}%, ${baseLightness}%)`;
    const fillColor = `hsla(${hue}, ${baseSaturation - 20}%, ${baseLightness + 10}%, 0.2)`; // Alpha set to 0.5 for 50% opacity
  
    return { strokeColor, fillColor };
  }