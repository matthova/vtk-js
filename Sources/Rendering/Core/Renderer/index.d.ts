type RenderWindow = import('../RenderWindow').RenderWindow;

export interface T100 {
  pickedProp: any,
  activeCamera: any,
  allBounds: any
  ambient: any,
  allocatedRenderTime: any,
  timeFactor: any,
  createdLight: any,
  automaticLightCreation: any,
  twoSidedLighting: any,
  lastRenderTimeInSeconds: any,
  renderWindow: RenderWindow,
  lights: any
  actors: any
  volumes: any
  lightFollowCamera: any,
  numberOfPropsRendered: any,
  propArray: any,
  pathArray: any,
  layer: any,
  preserveColorBuffer: any,
  preserveDepthBuffer: any,
  computeVisiblePropBounds: any,
  interactive: any,
  nearClippingPlaneTolerance: any,
  clippingRangeExpansion: any,
  erase: any,
  draw: any,
  useShadows: any,
  useDepthPeeling: any,
  occlusionRatio: any,
  maximumNumberOfPeels: any,
  selector: any,
  delegate: any,
  texturedBackground: any,
  backgroundTexture: any,
  pass: any,
}
declare function extend_1(publicAPI: any, model: any, initialValues?: Partial<T100>): void;
export const extend: typeof extend_1;
// TODO extends viewport
export interface Renderer {
  updateCamera: () => boolean;
  updateLightsGeometryToFollowCamera: () => void;
  updateLightGeometry: () => boolean;
  getVTKWindow: () => any;
  // TODO type layer
  // TODO type camera
  setActiveCamera: (camera: any) => boolean;
  makeCamera: () => any;
  getActiveCamera: () => any;
  getActiveCameraAndResetIfCreated: () => any;
  addActor: (actor: any) => void;
  removeActor: (actor: any) => void;
  removeAllActors: () => void;
  addVolume: () => void;
  removeVolume: (volume: any) => void;
  removeAllVolumes: () => any;
  addLight: (light: any) => void;
  removeLight: (light: any) => void;
  removeAllLights: () => void;
  setLightCollection: (lights: any[]) => void;
  makeLight: () => void;
  createLight: () => void;
  normalizedDisplayToWorld: (x: number, y: number, z: number, aspect: number) => [number, number, number];
  worldToNormalizedDisplay: (x: number, y: number, z: number, aspect: number) => [number, number, number];
  viewToWorld: (x: number, y: number, z: number) => [number, number, number]
  projectionToView: (x: number, y: number, z: number, aspect: number) => [number, number, number];
  worldToView: (x: number, y: number, z: number) => [number, number, number];
  viewToProjection: (x: number, y: number, z: number, aspect: number) => [number, number, number];
  computeVisiblePropBounds: () => any[];
  resetCamera: (bounds?: any) => boolean;
  resetCameraClippingRange: (bounds: any) => boolean;
  setRenderWindow: (renderWindow: RenderWindow) => void;
  visibleActorCount: () => number;
  visibleVolumeCount: () => number;
  getMTime: () => number;
  getTransparent: () => boolean;
  isActiveCameraCreated: () => boolean;
  getRenderWindow: () => RenderWindow;
  getAllocatedRenderTime: () => any;
  getTimeFactor: () => any;
  getLastRenderTimeInSeconds: () => any;
  getNumberOfPropsRendered: () => any;
  getLastRenderingUsedDepthPeeling: () => any;
  getSelector: () => any;
  getTwoSidedLighting: () => any;
  getLightFollowCamera: () => any;
  getAutomaticLightCreation: () => any;
  getErase: () => any;
  getDraw: () => any;
  getNearClippingPlaneTolerance: () => any;
  getClippingRangeExpansion: () => any;
  getBackingStore: () => any;
  getInteractive: () => any;
  getLayer: () => any;
  getPreserveColorBuffer: () => any;
  getPreserveDepthBuffer: () => any;
  getUseDepthPeeling: () => any;
  getOcclusionRatio: () => any;
  getMaximumNumberOfPeels: () => any;
  getDelegate: () => any;
  getBackgroundTexture: () => any;
  getTexturedBackground: () => any;
  getUseShadows: () => any;
  getPass: () => any;
  setTwoSidedLighting: (val: any) => void;
  setLightFollowCamera: (val: any) => void;
  setAutomaticLightCreation: (val: any) => void;
  setErase: (val: any) => void;
  setDraw: (val: any) => void;
  setNearClippingPlaneTolerance: (val: any) => void;
  setClippingRangeExpansion: (val: any) => void;
  setBackingStore: (val: any) => void;
  setInteractive: (val: any) => void;
  setLayer: (val: any) => void;
  setPreserveColorBuffer: (val: any) => void;
  setPreserveDepthBuffer: (val: any) => void;
  setUseDepthPeeling: (val: any) => void;
  setOcclusionRatio: (val: any) => void;
  setMaximumNumberOfPeels: (val: any) => void;
  setDelegate: (val: any) => void;
  setBackgroundTexture: (val: any) => void;
  setTexturedBackground: (val: any) => void;
  setUseShadows: (val: any) => void;
  setPass: (val: any) => void;
  getActors: () => any[];
  getVolumes: () => any[];
  getLights: () => any[];
  getBackground: () => [number, number, number, number];
  setBackground: (newVal: [number, number, number, number]) => void;
}
export const newInstance: Renderer;
export interface T101 {
  newInstance: Renderer;
  extend: typeof extend_1;
}
declare const T102: T101;
export default T102;
