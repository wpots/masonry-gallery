<template>
  <div class="dropped-list">
    <h2 v-if="items.length > 0">Review your selected files</h2>
    <transition-group name="list" tag="ul">
      <DroppedItem
        v-for="item in items"
        :key="item.name"
        :file="item"
        @fileUpdated="onFileUpdated"
      />
    </transition-group>
  </div>
</template>
<script>
import { ref } from 'vue';
import DroppedItem from '@/components/DroppedItem.vue';

export default {
  emits: ['listUpdated'],
  components: { DroppedItem },
  props: {
    items: {
      type: Array,
      default: null,
    },
  },
  setup(props, { emit }) {
    const displayList = ref(props.items);
    const onFileUpdated = (e) => {
      emit('listUpdated', e);
    };

    return { displayList, onFileUpdated };
  },
};
</script>
<style lang="scss" scoped>
ul {
  padding: 0;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
