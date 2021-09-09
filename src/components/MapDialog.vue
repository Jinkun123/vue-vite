<template>
  <a-modal
    :visible="visible"
    centered
    title="请选择地址"
    cancelText="取消"
    okText="确定"
    @cancel="close"
    @ok="handleOk"
  >
    <a-form class="form" layout="inline" ref="mapForm" :model="form" :rules="rules">
      <a-form-item name="address">
        <a-auto-complete
          v-model:value="form.address"
          :options="addressSource"
          placeholder="请输入你要搜索的地点"
          @search="handleQuery"
          @select="handleSelect"
          style="width: 360px"
        />
      </a-form-item>
      <a-form-item name="range">
        <a-select v-model:value="form.range" placeholder="请选择范围" @change="setRadius">
          <a-select-option v-for="range in ranges" :key="range">
            {{ range }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <div id="map"></div>
  </a-modal>
</template>

<script>
import { ref, reactive, toRefs, watch, nextTick } from "vue";
export default {
  name: "MapDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    range: {
      type: String,
      default: "300米",
    },
    point: {
      type: Object,
      default: () => ({ lng: 113.271429, lat: 23.135336 }),
    },
  },
  setup(props, { emit }) {
    const mapForm = ref(null);
    const formData = reactive({
      form: {
        address: "",
        range: props.range,
      },
      rules: {
        address: [
          {
            required: true,
            message: "请输入你要搜索的地点",
            trigger: "blur",
          },
        ],
      },
      ranges: ["100米", "300米", "500米"],
      addressPoint: props.point,
      addressSource: [],
      setRadius() {},
      handleQuery() {},
      handleSelect() {},
      close() {
        emit("update:visible", false);
        mapForm.value.resetFields();
      },
      handleOk() {
        mapForm.value.validate().then(() => {
          emit("confirm", {
            address: formData.form.address,
            point: formData.addressPoint,
            range: formData.form.range,
          });
          emit("update:visible", false);
        });
      },
    });

    const { Map, Point, Marker} = BMap;

    // 地图相关元素，因为可能在别的方法使用
    let map = null,
        marker = null;

    // 初始化地图
    function initMap() {
      // 防止dom还未渲染
      nextTick(() => {
        // 禁用地图默认点击弹框
        map = new Map("map", { enableMapClick: false });
        const { lng, lat } = formData.addressPoint;
        const point = new Point(lng, lat);
        map.centerAndZoom(point, 16);
        map.enableScrollWheelZoom();
      // });
      // 防止dom还未渲染
      // nextTick(() => {
        // ...
        // 创建一个图像标注实例，允许启用拖拽Marker
        marker = new Marker(point, { enableDragging: true });
        map.addOverlay(marker);
        // 标注拖拽
        marker.addEventListener("dragend", ({ point }) => {
          console.log(point);
        });
      });
    }
    watch(
      () => props.visible,
      (visible) => {
        visible && initMap();
      }
    );
    return {
      mapForm,
      ...toRefs(formData),
    };
  },
};
</script>

<style scoped>
#map {
  height: 400px;
}
.form {
  height: 66px;
}
</style>