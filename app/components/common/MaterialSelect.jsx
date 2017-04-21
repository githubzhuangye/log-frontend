import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


/**
 * Material-ui风格的下拉列表组件
 * 默认第一个为空
 */
export default class MaterialSelect extends React.Component {
    static propTypes = {
        keys: React.PropTypes.array.isRequired,//keys的列表
        values: React.PropTypes.array.isRequired,//值的列表
        label:React.PropTypes.string.isRequired,  //标签
    };

    render() {
        const {keys, values,label,value,onChange}=this.props;
        return (
            <SelectField {...this.props} floatingLabelText={label}  maxHeight={400}>
                <MenuItem value={''} primaryText=""/>
                {
                    keys.map((key, i) => {
                        return (
                            <MenuItem value={values[i]} key={i} primaryText={keys[i]}/>
                        )
                    })
                }
            </SelectField>
        );
    }
}



