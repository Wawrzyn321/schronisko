<script lang="ts">
    export let entry;
  </script>
  
<tr>
    <td>{entry.name}</td>
    <td>{entry.number < 0 ? entry.number : 'brzydko'}</td>
    <td><a href="/#/">{entry.other}</a></td>
</tr>
  