<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let label = 'Select an image';

  function onInputChange(event) {
    const fileList = event.target.files;
    const file = fileList[0];

    // Check if the file is an image.
    if (file.type && file.type.indexOf('image') === -1) {
      console.log('File is not an image.', file.type, file);
      return;
    }

    dispatch('image-file', {
      image: file,
    });
  }
</script>

<style>
  label:hover {
    cursor: pointer;
  }
</style>

<button
  class="vtmn-btn vtmn-btn_variant--secondary vtmn-btn_size--small"
>
  <label>
    {label}
    <input type="file" accept=".jpg, .jpeg, .png"
      onchange={onInputChange}
      data-testid="input" style="display: none;" />
  </label>
</button>
