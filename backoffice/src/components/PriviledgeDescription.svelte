<script lang="ts">
  import {
    priviledgeDescriptions,
    priviledgeNames,
  } from '../common/PriviledgesInfo';
  import type { PriviledgeType } from './../../../prisma/viewModels/UserViewModel';

  export let priviledgeType: PriviledgeType;
</script>

<section>
  <h2>{priviledgeNames[priviledgeType]}</h2>
  {priviledgeDescriptions[priviledgeType]}
</section>

<style lang="scss">
  h2 {
    font-weight: bolder;
    margin: 24px 0 8px;
  }
</style>
