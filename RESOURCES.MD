# Resources Guide for Repository Navigation

Welcome to the repository! This guide is designed to help you understand and effectively navigate through the various resources and commands available in this project. Below is an explanation of key scripts and commands you will encounter.

## Key Commands

### Storybook Development Server
- **Command**: `"storybook": "storybook dev -p 6006"`
- **Purpose**: This command starts the Storybook development server.
- **Usage**: Run this command to view and interact with your components in a live development environment. Storybook will be available at `localhost:6006`.

### Building Styles
- **Command**: `"build-styles": "sass-render --q --suffix '.css.ts' -t ./sass-template.js './src/stories/**/*.scss'"`
- **Purpose**: This command compiles SCSS files into TypeScript files.
- **Usage**: Use this command to convert your SCSS styles into TypeScript files, which can then be imported into your Lit Element components. This ensures styles are encapsulated within the components.

### Building Lit Components
- **Command**: `"build:lit": "rollup -c"`
- **Purpose**: This command compiles your Lit Element components.
- **Usage**: Use this command to bundle your Lit components into a format suitable for production. It leverages Rollup for module bundling.

## Additional Resources
- **Storybook Documentation**: For more detailed information on using Storybook, visit [Storybook Official Documentation](https://storybook.js.org/docs/react/get-started/introduction).

