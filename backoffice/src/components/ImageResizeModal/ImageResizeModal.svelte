<script lang="ts">
  import { scaleToFit, restrictPosition } from './helpers';
  import Modal from './../Modal.svelte';

  export let defaultWidth: number;
  export let defaultHeight: number;

  const minTargetX = 100;
  const minTargetY = Math.floor((minTargetX * defaultHeight) / defaultWidth);

  let targetWidth: number;
  let targetHeight: number;
  let scale: number;

  export let modalVisible: boolean;
  export let file: File;
  export let title: string;
  export let setImageData: (image: string) => any;
  export let forceRefresh: boolean;

  let imageCanvas: HTMLCanvasElement;
  let frameCanvas: HTMLCanvasElement;
  let x = 0;
  let y = 0;
  let isMouseDown = false;

  $: {
    if (file && imageCanvas && frameCanvas && forceRefresh) {
      forceRefresh = false;
      setupCanvas();
    }
  }

  function drawFrame() {
    const ctx = frameCanvas.getContext('2d');
    ctx.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
    ctx.strokeRect(x, y, targetWidth * scale, targetHeight * scale);
  }

  function initFrame() {
    x = (frameCanvas.width - targetWidth) / 2;
    y = (frameCanvas.height - targetHeight) / 2;
    drawFrame();
  }

  function refreshFrame(deltaX: number, deltaY: number) {
    const scaledW = targetWidth * scale;
    const scaledH = targetHeight * scale;
    x += deltaX;
    y += deltaY;
    [x, y] = restrictPosition(
      x,
      y,
      scaledW,
      scaledH,
      frameCanvas.width,
      frameCanvas.height
    );
    drawFrame();
  }

  function onMouseMove(e: MouseEvent) {
    if (isMouseDown) {
      refreshFrame(e.movementX, e.movementY);
    }
  }

  function zoom(e: WheelEvent) {
    const newScale = scale + Math.sign(e.deltaY) * 0.01;
    const newTargetWidth = targetWidth * newScale;
    const newTargetHeight = targetHeight * newScale;
    if (
      (e.deltaY < 0 &&
        newTargetWidth > minTargetX &&
        newTargetHeight > minTargetY) ||
      (e.deltaY > 0 &&
        newTargetWidth < frameCanvas.width &&
        newTargetHeight < frameCanvas.height &&
        x + newTargetWidth < frameCanvas.width &&
        y + newTargetHeight < frameCanvas.height)
    ) {
      // recenter
      x += (targetWidth * scale - newTargetWidth) * 0.5;
      y += (targetHeight * scale - newTargetHeight) * 0.5;
      [x, y] = restrictPosition(
        x,
        y,
        newTargetWidth,
        newTargetHeight,
        frameCanvas.width,
        frameCanvas.height
      );
      scale = newScale;
      drawFrame();
    }
  }

  function setupCanvas() {
    const context = imageCanvas.getContext('2d');

    targetWidth = defaultWidth;
    targetHeight = defaultHeight;
    scale = 1;
    x = 0;
    y = 0;

    const img = new Image();
    img.onload = function () {
      const maxWidth = window.innerWidth * 0.8 - 80;
      const maxHeight = window.innerHeight * 0.51 - 120;
      const { width, height } = this as any;
      const [imageWidth, imageHeight] = scaleToFit(
        width,
        height,
        maxWidth,
        maxHeight
      );
      [targetWidth, targetHeight] = scaleToFit(
        targetWidth,
        targetHeight,
        imageWidth,
        imageHeight
      );

      frameCanvas.width = imageCanvas.width = imageWidth;
      imageCanvas.style.width = imageWidth + 'px';
      frameCanvas.height = imageCanvas.height = imageHeight;

      context.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
      initFrame();
    };
    img.src = URL.createObjectURL(file);
  }

  function apply() {
    const imageData = imageCanvas
      .getContext('2d')
      .getImageData(x, y, targetWidth * scale, targetHeight * scale);

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth * scale;
    canvas.height = targetHeight * scale;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
    setImageData(canvas.toDataURL());
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  {title}
  confirmText="Dodaj"
  onConfirm={apply}
  id="resize-modal-wrapper"
>
  <canvas bind:this={imageCanvas} />
  <canvas
    bind:this={frameCanvas}
    on:mousedown={() => (isMouseDown = true)}
    on:mouseup={() => (isMouseDown = false)}
    on:mouseleave={() => (isMouseDown = false)}
    on:mousemove={onMouseMove}
    on:wheel={zoom}
  />
  <div slot="footer" class="modal-footer">
    Użyj scrolla, by zmieniać rozmiar obszaru docelowego. Przeciągnij po
    obrazie, by zmienić jego pozycję.
  </div>
</Modal>

<style lang="scss">
  canvas {
    margin: auto;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  :global(#resize-modal-wrapper dialog) {
    width: 80vw;
    height: 60vh;
  }

  :global(#resize-modal-wrapper .modal-content) {
    width: 80vw;
    height: 45vh;
    padding: 0;
    margin: 0;
  }

  .modal-footer {
    margin-right: 20px;
    font-size: smaller;
  }
</style>
