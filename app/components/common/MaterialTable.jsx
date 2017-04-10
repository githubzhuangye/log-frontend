import React from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

/**
 * Material-ui风格的表格组件,在每行提供按钮组
 *
 * 在Material-ui的表格组件基础上再度封装
 *
 * 1.可以选择装载分页插件
 * 2.可以选择装载右侧的按钮
 *
 * 组装的按钮必须提供action属性
 active:React.PropTypes.func.isRequired,//钩子function,必须要有一个参数i,如action={(i)=>console.log(i)}

 默认传入的参数row表示该行的数据

 带按钮的示例:

 let pager = <MaterialPager pageSize={pageSize} totalCount={totalCount} currentNumber={this.state.currentNumber} active={this.clickPager}/>

 <MaterialTable topTitle={topTitle} titleNames={titleNames} data={TABLE_PAGE_DATA}
 fieldAttributes={fieldAttributes} pagerComponent={pager}
 rowTailComponents={[
                                     <RaisedButton label="查看详情" primary={true} action={(row)=>console.log(row)}  />
                               ]}
 />

 *
 */
export default class MaterialTable extends React.Component {

    static propTypes = {
        topTitle: React.PropTypes.string,//表格顶上的标题
        titleNames: React.PropTypes.array.isRequired,//中文菜单名
        data: React.PropTypes.array.isRequired,//表格内的数据,是一个对象数组
        fieldAttributes: React.PropTypes.array.isRequired,//对象的属性名
        pagerComponent: React.PropTypes.element,//可以安插一个分页插件
        rowTailComponents: React.PropTypes.arrayOf(React.PropTypes.element),//每行最后一格存放的组件数组,比如按钮,必须要有action这个属性,例如action={(i)=>console.log(i)}
    };

    render() {
        const {rowTailComponents, topTitle, titleNames, data, fieldAttributes, pagerComponent} =this.props;
        return (
            <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    {
                        topTitle ?
                            <TableRow>
                                <TableHeaderColumn colSpan={titleNames.length}
                                                   style={{textAlign: 'center', fontSize: '18px'}}>
                                    {topTitle}
                                </TableHeaderColumn>
                            </TableRow>
                            : ''
                    }
                    <TableRow selectable={false}>
                        {
                            titleNames.map((t, i) => {
                                return (
                                    <TableHeaderColumn key={i}>{t}</TableHeaderColumn>
                                )
                            })
                        }
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true}>
                    {
                        data.map((d, i) => {
                            return (
                                <TableRow key={i} striped={true}>
                                    {
                                        fieldAttributes.map((f, j) => {
                                            return (
                                                <TableRowColumn key={i + '' + j}>{d[f]}</TableRowColumn>
                                            )
                                        })
                                    }
                                    {rowTailComponents ?
                                        <TableRowColumn key={i + 'i'}>
                                            {
                                                rowTailComponents.map((r, k) => {
                                                        return (
                                                            <span key={i + '' + k}
                                                                  onClick={r.props.action.bind(this, d)}>{r}</span>
                                                        )
                                                    }
                                                )
                                            }
                                        </TableRowColumn>
                                        : ''
                                    }
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                {
                    pagerComponent ?
                        <TableFooter adjustForCheckbox={false}>
                            <TableRow>
                                <TableRowColumn colSpan={titleNames.length} style={{textAlign: 'right'}}>
                                    {pagerComponent}
                                </TableRowColumn>
                            </TableRow>
                        </TableFooter>
                        : <div></div>
                }
            </Table>
        );
    }
}


