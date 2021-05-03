<script lang="ts">
  import { Tabs, Tab } from 'svelma';
  import Editor from './Editor.svelte';
  import PostPreview from './PostPreview.svelte';

  export let editedContent = '';
  export let initialContent = '';
</script>

<Tabs>
  <Tab label="Edycja">
    <Editor {initialContent} onChange={(c) => (editedContent = c)} />
  </Tab>
  <Tab label="Podgląd">
    <PostPreview source={editedContent} />
  </Tab>
</Tabs>
