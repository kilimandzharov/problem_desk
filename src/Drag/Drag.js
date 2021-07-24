import React from 'react';
import {useDrag} from "react-dnd";
import './Drag.css';


function Drag(props) {
    let [{isDragging}, drag] = useDrag(() => ({
        type: 'card',
        item: {
            id: props.id,
            condition: props.condition,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    const ifOnLast = props.condition === 4;
    return (


        <div style={{
            opacity: isDragging ? 0 : 1,
            textDecoration: ifOnLast ? 'line-through' : 'none',
            color: ifOnLast ? 'green' : 'black'
        }}
             ref={drag} className='drag-source'>
            <div>
            <h3>{props.header}</h3>
            <article>{props.more}</article>
            </div>
            <div style={{color:'red',fontSize:'18px'}} className='cross' onClick={()=>props.evalDelete(props.id)}>&#10006;</div>
        </div>

    )
}

export default Drag