import { createPlugin } from '@backstage/core-plugin-api';
import {
  createTechDocsAddonExtension,
  TechDocsAddonLocations,
} from '@backstage/plugin-techdocs-react';
import { MathjaxProps } from './Mathjax';
import { MathjaxAddon } from './Mathjax';



export const techdocsAddonMathjaxPlugin = createPlugin({
  id: 'techdocs-addon-mathjax',
});

export const Mathjax = techdocsAddonMathjaxPlugin.provide(
  createTechDocsAddonExtension<MathjaxProps>({
    name: 'MathjaxDiagram',
    location: TechDocsAddonLocations.Content,
    component: MathjaxAddon
  }),
);
