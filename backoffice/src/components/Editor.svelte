<script lang="ts">
  import Quill from 'quill';

  const toolbarOptions = [
    [{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image'],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'ordered' }],
    [{ align: [] }],
  ];
  // Quill.register('modules/counter', function (quill, options) {
  // });

  let quill: Quill;
  let content: string;

  export let onChange: (c: string) => any;
  export let initialContent: string;

  function updateContentFromInitial(_) {
    if (!quill) return;
    content = initialContent;
    quill.root.innerHTML = initialContent;
  }

  $: updateContentFromInitial(initialContent);

  function makeQuill(node) {
    const options = {
      modules: {
        toolbar: toolbarOptions,
        // counter: {},
      },
      theme: "snow",
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
</script>

<svelte:head>
	<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>
  <div
    class="editor"
    use:makeQuill
    on:text-change={(e) => {content = e.detail.html;onChange(content)}}
  />
