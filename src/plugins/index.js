import start from './start';
import loader from './loader';
import params from './params';
import cache from './cache';
import request from './request';
import cacheRecord from './cache-record';
import transformResponse from './transform-response';
import outputData from './output-data';
import loadMore from './load-more';
import complete from './complete';
import error from './error';

export const plugins = [start, params, loader, cache, request, cacheRecord, transformResponse, outputData, loadMore, complete, error];

const globalContext = {};

export const createRunner = (componentContext) => {
    return async (props) => {
        const allPlugins = plugins;
        const pluginContext = {
            props,
            globalContext,
            componentContext,
            requestContext: {},
            outputStack: {},
            errorStack: {},
            runPath: [],
            output: null
        };
        for (let currentPlugin of allPlugins) {
            try {
                // 依赖检查，依赖插件没有成功运行，跳过插件
                if ((currentPlugin.dependencies || []).find((name) => {
                    return pluginContext.runPath.indexOf(name) === -1;
                })) {
                    continue;
                }
                const output = await currentPlugin.plugin(props, pluginContext);
                pluginContext.outputStack[currentPlugin.id] = output;
                pluginContext.output = output || pluginContext.output;
                pluginContext.runPath.push(currentPlugin.id);
            } catch (e) {
                console.error(e);
                pluginContext.errorStack[currentPlugin.id] = e;
            }
        }
        return pluginContext;
    }
};
