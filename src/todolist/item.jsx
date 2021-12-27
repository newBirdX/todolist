import React,{Component} from "react";

export default  class Item extends Component{
    state={
        inEdit:false,//是否进入编辑状态
        flag:true//是否可以执行onblur
    }
    //双击进入编辑状态
    dbClick=()=>{
        let {todo}=this.props;
        this.setState({
            inEdit:true
        },()=>{
            this.refs.ip1.value=todo.value;
            this.refs.ip1.focus();
        })
        
    }
    render(){
        let {inEdit,flag}=this.state;
        let {todo,delTodo,hasCompleted,editTodo}=this.props;
        let {dbClick}=this;
        let completed=todo.hasCompleted?"completed":"";
        let editing=inEdit?completed+" editing":completed;//判断进入编辑状态后所使用的类
        return(
            <li className={editing}>
                <div className="view">
                    <input type="checkbox"  className="toggle" onClick={()=>{hasCompleted(todo)}} checked={todo.hasCompleted}/>
                    <label onDoubleClick={dbClick}>{todo.value}</label>
                    <button className="destroy" onClick={()=>{delTodo(todo)}}></button>
                </div>
                <input type="text"  className="edit" ref="ip1" onBlur={(e)=>{
                   if(flag){
                    todo.value=e.target.value;
                    editTodo(todo);
                    this.setState({inEdit:false})
                   }
                }}
                onKeyUp={(e)=>{
                    if(e.keyCode==13){ todo.value=e.target.value;
                        editTodo(todo);
                        this.setState({inEdit:false})}
                    if(e.keyCode===27){
                            editTodo(todo);
                            this.setState({
                            inEdit:false,
                            flag:false
                        });
                        setTimeout(() => {
                            this.setState({flag:true})
                        }, 10)
                    }
                }
                }
                />
            </li>
        )
    }
}