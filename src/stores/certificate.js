import axios from 'axios'

const certificate = async (certificateData) => {
  try {
    const data = await axios.get('https://achilles-web-be.onrender.com/generate/certificate')
    //console.log(data)
    certificateData = data.data
    return certificateData
  } catch (err) {
    console.error(`An error occured`, err)
  }
}

export default certificate
