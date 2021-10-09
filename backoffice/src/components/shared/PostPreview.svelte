<script lang="ts">
  export let title: string;
  export let source: string;
</script>

<div class="preview">
  <h1 class="title">{title}</h1>
  {@html source}
</div>

<style lang="scss">
  .preview .title {
    margin-bottom: 16px;
    text-transform: uppercase;
    font-weight: bold;
  }
</style>
