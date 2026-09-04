function Home() {
  return (
    <div className="min-h-screen bg-black text-[#faebd7]">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">

        <h1 className="text-xl font-semibold tracking-[0.25em]">
          NOCTURNE
        </h1>

        <div className="hidden md:flex items-center gap-10 text-sm text-gray-400">
          <a href="#" className="hover:text-[#faebd7] transition">
            Discover
          </a>

          <a href="#" className="hover:text-[#faebd7] transition">
            Genres
          </a>

          <a href="#" className="hover:text-[#faebd7] transition">
            Favourites
          </a>
        </div>

        {/* <button className="border border-white/20 px-5 py-2 rounded-full text-sm hover:border-[#6d4aff] hover:text-[#6d4aff] transition">
          Sign in
        </button> */}

      </nav>


      {/* HERO */}
      <main className="min-h-[calc(100vh-89px)] flex items-center justify-center px-6">

        <div className="w-full max-w-4xl text-center mt-16">

          {/* HEADING */}
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]">
            WHAT DOES
            <br />
            YOUR <span className="text-[#ad46e4c9] drop-shadow-[0_0_15px_#ad46e4ad]">VIBE</span>
            <br />
            SOUND LIKE?
          </h2>


          {/* SUBTITLE */}
          <p className="mt-8 text-[#a8a0b8] text-base md:text-lg">
            Describe it. We'll find it.
          </p>


          {/* VIBE INPUT */}
          <div className="mt-10 max-w-3xl mx-auto">

            <div
              className="
                flex
                items-center
                bg-[#111]
                border
                border-white/10
                rounded-4xl
                p-2
                transition
                focus-within:border-[#ad46e4c9]
                focus-within:shadow-[0_0_30px_rgba(109,74,255,0.15)]
              "
            >

              <textarea
                rows="2"
                placeholder="Describe the music you're looking for..."
                className="
                  flex-1
                  resize-none
                  bg-transparent
                  outline-none
                  px-4
                  py-3
                  text-[#faebd7]
                  placeholder:text-gray-600
                  text-sm
                  md:text-base
                "
              />

              <button
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-[#ad46e4c9]
                  hover:bg-[#ad46e4c9]
                  text-white
                  rounded-4xl
                  px-4
                  py-3
                  transition
                  duration-300
                  hover:shadow-[0_0_20px_rgba(109,74,255,0.4)]
                  mr-3
                "
              >
                <span className="hidden sm:block">
                  Discover
                </span>

                <span className="text-lg">
                  &#x2192;
                </span>
              </button>

            </div>


            {/* EXAMPLE */}
            <p className="mt-4 text-xs text-gray-600">
              Try: "something dreamy , whimsical and slow"
            </p>

          </div>


          {/* OR */}
          <div className="flex items-center gap-4 max-w-md mx-auto my-10">

            <div className="h-px bg-white/10 flex-1" />

            <span className="text-xs text-gray-600 uppercase tracking-widest">
              OR
            </span>

            <div className="h-px bg-white/10 flex-1" />

          </div>


          {/* ARTIST SEARCH */}
          <div className="max-w-md mx-auto">

            <div
              className="
                flex
                items-center
                gap-3
                bg-transparent
                border
                border-white/10
                rounded-full
                px-5
                py-3
                focus-within:border-[#ad46e4c9]
                transition
                mb-16
              "
            >

              

              <input
                type="text"
                placeholder="Search an artist..."
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-sm
                  text-[#faebd7]
                  placeholder:text-gray-600
                "
              />

            </div>

          </div>


          

        </div>

      </main>

    </div>
  );
}

export default Home;