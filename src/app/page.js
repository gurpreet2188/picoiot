import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import './globals.css'

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-[5rem] items-center justify-center pt-8 bg-gradient-to-b from-green-100 to-blue-100 h-[100%] md:w-[70%] md:p-8">
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}
