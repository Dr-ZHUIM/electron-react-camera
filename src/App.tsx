import Camera from './components/Camera'
import Setting from './components/Setting'
import { createContext, useState } from 'react'

type CameraContext = {
  cameraId: string,
  setCameraId: React.Dispatch<React.SetStateAction<string>>
}

export const CameraContext = createContext<CameraContext>({ cameraId: "", setCameraId() { } })

function App() {

  const [cameraId, setCameraId] = useState('')

  return (
    <CameraContext.Provider value={{ cameraId, setCameraId }}>
      <div className='App w-full h-full relative'>
        <Camera />
        <Setting />
      </div>
    </CameraContext.Provider>
  )
}

export default App
