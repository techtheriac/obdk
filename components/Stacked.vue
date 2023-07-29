<template>
  <section class="stacked">
    <div v-for="section in sections" :class="section">
      <div>
        <h2>{{ section }}</h2>
      </div>
      <div>
        <p v-show="false">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis,
          possimus? Iusto dolorum voluptas optio repellat facilis beatae eveniet
          dicta eligendi voluptate, at libero mollitia iste perferendis
          similique esse, voluptates quia?
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
let sections = ref(["essays", "musings", "contact"]);
</script>

<style lang="scss" scoped>
.stacked {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(24, 1fr);
}

.essays {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  z-index: 1;
  background-color: var(--musings-bg);
}

.musings {
  grid-column: 1 / -1;
  grid-row: 3 / -1;
  background-color: var(--essays-bg);
  z-index: 2;
}

.contact {
  grid-column: 1 / -1;
  grid-row: 5 / -1;
  background-color: var(--contact-bg);
  z-index: 3;
}

.stacked > div {
  display: flex;
  flex-direction: column;
  height: 100%;

  h2 {
    color: #000;
    font-size: 8rem;
    text-transform: uppercase;
  }
}
</style>
