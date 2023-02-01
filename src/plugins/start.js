export default {
    id: 'start',
    plugin: ({type}, context) => {
        const {onRequestStart} = context.componentContext.getProps();
        const {setIsLoading, setIsComplete} = context.componentContext;
        onRequestStart && onRequestStart();
        if (type === 'refresh') {
            setIsLoading(true);
        }
        setIsComplete(false);
    }
};
