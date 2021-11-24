<template>
  <li class="dropped-item">
    <img :src="previewImage" alt="preview uploaded image" style="grid-area: image" />
    <div class="form-group" style="grid-area: title">
      <label for="title">Title</label>
      <input
        id="title"
        class="form-input"
        type="text"
        name="title"
        placeholder="Title"
        v-model="upload.title"
      />
      <!-- <small class="helper">this will be the caption of your picture</small> -->
    </div>

    <div class="form-group" style="grid-area: description">
      <label for="description">Description</label>
      <textarea
        id="description"
        class="form-text-area"
        name="description"
        rows="4"
        v-model="upload.description"
      ></textarea>
      <!-- <small class="helper">this will appear below your picture</small> -->
    </div>
    <!-- <div class="form-group" style="grid-area: tags">
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
    </div> -->
    <small class="meta" style="grid-area: filename"
      >uploaded file: {{ file.name }}<button @click="onDelete">delete</button></small
    >
  </li>
</template>
<script>
import { ref, reactive } from 'vue';

export default {
  props: {
    file: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['deleteFile'],
  setup(props, { emit }) {
    const previewImage = ref(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(props.file);

    const upload = reactive({
      file: props.file,
      title: null,
      description: null,
    });

    const onDelete = () => {
      emit('deleteFile', props.file);
    };

    return { previewImage, upload, onDelete };
  },
};
</script>

<style lang="scss" scoped>
.dropped-item {
  display: grid;
  grid-template-columns: auto repeat(3, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
  grid-template-rows: auto;
  grid-template-areas:
    'image'
    'filename'
    'title'
    'description'
    'tags';
  border: 1px solid green;
  padding: 1rem;
  margin-bottom: 1rem;

  img {
    max-width: 100%;
  }

  @media screen and (min-width: 576px) {
    img {
      max-width: 128px;
    }
    grid-template-areas:
      'image filename filename filename'
      'image title title title'
      'description description description description'
      'tags tags tags tags';
  }
}
.meta {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: rgba(grey, 0.2);
}
button {
  margin-left: 1rem;
}
</style>
