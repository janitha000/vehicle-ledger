import React from 'react';

import VehicleTable from '../components/VehicleTable';

export default {
  title: 'VehicleTable',
  component: VehicleTable,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <VehicleTable {...args} />;

export const TableHeaders = Template.bind({});
TableHeaders.args = {
    tableHeaders : [{key:1, value:"header1"}, {key: 2, value: "header2"}],
    tableRows: [{expense: "AAA", amount: 100}]
    
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
