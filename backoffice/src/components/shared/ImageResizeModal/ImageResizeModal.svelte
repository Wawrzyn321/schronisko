<script lang="ts">
  import { scaleToFit, restrictPosition, fit } from './helpers';
  import { Button } from 'svelma';
  import Modal from '../Modal.svelte';

  export let defaultWidth: number;
  export let defaultHeight: number;

  const minTargetX = 100;
  const minTargetY = Math.floor((minTargetX * defaultHeight) / defaultWidth);

  let targetWidth: number;
  let targetHeight: number;
  let scale: number;

  export let modalVisible: boolean;
  export let file: File | null;
  export let title: string;
  export let setImageData: (image: string) => void;
  export let forceRefresh: boolean;

  let imageCanvas: HTMLCanvasElement;
  let frameCanvas: HTMLCanvasElement;
  let x = 0;
  let y = 0;
  let isMouseDown = false;

  let originalWidth: number;
  let originalHeight: number;
  let img: HTMLImageElement;

  $: {
    if (file && imageCanvas && frameCanvas && forceRefresh) {
      forceRefresh = false;
      setupCanvas(file);
    }
  }

  function getContext(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw Error('Canvas context null');
    }
    return ctx;
  }

  function drawFrame() {
    const ctx = getContext(frameCanvas);
    ctx.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
    ctx.strokeRect(x, y, targetWidth * scale, targetHeight * scale);
  }

  function initFrame() {
    x = (frameCanvas.width - targetWidth) / 2;
    y = (frameCanvas.height - targetHeight) / 2;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
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

  function onMouseZoom(e: WheelEvent) {
    e.preventDefault(); // stop page from scrolling
    zoom(Math.sign(e.deltaY) * 0.01);
  }

  function zoom(delta: number) {
    const newScale = scale + delta;
    const newTargetWidth = targetWidth * newScale;
    const newTargetHeight = targetHeight * newScale;
    if (
      (delta < 0 &&
        newTargetWidth > minTargetX &&
        newTargetHeight > minTargetY) ||
      (delta > 0 &&
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

  function setupCanvas(file: File) {
    targetWidth = defaultWidth;
    targetHeight = defaultHeight;
    scale = 1;
    x = 0;
    y = 0;

    img = new Image();
    img.onload = function () {
      const maxWidth = window.innerWidth * 0.8 - 80;
      const maxHeight = window.innerHeight * 0.51 - 120;
      originalWidth = (this as any).width;
      originalHeight = (this as any).height;
      const [imageWidth, imageHeight] = scaleToFit(
        originalWidth,
        originalHeight,
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

      getContext(imageCanvas).drawImage(
        img,
        0,
        0,
        imageCanvas.width,
        imageCanvas.height
      );
      initFrame();
    };
    img.src = URL.createObjectURL(file);
  }

  async function apply() {
    const normalizedX = x / targetWidth;
    const normalizedY = y / targetHeight;

    const originalSizeCanvas = document.createElement('canvas');
    originalSizeCanvas.width = originalWidth;
    originalSizeCanvas.height = originalHeight;
    getContext(originalSizeCanvas).drawImage(
      img,
      0,
      0,
      originalWidth,
      originalHeight
    );

    const [fittedWidth, fittedHeight] = fit(
      originalWidth,
      originalHeight,
      targetWidth,
      targetHeight
    );
    const imageData = getContext(originalSizeCanvas).getImageData(
      normalizedX * fittedWidth,
      normalizedY * fittedHeight,
      scale * fittedWidth,
      scale * fittedHeight
    );

    const saveCanvas = document.createElement('canvas');
    saveCanvas.width = scale * fittedWidth;
    saveCanvas.height = scale * fittedHeight;
    getContext(saveCanvas).putImageData(imageData, 0, 0);
    setImageData(saveCanvas.toDataURL());
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
    on:wheel={onMouseZoom}
  />
  <div slot="footer" class="modal-footer">
    Użyj scrolla, by zmieniać rozmiar obszaru docelowego. Przeciągnij po
    obrazie, by zmienić jego pozycję.
    <Button type="is-primary" on:click={() => zoom(0.05)}>+</Button>
    <Button type="is-primary" on:click={() => zoom(-0.05)}>-</Button>
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

  :global(#resize-modal-wrapper div.dialog) {
    width: 80vw;
    height: 60vh;
  }

  :global(#resize-modal-wrapper .modal-content) {
    width: 80vw;
    height: 46vh;
    padding: 0;
    margin: 0;
  }

  .modal-footer {
    margin-right: 20px;
    font-size: smaller;
    display: flex;

    & > :global(*) {
      margin-left: 10px;
    }
  }
</style>
