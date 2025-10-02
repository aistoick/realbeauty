"use client"

export function ButterflyAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 right-1/4 w-8 h-8 opacity-20 animate-float">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary">
          <path d="M12 2l1.09 3.26L16 4l-1.91 2.84L16 10l-3.91-1.16L12 12l-1.09-3.16L7 10l1.91-2.84L7 4l3.91 1.26L12 2zm0 4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
        </svg>
      </div>

      <div className="absolute top-3/4 left-1/4 w-6 h-6 opacity-15 animate-float-delayed">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-secondary">
          <path d="M12 2l1.09 3.26L16 4l-1.91 2.84L16 10l-3.91-1.16L12 12l-1.09-3.16L7 10l1.91-2.84L7 4l3.91 1.26L12 2zm0 4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
        </svg>
      </div>
    </div>
  )
}
