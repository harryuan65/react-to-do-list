import React from 'react';
import { ToDoItemStatus } from '../../types';
import classes from './style.module.css';
interface FilterBarProps{
  searchTerm: string;
  onSearch: React.ChangeEventHandler,
  filterStatus: null | ToDoItemStatus;
  onFilter: (setToStatus: null|ToDoItemStatus) => void;
}

const FilterBar = ({ searchTerm, filterStatus, onSearch, onFilter }: FilterBarProps) => {
  // Add active class to span when current filter status matches with it
  const statusClassesFor = (targetStatus: ToDoItemStatus | null) => {
    return [filterStatus === targetStatus && classes.active, classes.filterStatus].join(' ');
  };
  return (
    <div className={classes.filterBar}>
      <input placeholder="Search something..." type="text" value={searchTerm} onChange={onSearch} className={classes.search} />
      <div className={classes.statuses}>
        <span onClick={() => onFilter(null)} className={statusClassesFor(null)}>All</span>
        <span onClick={() => onFilter(ToDoItemStatus.ACTIVE)} className={statusClassesFor(ToDoItemStatus.ACTIVE)}>Active</span>
        <span onClick={() => onFilter(ToDoItemStatus.DONE)} className={statusClassesFor(ToDoItemStatus.DONE)}>Done</span>
      </div>
    </div>
  );
};

export default FilterBar;
