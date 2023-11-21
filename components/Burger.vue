<template>
  <NuxtLink
    :to="route"
    @click="animateItems"
    :class="{ close: visible }"
    class="burger"
  >
    <span v-for="n in 9" :data-item-index="n"></span>
  </NuxtLink>
</template>

<script setup>
let visible = ref(false);
let route = ref("/www");

function animateItems() {
  if (!visible.value) {
    visible.value = true;
    route.value = "/";
  } else {
    visible.value = false;
    route.value = "/www";
  }
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
  }
}

.close {
  :nth-child(2),
  :nth-child(4),
  :nth-child(6),
  :nth-child(8) {
    visibility: hidden;
  }
}
</style>
