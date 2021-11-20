<script lang="ts">
  import { onMount, setContext } from 'svelte';

  function omit(obj: any, ...keysToOmit: string[]) {
    return Object.keys(obj).reduce((acc, key) => {
      if (keysToOmit.indexOf(key) === -1) acc[key] = obj[key];
      return acc;
    }, {});
  }

  export let noStar: boolean = false;

  /** Type (color) of the field and help message. Also adds a matching icon.
   * @svelte-prop {String} [type]
   * @values $$colors$$
   * */
  export let type = '';

  /** Label for input
   * @svelte-prop {String} [label]
   * */
  export let label: string;

  /** Same as native <code>for</code> on label
   * @svelte-prop {String} [labelFor]
   * */
  export let labelFor = '';

  /** Message to show beneath input
   * @svelte-prop {String} [message]
   * */
  export let message = '';

  /** Direct child components/elements of Field will be grouped horizontally
   * @svelte-prop {Boolean} grouped=false
   * */
  export let grouped = false;

  /** Allow grouped controls to cover multiple lines
   * @svelte-prop {Boolean} groupMultiline=false
   * */
  export let groupMultiline = false;

  /** Alter the alignment of the field
   * @svelte-prop {String} [position]
   * @values is-centered, is-right
   * */
  export let position = '';

  /** Automatically attach child controls together
   * @svelte-prop {Boolean} addons=true
   * */
  export let addons = true;

  export let expanded = false;

  export let required = false;

  setContext('type', () => type);

  let el: any;
  let labelEl: any;
  let messageEl: any;
  let fieldType = '';
  let mounted = false;
  let newPosition = '';

  $: {
    if (grouped) fieldType = 'is-grouped';
    else if (mounted) {
      const childNodes = Array.prototype.filter.call(
        el.children,
        (c: any) => ![labelEl, messageEl].includes(c)
      );
      if (childNodes.length > 1 && addons) {
        fieldType = 'has-addons';
      }
    }
  }

  // Update has-addons-* or is-grouped-* classes based on position prop
  $: {
    if (position) {
      const pos = position.split('-');
      if (pos.length >= 1) {
        const prefix = grouped ? 'is-grouped-' : 'has-addons-';
        newPosition = prefix + pos[1];
      }
    }
  }

  $: props = {
    ...omit(
      $$props,
      'addons',
      'class',
      'expanded',
      'grouped',
      'label',
      'labelFor',
      'position',
      'type'
    ),
  };

  onMount(() => {
    mounted = true;
  });
</script>

<div
  {...props}
  class="field {type} {fieldType} {newPosition} {$$props.class || ''}"
  class:is-expanded={expanded}
  class:is-grouped-multiline={groupMultiline}
  bind:this={el}
>
  <label
    for={labelFor}
    class="label"
    bind:this={labelEl}
    class:is-required={required}
    class:no-star={noStar}
  >
    {label}
  </label>
  <slot statusType={type} />
  {#if message}
    <p class="help {type}" bind:this={messageEl}>{message}</p>
  {/if}
</div>

<style lang="scss">
  .field {
    &.is-grouped {
      .field {
        flex-shrink: 0;

        &:not(:last-child) {
          margin-right: 0.75rem;
        }

        &.is-expanded {
          flex-grow: 1;
          flex-shrink: 1;
        }
      }
    }

    .is-required::after {
      content: '*';
      margin-left: 4px;
      color: #ff6640;
    }

    .is-required.no-star::after {
      content: '';
    }
  }
</style>
