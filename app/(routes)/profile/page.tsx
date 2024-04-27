'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import React from 'react'

const ProfilePage = () => {
  const { toast } = useToast()

  return (
    <Button
    onClick={() => {
      toast({
        variant: "success",

        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    }}
  >
    Show Toast
  </Button>
  )
}

export default ProfilePage