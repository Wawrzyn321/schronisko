<script lang="ts">
  import { Tab } from 'svelma';
  import Editor from './Editor/Editor.svelte';
  import type { FileMap } from './Editor/FileMap';
  import PostPreview from './PostPreview.svelte';
  import Tabs from './Tabs.svelte';

  export let mapping: Array<string> | undefined = undefined;
  export let currentTab: string;
  export let onChange: (content: string, fileMap: FileMap) => void;
  export let contentForPreview: string;
  export let initialContent = '';
  export let title: string;
  export let requestSave: () => void = () => {};
</script>

<Tabs {mapping} {currentTab}>
  <slot />
  <Tab label="Zawartość">
    <Editor {initialContent} {onChange} {requestSave}/>
  </Tab>
  <Tab label="Podgląd">
    <PostPreview title={title} source={contentForPreview} />
  </Tab>
</Tabs>
