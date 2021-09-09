<template>
<div>
  <div>请选择你最喜欢的水果</div>
  <div>
    <button v-for="(fruit, idx) in fruits" :key="fruit" @click="handleSelect(idx)">
      {{ fruit }}
    </button>
  </div>
  <div ref="selectRef">你最喜欢的是【{{ select }}】</div>
</div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted, getCurrentInstance, ref, watch } from 'vue'
import {mokeGet} from "../api/index.js"
export default {
  name: 'Home',
  setup() {
    const selectRef=ref(null)
    const data=reactive({
      fruits:ref(["芒果","苹果","橘子","菠萝"]),
      select:ref(""),
      handleSelect(idx){
        data.select=data.fruits[idx];
      },   
    });
    watch(
      () => data.select,
      (val,preVal)=>{
        console.log(selectRef.value);
        console.log(val, preVal);
      }
    )
    mokeGet().then(res=>{
      console.log(res)
    })
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    return {
      ...toRefs(data),
    }
  },
}

</script>
<style scoped lang='scss'>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>