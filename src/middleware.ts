import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export default async function middlerware(request: NextRequest) {
    const cookieStore = cookies()
    const appSession: string = cookieStore.get('appSession')?.name || ""

    if(!appSession) {
        return NextResponse.redirect(
            new URL('/api/auth/login', request.url)
        )   
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin']
}