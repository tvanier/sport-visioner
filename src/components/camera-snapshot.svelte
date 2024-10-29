<script>
  import CameraSelect from './camera-select.svelte'
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  const dispatch = createEventDispatcher();

  let video;
  const canvas = document.createElement('canvas');

  let gotUserMedia = false;

  onMount(startCamera)

  async function startCamera(deviceId) {
    stopVideo();

    const constraints = {
      audio: false,
      video: { deviceId }
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
      gotUserMedia = true;
    } catch (error) {
      console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    }
  }

  function onCameraSelect({ detail }) {
    startCamera(detail?.camera?.deviceId);
  }

  function takeSnapshot() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      dispatch('snapshot', {
        blob,
        dataURL: canvas.toDataURL()
      })
    })
  }

  function cancel() {
    dispatch('cancel')
  }

  function stopVideo() {
    video?.srcObject?.getTracks().forEach((track) => track.stop());
  }

  onDestroy(() => {
    stopVideo()
  })

</script>

<style>
  video {
    height: 300px;
    display: block;
  }
  .vtmn-btn_variant--ghost {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    min-width: auto;
  }
</style>

<!-- svelte-ignore a11y-media-has-caption -->
<video playsinline autoplay bind:this={video}></video>

{#if gotUserMedia}
<CameraSelect onselect={onCameraSelect}></CameraSelect>
{/if}

<button
  class="vtmn-btn vtmn-btn_variant--secondary vtmn-btn_size--small"
  onclick={takeSnapshot}>
  Take snapshot
</button>

<button
  class="vtmn-btn vtmn-btn_variant--ghost vtmn-btn_size--small"
  onclick={cancel}>
  Cancel
</button>
