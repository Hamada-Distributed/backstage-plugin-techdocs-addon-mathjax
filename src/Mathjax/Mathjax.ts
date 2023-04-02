import { useEffect } from 'react';

function runTypeSet(){
    if (typeof (<any>window)?.MathJax !== "undefined"){
      console.log("MathJax was found and typeset is called!");
      (<any>window).MathJax.typeset();
      return true;
    }
    return false;
};


export const MathjaxAddon = () => {  
  useEffect(()=>{

    if (!runTypeSet()){
      console.log("No MathJax was found, now loading!");
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      document.body.appendChild(script);
      setTimeout(()=>{
        runTypeSet();      
      }, 500);
    };

  }, []);
  
  return null;
};
