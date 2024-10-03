import jobModel from "../models/jobModel.js"

export const searchController = async (req, res) => {
  try{
    const {title,company, location, category, jobType} = req.query
    let searchQuery = {}
    if(title) searchQuery.title = {$regex:title, $options:'i'}
    if(jobType) searchQuery.jobType = {$regex:jobType, $options:'i'}
    if(company) searchQuery.company = {$regex:company, $options:'i'}
    if(location) searchQuery.location = {$regex:location, $options:'i'}
    if(category) searchQuery.category = {$regex:category, $options:'i'}

    // Fetching jobs based on the search query
    const jobs = await jobModel.find(searchQuery)
    return res.status(200).json({
      success:true,
      Jobs:jobs
    })
  }catch(error){
    return res.status(500).json({ message: 'Error fetching jobs', error: error.message })
  }
}