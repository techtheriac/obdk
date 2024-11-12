<template>
  <div>
    <PageTitle title="Labs" />
    <ul class="lab__layout">
      <li class="lab__item" v-for="lab in labs">
        <div class="lab__media">
          <video playsinline autoplay muted loop poster="">
            <source :src="lab.preview" type="video/webm" />
          </video>
        </div>
        <p>
          {{ lab.title }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
const labQuery = await queryContent("/labs").findOne();

let labs = labQuery.body;
</script>

<style scoped>
.lab__layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 50ch), 1fr));
  gap: var(--space-s);
}

.lab__item {
  background-color: var(--elevated);
  padding: var(--space);
}

.lab__media {
  video {
    aspect-ratio: 4 / 3;
    width: 100%;
  }
}
</style>
