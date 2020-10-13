type Renderer = import('../../Core/Renderer').Renderer;
export interface T100 {
  background: [number, number, number];
  listenWindowResize: boolean;
  container: HTMLElement | null;
}
declare function extend_1(
  publicAPI: any,
  model: any,
  initialValues?: Partial<T100>
): void;
export const extend: typeof extend_1;
export interface GenericRenderWindow {
  setBackground: (background: any) => void;
  resize: () => void;
  setContainer: (el: HTMLElement) => void;
  delete: () => void;
  getRenderWindow: () => any;
  getRenderer: () => Renderer;
  getOpenGLRenderWindow: () => any;
  getInteractor: () => any;
  getContainer: () => any;
}
export const newInstance: (args: Partial<T100>) => GenericRenderWindow;
export interface T101 {
  newInstance: (args: Partial<T00>) => GenericRenderWindow;
  extend: typeof extend_1;
}
declare const T102: T101;
export default T102;
