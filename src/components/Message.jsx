import React from 'react'
import { own, messageContainer, message } from './Message.css'

export default function Message({text, authorId, authorName, userId, theme}) {
    if (authorId === userId) {
        return <div className={`${own} ${messageContainer}`}>
            <p className={`${message} ${theme.userColor} ui inverted segment`}>
                {text}
            </p>
        </div>
    } else {
        return <div className={`${messageContainer}`}>
            <div className={`${message} ${theme.messageColor} ui inverted segment`}>
                <div className={`${theme.userColor} ui top left attached label`}>{authorName}</div>
                <p>{text}</p>
            </div>
        </div>
    }
}
