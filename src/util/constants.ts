export enum ResponseStatusType {
  SUCCESS,
  FAIL
}

export class DebugModeSingleton {
  private static instance: DebugModeSingleton
  private DEBUG_MODE: boolean = false
  private constructor () {
    // Private constructor to prevent instantiation from outside
  }

  static getInstance (): DebugModeSingleton {
    if (!DebugModeSingleton.instance) {
        DebugModeSingleton.instance = new DebugModeSingleton()
    }
    return DebugModeSingleton.instance
  }

  

   isDebugMode () {
    return this.DEBUG_MODE;
  }

  setDebugMode (mode: boolean) {
    console.log('debug mode : ' + mode)
    this.DEBUG_MODE = mode
  }
}
