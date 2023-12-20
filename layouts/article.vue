<template>
  <div class="content-main">
    <div class="layer"></div>
    <div class="layer-2"></div>
    <section>
      <slot />
    </section>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.content-main {
  --size-background: 200px;
  padding-top: var(--space-m);
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: "TWK Lausanne";
  min-height: 100vh;
  color: #fff;
  background-image: url("/static/images/noise.svg");
  background-size: var(--size-background) var(--size-background);
  background-attachment: fixed;

  section {
    z-index: 2;
  }
}

.layer {
  top: 0;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: var(--background-dark-07);
}

.layer-2 {
  --size-background: 1rem;
  top: 0;
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      to right,
      rgb(203 213 225) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgb(203 213 225) 1px, transparent 1px);
  background-size: var(--size-background) var(--size-background);
}
</style>
