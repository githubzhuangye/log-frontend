import React from "react";
import Paper from "material-ui/Paper";
import styles from "./css/ShfhscContent.css";
import SearchForm from "./IdCardSearchForm.jsx";
import ChartContainer from "./ChartContainer.jsx";
import Table from "./IdCardTable.jsx";

/**
 *
 * 商户返回时长页面 / 身份证查询tab页面
 */
export default class Main extends React.Component {

    render() {
        return (
            <Paper className={styles.root} zDepth={1}>
                <SearchForm/>
                <ChartContainer/>
                <Table/>
            </Paper>
        );
    }
}



