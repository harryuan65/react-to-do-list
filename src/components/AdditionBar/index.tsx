import React from 'react';
import styles from './styles.module.css';

interface AdditionBarProps {
  newTitle: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onEnterKey: () => void;
  onClick: React.MouseEventHandler;
}

const AdditionBar = ({ newTitle, onChange, onClick, onEnterKey }: AdditionBarProps) => {
  return (
    <div className={styles.additionBar}>
      <input
        type="text"
        onChange={onChange}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            onEnterKey();
          }
        }}
        placeholder="Add a Task..."
        value={newTitle}
      />
      <button className={styles.add} onClick={onClick}>ADD</button>
    </div>
  );
};

export default AdditionBar;
