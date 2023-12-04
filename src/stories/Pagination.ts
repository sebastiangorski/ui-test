import { LitElement, TemplateResult, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import {styles} from "./Pagination.css"

export enum ButtonStyle {
  "default" = "DEFAULT",
  "circle" = "CIRCLE"
}

type PageItem = number | '...';

@customElement('wc-pagination')
export class WcPagination extends LitElement {
  /**
   * @ignore
   */
  static override styles = [styles];

  @property({ type: Number }) currentPage = 1;
  @property({ type: Number }) totalPages = 1;
  @property({ type: Number }) pagesToShow = 3;
  @property({ type: ButtonStyle }) buttonStyle: ButtonStyle = ButtonStyle.default
  @property({ type: Boolean }) textControls = false;
  @property({ type: Boolean }) withElipsis = false;

  override render() {
    const buttonType = this.textControls && 'with-string';

    return html`
      <div>
        ${when(!this.textControls,
          () => html`
            <button
                class="pagination-button ${buttonType}"
                button-style="${this.buttonStyle}"
                @click="${this.firstPage}"
                ?disabled="${this.currentPage === 1}"
            >
              ${'<<'}
            </button>
          `,
          () => nothing
        )}

        <button
          class="pagination-button ${buttonType}"
          button-style="${this.buttonStyle}"
          text-controls="${this.textControls}"
          @click="${this.previousPage}"
          ?disabled="${this.currentPage === 1}"
        >
          ${this.textControls ? 'Prev' : '<'}
        </button>

        ${this.renderPageButtons()}

        <button
          class="pagination-button ${buttonType}"
          button-style="${this.buttonStyle}"
          @click="${this.nextPage}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          ${this.textControls ? 'Next' : '>'}
        </button>

        ${when(!this.textControls,
          () => html`
            <button
              class="pagination-button ${buttonType}"
              button-style="${this.buttonStyle}"
              @click="${this.lastPage}"
              ?disabled="${this.currentPage === this.totalPages}"
            >
              ${'>>'}
            </button>
          `,
          () => nothing
        )}
      </div>
    `;
  }

  renderPageButtons(): TemplateResult[] {
    const pages: PageItem[] = this.withElipsis ? this.calculateVisiblePagesWithElipsis() : this.calculateVisiblePagesWithoutElipsi();
    return pages.map((page) => {
      const disabled: boolean = page === '...' || this.currentPage === page;
      const currentPage: string = page === this.currentPage ? 'current' : '';
      const elipsis: string = page === '...' ? 'elipsis' : '';

      return html`
        <button
          class="pagination-button ${currentPage} ${elipsis}"
          button-style="${this.buttonStyle}"
          @click="${() => this.goToPage(page)}"
          ?disabled="${disabled}"
        >
          ${page}
        </button>
    `
    });
  }

  calculateVisiblePagesWithElipsis(): PageItem[] {
    const pages: PageItem[] = [];
    const startPage: number = Math.max(1, this.currentPage - Math.floor(this.pagesToShow / 2));
    const endPage: number = Math.min(this.totalPages, startPage + this.pagesToShow - 1);

    // Pages before elips
    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    // Last page after elipsis
    if (endPage < this.totalPages) {
      if (endPage < this.totalPages  && endPage <= this.totalPages - this.pagesToShow) {
        pages.push('...');
      } else {
        pages.push(this.totalPages - 1);
      }

      // if (this.currentPage === this.totalPages - this.pagesToShow) {
      //   pages.unshift('...');
      // }

      pages.push(this.totalPages);
    }
    return pages;
  }

  calculateVisiblePagesWithoutElipsi(): PageItem[] {
    const pageRange: number[] = [];
    const totalButtons = 5;

    if (this.totalPages <= totalButtons) {
      pageRange.push(...Array.from({ length: this.totalPages }, (_, i) => i + 1));
    } else {
      let start = Math.max(1, this.currentPage - 2);
      const end = Math.min(start + totalButtons - 1, this.totalPages);

      if (end - start + 1 < totalButtons) {
        start = end - totalButtons + 1;
      }

      pageRange.push(...Array.from({ length: end - start + 1 }, (_, i) => start + i));
    }

    return pageRange;
  }

  firstPage() {
    this.goToPage(1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  lastPage() {
    this.goToPage(this.totalPages);
  }

  goToPage(page: PageItem) {
    if (typeof page === "number" && page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.dispatchEvent(new CustomEvent('pagination-change', { detail: this.currentPage }));
    }
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
