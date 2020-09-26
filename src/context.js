import React, {createContext, useState, useEffect} from 'react'
import { getProfile } from './services'
export const MyContext = createContext()

function Provider({children}) {
    const [user, setUser] = useState(null)

    const setCtxUser = user => setUser(user)
    const clearCtxUser = () => setUser(null)

    useEffect(() => {
        async function profile() {
            const {
                data: {user}
            } = await getProfile()

            console.log('context user')
            console.log(user)

            setCtxUser(user)
        }
        profile()
    }, [])

    return (
        <MyContext.Provider
            value={{
                user, 
                setCtxUser, 
                clearCtxUser
            }}
        >
            {children}
        </MyContext.Provider>
    )
}

export default Provider
