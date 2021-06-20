class MyUploadAdapter {
  constructor (loader) {
    this.loader = loader
  }

  upload () {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          this._initRequest()
          this._initListeners(resolve, reject, file)
          this._sendRequest(file)
        })
    )
  }

  abort () {
    if (this.xhr) {
      this.xhr.abort()
    }
  }

  _initRequest () {
    const xhr = (this.xhr = new XMLHttpRequest())
    xhr.open(
      'POST',
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      true
    )
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.responseType = 'json'
  }

  _initListeners (resolve, reject, file) {
    const xhr = this.xhr
    // const loader = this.loader
    const genericErrorText = `Couldn't upload file: ${file.name}.`
    xhr.addEventListener('error', () => reject(genericErrorText))
    xhr.addEventListener('abort', () => reject())
    xhr.addEventListener('load', () => {
      const response = xhr.response
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        )
      }
      resolve({
        default: response.url
      })
    })
  }

  _sendRequest (file) {
    const data = new FormData()
    data.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    )
    data.append('file', file)
    this.xhr.send(data)
  }
}

const UploadAdapterPlugin = editor => {
  editor.plugins.get('FileRepository').createUploadAdapter = loader => {
    return new MyUploadAdapter(loader)
  }
}

export default UploadAdapterPlugin
