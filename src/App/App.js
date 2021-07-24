import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import './App.css';
import React from 'react';
import Drop from '../Drop/Drop';
import Drag from '../Drag/Drag';
import colorsContext from "../context";
import Form from '../Form/Form'
import store from '../store';

function App() {
    let colors = ['#ec0202', '#d4661c', '#d6824b', '#d6c34b', '#8acc48'];
    let [dones, setDones] = React.useState([]);
    React.useEffect(() => {
        let state = store.getState();
        let table = document.querySelector('.app');
        if (dones.length <= 4) {
            return
        }
        table.style.height = (dones.length * 110 + 130) + 'px';
        if (state === 'added') {
            window.scrollBy(0, 110);
        }

    }, [dones.length]);


    const infoHeaders = ['Tasks Undone', 'Tasks in progress', 'Tasks on checking', 'Tasks on correcting', 'Done'];

    function evalDelete(id) {
        store.dispatch({
            type: 'todos/Deleted'
        })
        setDones(prevState => {
            return prevState.filter(el => el.id !== id);
        })
    }

    function evalSubmit(event) {
        event.preventDefault();
        if (event.target[0].value.length > 30 || event.target[1].value.length > 70) {
            alert('Your text is too long');
            return
        }
        if (dones.length > 10) {
            alert('You cant add more than 10 tasks');
            return
        }

        let info = new Array(2).fill(null).map((el, index) => event.target[index].value).filter(item => item);
            for (let i = 0; i < 2; i++) {
            event.target[i].value = '';
        }

        if (info.length > 1) {
            let elem = {
                id: Symbol(),
                header: info[0],
                more: info[1],
                condition: 0,
                order: new Date()
            }
            setDones(prevState => [...prevState, elem]);
            store.dispatch({
                type: 'todos/Added'
            })
        } else{
            alert('Every note must have a title and a short description');
        }


    }


    function handleDrop(item, stage, order) {

        setDones(prevState => {
                let target = prevState.reduce((accum, el) => {
                    if (el.id === item.id) {
                        el.condition = stage;
                        el.order = order;
                    }

                    accum.push(el);
                    return accum
                }, [])
                return target
            }
        );

    }

    function canRemove(itemStage, dropTargetStage) {
        return itemStage < dropTargetStage
    }

    return (
        <React.Fragment>
            <h1 className='app-header'>Tasks Desk</h1>
            <colorsContext.Provider value={colors}>
                <DndProvider debugMode={true} backend={HTML5Backend}>
                    <div className='app' style={{height: '610px'}}>
                        {
                            infoHeaders.map((el, index) => <Drop stage={index} handleDrop={handleDrop}
                                                                 canRemove={canRemove} info={el}>{
                                dones.reduce((accum, elem, ind) => elem.condition === index ? [...accum,
                                    <Drag key={ind} id={elem.id} header={elem.header} more={elem.more}
                                          condition={elem.condition} order={elem.order}
                                          evalDelete={evalDelete}/>] : accum, [])
                            }</Drop>)
                        }

                    </div>
                </DndProvider>
            </colorsContext.Provider>
            <Form evalSubmit={evalSubmit}/>
        </React.Fragment>
    );
}

export default App;
