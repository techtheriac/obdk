<template>
  <div @click="animateItems" :class="{close: visible}" class="burger">
    <span v-for="n in 9" :data-item-index="n"></span>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { onMounted } from "vue";
let stackedItems;
let stackContainer;
let stackedHeaders;

let visible = ref(false);

let t1;

onMounted(() => {
  stackedItems = document.querySelectorAll(".stacked_item");
  stackContainer = document.querySelector(".stacked");
  stackedHeaders = document.querySelectorAll(".stacked-header");

  t1 = gsap
    .timeline({ onReverseComplete: () => toggleHidden() })
    .from(stackContainer, { autoAlpha: 0, duration: 0.2 })
    .from(stackedItems, {
      duration: 0.5,
      stagger: 0.2,
      autoAlpha: 0,
      xPercent: 50,
    })
    .from([stackedHeaders[0], stackedHeaders[2]], {
      yPercent: 10,
      delay: 0.2,
      stagger: 0.2,
    })
    .from(stackedHeaders[1], {
      y: 30,
    })
    .pause();
});

function animateItems() {
  if (!visible.value) {
    stackContainer.classList.remove("hidden");

    if (t1.reversed()) {
      t1.play();
    }
    t1.resume();
    visible.value = true;
  } else {
    t1.reverse(0.7);
    visible.value = false;
  }
}

function toggleHidden() {
  stackContainer.classList.add("hidden");
}
</script>

<style lang="scss" scoped>
.burger {
  position: absolute;
  top: var(--bio-height);
  margin-top: var(--space-s);
  left: var(--space-xs);
  z-index: 4;
  width: 1.5em;
  height: 1.5em;
  font-size: var(--idealBaseFontSize);
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  &:hover {
    cursor: pointer;
    gap: 0.2em;
  }

  span {
    background-color: var(--foreground-08);
    //background-color: #C0BAF2;
  }
}

.close {
  :nth-child(2), :nth-child(4), :nth-child(6), :nth-child(8) {
    visibility: hidden;
  }
}

</style>
