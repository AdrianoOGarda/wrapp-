import React from 'react'

function Chat({match: {params: {userId}}}) {
    return (
        <div>
            Your chat with {userId}
        </div>
    )
}

export default Chat
