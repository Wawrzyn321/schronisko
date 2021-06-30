<script lang="ts">
  import Modal from './../Modal.svelte';
  import { animalsService } from '../../services/AnimalsService';
  import type { Animal } from '.prisma/client';
  import { notifyError } from '../../contexts/notification.context';

  let loading = false;

  export let modalVisible: boolean;
  export let onAnimalDeleted: (animal: Animal) => any;
  export let animal: Animal;

  async function deleteAnimal() {
    try {
      loading = true;
      await animalsService.delete(animal.id);
      onAnimalDeleted(animal);
    } catch (e) {
      notifyError({ message: 'Nie udało się usunąć zwierzęcia: ' + e.message });
    }
    loading = false;
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Usuń zwierze"
  confirmText="Usuń"
  onConfirm={deleteAnimal}
  disabledConfirm={loading}
  loadingConfirm={loading}
>
  {#if !!animal}
    <p>
      Czy na pewno chceesz usunąć zwierzę <strong> {animal.name}</strong>?
      Pamiętaj, że zawsze możesz określić je jako niewidoczne lub przenieść za
      tęczowy most.
    </p>
  {/if}
</Modal>
