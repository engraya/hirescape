import Head from "next/head";
import { Header, TopCards, BarChart, RecentJobs } from "@/components";
import { useUser } from "@/context/userContext";
function Dashboard() {
    const { user } = useUser(); // Adjust if your auth context is different
    const token = user?.token; // Get the token from the user context
  return (
    <>
    <main className="min-h-screen bg-slate-100">
        <Header />
        <TopCards token={token}/>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          <BarChart token={token} />
          <RecentJobs />
        </div>
    </main>
    </>
  )
}

export default Dashboard