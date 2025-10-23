"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import { Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ReviewSection() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [reviews, setReviews] = useState<any[]>([])
  const [page, setPage] = useState(1)

  const [form, setForm] = useState({
    name: "",
    title: "",
    detail: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newReview = {
      id: Date.now(),
      ...form,
      rating,
      date: new Date().toLocaleString(),
      avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=${form.name}`,
    }
    setReviews([newReview, ...reviews])
    setForm({ name: "", title: "", detail: "" })
    setRating(0)
    setPage(1)
  }

  return (
    <div className="w-full bg-white py-10 px-4 md:px-10 text-left">
      {/* Form Review */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Add Review</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            placeholder="Your Name*"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Your Rating*</label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  (hover || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
            {rating > 0 && <span className="ml-2 text-sm">{rating}.0</span>}
          </div>
        </div>

        <Input
          placeholder="Review Title*"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <Textarea
          placeholder="Write your review..."
          name="detail"
          value={form.detail}
          onChange={handleChange}
          required
          className="min-h-[100px]"
        />

        <div className="flex justify-start">
          <Button type="submit" size="sm" className="bg-green-700 hover:bg-green-800">
            Submit
          </Button>
        </div>
      </form>

      {/* Review Section */}
      <div className="max-w-4xl mx-auto mt-12">
        <h1 className="text-2xl font-semibold text-green-700 mb-6 text-center">
          Customer Reviews
        </h1>
        <hr className="mb-4" />

        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">Belum ada review untuk produk ini.</p>
        ) : (
          <>
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {reviews
                    .slice((page - 1) * 5, page * 5)
                    .map((review, i) => (
                      <div
                        key={review.id || i}
                        className="bg-gray-50 rounded-2xl p-4 shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-10 h-10 rounded-full border border-gray-200"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-semibold text-green-800 text-sm">{review.name}</h3>
                              <span className="text-xs text-gray-500">{review.date}</span>
                            </div>

                            <div className="flex items-center mb-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    review.rating >= star
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>

                            <h4 className="font-medium text-gray-800 text-sm">{review.title}</h4>
                            <p className="text-gray-700 text-sm">{review.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Number Buttons */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(reviews.length / 5) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    page === i + 1
                      ? "bg-green-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
