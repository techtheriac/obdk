<template>
  <Now title="listening" :description="data?.artist" :summary="data?.songTitle">
    <div class="spotify track-info">
      <div class="album-art">
        <img :src="data?.images[1].url" width="300" height="300" />
      </div>
      <div class="controller-overlay">
        <div
          class="controller"
          :class="{ triangle: contextState != 'running' }"
          @click="mousePressed"
          ref="audioControl"
        ></div>
      </div>
    </div>
  </Now>
</template>

<script setup lang="ts">
import { type AudioContextState } from "~/obdk";
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
@use "sass:math";
@import "../assets/css/utilities/font-definitions";

@mixin triangle($sideLength, $size) {
  $hypotenuse: $sideLength; // renaming to make calculations more logical
  $angle: 60deg;
  $opposite: math.sin($angle) * $hypotenuse;
  $adjacent: $hypotenuse / 2;
  $startPos: ($size / 2 - $adjacent);
  $startPosY: ($size / 2 - $opposite / 2);
  $endPos: ($size / 2 + $adjacent);
  $endPosY: ($size / 2 + $opposite / 2);
  $clip: polygon($startPos $endPosY, 50% $startPosY, $endPos $endPosY);
  -webkit-clip-path: $clip;
  clip-path: $clip;
}

.triangle {
  @include triangle(100%, 100%);
}

.spotify {
  position: relative;
  width: 150px;
  display: flex;
  flex-direction: column;
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

.album-art {
  img {
    aspect-ratio: 1 / 1;
    max-inline-size: 100%;
    block-size: auto;
  }
}

.controller-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: var(--foreground-dark-forest);
}

.controller {
  cursor: pointer;
  width: 3em;
  height: 3em;
  background-color: #fff;
  transform: rotate(90deg);
}
</style>
