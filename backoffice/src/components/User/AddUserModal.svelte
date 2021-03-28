<script lang="ts">
  import Modal from './../Modal.svelte';
  import { Field, Input, Modal as SModal } from 'svelma';
  import {
    priviledges,
    priviledgeNames,
    priviledgeDescriptions,
  } from '../../common/PriviledgesInfo';
  import type { PriviledgeType } from '../../../../prisma/viewModels/UserViewModel';

  export let modalVisible: boolean;

  const user = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    priviledges: [],
  };

  const switchPriviledge = (priviledge: PriviledgeType) => (e: any) => {
    if (e.target.checked) {
      user.priviledges = [...user.priviledges, priviledge];
    } else {
      user.priviledges = user.priviledges.filter((p) => p !== priviledge);
    }
  };

  function addUser() {
    console.log(user);
  }
</script>

<div>
  <SModal bind:active={modalVisible}>
    <Modal
      bind:isOpen={modalVisible}
      title="Dodaj użytkownika"
      confirmText="Dodaj"
      onConfirm={addUser}
      disabledConfirm={false}
    >
      <form>
        <Field label="Email">
          <Input bind:value={user.email} placeholder="Email" />
        </Field>
        <Field label="Imię">
          <Input bind:value={user.firstName} placeholder="Imię" />
        </Field>
        <Field label="Nazwisko">
          <Input bind:value={user.lastName} placeholder="Nazwisko" />
        </Field>
        <Field
          label="Hasło"
          message="Przekaż hasło użytkownikowi po jego stworzeniu"
        >
          <Input bind:value={user.password} placeholder="Hasło" />
        </Field>
        <Field label="Uprawnienia">
          <ul>
            {#each priviledges as priviledge}
              <li>
                <label class="priviledge-checklist-item">
                  <input
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
