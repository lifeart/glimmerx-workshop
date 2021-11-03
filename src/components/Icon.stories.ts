import Icon from './icon';

export default {
  title: 'Basic usage',
  component: Icon,
  argTypes: {
    bgColor: { control: 'color' },
  },
}

// Story template that can be reused for creating and exporting stories
const Template = (args: Record<string, number | string>) => {
  return {
    componentClass: Icon,
    renderOptions: {
      args: {
        ...args,
      },
    },
  };
};
// Creating and exporing basic story
export const Basic = Template.bind({});
