import React from "react";
import Paper from "material-ui/Paper";
import styles from "./css/Main.css";


/**
 *
 * 商户返回时长页面 / 身份证查询tab页面
 */
export default class Main extends React.Component {

    render() {
        return (
            <Paper className={styles.root} zDepth={1}>
                <span>正在施工中...</span>
                {this.props.children}
            </Paper>
        );
    }
}



