
"use client";
import React from "react";
import Chart from "@/components/charts";

import Selection from "../../../components/graph-timeline"; 
import { Skeleton } from "@/components/ui/skeleton";

import { generateChartConfig, getDomainGraphs, TimelineType, generateRandomColor } from "@/lib/api-calls/domains";

import { useCustomEffect, useSearch } from "@/hooks";


const ChartContainer = ({ domainId }: { domainId: string }) => {
  const [data, setData] = React.useState<any>([]);
  const [config, setConfig] = React.useState<any>();
  const [labels, setLabels] = React.useState<any>();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [mounted, setMounted] = React.useState<boolean>(false);

  const searchParams = useSearch();
  const tab = searchParams?.get("tab");

  const [timeline, setTimeline] = React.useState<TimelineType>("365d");

  React.useEffect(() => setMounted(true), []);

  const fetchGraphData = async () => {
    if (!mounted || tab) return;
    setLoading(true);

    let res = await getDomainGraphs(domainId, timeline);
    if (res) {
      setData(res);
      console.log(res)
      let keys: string[] = ["sent", "received"];
      let config = generateChartConfig(keys);
      let lbls = keys.map(itm => {
        let { strokeColor, fillColor } = generateRandomColor();

        return (
          {
            dataKey: itm,
            fill: fillColor,
            stroke: strokeColor
          }
        )
      });

      setLabels(lbls);
      setConfig(config);
    };

    setLoading(false);
  }
  useCustomEffect(fetchGraphData, [tab, timeline, mounted])
  return (
    <>
      {
        !tab && (
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
                  subtitle="Emails sent and received for the domain"
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
      }
    </>
  )
};

export default ChartContainer;

