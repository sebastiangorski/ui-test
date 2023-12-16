import './Pagination';
import { ButtonStyle, WcPagination } from './Pagination';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/html';

const meta: Meta<WcPagination> = {
  title: 'wc-pagination',
  component: 'wc-pagination',
  parameters: {
    docs: {
      description: {
        component: 'Pagination component'
      },
      events: [
        {
          name: 'pagination-change',
          description: 'Emitted when the current page changes.',
          properties: [
            {
              name: 'detail',
              description: 'The new current page number.'
            }
          ]
        }
      ]
    },
    actions: {
      handles: ['pagination-change'],
      onClick: 'clicked'
    }
  },
  argTypes: {
    currentPage: {
      description: 'Currently set pagination page',
      defaultValue: 1,
      control: { type: 'number', min: 0 }
    },
    totalPages: {
      description: 'Max number of pagination pages available',
      defaultValue: 1,
      control: { type: 'number', min: 1 }
    },
    pagesToShow: {
      description: 'Number of pages to display before elipsis',
      defaultValue: 3,
      control: { type: 'number', min: 0 }
    },
    buttonStyle: {
      options: [ButtonStyle.default, ButtonStyle.circle],
      control: { type: 'radio' },
      description: 'Square or circle styled buttons',
      defaultValue: ButtonStyle.default
    },
    textControls: {
      options: [true, false],
      control: { type: 'boolean' },
      description: 'Display control buttons with arrow icons or text',
      defaultValue: false
    },
    withElipsis: {
      description: 'Display pagination with elipsis',
      defaultValue: false
    }
  }
};

export default meta;
type Story = StoryObj<WcPagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    pagesToShow: 5,
    buttonStyle: ButtonStyle.default,
    textControls: false,
    withElipsis: false
  }
};

export const Elipsis: Story = {
  args: {
    ...Default.args,
    withElipsis: true
  }
};

export const TextControls: Story = {
  args: {
    ...Default.args,
    textControls: true
  }
};

export const Interactive = (args: WcPagination) =>
  html` <wc-pagination
    currentPage="${args.currentPage}"
    totalPages="${args.totalPages}"
    pagesToShow="${args.pagesToShow}"
    buttonStyle="${args.buttonStyle}"
    .textControls="${args.textControls}"
    .withElipsis="${args.withElipsis}"
    @pagination-change="${(e: CustomEvent<number>) => console.log('Page changed:', e.detail)}"
  ></wc-pagination>`;

Interactive['args'] = {
  currentPage: 1,
  totalPages: 10,
  pagesToShow: 3,
  buttonStyle: ButtonStyle.default,
  textControls: false,
  withElipsis: false
};
