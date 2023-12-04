import type { StorybookConfig } from "@storybook/web-components-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-docs"
  ],

  framework: {
    name: "@storybook/web-components-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },

  webpackFinal: async (config, { configType }) => {
    // Add TypeScript support
    // @ts-ignore
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            // Add any specific options here
          },
        },
      ],
    });

    // @ts-ignore
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },

  docs: {
    autodocs: true
  }
};

export default config;
