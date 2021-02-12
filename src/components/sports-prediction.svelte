<script>
  export let prediction = null;
  export let expected = null;

  const displayProbability = (sport) => ((sport?.probability ?? 0) * 100).toFixed(2)

  $: predictedSport = prediction?.sport?.[0] ?? { name: 'unknown' };
  $: predictedProbablity = displayProbability(predictedSport)

  let message = '';
  $: {
    if (expected) {
      if (expected.id == predictedSport.id) {
        message = `Correct! This image shows ${predictedSport.name}`;
      } else {
        message = `Oops, looks like this image shows ${predictedSport.name} at ${predictedProbablity}%`;
      }
    } else {
      message = `This image shows ${predictedSport.name}`;
    }
  }
</script>

<p data-testid="message">{message}</p>

<small data-testid="small-text">Found {prediction?.sport?.length ?? 0} sports</small>
<ul>
  {#each prediction?.sport ?? [] as sport}
    <li>
      <small>{sport.name} at {displayProbability(sport)}%</small>
    </li>
  {/each}
</ul>
