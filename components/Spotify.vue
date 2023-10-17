<template>
  <div class="spotify track-info">
    <span>LISTENING</span>
    <div>
      <div class="controller" @click="mousePressed" ref="audioControl">
        <p v-if="contextState === 'running'">stop</p>
        <p v-else>play</p>
      </div>
      <a :href="data?.previewUrl" target="_blank"
        >{{ data?.artist }} - {{ data?.songTitle }}</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { AudioContextState } from "~/obdk";
import TextScramble from "~/utils/animations/textScramble";
const { data } = await useFetch("/api/get-recently-played");

let audio: HTMLAudioElement | null;
let audioContext: AudioContext | null;
let contextState: Ref<AudioContextState> = ref("initial");
let textScramble: TextScramble | null = null;

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

    if (textScramble) {
      textScramble.state = contextState.value;
      textScramble.animate();
    }
  } else {
    audio?.pause();
    audioContext.close();
    contextState.value = audioContext.state;

    if (textScramble) {
      textScramble.state = audioContext.state;
    }

    audioContext = audio = null;
  }
};

onMounted(() => {
  const scrambleElement = document.querySelector(".track-info  a");
  textScramble = new TextScramble({
    elements: scrambleElement,
    state: contextState.value,
  });
});
</script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
.spotify {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--space-xs);

  > div {
    display: flex;
    gap: var(--space-xs);
  }

  span {
    text-decoration: line-through;
  }
}

.track-info {
  color: var(--foreground-dark-forest);
  @include lausanneNormal(300, var(--idealBaseFontSize));
  text-transform: uppercase;
  color: #fff;

  &:hover {
    cursor: pointer;
  }

  a {
    color: inherit;
  }
}

.controls {
  cursor: pointer;
}
</style>
