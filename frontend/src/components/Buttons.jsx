const buttonStyles = "w-full px-2 py-2 border rounded border-slate-200 text-white";

export function LoadingButton() {
    return (
        <button disabled type="button" className={`${buttonStyles} bg-gray-800 opacity-50 cursor-not-allowed`}>
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin" />
            Loading...
        </button>
    );
}

export function Button({ label, onClick, className = "", disabled = false }) {
    return (
        <div className="pt-4">
            <button onClick={onClick} disabled={disabled} className={`${buttonStyles} bg-black ${className}`}>
                {label}
            </button>
        </div>
    );
}

export function MyButton({ isLoading, signInHandler }) {
    const buttonContent = isLoading ? <LoadingButton /> : <Button label="Sign In" onClick={signInHandler} />;
    return <div className="pt-4">{buttonContent}</div>;
}
