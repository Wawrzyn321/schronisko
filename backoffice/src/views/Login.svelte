<script lang="ts">
  import { logIn, LOGOUT_NOTIFY_PARAMS } from '../contexts/auth.context';
  import { push } from 'svelte-spa-router';

  import { Field, Input, Button, Notification } from 'svelma';
  import { onMount } from 'svelte';
  import { notify } from '../contexts/notification.context';
  import type { NotifyParams } from '../contexts/notification.context';

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
      errorOpen = true;
    } finally {
      loading = false;
    }
  }

  function tryGetLogoutReason(): NotifyParams | null {
    try {
      const reasonStr = localStorage.getItem(LOGOUT_NOTIFY_PARAMS) || 'null';
      localStorage.removeItem(LOGOUT_NOTIFY_PARAMS);
      return JSON.parse(reasonStr);
    } catch (_) {
      return null;
    }
  }

  onMount(() => {
    const logoutReason = tryGetLogoutReason(/*get(querystring)*/);
    if (logoutReason) {
      notify(logoutReason);
    }
  });
</script>

<main class="login-form">
  <form on:submit|preventDefault={logInFn}>
    <Field label="Login">
      <Input
        required
        bind:value={login}
        placeholder="Login"
        autocomplete="username"
      />
    </Field>
    <Field label="Hasło">
      <Input
        required
        bind:value={password}
        type="password"
        placeholder="Hasło"
        autocomplete="current-password"
      />
    </Field>
    <Button
      type="is-primary"
      nativeType="submit"
      disabled={!login || !password}
      {loading}
    >
      Zaloguj
    </Button>
  </form>
  <Notification type="is-danger" bind:active={errorOpen}>
    Wygląda na to, że wprowadzone dane są nieprawidłowe. Jeśli zapomniałeś hasła
    bądź chcesz założyć konto skontaktuj się z administratorem schroniska.
  </Notification>
</main>

<style lang="scss">
  .login-form {
    margin: 20px auto 0;
    max-width: 360px;
  }
</style>
