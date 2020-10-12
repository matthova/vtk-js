export interface T100 {
  renderers: any[];
  views: any[];
  interactor: any;
  neverRendered: boolean;
  numberOfLayers: number;
}
export const DEFAULT_VALUES: T100;
export interface T101 {
  renderers: any[];
  views: any[];
  interactor: any;
  neverRendered: boolean;
  numberOfLayers: number;
}

declare function extend_1(publicAPI: any, model: any, initialValues?: Partial<T101>): void;
export const extend: typeof extend_1;
export interface RenderWindow {
  addRenderer: (renderer: any) => void;
  removeRenderer: (renderer: any) => void;
  hasRenderer: (renderer: any) => boolean;
  addView: (view: any) => void;
  removeView: (view: any) => void;
  hasView: (view: any) => boolean;
  render: () => void;
  getStatistics: () => {
    propCount: number,
    invisiblePropCount: number,
    [primitiveKey: string]: number,
    str: string
  };
  captureImages: (format: string) => any[];
  getInteractor: () => any;
  getNumberOfLayers: () => any;
  getViews: () => any;
  setInteractor: (interactor: any) => void;
  setNumberOfLayers: (nLayers: any) => void;
  setViews: (views: any) => void;
  getNeverRendered: () => any;
  getRenderers: () => any[];
}
export const newInstance: RenderWindow;
export interface T102 {
  newInstance: RenderWindow;
  extend: typeof extend_1;
}
declare const T103: T102;
export default T103;
