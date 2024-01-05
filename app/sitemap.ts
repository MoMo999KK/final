import { db } from "@/lib/prismaDB";
import { url } from "inspector";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await db.userCourse.findMany({
    where:{
      isPublished:true
    }
  })
 

   

  const postEntries: MetadataRoute.Sitemap = response.map(({ id }) => ({
    
    url: `https://vercel.com/momo999kks-projects/courses/${id}`,
    lastModified: new Date(),
    
     priority:0.9,
     changeFrequency:"monthly"
  }));

  return [
    {
      url: "https://vercel.com/momo999kks-projects/about",
      lastModified: new Date(),
    },
    {
      url: 'https://vercel.com/momo999kks-projects',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...postEntries,
  ];
}