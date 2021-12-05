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
        v-model="caption"
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
        v-model="alt"
      ></textarea>
      <!-- <small class="helper">this will appear below your picture</small> -->
    </div>
    <div class="form-group" style="grid-area: tags">
      <label for="tags">Keywords</label>
      <input
        id="tags"
        class="form-input"
        type="text"
        name="tags"
        v-model="tags"
        placeholder="e.g. handstiched, walldecoration"
      />
      <small class="helper">comma separated list of tags</small>
    </div>
    <small class="meta" style="grid-area: filename"
      >uploaded file: {{ file.name }}<button @click="onDelete">delete</button></small
    >
    <button @click="onSubmit">submit</button>
  </li>
</template>
<script>
import { ref } from 'vue';

export default {
  props: {
    file: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['fileUpdated'],
  setup(props, { emit }) {
    const previewImage = ref(null);
    const caption = ref(null);
    const alt = ref(null);
    const tags = ref([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('loaded', typeof e.target.result);
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(props.file);
    const onDelete = () => {
      emit('fileUpdated', props.file);
    };
    // eslint-disable-next-line
    const onSubmit = () => {

      const data = new FormData();
      data.append('file', props.file);
      data.append('caption', caption.value);
      data.append('alt', alt.value);
      data.append('tags', tags.value);
      console.log(data);
      // eslint-disable-next-line
      return fetch('/api/uploader', {
        method: 'POST',
        // body: JSON.stringify(dataObject),
        body: data,
      }).then((res) => {
        console.log('response', res);
      });
    };
    // eslint-disable-next-line
    return { previewImage, caption, alt, tags, onDelete, onSubmit };
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
