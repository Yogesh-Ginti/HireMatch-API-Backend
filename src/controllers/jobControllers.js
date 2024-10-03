import jobModel from '../models/jobModel.js'

export const handleAllJobs = async(req, res)=>{
  const {jobCategory} = req.params
  try {
    const jobs = await jobModel.find({category:jobCategory})
    return res.status(200).json({
      success : true,
      jobs
    })
     
  } catch (error) {
    res.status(500).json({
      success : false,
      error:error.message
    })
  }
}

export const handleJobById = async(req, res)=>{
  const {jobId} = req.params
  try {
    const job = await jobModel.findById(jobId)
    if(!job) res.status(404).json({
      error:error.message
    });

    return res.status(200).json({
      success:true,
      job
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error:error.message
    })
  }
}
