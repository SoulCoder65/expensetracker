import React, { useContext } from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { ExpenseTrackerContext } from "../../../Context/context";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import UmberTheme from "fusioncharts/themes/fusioncharts.theme.umber";
import ReactFC from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts, CandyTheme);
ReactFC.fcRoot(FusionCharts, CandyTheme, UmberTheme);

// finding total of categories
var total = 0;
const ChartTemplate = ({ category, title }) => {
  const { reduceData } = useContext(ExpenseTrackerContext);
  let filterData = category.reduce((filtered, data) => {
    if (reduceData[data.value]) {
      filtered.push(reduceData[data.value]);
    }
    return filtered;
  }, []);
  filterData.map((data) => {
    total += Number(data.value);
  });
  console.log(total);
  // Chart data
  const dataSource = {
    chart: {
      caption: title,
      subCaption: `₹${total}`,
      plottooltext: "<b>$percentValue</b>  $label ",
      showlegend: "1",
      showpercentvalues: "0",
      showPercentInToolTip: "0",
      legendposition: "top",
      usedataplotcolorforlabels: "1",
      theme: "candy",
    },
    data: filterData,
  };

  return (
    <ReactFusioncharts
      type="pie2d"
      width="100%"
      height="60%"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default ChartTemplate;
