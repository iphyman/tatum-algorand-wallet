import HighChartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { FullWidth } from "components/Styled";

interface chartConfigProps {
  data: any;
  decimals?: any;
  start?: any;
  interval?: "DAYS" | "HOURS";
  color: string;
  height?: number | string;
  currency?: string;
}

const chartConfig = ({
  data,
  decimals,
  start,
  interval,
  color,
  height,
  currency,
}: chartConfigProps) => ({
  chart: {
    height: height ? height : null,
    type: "line",
    data: {
      dateFormat: "YYYY/mm/dd",
    },
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    line: {
      color: color,
      lineWidth: 3,
      pointStart: start,
      pointInterval:
        interval === "DAYS"
          ? 24 * 60 * 60 * 1000
          : interval === "HOURS"
          ? 60 * 60 * 1000
          : 15 * 60 * 1000,
      marker: {
        enabled: false,
      },
    },
  },
  series: [
    {
      data: data,
    },
  ],
  tooltip: {
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 4,
    valueDecimals: 2,
    backgroundColor: color,
    shadow: false,
    padding: 8,
    style: {
      color: "white",
    },
    xDateFormat: "%b %d, %Y",
    useHTML: true,
    pointFormatter: function (): string {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        // @ts-ignore
      }).format(this.y);
    },
  },
  title: {
    text: null,
  },
  yAxis: {
    visible: false,
  },
  xAxis: {
    visible: false,
    minPadding: 0,
    maxPadding: 0,
    type: "datetime",
    gridLineColor: "transparent",
  },
});

export function SparklineChart({
  data,
  decimals,
  start,
  interval,
  color,
  height,
}: chartConfigProps) {
  return (
    <FullWidth>
      <HighChartsReact
        highcharts={Highcharts}
        options={chartConfig({
          decimals,
          start,
          interval,
          color,
          height,
          data,
        })}
      />
    </FullWidth>
  );
}
