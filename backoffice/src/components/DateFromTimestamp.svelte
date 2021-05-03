<script lang="ts">
  export let timestamp: any;

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
</script>

{new Date(Date.parse(timestamp)).toLocaleDateString('pl-PL', dateFormatOptions)}
