type Renderer = import('../../Core/Renderer').Renderer;

export interface T100 {
  background: [number, number, number],
  containerStyle: any,
  controlPanelStyle: any,
  listenWindowResize: boolean,
  resizeCallback: (...args: any) => any,
  controllerVisibility: boolean,
}
declare function extend_1(publicAPI: any, model: any, initialValues?: Partial<T100>): void;
export const extend: typeof extend_1;
export interface FullScreenRenderWindow {
  setBackground: (background: any) => void;
  removeController: () => void;
  setControllerVisibility: (visible: boolean) => void;
  toggleControllerVisibility: () => void;
  addController: (html: string) => void;
  // setBackground?
  addRepresentation: (representation: any) => void;
  removeRepresentation: (representation: any) => void;
  delete: () => void;
  resize: () => void;
  setResizeCallback: (callback: (...args) => any) => void;
  getRenderWindow: () => any;
  getRenderer: () => Renderer;
  getOpenGLRenderWindow: () => any;
  getInteractor: () => any;
  getRootContainer: () => any;
  getContainer: () => any;
  getControlContainer: () => any;
}
export const newInstance: (args: Partial<T100>) => FullScreenRenderWindow;
export interface T101 {
  newInstance: (args: Partial<T100>) => FullScreenRenderWindow;
  extend: typeof extend_1;
}
declare const T102: T101;
export default T102;
