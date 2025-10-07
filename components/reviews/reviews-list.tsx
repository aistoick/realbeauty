"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

interface Review {
  id: string;
  name: string;
  comment: string;
  product: string;
  rating?: number;
  date: string;
}

const REVIEWS_PER_PAGE = 6;

export default function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "reviews"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        const reviewsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Review[];
        setReviews(reviewsData);
      } catch (err) {
        console.error("🔥 Fikrlarni olishda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // 🔹 Pagination logic
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * REVIEWS_PER_PAGE;
    return reviews.slice(start, start + REVIEWS_PER_PAGE);
  }, [reviews, currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-20">
        Hozircha hech qanday fikr yo‘q.
      </p>
    );
  }

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-8">Fikrlar</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedReviews.map((r) => (
          <Card
            key={r.id}
            className="border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 bg-background"
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-foreground">{r.name}</h3>
                {r.rating !== undefined && (
                  <div className="flex items-center text-yellow-500 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(r.rating ?? 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({(r.rating ?? 0).toFixed(1)})
                    </span>
                  </div>
                )}
              </div>

              <p className="text-sm italic text-muted-foreground mb-3">
                “{r.comment}”
              </p>
              <p className="text-xs text-muted-foreground">
                {r.product} — {r.date}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🔹 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
