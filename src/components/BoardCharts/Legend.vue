<template>
   <div class="flex-div">
        <div class="flex-cell" v-for="(legend, index) in legends" :key="index">
            <div :class="legend.shape=='power'?[legend.value,'fa','fa-power-off']:[legend.value,legend.shape]" ></div>
            <label class="flex-label">{{legend.label}}</label>
        </div>
   </div>
</template>

<script type="text/javascript">
export default {
  name: 'Legend',
  props: {
    legends: {
      type: Array,
      default: () => [
        {label: 'power', value: 'powerOn', shape: 'div-mark'},
        {label: 'available', value: 'normal', shape: 'square'},
        {label: 'unavailable', value: 'abnormal', shape: 'square'},
        {label: 'interconnected', value: 'connect', shape: 'square'}
      ]
    }
  }
}
</script>

<style scoped>
.flex-div{
    display: flex;
    flex-wrap: wrap;
}
.flex-cell{
    display: inline-flex;
}
.flex-label{
    text-align: left;
    margin-right: 5px;
    width: 75px;
}
.square{
    width: 15px;
    height: 15px;
    border-radius: 3px;
    margin: 2px 2px;
}
.div-mark{
    height: 12px;
    width: 15px;
    border-radius: 0 0px 5px 5px;
    margin: 5px 2px;
}
.powerOn{
    background:#20df20;
    border: 1px solid #009900;
}
.power{
    color:#20df20;
    padding-top: 4px;
    padding-right: 3px;
}
.abnormal{
    background:#9d9d9d;
    border: 1px solid #7b7b7b;
}
.normal{
    background:#20df20;
    border: 1px solid #009900;
}
.connect{
    background:#55C5FF;
    border: 1px solid #004B7C;
}
</style>
