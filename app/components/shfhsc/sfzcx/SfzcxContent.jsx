import React from 'react';
import Paper from 'material-ui/Paper';

import styles from './css/ShfhscContent.css'

import SearchForm from './IdCardSearchForm.jsx'
import Histogram from '../../common/Histogram.jsx'
import ChartContainer from './ChartContainer.jsx'
import FanChart from '../../common/FanChart.jsx'
import IdCardTable from './IdCardTable.jsx'
import TabBar from '../TabBar.jsx'

/**
 *
 * 商户返回时长页面 / 身份证查询tab页面
 */
export default class SfzcxContent extends React.Component {

    render() {
        return (
            <Paper className={styles.root} zDepth={1}>
                <SearchForm/>
                <ChartContainer/>
                <IdCardTable/>
            </Paper>
        );
    }
}



