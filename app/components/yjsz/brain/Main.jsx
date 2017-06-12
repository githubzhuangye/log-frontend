import React from "react";
import Paper from "material-ui/Paper";
import BreadHead from '../../../components/common/BreadHead.jsx'


/**
 *
 * 商户返回时长页面 / 身份证查询tab页面
 */
export default class Main extends React.Component {

    render() {
        return (
            <div>
                <BreadHead firstLevel="预警设置" firstUrl="/yjsz/brain" secondLevel={'智能预警'} secondUrl={'/yjsz/brain'} disabled={false}/>
                <Paper  zDepth={1}>
                    <div>智能预警设置.....</div>
                </Paper>
            </div>
        );
    }
}



