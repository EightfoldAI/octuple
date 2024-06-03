'use client';

/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import AjaxUpload from './AjaxUploader';
import type { OcUploadProps, OcFile } from './OcUpload.types';

function empty() {}

class OcUpload extends Component<OcUploadProps> {
  static defaultProps = {
    beforeUpload: null as any,
    component: 'span',
    customRequest: null as any,
    data: {},
    headers: {},
    multipart: false,
    multiple: false,
    name: 'file',
    onError: empty,
    onStart: empty,
    onSuccess: empty,
    openFileDialogOnClick: true,
    withCredentials: false,
  };

  private uploader: AjaxUpload;

  abort(file: OcFile) {
    this.uploader.abort(file);
  }

  saveUploader = (node: AjaxUpload) => {
    this.uploader = node;
  };

  render() {
    return <AjaxUpload {...this.props} ref={this.saveUploader} />;
  }
}

export default OcUpload;
