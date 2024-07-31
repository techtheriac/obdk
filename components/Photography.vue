<template>
  <Now title="shots" description="Photography" :summary="summary">
    <div class="reading-wrapper">
      <div class="marquee-wrapper">
        <div class="reading-image marquee-item" v-for="photo in photos">
          <FluidImage
            :src="photo.preview"
            :intrinsicWidth="photo.previewWidth"
            :intrinsicHeight="photo.previewHeight"
            :scaleSize="15"
            :alt="photo.title!"
            mediaType="image"
          />
        </div>
      </div>
    </div>
  </Now>
</template>

<script setup lang="ts">
const photos = await queryContent("artefacts").where({ type: "photo" }).find();

const summary = computed(() => `${photos.length} photos`);
</script>
<style scoped lang="scss">
.reading-wrapper {
  overflow: hidden;
  width: 150px;
  align-self: center;
}
.marquee-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}
.marquee-item {
  height: 150px;
  width: fit-content;
  flex-shrink: 0;
  margin: 0;
  white-space: nowrap;
  animation: marqueeLine 8s alternate-reverse infinite;
}
.reading-image {
  img {
    aspect-ratio: 1 / 1;
    max-inline-size: 100%;
    block-size: auto;
  }
}

@keyframes marqueeLine {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}
</style>
