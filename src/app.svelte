<script>
  import { tick } from 'svelte';
  import Header from './components/header.svelte';
  import CameraSnapshot from './components/camera-snapshot.svelte';
  import ImagePicker from './components/image-picker.svelte';
  import SportsSelect from './components/sports-select.svelte';
  import SportsPrediction from './components/sports-prediction.svelte';
  import { classifySport } from './api';
  import { createImageSource, resizeImage } from './utils';

  let predictButton;

  let takePhotoButton;
  let takingPhoto;

  let imageFile;
  let imageBlob;
  let imageSrc;
  $: if (imageFile) {
    createImageSource(imageFile)
      .then(resizeImage)
      .then(({ dataURL, blob }) => {
        imageSrc = dataURL
        imageBlob = blob
        takingPhoto = false
      })
      .catch((error) => {
        console.log('cannot create image source', error);
      })
  }

  let expectedSport;
  let predicting;
  let prediction;

  function onImageFile({ detail }) {
    imageFile = detail.image;
    prediction = null;
  }

  function reset() {
    imageFile = null;
    imageBlob = null;
    imageSrc = null;
    takingPhoto = false;
    prediction = null;
  }

  async function predict() {
    predicting = true;
    try {
      prediction = null;
      const { data } = await classifySport(imageBlob);
      if (imageFile) {
        prediction = data;
      }
    } finally {
      predicting = false;
    }
  }

  function onSportSelected(evt) {
    console.log('selected sport', evt.detail);
    expectedSport = evt.detail;
    predictButton?.focus();
  }

  function takePhoto() {
    imageSrc = null
    prediction = null
    takingPhoto = true
  }

  function onCameraSnapshot({ detail }) {
    prediction = null
    imageFile = detail.blob
  }

  function onCameraCancel() {
    takingPhoto = false
    prediction = null
  }
</script>

<style>
  .initial-actions > button {
    margin: 3px 0;
  }
  img {
    max-width: 100%;
  }
</style>

<Header />

{#if !takingPhoto && !imageSrc}
<div class="initial-actions">
  <p>Take a photo or pick a local image, and let the visioner predict what sport(s) are included in the picture.</p>
  <button
    bind:this={takePhotoButton}
    class="vtmn-btn vtmn-btn_variant--secondary vtmn-btn_size--small"
    on:click={takePhoto}>
    Take a photo
  </button>
  <span>or</span>
  <ImagePicker label="Select a sport image" on:image-file={onImageFile} />
</div>
{:else if takingPhoto}
  <CameraSnapshot on:snapshot={onCameraSnapshot} on:cancel={onCameraCancel}></CameraSnapshot>
{/if}

{#if imageSrc}
  <img src={imageSrc} alt="Selected" />

  <p>Optionally, pre-select a sport to try to match the visioner's prediction</p>
  <SportsSelect
    class="sports-select"
    isDisabled={predicting}
    placeholder="Select sport of the image above"
    on:select={onSportSelected}
    on:clear={(expectedSport = null)}
  />

  <button
    bind:this={predictButton}
    class="vtmn-btn vtmn-btn_size--small"
    disabled={predicting}
    on:click={predict}>
    {predicting ? `Analyzing...` : `Let's find sports!`}
  </button>
  <button
    class="vtmn-btn vtmn-btn_variant--secondary vtmn-btn_size--small"
    on:click={reset}>
    Try another image
  </button>

{/if}

{#if prediction}
  <SportsPrediction {prediction} expected={expectedSport} />
{/if}
