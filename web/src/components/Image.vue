<template>
  <figure
    role="presentation"
    ref="root"
    v-observe="setSrcset"
    class
    :class="loaded ? 'loaded' : false"
  >
    <img
      :class="classList"
      :src="getImgBySize(20)"
      :sizes="asset.sizes"
      loading="lazy"
      :srcset="getSrcset"
      :alt="asset.alt"
    />
  </figure>
</template>
<script>
import { ref, computed } from 'vue';

const defaultAsset = {
  src: 'action-photo.jpg',
  alt: 'img',
  caption: 'caption',
};

export default {
  name: 'Image',
  props: {
    asset: {
      type: Object,
      default: () => defaultAsset,
    },
    srcset: {
      type: Array,
      default: () => [375, 650, 900, 1500, 2020, 2740, 3840],
    },
    sizes: {
      type: String,
      default: '(max-width: 3108px) 100vw, 3108px',
    },
    classList: {
      type: String,
      default: 'img--lazy',
    },
  },
  setup(props) {
    const root = ref(null);
    const loaded = ref(false);

    const getImgBySize = computed(
      () => (width) =>
        // eslint-disable-next-line
        `https://res.cloudinary.com/pots/image/upload/w_${width}/e_blur:80/${props.asset.src}`,
    );
    const getSrcset = computed(() => {
      if (loaded.value && props.asset.src) {
        const srcsetSizes = props.srcset.map(
          (width) =>
            // eslint-disable-next-line
            `https://res.cloudinary.com/pots/image/upload/w_${width}/${props.asset.src} ${width}w`,
        );
        return srcsetSizes.join(',');
      }
      return '';
    });
    const setSrcset = () => {
      loaded.value = true;
    };

    // eslint-disable-next-line
    return { root, getSrcset, getImgBySize, setSrcset, loaded };
  },
};
</script>
<style lang="scss" scoped>
figure {
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: var(--figure-height, 100vh);

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    filter: blur(36px);
    transition: all 0.5s ease-in;
  }
}
.loaded img {
  filter: none;
}
</style>
