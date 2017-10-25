import macro          from 'vtk.js/Sources/macro';
import { ObjectType } from 'vtk.js/Sources/Rendering/OpenGL/BufferObject/Constants';

// ----------------------------------------------------------------------------
// vtkOpenGLVertexArrayObject methods
// ----------------------------------------------------------------------------

function vtkOpenGLVertexArrayObject(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkOpenGLVertexArrayObject');

  // Public API methods
  publicAPI.exposedMethod = () => {
    // This is a publicly exposed method of this object
  };

  publicAPI.initialize = () => {
    model.extension = model.context.getExtension('OES_vertex_array_object');

    // Start setting up VAO
    if (!model.forceEmulation && model.extension) {
      model.supported = true;
      model.handleVAO = model.extension.createVertexArrayOES();
    } else {
      model.supported = false;
    }
  };

  publicAPI.isReady = () =>
    // We either probed and allocated a VAO, or are falling back as the current
    // hardware does not support VAOs.
    (model.handleVAO !== 0 || model.supported === false);


  publicAPI.bind = () => {
    // Either simply bind the VAO, or emulate behavior by binding all attributes.
    if (!publicAPI.isReady()) {
      publicAPI.initialize();
    }
    if (publicAPI.isReady() && model.supported) {
      model.extension.bindVertexArrayOES(model.handleVAO);
    } else if (publicAPI.isReady()) {
      const gl = model.context;
      for (let ibuff = 0; ibuff < model.buffers.length; ++ibuff) {
        const buff = model.buffers[ibuff];
        model.context.bindBuffer(gl.ARRAY_BUFFER, buff.buffer);
        for (let iatt = 0; iatt < buff.attributes.length; ++iatt) {
          const attrIt = buff.attributes[iatt];
          const matrixCount = attrIt.isMatrix ? attrIt.size : 1;
          for (let i = 0; i < matrixCount; ++i) {
            gl.enableVertexAttribArray(attrIt.index + i);
            gl.vertexAttribPointer(attrIt.index + i, attrIt.size, attrIt.type,
                                  attrIt.normalize, attrIt.stride,
                                  attrIt.offset + ((attrIt.stride * i) / attrIt.size));
            if (attrIt.divisor > 0) {
              gl.vertexAttribDivisor(attrIt.index + i, 1);
            }
          }
        }
      }
    }
  };

  publicAPI.release = () => {
    // Either simply release the VAO, or emulate behavior by releasing all attributes.
    if (publicAPI.isReady() && model.supported) {
      model.extension.bindVertexArrayOES(null);
    } else if (publicAPI.isReady()) {
      const gl = model.context;
      for (let ibuff = 0; ibuff < model.buffers.length; ++ibuff) {
        const buff = model.buffers[ibuff];
        model.context.bindBuffer(gl.ARRAY_BUFFER, buff.buffer);
        for (let iatt = 0; iatt < buff.attributes.length; ++iatt) {
          const attrIt = buff.attributes[iatt];
          const matrixCount = attrIt.isMatrix ? attrIt.size : 1;
          for (let i = 0; i < matrixCount; ++i) {
            gl.enableVertexAttribArray(attrIt.index + i);
            gl.vertexAttribPointer(attrIt.index + i, attrIt.size, attrIt.type,
                                  attrIt.normalize, attrIt.stride,
                                  attrIt.offset + ((attrIt.stride * i) / attrIt.size));
            if (attrIt.divisor > 0) {
              gl.vertexAttribDivisor(attrIt.index + i, 0);
            }
            gl.disableVertexAttribArray(attrIt.index + i);
          }
        }
      }
    }
  };

  publicAPI.shaderProgramChanged = () => {
    publicAPI.release();
    if (model.handleVAO) {
      model.extension.deleteVertexArrayOES(model.handleVAO);
    }
    model.handleVAO = 0;
    model.handleProgram = 0;
  };

  publicAPI.releaseGraphicsResources = () => {
    publicAPI.shaderProgramChanged();
    if (model.handleVAO) {
      model.extension.deleteVertexArrayOES(model.handleVAO);
    }
    model.handleVAO = 0;
    model.supported = true;
    model.handleProgram = 0;
  };

  publicAPI.addAttributeArray = (program, buffer, name, offset, stride, elementType, elementTupleSize, normalize) =>
    publicAPI.addAttributeArrayWithDivisor(program, buffer, name, offset, stride, elementType, elementTupleSize, normalize, 0, false);

  publicAPI.addAttributeArrayWithDivisor = (program, buffer, name, offset, stride, elementType, elementTupleSize, normalize, divisor, isMatrix) => {
    if (!program) {
      return false;
    }

    // Check the program is bound, and the buffer is valid.
    if (!program.isBound() || buffer.getHandle() === 0 ||
         buffer.getType() !== ObjectType.ARRAY_BUFFER) {
      return false;
    }

    // Perform initalization if necessary, ensure program matches VAOs.
    if (model.handleProgram === 0) {
      model.handleProgram = program.getHandle();
    }
    if (!publicAPI.isReady()) {
      publicAPI.initialize();
    }
    if (!publicAPI.isReady() || model.handleProgram !== program.getHandle()) {
      return false;
    }

    const gl = model.context;

    const attribs = {};
    attribs.name = name;
    attribs.index = gl.getAttribLocation(model.handleProgram, name);
    attribs.offset = offset;
    attribs.stride = stride;
  //    attribs.type = convertTypeToGL(elementType);
    attribs.type = elementType;
    attribs.size = elementTupleSize;
    attribs.normalize = normalize;
    attribs.isMatrix = isMatrix;
    attribs.divisor = divisor;

    if (attribs.Index === -1) {
      return false;
    }

    // Always make the call as even the first use wants the attrib pointer setting
    // up when we are emulating.
    buffer.bind();
    gl.enableVertexAttribArray(attribs.index);
    gl.vertexAttribPointer(attribs.index, attribs.size, attribs.type,
                          attribs.normalize, attribs.stride,
                          attribs.offset);


    if (divisor > 0) {
      gl.vertexAttribDivisor(attribs.index, 1);
    }

    attribs.buffer = buffer.getHandle();

    // If vertex array objects are not supported then build up our list.
    if (!model.supported) {
      // find the buffer
      let buffFound = false;
      for (let ibuff = 0; ibuff < model.buffers.length; ++ibuff) {
        const buff = model.buffers[ibuff];
        if (buff.buffer === attribs.buffer) {
          buffFound = true;
          let found = false;
          for (let iatt = 0; iatt < buff.attributes.length; ++iatt) {
            const attrIt = buff.attributes[iatt];
            if (attrIt.name === name) {
              found = true;
              buff.attributes[iatt] = attribs;
            }
          }
          if (!found) {
            buff.attributes.push(attribs);
          }
        }
      }
      if (!buffFound) {
        model.buffers.push({ buffer: attribs.buffer, attributes: [attribs] });
      }
    }
    return true;
  };

  publicAPI.addAttributeMatrixWithDivisor = (program, buffer, name, offset, stride, elementType, elementTupleSize, normalize, divisor) => {
    // bind the first row of values
    const result =
      publicAPI.addAttributeArrayWithDivisor(program, buffer, name,
        offset, stride, elementType, elementTupleSize, normalize, divisor, true);

    if (!result) {
      return result;
    }

    const gl = model.context;

    const index = gl.getAttribLocation(model.handleProgram, name);

    for (let i = 1; i < elementTupleSize; i++) {
      gl.enableVertexAttribArray(index + i);
//      gl.vertexAttribPointer(index + i, elementTupleSize, convertTypeToGL(elementType),
      gl.vertexAttribPointer(index + i, elementTupleSize, elementType,
                            normalize, stride,
                            offset + ((stride * i) / elementTupleSize));
      if (divisor > 0) {
        gl.vertexAttribDivisor(index + i, 1);
      }
    }

    return true;
  };

  publicAPI.removeAttributeArray = (name) => {
    if (!publicAPI.isReady() || model.handleProgram === 0) {
      return false;
    }

    // If we don't have real VAOs find the entry and remove it too.
    if (!model.supported) {
      for (let ibuff = 0; ibuff < model.buffers.length; ++ibuff) {
        const buff = model.buffers[ibuff];
        for (let iatt = 0; iatt < buff.attributes.length; ++iatt) {
          const attrIt = buff.attributes[iatt];
          if (attrIt.name === name) {
            buff.attributes.splice(iatt, 1);
            if (!buff.attributes.length) {
              model.buffers.splice(ibuff, 1);
            }
            return true;
          }
        }
      }
    }

    return true;
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  forceEmulation: false,
  handleVAO: 0,
  handleProgram: 0,
  supported: true,
  buffers: null,
  context: null,
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Internal objects initialization
  model.buffers = [];

  // Object methods
  macro.obj(publicAPI, model);

  // Create get-only macros
  macro.get(publicAPI, model, ['supported']);

  // Create get-set macros
  macro.setGet(publicAPI, model, ['context', 'forceEmulation']);

  // For more macro methods, see "Sources/macro.js"

  // Object specific methods
  vtkOpenGLVertexArrayObject(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'vtkOpenGLVertexArrayObject');

// ----------------------------------------------------------------------------

export default { newInstance, extend };