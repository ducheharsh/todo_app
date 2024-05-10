

export function Alert(){
    
return <div
  role="alert"
  className="relative flex w-full px-4 py-4 text-base text-white bg-gray-900 rounded-lg font-regular"
  data-dismissible="alertName"
>
  <div className="mr-12 ">A dismissible alert for showing message.</div>
  <button
    data-dismissible-target="alertName"
    className="!absolute  top-3 right-3 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    type="button"
  >
    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </span>
  </button>
</div>; 

}