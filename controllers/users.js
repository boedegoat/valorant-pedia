import { db } from '../lib/firebase-client'
import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore'

export async function getUsers(req, res) {
  const usersDocs = await getDocs(collection(db, 'users'))
  const users = usersDocs.docs.map((doc) => doc.data())
  res.status(200).json({
    status: 200,
    message: 'success get all users',
    users,
  })
}

export async function postUser(req, res) {
  try {
    const docRef = doc(db, 'users', req.body.uid)
    await setDoc(docRef, req.body, { merge: true })
    res.status(200).json({
      status: 200,
      message: `success post new user with uid ${req.body.uid}`,
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'error',
      error,
    })
  }
}

export async function getUserByUid(req, res) {
  try {
    const docRef = doc(db, 'users', req.query.useruid)
    const userDoc = await getDoc(docRef)

    if (!userDoc.exists()) {
      res.status(404).json({
        status: 404,
        message: 'not found',
      })
    }

    const user = {
      id: userDoc.id,
      ...userDoc.data(),
    }
    res.status(200).json({
      status: 200,
      message: `success get a user with uid ${req.query.useruid}`,
      user,
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'error',
    })
  }
}

export async function updateUserByUid(req, res) {
  try {
    const docRef = doc(db, 'users', req.query.useruid)
    await setDoc(docRef, req.body, { merge: true })
    res.status(200).json({
      status: 200,
      message: `success update user with uid ${req.query.useruid}`,
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'error',
    })
  }
}
