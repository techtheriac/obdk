<template>
  <section>
    <div class="outside">
      <div class="elsewhere">
        <div class="prefooter-item tangent">
          <h2>Tangents</h2>
          <ul>
            <li v-for="letter in morphisms">
              <p class="tangent-issue">{{ letter?.issue }}</p>
              <NuxtLink :to="letter._path">
                {{ letter?.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="prefooter-item outside">
          <h2>Outside</h2>
          <p>
            <NuxtLink v-for="out in outside" :to="out.link">{{
              out.name
            }}</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const morphisms = await queryContent("tangents")
  .where({ published: true })
  .find();

const outsideQuery = await queryContent("outside").findOne();
const outside = outsideQuery.body;
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.elsewhere {
  > div {
    padding: var(--space-s) 0;
  }
}
@media screen and (min-width: 600px) {
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
}

@media screen and (max-width: 600px) {
  .outside {
    border-top: 1px solid var(--border-color);
  }
}

.outside {
  a {
    color: var(--foreground-100);
    text-decoration: underline;
    text-decoration-color: var(--border-color);
    text-underline-offset: 0.09em;
    text-decoration-thickness: 0.5px;
  }
}

.tangent-issue {
  font-variation-settings: "MONO" 1;
}
.prefooter-item {
  h2 {
    font-weight: 550;
    font-size: var(--step-0);
  }

  ul {
    > * + * {
      margin-top: calc(var(--space-xs) - 0.3em);
    }
  }

  > * + * {
    margin-top: var(--space-xs);
  }

  &:nth-child(2) > p {
    line-height: 1.3em;

    a {
      &::after {
        content: "·";
        padding: 0 0.3em 0 0.3em;
      }
    }
  }
}
</style>
