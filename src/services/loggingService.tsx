import log from 'loglevel';

const logMemory: string[] = [];

// Set the logging level (info, warn, error, etc.)
log.setLevel('info');

// Override log methods to capture logs in memory
const originalFactory = log.methodFactory;
log.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);
  return (...message: unknown[]) => {
    const formattedMessage = `${methodName.toUpperCase()}: ${message.join(' ')}`;
    logMemory.push(formattedMessage);
    rawMethod.apply(this, message);
  };
};

// A function to get the saved logs
export const getLogs = () => logMemory;

// Export the logger for use in components
export default log;
