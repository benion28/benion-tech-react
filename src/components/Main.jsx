import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { Homepage, Works, About, Dashboard, Cbt, News, Donate, Contact, AddUser, AddStudent } from '../components'
import { useGetUsersQuery } from '../services/usersApi'

const Main = () => {
    // const { data, isFetching } = useGetUsersQuery();
    // console.log(data);

    return (
        <div>
           <Layout>
               <div className="routes">
                   <Routes>
                       <Route exact path="/" element={<Homepage />} />
                       <Route exact path="/works" element={<Works />} />
                       <Route exact path="/about" element={<About />} />
                       <Route exact path="/contact" element={<Contact />} />
                       <Route exact path="/benion-users/dashboard" element={<Dashboard />} />
                       <Route exact path="/benion-cbt" element={<Cbt />} />
                       <Route exact path="/benion-news" element={<News />} />
                       <Route exact path="/benion-donate" element={<Donate />} />
                       <Route exact path="/benion-users/add-user" element={<AddUser />} />
                       <Route exact path="/benion-cbt/add-student" element={<AddStudent />} />
                   </Routes>
               </div>
           </Layout>
        </div>
    )
}

export default Main
