import { db } from '../lib/firebase-client'
import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore'

export async function getUsers(req, res) {
  const usersDocs = await getDocs(collection(db, 'users'))
  const users = usersDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  res.status(200).json({
    status: 200,
    message: 'success get all users',
    users,
  })
}

export async function postUser(req, res) {
  try {
    const docRef = doc(db, 'users', req.body.id)
    await setDoc(docRef, req.body, { merge: true })
    res.status(200).json({
      status: 200,
      message: `success post new user with id ${req.body.id}`,
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'error',
    })
  }
}

export async function getUserById(req, res) {
  try {
    const docRef = doc(db, 'users', req.query.userid)
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
      message: `success get a user with id ${req.query.userid}`,
      user,
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'error',
    })
  }
}

export async function updateUserById(req, res) {
  try {
    const docRef = doc(db, 'users', req.query.userid)
    await setDoc(docRef, req.body, { merge: true })
    res.status(200).json({
      status: 200,
      message: `success update user with id ${req.query.userid}`,
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'error',
    })
  }
}
