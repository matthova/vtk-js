export interface T100 {
  clippingPlanes: any[];
  [key: string]: any;
}
declare function extend_1(publicAPI: any, model: any, initialValues?: Partial<T100>): void;
export const extend: typeof extend_1;
export interface T101 {
  update: () => void;
  addClippingPlane: (plane: any) => void;
  getNumberOfClippingPlanes: () => number;
  removeAllClippingPlanes: () => void;
  removeClippingPlane: (index: 0 | 1 | 2 | 3 | 4 | 5) => void;
  getClippingPlanes: () => any;
  setClippingPlanes:  (planes: any) => void;
  extend: typeof extend_1;
}
declare const T102: T101;
export default T102;
