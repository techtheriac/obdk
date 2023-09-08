<template>
  <div class="spotify track-info">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <circle cx="128" cy="128" r="96" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/>
        <path d="M104,166a51,51,0,0,1,48,0" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/>
        <path d="M72,110a119,119,0,0,1,112,0" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/>
        <path d="M88,138a85,85,0,0,1,80,0" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="10"/>
      </svg>
      <span class="stroke">now playing</span>
      <div class="controller" @click="mousePressed" ref="audioControl">
        <p v-if="contextState === 'running'">stop</p>
        <p v-else>play</p>
      </div>
      <a :href="data?.previewUrl" target="_blank"
        >{{ data?.artist }} - {{ data?.songTitle }}</a
      >
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
  display: grid;
  grid-template-columns: 60px 300px;
  grid-template-rows:  30px 16px;

svg {
  width: 100%;
  height: 100%;
  margin-left: -5px;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  align-self: start;
  margin-left: -12px;
  }

a {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}
}

.stroke {
  text-decoration: line-through;
  grid-column: 2 / 3;
  align-self: center;
}

.controller {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.track-info {
  color: var(--foreground-dark-forest);
  @include gestaltCaps(400, 1rem);
  color: #000;

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
