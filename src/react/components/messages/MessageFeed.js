import React, { Component } from 'react';
import Menu from '../Menu';
import { userIsAuthenticated } from "../../HOCs";
import { connect } from 'react-redux';
import { getMessages } from '../../../redux/Messages/getMessages';
import NewMessages from './NewMessages'


class MessageFeed extends Component {

    state= {
        messages: [],
        loading: false,
    }

    componentDidMount(){
        this.props.getMessages()
        // console.log(this.props.messages)
    }
     

    //  handleLike = (e) => {

    //  }

    render() {
        //create form "text box" start user
        
        if(this.props.messages===null){
            return(
                <>
                <Menu isAuthenticated={this.props.isAuthenticated}/>
                <NewMessages />
                <h1>Message Feed without Messages</h1>
                </>
            )}
        return (
            <>
            <Menu isAuthenticated={this.props.isAuthenticated}/>
            <NewMessages />
            <h1>Message Feed WITH Messages</h1>
            {this.props.messages.map(message=>(
                <React.Fragment key={message.id}>
                <div key={message.id}>
                <h6>author: {message.username}</h6>
                <p>Text: {message.text}</p>
                <p>Date: {message.createdAt}</p>
                {message.username===this.props.user &&
                <button>Message</button>
                // <button onClick={handleLike} key={like.id}</button>
                }
                </div>
                </React.Fragment>
            ))}
            </>
        )
    }
}

const mapStateToProps = state => {

    return{
      //this is where we connect the info from our store to our react props
      messages: state.messages.getMessages.result,
      user: state.auth.login.result.username

    }
}

const mapDispatchToProps={
    //this where we connect actions/functions to our react
    getMessages
}
export default connect(mapStateToProps, mapDispatchToProps) (userIsAuthenticated(MessageFeed));