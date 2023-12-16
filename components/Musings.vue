<template>
  <div class="musing">
    <ul class="filter">
      <li v-for="genre in filter">
        <Rounded :genre="genre" />
        <span>{{ genre }}</span>
      </li>
    </ul>
    <ul>
      <li v-for="content in data">
        <MusingItem
          :title="content.title"
          :path="content._path"
          :publised="content.last_edited"
          :genre="content.genre"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData("musings", () =>
  queryContent("/www/musings").find(),
);

const filter = computed(() => {
  return [...new Set(data.value?.map((x) => x.genre))];
});
</script>

<style scoped>
.musing {
  display: flex;
  flex-direction: column;
}

.filter {
  display: flex;
  li {
    text-transform: uppercase;
    display: flex;

    span {
      margin-left: 5px;
    }
  }

  li + li {
    margin-left: var(--space-xs);
  }
}

a {
  color: #fff;
}

ul {
  padding-left: var(--space-xs);
}
</style>
