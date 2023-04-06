import React from 'react';
import Checkbox from '../Checkbox';
import classes from './styles.module.css';
interface ServerSelectProps {
  unuseServer: () => void;
  useServer: () => void;
  usingServer: boolean;
  onSaveUpdateServerUrl: () => void;
  serverUrl: string;
  host: string;
  port: number;
  onChangeHost: React.ChangeEventHandler
  onChangePort: React.ChangeEventHandler
}
const ServerSelect = ({
  unuseServer,
  useServer,
  usingServer,
  onSaveUpdateServerUrl,
  serverUrl,
  host,
  port,
  onChangeHost,
  onChangePort
}: ServerSelectProps) => {
  return (
    <div>
      <p className={classes.server}><Checkbox checked={!usingServer} onClick={unuseServer}/> <span>Use Local Data</span></p>
      <p className={classes.server}>
        <Checkbox checked={usingServer} onClick={useServer}/>
        <span>Use Server</span>
        <input type="text" placeholder="host" value={host} onChange={onChangeHost} />
        <input type="text" placeholder="PORT" value={port} onChange={onChangePort} />
        <button onClick={onSaveUpdateServerUrl}>Save</button>
      </p>
      {usingServer && <span>Using Server: {serverUrl }</span>}
    </div>
  );
};

export default ServerSelect;
