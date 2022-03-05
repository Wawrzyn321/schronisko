<script lang="ts">
  import { AnimalCategory } from '@prisma/client';
  import Modal from '../components/shared/Modal.svelte';

  export let modalVisible: boolean;
  export let doUpdateAnimal: () => any;
  export let category: AnimalCategory;

  $: categoryStr =
    category === AnimalCategory.ZaTeczowymMostem
      ? 'Za Tęczowym Mostem'
      : 'Znalazły Dom';
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Czy na pewno chcesz zmienić kategorię?"
  confirmText="Zatwierdź"
  onConfirm={doUpdateAnimal}
>
  <p>
    Przeniesienie zwierzęcia do kategorii <strong>{categoryStr}</strong> spowoduje
    usunięcie jego dodatkowych zdjęć.
  </p>
</Modal>
