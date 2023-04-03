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
    console.log("Mathjax not found. Loading Mathjax!");
    mathjax = await mathjaxPromise;
  }

  console.log("Found preBlock with values: ", preBlock.innerText);
  const blockText = preBlock.innerText;
  const svg = mathjax.tex2svg( blockText );
  const svgHTML = mathjax.startup.adaptor.outerHTML(svg);
  preBlock.innerHTML = svgHTML;
  console.log("preBlock has generated svg, now setting innerHTML to svg");
};


export const MathjaxAddon = () => {

  const mathjaxPreBlocks = useShadowRootElements<HTMLSpanElement>(['.arithmatex']);

  useEffect(()=>{

    mathjaxPreBlocks.forEach(preBlock =>{
      console.log(">>FOREACH");
      processMathjax(preBlock);
    });

  }, [mathjaxPreBlocks]);
  
  return null;
};
