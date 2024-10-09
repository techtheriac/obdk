<template>
  <ContentDoc v-slot="{ doc }">
    <article id="morphism">
      <h1 class="rostin-forest-title">{{ doc.title }}</h1>
      <ContentRenderer data-content="morphism" :value="doc" />
    </article>
  </ContentDoc>
</template>
