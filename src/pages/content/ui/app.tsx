import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [cleaning, setCleaning] = useState(false);
  const checkedConversation = useRef({});

  useEffect(() => {
    console.log('content view loaded');
  }, []);

  const handleClickClean = () => {
    setCleaning(true);
    // 第一步：找到 ChatGPT 下aria-label="Chat history" 的元素
    const chatHistoryNav = document.querySelector('[aria-label="Chat history"]');

    // 第二步：给该元素下的 ol => li => a 元素增加一个 checkbox
    const chatGroup = chatHistoryNav.querySelectorAll('ol');
    chatGroup.forEach(item => {
      const chatItem = item.querySelectorAll('li > div');
      chatItem.forEach(item => {
        const conversation = item.querySelector('a');
        conversation.setAttribute('style', 'margin-left: 20px;');
        const conversationId = conversation.getAttribute('href').split('/').pop();
        const checkbox = document.createElement('input');
        checkbox.setAttribute('style', 'position: absolute; top: 10px; left: 5px;');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', event => {
          if (event.target.checked) {
            checkedConversation.current[conversationId] = conversationId;
          } else {
            delete checkedConversation.current[conversationId];
          }
        });
        item.insertBefore(checkbox, item.firstChild);
      });
    });
  };

  const handleDeleteConversations = () => {
    console.log(checkedConversation.current);
  };

  // const handleDeleteConversation = (id: number) => {
  //   // https://chat.openai.com/backend-api/conversation/6e70c1f3-812e-4af9-8a15-0ed301b8ce20
  // };

  return (
    <div className="clean-container">
      {cleaning ? (
        <div
          role="button"
          tabIndex={-1}
          onKeyDown={() => handleDeleteConversations()}
          className="btn"
          onClick={() => handleDeleteConversations()}>
          确定删除?
        </div>
      ) : (
        <div
          role="button"
          tabIndex={-1}
          onKeyDown={() => handleDeleteConversations()}
          className="btn"
          onClick={() => handleClickClean()}>
          清理对话🧹
        </div>
      )}
    </div>
  );
}
