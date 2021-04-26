<script lang="ts">
  import type { Priviledge } from '../prisma-types/priviledges';

  import {
    priviledgeDescriptions,
    priviledgeNames,
  } from '../common/PriviledgesInfo';

  export let priviledgeType: Priviledge;
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
