import {createRoot} from "react-dom/client"
import App from "./App"
import 'index.css'

const renderApp = (el: Element | DocumentFragment) => {
  createRoot(el).render(<App/>)
}

if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "production"
) {
  const selector = document.querySelector("#root")
  if (selector) {
    renderApp(selector)
  }
}

export { renderApp }
