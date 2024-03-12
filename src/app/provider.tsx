"use client"

import {SessionProvider} from "next-auth/react";

// @ts-ignore
const Provider = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default Provider;