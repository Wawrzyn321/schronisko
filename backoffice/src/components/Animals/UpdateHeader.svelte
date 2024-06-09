<script lang="ts">
  import { type Animal, AnimalCategory, Permission } from '@prisma-app/client';

  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { notifySuccess } from '../../contexts/notification.context';
  import AnimalUpdateWarningModal from '../../views/AnimalUpdateWarningModal.svelte';
  import DateFromTimestamp from '../shared/DateFromTimestamp.svelte';
  import DeleteAnimalModal from './DeleteAnimalModal.svelte';
  import { changedToReadonly } from './Form/animal-readonly';
  import FormTooltipMessageWrapper from './Form/FormTooltipMessageWrapper.svelte';
  import type { AnimalImageParams } from '../../services/AnimalImagesService';
  import { auth } from '../../contexts/auth.context';
  import AnimalExternalLink from './AnimalExternalLink.svelte';
  import type { AnimalFormData } from '../../services/AnimalsService';

  export let isPublic: boolean;
  export let isValid: boolean;
  export let animal: Animal;
  export let animalFormData: AnimalFormData;
  export let images: AnimalImageParams[];
  export let isSaving: boolean;
  export let updateAnimal: () => Promise<boolean | undefined | void>;
  export let prevCategory: AnimalCategory;

  let isWarningModalVisible = false;
  let deleteModalVisible = false;

  const canEditAnimals = $auth?.user.permissions.includes(Permission.ANIMAL);

  function onAnimalDeleted() {
    notifySuccess({ message: 'Zwierzę zostało usunięte.' });
    push('/animals');
  }
</script>

<header class="g-flex-between-100">
  <h1>
    <a href="/#/animals">Zwierzęta</a>
    <span class="g-breadcrumb-separator">/ </span>{animal.name}
  </h1>
  <span>
    Dodany:
    <DateFromTimestamp timestamp={animal.addedAt} />
    , zmodyfikowany
    <DateFromTimestamp timestamp={animal.modifiedAt} />
  </span>
  <div>
    <label>
      <input
        checked={isPublic}
        type="checkbox"
        on:change={() => (isPublic = !isPublic)}
        disabled={!canEditAnimals}
      />
      Widoczny na stronie
    </label>
    <div class="actions">
      <FormTooltipMessageWrapper {isValid} animalFormData={animalFormData} {images}>
        <Button
          type="is-primary"
          on:click={() => {
            if (changedToReadonly(animalFormData.category, prevCategory)) {
              isWarningModalVisible = true;
            } else {
              updateAnimal();
            }
          }}
          disabled={!isValid || isSaving || !canEditAnimals}
          aria-label="Zapisz zwierzę"
        >
          Zapisz
        </Button>
      </FormTooltipMessageWrapper>
      <AnimalExternalLink {animal} />
      <Button
        type="is-danger"
        on:click={() => (deleteModalVisible = true)}
        aria-label="Usuń zwierzę"
        disabled={!canEditAnimals}
      >
        Usuń
      </Button>
    </div>
  </div>
</header>
<DeleteAnimalModal
  bind:modalVisible={deleteModalVisible}
  {onAnimalDeleted}
  {animal}
/>
<AnimalUpdateWarningModal
  bind:modalVisible={isWarningModalVisible}
  doUpdateAnimal={updateAnimal}
  category={animalFormData.category}
/>

<style lang="scss">
  header > div {
    display: flex;
    justify-content: center;
  }

  label {
    margin-right: 16px;
  }

  .actions {
    display: flex;
    column-gap: 4px;
  }
</style>
