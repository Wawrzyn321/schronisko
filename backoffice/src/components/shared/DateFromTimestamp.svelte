<script lang="ts">
  export let timestamp: string | Date;
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

{(typeof timestamp === 'string' ? new Date(Date.parse(timestamp)) : timestamp).toLocaleDateString('pl-PL', dateFormatOptions)}
