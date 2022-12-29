import React from 'react';
import { ReactComponent as CheckboxSVG } from '../../assets/Checkbox__unchecked.svg';
import { ReactComponent as CheckboxCheckedSVG } from '../../assets/Checkbox__checked.svg';
import styles from './styles.module.css';

interface CheckboxProps {
  checked: boolean,
  onClick: React.MouseEventHandler
}

const Checkbox = ({ checked, onClick }: CheckboxProps) => {
  const props = {
    onClick,
    className: [styles.checkbox, checked && styles.done].join(' '),
  };

  if (checked) {
    return <CheckboxCheckedSVG {...props} />;
  } else {
    return <CheckboxSVG {...props} />;
  }
};
export default Checkbox;
