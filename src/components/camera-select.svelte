<script>
  import { createEventDispatcher, onMount } from 'svelte'

  const dispatch = createEventDispatcher();

  let cameras = []
  let value

  onMount(() => {
    enumerateCameras()

    navigator.mediaDevices?.ondevicechange?.(enumerateCameras)
  })

  const enumerateCameras = async () => {
    const devices = await navigator.mediaDevices?.enumerateDevices?.() ?? [];
    cameras = devices.filter((device) => device.kind === 'videoinput');
    console.log('cameras', cameras);
    value = value || cameras[0];
    return cameras;
  }

  function onChange() {
    dispatch('select', {
      camera: value
    })
  }
</script>

<style>
  select {
    height: 2rem;
    max-width: 220px;
  }
</style>

<!-- svelte-ignore a11y-no-onchange -->
<select bind:value onchange={onChange}>
  {#each cameras as camera}
  <option value={camera}>{camera.label}</option>
  {/each}
</select>
