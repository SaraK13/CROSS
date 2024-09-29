import { useState, useEffect } from 'react';
import log, { getLogs } from '../services/loggingService';

// Custom hook to log messages.
//allows components to easily access the logging service and manage state related to logs.
export const useLogger = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setLogs(getLogs()); // Load logs into state
  }, []);

  const logInfo = (message: string) => {
    log.info(message); // Log an info message
    setLogs(getLogs()); // Update logs state
  };

  const logError = (message: string) => {
    log.error(message); // Log an error message
    setLogs(getLogs()); // Update logs state
  };

  return {
    logs,
    logInfo,
    logError,
  };
};
