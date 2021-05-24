<script lang="ts">
  import { scaleToFit } from './helpers';

  import Modal from './../Modal.svelte';

  const MIN_TARGET_X = 102;
  const MIN_TARGET_Y = 68;

  const DEFAULT_WIDTH = 515;
  const DEFAULT_HEIGHT = 345;

  let targetWidth: number;
  let targetHeight: number;
  let scale: number;

  export let modalVisible: boolean;
  export let file: File;
  export let setImageData: (image: string) => any;

  let imageCanvas: HTMLCanvasElement;
  let frameCanvas: HTMLCanvasElement;
  let frameCanvasContext: CanvasRenderingContext2D;
  let x = 0;
  let y = 0;
  let imageWidth = 0;
  let imageHeight = 0;
  let isMouseDown = false;
  let lastFileName: string;

  $: {
    if (file && imageCanvas && frameCanvas && file.name !== lastFileName) {
      lastFileName = file.name;
      setupCanvas();
    }
  }

  function drawFrame() {
    frameCanvasContext = frameCanvas.getContext('2d');
    frameCanvasContext.clearRect(0, 0, imageWidth, imageHeight);
    frameCanvasContext.strokeRect(
      x,
      y,
      targetWidth * scale,
      targetHeight * scale
    );
  }

  function initFrame() {
    x = (imageWidth - targetWidth) / 2;
    y = (imageHeight - targetHeight) / 2;
    drawFrame();
  }

  function refreshFrame(deltaX: number, deltaY: number) {
    const scaledW = targetWidth * scale;
    const scaledH = targetHeight * scale;
    x += deltaX;
    y += deltaY;
    restrictPosition(scaledW, scaledH);
    drawFrame();
  }

  function restrictPosition(sizeX: number, sizeY: number) {
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > imageWidth - sizeX) x = imageWidth - sizeX;
    if (y > imageHeight - sizeY) y = imageHeight - sizeY;
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
        newTargetWidth > MIN_TARGET_X &&
        newTargetHeight > MIN_TARGET_Y) ||
      (e.deltaY > 0 &&
        newTargetWidth < imageWidth &&
        newTargetHeight < imageHeight &&
        x + newTargetWidth < imageWidth &&
        y + newTargetHeight < imageHeight)
    ) {
      // recenter
      x += (targetWidth * scale - newTargetWidth) * 0.5;
      y += (targetHeight * scale - newTargetHeight) * 0.5;
      restrictPosition(newTargetWidth, newTargetHeight);
      scale = newScale;
      drawFrame();
    }
  }

  function setupCanvas() {
    const context = imageCanvas.getContext('2d');

    targetWidth = DEFAULT_WIDTH;
    targetHeight = DEFAULT_HEIGHT;
    scale = 1;
    x = 0;
    y = 0;

    const img = new Image();
    img.onload = function () {
      const maxWidth = window.innerWidth * 0.8 - 80;
      const maxHeight = window.innerHeight * 0.51 - 120;
      let { width, height } = this as any;
      [imageWidth, imageHeight] = scaleToFit(
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
  title="Dodaj tło newsa"
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
		Użyj scrolla, by zmieniać rozmiar obszaru docelowego. Przeciągnij po obrazie, by zmienić jego pozycję.
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

  :global(#resize-modal-wrapper > div > .modal-content) {
    width: 80vw;
    height: 60vh;
  }

  :global(#resize-modal-wrapper .modal-content .modal-content) {
    width: 80vw;
    height: 46vh;
    padding: 0;
    margin: 0;
  }

  :global(#resize-modal-wrapper > div > .modal-content > *) {
    width: 80vw;
    height: 60vh;
  }

  .modal-footer {
    margin-right: 20px;
    font-size: smaller;
  }
</style>
