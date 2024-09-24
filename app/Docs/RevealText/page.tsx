import React from 'react';
import ScrollReveal from './ScrollReveal';

const RevealTextPage: React.FC = () => {
  return (
    <div className="min-h-screen">

    <ScrollReveal 
  text="This is a word-by-word reveal text" 
  mode="GrayReveal" 
  className="text-3xl font-semibold"

/>



</div>
  );
};

export default RevealTextPage;