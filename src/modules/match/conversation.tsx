import { FC } from 'react';
import './conversation.scss';
import Message from './message';

export type Props = {
  messages: {
    text: string;
    side: 'left' | 'right';
    time: string;
  }[];
}

const Conversation: FC<Props> = ({ messages }) => {
  return (
    <div className="conversation-container">
      {messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </div>
  );
}

export default Conversation;