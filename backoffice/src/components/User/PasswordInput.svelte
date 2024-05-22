<script lang="ts">
  import Field from './../shared/Field.svelte'
  import { Input } from 'svelma';

  export let label = 'Hasło';
  export let minLength: number | undefined = undefined
  export let message = '';
  export let plain = false;
  export let password: string;
  export let autocomplete: string = '';
</script>

<Field {label} message={message} required>
  <Input
    required
    type={plain ? 'text' : 'password'}
    bind:value={password}
    placeholder={label}
    minlength={minLength}
    {autocomplete}
  />
</Field>
