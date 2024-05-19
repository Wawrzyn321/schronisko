<script lang="ts">
  import type { Permission } from '@prisma-app/client';
  import {
    permissionDescriptions,
    permissionNames,
  } from '../../common/PermissionsInfo';

  export let permissionType: Permission;
</script>

<section>
  <h2>{permissionNames[permissionType]}</h2>
  {permissionDescriptions[permissionType]}
</section>

<style lang="scss">
  h2 {
    font-weight: bolder;
    margin: 24px 0 8px;
  }
</style>
