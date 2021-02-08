<script>
  export let prediction
  export let expected

  $: predictedSport = prediction?.sport?.length > 0 ? prediction.sport[0] : null
  $: predictedProbablity = predictedSport ? (predictedSport.probability * 100).toFixed(2) : 0

  let message = ''
  $: {
    if (expected) {
      console.log('prediction', { expected, predicted: predictedSport })
      if (expected.id == predictedSport.id) {
        message = `Correct! This image shows ${predictedSport.name}`
      } else {
        message = `Oops, looks like this image shows ${predictedSport.name} at ${predictedProbablity}%`
      }
    } else {
      message = `This image shows ${predictedSport.name}`
    }
  }
</script>

<p>{message}</p>

<small>Found {prediction?.sport?.length ?? 0} sports</small>
<ul>
  {#each prediction?.sport as sport}
  <li><small>{sport.name} at {(sport.probability * 100).toFixed(2)}%</small></li>
  {/each}
</ul>

