<template>
  <div class="morphism-wrapper">
    <div class="morphism-side">
      <h1>Morphisms</h1>
      <h2>An ongoing index of curiousities</h2>
      <div>
        <form action="#">
          <input type="text" />
          <button disabled="true">subscribe</button>
        </form>
      </div>
      <ul class="morphism-list">
        <li v-for="letter in morphisms">
          <p>{{ letter?.issue }}</p>
          <NuxtLink :to="letter._path">
            {{ letter?.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <main class="morphism-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const morphisms = await queryContent("morphisms")
  .where({ published: true })
  .find();
</script>

<style lang="scss">
.morphism-wrapper {
  display: grid;
  grid-template-columns: 2fr 3fr;
  padding-top: var(--space-m);
  max-width: 960px;
  margin: 0 auto;
}

.morphism-side {
  border-right: 1px solid var(--border-color);
  padding-right: var(--space-s);
  h1 {
    font-family: "Rostin";
    font-size: var(--step-3);
    text-transform: uppercase;
    font-weight: 700;
    background-color: var(--forest-10);
    display: inline-block;
  }

  h2 {
    font-size: var(--step-1);
    padding: var(--space-xs) 0;
  }

  h2 + p {
    font-size: var(--step-0);
  }
}

.morphism-content {
  padding-left: var(--space-s);
}

.morphism-list {
  margin-top: var(--space-s);

  li {
    display: flex;
    flex-direction: column;
    gap: calc(var(--space-xs) - 1ch);

    p {
      font-family: Rostin;
      text-transform: uppercase;
      font-size: var(--step-0);
    }

    a {
      color: var(--foreground-100);
      text-decoration: underline;
      text-decoration-color: var(--border-color);
      text-underline-offset: 0.09em;
      text-decoration-thickness: 0.5px;
    }
  }

  li + li {
    margin-top: var(--space-xs);
  }
}
</style>
