import React from 'react';
import {
  btnTypes,
  types,
} from '@bento-core/paginated-table';
import {
  tooltipContentForSelectedFile, tooltipContentForAllFile
} from '../../../../../bento/studyDetailData';
import { alertMessage } from '../../../../../bento/fileCentricCartWorkflowData';

export const layoutConfig = [{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_header',
  items: [
  ],
}];

/**
* Configuration display component based on index
* CAUTION: provide position of table component
*/
export const wrapperConfig = [{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_header',
  items: [
    {
      title: 'ADD SELECTED FILES',
      clsName: 'add_selected_button',
      type: types.BUTTON,
      role: btnTypes.ADD_SELECTED_FILES,
      btnType: btnTypes.ADD_SELECTED_FILES,
      tooltipCofig: tooltipContentForSelectedFile,
      conditional: true,
      // applyActiveFilter: true,
    },
    {
      title: 'ADD ALL FILES',
      clsName: 'add_all_button',
      type: types.BUTTON,
      role: btnTypes.ADD_ALL_FILES,
      btnType: btnTypes.ADD_ALL_FILES,
      tooltipCofig: tooltipContentForAllFile,
      conditional: true,
      alertMessage,
    },
  ]
},
{
  container: 'paginatedTable',
  paginatedTable: true,
},
{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_footer',
  items: [
    {
      title: 'ADD SELECTED FILES',
      clsName: 'add_selected_button',
      type: types.BUTTON,
      role: btnTypes.ADD_SELECTED_FILES,
      btnType: btnTypes.ADD_SELECTED_FILES,
      tooltipCofig: tooltipContentForSelectedFile,
      conditional: true,
      // applyActiveFilter: true,
    },
    {
      title: 'ADD ALL FILES',
      clsName: 'add_all_button',
      type: types.BUTTON,
      role: btnTypes.ADD_ALL_FILES,
      btnType: btnTypes.ADD_ALL_FILES,
      tooltipCofig: tooltipContentForAllFile,
      conditional: false,
      alertMessage,
    },
  ],
},
// {
//   container: 'buttons',
//   size: 'xl',
//   clsName: 'container_footer_link',
//   items: [
//     {
//       clsName: 'go_to_cart',
//       url: '#/fileCentricCart',
//       type: types.CUSTOM_ELEM,
//       customViewElem: CustomGoToCartLink,
//     }],
// },
];

/**
* Return title that will be displayed in wrapper buttons
*/
const getButtonTitle = (tab, item) => {
  if (item.role === btnTypes.ADD_ALL_FILES && tab.addAllButtonText) {
    return tab.addAllButtonText;
  } if (item.role === btnTypes.ADD_SELECTED_FILES && tab.buttonText) {
    return tab.buttonText;
  }

  return item.title;
};

export const DisplayCustomText = ({
  tab,
  totalRowCount = 0,
}) => {
  const { id } = tab;
  let text = '';
  switch (id) {
    case 'study_files_tab':
      text = `Add all ${totalRowCount} to My Files?`;
      break;
    default:
      text = `Add all ${totalRowCount} to My Files?`;
      break;
  }
  return (
    <>
      {text}
    </>
  );
};

/**
* 1. title - The title that will be displayed on the button
* 2. addFileQuery - query to addAll files or add selected files on cart
* 3. dataKey - A key used to identify the data variable associated with the add files request.
* 4. responseKeys - provided respose key for addFileQuery
* 5. DisplayCustomText - A function that generates custom text for the confirmation message or dialog.
*/
export const configWrapper = (tab, wrapperConfig, context, totalRowCount) => {
  const wrpConfig = wrapperConfig.map((container) => ({
    ...container,
    items: (!container.paginatedTable) ? container.items.map((item) => ({
      ...item,
      title: getButtonTitle(tab, item),
      addFileQuery: (item.role === btnTypes.ADD_ALL_FILES)
        ? tab.addAllFileQuery : tab.addSelectedFilesQuery,
      dataKey: tab.addFilesRequestVariableKey,
      responseKeys: (item.role === btnTypes.ADD_ALL_FILES)
        ? tab.addAllFilesResponseKeys : tab.addFilesResponseKeys,
      DisplayCustomText: {component: (props) => DisplayCustomText({ tab, ...props, totalRowCount }),
        actions:[
          { label: 'CANCEL', className:'noBtn', type:'Negative' },
          { label: 'CONFIRM', className:'yesBtn', type:'Positive' },
        ],
      },
    })) : [],
  }));
  return wrpConfig;
};
