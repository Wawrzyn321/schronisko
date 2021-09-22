<script lang="ts">
  import Quill from 'quill';
  import { Notification } from 'svelma';

  //https://quilljs.com/docs/modules/toolbar/
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['blockquote', 'link', 'image'],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['clean'],
  ];
  // Quill.register('modules/counter', function (quill, options) {
  // });

  let quill: Quill;
  let content: string;

  export let onChange: (c: string) => any;
  export let initialContent: string;

  $: {
    if (quill) {
      content = initialContent;
      quill.root.innerHTML = initialContent;
    }
  }

  function makeQuill(node: HTMLElement) {
    const options = {
      modules: {
        toolbar: toolbarOptions,
        // counter: {},
      },
      theme: 'snow',
    };
    quill = new Quill(node, options);
    content = initialContent;
    quill.root.innerHTML = initialContent;
    const container = node.getElementsByClassName('ql-editor')[0];

    quill.on('text-change', function () {
      node.dispatchEvent(
        new CustomEvent('text-change', {
          detail: {
            html: container.innerHTML,
            text: quill.getText(),
          },
        })
      );
    });
  }

  function onEditorChange(e) {
    content = e.detail.html;
    onChange(content);
  }

  function requestMayBeTooLarge() {
    return content?.length / 1024 / 1024 > 9.5; // 10 mb
  }
</script>

<svelte:head>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>
{#if requestMayBeTooLarge()}
  <div class="warning-container">
    <Notification type="is-warning">
      Rozmiar posta może przewyższać 10MB - zapisanie go może się nie udać!
    </Notification>
  </div>
{/if}
<div class="editor" use:makeQuill on:text-change={onEditorChange} />

<style lang="scss">
  .warning-container > :global(*) {
    margin: 0 16px 22px;
  }
</style>
