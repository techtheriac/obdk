<template>
  <section>
    <div class="outside">
      <div class="elsewhere">
        <div class="prefooter-item">
          <NuxtLink to="/morphisms">
            <h2>Morphisms</h2>
          </NuxtLink>
          <p>Meta</p>
          <ul>
            <li v-for="letter in morphisms"> 
              <p> {{ letter?.issue}}</p>
              <NuxtLink :to="letter._path">
                {{ letter?.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="prefooter-item">
          <h2>Outside</h2>
          <p class="outside">
            <NuxtLink v-for="out in outside" :to="out.link">{{ out.name }}</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const morphisms = await queryContent("morphisms")
  .where({ published: true })
  .find();

const outside = [
  {
    name: "The chemistry of reduce",
    link: "https://dev.to/techtheriac/the-chemistry-of-reduce-54m6",
  },
  {
    name: "Lambda (λ) Calculus For Javascript Developers",
    link: "https://gist.github.com/techtheriac/d0daa646b45fed7fba7c061bfc3154ee",
  },
  {
    name: "Notion as a content management system",
    link: "https://www.youtube.com/live/piY-Jp1qFo4",
  },
  {
    name: "Educative Answers - What are ASP Conditionals?",
    link: "https://www.educative.io/answers/what-are-asp-conditionals",
  },
];
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.elsewhere {
  display: flex;

  > div {
    max-width: 400px;
    padding: var(--space-s);
  }

  > * + * {
    border-left: 1px solid var(--border-color);
  }
}
.outside {
  a {
    color: var(--foreground-100);
    text-decoration: underline;
    text-decoration-color: var(--border-color);
    text-underline-offset: 0.09em;
    text-decoration-thickness: 0.5px;
    &::after {
      content: "·";
    }
  }
}
</style>
