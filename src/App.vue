<script setup>

</script>
<template>
  您选择的位置是：{{ place.address }}
  <a-button @click="toggleVisible">选择位置</a-button>
  <map-dialog v-model:visible="visible" :point="place.point" :range="place.range" @confirm="handleConfirm" />
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <div class="nav-btn">
    <router-link to='/'> Home</router-link>
    <router-link to='/contact'>Contact </router-link>
  </div>
  <router-view></router-view> -->
  <div>
  <el-select v-model="value1" multiple placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

  <el-select
    v-model="value2"
    multiple
    collapse-tags
    style="margin-left: 20px;"
    placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      <div>
    <el-button @click="add($event,0)">111111111</el-button>
    <el-button @click="add($event,1)">111111111</el-button>
  </div>
  </el-select>


</div>


</template>


<script>
import {reactive,toRefs} from 'vue'
import MapDialog from './components/MapDialog.vue'
export default {
  name:"App",
  components:{
    MapDialog,
  },
  setup(props) {
    const data=reactive({



        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1: [],
        value2: [],
      place:{},
      visible:false,
      toggleVisible(){
        data.visible=!data.visible;
      },
      handleConfirm(place){
        data.place=place;
      },
      add(e,val){
        console.log(e,val)
      }
    })
    return{
      ...toRefs(data)
    };
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
