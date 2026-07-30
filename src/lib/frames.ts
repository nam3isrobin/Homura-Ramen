export const FRAME_COUNT = 240
export const FRAME_PAD = 3

export function frameSrc(index: number): string {
  const n = String(Math.min(Math.max(index, 0), FRAME_COUNT - 1) + 1).padStart(
    FRAME_PAD,
    '0',
  )
  return `/frames/frame-${n}.webp`
}

/** Cover-fit draw into canvas (like object-fit: cover) */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  canvasW: number,
  canvasH: number,
  imgW: number,
  imgH: number,
) {
  const scale = Math.max(canvasW / imgW, canvasH / imgH)
  const w = imgW * scale
  const h = imgH * scale
  const x = (canvasW - w) / 2
  const y = (canvasH - h) / 2
  ctx.drawImage(img, x, y, w, h)
}
