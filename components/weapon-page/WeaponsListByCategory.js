import Wrapper from '../global/Wrapper'
import SelectWeapon from './SelectWeapon'

export default function WeaponsListByCategory({ weapons, filterCategory }) {
  return (
    <Wrapper className='py-5 pt-0 grid grid-cols-2 gap-2'>
      {weapons
        .filter((weapon) => {
          if (filterCategory === 'Melee') {
            return weapon.displayName === 'Melee'
          }
          return weapon.shopData?.category === filterCategory
        })
        .map((weapon) => (
          <SelectWeapon key={weapon.uuid} weapon={weapon} />
        ))}
    </Wrapper>
  )
}
