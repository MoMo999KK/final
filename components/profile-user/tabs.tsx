import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Purchuses, User, UserCourse } from "@prisma/client"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"
import Link from "next/link"
interface Props{
    initialData:UserCourse  | null;
    purchused:number | null;
    user:User | null
}

export function ProfileTabs({initialData,purchused,user}:Props) {
  return (
    <Tabs defaultValue="account" className="w-[600px] md:w-[1200px]  mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="user">Account Information</TabsTrigger>
      </TabsList>
      <TabsContent value="courses">
        <Card>
          <CardHeader>
            <CardTitle>Number Of Courses :<span className="ml-2">{purchused}</span></CardTitle>
            
          </CardHeader>
          <CardContent className="space-y-2 w-full h-full grid grid-cols-2 md:grid-cols-3 mx-auto">
            <div className="h-[250px] w-[250px] shadow-md bg-blend-hard-light ">
                <h1>name:{initialData?.name}</h1>
               <Link href={`/courss/${initialData?.id}`} className="flex "><ArrowBigRight/> Go </Link>
             
            </div>
           
          </CardContent>
         
        </Card>
      </TabsContent>
      <TabsContent value="user">
        <Card>
          <CardHeader>
            <CardTitle>{user?.name}</CardTitle>
            <CardDescription>
                update Your Information
               
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
             {user?.email}
            </div>
            <div className="space-y-1">
                
              
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
