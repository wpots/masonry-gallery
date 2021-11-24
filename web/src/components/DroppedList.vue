<template>
  <div class="dropped-list">
    <h2 v-if="items">Review your selected files</h2>
    <transition-group tag="ul">
      <DroppedItem
        v-for="(item, index) in items"
        :key="index"
        :file="item"
        @onDelete="onItemDelete"
      />
    </transition-group>
  </div>
</template>
<script>
import { ref } from 'vue';
import DroppedItem from '@/components/DroppedItem.vue';

export default {
  components: { DroppedItem },
  props: {
    items: {
      type: Array,
      default: null,
    },
  },
  setup(props) {
    const displayList = ref(props.items);
    const onItemDelete = (file) => {
      console.log(file);
      const elementIndex = displayList.value.findIndex(file);
      displayList.value.splice(elementIndex, 1);
    };

    return { displayList, onItemDelete };
  },
};
</script>
<style lang="scss" scoped>
ul {
  padding: 0;
}
</style>
