import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div className="m-4">
        Introducing an enchanting tour booking app tailored for a charming Alaskan town! Immerse yourself in a selection of captivating tours that invite you to embark on invigorating hikes to breathtaking scenic overlooks. Our knowledgeable guides not only lead the way but also impart brief art lessons, adding a touch of creativity to your journey.
      </div>
      <br/>
      <div>
        Experience the perfect blend of nature and artistic inspiration during your vacation, as you revel in the pristine landscapes and create your own unique piece of art to take home. This visionary business is a tribute to the creator's personal experiences living amidst the awe-inspiring beauty of Alaska.
      </div>
      <br/>
      <a className="btn btn-primary" href="/tours/">Browse All Tours</a>
      <br/>

      <img height="400px" className="p-3" src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_738,q_65,w_1440/v1/clients/skagwayak/trailmapheader_af8a018b-2f9e-4590-8a49-a621dcd415c9.jpg" alt="" />
    </div>
  )
}

export default Home
