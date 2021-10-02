import { db } from '../lib/firebase-client'
import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore'

export async function getAgents(req, res) {
  try {
    const agentsDocs = await getDocs(collection(db, 'agents'))
    const agents = agentsDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    res.status(200).json({
      status: 200,
      message: 'success get all agents',
      agents,
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'error',
    })
  }
}

export async function getAgentByName(req, res) {
  try {
    const { agentname, lineups } = req.query

    if (lineups) {
      //
      // if lineups=all
      //
      if (lineups === 'all') {
        const lineupsDocs = await getDocs(collection(db, 'agents', agentname, 'lineups'))
        const lineups = lineupsDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        res.status(200).json({
          status: 200,
          message: `success get all agent lineups with name ${agentname}`,
          lineups,
        })
      }

      //
      // if lineups=id
      //
      else {
        const lineupDoc = await getDoc(doc(db, 'agents', agentname, 'lineups', lineups))
        if (!lineupDoc.exists()) {
          res.status(404).json({
            status: 404,
            message: 'not found',
          })
          return
        }
        const lineup = {
          id: lineupDoc.id,
          ...lineupDoc.data(),
        }

        res.status(200).json({
          status: 200,
          message: `success get agent lineup with name ${agentname} and id ${lineups}`,
          lineup,
        })
      }
      return
    }

    //
    // if lineups not in query
    //

    const agentDoc = await getDoc(doc(db, 'agents', agentname))

    if (!agentDoc.exists()) {
      res.status(404).json({
        status: 404,
        message: 'not found',
      })
      return
    }

    const agent = {
      id: agentDoc.id,
      ...agentDoc.data(),
    }

    res.status(200).json({
      status: 200,
      message: `success get agent with name ${agentname}`,
      agent,
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'error',
    })
  }
}
