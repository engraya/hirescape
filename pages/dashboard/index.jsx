import Head from "next/head";
import { Header, TopCards, BarChart, RecentJobs } from "@/components";

function Dashboard() {
  return (
    <>
    <main className="min-h-screen bg-slate-100">
        <Header />
        <TopCards />
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          <BarChart />
          <RecentJobs />
        </div>
    </main>
    </>
  )
}

export default Dashboard