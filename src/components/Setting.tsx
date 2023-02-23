import { useEffect, useContext, useState, useCallback } from 'react'
import { CameraContext } from '../App'

export default function Setting() {
  const { setCameraId } = useContext(CameraContext)
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [show, setShow] = useState(false)
  const getDevices = async () => {
    const devices = (await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === 'videoinput')
    console.log('devices', devices)
  }

  const callSetting = useCallback(() => {
    setShow(() => true);
  }, [show])

  useEffect(() => {
    getDevices()
  }, [])

  useEffect(() => {
    const style = document.documentElement.style as unknown as { webkitAppRegion: 'unset' | 'drag' }
    if (show) {
      style.webkitAppRegion = 'unset';
    } else {
      style.webkitAppRegion = 'drag'
    }
  }, [show])

  return (
    <div onClick={callSetting} className={`z-10 absolute w-full h-full top-0 left-0 bg-white/50 rounded-full flex flex-col justify-center items-center
        ${show?'visible opacity-100':'hidden opacity-0'} transition-all duration-500 `}>
      <select className='w-40 text-center'>
        <option selected value=''>
          --请选择设备--
        </option>
        <option value=''>--请选择设备--</option>
        <option value=''>--请选择设备--</option>
      </select>
      <button className='mt-4 w-20 border-green-500 border-spacing-1 bg-green-200'>确定</button>
    </div>
  )
}
