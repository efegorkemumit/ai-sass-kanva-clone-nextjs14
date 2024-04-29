import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"



const NoCreditModal = () => {

    const router =useRouter();
  return (
   <AlertDialog defaultOpen>
  <AlertDialogContent>
    <AlertDialogHeader>

        <div className="flex flex-col md:flex-row gap-5">
            <p className="font-semibold text-2xl">Credits Buy</p>


        </div>
        <AlertDialogTitle className="font-medium text-sm">
            Oopppss... Looks like you of free credits


        </AlertDialogTitle>

     
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel
      onClick={()=>router.push("/profile")}
      >
        
        
        Cancel
        
    </AlertDialogCancel>
      <AlertDialogAction
       onClick={()=>router.push("/credits")}
      >
        
        Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default NoCreditModal