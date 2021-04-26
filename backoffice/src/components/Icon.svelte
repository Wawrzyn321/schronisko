<script lang="ts">
    export let glyph: string;
</script>
  
<svg class="feather">
    <use xlink:href={"path/to/feather-sprite.svg#" + glyph}/>
</svg>

<style>
.feather {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>