/**
 * 全站图片灯箱（零依赖）
 * 点击 .vp-doc 中的任意图片，全屏预览。
 * 支持：上一张/下一张、键盘方向键、滚轮缩放、拖拽平移、
 *       双击缩放、移动端双指缩放/单指滑动切换、点击遮罩或 Esc 关闭。
 */

export function setupLightbox(): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  const MIN_SCALE = 0.5
  const MAX_SCALE = 8

  let overlay: HTMLElement | null = null
  let imageEl: HTMLImageElement | null = null
  let counterEl: HTMLElement | null = null
  let prevBtn: HTMLElement | null = null
  let nextBtn: HTMLElement | null = null

  let images: HTMLImageElement[] = []
  let current = 0
  let scale = 1
  let tx = 0
  let ty = 0

  // 拖拽 / 滑动
  let dragging = false
  let moved = false
  let startX = 0
  let startY = 0
  let originTx = 0
  let originTy = 0

  // 多点触控（捏合缩放）
  const pointers = new Map<number, { x: number; y: number }>()
  let pinchDist = 0
  let pinchStartScale = 1

  const clamp = (v: number, min: number, max: number): number =>
    Math.min(max, Math.max(min, v))

  /** 是否可作为灯箱图片（排除链接内图片、代码内图片、灯箱自身） */
  const isEligible = (img: HTMLImageElement): boolean => {
    if (img.closest('.qlb')) return false
    if (img.closest('a')) return false
    if (img.closest('pre, code')) return false
    if (img.dataset.lightboxIgnore !== undefined) return false
    return true
  }

  /** 收集当前页面内容区域中的所有图片 */
  const collectImages = (): HTMLImageElement[] => {
    const scope = document.querySelector('.vp-doc') || document.querySelector('main')
    if (!scope) return []
    return Array.from(scope.querySelectorAll<HTMLImageElement>('img')).filter(isEligible)
  }

  const applyTransform = (): void => {
    if (!imageEl) return
    imageEl.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`
  }

  const resetZoom = (): void => {
    scale = 1
    tx = 0
    ty = 0
    applyTransform()
  }

  /** 以屏幕上某一点为中心缩放 */
  const zoomAt = (factor: number, clientX: number, clientY: number): void => {
    if (!imageEl || !overlay) return
    const rect = imageEl.getBoundingClientRect()
    const px = clientX - (rect.left + rect.width / 2)
    const py = clientY - (rect.top + rect.height / 2)
    const ix = (px - tx) / scale
    const iy = (py - ty) / scale
    const next = clamp(scale * factor, MIN_SCALE, MAX_SCALE)
    tx = px - ix * next
    ty = py - iy * next
    scale = next
    applyTransform()
  }

  const zoomIn = (): void => {
    if (!imageEl) return
    const r = imageEl.getBoundingClientRect()
    zoomAt(1.25, r.left + r.width / 2, r.top + r.height / 2)
  }

  const zoomOut = (): void => {
    if (!imageEl) return
    const r = imageEl.getBoundingClientRect()
    zoomAt(0.8, r.left + r.width / 2, r.top + r.height / 2)
  }

  const render = (): void => {
    if (!imageEl || !counterEl || !prevBtn || !nextBtn) return
    const img = images[current]
    if (!img) return
    imageEl.src = img.currentSrc || img.src
    imageEl.alt = img.alt || ''
    counterEl.textContent = `${current + 1} / ${images.length}`
    prevBtn.classList.toggle('qlb-hidden', images.length < 2)
    nextBtn.classList.toggle('qlb-hidden', images.length < 2)
    resetZoom()
  }

  const next = (): void => {
    if (images.length < 2) return
    current = (current + 1) % images.length
    render()
  }

  const prev = (): void => {
    if (images.length < 2) return
    current = (current - 1 + images.length) % images.length
    render()
  }

  const open = (img: HTMLImageElement): void => {
    ensureOverlay()
    images = collectImages()
    const idx = images.indexOf(img)
    if (idx >= 0) {
      current = idx
    } else {
      current = 0
      images = [img]
    }
    render()
    overlay!.classList.add('open')
    document.body.style.overflow = 'hidden'
  }

  const close = (): void => {
    overlay?.classList.remove('open')
    document.body.style.overflow = ''
  }

  const ensureOverlay = (): void => {
    if (overlay) return

    overlay = document.createElement('div')
    overlay.className = 'qlb'
    overlay.setAttribute('role', 'dialog')
    overlay.setAttribute('aria-modal', 'true')
    overlay.setAttribute('aria-label', '图片预览')

    const backdrop = document.createElement('div')
    backdrop.className = 'qlb-backdrop'
    overlay.appendChild(backdrop)

    const stage = document.createElement('div')
    stage.className = 'qlb-stage'
    imageEl = document.createElement('img')
    imageEl.className = 'qlb-image'
    imageEl.draggable = false
    imageEl.dataset.lightboxIgnore = 'true'
    stage.appendChild(imageEl)
    overlay.appendChild(stage)

    const makeBtn = (cls: string, label: string, html: string): HTMLButtonElement => {
      const b = document.createElement('button')
      b.type = 'button'
      b.className = `qlb-btn ${cls}`
      b.setAttribute('aria-label', label)
      b.innerHTML = html
      return b
    }

    const closeBtn = makeBtn('qlb-close', '关闭', '&times;')
    overlay.appendChild(closeBtn)

    prevBtn = makeBtn('qlb-prev', '上一张', '&#8249;')
    overlay.appendChild(prevBtn)

    nextBtn = makeBtn('qlb-next', '下一张', '&#8250;')
    overlay.appendChild(nextBtn)

    const toolbar = document.createElement('div')
    toolbar.className = 'qlb-toolbar'
    counterEl = document.createElement('span')
    counterEl.className = 'qlb-counter'
    counterEl.textContent = '1 / 1'
    toolbar.appendChild(counterEl)

    const zoomOutBtn = makeBtn('qlb-zoom-out', '缩小', '&minus;')
    const resetBtn = makeBtn('qlb-zoom-reset', '重置缩放', '重置')
    const zoomInBtn = makeBtn('qlb-zoom-in', '放大', '+')
    toolbar.append(zoomOutBtn, resetBtn, zoomInBtn)
    overlay.appendChild(toolbar)

    document.body.appendChild(overlay)

    // ----- 事件 -----
    backdrop.addEventListener('click', close)
    closeBtn.addEventListener('click', close)

    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev() })
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next() })
    zoomInBtn.addEventListener('click', (e) => { e.stopPropagation(); zoomIn() })
    zoomOutBtn.addEventListener('click', (e) => { e.stopPropagation(); zoomOut() })
    resetBtn.addEventListener('click', (e) => { e.stopPropagation(); resetZoom() })

    // 滚轮缩放
    stage.addEventListener('wheel', (e) => {
      e.preventDefault()
      zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY)
    }, { passive: false })

    // 双击：放大 / 还原
    stage.addEventListener('dblclick', (e) => {
      e.preventDefault()
      if (scale > 1.01) resetZoom()
      else zoomAt(2.5, e.clientX, e.clientY)
    })

    // 指针：单指拖拽平移、双指捏合缩放、滑动切换
    stage.addEventListener('pointerdown', (e) => {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pointers.size === 1) {
        dragging = true
        moved = false
        startX = e.clientX
        startY = e.clientY
        originTx = tx
        originTy = ty
        stage.classList.add('dragging')
        imageEl?.classList.add('no-anim')
      } else if (pointers.size === 2) {
        dragging = false
        stage.classList.remove('dragging')
        const [p1, p2] = [...pointers.values()]
        pinchDist = Math.hypot(p1.x - p2.x, p1.y - p2.y)
        pinchStartScale = scale
      }
      stage.setPointerCapture?.(e.pointerId)
    })

    stage.addEventListener('pointermove', (e) => {
      if (!pointers.has(e.pointerId)) return
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pointers.size === 1 && dragging) {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true
        tx = originTx + dx
        ty = originTy + dy
        applyTransform()
      } else if (pointers.size === 2) {
        const [p1, p2] = [...pointers.values()]
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y)
        if (pinchDist > 0) {
          scale = clamp(pinchStartScale * (d / pinchDist), MIN_SCALE, MAX_SCALE)
          applyTransform()
        }
      }
    })

    const endPointer = (e: PointerEvent): void => {
      const wasPinch = pointers.size === 2
      pointers.delete(e.pointerId)
      if (pointers.size > 0) return
      dragging = false
      stage.classList.remove('dragging')
      imageEl?.classList.remove('no-anim')
      // 未放大时横向滑动切换图片
      if (!wasPinch && scale <= 1.01 && moved) {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        if (Math.abs(dx) > 50 && Math.abs(dy) < 80) {
          if (dx > 0) prev()
          else next()
        }
      }
    }
    stage.addEventListener('pointerup', endPointer)
    stage.addEventListener('pointercancel', endPointer)

    // 键盘：Esc 关闭、方向键切换
    document.addEventListener('keydown', (e) => {
      if (!overlay?.classList.contains('open')) return
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    })
  }

  // 全局事件委托：点击内容区图片打开灯箱
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName !== 'IMG') return
    const img = target as HTMLImageElement
    if (!isEligible(img)) return
    e.preventDefault()
    open(img)
  })
}
