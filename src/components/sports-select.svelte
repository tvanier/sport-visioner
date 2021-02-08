<script>
  import { createEventDispatcher } from 'svelte'
  import Select from 'svelte-select'
  import { getSports } from '../api'

  const dispatch = createEventDispatcher()

  export let placeholder = 'Select a sport'
  let sports = []

  getSports().then(({ data }) => {
    console.log(`found ${data.length} sports`)

    sports = data
      .map(d => ({
        value: d.id,
        label: d.attributes.name || ''
      }))
      .sort((sport1, sport2) => {
        return sport1.label < sport2.label ? -1 : 1
      })
  })

  function onSelect(evt) {
    const { value: id, label: name } = evt.detail
    const selectedSport = { id, name }
    dispatch('select', selectedSport)
  }
</script>

<Select containerClasses="sports-select" items={sports} placeholder={placeholder}
  on:select={onSelect} on:clear />
