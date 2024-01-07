<template>
  <div class="content-main obdk-bg">
    <div class="obdk-bg__layer-one"></div>
    <div class="obdk-bg__layer-two"></div>
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
  section {
    z-index: 2;
  }
}
</style>
