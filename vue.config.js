import { resolve as _resolve } from 'path';

export const configureWebpack = {
    resolve: {
        alias: {
            '@': _resolve(__dirname, 'src')
        }
    }
};