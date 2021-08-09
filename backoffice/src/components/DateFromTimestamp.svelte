<script lang="ts">
  export let timestamp: any;
  export let showHour = false;

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(showHour
      ? { hour: 'numeric', minute: 'numeric', second: 'numeric' }
      : {}),
  };
</script>

{new Date(Date.parse(timestamp)).toLocaleDateString('pl-PL', dateFormatOptions)}
