<template>
  <div class="rumination-index">
    <TagsFilter :tags="tags" />

    <div class="section__container">
      <section class="section">
        <ArticleListing :articles="articles" />
      </section>
      <section class="section poetry">
        <div class="section-aside">
          <NuxtLink to="/www">Essays & Catalog Index <span>→</span> </NuxtLink>
          <NuxtLink to="/essays"
            >Read my poetry collection <span>→</span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const local = await queryContent("essays").find();
const { data: notion } = await useFetch("/api/get-notion-posts");
let { tags, articles } = useTextContent(local, notion);
</script>

<style scoped lang="scss">
.rumination-index {
  display: flex;
  flex-direction: column;
  margin: var(--space) 0;
  form {
    position: sticky;
    top: var(--header-height);
    z-index: 10;
    margin-bottom: var(--space-xs);
  }
}

.section-aside {
  display: flex;
  flex-direction: column;
  padding: var(--space-xs);
  border: 0.5px solid var(--border-color);
  border-radius: 0.5em;
  gap: var(--space-xs);

  > a {
    color: var(--foreground-100);
    padding: var(--space-xs);
    background-color: var(--background-200);
    border-radius: 0.4em;
  }
}
.year-segment {
  h2 {
    font-variation-settings:
      "slnt" 0,
      "MONO" 0;
    font-size: var(--step-1);
    font-weight: 450;
    padding-top: var(--space-xs);
  }
}
.section__container {
  width: 100%;
  display: grid;
  gap: var(--space-xs);
  grid-template-columns: 1fr;
}

@media screen and (min-width: 700px) {
  .section__container {
    --padding-inline: 15vmin;
    grid-template-columns: 4fr 1fr;
  }
  .section-aside {
    margin-top: 7vmin;
    position: sticky;
    top: 25vmin;
  }
}
</style>
