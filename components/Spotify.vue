<template>
  <Now title="listening" :description="data?.artist" :summary="data?.songTitle">
    <div class="spotify">
      <div class="album-art">
        <img :src="data?.images[1].url" width="300" height="300" />
      </div>
      <div class="controller-overlay">
        <div
          class="controller"
          :class="{ triangle: contextState != 'playing' }"
          @click="playSound"
          ref="audioControl"
        ></div>
      </div>
    </div>
  </Now>
</template>

<script setup lang="ts">
import { type AudioSourceState } from "~/obdk";
const { data } = await useFetch("/api/get-recently-played");

let audioBuffer: AudioBuffer;
let audioContext: AudioContext | null;
let contextState: Ref<AudioSourceState> = ref("initial");
let source: AudioBufferSourceNode;

async function loadSound(): Promise<void> {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (!audioBuffer) {
    const resp = await fetch(data.value?.previewUrl!);
    const buf = await resp.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(buf);
  }
}

async function playSound() {
  if (!audioContext) return;

  if (audioContext.state == "running") {
    if (contextState.value == "initial" || contextState.value == "ended") {
      source = audioContext.createBufferSource();
      source.connect(audioContext.destination);
      source.buffer = audioBuffer;
      source.start(0);
      contextState.value = "playing";
    } else {
      source.stop();
      contextState.value = "ended";
    }
  }
}

onBeforeMount(async () => {
  await loadSound();
});

onBeforeUnmount(() => {
  audioContext?.close();
});
</script>

<style lang="scss" scoped>
@use "sass:math";
@mixin triangle($sideLength, $size) {
  $hypotenuse: $sideLength;
  $angle: 60deg;
  $opposite: math.sin($angle) * $hypotenuse;
  $adjacent: math.div($hypotenuse, 2);
  $startPos: (math.div($size, 2) - $adjacent);
  $startPosY: (math.div($size, 2) - math.div($opposite, 2));
  $endPos: (math.div($size, 2) + $adjacent);
  $endPosY: (math.div($size, 2) + math.div($opposite, 2));
  $clip: polygon($startPos $endPosY, 50% $startPosY, $endPos $endPosY);
  -webkit-clip-path: $clip;
  clip-path: $clip;
}

.triangle {
  @include triangle(100%, 100%);
}

.spotify {
  position: relative;
  width: var(--ideal-block-size);
  display: grid;
  grid-template-areas: "stack";

  > * {
    grid-area: stack;
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
  width: 100%;
  height: 100%;
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
