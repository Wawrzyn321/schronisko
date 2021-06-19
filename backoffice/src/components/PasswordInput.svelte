<script lang="ts">
  import { Field, Input } from 'svelma';

  export let label = 'Hasło';
  export let message = '';
  export let plain = false;
  export let password: string;
</script>

<Field {label} message={message}>
  <Input
    required
    type={plain ? 'text' : 'password'}
    bind:value={password}
    placeholder={label}
  />
</Field>
