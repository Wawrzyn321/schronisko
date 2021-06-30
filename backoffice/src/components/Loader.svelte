<!-- loader from bulma -->
<script lang="ts">
  export let centered: boolean = true;
  export let size = '3em';
</script>

<div class:centered>
  <div class="loader" style="--size: {size}" /> 
</div>

<style lang="scss">
  .loader {
    animation: spinAround 500ms infinite linear;
    border: 2px solid rgb(134, 134, 134);
    border-radius: 290486px;
    border-right-color: transparent;
    border-top-color: transparent;
    display: block;
    height: var(--size);
    width: var(--size);
    position: relative;
  }

  .centered {
    display: flex;
    justify-content: center;
  }

  @keyframes spinAround {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>
