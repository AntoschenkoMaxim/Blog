export async function convertFileToBase64(file: File): Promise<string> {
  const fileReader = new FileReader()

  // We want to wrap this in a Promise
  // because the FileReader works asynchronously.
  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort()
      reject(new Error('Parse Failed.'))
    }

    // This method is called when the file is "readAsDataUrl"
    fileReader.onload = (fileLoadedEvent) => {
      const data = fileLoadedEvent.target?.result

      if (!data) {
        return reject(new Error('Load Failed.'))
      }

      if (typeof data !== 'string') {
        return reject(new Error('Convert Failed.'))
      }

      resolve(data)
    }
    fileReader.readAsDataURL(file)
  })
}
