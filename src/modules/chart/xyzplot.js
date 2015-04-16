define(function (require) {
  var d3 = require("d3");
  var graphFunc = require("src/modules/component/chart/chart");

  return function xzyPlot() {
    var margin = {top: 20, right: 20, bottom: 20, left: 50};
    var width = 760 - margin.left - margin.right;
    var height = 120 - margin.top - margin.bottom;
    var xScale = null;
    var yScale = null;
    var zScale = null;
    var elements = null;
    var chartData = null;
    var chartTransform = null;
    var charts = null;
    var dispatch = d3.dispatch("brush", "hover", "mouseover", "mouseout");

    // Axis options
    var showXAxis = true;
    var xAxisTitle = "";
    var showYAxis = true;
    var yAxisTitle = "";
    var showZAxis = true;
    var zAxisTitle = "";

    function chart(selection) {
      selection.each(function (data) {
        var xAxis = d3.svg.axis().orient("bottom");
        var yAxis = d3.svg.axis().orient("left");
        var zAxis = d3.svg.axis().orient("right");

        var svg = d3.select(this).selectAll("svg")
          .data([data])
          .enter().append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        if (typeof elements === "function") { g.call(elements); }
        if (elements instanceof Array) {
          elements.forEach(function (shape) {
            if (typeof shape === "function") { g.call(shape); }
          });
        }

        if (typeof charts === "function") {
          g.call(graphFunc().transform(chartTransform).datum(chartData).draw(charts));
        }

        if (showXAxis) {
          g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + yScale.range()[0] + ")")
            .call(xAxis.scale(xScale))
            .append("text")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(xAxisTitle);
        }

        if (showYAxis) {
          g.append("g")
            .attr("class", "left axis")
            .call(yAxis.scale(yScale))
            .append("text")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(yAxisTitle);
        }

        if (showZAxis) {
          g.append("g")
            .attr("class", "right axis")
            .attr("transform", "translate(" + xScale.range()[1] + "," + "0)")
            .call(zAxis.scale(zScale))
            .append("text")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(zAxisTitle);
        }
      });
    }

    chart.margin = function (_) {
      if (!arguments.length) { return margin; }
      margin.top = typeof _.top !== "undefined" ? _.top : margin.top;
      margin.right = typeof _.right !== "undefined" ? _.right : margin.right;
      margin.bottom = typeof _.bottom !== "undefined" ? _.bottom : margin.bottom;
      margin.left = typeof _.left !== "undefined" ? _.left : margin.left;
      return chart;
    };

    chart.width = function (_) {
      if (!arguments.length) { return width; }
      width = _;
      return chart;
    };

    chart.height = function (_) {
      if (!arguments.length) { return height; }
      height = _;
      return chart;
    };

    chart.xScale = function (_) {
      if (!arguments.length) { return xScale; }
      xScale = _;
      return chart;
    };

    chart.yScale = function (_) {
      if (!arguments.length) { return yScale; }
      yScale = _;
      return chart;
    };

    chart.zScale = function (_) {
      if (!arguments.length) { return zScale; }
      zScale = _;
      return chart;
    };

    chart.elements = function (_) {
      if (!arguments.length) { return elements; }
      elements = _;
      return chart;
    };

    chart.charts = function (_) {
      if (!arguments.length) { return charts; }
      charts = _;
      return chart;
    };

    chart.chartData = function (_) {
      if (!arguments.length) { return chartData; }
      chartData = _;
      return chart;
    };

    chart.chartTransform = function (_) {
      if (!arguments.length) { return chartTransform; }
      chartTransform = _;
      return chart;
    };

    chart.showXAxis = function (_) {
      if (!arguments.length) { return showXAxis; }
      showXAxis = _;
      return chart;
    };

    chart.showYAxis = function (_) {
      if (!arguments.length) { return showYAxis; }
      showYAxis = _;
      return chart;
    };

    chart.showZAxis = function (_) {
      if (!arguments.length) { return showZAxis; }
      showZAxis = _;
      return chart;
    };

    chart.xAxisTitle = function (_) {
      if (!arguments.length) { return xAxisTitle; }
      xAxisTitle = _;
      return chart;
    };

    chart.yAxisTitle = function (_) {
      if (!arguments.length) { return yAxisTitle; }
      yAxisTitle = _;
      return chart;
    };

    chart.zAxisTitle = function (_) {
      if (!arguments.length) { return zAxisTitle; }
      zAxisTitle = _;
      return chart;
    };

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});