import { CodeIcon, MicrophoneIcon, TagIcon } from '@heroicons/react/outline'
import Footer from '../Footer'
import Wrapper from '../Wrapper'
import { useAgentPageContext } from './AgentPageLayout'

export default function MorePage() {
  const { agent } = useAgentPageContext()
  console.log(agent)
  return (
    <Wrapper className='space-y-6'>
      <div className='p-4 rounded-md shadow-md'>
        <p className='uppercase font-bold text-xs tracking-wider text-fuchsia-500 flex items-center'>
          <CodeIcon className='w-3 h-3 mr-2' /> developer name
        </p>
        <h2 className='text-lg font-bold'>{agent.developerName}</h2>
      </div>
      <div className='p-4 rounded-md shadow-md'>
        <p className='uppercase font-bold text-xs tracking-wider text-fuchsia-500 flex items-center'>
          <TagIcon className='w-3 h-3 mr-2' /> character tags
        </p>
        <h2 className='text-lg font-bold'>{agent.characterTags?.join(', ') ?? 'N/A'}</h2>
      </div>
      <div className='p-4 rounded-md shadow-md'>
        <p className='uppercase font-bold text-xs tracking-wider text-fuchsia-500 flex items-center mb-4'>
          <MicrophoneIcon className='w-3 h-3 mr-2' /> main voiceline
        </p>
        {agent.voiceLine.mediaList.map((media) => (
          <audio className='w-full' key={media.id} src={media.wave} controls />
        ))}
      </div>
      <Footer className='pt-20' />
    </Wrapper>
  )
}
