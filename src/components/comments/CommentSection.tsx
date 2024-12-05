'use client'

import { Button, Card, CardBody, CardHeader, Divider, Textarea } from "@nextui-org/react"
import { MessageCircle, Send } from "lucide-react"
import { useState, useEffect } from "react"

interface Comment {
  id: string
  content: string
  author: string
  date: string
}

interface CommentSectionProps {
  articleId: string
}

export const CommentSection = ({ articleId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchComments = async () => {
      try {
        // Simulate API call
        const mockComments = [
          {
            id: "1",
            content: "This is a great article!",
            author: "User1",
            date: "2024-01-20"
          },
          {
            id: "2",
            content: "Very informative content.",
            author: "User2",
            date: "2024-01-21"
          }
        ]
        setComments(mockComments)
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [articleId])

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    // TODO: Replace with actual API call
    const mockNewComment = {
      id: Date.now().toString(),
      content: newComment,
      author: "CurrentUser",
      date: new Date().toLocaleDateString()
    }

    setComments(prev => [...prev, mockNewComment])
    setNewComment("")
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Comments</h2>
        <span className="text-small text-default-500">({comments.length})</span>
      </CardHeader>
      <Divider/>
      <CardBody className="space-y-4">
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.author}</span>
                <span className="text-tiny text-default-500">•</span>
                <span className="text-tiny text-default-500">{comment.date}</span>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))}
        </div>

        <Divider/>
        
        <div className="flex gap-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            minRows={1}
            maxRows={4}
            className="flex-grow"
          />
          <Button
            isIconOnly
            color="primary"
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
