'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card } from "@/components/shared/Card"
import { CommentCard } from "@/components/interfaces/CommentCard"
import { Button } from "@nextui-org/react"
import { ExternalLink, MessageCircle } from "lucide-react"
import Image from "next/image"
import { faker } from "@faker-js/faker"

interface Article {
  id: string
  title: string
  content: string
  source: string
  publishDate: string
  commentCount: number
  thumbnail: string
  url: string
}

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  likes: number
  replies: number
}

export default function ArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchArticleAndComments = async () => {
      try {
        // Simulate API call
        const mockArticle = {
          id: params.id as string,
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(3),
          source: "BBC News",
          publishDate: faker.date.recent().toISOString(),
          commentCount: faker.number.int({ min: 10, max: 1000 }),
          thumbnail: faker.image.url(),
          url: faker.internet.url(),
        }
        
        const mockComments = Array.from({ length: 5 }, () => ({
          id: faker.string.uuid(),
          author: faker.person.fullName(),
          content: faker.lorem.paragraph(),
          timestamp: faker.date.recent().toISOString(),
          likes: faker.number.int({ min: 0, max: 100 }),
          replies: faker.number.int({ min: 0, max: 20 }),
        }))

        setArticle(mockArticle)
        setComments(mockComments)
      } catch (error) {
        console.error("Error fetching article:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticleAndComments()
  }, [params.id])

  if (loading || !article) {
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image src={article.thumbnail} alt={article.title} fill className="object-cover" />
            </div>

            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{article.title}</h1>
                <div className="flex items-center gap-2 text-sm text-default-500">
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{article.commentCount} comments</span>
                  </div>
                </div>
              </div>

              <p className="whitespace-pre-wrap text-default-700 dark:text-default-300">
                {article.content}
              </p>

              <div className="flex justify-end">
                <Button
                  color="primary"
                  endContent={<ExternalLink className="h-4 w-4" />}
                  className="text-background dark:text-white"
                  as="a"
                  href={article.url}
                  target="_blank"
                >
                  View Original
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Comments
            <span className="text-default-500">({comments.length})</span>
          </h2>
          
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
