import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteMessages } from '../../../redux/Messages/deleteMessages';


class DeleteMessages extends Component {
      state= {
        id: 0,
        statusCode: 0
      }
    

     
    handleDelete = (e) => {
        e.preventDefault()
        this.props.deleteMessages(this.state.message)
        this.setState({id: 0})
    }
      

     render() {
        return (
            <>
            <Menu isAuthenticated={this.props.isAuthenticated}/>
            <NewMessages />
            <h1>Message Feed WITH Messages</h1>
            {this.props.messages.map(message=>(
                <React.Fragment key={message.id}>
                {/* <div key={message.id}>
                <h6>author: {message.username}</h6>
                <p>Text: {message.text}</p>
                <p>Date: {message.createdAt}</p> */}
                {message.username===this.props.user &&
                <button>Message</button>
                }
                {/* </div> */}
                </React.Fragment>
            ))}
            </>
        )
     }

    }

export default connect(null, {deleteMessages})(DeleteMessages)