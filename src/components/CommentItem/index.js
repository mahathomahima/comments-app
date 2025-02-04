import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
    const {eachCommentDetails} = props
    const {id, name, isLiked, date, comment, initialClassName} = eachCommentDetails
    const initial = name ? name[0].toUpperCase() : ''
    const likeTextClassName = isLiked ? 'button active' : 'button'
    const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

    const postedTime = formatDistanceToNow(date)

    const onClickLike = () => {
        const {toggleIsLiked} = props
        toggleIsLiked(id)
      }
    
    const onDeleteComment = () => {
        const {deleteComment} = props
        deleteComment(id)
      }

    return(
        <li className='comment-item'>
            <div className='comment-container'>
                <div className={initialClassName}>
                    <h1 className='initial'>{initial}</h1>
                </div>
                <div>
                    <div className='username-time-container'>
                        <h1 className='username'>{name}</h1>
                        <p  className='time'>{postedTime} ago</p>
                    </div>
                    <h1 className='comment'>{comment}</h1>
                </div>
            </div>

            <div className='buttons-container'>
                <div className='like-container'>
                    <img src={likeImageUrl} alt='like' className='like-image' />
                    <button
                        className={likeTextClassName}
                        type='button'
                        onClick={onClickLike}
                    >
                        Like
                    </button>
                </div>
                <button
                    type='button'
                    className='button'
                    onClick={onDeleteComment}
                >
                    <img className="delete" src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png" alt="delete" /> 
                </button>
            </div>
            <hr className="comment-line" />
        </li>
    )
}
export default CommentItem