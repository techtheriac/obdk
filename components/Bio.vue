<template>
  <div class="bio">
    <p>('tek-ˈthir-ē-ˌak)</p>

    <div class="bio-meta">
      <FluidImage
        src="/avatar.webp"
        :intrinsicWidth="455"
        :intrinsicHeight="378"
        :scaleSize="20"
        alt="avatar"
        mediaType="image"
      />
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
  justify-content: space-between;

  p:nth-child(1) {
    font-weight: 250;
  }
}

@media (prefers-color-scheme: dark) {
  .bio-meta {
    --font-weight: 250;
    --color: var(--white);
  }
}

.bio-meta {
  display: flex;
  font-weight: var(--font-weight, 300);
  gap: var(--space-xs);
  color: var(--color, rgb(164, 173, 182));
  p {
    max-width: 20ch;
    font-size: var(--step--1);
    line-height: 1.1em;
  }
}
</style>
