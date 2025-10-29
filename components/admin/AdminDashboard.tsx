"use client"

import { useEffect, useState, useMemo } from "react"
import { db } from "@/lib/firebase"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Star, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

// ---------- STATIC CATEGORIES ----------
const STATIC_CATEGORIES = [
  { id: "cleansing_line", name: "Cleansing Line" },
  { id: "protection_line", name: "Protection Line" },
  { id: "brightening_line", name: "Brightening Line" },
  { id: "calming_line", name: "Calming Line" },
  { id: "ampoule_line", name: "Ampoule Line" },
  { id: "moisturizing_line", name: "Moisturizing Line" },
  { id: "stem_cell_line", name: "Stem Cell Line" },
  { id: "body_line", name: "Body Line" },
  { id: "mask_line", name: "Mask Line" },
  { id: "anti_wrinkle_line", name: "Anti-Wrinkle Line" },
  { id: "snail_line", name: "Snail Repair Line" },
  { id: "tox_line", name: "Tox Volume Line" },
  { id: "gold_line", name: "Gold Line" },
  { id: "honey_line", name: "Honey Line" },
  { id: "peeling_line", name: "Peeling Line" },
  { id: "clarity_line", name: "Clarity Line" },
  { id: "vita_c_line", name: "Vita-C Line" },
  { id: "super_moisture_line", name: "Super Moisture Line" },
  { id: "ceramide_line", name: "Ceramide Line" },
  { id: "azulene_line", name: "Azulene Calming Line" },
  { id: "campo_line", name: "Campo Calming Line" },
  { id: "wrinkle_care_line", name: "Wrinkle Care Line" },
]

// ---------- TYPES ----------
type Product = {
  id?: string
  name: string
  description: {
    uz: string
    en: string
    ru: string
  }
  image: string
  category: string
  categoryName: string
  rating: number
}

type Review = {
  id?: string
  name: string
  comment: string
  productName: string
  rating: number
  date: string
}

// ---------- COMPONENT ----------
export default function AdminDashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<"products" | "reviews">("products")
  const [products, setProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [form, setForm] = useState<any>({})
  const [editId, setEditId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"product" | "review">("product")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const productsPerPage = 6

  // ---------- FETCH ----------
  const fetchProducts = async () => {
    const q = await getDocs(collection(db, "products"))
    setProducts(q.docs.map((d) => ({ id: d.id, ...d.data() })) as Product[])
  }

  const fetchReviews = async () => {
    const q = await getDocs(collection(db, "reviews"))
    setReviews(q.docs.map((d) => ({ id: d.id, ...d.data() })) as Review[])
  }

  useEffect(() => {
    fetchProducts()
    fetchReviews()
  }, [])

  // ---------- FILTER ----------
  const filteredProducts = useMemo(
    () => products.filter((p) => JSON.stringify(p).toLowerCase().includes(search.toLowerCase())),
    [products, search]
  )
  const filteredReviews = useMemo(
    () => reviews.filter((r) => JSON.stringify(r).toLowerCase().includes(search.toLowerCase())),
    [reviews, search]
  )

  // ---------- PAGINATION ----------
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage)

  const nextPage = () => page < totalPages && setPage(page + 1)
  const prevPage = () => page > 1 && setPage(page - 1)

  // ---------- SAVE PRODUCT ----------
  const saveProduct = async () => {
    try {
      const data: Product = {
        name: form.name || "",
        description: {
          uz: form.description_uz || "",
          en: form.description_en || "",
          ru: form.description_ru || "",
        },
        image: form.image || "",
        category: form.category || "",
        categoryName: form.categoryName || "",
        rating: Number(form.rating) || 0,
      }

      if (!data.name || !data.image || !data.category) {
        toast({ title: "⚠️ Name, Image va Category talab qilinadi", variant: "destructive" })
        return
      }

      if (editId) {
        await updateDoc(doc(db, "products", editId), data as any)
        toast({ title: "✅ Product updated" })
      } else {
        await addDoc(collection(db, "products"), data)
        toast({ title: "✅ Product added" })
      }

      setIsModalOpen(false)
      setForm({})
      setEditId(null)
      fetchProducts()
    } catch (err: any) {
      toast({ title: "❌ Error saving", description: err.message, variant: "destructive" })
    }
  }

  // ---------- SAVE REVIEW ----------
  const saveReview = async () => {
    try {
      const data: Review = {
        name: form.name || "",
        comment: form.comment || "",
        productName: form.productName || "",
        rating: Number(form.rating) || 0,
        date: editId ? form.date : new Date().toISOString().split("T")[0],
      }

      if (!data.name || !data.comment || !data.productName) {
        toast({ title: "⚠️ All fields required", variant: "destructive" })
        return
      }

      if (editId) {
        await updateDoc(doc(db, "reviews", editId), data as any)
        toast({ title: "✅ Review updated" })
      } else {
        await addDoc(collection(db, "reviews"), data)
        toast({ title: "✅ Review added" })
      }

      setIsModalOpen(false)
      setForm({})
      setEditId(null)
      fetchReviews()
    } catch (err: any) {
      toast({ title: "❌ Error saving", description: err.message, variant: "destructive" })
    }
  }

  // ---------- DELETE ----------
  const handleDelete = async (type: "product" | "review", id: string) => {
    if (!confirm("Delete?")) return
    await deleteDoc(doc(db, type === "product" ? "products" : "reviews", id))
    toast({ title: "🗑️ Deleted" })
    type === "product" ? fetchProducts() : fetchReviews()
  }

  // ---------- ADD / EDIT ----------
  const handleAdd = () => {
    setEditId(null)
    if (activeTab === "products") {
      setForm({
        name: "",
        description_uz: "",
        description_en: "",
        description_ru: "",
        image: "",
        category: "",
        categoryName: "",
        rating: 0,
      })
      setModalType("product")
    } else {
      setForm({
        name: "",
        comment: "",
        productName: "",
        rating: 0,
        date: new Date().toISOString().split("T")[0],
      })
      setModalType("review")
    }
    setIsModalOpen(true)
  }

  const handleEdit = (data: any, type: "product" | "review") => {
    setEditId(data.id)
    if (type === "product") {
      setForm({
        name: data.name,
        description_uz: data.description?.uz || "",
        description_en: data.description?.en || "",
        description_ru: data.description?.ru || "",
        image: data.image,
        category: data.category,
        categoryName: data.categoryName,
        rating: data.rating,
      })
    } else {
      setForm(data)
    }
    setModalType(type)
    setIsModalOpen(true)
  }

  // ---------- UI ----------
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={activeTab === "products" ? "default" : "outline"}
            onClick={() => setActiveTab("products")}
          >
            Products ({products.length})
          </Button>
          <Button
            variant={activeTab === "reviews" ? "default" : "outline"}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews.length})
          </Button>
        </div>

        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add {activeTab === "products" ? "Product" : "Review"}
        </Button>
      </div>

      {/* SEARCH */}
      <Input
        placeholder={`Search ${activeTab}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {/* ---------- PRODUCTS ---------- */}
      {activeTab === "products" && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((p) => (
              <Card key={p.id} className="overflow-hidden border">
                <div className="relative w-full h-64 bg-gray-100">
                  <Image src={p.image || "/placeholder.svg"} alt={p.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2 text-muted-foreground">{p.description?.uz || ""}</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {p.categoryName} ({p.category})
                  </p>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(p.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-xs ml-1">({p.rating.toFixed(1)})</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(p, "product")}>
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete("product", p.id || "")}
                    >
                      <Trash2 className="h-3 w-3 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button variant="outline" size="sm" onClick={prevPage} disabled={page === 1}>
                <ChevronLeft className="h-4 w-4" /> Prev
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button variant="outline" size="sm" onClick={nextPage} disabled={page === totalPages}>
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* ---------- REVIEWS ---------- */}
      {activeTab === "reviews" && (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.productName}</TableCell>
                  <TableCell>{r.comment}</TableCell>
                  <TableCell>{r.rating}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(r, "review")}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete("review", r.id || "")}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* ---------- MODAL ---------- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {modalType === "product"
                ? editId
                  ? "Edit Product"
                  : "Add Product"
                : editId
                ? "Edit Review"
                : "Add Review"}
            </DialogTitle>
          </DialogHeader>

          {/* PRODUCT FORM */}
          {modalType === "product" && (
            <div className="space-y-4 mt-3">
              <Input
                placeholder="Product name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              {/* 3 TILDA DESCRIPTION */}
              <textarea
                placeholder="Description (O'zbek)"
                className="w-full border rounded-lg p-2 text-sm"
                rows={2}
                value={form.description_uz || ""}
                onChange={(e) => setForm({ ...form, description_uz: e.target.value })}
              />
              <textarea
                placeholder="Description (English)"
                className="w-full border rounded-lg p-2 text-sm"
                rows={2}
                value={form.description_en || ""}
                onChange={(e) => setForm({ ...form, description_en: e.target.value })}
              />
              <textarea
                placeholder="Description (Русский)"
                className="w-full border rounded-lg p-2 text-sm"
                rows={2}
                value={form.description_ru || ""}
                onChange={(e) => setForm({ ...form, description_ru: e.target.value })}
              />

              <Input
                placeholder="Image URL"
                value={form.image || ""}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />

              {/* ✅ CATEGORY SELECT */}
              <select
                className="border rounded-lg px-3 py-2 w-full"
                value={form.category || ""}
                onChange={(e) => {
                  const selected = STATIC_CATEGORIES.find((c) => c.id === e.target.value)
                  setForm({
                    ...form,
                    category: selected?.id || "",
                    categoryName: selected?.name || "",
                  })
                }}
              >
                <option value="">Select category</option>
                {STATIC_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <Input
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Rating"
                value={form.rating || ""}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
              />

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveProduct}>{editId ? "Save" : "Create"}</Button>
              </div>
            </div>
          )}

          {/* REVIEW FORM */}
          {modalType === "review" && (
            <div className="space-y-4 mt-3">
              <Input
                placeholder="Reviewer name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                placeholder="Comment"
                value={form.comment || ""}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
              />
              <select
                className="border rounded-lg px-3 py-2 w-full"
                value={form.productName || ""}
                onChange={(e) => setForm({ ...form, productName: e.target.value })}
              >
                <option value="">Select product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Rating"
                value={form.rating || ""}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
              />
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveReview}>{editId ? "Save" : "Create"}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
