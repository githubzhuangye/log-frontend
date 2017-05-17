import React from 'react';


/**
 * 一些标签组件
 */
export default class Label extends React.Component {

    static propTypes={
        text:React.PropTypes.string,
        color:React.PropTypes.string,
    };

    render() {
        return (
            <div>
                Hello,World!!!<br />
                <button onClick={()=>alert()}>点击</button>
            </div>
        );
    }
}



