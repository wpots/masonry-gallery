<template>
  <div class="upload">
    <h1>This is an upload page</h1>
    <div class="form-group">
      <label for="dropzone">Upload file(s)</label>
    </div>
    <DropZone @filesDropped="onFilesDropped" />
    <DroppedList :items="files" />
    <button v-if="files" @click="onSubmit">submit</button>
  </div>
</template>
<script>
import { ref } from 'vue';
import DropZone from '@/components/DropZone.vue';
import DroppedList from '@/components/DroppedList.vue';

export default {
  components: { DropZone, DroppedList },
  setup() {
    const tagList = ref(null);
    const files = ref(null);
    const onFilesDropped = (e) => {
      files.value = e;
    };
    const onSubmit = () => {};
    // eslint-disable-next-line
    return { tagList, onFilesDropped, files, onSubmit };
  },
};
</script>
<style lang="scss">
.upload {
  padding: 2rem;
}
.form-group {
  width: 100%;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
  text-align: left;

  .helper {
    display: block;
    font-style: italic;
    text-align: right;
  }
}

.form-input {
  width: 100%;
  height: 2rem;
}
.form-text-area {
  width: 100%;
}
</style>
