<template>
  <footer>
    <p>
      <span> © FRANKLIN JEZREEL </span>
      <span> ALLRIGHTS RESERVED </span>
    </p>
    <Outside />
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
  align-items: flex-start;
  p {
    display: flex;
    flex-direction: column;
    gap: 5px;

    span {
      @include degularCaps(250, var(--idealSubFontSize));
      color: var(--foreground-dark-dim);
    }
  }
}
</style>
