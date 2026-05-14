'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function AuthRedirect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')

  useEffect(() => {
    if (tab === 'signup' || tab === 'register') {
      router.replace('/auth/register')
    } else {
      router.replace('/auth/login')
    }
  }, [router, tab])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AuthRedirect />
    </Suspense>
  )
}
