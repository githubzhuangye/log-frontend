import React from "react";
import Paper from "material-ui/Paper";
import styles from "./css/ShfhscContent.css";
import SearchForm from "./YcbbBankCardSearchForm.jsx";
import YcbbIdCardTable from './YcbbBankCardTable'
import StatiscsList from './StatiscsTable.jsx'

/**
 *
 * 商户返回时长页面 / 身份证查询tab页面
 */
export default class YcbbIdCardContent extends React.Component {

    render() {
        return (
            <Paper className={styles.root} zDepth={1}>
                <SearchForm/>
                {/*<StatiscsList/>*/}
                <YcbbIdCardTable/>
            </Paper>
        );
    }
}



