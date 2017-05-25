import React from 'react';
import SearchForm from "./ViewSearchForm.jsx";
import styles from "./css/ShfhscContent.css";
import Paper from "material-ui/Paper";
import ChartContainer from "./ChartContainer.jsx";

/**
 * 简单react组件
 */
export default class Main extends React.Component {

    render() {
        return (
            <Paper className={styles.root} zDepth={1}>
                <SearchForm/>
                <ChartContainer/>
            </Paper>
        );
    }
}



