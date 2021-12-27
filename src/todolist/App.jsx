import React, { Component } from 'react'
import Footer from './footer'
import Item from './item'
export default class App extends Component {
    state={
        todoDatas:[],
        todoNum:0,//未完成todo的数量
        view:"all",//过滤todo
        flag:false//默认下是全不选
    }
    // 添加todo
    addTodo=(e)=>{
        if(e.keyCode!==13) return;
        if(e.target.value.trim()==="") return;
        let {todoDatas,todoNum}=this.state;
        let todo={};
        todo.id=new Date().getTime();
        todo.value=e.target.value.trim();
        todo.hasCompleted=false;
        todoDatas.push(todo);
        todoNum++;
        this.setState({todoDatas,todoNum});
        e.target.value="";
    }
    // 删除todo
    delTodo=(todo)=>{
        let {todoDatas,todoNum}=this.state;
        todoDatas=todoDatas.filter((value)=>{
            if(todo.id===value.id){
                if(!todo.hasCompleted){
                    todoNum--
                }
                return false;
            }
            return true;
        })
        this.setState({todoDatas,todoNum});
    }
    // 改变todo状态
    hasCompleted=(todo)=>{
        let {todoDatas,todoNum}=this.state;
        todoDatas=todoDatas.map((value)=>{
            if(todo.id===value.id){
                if(todo.hasCompleted){
                    todoNum++
                }else{
                    todoNum--
                }
                value.hasCompleted=!todo.hasCompleted
            }
            return value
        })
        this.setState({todoDatas,todoNum})
    }
    // 编辑todo
    editTodo=(todo)=>{
        let {todoDatas}=this.state;
        todoDatas=todoDatas.map((value)=>{
            if(todo.id===value.id){
                value.value=todo.value;
            }
            return value
        })
        this.setState({todoDatas});
    }
    //过滤todo
    filterTodo=(view)=>{
        this.setState({view})
    }
    //清除所有已完成的todo
    clearTodo=()=>{
        let {todoDatas}=this.state;
        todoDatas=todoDatas.filter((value)=>{
            if(value.hasCompleted){
                return false;
            }
            return true;
        })
        this.setState({todoDatas})
    }
    // 全选
    isAll=()=>{
        let{flag,todoDatas,todoNum}=this.state;
        flag=!flag;//改变是否全选的状态
        todoDatas=todoDatas.map((value)=>{
            if(flag){
                value.hasCompleted=true;
                todoNum=0;
            }else{
                value.hasCompleted=false;
                todoNum=todoDatas.length;
            }
            return value;
            })
           
            this.setState({flag,todoDatas,todoNum});

    }
    render() {
        let {todoDatas,todoNum,view}=this.state;
        let {addTodo,delTodo,hasCompleted,editTodo,filterTodo,clearTodo,isAll}=this;
        let filterTodos=todoDatas.filter((value)=>{
            switch(view){
                case 'all':
                    return true; //查看全部
                case 'active':
                    return !value.hasCompleted; //查看未完成的todo
                case 'completed':
                    return value.hasCompleted;//查看已完成的todo
            }
        })
        let items=filterTodos.map((todo)=>{
            return(
                <Item todo={todo} delTodo={delTodo} hasCompleted={hasCompleted} editTodo={editTodo} key={todo.id} />
            )
        })
        return (
            <section className='todoapp'>
                <header className='header'>
                    <h1>Todos</h1>
                    <input type="text" className='new-todo'  placeholder='What need to be done?' onKeyUp={addTodo}/>
                </header>
                <section className='main'>
                <input type="checkbox" className='toggle-all' id='toggle-all' onChange={isAll}/>
                    <label htmlFor="toggle-all"></label>
                    <ul className='todo-list'>
                        {
                            items
                        }
                    </ul>
                </section>
                <Footer todoNum={todoNum} filterTodo={filterTodo} clearTodo={clearTodo}/>
            </section>
        )
    }
}
