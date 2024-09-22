import React from 'react';
import HoverTextEffect from './SplitText';

const App: React.FC = () => {
  return (
    <div className=" flex justify-center items-center min-h-screen text-2xl">
        
        soo it's&nbsp;<HoverTextEffect text="Linkedin" className="text-2xl font-bold text-red-500" />  &nbsp; my name
    </div>
  );
};

export default App;