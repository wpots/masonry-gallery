<template>
  <div class="drop-zone" ref="root" @dragover.prevent="dragOverHandler" @drop.prevent="dropHandler">
    <p>drag and drop a file or ...</p>
    <input type="file" @change="inputHandler" />
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const dropHandler = (ev) => {
      const file = ev.dataTransfer.items;
      console.log('File(s) dropped', file);
    };
    const inputHandler = () => {};

    const dragOverHandler = (ev) => {
      console.log('dragging', ev);
    };
    const root = ref(null);
    // eslint-disable-next-line
    return { root, dropHandler, dragOverHandler, inputHandler };
  },
};
</script>
<style lang="scss" scoped>
.drop-zone {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
  margin: auto;
  border: 3px dashed grey;
}
</style>
