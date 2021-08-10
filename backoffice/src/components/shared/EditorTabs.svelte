<script lang="ts">
  import { Tabs, Tab } from 'svelma';
  import { onMount } from 'svelte';
  import Editor from './Editor.svelte';
  import PostPreview from './PostPreview.svelte';

  let tabs: any;

  export let editedContent = '';
  export let initialContent = '';

  onMount(() => tabs.setActive(0));
</script>

<Tabs bind:this={tabs}>
  <slot />
  <Tab label="Zawartość">
    <Editor {initialContent} onChange={(c) => (editedContent = c)} />
  </Tab>
  <Tab label="Podgląd">
    <PostPreview source={editedContent} />
  </Tab>
</Tabs>
