import 'typeface-roboto'
import 'typeface-roboto-condensed'
import '@vtmn/css-button'
import './style.css'
import App from './src/app.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app
