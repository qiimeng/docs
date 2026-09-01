import Theme from 'vitepress/theme'
import './style.css'
import './style/var.css'
import './style/lightbox.css'
import { setupLightbox } from './lightbox'

export default {
  ...Theme,
  enhanceApp() {
    setupLightbox()
  }
}
