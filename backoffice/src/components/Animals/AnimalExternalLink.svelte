<script lang="ts">
  import ExternalLink from '../../common/ExternalLink.svelte';
  import type { Animal } from '@prisma-app/client';
  import { MAIN_PAGE_URL } from '../../config';

  export let animal: Pick<Animal, 'id' | 'isPublic'>;

  const href = `${MAIN_PAGE_URL}/animals/details/${animal.id}`;
  const disabled = !animal.isPublic;
</script>

<ExternalLink {href} {disabled} />
