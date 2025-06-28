const data = [
  {
    location: "Dhaka",
    latitude: 23.8041,
    longitude: 90.4152,
  },
  {
    location: "Rangpur",
    latitude: 25.7569,
    longitude: 89.2754,
  },
  {
    location: "Europe",
    latitude: 54.526,
    longitude: 15.2551,
  },
  {
    location: "New York",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    location: "Tokyo",
    latitude: 35.6762,
    longitude: 139.6503,
  },
  {
    location: "Sydney",
    latitude: -33.8688,
    longitude: 151.2093,
  },
  {
    location: "Cape Town",
    latitude: -33.9249,
    longitude: 18.4241,
  },
  {
    location: "Moscow",
    latitude: 55.7558,
    longitude: 37.6173,
  },
  {
    location: "Rio de Janeiro",
    latitude: -22.9068,
    longitude: -43.1729,
  },
  {
    location: "Mumbai",
    latitude: 19.076,
    longitude: 72.8777,
  },
];

function getLocations() {
  return data;
}

function getLocationByName(location) {
  if (!location) return null;
  const filteredData = data.filter(
    (item) => item.location.toLowerCase() === location.toLowerCase()
  );

  if (filteredData.length > 0) {
    return filteredData[0];
  } else {
    const defaultLocation = {
      location: "",
      latitude: 0,
      longitude: 0,
    };
    return defaultLocation;
  }
}

export { getLocationByName, getLocations };
