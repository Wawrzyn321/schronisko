<script lang="ts">
  import type { Permission } from '.prisma/client';
  import { Field } from 'svelma';

  import {
    permissionNames,
    permissionDescriptions,
  } from '../../common/PermissionsInfo';

  export let permissions: Permission[] = [];
  export let updatePermissions: (p: Permission[]) => void;

  const allPermissions: Permission[] = [
    'USER',
    'PAGE',
    'NEWS',
    'ANIMAL',
  ];

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
