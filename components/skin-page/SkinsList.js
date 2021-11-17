import Wrapper from 'components/global/Wrapper'
import Skin from './Skin'

export default function SkinsList({ weaponSkins, weaponName }) {
  return (
    <Wrapper className='py-5 grid grid-cols-2 gap-2'>
      {weaponSkins.map((weaponSkin) => (
        <Skin key={weaponSkin.uuid} weaponSkin={weaponSkin} weaponName={weaponName} />
      ))}
    </Wrapper>
  )
}
