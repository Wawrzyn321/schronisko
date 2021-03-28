<script lang="ts">
  import { auth, login } from './../auth.context';
  import { push } from 'svelte-spa-router';

  import { Field, Input, Button, Notification } from 'svelma';

  let email: string;
  let password: string;
  let loading: boolean = false;
  let errorOpen: boolean = false;

  async function logIn() {
    try {
      loading = true;
      await login(email, password);
      push('/profile');
    } catch (e) {
      console.warn(e);
      errorOpen = true;
    } finally {
      loading = false;
    }
  }

  if ($auth) {
    push('/profile');
  }
</script>

<form on:submit|preventDefault={logIn}>
  <Field label="Email">
    <Input bind:value={email} placeholder="Email" />
  </Field>
  <Field label="Hasło">
    <Input bind:value={password} type="password" placeholder="Hasło" />
  </Field>
  <Button
    on:click={logIn}
    type="is-primary"
    nativeType="submit"
    disabled={!email || !password}
    {loading}>Zaloguj</Button
  >
  <Notification type="is-danger" bind:active={errorOpen}>
    Wygląda na to, że wprowadzone dane są nieprawidłowe. Jeśli zapomniałeś hasła
    bądź chcesz założyć konto skontaktuj się z administratorem schroniska.
  </Notification>
</form>

<!-- <Field label="Username" type="is-success" message="Username is available">
  <Input value="joey55" />
</Field> -->
<style lang="scss">
  form   {
    margin: 20px auto 0;
    max-width: 320px;
  }
</style>
