// api key graph 
import Selection from "@/app/(private)/components/graph-timeline";
import Chart from "@/components/charts";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomEffect } from "@/hooks";
import { generateChartConfig, generateRandomColor, TimelineType } from "@/lib/api-calls/domains";
import React from "react";

const APIKeyGraph = () => {
    const [data, setData] = React.useState<any>([]);
    const [config, setConfig] = React.useState<any>();
    const [labels, setLabels] = React.useState<any>();

    const [loading, setLoading] = React.useState<boolean>(true);
    const [mounted, setMounted] = React.useState<boolean>(false);
  
    const [timeline, setTimeline] = React.useState<TimelineType>("365d");

    React.useEffect(() => setMounted(true), []);

    const fetchAPIGraph = async () => {
        if (!mounted) return;
        setLoading(true); 

        let config = generateChartConfig(["sent"]); 
        let { fillColor } = generateRandomColor(); 

        setConfig(config); 
        let lines = [
            {dataKey: "sent", fill: "hsl(var(--chart-1))"}
        ];
        setLabels(lines)

        setData(dummy_data)
        setLoading(false); 
    }

    useCustomEffect(fetchAPIGraph, [mounted])
    return (
        <>
            {loading && <Skeleton className="h-[52vh] w-full my-3"/>}
            {
                !loading && (
                    <Chart 
                        headerComponent={
                            <Selection 
                                timeline={timeline}
                                setTimeline={setTimeline}
                            />
                        }
                        lines={labels}
                        type="line"
                        subtitle="An overview of the total emails sent via our api - They can be transactional or marketing emails."
                        title="Emails sent via API"
                        data={data}
                        chartConfig={config}
                        height="h-[40vh]"
                        xAxis={{dataKey: "date"}}
                    />
                )
            }
        </>
    )
};

export default APIKeyGraph; 

// dummy data
const dummy_data = [
    { date: "2024-04-01", sent: 222, mobile: 150 },
    { date: "2024-04-02", sent: 97, mobile: 180 },
    { date: "2024-04-03", sent: 167, mobile: 120 },
    { date: "2024-04-04", sent: 242, mobile: 260 },
    { date: "2024-04-05", sent: 373, mobile: 290 },
    { date: "2024-04-06", sent: 301, mobile: 340 },
    { date: "2024-04-07", sent: 245, mobile: 180 },
    { date: "2024-04-08", sent: 409, mobile: 320 },
    { date: "2024-04-09", sent: 59, mobile: 110 },
    { date: "2024-04-10", sent: 261, mobile: 190 },
    { date: "2024-04-11", sent: 327, mobile: 350 },
    { date: "2024-04-12", sent: 292, mobile: 210 },
    { date: "2024-04-13", sent: 342, mobile: 380 },
    { date: "2024-04-14", sent: 137, mobile: 220 },
    { date: "2024-04-15", sent: 120, mobile: 170 },
    { date: "2024-04-16", sent: 138, mobile: 190 },
    { date: "2024-04-17", sent: 446, mobile: 360 },
    { date: "2024-04-18", sent: 364, mobile: 410 },
    { date: "2024-04-19", sent: 243, mobile: 180 },
    { date: "2024-04-20", sent: 89, mobile: 150 },
    { date: "2024-04-21", sent: 137, mobile: 200 },
    { date: "2024-04-22", sent: 224, mobile: 170 },
    { date: "2024-04-23", sent: 138, mobile: 230 },
    { date: "2024-04-24", sent: 387, mobile: 290 },
    { date: "2024-04-25", sent: 215, mobile: 250 },
    { date: "2024-04-26", sent: 75, mobile: 130 },
    { date: "2024-04-27", sent: 383, mobile: 420 },
    { date: "2024-04-28", sent: 122, mobile: 180 },
    { date: "2024-04-29", sent: 315, mobile: 240 },
    { date: "2024-04-30", sent: 454, mobile: 380 },
    { date: "2024-05-01", sent: 165, mobile: 220 },
    { date: "2024-05-02", sent: 293, mobile: 310 },
    { date: "2024-05-03", sent: 247, mobile: 190 },
    { date: "2024-05-04", sent: 385, mobile: 420 },
    { date: "2024-05-05", sent: 481, mobile: 390 },
    { date: "2024-05-06", sent: 498, mobile: 520 },
    { date: "2024-05-07", sent: 388, mobile: 300 },
    { date: "2024-05-08", sent: 149, mobile: 210 },
    { date: "2024-05-09", sent: 227, mobile: 180 },
    { date: "2024-05-10", sent: 293, mobile: 330 },
    { date: "2024-05-11", sent: 335, mobile: 270 },
    { date: "2024-05-12", sent: 197, mobile: 240 },
    { date: "2024-05-13", sent: 197, mobile: 160 },
    { date: "2024-05-14", sent: 448, mobile: 490 },
    { date: "2024-05-15", sent: 473, mobile: 380 },
    { date: "2024-05-16", sent: 338, mobile: 400 },
    { date: "2024-05-17", sent: 499, mobile: 420 },
    { date: "2024-05-18", sent: 315, mobile: 350 },
    { date: "2024-05-19", sent: 235, mobile: 180 },
    { date: "2024-05-20", sent: 177, mobile: 230 },
    { date: "2024-05-21", sent: 82, mobile: 140 },
    { date: "2024-05-22", sent: 81, mobile: 120 },
    { date: "2024-05-23", sent: 252, mobile: 290 },
    { date: "2024-05-24", sent: 294, mobile: 220 },
    { date: "2024-05-25", sent: 201, mobile: 250 },
    { date: "2024-05-26", sent: 213, mobile: 170 },
    { date: "2024-05-27", sent: 420, mobile: 460 },
    { date: "2024-05-28", sent: 233, mobile: 190 },
    { date: "2024-05-29", sent: 78, mobile: 130 },
    { date: "2024-05-30", sent: 340, mobile: 280 },
    { date: "2024-05-31", sent: 178, mobile: 230 },
    { date: "2024-06-01", sent: 178, mobile: 200 },
    { date: "2024-06-02", sent: 470, mobile: 410 },
    { date: "2024-06-03", sent: 103, mobile: 160 },
    { date: "2024-06-04", sent: 439, mobile: 380 },
    { date: "2024-06-05", sent: 88, mobile: 140 },
    { date: "2024-06-06", sent: 294, mobile: 250 },
    { date: "2024-06-07", sent: 323, mobile: 370 },
    { date: "2024-06-08", sent: 385, mobile: 320 },
    { date: "2024-06-09", sent: 438, mobile: 480 },
    { date: "2024-06-10", sent: 155, mobile: 200 },
    { date: "2024-06-11", sent: 92, mobile: 150 },
    { date: "2024-06-12", sent: 492, mobile: 420 },
    { date: "2024-06-13", sent: 81, mobile: 130 },
    { date: "2024-06-14", sent: 426, mobile: 380 },
    { date: "2024-06-15", sent: 307, mobile: 350 },
    { date: "2024-06-16", sent: 371, mobile: 310 },
    { date: "2024-06-17", sent: 475, mobile: 520 },
    { date: "2024-06-18", sent: 107, mobile: 170 },
    { date: "2024-06-19", sent: 341, mobile: 290 },
    { date: "2024-06-20", sent: 408, mobile: 450 },
    { date: "2024-06-21", sent: 169, mobile: 210 },
    { date: "2024-06-22", sent: 317, mobile: 270 },
    { date: "2024-06-23", sent: 480, mobile: 530 },
    { date: "2024-06-24", sent: 132, mobile: 180 },
    { date: "2024-06-25", sent: 141, mobile: 190 },
    { date: "2024-06-26", sent: 434, mobile: 380 },
    { date: "2024-06-27", sent: 448, mobile: 490 },
    { date: "2024-06-28", sent: 149, mobile: 200 },
    { date: "2024-06-29", sent: 103, mobile: 160 },
    { date: "2024-06-30", sent: 446, mobile: 400 },
  ]