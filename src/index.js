define(function (require) {
  return {
    version: "0.1.0",
    charts: {
      line: require("src/modules/charts/line"),
      area: require("src/modules/charts/area"),
      pie: require("src/modules/charts/pie"),
      scatter : require("src/modules/charts/scatterplot"),
      sunburst: require("src/modules/charts/sunburst"),
      dendrogram: require("src/modules/charts/dendrogram"),
      treemap: require("src/modules/charts/treemap"),
      histogram: require("src/modules/charts/histogram")
    },
    maps: {},
    components: {
      axis: require("src/modules/components/axis/axis"),
      clipPath: require("src/modules/components/clipPath/clipPath"),
      legend: {},
      shapes: {
        circles: require("src/modules/components/shapes/circles")
      }
    }
  };
});