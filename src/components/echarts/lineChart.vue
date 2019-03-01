<template>
  <div>
    <!--折线图-->
    <div id="lineChart" :style="{'width':chartWidth,'height':chartHeight}"></div>
  </div>
</template>

<script>
//import * as echarts from 'echarts';
let echarts = require("echarts");

require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "lineChart",
  data: function() {
    return {
      chartWidth: this.chartSize.width + "px",
      chartHeight: this.chartSize.height + "px"
    };
  },
  props: ["chartSize"],
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      this.setLineOptions();
    },
    setLineOptions() {
      echarts.init(document.getElementById("lineChart")).setOption({
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          axisLabel: {
            interval: 0,
            rotate: 45
          }
        },

        yAxis: {},
        series: [
          {
            type: "line",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  }
};
</script>

<style type="stylesheet/stylus" lang="stylus">
#lineChart {
  width: 350px;
  height: 250px;
  margin-left: 20px;
}
</style>