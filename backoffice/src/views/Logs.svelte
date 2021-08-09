<script lang="ts">
  import type { Logs } from '@prisma/client';
  import { onMount } from 'svelte';
  import { logsService } from '../services/LogsService';
  import { notifyError } from '../contexts/notification.context';
  import Loader from './../components/Loader.svelte';
  import EmptyListMessage from '../components/EmptyListMessage.svelte';
  import DateFromTimestamp from '../components/DateFromTimestamp.svelte';
  import PermissionFilteringDropdown from '../components/Logs/PermissionFilteringDropdown.svelte';
  import {
    createDefaultParams,
    filterLogs,
  } from '../components/Logs/LogsFilteringParams';
  import type { LogsFilteringParams } from '../components/Logs/LogsFilteringParams';
  import { permissionNames } from '../common/PermissionsInfo';
import LogsHeader from '../components/Logs/LogsHeader.svelte';

  let logs: Logs[] = [];
  let filteringParams: LogsFilteringParams = createDefaultParams();
  let loading = false;

  onMount(async () => {
    loading = true;
    try {
      logs = await logsService.getAll();
      loading = false;
    } catch (e) {
      notifyError({ message: 'Nie można pobrać logów: ' + e.message });
    }
  });

  $: filteredLogs = filterLogs(logs, filteringParams);
</script>

<main>
  <LogsHeader bind:filteringParams/>
  <table class="table is-fullwidth">
    <tr>
      <th>ID użytkownika</th>
      <th>
        <div style="display: flex">
          <span>Domena</span>
          <PermissionFilteringDropdown
            bind:permissionFilter={filteringParams.permissionFilter}
          />
        </div>
      </th>
      <th>Login użytkownika</th>
      <th>Akcja</th>
      <th>Data</th>
    </tr>
    {#each filteredLogs as log}
      <tr>
        <td>{log.id}</td>
        <td>{permissionNames[log.permission]}</td>
        <td>{log.login}</td>
        <td>{log.message}</td>
        <td> <DateFromTimestamp timestamp={log.time} showHour={true} /></td>
      </tr>
    {/each}
  </table>
  {#if loading}
    <Loader />
  {/if}
  {#if !loading && !logs.length}
    <EmptyListMessage entityType="logów" />
  {/if}
</main>
