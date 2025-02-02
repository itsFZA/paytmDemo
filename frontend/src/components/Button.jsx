export function Button({label, onClick}){
    return(
        <div className="pt-4">
            <button onClick={onClick} className="w-full px-2 py-2 border rounded border-slate-200 bg-black text-white">{label}</button>
        </div>
        
    )
}