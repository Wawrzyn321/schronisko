<script lang="ts">
  import { ExternalLinkIcon } from 'svelte-feather-icons';

  export let href: string;
  export let disabled: Boolean | undefined = undefined;
</script>

<a
  class={`external-link ${disabled ? 'external-link--disabled' : ''}`}
  {href}
  target="_blank"
  aria-label="Otwórz w nowej karcie"
>
  <span>
    <ExternalLinkIcon size="1.0x" />
  </span>
</a>

<style lang="scss">
  .external-link {
    width: 40px;
    height: 40px;
    line-height: 40px;

    display: inline-flex;
    place-content: center;

    background-color: #00d1b2;
    color: #fff;
    border-width: 1px;
    border-radius: 4px;
  }

  .external-link:visited {
    color: #fff;
  }

  .external-link:hover {
    color: #fff;
    background-color: #00c4a7;
  }

  .external-link--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
