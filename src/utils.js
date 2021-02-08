export const createImageSource = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
      resolve(event.target.result)
    });

    reader.onerror = reject

    reader.readAsDataURL(imageFile);
  })
}
