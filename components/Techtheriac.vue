<template>
  <header>
    <svg
      viewBox="0 0 10478 1117"
      class="obdk"
      :class="{ blinking: shouldBlink }"
      id="obdk"
      preserveAspectRatio="xMinYMid"
    >
      <path d="M0 0H698.17V139.625H418.902V1117H279.268V139.625H0V0Z" />
      <path
        d="M977.983 0H1676.15V139.625H1117.62V418.875H1536.52V558.5H1117.62V977.375H1676.15V1117H977.983V0Z"
      />
      <path
        d="M1955.97 139.625H2095.6V977.375H1955.97V139.625ZM2095.6 977.375H2514.5V1117H2095.6V977.375ZM2514.5 837.75H2654.14V977.375H2514.5V837.75ZM2095.6 0H2514.5V139.625H2095.6V0ZM2514.5 139.625H2654.14V279.25H2514.5V139.625Z"
      />
      <path
        d="M2933.95 0H3073.58V418.875H3492.49V0H3632.12V1117H3492.49V558.5H3073.58V1117H2933.95V0Z"
      />
      <path
        d="M3911.93 0H4610.1V139.625H4330.83V1117H4191.2V139.625H3911.93V0Z"
      />
      <path
        d="M4889.92 0H5029.55V418.875H5448.45V0H5588.09V1117H5448.45V558.5H5029.55V1117H4889.92V0Z"
      />
      <path
        d="M5867.9 0H6566.07V139.625H6007.53V418.875H6426.43V558.5H6007.53V977.375H6566.07V1117H5867.9V0Z"
      />
      <path
        d="M6845.88 0H7404.42V139.625H6985.52V558.5H7404.42V837.75H7264.78V698.125H6985.52V1117H6845.88V0ZM7404.42 139.625H7544.05V558.5H7404.42V139.625ZM7404.42 837.75H7544.05V1117H7404.42V837.75Z"
      />
      <path
        d="M8103.13 977.375V139.625H7823.86V0H8522.03V139.625H8242.77V977.375H8522.03V1117H7823.86V977.375H8103.13Z"
      />
      <path
        d="M8801.85 279.25H8941.48V558.5H9360.38V279.25H9500.02V1117H9360.38V698.125H8941.48V1117H8801.85V279.25ZM9081.12 0H9220.75V139.625H9081.12V0ZM8941.48 139.625H9081.12V279.25H8941.48V139.625ZM9220.75 139.625H9360.38V279.25H9220.75V139.625Z"
      />
      <path
        d="M9779.83 139.625H9919.46V977.375H9779.83V139.625ZM9919.46 977.375H10338.4V1117H9919.46V977.375ZM10338.4 837.75H10478V977.375H10338.4V837.75ZM9919.46 0H10338.4V139.625H9919.46V0ZM10338.4 139.625H10478V279.25H10338.4V139.625Z"
      />
    </svg>

    <nav>
      <ul>
        <li v-for="nav in navItems">
          <NuxtLink :to="nav.link">
            {{ nav.name }}
          </NuxtLink>
        </li>
      </ul>
      <ThemeToggle />
    </nav>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  shouldBlink: boolean;
}>();

const navItems = [
  {
    name: "Lab",
    link: "/lab"
  },
  {
    name: "Writing",
    link: "/essays"
  },
  {
    name: "Resume",
    link: "#"
  }
]
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  padding-block: var(--space-xs);
  border-bottom: 1px solid var(--border-color);
  grid-column: 1 / -1;
  position: relative;
}
.obdk {
  width: inherit;
  fill: var(--foreground-100);
  height: 40px;
}

@keyframes blinker {
  from {
    fill: transparent;
  }
  to {
    fill: var(--foreground-100);
  }
}

.blinking {
  > :nth-child(4) {
    animation: blinker 1000ms;
    animation-timing-function: var(--easingOut);
    animation-iteration-count: infinite;
  }

  > :nth-child(6) {
    animation: blinker 500ms;
    animation-timing-function: var(--easing);
    animation-iteration-count: infinite;
    animation-delay: 500ms;
  }
}


@media screen and (min-width: 600px) {
  nav {
    display: flex;
    position: absolute;
    right: 0;
    gap: var(--space-xs);
    bottom: 0;
    ul {
      display: flex;
      gap: inherit;
    }
  }
}


</style>
