import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';


export default {
    input: 'src/stories/Pagination.ts',
    output: {
        file: 'src/pagination.js',
        format: 'es',
    },
    plugins: [
        nodeResolve(),
        typescript(),]
};
