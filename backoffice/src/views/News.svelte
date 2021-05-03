<script lang="ts">
  import Editor from "../components/Editor.svelte";
  
  let content = '';
    
  </script>
  
  <div>
    <Editor bind:content={content} />
    <!-- <button on:click={() => console.log(content)}>klik</button> -->
  </div>
  