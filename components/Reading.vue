<template>
  <Now title="reading" description="Recommended readings" :summary="summary">
    <div class="reading-wrapper">
      <div class="marquee-wrapper">
        <div class="reading-image marquee-item" v-for="block in data">
          <img :src="block.image" width="300" height="300" />
        </div>
      </div>
    </div>
  </Now>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/get-arena-blocks");

const summary = computed(() => {
  return `${data?.value.length} blocks`;
});
</script>
<style scoped lang="scss">
.reading-wrapper {
  overflow: hidden;
  width: 150px;
}
.marquee-wrapper {
  display: flex;
  gap: var(--space-xs);
}
.marquee-item {
  width: 150px;
  flex-shrink: 0;
  margin: 0;
  white-space: nowrap;
  animation: marqueeLine 10s alternate-reverse infinite;
}
.reading-image {
  width: 100%;

  img {
    aspect-ratio: 1 / 1;
    max-inline-size: 100%;
    block-size: auto;
  }
}

@keyframes marqueeLine {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}
</style>
