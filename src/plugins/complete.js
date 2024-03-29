export default {
    id: 'complete',
    plugin: ({type}, context) => {
        const {setIsLoading, setIsComplete, setFetchData} = context.componentContext;
        setFetchData(context.output);
        if (type === 'refresh') {
            setIsLoading(false);
        }
        setIsComplete(true);
    }
};
