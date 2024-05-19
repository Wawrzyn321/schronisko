<script lang="ts">
  import { FilterIcon } from 'svelte-feather-icons';
  import { allPermissions } from '../../common/allPermissions';
  import { permissionNames } from '../../common/PermissionsInfo';
  import type { Permission } from '@prisma-app/client';
  import Dropdown from '../shared/Dropdown.svelte';

  function updateFilter(permission: Permission) {
    if (permissionFilter.includes(permission)) {
      permissionFilter = permissionFilter.filter(
        (p: Permission) => p !== permission
      );
    } else {
      permissionFilter = [...permissionFilter, permission];
    }
  }

  export let permissionFilter: Permission[];
</script>

<Dropdown>
  <button slot="trigger" class="g-button-transparent">
    <FilterIcon size="0.8x" />
  </button>
  <div slot="content" class="dropdown-content">
    {#each allPermissions as permission}
      <label>
        <input
          checked={permissionFilter.includes(permission)}
          type="checkbox"
          on:change={() => updateFilter(permission)}
        />
        {permissionNames[permission]}
      </label>
    {/each}
  </div>
</Dropdown>

