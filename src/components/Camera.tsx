import { useEffect, useState,useContext } from 'react'
import { CameraContext } from '../App'
import Setting from './Setting';

export default function Camera() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const {cameraId} = useContext(CameraContext);

  useEffect(() => {

    const video = document.querySelector('video')!;

    const constraints:MediaStreamConstraints  = {
      audio: false,
      video: {deviceId: cameraId} || true,
    }

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      video.play();
    })
  }, [])
  return (
    <div className='h-screen w-screen rounded-full flex relative'>
      <video className='rounded-full object-cover'></video>
      <Setting />
    </div>
  )
}
