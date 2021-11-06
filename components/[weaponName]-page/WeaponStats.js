import { XIcon } from '@heroicons/react/outline'
import useToggle from '../../hooks/useToggle'
import Alert from '../global/Alert'
import Stat from './Stat'

export default function WeaponStats({ weapon }) {
  const [moreStats, toggleMoreStats] = useToggle(false)
  const [moreADSStats, toggleMoreADSStats] = useToggle(false)

  return (
    <section className='flex space-x-3'>
      <div className='flex-grow border px-3 py-2 rounded-md space-y-3'>
        <h2 className='font-bold text-lg'>📊 Stats</h2>
        <ul className='space-y-2'>
          <Stat stat='🔥 fire rate' value={weapon.weaponStats.fireRate} />
          <Stat
            stat='💨 run speed multiplier'
            value={weapon.weaponStats.runSpeedMultiplier}
          />
          <Stat
            stat='🎯 first bullet accuracy'
            value={weapon.weaponStats.firstBulletAccuracy}
          />
        </ul>
        <button
          className='uppercase tracking-wider text-fuchsia-500'
          onClick={toggleMoreStats}
        >
          more
        </button>
        <Alert open={moreStats} onClose={toggleMoreStats} className='space-y-3'>
          <Alert.Title
            as='h3'
            className='text-xl font-bold leading-6 text-gray-900 flex items-center'
          >
            More Stats
            <button className='ml-auto' onClick={toggleMoreStats}>
              <XIcon className='w-5 h-5' />
            </button>
          </Alert.Title>
          <ul className='space-y-2'>
            <Stat
              stat='reload time seconds'
              value={weapon.weaponStats.reloadTimeSeconds}
            />
            <Stat
              stat='shotgun pellet count'
              value={weapon.weaponStats.shotgunPelletCount}
            />
            <Stat stat='air bursts stats' value={weapon.weaponStats.airBurstStats} />
            <Stat stat='feature' value={weapon.weaponStats.feature} />
            <Stat stat='fire mode' value={weapon.weaponStats.fireMode} />
          </ul>
        </Alert>
      </div>
      <div className='flex-grow border px-3 py-2 rounded-md space-y-3'>
        <h2 className='font-bold text-lg'>🔫 ADS Stats</h2>
        <ul className='space-y-2'>
          <Stat stat='🔥 fire rate' value={weapon.weaponStats.adsStats.fireRate} />
          <Stat
            stat='💨 run speed multiplier'
            value={weapon.weaponStats.adsStats.runSpeedMultiplier}
          />
          <Stat
            stat='🎯 first bullet accuracy'
            value={weapon.weaponStats.adsStats.firstBulletAccuracy}
          />
        </ul>
        <button
          className='uppercase tracking-wider text-fuchsia-500'
          onClick={toggleMoreADSStats}
        >
          more
        </button>
        <Alert open={moreADSStats} onClose={toggleMoreADSStats} className='space-y-3'>
          <Alert.Title
            as='h3'
            className='text-xl font-bold leading-6 text-gray-900 flex items-center'
          >
            More ADS Stats{' '}
            <button className='ml-auto' onClick={toggleMoreADSStats}>
              <XIcon className='w-5 h-5' />
            </button>
          </Alert.Title>
          <ul className='space-y-2'>
            <Stat stat='burst count' value={weapon.weaponStats.adsStats.burstCount} />
            <Stat
              stat='zoom multiplier'
              value={weapon.weaponStats.adsStats.zoomMultiplier}
            />
          </ul>
        </Alert>
      </div>
    </section>
  )
}
