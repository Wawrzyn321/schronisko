<script lang="ts">
  import ExternalLink from '../../common/ExternalLink.svelte';
  import { MAIN_PAGE_URL, PAGE_MAP } from '../../config';
  import type { Page } from '@prisma-app/client';

  export let page: Pick<Page, 'id'>;

  const href = `${MAIN_PAGE_URL}/${PAGE_MAP[page.id]}`;
  const disabled = !PAGE_MAP[page.id];
</script>

<ExternalLink {href} {disabled} />
