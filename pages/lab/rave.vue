<template>
  <div class="rave_container">
    <div class="meta">
      <img
        @click="playSound"
        alt="spotify album art"
        :src="data?.images[1].url"
        width="300"
        height="300"
      />
      <h1 :style="elStyle">{{ data?.artist }}</h1>
      <h2>{{ data?.songTitle }}</h2>
    </div>
  </div>
</template>
// @ts-nocheck
<script setup lang="ts">
import { type AudioSourceState } from "~/obdk";
const { data } = await useFetch("/api/get-recently-played");

let ELSH = ref(0);

let elStyle = ref({
  fontVariationSettings: `"ELSH" ${ELSH.value}`,
});

let audio: HTMLAudioElement | null;
let audioContext: AudioContext | null;
let contextState: Ref<AudioSourceState> = ref("initial");

let signals;
let curRaf;

const frequencyBands = [
  { frequency: 55, color: "#D5B3E5" },
  { frequency: 110, color: "#7F3CAC" },
  { frequency: 220, color: "#22A722" },
  { frequency: 440, color: "#F1892A" },
  { frequency: 570, color: "#E84420" },
  { frequency: 960, color: "#F4CD00" },
  { frequency: 2000, color: "#3E58E2" },
  { frequency: 4000, color: "#F391C7" },
];

function rootMeanSquaredSignal(data) {
  let rms = 0;
  for (let i = 0; i < data.length; i++) {
    rms += data[i] * data[i];
  }
  return Math.sqrt(rms / data.length);
}

async function loadSound(): Promise<void> {
  if (!audioContext) {
    audioContext = new AudioContext();
    audio = document.createElement("audio");
    audio.addEventListener("ended", (e) => {
      contextState.value = "ended";
    });
    audio.loop = false;

    if (!data.value?.previewUrl) return;

    audio.crossOrigin = "Anonymous";
    audio.src = data.value?.previewUrl;
    const source = audioContext!.createMediaElementSource(audio);
    source.connect(audioContext.destination);

    // For each frequency we want to isolate, we will create
    // its own analyser and filter nodes
    signals = frequencyBands.map(({ frequency, color }) => {
      // Create an analyser
      const analyser = audioContext!.createAnalyser();
      analyser.smoothingTimeConstant = 1;

      // Create FFT data
      const data = new Float32Array(analyser.fftSize);

      // Create a filter that will only allow a band of data
      // through
      const filter = audioContext!.createBiquadFilter();
      filter.frequency.value = frequency;
      filter.Q.value = 1;
      filter.type = "bandpass";

      source.connect(filter);
      filter.connect(analyser);

      return {
        analyser,
        color,
        data,
        filter,
      };
    });

    audio.pause();
  }
}

async function playSound() {
  console.log("PLAYED?");
  if (!audioContext) {
    await loadSound();
  }
  if (audio!.paused) {
    audio!.play();
    contextState.value = "playing";
  } else {
    audio?.pause();
    contextState.value = "ended";
  }

  if (contextState.value == "playing") {
    requestAnimationFrame(updateFontVariation);
  } else {
    cancelAnimationFrame(curRaf);
  }
}

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

function damp(a, b, lambda, dt) {
  return lerp(a, b, 1 - Math.exp(-lambda * dt));
}

function map(
  value: number,
  min1: number,
  max1: number,
  min2: number,
  max2: number,
) {
  return min2 + ((value - min1) * (max2 - min2)) / (max1 - min1);
}

function updateFontVariation(time) {
  let width = window.innerWidth;
  let height = window.innerHeight;

  const dim = Math.min(width, height);

  if (audioContext) {
    signals.forEach(({ analyser, data, color }, i) => {
      // Get the waveform
      analyser.getFloatTimeDomainData(data);

      // Get the root mean square of the data
      // Note this will already have been 'filtered'
      // down to the band of frequency we want
      const signal = rootMeanSquaredSignal(data);
      const scale = 10; // scale the data a bit so the circle is bigger
      const size = dim * scale * signal;

      let smoothed = Math.ceil(map(size, 1, 1000, 1, 100));

      // elStyle.value.fontVariationSettings = `"ELSH" ${smoothed}`;

      ELSH.value = smoothed;

      console.log(elStyle.value);
      // Draw the rectangle
      const margin = 0.2 * dim;
      const x =
        signals.length <= 1
          ? width / 2
          : map(i, 0, signals.length - 1, margin, width - margin);

      const sliceWidth = ((width - margin * 2) / (signals.length - 1)) * 0.75;
    });

    curRaf = requestAnimationFrame(updateFontVariation);
  } else {
    elStyle.value = {
      fontVariationSettings: `"ELSH" 0`,
    };
  }
}

watch(ELSH, () => {
  elStyle.value = {
    fontVariationSettings: `"ELSH" ${ELSH.value}`,
  };
});

onBeforeUnmount(() => {
  audioContext?.close();
});
</script>

<style scoped>
.rave_container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: var(--space-s) var(--space);

  .meta {
    font-family: "Danfo";
    font-size: calc(var(--idealHeadingOne) + 10vw);
    font-variation-settings: "ELSH" 50;
    text-align: center;

    img {
      &:hover {
        cursor: pointer;
        filter: grayscale(100%);
      }

      transition: filter 0.5s ease-in-out;
    }

    h2 {
      font-size: calc(var(--idealHeadingOne) + 2vw);
      font-variation-settings: "ELSH" 0;
    }
  }
}
</style>
