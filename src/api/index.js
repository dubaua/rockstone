const getCollectionByKey = key =>
  fetch(
    `/cockpit/api/collections/get/${key}?token=${
      process.env.VUE_APP_COCKPIT_KEY
    }`
  )
    .then(response => response.json())
    .then(blob => blob.entries);

const getRegionByKey = key =>
  fetch(
    `/cockpit/api/regions/data/${key}?token=${process.env.VUE_APP_COCKPIT_KEY}`
  )
    .then(response => response.json())
    .then(blob => blob);

export default { getCollectionByKey, getRegionByKey };
