<script lang="ts">
  import { Tab } from 'svelma';
  import Editor from './Editor/Editor.svelte';
  import type { FileMap } from './Editor/FileMap';
  import PostPreview from './PostPreview.svelte';
  import Tabs from './Tabs.svelte';

  export let mapping: Array<string> | undefined = undefined;
  export let currentTab: string | undefined = undefined;
  export let onChange: (content: string, fileMap: FileMap) => any;
  export let contentForPreview: string;
  export let initialContent = '';
</script>

<Tabs {mapping} {currentTab}>
  <slot />
  <Tab label="Zawartość">
    <Editor {initialContent} {onChange} />
  </Tab>
  <Tab label="Podgląd">
    <PostPreview source={contentForPreview} />
  </Tab>
</Tabs>
