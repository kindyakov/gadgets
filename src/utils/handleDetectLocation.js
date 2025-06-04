export const handleDetectLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.longitude, pos.coords.latitude];
          resolve(coords);
        },
        (err) => {
          reject(err);
        }
      );
    } else {
      reject(new Error('Геолокация не поддерживается в вашем браузере'));
    }
  });
};
