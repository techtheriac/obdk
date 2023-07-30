<template>
  <footer>
    <!-- <p>
      <span> © JEZREEL OBIDIKE FRANKLIN </span>
    </p> -->
    <Spotify />
    <!-- <Outside /> -->
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  p {
    display: flex;
    flex-direction: column;
    gap: 5px;

    span {
      @include gestaltCaps(250, var(--idealSubFontSize));
      color: var(--foreground-dark-dim);
    }
  }
  margin-bottom: 0.5em;
}
</style>
