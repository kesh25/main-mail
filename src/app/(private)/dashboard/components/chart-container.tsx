"use client"; 
import React from "react"; 

import Chart from "@/components/charts";
import Selection from "../../components/graph-timeline"; 
import { Skeleton } from "@/components/ui/skeleton";


import {generateChartConfig, getDashboardGraphs, TimelineType, generateRandomColor} from "@/lib/api-calls/domains"; 
import { useCustomEffect, useSearch } from "@/hooks";


const ChartContainer = () => {
    const [data, setData] = React.useState<any>([]); 
    const [config, setConfig] = React.useState<any>();
    const [labels, setLabels] = React.useState<any>();

    const [loading, setLoading] = React.useState<boolean>(true); 
    const [mounted, setMounted] = React.useState<boolean>(false); 

    const searchParams = useSearch(); 

    const [timeline, setTimeline] = React.useState<TimelineType>("365d"); 

    React.useEffect(() => setMounted(true), []);

    const fetchGraphData = async () => {
      if (!mounted) return; 
      setLoading(true); 
      let res = await getDashboardGraphs(timeline);
      if (res) {
        setData(res);
        let domains: string[] = Object.keys(res[0]).filter(itm => itm !== "date");
        let config = generateChartConfig(domains);
        let lbls = domains.map(itm => {
          let { strokeColor, fillColor } = generateRandomColor();
          
          return (
            {
              dataKey: itm, 
              fill: fillColor, 
              stroke: strokeColor
            }
        )});
        setLabels(lbls)
        setConfig(config)
      };

      setLoading(false)
    };

    useCustomEffect(fetchGraphData, [timeline, mounted])
    return (
      <>
        {
          !loading && (
              <Chart 
                  headerComponent={
                    <Selection 
                      timeline={timeline}
                      setTimeline={setTimeline}
                    />
                  }
                  type="area"
                  title="Overview"
                  height="h-[40vh]"
                  subtitle="Total emails sent and received per domain"
                  data={data}
                  labels={labels}
                  chartConfig={config}
              />

          )
        }
        {
          loading && (
            <Skeleton className="h-[52vh] w-full my-3"/>
          )
        }

      </>
    )
};

export default ChartContainer; 