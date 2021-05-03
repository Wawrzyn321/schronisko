<script lang="ts">
  import { Field } from 'svelma';
  import { allPermissions } from '../../prisma-types/permissions';
  import type { Permission } from '../../prisma-types/permissions';

  import {
    permissionNames,
    permissionDescriptions,
  } from '../../common/PermissionsInfo';

  export let permissions: Permission[] = [];
  export let updatePermissions: (p: Permission[]) => void;

  const switchPermission = (permission: Permission) => (e: any) => {
    if (e.target.checked) {
      updatePermissions([...permissions, permission]);
    } else {
      updatePermissions(permissions.filter((p) => p !== permission));
    }
  };
</script>

<Field label="Uprawnienia">
  <ul>
    {#each allPermissions as permission}
      <li>
        <label>
          <input
            checked={permissions.includes(permission)}
            type="checkbox"
            on:change={switchPermission(permission)}
          />
          <abbr title={permissionDescriptions[permission]}>
            {permissionNames[permission]}
          </abbr>
        </label>
      </li>
    {/each}
  </ul>
</Field>
