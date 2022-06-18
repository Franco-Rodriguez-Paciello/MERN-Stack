import React, {Component} from "react";



class App extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: []
        };

        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    addTask(event) {
        fetch('/api/tasks', {
            method:'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        })
        .then(res => res.json())
        .then(data => {
            M.toast({html: 'tarea guardada'})
            this.setState({title:'', description:''})
            this.fetchTask();
        })
        .catch(err => console.log(err));

        event.preventDefault();
    }

    componentDidMount(){
        this.fetchTask();
    }

    fetchTask(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({tasks: data});
        });
    }

    deleteTask(id){
        if(confirm('are you sure you want yo delete it?')) {
            fetch(`/api/tasks/${id}`,{
                method:'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
               })
               .then(res => res.json())
               .then(data => {
                console.log(data);
                M.toast({html: 'Task Deleted'});
                this.fetchTask();
               });
        }
     

    }

    editTask(id){
        fetch(`/api/tasks/${id}` ,{
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
           })
            .then(res=>res.json())
            .then(data=>console.log(data));
    }

    handleChange(event) {
       const {name,value} = event.target;
       this.setState({
        [name]:value
       })
    }



    render( ){ 
        return(
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input value={this.state.title} name="title" onChange={this.handleChange} type="text" placeholder="Task Title"/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                               <textarea value={this.state.description} name="description" onChange={this.handleChange} placeholder="Task description" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.editTask(task._id)}>
                                                            <i className="material-icons">edit
                                                            </i>
                                                        </button>
                                                        <button className=" btn light-blue darken-4" style={{margin: '4px' }} onClick={() => this.deleteTask(task._id)}>
                                                            <i className="material-icons">delete
                                                            </i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default App;