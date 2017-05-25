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
    CounterArray,
    ServerNameEnum,
    ProductArray,
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
                ruleSetType:'商户预警',
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
                ruleSetType:'商户预警',
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
            ruleSetType:'商户预警',
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
        const filter = (searchText, key) => {  console.log(key);return !searchText || searchText == '' || key.indexOf(searchText) !== -1};
        //AutoComplete的字段映射关系
        const dataSourceConfig = {
                  value: 'orgCode',
                  text: 'customerName',
                };
        console.log(auto.autoMember);
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
                            <Field name={'member'} component={AutoComplete} filter={AutoComplete.noFilter} openOnFocus={true} dataSource={auto.autoMember} dataSourceConfig={dataSourceConfig} floatingLabelText ={'商户名称'} floatingLabelFixed={true}  floatingLabelStyle ={{fontSize:'18px'}} fullWidth={true} menuProps={{maxHeight:300}}  />
                            <Field name={'product'} component={AutoComplete} filter={filter} openOnFocus={true} dataSource={ProductArray}  floatingLabelText={'产品名称'} floatingLabelFixed={true}  floatingLabelStyle ={{fontSize:'18px'}}  fullWidth={true} menuProps={{maxHeight:300}}  />
                            <FieldSelect name="timeSlot" label="统计时间段" options={TimeSlotEnum} fullWidth={true}  />
                            <div>
                                <FieldSelect name="element" label="要素" options={auto.autoElements} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}} />
                                <FieldSelect name="condition" label="条件" options={auto.autoConditionTypes} style={{'top': '.9rem', 'marginRight': '2rem', 'width': '12rem'}}/>
                                <Field name={'limValue'} component={renderInput} type="text" floatingLabelText={'阀值'}   style={{width:'8rem'} }  />
                            </div>
                            <Field name={'overTime'} component={renderInput} type="text" floatingLabelText={'超时值设置,单位毫秒'} fullWidth={true}  style={{'display':(  this.props.form_element=='duration'?'inline-block':'none')} }  />
                            <FieldSelect name="triggerInterval" label="检测频率(min),数值越小则检测的越频繁,建议选用1分钟" options={TriggerIntervalEnum} fullWidth={true}  />
                            <FieldSelect name="triggerSleep" label="预警休眠时间(min),在该时间段内只有出现更严重的警报才会发送" options={TriggerSleepEnum} fullWidth={true}  />
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
    form: 'form-yjsz/member/dialog',
    validate
})(YjszDialog)

export default connect(
    (state, ownProps) => ({
        auto: state.yjsz_member_redux.auto,
        dialog: state.yjsz_member_redux.dialog,
        initialValues: state.yjsz_member_redux.dialog.content,//初始值
        from_select_values: getFormValues('form-yjsz/member/select')(state),   //获取search表单的所有values
        values: getFormValues('form-yjsz/member/dialog')(state),   //获取search表单的所有values
        form_dialog_notice:formValueSelector('form-yjsz/member/dialog')(state,'noticeMethods'),//获取本表单中cacheType的值
        form_dialog_members:formValueSelector('form-yjsz/member/dialog')(state,'noticePersons'),//获取本表单中cacheType的值
        form_element:formValueSelector('form-yjsz/member/dialog')(state,'element'),
        userInfo: state.global_redux.userInfo,
        page: state.yjsz_member_redux.page,
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
            dispatch(push('/log-frontend/yjsz/member'));
        },
        selectRow:(selectedRow)=>dispatch({type:ACTION_SELECTROW,selectedRow})
    })
)(form);

