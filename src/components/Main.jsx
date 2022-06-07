import React, { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { 
    Homepage, 
    Works, 
    About, 
    Dashboard, 
    Cbt, 
    News, 
    Donate, 
    Contact, 
    Register, 
    LogIn, 
    ServerResponse, 
    Forget, 
    CbtExam,
    Cryptos,
    Crypto
} from '../components'
import { GlobalContext } from '../app/GlobalState'

const Main = () => {
    const { state, getCryptos, getCryptoNews, getBingNews } = useContext(GlobalContext)

    useEffect(() => {
        getCryptos({ count: 10 })
        getCryptoNews({ count: 200, newsCategory: "crypto" })
        getBingNews({ count: 200 })
        console.log("Current State: ", state)
    }, [state, getCryptos, getCryptoNews, getBingNews])

    return (
        <div>
           <Layout>
               <div className="routes">
                   <div className="form-alert">
                       <ServerResponse />
                   </div>
                   <Routes>
                       <Route exact path="/" element={<Homepage />} />
                       <Route exact path="/works" element={<Works />} />
                       <Route exact path="/about" element={<About />} />
                       <Route exact path="/contact" element={<Contact />} />
                       <Route exact path="/dashboard" element={<Dashboard />} />
                       <Route exact path="/benion-cbt" element={<Cbt />} />
                       <Route exact path="/benion-news" element={<News />} />
                       <Route exact path="/benion-donate" element={<Donate />} />
                       <Route exact path="/register" element={<Register />} />
                       <Route exact path="/login" element={<LogIn />} />
                       <Route exact path="/forget-password" element={<Forget />} />
                       <Route exact path="/benion-cbt/exams" element={<CbtExam />} />
                       <Route exact path="/cryptos" element={<Cryptos />} />
                       <Route exact path="/crypto/:id" element={<Crypto />} />
                   </Routes>
               </div>
           </Layout>
        </div>
    )
}

export default Main
