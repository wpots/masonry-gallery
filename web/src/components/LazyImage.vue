<template>
  <div class="image-tile">
    <figure
      role="presentation"
      ref="root"
      v-observe="setSrcset"
      class
      :class="loaded ? 'loaded' : false"
      :style="styleObject"
    >
      <img
        :class="classList"
        :src="getImgBySize(20)"
        :sizes="resource.sizes"
        loading="lazy"
        :srcset="getSrcset"
        :alt="resource.alt || resource.src"
      />
    </figure>
    <div class="image-caption" v-if="resource.alt">
      <h3>{{ resource.caption }}</h3>
      <p>{{ resource.alt }}</p>
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue';

const defaultResource = {
  src: 'perception',
  format: 'jpg',
  width: 1024,
  ratio: Math.round(100 - (1024 / 768) * 100),
  caption: 'Purrrception',
  alt: 'Cat looking very unamused while sitting out a hugging session with greatest fan',
  tags: ['hugging', 'grumpy'], // Array
};

export default {
  name: 'LazyImage',
  props: {
    resource: {
      type: Object,
      default: () => defaultResource,
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
    const baseUrl = 'https://res.cloudinary.com/pots/image/upload/';

    const getImgBySize = computed(
      () => (width) =>
        // eslint-disable-next-line
        `${baseUrl}w_${width}/e_blur:80/${props.resource.src}.${props.resource.format}`,
    );
    const getSrcset = computed(() => {
      if (loaded.value && props.resource.src) {
        const srcsetSizes = props.srcset.map(
          (width) =>
            // eslint-disable-next-line
            `${baseUrl}w_${width}/${props.resource.src}.${props.resource.format} ${width}w`,
        );
        return srcsetSizes.join(',');
      }
      return '';
    });
    const setSrcset = () => {
      loaded.value = true;
    };
    const styleObject = computed(() => {
      if (root.value) {
        const imageWidth = root.value.getBoundingClientRect().width;
        const heightinRatio = (imageWidth / props.resource.width) * props.resource.height;
        const height = `${heightinRatio}px`;
        return { height };
      }
      return false;
    });

    // eslint-disable-next-line
    return { root, getSrcset, getImgBySize, setSrcset, loaded, styleObject };
  },
};
</script>
<style lang="scss" scoped>
.image-tile {
  margin-bottom: 1rem;
  // grid-row-end: span 16;
}

.image-caption {
  background-color: white;
  padding: 1rem;
  h3 {
    margin: 0;
  }
}

figure {
  position: relative;
  margin: 0;
  overflow: hidden;
  width: 100%;

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
