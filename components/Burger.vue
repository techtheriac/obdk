<template>
  <div class="burger-container">
    <span>index</span>
    <NuxtLink
      :to="route"
      @click="animateItems"
      :class="{ close: visible }"
      class="burger"
    >
      <span v-for="n in 9" :data-item-index="n"></span>
    </NuxtLink>
  </div>
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
.burger-container {
  display: flex;
  flex-direction: row-reverse;
  gap: var(--space-xs);
  z-index: 4;
  align-items: flex-end;

  span {
    text-transform: uppercase;
  }
}
.burger {
  width: 1.2rem;
  height: 1.2rem;
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
