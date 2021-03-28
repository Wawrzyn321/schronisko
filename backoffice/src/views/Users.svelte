<script lang="ts">
  import GenericList from '../components/GenericList.svelte';
  import Renderer from './Renderer.svelte';
  import AddUserModal from './../components/User/AddUserModal.svelte';
  import { Button } from 'svelma';

  // const entries: any[] = [
  //   {
  //     name: 'a',
  //     number: 100,
  //     other: 'aha',
  //   },
  //   {
  //     name: 'b',
  //     number: 100,
  //     other: 'quefwe',
  //   },
  //   {
  //     name: 'c',
  //     number: -1,
  //     other: null,
  //   },
  // ];
  const entries: any[] = [];

  let headerRenderer = ['Imię', 'Nazwisko', 'Email', 'Aktywny', ''];
  let modalVisible = false;

</script>

<main>
  <h1>
    <span>Użytkownicy</span>
    <Button type="is-primary" on:click={() => (modalVisible = true)}>+</Button>
  </h1>
  <GenericList {entries} {headerRenderer} rowRenderer={Renderer} />
  <AddUserModal bind:modalVisible={modalVisible}/>
</main>

<style lang="scss">
  main {
    margin: 24px;
  }
  h1 {
    display: flex;
    justify-content: space-between;

    span {
      font-size: 150%;
    }
  }
</style>
