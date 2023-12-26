import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder.addTextInput({
    path: 'sortField',
    name: 'Sort field',
    description: 'Select sort field',
    defaultValue: 'State',
  });
});
