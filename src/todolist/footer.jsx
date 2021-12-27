import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        let {todoNum,filterTodo,view,clearTodo}=this.props;
        // let dis=todonum
        return (
            <footer className='footer'>
                <span className='todo-count'>
                    <strong>{todoNum}</strong>
                    <span>item left</span>
                </span>
                <ul className='filters'>
                    <li><a href="#/all" onClick={()=>{filterTodo("all")}} className={view==="all"?"selected":""}>all</a></li>
                    <li><a href="#/active" onClick={()=>{filterTodo("active")}} className={view==="active"?"selected":""}>active</a></li>
                    <li><a href="#/completed" onClick={()=>{filterTodo("completed")}} className={view==="completed"?"selected":""}>completed</a></li>
                </ul>
                <button className='clear-completed' onClick={clearTodo}>clear Completed</button>
            </footer>
        )
    }
}
