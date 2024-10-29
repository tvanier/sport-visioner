import 'typeface-roboto'
import 'typeface-roboto-condensed'
import '@vtmn/css-button'
import './style.css'
import { mount } from 'svelte'
import App from './src/app.svelte'

const app = mount(App, {
  target: document.getElementById('app')
})

export default app
