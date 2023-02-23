import Camera from './components/Camera'
import { createContext, useState } from 'react'

type CameraContext = {
  cameraId:string,
  setCameraId:React.Dispatch<React.SetStateAction<string>>
}

export const CameraContext = createContext<CameraContext>({cameraId:"",setCameraId(){}})

function App() {

  const [cameraId,setCameraId] = useState('')

  return (
    <CameraContext.Provider value={{cameraId,setCameraId}}>
      <div className='App'>
        <Camera />
      </div>
    </CameraContext.Provider>
  )
}

export default App
