import Body from "./components/Body";
import Command from "./components/Command";
import Footer from "./components/Footer";
import Header from "./components/Header";
import './globals.css'

export default function Home() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center bg-slate-300 h-[100%] md:w-[50%] md:p-8">
      <Header/>
      <Body/>
      <Command/>
      <Footer/>
    </div>
  )
}
