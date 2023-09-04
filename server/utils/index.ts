export function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
const WCAG_MINIMUM_RATIOS = [
  ['AA Large', 3],
  ['AA', 4.5],
  ['AAA', 7],
]

function luminance(r, g, b) {
  let [lumR, lumB, lumG] = [r, g, b].map(component => {
    let proportion = component / 255

    return proportion <= 0.03928
      ? proportion / 12.92 
      : Math.pow((proportion + 0.055) / 1.055, 2.4);
  })
  return 0.2126 * lumR + 0.7152 * lumG + 0.0722 * lumB;
}

function contrastRatio(luminance1, luminance2) {
  let lighterLum = Math.max(luminance1, luminance2);
  let darkerLum = Math.min(luminance1, luminance2);

  return (lighterLum + 0.05) / (darkerLum + 0.05);
}

function checkContrast(color1, color2) {
  let [luminance1, luminance2] = [color1, color2].map(color => {
    color = color.startsWith("#") ? color.slice(1) : color;
    let r = parseInt(color.slice(0, 2), 16);
    let g = parseInt(color.slice(2, 4), 16);
    let b = parseInt(color.slice(4, 6), 16);
    return luminance(r, g, b);
  })

  return contrastRatio(luminance1, luminance2);
}

function meetsMinimumRequirements(ratio){
  let didPass = false;
  for (const [level, minRatio] of WCAG_MINIMUM_RATIOS){
    if(ratio < minRatio) break;
    didPass = true;
  }
  return didPass;
}

export function isLegible(background:string, foreground="#000000") {
  var ratio = checkContrast(background, foreground);
  return meetsMinimumRequirements(ratio);
}


