import axios from 'axios'

const birthday = async (birthdayData) => {
  try {
    const data = await axios.get('https://achilles-web-be.onrender.com/generate/birthday')
    //console.log(data)
    birthdayData = data.data
    return birthdayData
  } catch (err) {
    console.error(`An error occured`, err)
  }
}

export default birthday
