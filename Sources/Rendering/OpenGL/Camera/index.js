import { mat3, mat4 } from 'gl-matrix';

import * as macro from '../../../macro';
import vtkViewNode from '../../SceneGraph/ViewNode';

// ----------------------------------------------------------------------------
// vtkOpenGLCamera methods
// ----------------------------------------------------------------------------

function vtkOpenGLCamera(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkOpenGLCamera');

  publicAPI.buildPass = (prepass) => {
    if (prepass) {
      model.renderer = publicAPI.getFirstAncestorOfType('vtkOpenGLRenderer');
      model.renderWindow = model.renderer.getParent();
      model.context = model.renderWindow.getContext();
    }
  };

  // Renders myself
  publicAPI.opaquePass = (prepass) => {
    if (prepass) {
      const tsize = model.renderer.getTiledSizeAndOrigin();
      model.context.viewport(tsize.lowerLeftU, tsize.lowerLeftV, tsize.usize, tsize.vsize);
      model.context.scissor(tsize.lowerLeftU, tsize.lowerLeftV, tsize.usize, tsize.vsize);
    }
  };
  publicAPI.translucentPass = publicAPI.opaquePass;
  publicAPI.opaqueZBufferPass = publicAPI.opaquePass;
  publicAPI.volumePass = publicAPI.opaquePass;

  publicAPI.getKeyMatrices = (ren) => {
    // has the camera changed?
    if (ren !== model.lastRenderer ||
      model.renderWindow.getMTime() > model.keyMatrixTime.getMTime() ||
      publicAPI.getMTime() > model.keyMatrixTime.getMTime() ||
      ren.getMTime() > model.keyMatrixTime.getMTime()) {
      mat4.copy(model.keyMatrices.wcvc, model.renderable.getViewTransformMatrix());

      mat3.fromMat4(model.keyMatrices.normalMatrix, model.keyMatrices.wcvc);
      mat3.invert(model.keyMatrices.normalMatrix, model.keyMatrices.normalMatrix);
      mat4.transpose(model.keyMatrices.wcvc, model.keyMatrices.wcvc);

      const aspectRatio = model.renderer.getAspectRatio();

      mat4.copy(model.keyMatrices.vcdc, model.renderable.getProjectionTransformMatrix(
                           aspectRatio, -1, 1));
      mat4.transpose(model.keyMatrices.vcdc, model.keyMatrices.vcdc);

      mat4.multiply(model.keyMatrices.wcdc, model.keyMatrices.vcdc, model.keyMatrices.wcvc);
//      mat4.multiply(model.WCDCMatrix, model.WCVCMatrix, model.VCDCMatrix);

      model.keyMatrixTime.modified();
      model.lastRenderer = ren;
    }

    return model.keyMatrices;
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  context: null,
  lastRenderer: null,
  keyMatrixTime: null,
  keyMatrices: null,
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Inheritance
  vtkViewNode.extend(publicAPI, model, initialValues);

  model.keyMatrixTime = {};
  macro.obj(model.keyMatrixTime);

  model.keyMatrices = {
    normalMatrix: mat3.create(),
    vcdc: mat4.create(),
    wcvc: mat4.create(),
    wcdc: mat4.create(),
  };

  // Build VTK API
  macro.setGet(publicAPI, model, [
    'context',
    'keyMatrixTime',
  ]);

  // Object methods
  vtkOpenGLCamera(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend);

// ----------------------------------------------------------------------------

export default { newInstance, extend };