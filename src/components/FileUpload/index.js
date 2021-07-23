import { useState } from 'react'
import firebase from 'firebase/app'
import { firebaseStorage } from '../../../firebase'
import shortid from 'shortid'
import { toast } from 'react-toastify'

import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const FileUpload = ({ docs, setDocs }) => {
  const [files, setFiles] = useState([])
  const onRequestSave = (id, file) => {
    const { name, type, size } = file
    const data = docs
    data.push({ id, name, type, size })
    setDocs(data)
  }
  const handleRemove = (errRes, file) => {
    if (file.name) {
      const filtered = files.filter(doc => doc.name !== file.name)
      const attachments = docs.filter(doc => doc.name !== file.name)
      // update files and attachments(uploaded files)
      setFiles(filtered)
      setDocs(attachments)
    }
  }

  return (
    <FilePond
      files={files}
      allowMultiple={true}
      maxFiles={3}
      onremovefile={handleRemove}
      onupdatefiles={setFiles}
      server={{
        revert: (source, load, error) => {
          try {
            firebaseStorage.child('attachments/' + source).delete()
          } catch (err) {
            toast(err.message, { type: 'error', position: 'top-right' })
          }
          error('an occurred while deleting file')
          load()
          console.log('remove file', source)
        },
        // this uploads the file using firebase
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          // create a unique id for the file
          const id = shortid.generate()
          console.log(file, 'file here')
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
              toast(err.message, { type: 'error', position: 'top-right' })
            },
            () => {
              onRequestSave(id, file)
              load(id)
            }
          )
        },
        // this loads an already uploaded file to firebase
        load: (source, load, error, progress, abort) => {
          // reset our progress
          progress(true, 0, 1024)
          // fetch the download URL from firebase
          firebaseStorage
            .child('attachments/' + source)
            .getDownloadURL()
            .then(url => {
              // fetch the actual image using the download URL
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
              toast(err.message, { type: 'error', position: 'top-right' })
              error(err.message)
              abort()
            })
        }
      }}
    />
  )
}

export default FileUpload
