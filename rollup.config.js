import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'

import pkg from './package.json'

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true
            }
        ],
        plugins: [
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            })
        ]
    },
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.umd,
                name: "ReactFetch",
                format: 'umd',
                sourcemap: true
            },
            {
                file: pkg['umd:min'],
                name: "ReactFetch",
                format: 'umd',
                sourcemap: true,
                plugins: [terser()]
            },{
                file: 'dist/react-fetch.system.js',
                format: 'system',
                sourcemap: true
            }
        ],
        plugins: [
            external(),
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            }),
            resolve(),
            commonjs(),
            json()
        ]
    }
]
