<template>
  <div id="homePage">
    <div :style="{height:mainTableHeight+'px',overflow:'auto'}">
      
      <barChart :chartSize="chartSize" :chartData="chartData"></barChart>
      <lineChart :chartSize="chartSize"></lineChart>
      <pieChart :chartSize="chartSize"></pieChart>
     
      <el-button @click='changeItem'>新生报名</el-button>
      <div class='panel'></div>
      <div ref="aaa"></div>
    </div>
  </div>
</template>

<script>
import barChart from "@/components/util/echarts/barChart";
import lineChart from "@/components/util/echarts/lineChart";
import pieChart from "@/components/util/echarts/pieChart";

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
      },
      channels:[]
    };
  },
  beforeCreate(){
    
  },
  props: ["mainContentHeight"],
  components: { barChart, lineChart, pieChart },
  mounted() {
  },
  methods: {
    changeItem(){
      const newButton = new ButtonObj();
      this.$nextTick(()=>{
        this.$refs.aaa.innerHTML = newButton.name;
      });
    }
  }
};

function ButtonObj(){
  var obj = {};
  obj.name = "<el-button>新节点1</el-button>";

  return obj;
}
</script>

<style type="stylesheet/stylus" lang="stylus">
</style>