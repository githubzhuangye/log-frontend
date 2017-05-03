import React from 'react';
import {
    FlatButton,
    Dialog,
    RaisedButton,
    MenuItem,
    Checkbox,
    RadioButtonGroup,
    RadioButton,
    SelectField,
    TextField,
    Toggle,
    DatePicker
} from 'material-ui'


import {
    AutoComplete,
    SelectField as MSelectField,
}from 'redux-form-material-ui'

import {
    formValueSelector,
    getFormValues,
    Field,
    reduxForm
} from "redux-form";

/**
 * 提供Material-ui风格的一组控件
 */



/*renderInput|参数效验*/
//默认是inline-block形式,添加fullWidth可以变成一行
export const renderInput = ({input, label,  type, disabled, meta: {touched, error, warning}, ...others}) => (
    <TextField floatingLabelText={label}  floatingLabelFixed={true} floatingLabelStyle ={{fontSize:'18px'}}
               errorStyle={{color: 'orange'}} errorText={touched && error || warning}
               {...input} {...others} disabled={disabled}
    />
)

/*renderSelectField|参数效验*/
export const renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => (
    <SelectField  {...input} {...custom} children={children}
                 floatingLabelText={label} floatingLabelFixed={true}  floatingLabelStyle ={{fontSize:'18px'}}
                 errorText={touched && error} errorStyle={{color: 'orange'}}
                 onChange={(event, index, value) => {input.onChange(value);}}
                  />
)

/*renderRadio|参数效验*/
export const renderRadioGroup = ({ input, ...rest }) => (
    <RadioButtonGroup {...input} {...rest} valueSelected={input.value} onChange={(event, value) => input.onChange(value)}/>
)

/*renderCheckbox|参数效验*/
//默认使用float设置为一行
export const renderCheckbox = ({ input, label }) => (
    <Checkbox label={label} checked={input.value ? true : false} onCheck={input.onChange} style={{'maxWidth':'6rem','float':'left'}}/>
)

/*  封装的下拉列表|本人  */
/*  重度封装,无法定制每个选项的选择效果  */
export const FieldSelect = ({name, label, options, ...others}) => (
    <Field   {...others}   name={name} component={renderSelectField} label={label}>
        {
            options.map((item, i) =>
                <MenuItem value={item.value} primaryText={item.name} key={i} insetChildren={true} />
            )
        }
    </Field>
)

/*  封装的下拉列表|推荐  */
/*  使用了redux-form-material-ui的FieldSelect  */
/*  checkedValues表示当前选中的值 */
/*  重度封装,无法定制每个选项的选择效果  */
export const MFieldSelect = ({name,  options,checkedValues, ...others}) => (
    <Field   {...others}   name={name} component={MSelectField}  maxHeight={300}>
        {
            options.map((item, i) =>
                <MenuItem value={item.value} key={i} primaryText={item.name} checked={checkedValues && checkedValues.includes(item.value)} insetChildren={true}/>
            )
        }
    </Field>
)



/*  封装的单选框组  */
/*  重度封装,限制所有单选框为一行  */
export const FieldRadio=({name, label, options, ...others}) => (
    <div>
        <div style={{width:'100%','marginBottom':'0.8rem','marginTop':'1.1rem'}}><label htmlFor={name} style={{'fontSize':'16px',color:'rgba(0, 0, 0, 0.298039)','lineHeight':'22px','marginBottom':'1rem'}}>{label}</label></div>
        <Field id={name} name={name} component={renderRadioGroup}  label={label}>
            {
                options.map((lev,i)=>
                    <RadioButton value={lev.value} label={lev.name} style={{'maxWidth':'6rem','float':'left','color':'rgba(0, 0, 0, 0.298039)'}}  key={i}/>
                )
            }
        </Field>
        <div style={{'clear':'both'}}></div>
    </div>
)

/*  封装的复选框组  */
/*  重度封装,限制所有复选框为一行  */
export const FieldCheckBox=({name, label, options, ...others}) => (
    <div>
        <div style={{width:'100%','marginBottom':'0.8rem','marginTop':'1.1rem'}}><label htmlFor={name} style={{'fontSize':'16px',color:'rgba(0, 0, 0, 0.298039)','lineHeight':'22px','marginBottom':'1rem'}}>{label}</label></div>
        {
            options.map((o,i)=>
                <Field {...others} name={`${name}[${i}]`} component={renderCheckbox} label={o.name}  key={i} />
            )
        }
        <div style={{'clear':'both'}}></div>
    </div>
)
