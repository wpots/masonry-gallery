<template>
  <div class="upload">
    <h1>This is an upload page</h1>

    <div class="form-group">
      <label for="title">Title</label>
      <input id="title" class="form-input" type="text" name="title" placeholder="Title" />
      <small class="helper">this will be the caption of your picture</small>
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" class="form-text-area" name="description" rows="4"></textarea>
      <small class="helper">this will appear below your picture</small>
    </div>
    <div class="form-group">
      <label for="tags">Keywords</label>
      <input
        id="tags"
        class="form-input"
        type="text"
        name="tags"
        @change="onChange"
        placeholder="e.g. handstiched"
      />
      <small class="helper">type keyword and hit enter</small>
    </div>
    <div class="form-group">
      <label for="dropzone">Image File</label>
    </div>
    <DropZone v-model="file" />
  </div>
</template>
<script>
import { ref } from 'vue';
import DropZone from '@/components/DropZone.vue';

export default {
  components: { DropZone },
  setup() {
    const tagList = ref([]);
    return { tagList };
  },
};
</script>
<style lang="scss" scoped>
.upload {
  padding: 2rem;
}
.form-group {
  min-width: 320px;
  max-width: 100%;
  margin-bottom: 1rem;
  margin-right: auto;
  margin-left: auto;
  text-align: left;

  @media only screen and (min-width: 768px) {
    max-width: 700px;
  }

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
