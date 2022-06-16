export default {
    id: 'start',
    plugin: ({type}, context) => {
        const {setIsLoading, setIsComplete} = context.componentContext;
        if (type === 'refresh') {
            setIsLoading(true);
        }
        setIsComplete(false);
    }
};
