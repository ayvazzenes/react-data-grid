import React from 'react'
import Search from '../../../components/Search/Search'
import CreateData from '../../../components/CreateData/CreateData'
import "./ContentHeader.css";

const ContentHeaders = () => {
  return (
    <div className='app-content-header container'>
      <Search/>
      <CreateData/>
    </div>
  )
}

export default ContentHeaders