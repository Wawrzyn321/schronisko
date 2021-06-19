<script lang="ts">
  import { isLoggedIn, logIn } from '../contexts/auth.context';
  import { push } from 'svelte-spa-router';

  import { Field, Input, Button, Notification } from 'svelma';

  let login: string;
  let password: string;
  let loading: boolean = false;
  let errorOpen: boolean = false;

  async function logInFn() {
    try {
      loading = true;
      await logIn(login, password);
      push('/profile');
    } catch (e) {
      console.warn(e);
      errorOpen = true;
    } finally {
      loading = false;
    }
  }

  if (isLoggedIn()) {
    push('/profile');
  }
</script>

<main class="login-form">
  <form on:submit|preventDefault={logInFn}>
    <Field label="Login">
      <Input required bind:value={login} placeholder="Login" />
    </Field>
    <Field label="Hasło">
      <Input required bind:value={password} type="password" placeholder="Hasło" />
    </Field>
    <Button
      type="is-primary"
      nativeType="submit"
      disabled={!login || !password}
      {loading}>
      Zaloguj
      </Button>
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
