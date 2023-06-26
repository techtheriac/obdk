<template>
  <div class="spotify">
    <Rounded />
    <div class="track-info">
      <a :href="data?.url" target="_blank"
        >NP: {{ data?.artist }} - {{ data?.songTitle }}</a
      >
      <button id="audioTrigger">play</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSpotifyAudio from "../composables/useSpotifyAudio";
const { data } = await useFetch("/api/get-recently-played");

onMounted(() => {
  const { context } = useSpotifyAudio(
    data.value?.previewUrl,
    document.getElementById("audioTrigger")
  );

  console.log(context);
});
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
