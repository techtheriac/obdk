<template>
  <div class="spotify">
    <Rounded />
    <div class="track-info">
      <a :href="data?.url" target="_blank"
        >NP: {{ data?.artist }} - {{ data?.songTitle }}</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/get-recently-played");
</script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
.spotify {
  display: flex;
  align-items: center;
}
.track-info {
  margin-left: 4px;
  color: var(--foreground-dark-forest);
  @include degularCaps(400, var(--idealBaseFontSize));

  &:hover {
    cursor: pointer;
  }

  a {
    color: inherit;
  }
}
</style>
