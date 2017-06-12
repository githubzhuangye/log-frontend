import React from 'react';
import {Link} from 'react-router';
import { browserHistory} from 'react-router';

import styles from './css/HeaderBar.css'

import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

import ActionGrade from 'material-ui/svg-icons/action/grade';
import Book from 'material-ui/svg-icons/action/book';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Apps from 'material-ui/svg-icons/navigation/apps'

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {

    static propTypes = {
      children: React.PropTypes.node.isRequired,
      defaultValue: React.PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

export default class SideBar extends React.Component{

    render() {
        return (
            <SelectableList defaultValue={1}>
                <Subheader>监控系统</Subheader>
                <ListItem value={1} primaryText="今日观察" containerElement={<Link to="/log-frontend/jrgc" />}    />
                <ListItem value={2} primaryText="实时监控" containerElement={<Link to="/log-frontend/ssjk" /> }
                          nestedItems={[
                              <ListItem value={21} primaryText="异常监控" />,
                              <ListItem value={22} primaryText="超时监控" />,
                          ]}
                />
                <ListItem value={3} primaryText="日志报表"  containerElement={<Link to="/log-frontend/rzbb/scbb/idcard" />} initiallyOpen={true}
                          nestedItems={[
                              <ListItem value={31} primaryText="时长报表"  containerElement={<Link to="/log-frontend/rzbb/scbb/idcard" />}            />,
                              <ListItem value={32} primaryText="异常报表"  containerElement={<Link to="/log-frontend/rzbb/ycbb/idcard" />}            />,
                          ]}
                />
                <ListItem value={4} primaryText="预警设置"    initiallyOpen={true}
                          nestedItems={[
                              <ListItem value={41} primaryText="通道预警"  containerElement={<Link to="/log-frontend/yjsz/channel" />} />,
                              <ListItem value={42} primaryText="商户预警"  containerElement={<Link to="/log-frontend/yjsz/member" />} />,
                              <ListItem value={43} primaryText="异常预警"  containerElement={<Link to="/log-frontend/yjsz/exception" />} />,
                              <ListItem value={44} primaryText="系统预警"  containerElement={<Link to="/log-frontend/yjsz/system" />} />,
                              <ListItem value={45} primaryText="智能预警"  containerElement={<Link to="/log-frontend/yjsz/brain" />} />,
                          ]}
                />
                <ListItem value={5} primaryText="服务器监控" initiallyOpen={false}
                          nestedItems={[
                              <ListItem value={51} primaryText="redis缓存监控"  />,
                              <ListItem value={52} primaryText="Mongodb集合监控"/>,
                              <ListItem value={53} primaryText="MySql日志监控"  />,
                          ]}
                />
                <ListItem value={6} primaryText="系统设置"  initiallyOpen={true}
                          nestedItems={[
                              <ListItem value={51} primaryText="用户管理"  containerElement={<Link to="/log-frontend/yhgl/user" />}   />,
                          ]}
                />
                <ListItem value={7} primaryText="意见反馈" />
            </SelectableList>
        );
    }
}


