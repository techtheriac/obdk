<template>
  <div class="container">
    <header class="header">
      <slot name="header"></slot>
    </header>
    <article>
      <slot></slot>
    </article>
    <aside class="left"></aside>
    <aside class="right"></aside>
    <div class="references">
      <slot name="references"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  display: grid;
  grid-template-areas:
    "left left"
    "header header"
    "article article"
    "reference reference";
  grid-template-columns: repeat(2, 1fr);
}

@media screen and (min-width: 600px) {
  grid-template-areas:
    "header header header"
    "left article right"
    "left reference right";
  grid-template-columns: 1fr 700px 1fr;
}
</style>
