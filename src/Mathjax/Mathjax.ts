import { useEffect } from 'react';
import { useShadowRootElements } from '@backstage/plugin-techdocs-react';
const { init } = require('mathjax');



const mathjaxConfig = {
  loader: {
    load: ['input/tex', 'output/svg'],
  },
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};


let mathjax: any;
let mathjaxPromise = init(mathjaxConfig);


async function processMathjax(preBlock: any){
  if (!mathjax){
    mathjax = await mathjaxPromise;
  }

  const blockText = preBlock.innerText;
  const svg = mathjax.tex2svg( blockText );
  const svgHTML = mathjax.startup.adaptor.outerHTML(svg);
  preBlock.innerHTML = svgHTML;

};


export const MathjaxAddon = () => {

  const mathjaxPreBlocks = useShadowRootElements<HTMLSpanElement>(['.arithmatex']);

  useEffect(()=>{

    mathjaxPreBlocks.forEach(preBlock =>{
      processMathjax(preBlock);
    });

  }, [mathjaxPreBlocks]);
  
  return null;
};
