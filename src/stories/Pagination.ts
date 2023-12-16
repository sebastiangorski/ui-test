import { LitElement, TemplateResult, html } from 'lit';
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
        ${when(!this.textControls, () => this.renderControlButton('first'))} ${this.renderControlButton('previous')}
        ${this.renderPageButtons()} ${this.renderControlButton('next')}
        ${when(!this.textControls, () => this.renderControlButton('last'))}
      </div>
    `;
  }

  private renderControlButton(buttonType: ControlButtonType): TemplateResult {
    const classes = { withString: this.textControls };
    let content = '';
    let disabled = false;
    let clickAction = () => {};

    switch (true) {
      case buttonType === 'first':
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
      case buttonType === 'last':
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

  private renderPageButtons(): TemplateResult[] {
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

  private calculateRange = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  private calculateVisiblePagesWithElipsis(): PageItem[] {
    const boundaryCount = 1;
    const siblingCount = 1;
    const count = this.totalPages;
    const page = this.currentPage;

    const startPages = this.calculateRange(1, Math.min(boundaryCount, count));
    const endPages = this.calculateRange(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

    const siblingsStart = Math.max(
      Math.min(
        // Natural start
        page - siblingCount,
        // Lower boundary when page is high
        count - boundaryCount - siblingCount * 2 - 1
      ),
      // Greater than startPages
      boundaryCount + 2
    );

    const siblingsEnd = Math.min(
      Math.max(
        // Natural end
        page + siblingCount,
        // Upper boundary when page is low
        boundaryCount + siblingCount * 2 + 2
      ),
      // Less than endPages
      endPages.length > 0 ? endPages[0] - 2 : count - 1
    );

    const itemList = [
      ...startPages,

      // Start ellipsis
      ...(siblingsStart > boundaryCount + 2
        ? ['...']
        : boundaryCount + 1 < count - boundaryCount
          ? [boundaryCount + 1]
          : []),

      // Sibling pages
      ...this.calculateRange(siblingsStart, siblingsEnd),

      // End ellipsis
      ...(siblingsEnd < count - boundaryCount - 1
        ? ['...']
        : count - boundaryCount > boundaryCount
          ? [count - boundaryCount]
          : []),

      ...endPages
    ];

    return itemList;
  }

  private calculateVisiblePagesWithoutElipsis(): PageItem[] {
    let pageRange: number[] = [];

    if (this.totalPages <= this.pagesToShow) {
      pageRange = this.calculateRange(1, this.totalPages);
    } else {
      let start = Math.max(1, this.currentPage - 2);
      const end = Math.min(start + this.pagesToShow - 1, this.totalPages);

      if (end - start + 1 < this.pagesToShow) {
        start = end - this.pagesToShow + 1;
      }

      pageRange = this.calculateRange(start, end);
    }

    return pageRange;
  }

  private firstPage() {
    this.goToPage(1);
  }

  private previousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  private nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  private lastPage() {
    this.goToPage(this.totalPages);
  }

  private goToPage(page: PageItem) {
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
