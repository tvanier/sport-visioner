<script>

  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  const dispatch = createEventDispatcher();

  let video;
  const canvas = document.createElement('canvas');

  onMount(startCamera)

  async function startCamera() {
    const constraints = {
      audio: false,
      video: true
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
    } catch (error) {
      console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    }
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

  onDestroy(() => {
    video?.srcObject?.getTracks().forEach((track) => track.stop())
  })

</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video playsinline autoplay bind:this={video}></video>

<button
  class="vtmn-btn vtmn-btn_variant--secondary vtmn-btn_size--small"
  on:click={takeSnapshot}>
  Take snapshot
</button>

<button
  class="vtmn-btn vtmn-btn_variant--ghost vtmn-btn_size--small"
  on:click={cancel}>
  Cancel
</button>
