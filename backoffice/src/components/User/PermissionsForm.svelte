<script lang="ts">
  import { Permission } from '@prisma-app/client';
  import { Field } from 'svelma';
  import { allPermissions } from '../../common/allPermissions';

  import {
    permissionNames,
    permissionDescriptions,
  } from '../../common/PermissionsInfo';

  export let permissions: Permission[] = [];
  export let updatePermissions: (p: Permission[]) => void;

  const switchPermission = (permission: Permission) => (e: any) => {
    if (e.target.checked) {
      if (permission === Permission.ANIMAL) {
        updatePermissions(
          [...permissions, permission].filter(
            (p) => p !== Permission.ANIMAL_VIEW_ONLY
          )
        );
      } else {
        updatePermissions([...permissions, permission]);
      }
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
            disabled={permission === Permission.ANIMAL_VIEW_ONLY &&
              permissions.includes(Permission.ANIMAL)}
          />
          <abbr title={permissionDescriptions[permission]}>
            {permissionNames[permission]}
          </abbr>
        </label>
      </li>
    {/each}
  </ul>
</Field>
