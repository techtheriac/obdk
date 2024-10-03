<template>
  <div>
    <Techtheriac :should-blink="false" />
    <div class="morphism-wrapper">
      <div class="morphism-side">
        <h1>Morphisms</h1>
        <h2>An ongoing index of curiousities</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non in id
          harum, nam possimus saepe ratione, molestiae blanditiis veniam
          quisquam natus? Excepturi maxime totam delectus aliquid velit quia
          facilis deserunt!
        </p>
        <div>
          <form action="#">
            <input type="text" />
            <button disabled="true">subscribe</button>
          </form>
        </div>
        <ul>
          <li v-for="letter in morphisms">
            <P>{{ letter?.issue }}</P>
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
  padding-top: var(--space-s);
}

.morphism-side {
  border-right: 1px solid var(--border-color);
  h1 {
    font-family: "Rostin";
    font-size: var(--step-3);
    text-transform: uppercase;
    font-weight: 700;
    background-color: var(--forest);
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
</style>
