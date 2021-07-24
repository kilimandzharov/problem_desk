import React from 'react'
import './Form.css'

function Form(props) {
    let [change, setChange] = React.useState({
        head: '',
        essential: ''
    });

    function handleInputChange(event) {
        event.preventDefault();
        const key = event.target.name;
        setChange(prevState => ({
            ...prevState, [key]: event.target.value
        }));
    }

    function addToCol(event) {
        props.evalSubmit(event);
        setChange(prevState => ({
            ...prevState, head: '', essential: ''
        }))
    }


    return (

        <React.Fragment>
            <h2 className='form-h2'>Create your own personal task</h2>
            <form onSubmit={addToCol} className='form-form'>


                <label htmlFor='input1' id='label1'>Task name:</label> <input type='text' name='head'
                                                                              value={change.head}
                                                                              onChange={handleInputChange} id='input1' placeholder='Put there name of your task'/>


                <label htmlFor='input2' id='label2'>Essentials:</label> <textarea name='essential'
                                                                                  value={change.essential}
                                                                                  onChange={handleInputChange}
                                                                                  id='input2'
                                                                                  placeholder='Put there some extra info'/>
                <input type='submit' value='SUBMIT' className='submit'/>
            </form>
        </React.Fragment>

    )
}

export default Form