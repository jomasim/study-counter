import { useState } from 'react'
import firebase from 'firebase/app'
import { firebaseStorage } from '../../../firebase'
import shortid from 'shortid'

import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const FileUpload = ({ docs, setDocs }) => {
  const [files, setFiles] = useState([])
  const onRequestSave = id => {
    const data = docs
    data.push(id)
    setDocs(data)
  }
  const onRequestClear = (id) => {
      console.log('we clear here', id)
  }
  return (
    <FilePond
      files={files}
      allowMultiple={true}
      maxFiles={3}
      onupdatefiles={fileItems => {
        if (fileItems.length === 0) {
          onRequestClear()
        }

        setFiles(fileItems.map(fileItem => fileItem.file))
      }}
      server={{
        // this uploads the file using firebase
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          // create a unique id for the file
          const id = shortid.generate()

          // upload the file to firebase
          const task = firebaseStorage.child('attachments/' + id).put(file)

          // monitor the task to provide updates to FilePond
          task.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snap => {
              // provide progress updates
              progress(true, snap.bytesTransferred, snap.totalBytes)
            },
            err => {
              // provide errors
              error(err.message)
            },
            () => {
              // the file has been uploaded
              load(id)
              onRequestSave(id)
            }
          )
        },

        // this loads an already uploaded file to firebase
        load: (source, load, error, progress, abort) => {
          // reset our progress
          progress(true, 0, 1024)

          // fetch the download URL from firebase
          firebaseStorage
            .child('attachements/' + source)
            .getDownloadURL()
            .then(url => {
              // fetch the actual file using the download URL
              // and provide the blob to FilePond using the load callback
              let xhr = new XMLHttpRequest()
              xhr.responseType = 'blob'
              xhr.onload = function (event) {
                let blob = xhr.response
                load(blob)
              }
              xhr.open('GET', url)
              xhr.send()
            })
            .catch(err => {
              error(err.message)
              abort()
            })
        }
      }}
    />
  )
}

export default FileUpload
