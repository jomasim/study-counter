import { useState, useEffect } from 'react'
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
  const onRequestSave = (url, file) => {
    const { name, type, size } = file
    const data = docs
    data.push({ url, name, type, size })
    setDocs(data)
  }

  const handleRemove = (errRes, { file }) => {
    if (file.name) {
      const attachments = docs.filter(doc => doc.name !== file.name)
      setDocs(attachments)
    }
  }

  return (
    <FilePond
      allowMultiple={true}
      maxFiles={3}
      allowRevert={true}
      onremovefile={handleRemove}
      server={{
        revert: (source, load, error) => {
          const file_id = source.split('file_id=')[1]
          firebaseStorage
            .child('attachments/' + file_id)
            .delete()
            .catch(err => {
              toast('Error occured deleting the file', {
                type: 'error',
                position: 'top-right'
              })
            })

          load()
        },
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
              toast(err.message, { type: 'error', position: 'top-right' })
            },
            () => {
              firebaseStorage
                .child('attachments/' + id)
                .getDownloadURL()
                .then(url => {
                  onRequestSave(url, file)
                  load(url + `?file_id=${id}`)
                })
                .catch(err => {
                  toast(err.message, { type: 'error', position: 'top-right' })
                  error(err.message)
                  abort()
                })
            }
          )
        },
        // this loads an already uploaded file to firebase
        load: (source, load, error, progress, abort) => {
          // reset our progress
          progress(true, 0, 1024)

          // fetch the actual image using the download URL
          // and provide the blob to FilePond using the load callback
          let xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          xhr.onload = function (event) {
            let blob = xhr.response
            load(blob)
          }
          xhr.open('GET', source)
          xhr.send()
        }
      }}
    />
  )
}

export default FileUpload
