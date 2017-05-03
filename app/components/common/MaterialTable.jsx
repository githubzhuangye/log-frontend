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
 * 1.可以选择装载分页插件
 * 2.可以选择装载右侧的按钮,一个按钮占用一个格子
 *
 * 组装的按钮必须提供action属性
 active:React.PropTypes.func.isRequired,//钩子function,必须要有一个参数i,如action={(row)=>console.log(row)} ,默认传入的参数row表示该行的数据

 示例:
 let pager = <MaterialPager pageSize={pageSize} totalCount={totalCount} currentNumber={this.state.currentNumber} active={this.clickPager}/>

 <MaterialTable topTitle={TABLE_TOPTITLE} displayNames={TABLE_TITLES} data={TABLE_PAGE_DATA} fieldComponents={TABLE_COMPONENTS}
 fields={TABLE_FIELDS} pagerComponent={pager} fieldFormats={TABLE_FORMATERS} fieldStyles={TABLE_COLUMN_STYLES}
 rowTailComponents={[
                                   <RaisedButton label="显示详情" primary={true} action={this.openDialogAndShowData} style={{'marginRight': '1rem'}}/>,
                               ]}
 />

 *
 */
export default class MaterialTable extends React.Component {

    /**
     * 先使用格式化器,再使用组件化器
     *
     * 注意:
     * 1.fieldComponents的函数有2个参数,第一个是真值,第二个是格式化后的值
     * 2.在Redux文件中写组件化器时,必须要引用import react
     * 3.组件化器和样式器可能有冲突
     *
     *
     //字段样式器
     export const TABLE_COLUMN_STYLES=[
     {
         field:'timeSlot',
         style:(value)=>value ==1 ?{color:'red',width:'4rem','borderBottom':'none'}:{}
     }
     ]
     //字段对应的格式化器
     export const TABLE_FORMATERS=[
     {
         field:'timeSlot',
         format:(value)=>value+'小时'
     }
     ];
     //字段对应的组件器
     export const TABLE_COMPONENTS=[
     {
         field:'timeSlot',
         component:(value,formatValue)=>{return (<button style={value ==1 ?{color:'blue'}:{}}>{formatValue}</button>)}
     }
     ]

     */
    static propTypes = {
        //基本属性
        topTitle: React.PropTypes.string,//表格顶上的标题
        titleNames: React.PropTypes.array.isRequired,//字段对应的中文名
        data: React.PropTypes.array.isRequired,//表格内的数据,是一个对象数组
        fieldAttributes: React.PropTypes.array.isRequired,//字段的英文名

        //针对字段的样式器,格式化器,组件器
        fieldStyles: React.PropTypes.array,//字段样式器(建议写在Redux.js),{field:'',style:func},该样式器,主要是对这一个表格进行调整,style示例: style:(value)=>value ==1 ?{color:'red'}:{}
        fieldEnums:React.PropTypes.array,//字段Enum翻译器(建议写在业务里,需要context),name,value显示转换器,{field:'',enum:''},其中enum是name value形式的数据
        fieldFormats: React.PropTypes.array,//字段格式化器(建议写在Redux.js),适用于调整数字格式,时间格式,不适用需要请求网络的情况,{field:'',format:func},format示例:format:(value)=>value+'小时'
        fieldComponents:React.PropTypes.array,//字段组件器(建议写在业务里,需要引用组件),{field:'',component:func},component示例: component:(value,formatValue)=>{return (<button style={value ==1 ?{color:'red'}:{}}>{formatValue}</button>)}
        fieldMerges:React.PropTypes.array,//字段合并器(向下合并),目前默认合并3行,可以修改,这是一个数组,比如:['limit','level'],这些字段会合并

        //针对行的样式器
        //rowStyle:React.PropTypes.func,//行样式器,还没有使用
        rowClick:React.PropTypes.func,//行点击函数,例如:(rowNum)=>{alert(rowNum);}

        //额外装载的其他组件
        pagerComponent: React.PropTypes.element,//可以安插一个分页插件
        rowTailComponents: React.PropTypes.arrayOf(React.PropTypes.element),//每行最后一格存放的组件数组,比如按钮,必须要有action这个属性,例如action={(i)=>console.log(i)}
    };

    render() {
        const {rowTailComponents, fieldFormats,fieldEnums,fieldMerges,fieldStyles,fieldComponents, topTitle, titleNames, data, fieldAttributes, pagerComponent,rowClick} =this.props;
        return (
            <Table onCellClick={rowClick}  multiSelectable={false} selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    {
                        topTitle ?
                            <TableRow>
                                <TableHeaderColumn colSpan={titleNames.length} style={{textAlign: 'center', fontSize: '18px'}}>
                                    {topTitle}
                                </TableHeaderColumn>
                            </TableRow>
                            : ''
                    }
                    <TableRow selectable={true}>
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
                                <TableRow key={i} striped={true}   displayBorder={true}>
                                    {
                                        fieldAttributes.map((f, j) => {
                                            let fieldStyle={}
                                            let fieldValue=d[f];
                                            let field;

                                            //如果值是一个数组,建议使用格式化器,不要使用以下代码
                                            {/*if(fieldValue instanceof Array)  fieldValue =fieldValue.join(',')*/}

                                            //字段样式器
                                            if(fieldStyles && fieldStyles.findIndex(value => value.field == f) != -1){
                                                fieldStyle=fieldStyles.find(value => value.field == f).style.call(this,d[f]);
                                            }else {
                                                fieldStyle={};
                                            }

                                            //字段Enum翻译器
                                            if (fieldEnums && fieldEnums.findIndex(value => value.field == f) != -1) {
                                                let fieldEnum = fieldEnums.find(value => value.field == f).enum;
                                                fieldValue = fieldEnum.findIndex(val=>val.value==fieldValue) !=-1 ?fieldEnum.find(val=>val.value==fieldValue).name  :fieldValue
                                            }

                                            //字段格式化器
                                            if(fieldFormats && fieldFormats.findIndex(value => value.field == f) != -1){
                                                fieldValue=fieldFormats.find(value => value.field == f).format.call(this, d[f] ,fieldValue,{data:data,row:d,field:f});//外传一个真实值,一个格式化值,一个环境数据
                                            }

                                            //字段组件器
                                            if(fieldComponents && fieldComponents.findIndex(value=>value.field==f)!= -1){
                                                field=fieldComponents.find(value => value.field == f).component.call(this,d[f],fieldValue,{data:data,row:d,field:f});//外传一个真实值,一个格式化值,一个环境数据
                                            }else{
                                                field = <span title={fieldValue} style={fieldStyle} >{fieldValue}</span>;
                                            }

                                            //字段合并器,向下合并
                                            if(fieldMerges){
                                                if (fieldMerges.includes(f)  && i%3==1) {
                                                    return (
                                                        <TableRowColumn  key={i + '' + j}   rowSpan={3} >
                                                            {field}
                                                        </TableRowColumn>
                                                    )
                                                } else if (fieldMerges.includes(f) && i%3!=1) {
                                                    return ([]);
                                                } else {
                                                    return (
                                                        <TableRowColumn key={i + '' + j}     >
                                                            {field}
                                                        </TableRowColumn>
                                                    )
                                                }
                                            }

                                            return (
                                                <TableRowColumn key={i + '' + j}   >
                                                    {field}
                                                </TableRowColumn>
                                            )

                                        })
                                    }
                                    {/*  每行末尾安装的组件  */}
                                    {rowTailComponents ?
                                        [
                                            rowTailComponents.map((r, k) => {
                                                    return (
                                                        <TableRowColumn key={i + 'i' + k}>
                                                            <span key={i + '' + k}
                                                                  onClick={r.props.action.bind(this, d)}>{r}</span>
                                                        </TableRowColumn>
                                                    )
                                                }
                                            )
                                        ]
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


