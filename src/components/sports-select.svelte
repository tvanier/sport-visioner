<script>
  import { createEventDispatcher } from 'svelte';
  import Select from 'svelte-select';
  import { getSports } from '../api';

  const dispatch = createEventDispatcher();

  export let placeholder = 'Select a sport';
  let sports = [];

  getSports().then(({ data }) => {
    console.log(`found ${data.length} sports`);

    sports = data
      .map((d) => ({
        value: d.id,
        label: d.attributes.name || '',
        slug: d.attributes.slug,
        images: d.relationships?.images?.data ?? []
      }))
      .sort((sport1, sport2) => {
        return sport1.label < sport2.label ? -1 : 1;
      });
  });

  function getOptionLabel(option) {
    const firstImage = option?.images?.[0];
    const imageSrc = firstImage?.variants?.[0].thumbnail?.url ?? firstImage?.url;

    if (!imageSrc) {
      return option.label;
    }

    return `
      <div style="display: flex; align-items: center;">
        <img src="${imageSrc}" style="max-width: 34px; max-height: 34px; margin-right: 10px;" />
        ${option.label}
      </div>
    `;
  }

  function onSelect(evt) {
    const { value: id, label: name } = evt.detail;
    const selectedSport = { id, name };
    dispatch('select', selectedSport);
  }
</script>

<Select
  containerStyles={'max-width: 300px'}
  items={sports}
  getOptionLabel={getOptionLabel}
  {placeholder}
  onselect={onSelect}
  onclear
/>
