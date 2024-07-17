function Window({ show, onClose, title, children }) {
    return (
      <div style={{
        transform: show ? 'translateX(0%)' : 'translateX(-200%)',
      }}
        className='absolute top-0 left-0 w-full h-full backdrop-blur-sm z-10000 transition-all duration-500'
      > {/* Window */}
        <div className=' container mx-auto max-w-2xl max-h-fit rounded-3xl bg-slate-600 py-6 px-4 my-10 pb-10'>
          <section className='flex justify-between items-center gap-5'>
            <h3 className='text-2xl px-4 py-4 border rounded-2xl bg-slate-700 border-transparent'>{title}</h3>
            <button onClick={() => { onClose(false); }} className=' text-xl w-[10] h-[10] m-2 right-1 font-bold px-4 text-center border border-transparent rounded-2xl bg-slate-700'>❌</button>
          </section>
          <div className='flex flex-col gap-4 mt-6'>
            {children}
          </div>
        </div>
      </div>
    )
  }
  
  export default Window;