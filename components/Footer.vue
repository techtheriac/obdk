<template>
  <footer>
    <div class="alias">
      <small>© Jezreel Franklin</small>
    </div>
    <div class="links">
      <p>Social</p>
      <p>ARE.NA</p>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
footer {
  border-top: 1px solid var(--border-color);
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: var(--space-xs) 0;

  .alias {
    p {
      font-family: "Rostin";
      font-weight: 700;
      font-size: calc(var(--step-5) + 4vmin);
    }
  }
  .links {
    display: flex;
  }
}
</style>
