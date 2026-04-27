export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen flex bg-[#f3efe9] font-sans overflow-hidden">
      {/* LEFT */}
      <div className="w-[45%] bg-[#e7e1d9] relative hidden lg:flex flex-col justify-center px-16 rounded-r-[55px] overflow-hidden">
        <h1 className="absolute top-10 left-16 text-3xl font-medium text-black drop-shadow-md">
          Zenfy
        </h1>

        <div className="max-w-md relative z-10 ml-40 mb-30">
          <h2 className="text-4xl font-medium text-black leading-tight">
            Selamat Datang
          </h2>
          <p className="text-2xl text-black mt-2">
            di masa depan fashion
          </p>
        </div>

        <img
          src="/kemeja.png"
          alt="Kemeja"
          className="absolute -bottom-12 -left-12 w-[280px] object-contain z-0 rotate-[12deg]"
        />

        <img
          src="/kaos.png"
          alt="Kaos"
          className="absolute -bottom-20 left-[50px] w-[300px] object-contain z-0 rotate-[25deg]"
        />
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center px-10">
        {children}
      </div>
    </main>
  );
}