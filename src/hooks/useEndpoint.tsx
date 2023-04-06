import { useState } from 'react';

interface Server {
  host: string;
  port: number;
}

const useEndpoint = () => {
  const [usingServer, setUsingServer] = useState(false);
  const [server, setServer] = useState<Server>({
    host: 'http://localhost',
    port: 3000,
  });

  const serverUrl = () => `${server.host}:${server.port}`;

  return {
    usingServer,
    setUsingServer,
    server,
    serverUrl,
    setServer,
  };
};

export { useEndpoint, type Server };
