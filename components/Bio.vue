<template>
  <div class="bio hidden">
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
        with a nack for building on the internet across stacks and disciplines.
        Consider this website an ever iterative attempt at presenting his work,
        ruminations and interests.
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
  --bio-width: 20ch;
  display: flex;
  font-weight: var(--font-weight, 300);
  gap: var(--space-xs);
  p {
    max-width: var(--bio-width);
    font-size: var(--step--1);
    line-height: 1.2em;
  }
}

@media screen and (min-width: 600px) {
  .bio-meta {
    --bio-width: var(--nav-width);
  }
}
</style>
