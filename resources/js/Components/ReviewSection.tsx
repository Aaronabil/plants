import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import { Star, ThumbsUp, MessageCircle } from "lucide-react"

export default function ReviewSection() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [reviews, setReviews] = useState<any[]>([])
  const [form, setForm] = useState({
    name: "",
    email: "",
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
      likes: 0,
      avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=${form.name}`, // random avatar
    }
    setReviews([newReview, ...reviews])
    setForm({ name: "", email: "", title: "", detail: "" })
    setRating(0)
  }

  return (
    <div className="w-full bg-white py-10 px-4 md:px-10">
      {/* Form Review */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-5">

        <div className="grid md:grid-cols-2 gap-4">
          <Input placeholder="Name*" name="name" value={form.name} onChange={handleChange} required />
          <Input
            placeholder="Email*"
            type="email"
            name="email"
            value={form.email}
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

        <Input placeholder="Add Review Title*" name="title" value={form.title} onChange={handleChange} required />
        <Textarea
          placeholder="Add Detailed Review*"
          name="detail"
          value={form.detail}
          onChange={handleChange}
          required
          className="min-h-[120px]"
        />

        <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
          Submit
        </Button>
      </form>

      {/* Review List */}
      <div className="max-w-5xl mx-auto mt-12">
        <hr className="mb-6" />

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada review untuk produk ini.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="flex items-start space-x-4">
                {/* Avatar */}
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full border border-gray-200"
                />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-green-800">{rev.name}</h3>
                    <span className="text-xs text-gray-500">{rev.date}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          rev.rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <h4 className="font-medium text-gray-800">{rev.title}</h4>
                  <p className="text-gray-700 text-sm">{rev.detail}</p>

                  {/* Like / Reply */}
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() =>
                        setReviews(
                          reviews.map((r) =>
                            r.id === rev.id ? { ...r, likes: r.likes + 1 } : r
                          )
                        )
                      }
                      className="flex items-center gap-1 hover:text-green-700 transition"
                    >
                      <ThumbsUp size={16} /> {rev.likes}
                    </button>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
