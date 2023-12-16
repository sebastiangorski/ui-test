import { LitElement, TemplateResult, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { classMap } from 'lit/directives/class-map.js';
import { styles } from './Pagination.css';

export enum ButtonStyle {
  'default' = 'DEFAULT',
  'circle' = 'CIRCLE'
}

type ControlButtonType = 'first' | 'previous' | 'next' | 'last';
type PageItem = number | '...';

@customElement('wc-pagination')
/**
 * @element wc-pagination
 *
 * @event (CustomEvent<number>) pagination-change - Emits the currently selected page in the paginator
 *
 */
export class WcPagination extends LitElement {
  /**
   * @ignore
   */
  static override styles = [styles];

  @property({ type: Number }) currentPage = 1;
  @property({ type: Number }) totalPages = 1;
  @property({ type: Number }) pagesToShow = 3;
  @property({ type: ButtonStyle }) buttonStyle: ButtonStyle = ButtonStyle.default;
  @property({ type: Boolean }) textControls = false;
  @property({ type: Boolean }) withElipsis = false;

  override render() {
    return html`
      <div>
        ${this.renderControlButton('first')} ${this.renderControlButton('previous')} ${this.renderPageButtons()}
        ${this.renderControlButton('next')} ${this.renderControlButton('last')}
      </div>
    `;
  }

  renderControlButton(buttonType: ControlButtonType): TemplateResult {
    const classes = { withString: this.textControls };
    let content = '';
    let disabled = false;
    let clickAction = () => {};

    switch (true) {
      case buttonType === 'first' && !this.textControls:
        content = '<<';
        disabled = this.currentPage === 1;
        clickAction = this.firstPage;
        break;
      case buttonType === 'previous':
        content = this.textControls ? 'Prev' : '<';
        disabled = this.currentPage === 1;
        clickAction = this.previousPage;
        break;
      case buttonType === 'next':
        content = this.textControls ? 'Next' : '>';
        disabled = this.currentPage === this.totalPages;
        clickAction = this.nextPage;
        break;
      case buttonType === 'last' && !this.textControls:
        content = '>>';
        disabled = this.currentPage === this.totalPages;
        clickAction = this.lastPage;
        break;
    }

    return html`
      <button
        class="pagination-button ${classMap(classes)}"
        button-style="${this.buttonStyle}"
        @click="${clickAction}"
        ?disabled="${disabled}"
      >
        ${content}
      </button>
    `;
  }

  renderPageButtons(): TemplateResult[] {
    const pages: PageItem[] = this.withElipsis
      ? this.calculateVisiblePagesWithElipsis()
      : this.calculateVisiblePagesWithoutElipsis();

    return pages.map((page) => {
      const classes = { current: page === this.currentPage, elipsis: page === '...' };
      const disabled: boolean = page === '...' || this.currentPage === page;

      return html`
        <button
          class="pagination-button ${classMap(classes)}"
          button-style="${this.buttonStyle}"
          @click="${() => this.goToPage(page)}"
          ?disabled="${disabled}"
        >
          ${page}
        </button>
      `;
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
      if (endPage < this.totalPages && endPage <= this.totalPages - this.pagesToShow) {
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

  calculateVisiblePagesWithoutElipsis(): PageItem[] {
    const pageRange: number[] = [];

    if (this.totalPages <= this.pagesToShow) {
      pageRange.push(...Array.from({ length: this.totalPages }, (_, i) => i + 1));
    } else {
      let start = Math.max(1, this.currentPage - 2);
      const end = Math.min(start + this.pagesToShow - 1, this.totalPages);

      if (end - start + 1 < this.pagesToShow) {
        start = end - this.pagesToShow + 1;
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
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages && page !== this.currentPage) {
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
