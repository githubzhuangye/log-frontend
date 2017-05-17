import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {
    formValueSelector,
    getFormValues,
    Field,
    reduxForm
} from "redux-form";

import {
    FlatButton,
    Dialog,
    RaisedButton,
    MenuItem,
    Checkbox,
    RadioButtonGroup,
    RadioButton,
    TextField,
    Toggle,
    DatePicker
} from 'material-ui'

import {
    ServerNameEnum
}from '../../../consts/Enums'

import {
    AutoComplete,
}from 'redux-form-material-ui'

import {
    renderCheckbox,
    renderInput,
    renderRadioGroup,
    renderSelectField,
    FieldCheckBox,
    FieldRadio,
    FieldSelect,
    MFieldSelect
}from '../../common/MaterialForm'

import {pageSize} from '../../../consts/TablePageSet'


import * as V from '../../../consts/ValidateReduxForm'

import {
   TimeSlotEnum,
   TriggerIntervalEnum,
   TriggerSleepEnum,
   NoticeMembersEnum,
    ChannelArray,
    ProductArray,
    CounterArray
}from '../../../consts/Enums'

import {
    URL_PREFIX,
    URL_YJSZ_CHANNEL_INSERT,
    URL_YJSZ_CHANNEL_UPDATE,
    URL_YJSZ_CHANNEL_PAGE

} from '../../../consts/Urls'

import {
    ACTION_PAGE,
    ACTION_PAGE_SUCCESS,
    ACTION_PAGE_ERROR,

    ACTION_ADD,
    ACTION_ADD_SUCCESS,
    ACTION_ADD_ERROR,

    ACTION_UPDATE,
    ACTION_UPDATE_SUCCESS,
    ACTION_UPDATE_ERROR,

    ACTION_DIALOG_CLOSE,
    ACTION_SELECTROW
} from './redux/Redux'



/**
 * 详细表单
 */
class YjszDialog extends React.Component {

    handleSubmit(values) {
        let params;
        if (this.props.dialog.title == '添加') {
            params={
                ...values,
                ruleSetType:'异常预警',
                createUser:this.props.userInfo.name,
                updateUser:this.props.userInfo.name,
                ruleList:[
                    {
                        ...values
                    }
                ],
            }
            this.props.reqAdd(params);
        } else {
            params={
                ...values,
                ruleSetType:'异常预警',
                updateUser:this.props.userInfo.name,
                ruleList:[
                    {
                        ...values
                    }
                ],
            }
            this.props.reqUpdate(params);
        }

        //不管删除是否成功,都应该撤销选中效果

        //清除selecedRow
        this.props.selectRow({});

        //延迟重新请求数据
        setTimeout(this.refresh.bind(this),800);
        this.props.closeDialog();
    }

    //重新请求数据
    refresh() {
        let params = {
            ...this.props.from_select_values,
            ruleSetType:'异常预警',
            pageSize: pageSize,
            currentNum: 1//默认查询第一页
        };
        this.props.reqData(params);//请求URL的数据
    }


    render() {
        const {closeDialog, dialog, auto, values} =this.props;
        //获取下拉列表
        //redux-form提供的props
        const {error, handleSubmit, reset, submitting, pristine}=this.props;

        //控制表单的使用
        let disabledAtUpdate = dialog.title == '修改' ? true : false;//修改窗口下不能使用
        let disabledAtAdd = dialog.title == '添加' ? true : false;//添加窗口下不能使用

        //控制表单的显隐
        let hide_in_addmode = dialog.title == '添加' ? 'none' : 'inline-block';//创建时间之类的字段在添加时不显示

        //AutoComplete的过滤规则
        const filter = (searchText, key) => searchText == '' || key.indexOf(searchText) !== -1;
        return (
            <div>
                <Dialog title={dialog.title} modal={false} open={dialog.status} onRequestClose={closeDialog}
                        autoScrollBodyContent={true}
                        actions={[
                            <FlatButton label="关闭" primary={true} keyboardFocused={true} onTouchTap={closeDialog}/>,
                        ]}
                >
                    <div style={{padding: '2.5rem 3.5rem 2.5rem 3.5rem'}}>
                        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>

                            <Field name={'id'} component={renderInput} style={{display:'none'}}  type="text" />
                            <Field name={'ruleId'} component={renderInput} style={{display:hide_in_addmode}} disabled={disabledAtUpdate} type="text" label={'ID'} fullWidth={true} />
                            <Field name={'exceptionType'} component={AutoComplete} filter={filter} openOnFocus={true} dataSource={auto.autoExceptionType} floatingLabelText ={'异常类型'} floatingLabelFixed={true}  floatingLabelStyle ={{fontSize:'18px'}} fullWidth={true} menuProps={{maxHeight:300}}  />
                            <Field name={'exceptionContent'} component={AutoComplete} filter={filter} openOnFocus={true} dataSource={auto.autoExceptionContent}  floatingLabelText={'异常名称'} floatingLabelFixed={true}  floatingLabelStyle ={{fontSize:'18px'}}  fullWidth={true} menuProps={{maxHeight:300}}  />
                            <FieldSelect name="serverName" label="服务器名称" options={ServerNameEnum} fullWidth={true}/>
                            <FieldSelect name="timeSlot" label="时间段" options={TimeSlotEnum} fullWidth={true}  />
                            <div>
                                <FieldSelect name="element" label="要素" options={auto.autoElements} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}} />
                                <FieldSelect name="condition" label="条件" options={auto.autoConditionTypes} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                                <Field name={'limValue'} component={renderInput} type="text" floatingLabelText={'阀值'}   style={{width:'8rem'} }  />
                            </div>
                            <FieldSelect name="triggerInterval" label="触发间隔时间(min),数值越小则检测的越频繁,建议选用1分钟" options={TriggerIntervalEnum} fullWidth={true}  />
                            <FieldSelect name="triggerSleep" label="触发休眠时间(min),在该时间段内,只会发送一次警报,建议选用10分钟" options={TriggerSleepEnum} fullWidth={true}  />
                            <MFieldSelect  name="noticePersons"  floatingLabelText={'预警通知名单(多选)'} options={auto.autoUserInfo} checkedValues={this.props.form_dialog_members} fullWidth={true}  multiple={true}  />
                            <MFieldSelect  name="noticeMethods"  floatingLabelText={'预警方式(多选)'} options={auto.autoWarningWays} checkedValues={this.props.form_dialog_notice} fullWidth={true}  multiple={true}  />

                            {/*<FieldCheckBox name="noticeMethods" label="预警方式" options={auto.autoWarningWays}/>*/}
                            <FieldRadio name="level" label="级别" options={auto.autoWarningLevels}/>
                            {/*{error && <strong>{error}</strong>}*/}
                            <div style={{'textAlign': 'right', 'marginTop': '1rem'}}>
                                <RaisedButton label="重置" primary={true} disabled={pristine || submitting} style={{margin: 12}} onClick={reset}/>
                                <RaisedButton type="submit" label={this.props.dialog.title} primary={true} disabled={submitting}/>
                            </div>
                        </form>
                    </div>
                </Dialog>

            </div>
        );
    }
}


//验证
const validate = values => {
    const errors = {}
    return errors;
}


const form = reduxForm({
    form: 'form-yjsz/exception/dialog',
    validate
})(YjszDialog)

export default connect(
    (state, ownProps) => ({
        auto: state.yjsz_exception_redux.auto,
        dialog: state.yjsz_exception_redux.dialog,
        initialValues: state.yjsz_exception_redux.dialog.content,//初始值
        from_select_values: getFormValues('form-yjsz/exception/select')(state),   //获取search表单的所有values
        values: getFormValues('form-yjsz/exception/dialog')(state),   //获取search表单的所有values
        form_dialog_notice:formValueSelector('form-yjsz/exception/dialog')(state,'noticeMethods'),//获取本表单中cacheType的值
        form_dialog_members:formValueSelector('form-yjsz/exception/dialog')(state,'noticePersons'),//获取本表单中cacheType的值
        userInfo: state.global_redux.userInfo,
        page: state.yjsz_exception_redux.page,
    }),
    (dispatch, ownProps) => ({
        reqData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_CHANNEL_PAGE,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        reqAdd: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_CHANNEL_INSERT,
                params: params,
                types: [ACTION_ADD, ACTION_ADD_SUCCESS, ACTION_ADD_ERROR]
            }
        ),
        reqUpdate: (params) => dispatch(
            {
                url: URL_PREFIX + URL_YJSZ_CHANNEL_UPDATE,
                params: params,
                types: [ACTION_UPDATE, ACTION_UPDATE_SUCCESS, ACTION_UPDATE_ERROR]
            }
        ),
        closeDialog: () => {
            dispatch({type: ACTION_DIALOG_CLOSE});
            dispatch(push('/log-frontend/yjsz/exception'));
        },
        selectRow:(selectedRow)=>dispatch({type:ACTION_SELECTROW,selectedRow})
    })
)(form);


