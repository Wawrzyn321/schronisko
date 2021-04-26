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

<main class="login-form">
  <form on:submit|preventDefault={logIn}>
    <Field label="Email">
      <Input required bind:value={email} placeholder="Email" />
    </Field>
    <Field label="Hasło">
      <Input required bind:value={password} type="password" placeholder="Hasło" />
    </Field>
    <Button
      on:click={logIn}
      type="is-primary"
      nativeType="submit"
      disabled={!email || !password}
      {loading}>Zaloguj</Button
    >
  </form>
  <Notification type="is-danger" bind:active={errorOpen}>
    Wygląda na to, że wprowadzone dane są nieprawidłowe. Jeśli zapomniałeś hasła
    bądź chcesz założyć konto skontaktuj się z administratorem schroniska.
  </Notification>
</main>

<!-- <Field label="Username" type="is-success" message="Username is available">
  <Input value="joey55" />
</Field> -->
<style lang="scss">
  .login-form   {
    margin: 20px auto 0;
    max-width: 360px;
  }
</style>
