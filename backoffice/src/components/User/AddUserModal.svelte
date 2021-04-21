<script lang="ts">
  import Modal from './../Modal.svelte';
  import { Field, Input, Modal as SModal } from 'svelma';
  import {
    priviledgeNames,
    priviledgeDescriptions,
  } from '../../common/PriviledgesInfo';
  // import { auth } from '../../auth.context';
import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
import type { Priviledge } from '../../prisma-types/priviledges';
import { priviledges } from '../../prisma-types/priviledges';
import { throwingFetch } from '../../common/throwingFetch';

  export let modalVisible: boolean;
  export let onUserAdded: (user: UserViewModel) => any;

  let form: HTMLFormElement;
  let isFormValid = false;

  const user = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    priviledges: ['ANIMAL'],
  };

  const switchPriviledge = (priviledge: Priviledge) => (e: any) => {
    if (e.target.checked) {
      user.priviledges = [...user.priviledges, priviledge];
    } else {
      user.priviledges = user.priviledges.filter((p) => p !== priviledge);
    }
  };

  async function addUser() {
    const newUser = await throwingFetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    onUserAdded(newUser);
  }
</script>

<div>
  <SModal bind:active={modalVisible} onBody={false}>
    <Modal
      bind:isOpen={modalVisible}
      title="Dodaj użytkownika"
      confirmText="Dodaj"
      onConfirm={addUser}
      disabledConfirm={!isFormValid}
    >
      <form bind:this={form} on:change={() => isFormValid = form.reportValidity()}>
        <Field label="Email">
          <Input required type="email" bind:value={user.email} placeholder="Email" />
        </Field>
        <Field label="Imię">
          <Input required bind:value={user.firstName} placeholder="Imię" />
        </Field>
        <Field label="Nazwisko">
          <Input required bind:value={user.lastName} placeholder="Nazwisko" />
        </Field>
        <Field
          label="Hasło"
          message="Przekaż hasło użytkownikowi po jego stworzeniu."
        >
          <Input required bind:value={user.password} placeholder="Hasło" />
        </Field>
        <Field label="Uprawnienia">
          <ul>
            {#each priviledges as priviledge}
              <li>
                <label>
                  <input
                    checked={user.priviledges.includes(priviledge)}
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
      </form>
    </Modal>
  </SModal>
</div>

<style>
</style>
