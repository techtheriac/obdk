<template>
  <header>
    <svg
      class="obdk blinking"
      id="obdk"
      preserveAspectRatio="xMinYMid"
      viewBox="0 0 11165 1351"
    >
      <path
        d="M1003.55 0.652298V151.455H591.599V1345H412.292V151.455H0.34375V0.652298H1003.55Z"
      />
      <path
        d="M1271.83 1194.2H1936.65V1345H1093.45V0.652298H1931.13V151.455H1271.83V586.391H1891.59V736.273H1271.83V1194.2Z"
      />
      <path
        d="M2866.61 0.4021V177.422H2158.53V0.4021H2866.61ZM2866.61 354.442V177.422H3043.63V354.442H2866.61ZM3043.63 1167.98H2866.61V990.96H3043.63V1167.98ZM2158.53 1345V1167.98H2866.61V1345H2158.53ZM1981.51 177.422H2158.53V1167.98H1981.51V177.422Z"
      />
      <path
        d="M4020.86 5.42529H4197.88V1350.02H4020.86V758.701H3310.9V1350.02H3133.88V5.42529H3310.9V581.682H4020.86V5.42529Z"
      />
      <path
        d="M5287.55 4.6523V155.455H4875.6V1349H4696.29V155.455H4284.34V4.6523H5287.55Z"
      />
      <path
        d="M6262.49 4.4021H6439.51V1349H6262.49V757.678H5552.53V1349H5375.51V4.4021H5552.53V580.658H6262.49V4.4021Z"
      />
      <path
        d="M6703.83 1199.2H7368.65V1350H6525.45V5.6523H7363.13V156.455H6703.83V591.391H7323.59V741.273H6703.83V1199.2Z"
      />
      <path
        d="M8336.38 181.422H8513.39V590.074H8336.38V181.422ZM8336.38 590.074V767.094H8513.39V1349H8336.38V944.114H8159.35V767.094H7626.41V1349H7447.51V4.4021H8336.38V181.422H7626.41V590.074H8336.38Z"
      />
      <path d="M8603.45 1.6523H8781.83V1346H8603.45V1.6523Z" />
      <path
        d="M9909.93 1347L9763.72 953.443H9201.89L9053.85 1347H8869.02L9370.16 2.6523H9593.61L10094.8 1347H9909.93ZM9478.67 162.65L9255.22 806.318H9710.39L9485.1 162.65H9478.67Z"
      />
      <path
        d="M10987.6 2.4021V179.422H10279.5V2.4021H10987.6ZM10987.6 356.442V179.422H11164.6V356.442H10987.6ZM11164.6 1169.98H10987.6V992.96H11164.6V1169.98ZM10279.5 1347V1169.98H10987.6V1347H10279.5ZM10102.5 179.422H10279.5V1169.98H10102.5V179.422Z"
      />
    </svg>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
header {
  width: 100%;
  padding-block: var(--space-xs);
  border-bottom: 1px solid var(--border-color);
}
.obdk {
  width: inherit;
  fill: var(--foreground-100);
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
</style>
