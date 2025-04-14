import type { FC } from "react"
import "./conversation.scss"
import Message from "./message"

export type Props = {
  messages: {
    text: string
    side: "left" | "right"
    time: string
  }[]
}

const Conversation: FC<Props> = ({ messages }) => {
  return (
    <div className="conversation-container">
      <div className="conversation-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message-wrapper message-${message.side}`}>
            <Message {...message} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Conversation