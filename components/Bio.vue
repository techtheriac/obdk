<template>
  <div class="info flow">
    <!-- <div class="marquee-wrapper">
      <p v-for="n in 3" class="marquee-line" :aria-hidden="n != 1">
        Tectheriac is the pseudonym of Franklin Jezreel, a software engineer
        with a keen interest on building for the internet. Consider this website
        a haven for his musings, and ruminations.
      </p>
    </div> -->
    <div>Email, Twitter</div>
    <div class="about">
      <p>Design Engineer</p>
      <!-- <p>
        Tectheriac is a pseudonym. I am a software engineer with a keen interest
        on building for the internet. Consider this website a haven for my
        musings, ruminations, experiments & everything in between.
      </p> -->
    </div>
  </div>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
@import "../assets/css/utilities/font-definitions";
.bio {
  @include lausanneNormal(300, var(--idealBaseFontSize));
  color: var(--foreground-100);
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

.flow {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}

.info {
  // @include lausanneNormal(300, var(--idealBaseFontSize));
  color: var(--foreground-100);
  letter-spacing: -0.005em;
  font-family: "Blanco";
}

.about {
  max-width: 60ch;

  // > * + * {
  //   margin-top: 0.5em;
  // }

  P {
    line-height: 1.3em;
  }

  .strong {
    font-family: "Blanco";
    font-weight: 700;
  }
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
