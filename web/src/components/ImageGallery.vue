<template>
  <div class="masonry">
    <Image
      ref="setRef"
      v-for="(asset, index) in galleryImages"
      :asset="asset"
      :key="index + asset"
      class="masonry-item"
    />
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue';
import Image from './Image.vue';

export default {
  name: 'ImageGallery',
  components: { Image },
  setup() {
    const gridTiles = ref([]);
    const setRef = (el) => {
      if (el) gridTiles.value.push(el);
    };
    const galleryImages = ref([
      { src: 'action-photo' },
      { src: 'perception' },
      { src: 'sushi-time' },
      { src: 'time-flies' },
      { src: 'box-but-annoyed-1' },
    ]);
    const resizeTiles = () => {
      const styles = getComputedStyle(document.documentElement);
      const rowGap = styles.getPropertyValue('--grid-gap');
      const rowHeight = styles.getPropertyValue('--grid-row-height');
      gridTiles.value.forEach((tile) => {
        // eslint-disable-next-line
        const rowSpan =
          // eslint-disable-next-line
          Math.ceil(tile.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap);
        // eslint-disable-next-line
        tile.style.gridRowEnd = 'span ' + rowSpan;
      });
    };
    // const getImages = false;
    onMounted(() => {
      fetch('/.netlify/functions/resources')
        .then((response) => response.json())
        .then((data) => console.log(data));
      resizeTiles();
      window.addEventListener('resize', resizeTiles);
    });
    onUnmounted(() => {
      window.removeEventListener('resize');
    });
    return { galleryImages, setRef };
  },
};
</script>
<style lang="scss" scoped>
:root {
  --grid-gap: 10px;
  --grid-row-height: 20px;
}
.masonry {
  display: grid;
  grid-gap: var(--grid-gap);
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: var(--grid-row-height);
}
.masonry-item {
  --figure-height: 250px;
}
</style>
