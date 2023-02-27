import { useEffect, useContext, useState, useCallback, ChangeEvent } from 'react'
import { CameraContext } from '../App'

export default function Setting() {
  const { setCameraId } = useContext(CameraContext)
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState("");
  const [show, setShow] = useState(false)
  const getDevices = async () => {
    const _devices = (await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === 'videoinput');
    setDevices(() => [..._devices]);
  }

  const confirmSetting = useCallback(() => {
    setCameraId(deviceId);
    setShow(old => !old);
    setDeviceId(() => "");
  }, [show, deviceId])

  const _setDeviceId = (e: any) => {
    setDeviceId(e.target.value)
  }

  useEffect(() => {
    getDevices();
    const checkIsF2 = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        setShow(old => !old);
      }
    }
    document.documentElement.addEventListener('keydown', checkIsF2)
  }, [])

  return (
    <div className={` left-0 top-0 nodrag z-10 absolute w-full h-full left-1/10 bg-white/50 rounded-full flex flex-col justify-center items-center
        ${show ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-500 `}>
      <select onChange={_setDeviceId} className='w-40 text-center'>
        <>
          <option selected value=''>
            --请选择设备--
          </option>
          {devices.map(device => {
            return <option value={device.deviceId} key={device.deviceId}>{device.label}</option>
          })}
        </>
      </select>
      <button onClick={confirmSetting} className='mt-4 w-20 border-green-500 border-spacing-1 bg-green-200'>确定</button>
    </div>
  )
}
