import React from 'react';
import './index.scss';

const Modal = ({open, setOpen,  children}) => (
  <div className={`overlay animated ${open ? 'show' : ''}`}>
  <div className="modal">
    <svg onClick={() => setOpen(false)} height="200" viewBox="0 0 200 200" width="200">
      <title />
      <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
    </svg>
    {children}
  </div>
</div> 
);
function App() {
  const [open, setOpen] = React.useState(false);
 
  return (
    <div className="App">
      <button className="open-modal-btn" 
              onClick={() => setOpen(true)}>😈 Открыть окно
          </button>
      <Modal open={open} setOpen={setOpen}>
        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnIxYWloOHF4NmdjM2xzOThqYmttYzV6OTE3bXpycG80ZXg5eW5mYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nn8uzAnxuchf2OWXNy/giphy.gif" />
        <h2>Hello!</h2>
      </Modal>
         
    </div>
  );
}

export default App;