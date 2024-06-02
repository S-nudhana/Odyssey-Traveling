const getDistance = (lat1, long1, lat2, long2) => {
  const R = 6371;
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(long2 - long1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

const degToRad = (deg) => {
  return deg * (3.14159 / 180);
};

export default getDistance;
