<script lang="ts">
  import { Tab } from 'svelma';
  import Editor from './Editor.svelte';
  import PostPreview from './PostPreview.svelte';
  import Tabs from './Tabs.svelte';

  export let mapping: Array<string> | undefined = undefined;
  export let currentTab: string | undefined = undefined;
  export let editedContent = '';
  export let initialContent = '';
</script>

<Tabs {mapping} {currentTab}>
  <slot />
  <Tab label="Zawartość">
    <Editor {initialContent} onChange={(c) => (editedContent = c)} />
  </Tab>
  <Tab label="Podgląd">
    <PostPreview source={editedContent} />
  </Tab>
</Tabs>
