import React from 'react';

import MyEcharts from './MyEcharts.jsx'


/**
 * 自定义柱状图组件,默认有3个视图
 * 在MyEcharts基础上再度封装
 * 用户只需给定baseOptionSet和dataOptionSet
 */
export default class Histogram extends React.Component {

    static propTypes = {
        baseOptionSet: React.PropTypes.object.isRequired,//定制的参数项
        dataOptionSet: React.PropTypes.object.isRequired,//需要变化的数据
        containerId: React.PropTypes.string.isRequired,//容器的ID
        width: React.PropTypes.string.isRequired,//容器的宽度
        height: React.PropTypes.string.isRequired,//容器的高度
    };

    render() {
        const { baseOptionSet, dataOptionSet,containerId, width, height}=this.props;
        const {TITLE,  X_AXIS_TITLE, Y_AXIS_TITLE, SERIES_NAME, TOOL_TIP_FORMATTER,   } =baseOptionSet;
        const {DATA_ONE,DATA_TWO,DATA_TOTAL,SUB_TITLE, X_AXIS_ARRAY,}=dataOptionSet;

        // 指定图表的配置项和数据
        const baseOption = {
            title: {
                text: TITLE,
                x: 'center',
                subtext: SUB_TITLE,
                subtextStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: TOOL_TIP_FORMATTER,
            },
            toolbox: {
                left: '10%',
                itemSize: 16,
                feature: {
                    saveAsImage: {
                        type: 'jpeg',
                        pixelRatio: 2
                    },
                    dataView: {
                        readOnly: true,
                    },
                    dataZoom: {},
                    magicType: {
                        type: ['line', 'bar'],
                    },
                }
            },
            dataZoom: [
                {
                    type: 'slider',
                    start: 0,
                    end: 55,
                }

            ],
            legend: {
                show: true,
                data: SERIES_NAME,
                right: 0,
                selected: {},
                selectedMode: 'single'
            },
            grid: {
                left: '0%',
                right: '5%',
                bottom: '10%',
                borderColor: 'white',
                containLabel: true,
                show: true,
            },
            xAxis: {
                name: X_AXIS_TITLE,
                nameLocation: 'middle',
                nameGap: 25,
                nameTextStyle: {
                    color: 'black',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 18

                },
                type: 'category',
                data: X_AXIS_ARRAY,
                axisTick: {
                    alignWithLabel: true,
                    interval: 0
                },
                axisLabel: {
                    interval: 'auto'
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                name: Y_AXIS_TITLE,
                nameLocation: 'end',
                nameGap: 5,
                nameTextStyle: {
                    color: 'black',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 18
                },
                axisTick: {
                    alignWithLabel: true
                },
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    name: SERIES_NAME[0],
                    type: 'bar',
                    data: [],
                    barMinHeight: 2,
                    barMaxWidth:30,
                    itemStyle: {
                        normal: {
                            color: 'rgba(17, 168,171, 1)',
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    }
                },
                {
                    name: SERIES_NAME[1],
                    type: 'bar',
                    data: [],
                    barMinHeight: 2,
                    barMaxWidth:30,
                    itemStyle: {
                        normal: {
                            color: '#FF1493',
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    }
                },
                {
                    name: SERIES_NAME[2],
                    type: 'bar',
                    data: [],
                    barMinHeight: 2,
                    barMaxWidth:30,
                    itemStyle: {
                        normal: {
                            color: '#800080',
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    }
                },
            ],
        };
        const dataOption = {
            title: {
                subtext: SUB_TITLE,
            },
            xAxis: {
                data: X_AXIS_ARRAY,
            },
            series: [{
                name: SERIES_NAME[0],
                data: DATA_TOTAL
            }, {
                name: SERIES_NAME[1],
                data: DATA_ONE
            }, {
                name: SERIES_NAME[2],
                data: DATA_TWO
            }
            ]
        };

        console.log('dataOption:');
        console.log(dataOption);
        return (
            <MyEcharts baseOption={baseOption} dataOption={dataOption} containerId={containerId} width={width} height={height}/>
        );
    }
}



