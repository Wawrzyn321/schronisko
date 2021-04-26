<script lang="ts">
  import { Field } from 'svelma';
  import { priviledges as allPriviledges } from '../../prisma-types/priviledges';
  import type { Priviledge } from '../../prisma-types/priviledges';

  import {
    priviledgeNames,
    priviledgeDescriptions,
  } from '../../common/PriviledgesInfo';

  export let priviledges: Priviledge[];
  export let updatePriviledges: (p: Priviledge[]) => void;

  const switchPriviledge = (priviledge: Priviledge) => (e: any) => {
    if (e.target.checked) {
      updatePriviledges([...priviledges, priviledge]);
    } else {
      updatePriviledges(priviledges.filter((p) => p !== priviledge));
    }
  };
</script>

<Field label="Uprawnienia">
  <ul>
    {#each allPriviledges as priviledge}
      <li>
        <label>
          <input
            checked={priviledges.includes(priviledge)}
            type="checkbox"
            on:change={switchPriviledge(priviledge)}
          />
          <abbr title={priviledgeDescriptions[priviledge]}>
            {priviledgeNames[priviledge]}
          </abbr>
        </label>
      </li>
    {/each}
  </ul>
</Field>
