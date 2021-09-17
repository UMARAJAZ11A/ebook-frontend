import axios from 'axios';
import React, { Component } from 'react'

export default class DeleteBook extends Component {
    constructor(props) {
        super(props)
        this.onChangeId = this.onChangeId.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.state = {
             id : 0 ,
             status : ''
        }
    }
    onChangeId(e)
    {
        this.setState({
            id : e.target.value
        })
    }
    onSubmitHandler(e)
    {
        e.preventDefault();
        axios.delete(`${process.env.REACT_APP_SERVER_ADDRESS}/book/`,{params : { id : this.state.id }})
        .then(res => {
            console.log(res);
            this.setState({
                status : `Deleted Book With Id : ${this.state.id} Sccessfully`
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({

                status : `${err}`
            })
        })
    }
    render() {
        return (
            <div className="ml-3">
               
                <h4>Delete Book with specific Id</h4>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group w-25">
                        <label >Id</label>
                        <input className="form-control form-control-sm w-50"
                                type="number"
                                onChange = {this.onChangeId}
                                required></input>
                    </div>
                    <button className="btn btn-primary mt-3">
                        Submit
                    </button>
                    <br/>
                    {this.state.status}
                </form>
            </div>
        )
    }
}
