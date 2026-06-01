import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { AuthProvider } from '@/lib/contexts/auth-context'
import { StudentProvider } from '@/lib/contexts/student-context'
import { TeacherProvider } from '@/lib/contexts/teacher-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'School Management System',
  description: 'Modern school management system for admins, teachers, students, and parents',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <AuthProvider>
          <TeacherProvider>
            <StudentProvider>
              {children}
            </StudentProvider>
          </TeacherProvider>
        </AuthProvider>
      </body>
    </html>
  )
}