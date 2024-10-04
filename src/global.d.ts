// Declare that the process object in Electron contains a type property
interface Process {
    type?: string;
  }
  
  // Extend the window object to include process for Electron
  interface Window {
    process?: Process;
  }
  