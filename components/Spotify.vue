<template>
  <div class="spotify">
    <Rounded />
    <div class="track-info">
      <span>NP: {{ nowPlaying.artist }} - {{ nowPlaying.songTitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { spotify } = useRuntimeConfig();
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { getNowPlaying, NowPlaying } from "../infrastructure/Spotify";

const nowPlaying: Ref<NowPlaying> = ref({
  songTitle: "",
  artist: "",
  url: "",
});

onMounted(async () => {
  const res = await getNowPlaying(spotify);
  nowPlaying.value = res;
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
}
</style>
