import { Component } from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
    'amber',
    'blue',
    'orange',
    'emerald',
    'teal',
    'red',
    'light-blue',
  ]

class Comments extends Component {
    state = {
        commentsList: [],
        name: '',
        comment: '',
    }

    onChangeName = event => {
        this.setState({name: event.target.value})
    }

    onChangeComment = event => {
        this.setState({comment: event.target.value})
    }

    renderCommentsList = () => {
        const {commentsList} = this.state

        return(
            <>
                {commentsList.map(eachCommentDetails => (
                    <CommentItem 
                        eachCommentDetails={eachCommentDetails} 
                        key={eachCommentDetails.id} 
                        toggleIsLiked={this.toggleIsLiked}
                        deleteComment={this.deleteComment}
                    />
                ))}
            </>
        )
    }

    onAddButton = (event) => {
        event.preventDefault()
        const {name, comment} = this.state

        const initialBackgroundClassNames = `initial-container ${
            initialContainerBackgroundClassNames[
                Math.ceil(
                    Math.random() * initialContainerBackgroundClassNames.length - 1,
                )
            ]
        }`

        const newComment = {
            id: uuidv4(),
            name,
            comment,
            date: new Date(),
            isLiked: false,
            initialClassName: initialBackgroundClassNames,
        }

        this.setState(prevState => ({
            commentsList: [...prevState.commentsList, newComment],
            name: '',
            comment: '',
        }))
    }

    deleteComment = commentId => {
        const {commentsList} = this.state
    
        this.setState({
          commentsList: commentsList.filter(comment => comment.id !== commentId),
        })
      }
    
    toggleIsLiked = id => {
        this.setState(prevState => ({
          commentsList: prevState.commentsList.map(eachComment => {
            if (id === eachComment.id) {
              return {...eachComment, isLiked: !eachComment.isLiked}
            }
            return eachComment
          }),
        }))
    }

    render(){
        const {name, comment, commentsList} = this.state
        return(
            <div className='app-container'>
                <div className='comments-container'>
                    <h1 className='app-heading'>Comments</h1>
                    <div className="comments-inputs">
                        <form className='form' onSubmit={this.onAddButton}>
                            <p className='form-description'>Say something about CV Builder.</p>
                            <input 
                                type='text'
                                className='name-input'
                                placeholder='Your Name'
                                value={name}
                                onChange={this.onChangeName}
                            />
                            <textarea 
                                placeholder='Your Comment'
                                className='comment-input'
                                rows="10"
                                value={comment}
                                onChange={this.onChangeComment}
                            />
                            <button className='add-button' type='submit'>
                                Add Comment
                            </button>
                        </form>
                        <img className="image" src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png" alt="comments" />
                    </div>
                    <hr className='line' />
                    <p className='heading'><span className='comments-count'>{commentsList.length}</span>Comments</p>
                    <ul className='comments-list'>{this.renderCommentsList()}</ul>
                </div>
            </div>
        )
    }
}
export default Comments