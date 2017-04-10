import React from 'react';
import ImportantEventItem from './ImportantEventItem.jsx'
import Paper from 'material-ui/Paper'

const importEvent=[
    {
        timestamp:'2017-03-20 13:21:08',
        content:'商户2145671135464833 访问身份证服务 时长达到5200ms',
        logDetailUrl:'/home'
    },
    {
        timestamp:'2017-03-20 13:23:46',
        content:'商户2145671135464833 访问身份证服务 ,截止现在为止, 超过2000ms的情况已经达到3次',
        logDetailUrl:'/home'
    },
    {
        timestamp:'2017-03-20 13:23:53',
        content:'商户2145671135464833 访问身份证服务 出现商户余额不足',
        logDetailUrl:'/home'
    },
]

/**
 * 大事记滚动版
 */
export default class ImportantEventList extends React.Component {

    render() {
        return (
            <div>
                <h2>今日大事记滚动版</h2>
                {
                    importEvent.map((e,i)=>{
                        return (
                           <ImportantEventItem key={i} content={e.content} timestamp={e.timestamp} logDetailUrl={e.logDetailUrl}  />
                        )
                    })
                }
            </div>
        );
    }
}



