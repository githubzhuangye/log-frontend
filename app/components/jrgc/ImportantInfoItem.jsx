import React from "react";
import Paper from 'material-ui/Paper'


/**
 * 大事记滚动条
 */
export default class ImportantInfoItem extends React.Component {

    static propTypes = {
        info: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            display:'none'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * 点击显示隐藏内容
     */
    handleClick(){
        if(this.state.display=='block'){
            this.setState({display:'none'});
        }else{
            this.setState({display:'block'});
        }
    }
    render() {
        const {info}=this.props;
        const {display}=this.state;
        return (

            <Paper zDepth={3}>
                <h4>{info.occur_time}&nbsp; {info.messageType},来自:{info.projectName}项目</h4>
                <p> {info.phrase} </p>
                <p><a href="javascript:void(0);" onClick={this.handleClick}>日志详情</a></p>
                <p style={{display:display}}>
                    {info.message}
                </p>
            </Paper>

        );
    }
}



