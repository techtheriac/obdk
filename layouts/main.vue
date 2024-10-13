<template>
  <div class="layout-base">
    <Techtheriac :should-blink="true" :should-animate="true" />
    <main class="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
