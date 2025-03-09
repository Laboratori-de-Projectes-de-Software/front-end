import ChatWindow from "./ChatWindow";


// Define the message type
interface Message {
    id: string;
    text: string;
    sender: 'user' | 'other';
    timestamp: Date;
  }
  
  // Props for the ChatWindow component
  interface ChatWindowProps {
    messages: Message[];
    currentUser: string;
    otherUser: string;
  }
export default function MatchPage(){
    const sampleMessages: Message[] = [
        {
          id: '1',
          text: 'Hey there! How are you doing?',
          sender: 'user',
          timestamp: new Date('2025-03-09T09:30:00')
        },
        {
          id: '2',
          text: 'I\'m good, thanks for asking! Just working on that project we discussed.',
          sender: 'other',
          timestamp: new Date('2025-03-09T09:32:00')
        },
        {
          id: '3',
          text: 'Hows it coming along? Need any help?',
          sender: 'user',
          timestamp: new Date('2025-03-09T09:33:00')
        },
        {
          id: '4',
          text: 'It\'s going well, but I might need your input on the design later today if you have time.',
          sender: 'other',
          timestamp: new Date('2025-03-09T09:35:00')
        },
        {
          id: '5',
          text: 'Sure thing! I\'m free after 3pm.',
          sender: 'user',
          timestamp: new Date('2025-03-09T09:36:00')
        }
      ];
    
      return (
        <ChatWindow 
          messages={sampleMessages} 
          currentUser="You" 
          otherUser="Alex" 
        />
      );
}