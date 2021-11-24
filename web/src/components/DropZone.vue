<template>
  <div
    class="drop-zone"
    :class="classList"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="dropHandler"
  >
    <input
      id="file-input"
      hidden
      type="file"
      multiple
      accept="image/*"
      @change="inputHandler"
      ref="fileInputFiles"
    />
    <label for="file-input">
      drag and drop image(s) or <span class="pseudo-button">select</span> from your computer.
    </label>
  </div>
</template>
<script>
import { ref, reactive, computed } from 'vue';

export default {
  emits: ['filesDropped'],
  setup(props, { emit }) {
    // data
    const files = ref([]);
    const state = reactive({
      dragging: false,
    });

    // event handlers
    const onDragOver = () => {
      if (!state.dragging) state.dragging = true;
    };
    const onDragLeave = () => {
      state.dragging = false;
    };
    const onFilesDropped = () => {
      emit('filesDropped', files.value);
    };

    // action handlers
    const dropHandler = (e) => {
      files.value.push(...e.dataTransfer.files);
      console.log('File(s) dropped', e.dataTransfer);
      state.dragging = false;
      onFilesDropped();
    };
    const inputHandler = (e) => {
      files.value.push(...e.target.files);
      console.log('File(s) added', files.value);
      onFilesDropped();
    };

    const classList = computed(() => (state.dragging ? 'dragging' : ''));

    // eslint-disable-next-line
    return { classList, dropHandler, onDragOver, onDragLeave, inputHandler };
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

  &.dragging {
    border-color: blue;
    background-color: rgba(blue, 0.3);
  }
}

.pseudo-button {
  padding: 0.25rem 0.5rem;
  margin: 0 0.25rem;
  border: 2px solid indigo;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    color: white;
    background-color: indigo;
  }
}
</style>
