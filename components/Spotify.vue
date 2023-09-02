<template>
  <div class="spotify">
    <div class="track-info">
      <div @click="mousePressed" ref="audioControl">
        <p class="track-info" v-if="contextState === 'running'">stop</p>
        <p class="track-info" v-else>play</p>
      </div>
      <a :href="data?.previewUrl" target="_blank"
        >{{ data?.artist }} - {{ data?.songTitle }}</a
      >
    </div>
    <div class="controls"></div>
  </div>
</template>

<script setup lang="ts">
import { AudioContextState } from "~/obdk";
import TextScramble from "~/utils/animations/textScramble";
import { Application } from "~/utils/application";
const { data } = await useFetch("/api/get-recently-played");

let applicationInstance = new Application({ colors: data.value?.palette });

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

    applicationInstance.emit("update-theme");
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
  applicationInstance.emit("update-theme");
  const scrambleElement = document.querySelectorAll(".track-info > a");
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
  align-items: flex-end;
  > * + * {
    margin-left: var(--space-xs);
  }
}
.track-info {
  color: var(--foreground-dark-forest);
  @include gestaltCaps(400, 1rem);
  color: #000;
  display: flex;

  > * + * {
    margin-left: 20px;
  }

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
