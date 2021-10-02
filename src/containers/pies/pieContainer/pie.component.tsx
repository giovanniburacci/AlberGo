import React from 'react';
import {Pie} from 'react-chartjs-2';
interface Pie {
    data: {}
}
const PieContainer = (props:Pie) => {
    const {data} = props;
    return (
        <Pie data={data}/>
    )
}

export default React.memo(PieContainer, (prevProps,nextProps) => prevProps !== nextProps);