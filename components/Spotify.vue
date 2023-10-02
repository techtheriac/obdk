<template>
  <div class="spotify track-info">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <circle
        cx="128"
        cy="128"
        r="96"
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="10"
      />
      <path
        d="M104,166a51,51,0,0,1,48,0"
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="10"
      />
      <path
        d="M72,110a119,119,0,0,1,112,0"
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="10"
      />
      <path
        d="M88,138a85,85,0,0,1,80,0"
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="10"
      />
    </svg>
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
  width: 100%;
  height: 30px;
  gap: 10px;
  align-items: center;
  grid-template-columns: 30px 4ch auto;

  svg {
    height: 90%;
    margin-bottom: 3px;
    path {
      fill: var(--foreground-08);
      stroke: var(--foreground-08);
    }
    circle {
      stroke: var(--foreground-08);
    }
  }
}

.stroke {
  text-decoration: line-through;
  grid-column: 2 / 3;
  align-self: center;
}

.track-info {
  color: var(--foreground-dark-forest);
  @include lausanneNormal(300, var(-idealArticleParagraphSize));
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
