<template>
  <div class="spotify">
    <Rounded />
    <!-- <PhSpotifyLogo size="26" /> -->
    <div class="track-info">
      <a :href="data?.url" target="_blank"
        >NP: {{ data?.artist }} - {{ data?.songTitle }}</a
      >
    </div>
    <div class="controls">
      <div @click="mousePressed" ref="audioControl">
        <PhPause v-if="contextState === 'running'" size="18" />
        <PhPlay v-else size="18" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhPlay, PhPause } from "@phosphor-icons/vue";
import { AudioContextState } from "~/obdk";

const { data } = await useFetch("/api/get-recently-played");

let audio: HTMLAudioElement | null;
let audioContext: AudioContext | null;
let contextState: Ref<AudioContextState> = ref("initial");

let mousePressed = () => {
  if (!audioContext) {
    audioContext = new AudioContext();

    audio = document.createElement("audio");

    audio.loop = true;

    if (!data.value?.previewUrl) return;

    audio.src = data.value?.previewUrl;

    audio.crossOrigin = "Anonymous";

    audio.play();

    const source = audioContext.createMediaElementSource(audio);

    source.connect(audioContext.destination);

    contextState.value = audioContext.state;
  } else {
    audio?.pause();
    audioContext.close();
    contextState.value = audioContext.state;
    audioContext = audio = null;
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
.spotify {
  display: flex;
  align-items: flex-end;
  > * + * {
    margin-left: var(--space-xs);
  }
}
.track-info {
  color: var(--foreground-dark-forest);
  @include gestaltCaps(400, var(--idealBaseFontSize));

  &:hover {
    cursor: pointer;
  }

  a {
    color: inherit;
  }
}
.controls {
  transform: translateY(4px);
  cursor: pointer;
}
</style>
