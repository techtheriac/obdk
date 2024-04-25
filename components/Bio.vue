<template>
  <div class="bio hidden">
    <div class="marquee-wrapper">
      <p v-for="n in 3" class="marquee-line" :aria-hidden="n != 1">
        Tectheriac is the pseudonym of Franklin Jezreel, a software engineer
        with a keen interest on building for the internet. Consider this website
        a haven for his musings, and ruminations.
      </p>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
.bio {
  @include lausanneNormal(300, var(--idealBaseFontSize));
  margin-top: var(--space-xs);
  text-transform: uppercase;
  color: #fff;
  letter-spacing: -0.005em;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 15%,
    #000 85%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 15%,
    #000 85%,
    transparent 100%
  );
}

.marquee-wrapper {
  display: flex;
}
.marquee-line {
  flex-shrink: 0;
  margin: 0;
  white-space: nowrap;
  animation: marqueeLine 30s linear infinite;
}

@keyframes marqueeLine {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}
</style>
