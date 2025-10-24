import React from 'react';
import { headerTypes } from '../../../bento-core'
import CheckboxView from './components/CheckBoxView';
import DeleteCellView from './components/DeleteCellView';

const ActionHeaderCell = ({
  includeSelectedIds,
  toggleSelectAll,
  Ids,
  count,
  rows,
  column,
}) => {
  const { headerType } = column;

  if (headerTypes.CHECKBOX === headerType) {
    return (
      <CheckboxView
        includeSelectedIds={includeSelectedIds}
        toggleSelectAll={toggleSelectAll}
        Ids={Ids}
      />
    );
  }

  if (headerTypes.DELETE === headerType) {
    return (
      <DeleteCellView
        rows={rows}
        count={count}
        column={column}
      />
    );
  }

  return (
    <></>
  );
};

export default ActionHeaderCell;
