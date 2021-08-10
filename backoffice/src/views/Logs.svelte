<script lang="ts">
  import type { Logs } from '@prisma/client';
  import { onMount } from 'svelte';
  import { logsService } from '../services/LogsService';
  import { notifyError } from '../contexts/notification.context';
  import Loader from '../components/shared/Loader.svelte';
  import EmptyListMessage from '../components/shared/EmptyListMessage.svelte';
  import DateFromTimestamp from '../components/shared/DateFromTimestamp.svelte';
  import PermissionFilteringDropdown from '../components/Logs/PermissionFilteringDropdown.svelte';
  import {
    createDefaultParams,
    filterLogs,
  } from '../components/Logs/LogsFilteringParams';
  import type { LogsFilteringParams } from '../components/Logs/LogsFilteringParams';
  import { permissionNames } from '../common/PermissionsInfo';
  import LogsHeader from '../components/Logs/LogsHeader.svelte';
  import Pagination from '../components/shared/Pagination/Pagination.svelte';
  import { paginate } from '../components/shared/Pagination/pagination';
  import { auth } from '../contexts/auth.context';

  let logs: Logs[] = [];
  let filteringParams: LogsFilteringParams = createDefaultParams();
  let loading = false;

  let currentPage = 0;
  let pageSize = 10;

  onMount(async () => {
    loading = true;
    try {
      logs = await logsService.getInitial();
      loading = false;
      logs = await logsService.getAll();
    } catch (e) {
      notifyError({ message: 'Nie można pobrać logów: ' + e.message });
    }
  });

  $: filteredLogs = filterLogs(logs, filteringParams, $auth?.user?.login || '');

  $: paginatedLogs = paginate(filteredLogs, pageSize, currentPage);
</script>

<main>
  <LogsHeader bind:filteringParams />
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
    {#each paginatedLogs as log}
      <tr>
        <td>{log.userId}</td>
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
  {#if !loading && !filteredLogs.length}
    <EmptyListMessage entityType="logów" />
  {/if}
  {#if !loading && logs.length}
    <Pagination
      bind:pageSize
      itemsCount={filteredLogs.length}
      bind:currentPage
    />
  {/if}
</main>
