<script lang='ts'>
  import type { News } from '@prisma-app/client';
  import { MAIN_PAGE_URL } from '../../config';
  import ExternalLink from '../../common/ExternalLink.svelte';

  export let news: Pick<News, 'id'>;

  const href = `${MAIN_PAGE_URL}/news/${news.id}`;
</script>

<ExternalLink {href}/>
