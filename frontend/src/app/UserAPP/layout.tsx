import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Machine Track - Login",
  description: "Sistema de rastreamento de máquinas John Deere",
};

export default function UserAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {children}
    </div>
  );
}