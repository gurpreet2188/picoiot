import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import './globals.css'

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-[5rem] items-center justify-center relative bg-gradient-to-b from-cyan-100 via-violet-200 to-blue-200 dark:from-fuchsia-900 dark:via-blue-800 dark:to-violet-900 dark:text-white h-[100%] md:w-[70%] md:px-8">
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}
