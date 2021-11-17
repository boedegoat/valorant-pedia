import Wrapper from 'components/global/Wrapper'
import SelectWeapon from './SelectWeapon'

export default function WeaponsList({ weapons }) {
  return (
    <Wrapper className='py-5 pt-0 grid grid-cols-2 gap-2'>
      {weapons.map((weapon) => (
        <SelectWeapon key={weapon.uuid} weapon={weapon} />
      ))}
    </Wrapper>
  )
}
