<template>
  <div class="bio">
    <p>('tek-ˈthir-ē-ˌak)</p>

    <div class="bio-meta">
      <span class="bio-meta__img">
        <img src="/avatar.webp" width="455" height="378" alt="avatar" />
      </span>
      <p>
        Techtheriac is Jezreel Franklin's web incarnation. A software engineer
        with a nack for building on the internet across stacks and disciplines
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.bio {
  display: flex;
  flex-wrap: nowrap;
  padding-block-start: var(--space-xs);
  font-size: var(--step--1);
  font-weight: 300;
  justify-content: space-between;
  font-weight: 250;
}
.bio-meta {
  --size: 20;
  --unit: calc((var(--size) / 455) * 1vmin);
  display: flex;
  gap: var(--space-xs);
  &__img {
    width: calc(455 * var(--unit));
    height: calc(378 * var(--unit));
    img {
      width: 100%;
      height: 100%;
      aspect-ratio: 65 / 54;
    }
  }
  p {
    max-width: 20ch;
  }
}
</style>
