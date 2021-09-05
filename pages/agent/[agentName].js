import Wrapper from '../../components/Wrapper'

const Agent = ({ agentName }) => {
  return (
    <Wrapper>
      <h1>{agentName}</h1>
    </Wrapper>
  )
}

export default Agent

export async function getServerSideProps(context) {
  return {
    props: {
      agentName: context.params.agentName.replace(/-/g, '/'),
    },
  }
}
