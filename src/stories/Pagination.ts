import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {styles} from "./Pagination.css"
@customElement('wc-pagination')
export class WcPagination extends LitElement {
  /**
   * @ignore
   */
  static override styles = [styles];
  @property() total = 0;

  override render() {
    return html`<p>${this.total}</p>
    <button @click=${() => this.total++}>Increment</button>
    <button @click=${() => this.total--}>Decrement</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [name]: WcPagination;
  }
}

const name = 'wc-pagination';

if (!customElements.get(name)) {
  customElements.define(name, WcPagination);
} else {
  console.warn(`${name} is already defined`);
}