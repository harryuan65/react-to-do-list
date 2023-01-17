import React from 'react';
import { Endpoint } from '../../hooks/useEndpoints';
import styles from './styles.module.css';

interface BackendSelectProps {
  endpoint: Endpoint,
  availableEndpoints: Endpoint[];
  onChange: React.ChangeEventHandler;
}

const BackendSelect = ({ endpoint, availableEndpoints, onChange }: BackendSelectProps) => {
  return (
    <>
      <select className={styles.select} name="" id="" onChange={onChange}>
        {availableEndpoints.map((endpoint, i) => <option key={endpoint.name} value={i} data-index={i}>{endpoint.name}</option>)}
      </select>
    </>
  );
};

export default BackendSelect;
