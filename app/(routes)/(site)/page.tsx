import { getAllImages } from "@/actions/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { navLinks } from "@/constans";
import { cn } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Collection from "../_components/Collection/Collection";

export default  async function Home({params,searchParams}:SearchParamProps) {
  const page= Number(searchParams?.page)|| 1;
  const images = await getAllImages({page})


  return (
    <>
   <section className="hidden md:flex w-full items-center h-80 flex-col gap-4 rounded-md border p-10 shadow-inner mt-24 lg:mt-1">
    <h2 className="text-3xl font-semibold max-w-[500px] flex-wrap text-center text-purple-600">
      Your Creative Vision With Kanva
    </h2>

    <ul className='flex justify-center items-center w-full gap-20'>
                    {navLinks.slice(1,5).map((link)=>{
                        const IconComponent = link.icon;

                        return(
                          
                                <Link  key={link.route} 
                                
                                className='flex justify-center items-center flex-col gap-2
                                ' href={link.route}>

                                  <li className="flex justify-center items-center w-fit rounded-full p-4">
                                  <IconComponent className="h-24 w-24 text-gray-400"/>

                                  </li>
                                  <p>{link.label}</p>
                                
                                </Link>

                        )
                        

                    })}

                </ul>
   </section>

   <section className="mt-24 md:mt-12">
    <Collection
    images={images?.data}
    totalPages={images.totalPage}
    page={page}
    />
    


   </section>


   </>

  );
}

