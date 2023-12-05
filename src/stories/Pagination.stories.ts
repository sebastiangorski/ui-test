import './Pagination';
import {ButtonStyle, WcPagination} from "./Pagination";
import {html} from "lit";

export default {
  title: 'wc-pagination',
  component: 'wc-pagination',
  argTypes: {
    buttonStyle: {
      options: [ButtonStyle.default, ButtonStyle.circle],
      control: { type: 'radio' },
    },
    textControls: {
      options: [true, false],
      control: { type: 'boolean' },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Pagination component',
      },
      events: [
        {
          name: 'pagination-change',
          description: 'Emitted when the current page changes.',
          properties: [
            {
              name: 'detail',
              description: 'The new current page number.',
            },
          ],
        },
      ],
    },
  },
};

export const Interactive = (args: WcPagination) => html`
  <wc-pagination
    currentPage="${args.currentPage}"
    totalPages="${args.totalPages}"
    pagesToShow="${args.pagesToShow}"
    buttonStyle="${args.buttonStyle}"
    .textControls="${args.textControls}"
    .withElipsis="${args.withElipsis}"
  ></wc-pagination>`;

Interactive['args'] = {
  currentPage: 1,
  totalPages: 10,
  pagesToShow: 3,
  buttonStyle: ButtonStyle.default,
  textControls: false,
  withElipsis: false
}
