import { useEffect } from 'react';

export const MathjaxAddon = () => {  
  useEffect(()=>{
    if (typeof (<any>window)?.MathJax !== "undefined"){
      (<any>window).MathJax.typeset();
    };

  }, []);
  
  return null;
};
