<template>
  <div class="masonry" ref="root">
    <div class="masonry-item" v-for="resource in cloudinaryImages" :key="resource.src">
      <LazyImage :resource="resource" :ref="setRef" />
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
import { ref, computed, onMounted, onUnmounted, onUpdated, onBeforeUpdate, nextTick } from 'vue';
import LazyImage from './LazyImage.vue';

export default {
  name: 'ImageGallery',
  components: { LazyImage },

  setup() {
    const root = ref(null);
    const gridTiles = ref([]);
    const setRef = (el) => {
      if (el) gridTiles.value.push(el);
    };

    const cloudinaryImages = ref([]);

    const styles = computed(() => getComputedStyle(root.value));

    const row = computed(() => {
      const gap = parseInt(styles.value.getPropertyValue('--grid-gap'), 10);
      const height = parseInt(styles.value.getPropertyValue('--grid-row-height'), 10);
      return { gap, height };
    });

    const resizeTiles = () => {
      gridTiles.value.forEach((tile) => {
        const tileHeight = tile.$el.getBoundingClientRect().height;
        const span = Math.ceil((tileHeight + row.value.gap) / (row.value.height + row.value.gap));
        const parent = tile.$el.closest('.masonry-item');
        // eslint-disable-next-line
        parent.style.setProperty('--grid-row-end', span);
      });
    };
    onMounted(() => {
      console.log('mount');
      fetch('/api/resources')
        .then((response) => response.json())
        .then((data) => {
          // eslint-disable-next-line
          const resources = data.resources.map((reSrc) => {
            return {
              src: reSrc.public_id,
              format: reSrc.format,
              width: reSrc.width,
              height: reSrc.height,
              ratio: Math.round(100 - (reSrc.width / reSrc.height) * 100),
              caption: reSrc.context?.custom?.caption,
              alt: reSrc.context?.custom?.alt,
              tags: reSrc.tags, // Array
            };
          });
          cloudinaryImages.value = resources;
        });
    });
    onUpdated(async () => {
      await nextTick();
      resizeTiles();
      window.addEventListener('resize', resizeTiles);
    });
    onBeforeUpdate(() => {
      gridTiles.value = [];
    });
    onUnmounted(() => {
      window.removeEventListener('resize', resizeTiles);
    });

    return { root, cloudinaryImages, setRef };
  },
};
</script>
<style lang="scss">
.masonry {
  --grid-gap: 10px;
  --grid-row-height: 20px;
  display: grid;
  grid-gap: var(--grid-gap);
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: var(--grid-row-height);
  padding: 2rem;
  background-color: rgba(grey, 0.2);
}
.masonry-item {
  grid-row-end: span var(--grid-row-end, 8);
}
</style>
