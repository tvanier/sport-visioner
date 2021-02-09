<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let label = 'Select an image';

  function onInputChange(event) {
    const fileList = event.target.files;
    console.log(fileList);

    readImage(fileList[0]);
  }

  function readImage(file) {
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

<form>
  <label>
    {label}
    <input type="file" accept=".jpg, .jpeg, .png" on:change={onInputChange} />
  </label>
</form>
