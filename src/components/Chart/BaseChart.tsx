import { rgba } from "polished";
import { FullWidth } from "components/Styled";
import HighChartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

interface chartConfigProps {
  data: any;
  decimals?: any;
  start?: any;
  interval?: "DAYS" | "HOURS";
  color: string;
  height: number;
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
    height: height,
    backgroundColor: "transparent",
    type: "area",
    spacing: [25, 0, 0, 0],
  },
  data: {
    dateFormat: "YYYY/mm/dd",
  },
  title: {
    text: null,
  },
  xAxis: {
    title: {
      text: null,
    },
    visible: false,
    minPadding: 0,
    maxPadding: 0,
    gridLineColor: "transparent",
    type: "datetime",
  },
  yAxis: {
    visible: false,
    minPadding: 0,
    maxPadding: 0,
    gridLineColor: "transparent",
  },
  plotOptions: {
    series: {
      pointStart: start,
      pointInterval:
        interval === "DAYS"
          ? 24 * 60 * 60 * 1000
          : interval === "HOURS"
          ? 60 * 60 * 1000
          : 15 * 60 * 1000,
      animation: false,
    },
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, rgba(color, 0.7)],
          [1, rgba(color, 0.1)],
        ],
      },
      marker: {
        radius: 0,
      },
      lineWidth: 2,
      color: color,
      states: {
        hover: {
          lineWidth: 2,
        },
      },
      threshold: null,
      dataGrouping: { enabled: true },
    },
    line: {
      marker: {
        enabled: false,
      },
    },
  },
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
    pointFormatter: function(): string {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        // @ts-ignore
      }).format(this.y);
    },
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: "Price",
      data: data,
    },
  ],
});

export const BaseChart = ({
  data,
  decimals,
  start,
  interval,
  color,
  height,
}: chartConfigProps) => {
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
};
