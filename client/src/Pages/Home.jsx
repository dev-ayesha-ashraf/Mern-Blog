import HomeImage from "/src/blogHome.webp"
export default function Home() {
  return (
<div className="pt-[20vh] flex flex-col lg:flex-row px-[30px] w-full mx-auto justify-center items-center max-[500px]:px-0">
  <div className="w-full lg:w-1/2 p-4">
    <h1 className="text-2xl lg:text-5xl font-bold mb-4">Welcome To Techie Blog</h1>
    <p className="text-sm lg:text-xl mb-6 w-[85%] max-[500px]:w-full">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quis perspiciatis impedit, alias natus sit accusantium suscipit recusandae beatae consequatur? Ducimus, voluptates delectus. Ipsa eligendi fugit suscipit. Distinctio nesciunt qui voluptatibus!
    </p>
    <button className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition duration-200">
      Get Started
    </button>
  </div>
  <div className="w-full lg:w-1/2 p-4">
    <img src={HomeImage} alt="Techie Blog" className="w-[500px] h-[420px] rounded-lg" />
  </div>
</div>

  )
}