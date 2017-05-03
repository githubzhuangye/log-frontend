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
 * Material-ui风格的表格组件,用于显示key,value结构,只有2列
 *
 */
export default class PropertiesTable extends React.Component {

    static propTypes = {
        //基本属性
        topTitle: React.PropTypes.string,//表格顶上的标题
        displayNames: React.PropTypes.array.isRequired,//字段对应的中文名
        data: React.PropTypes.object.isRequired,//表格内的数据,是一个对象
        fields: React.PropTypes.array.isRequired,//对象的英文字段名


        fieldEnums:React.PropTypes.array,//字段Enum翻译器,name,value显示转换器,{field:'',enum:''},其中enum是name value形式的数据
        fieldFormats: React.PropTypes.array,//字段格式化器,适用于调整数字格式,时间格式,不适用需要请求网络的情况,{field:'',format:func},format示例:format:(value)=>value+'小时'

    };

    render() {
        const { fieldFormats, topTitle, displayNames,fieldEnums, data, fields, pagerComponent} =this.props;
        const cellStyle= {'padding':'4px','whiteSpace': 'normal','wordBreak': 'break-all'};
        return (
            <Table   multiSelectable={false} >
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    {
                        topTitle ?
                            <TableRow>
                                <TableHeaderColumn colSpan={displayNames.length} style={{textAlign: 'center', fontSize: '18px'}}>
                                    {topTitle}
                                </TableHeaderColumn>
                            </TableRow>
                            : ''
                    }
                    <TableRow selectable={true}>
                        <TableHeaderColumn  >{'属性'}</TableHeaderColumn>
                        {/*  style={{'borderRight':'1px solid #DDDDDD'}}  */}
                        <TableHeaderColumn >{'值'}</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true}>
                    {
                        displayNames.map((t, i)=>{

                            let fieldValue = data[fields[i]];
                            let f=fields[i];

                            //获取字段enum翻译器
                            if (fieldEnums && fieldEnums.findIndex(value => value.field == f) != -1) {
                                let fieldEnum = fieldEnums.find(value => value.field == f).enum;
                                fieldValue = fieldEnum.findIndex(val=>val.value==fieldValue) !=-1 ?fieldEnum.find(val=>val.value==fieldValue).name  :fieldValue
                            }

                            //字段格式化器
                            if (fieldFormats && fieldFormats.findIndex(value => value.field == f) != -1) {
                                fieldValue = fieldFormats.find(value => value.field == f).format.call(this,data[fields[i]] ,fieldValue, {data:data,row:t,field:f});//外传一个真实值,一个格式化值,一个环境数据
                            }

                            return(
                                <TableRow key={i} striped={true} selectable={false}   displayBorder={true}>
                                    <TableRowColumn  >{t}</TableRowColumn>
                                    <TableRowColumn  style={cellStyle} ><span  title={fieldValue} >{fieldValue}</span></TableRowColumn>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        );
    }
}


