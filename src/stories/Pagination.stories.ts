import './Pagination';
import {WcPagination} from "./Pagination";
import {html} from "lit";

export default {
  title: 'wc-pagination',
  component: 'wc-pagination',
};

export const Interactive = (args: WcPagination) => html`<wc-pagination total="${args.total}"></wc-pagination>`;

Interactive['args'] = {
    total: 0,
}