<script lang="ts">
  import type { UserViewModel } from '../../../prisma/viewModels/UserViewModel';
  import { Button } from 'svelma';
  import type { ListAction } from '../components/ListAction';

  export let entry: UserViewModel;
  export let actions: ListAction[];

  const resolveActionType = (action: ListAction) => {
    return {
      'delete': "is-danger",
      'edit': "is-info",
    }[action.type];
  }
</script>

<tr>
  <td>{entry.firstName}</td>
  <td>{entry.lastName}</td>
  <td>{entry.email}</td>
  <td style="text-align: center;">{entry.isActive ? 'TAK' : 'NIE'}</td>
  <td style="text-align: right;">
    {#each actions as action}
    <Button disabled={action.disabled} type={resolveActionType(action)} on:click={action.func(entry)}/>
    {/each}
  </td>
</tr>
