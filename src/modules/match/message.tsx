import { FC } from 'react';
import './message.scss';

export type Props = {
  text: string;
  side: 'left' | 'right';
  time: string;
}

const Message: FC<Props> = ({ text, side, time }) => {
  return (
    <div className={`bubble-${side}`}>
      <p className="text">{text}</p>
      <p className="time">{time}</p>
    </div>
  );
}

export default Message;