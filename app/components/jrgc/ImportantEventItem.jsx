import React from "react";
import Paper from 'material-ui/Paper'


/**
 * 大事记滚动条
 */
export default class ImportantEventItem extends React.Component {

    static propTypes = {
        content: React.PropTypes.string.isRequired,
        timestamp: React.PropTypes.string.isRequired,
        logDetailUrl: React.PropTypes.string.isRequired,
    };

    render() {
        const {content, timestamp, logDetailUrl}=this.props;
        return (

            <Paper zDepth={3}>
                <h4>{timestamp}</h4>
                <p> {content} </p>
                <p><a href={logDetailUrl}>日志详情</a></p>
            </Paper>

        );
    }
}



