<template>
  <section>
    <h1 class="section-title">From the lab</h1>
    <div class="featured-container">
      <div class="featured-media">
        <video playsinline autoplay muted loop poster="">
          <source
            src="https://res.cloudinary.com/techtheriac/video/upload/q_30/v1731427390/techtheriac/lab/rave_evdcrw.webm"
            type="video/webm"
          />
        </video>
      </div>
      <div class="featured-media__details">
        <NuxtLink to="/lab/rave"> RAVE </NuxtLink>
        <p>Visualizing audio frequency bands with Danfo's ELSH axis</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.section-title {
  font-size: var(--step--1);
  align-self: flex-end;
  text-transform: uppercase;
  border: 1px dotted var(--border-color);
  border-bottom: none;
  padding: var(--space-s) var(--space-s);
  font-variation-settings: "MONO" 1;
}

section {
  border-bottom: 1px dotted var(--border-color);
  width: 100%;
  padding: var(--space) var(--space-s);
  display: flex;
  flex-direction: column;

  .featured-container {
    display: grid;
    grid-template-columns: max(30vmin, 50%) 1fr;
    gap: var(--space-s);
    background-color: var(--elevated);
    padding: inherit;
  }

  .featured-media {
    video {
      aspect-ratio: 4 / 3;
      width: 100%;
    }

    &__details {
      align-self: center;
      display: flex;
      flex-direction: column;
      gap: 0.3em;
      a {
        font-size: var(--step-2);
        font-variation-settings: "MONO" 1;
        text-decoration: underline;
        text-underline-offset: 0.09em;
        text-decoration-thickness: 0.65px;
        text-decoration-color: var(--border-color);
      }
      p {
        font-size: var(--step-0);
      }
    }
  }
}
</style>
