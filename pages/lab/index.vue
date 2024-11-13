<template>
  <div class="container__labs">
    <div class="meta__labs">
      <PageTitle title="Lab" />
    </div>
    <ul class="lab__layout">
      <li class="lab__item" v-for="lab in labs">
        <div class="lab__item__meta">
          <p>
            {{ lab.title }}
          </p>
          <p>
            {{ lab.summary }}
          </p>
        </div>
        <NuxtLink :to="lab.content" class="lab__media">
          <video playsinline autoplay muted loop poster="">
            <source :src="lab.preview" type="video/webm" />
          </video>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const labQuery = await queryContent("/labs").findOne();

let labs = labQuery.body;
</script>

<style scoped lang="scss">
.container__labs {
  display: grid;
  padding-block-start: var(--space-s);
}

@media screen and (min-width: 600px) {
  .container__labs {
    display: grid;
    grid-template-columns: 1fr 300px;
  }
}
.lab__layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 50ch), 1fr));
  gap: var(--space-s);
}

.meta__labs {
  margin-block-end: var(--space);
}

.lab__item {
  --gap: 0.3em;
  --title-weight: 300;
  --summary-weight: 250;

  display: flex;
  flex-direction: column;
  border-top: 0.5px solid var(--border-color);
  padding-block-start: calc(3 * var(--gap));

  > * + * {
    margin-block-start: calc(3 * var(--gap));
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: var(--gap);

    p:nth-child(1) {
      font-weight: var(--title-weight);
      font-size: var(--step-0);
    }

    p:nth-child(2) {
      font-weight: var(--summary-weight);
      font-size: var(--step--1);
      line-height: 1.2em;
    }
  }
}

.lab__media {
  display: block;
  background-color: var(--elevated);
  padding: var(--space);
  video {
    aspect-ratio: 4 / 3;
    width: 100%;
  }
}
</style>
