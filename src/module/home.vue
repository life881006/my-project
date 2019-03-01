<template>
  <div id="homePage">
    <div :style="{height:mainTableHeight+'px',overflow:'auto'}">
      <barChart :chartSize="chartSize" :chartData="chartData"></barChart>
      <lineChart :chartSize="chartSize"></lineChart>
      <pieChart :chartSize="chartSize"></pieChart>
    </div>
  </div>
</template>

<script>
import barChart from "@/components/echarts/barChart";
import lineChart from "@/components/echarts/lineChart";
import pieChart from "@/components/echarts/pieChart";

export default {
  name: "homePage",
  data: function() {
    return {
      mainTableHeight: this.mainContentHeight + 110,
      chartSize: {
        width: 720,
        height: 468
      },
      chartData: {
        title: "aaddddaaaddd",
        xLineNames: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        data: [5, 20, 36, 10, 10, 20]
      }
    };
  },
  props: ["mainContentHeight"],
  components: { barChart, lineChart, pieChart },
  mounted() {},
  methods: {}
};
</script>

<style type="stylesheet/stylus" lang="stylus">
</style>