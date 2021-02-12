<script>
  import { tick } from 'svelte';
  import Header from './components/header.svelte';
  import ImagePicker from './components/image-picker.svelte';
  import SportsSelect from './components/sports-select.svelte';
  import SportsPrediction from './components/sports-prediction.svelte';
  import { classifySport } from './api';
  import { createImageSource, resizeImage } from './utils';

  let buttonRef;

  let imageFile;
  let imageBlob;
  let imageSrc;
  $: if (imageFile) {
    createImageSource(imageFile)
      .then(resizeImage)
      .then(({ dataURL, blob }) => {
        imageSrc = dataURL
        imageBlob = blob
      })
      .then(() => tick()) // allow SportsSelect to render
      .then(() => {
        const selectInput = document.querySelector('.sports-select input');
        selectInput?.focus();
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

  async function predict() {
    predicting = true;
    try {
      prediction = null;
      const { data } = await classifySport(imageBlob);
      prediction = data;
    } finally {
      predicting = false;
    }
  }

  function onSportSelected(evt) {
    console.log('selected sport', evt.detail);
    expectedSport = evt.detail;
    buttonRef?.focus();
  }
</script>

<Header />

<ImagePicker label="Select a sport image" on:image-file={onImageFile} />

{#if imageSrc}
  <img src={imageSrc} alt="Selected" />

  <SportsSelect
    class="sports-select"
    isDisabled={predicting}
    placeholder="Select sport of the image above"
    on:select={onSportSelected}
    on:clear={(expectedSport = null)}
  />

  <button
    bind:this={buttonRef}
    class="vtmn-btn vtmn-btn_size--small"
    disabled={predicting}
    on:click={predict}>{predicting ? `Analyzing...` : `Let's check!`}</button
  >
{/if}

{#if prediction}
  <SportsPrediction {prediction} expected={expectedSport} />
{/if}
