<template>
  <main class="content-main">
     <ContentDoc v-slot="{ doc }">
        <article class="content">
          <span>{{ doc.last_edited }}</span>
          <h1>{{ doc.title }}</h1>
          <ContentRenderer :value="doc"/>
        </article>
     </ContentDoc>
  </main>
</template>

<script setup>
  definePageMeta({
    layout: false
  })
</script>

<style lang="scss">
.content-main {
  display: flex;
  flex-direction: column;
  max-width: 840px;
  margin: 0 auto;
  font-family: "Gestalt";
  min-height: 100vh;
  background-color: var(--musings-bg);
}

.content {
  padding: 0 var(--space-m);

  h1 {
    text-transform: uppercase;
    text-decoration: underline;
    font-size: 60px;
    margin-bottom: var(--space-s);
  }

}

[data-content-id] {
  h1, h2, h3, h4, h5, h6 {
    text-decoration: underline;
  }

  > p + p {
    margin-top: var(--space-s);
  }
}

</style>
