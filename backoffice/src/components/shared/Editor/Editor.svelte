<script lang="ts">
  import Quill from 'quill';
  import ImageUploader from 'quill-image-uploader';
  import type { FileMap } from './FileMap';

  var Link = Quill.import('formats/link');
  class MyLink extends Link {
    static create(value: any) {
      const node = super.create(value);
      node.removeAttribute('target');
      return node;
    }
  }
  Quill.register(MyLink, true);

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['blockquote', 'link', 'image', 'video'],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['clean'],
  ];

  let quill: Quill;
  let content: string;
  let fileMap: FileMap = [];

  export let onChange: (c: string, fileMap: FileMap) => void;
  export let requestSave: () => void = () => {};
  export let initialContent: string;

  $: {
    if (quill) {
      content = initialContent;
      quill.root.innerHTML = initialContent;
    }
  }

  function makeQuill(node: HTMLElement) {
    Quill.register('modules/imageUploader', ImageUploader);

    const options = {
      modules: {
        toolbar: toolbarOptions,
        imageUploader: {
          upload: async (file: File) => {
            const base64 = await convertImageToBase64(file);
            return new Promise((resolve) => {
              setTimeout(() => {
                fileMap.push([file, base64]);
                onChange(content, fileMap);
                resolve(base64);
              }, 500);
            });
          },
        },
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

  function onEditorChange(e: { detail: { html: string } }) {
    content = e.detail.html;
    onChange(content, fileMap);
  }

  // function requestMayBeTooLarge() {
  //   if (!content) return false;
  //   const contentWithoutImages = '';

  //   return contentWithoutImages?.length / 1024 / 1024 > 9.5; // 10 mb
  // }

  const convertImageToBase64 = (image: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);

      fileReader.onload = () => {
        return resolve(fileReader.result as string);
      };

      fileReader.onerror = () => {
        reject(new Error('Cannot read file'));
      };
    });
  };

  async function keydown(e: KeyboardEvent) {
    const { metaKey, ctrlKey, key } = e;
    if (key === 's' && (metaKey || ctrlKey)) {
      requestSave && requestSave();
      e.preventDefault();
    }
  }
</script>

<svelte:head>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>
<!-- {#if requestMayBeTooLarge()}
  <div class="warning-container">
    <Notification type="is-warning">
      Rozmiar zawartości może przewyższać 10MB - zapisanie go może się nie udać!
    </Notification>
  </div>
{/if} -->
<svelte:window on:keydown={keydown} />
<div class="editor" use:makeQuill on:text-change={onEditorChange} />

<style lang="scss">
  // .warning-container > :global(*) {
  //   margin: 0 16px 22px;
  // }

  .editor {
    margin-bottom: 64px;

    & > :global(*) {
      resize: both;
    }
  }
</style>
