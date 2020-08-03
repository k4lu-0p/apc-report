export const getCurrentPosition = new Promise((resolve, reject) => {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(resolve, reject);
  }

  return reject(new Error('Impossible de récupérer les coordonnées actuelles...'));
});

export default { getCurrentPosition };
