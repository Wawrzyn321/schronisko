<script lang="ts">
  import { substitutionDescriptions } from '../../services/substitutions';
</script>

<div>
  Możesz używać podstawień w treści:
  <dl>
    {#each Object.entries(substitutionDescriptions) as [toSubsitute, description]}
      <dt>{toSubsitute}</dt>
      <dd>{description}</dd>
      <br />
    {/each}
  </dl>
</div>

<style lang="scss">
  dt {
    font-weight: bolder;
    margin-left: 24px;
  }

  dt::after {
    content: ' - ';
    font-weight: normal;
  }

  dt,
  dd {
    display: inline-block;
  }
</style>
