// src/react-native-debugger.d.ts

declare module 'react-native-debugger' {
    const ReactNativeDebugger: any;
    export default ReactNativeDebugger;
  }
  
  declare global {
    interface Global {
      __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
    }
  }
  