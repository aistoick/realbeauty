import ReviewsList from "@/components/reviews/reviews-list";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Mijozlar Fikri | RealBeauty",
  description: "RealBeauty mahsulotlari haqida mijozlar fikrlari",
};

export default function ReviewsPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Mijozlar Fikrlari
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Quyida RealBeauty mahsulotlaridan foydalanuvchilar bildirgan haqiqiy
          fikrlarni o‘qishingiz mumkin.
        </p>
        <ReviewsList />
      </main>
      <Footer />
    </>
  );
}
