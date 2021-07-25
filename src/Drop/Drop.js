import React from 'react';
import {useDrop} from 'react-dnd';
import './Drop.css';
import colorsContext from "../context";

function Drop(props) {
    console.log(props.len);
    let color = React.useContext(colorsContext)[props.stage];
    const [collected, drop] = useDrop(() => ({
        accept: 'card',
        canDrop: (item, monitor) => props.canRemove(item.condition, props.stage),
        drop: (item, monitor) => props.handleDrop(item, props.stage, new Date()),
    }));
    return (
        <div className='drop-target' ref={drop} style={{
            backgroundColor: props.stage % 2 ? '#e8eced' : '#edf1f2',
            borderBottomLeftRadius: props.stage === 0 ? '20px' : '0px',
            borderBottomRightRadius:props.stage===4 ? '20px' : '0px'

        }}>
            <div className='drop-target-header' style={{backgroundColor: color}}>{props.info}</div>
            {props.children.sort((a, b) => a.props.order - b.props.order)}
        </div>
    )
}

export default Drop
