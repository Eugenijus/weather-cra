export const weatherCodes = new Map([
  [0, 'Clear sky'],
  [1, 'Mainly clear'],
  [2, 'Partly cloudy'],
  [3, 'Overcast'],
  [45, 'Fog and depositing rime fog'],
  [48, 'Fog and depositing rime fog'],
  [51, 'Drizzle: Light intensity'],
  [53, 'Drizzle: Moderate intensity'],
  [55, 'Drizzle: Dense intensity'],
  [56, 'Freezing Drizzle: Light intensity'],
  [57, 'Freezing Drizzle: Dense intensity'],
  [61, 'Rain: Slight intensity'],
  [63, 'Rain: Moderate intensity'],
  [65, 'Rain: Heavy intensity'],
  [66, 'Freezing Rain: Light intensity'],
  [67, 'Freezing Rain: Heavy intensity'],
  [71, 'Snow fall: Slight intensity'],
  [73, 'Snow fall: Moderate intensity'],
  [75, 'Snow fall: Heavy intensity'],
  [77, 'Snow grains'],
  [80, 'Rain showers: Slight intensity'],
  [81, 'Rain showers: Moderate intensity'],
  [82, 'Rain showers: Violent intensity'],
  [85, 'Snow showers: Slight intensity'],
  [86, 'Snow showers: Heavy intensity'],
  [95, 'Thunderstorm: Slight or moderate'],
  [96, 'Thunderstorm with slight hail'],
  [99, 'Thunderstorm with heavy hail'],
]);

export const IMAGE_ICON_MAP = new Map();

addImageMapping([0, 1], '01d');
addImageMapping([2], '02d');
addImageMapping([3], '03d');
addImageMapping([45, 48], '50d');
addImageMapping([51, 53, 56, 61, 63, 66, 80, 81, 82], '09d');
addImageMapping([55, 57, 65, 67], '10d');
addImageMapping([71, 73, 75, 77, 85, 86], '13d');
addImageMapping([95, 96, 99], '11d');

function addImageMapping(values, icon) {
  values.forEach((value) => {
    IMAGE_ICON_MAP.set(value, icon);
  });
}

export const ICON_MAP = new Map();

addMapping([0, 1], 'sun');
addMapping([2], 'cloud-sun');
addMapping([3], 'cloud');
addMapping([45, 48], 'smog');
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], 'cloud-showers-heavy');
addMapping([71, 73, 75, 77, 85, 86], 'snowflake');
addMapping([95, 96, 99], 'cloud-bolt');

function addMapping(values, icon) {
  values.forEach((value) => {
    ICON_MAP.set(value, icon);
  });
}

export function getSVGIconUrl(iconCode) {
  return `icons/${ICON_MAP.get(iconCode)}.svg`;
}

export function getPNGIconUrl(iconCode) {
  return `iconsPNG/${IMAGE_ICON_MAP.get(iconCode)}.png`;
}
