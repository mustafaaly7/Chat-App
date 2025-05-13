import { daisyUIThemes } from "../constants"
import { useThemeStore } from "../store/useTheme"



const previewMessages = [
    { id: 1, content: "Hey! how's it going?", isSent: false },
    { id: 2, content: "I'm doing good what about you?", isSent: true }
]

export const Setting = () => {
    const { theme, setTheme } = useThemeStore()


    return (
        <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">Themes</h2>
                    <p className="text-sm text-base-content/70">Choose a theme for your Application Interface</p>

                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {daisyUIThemes.map((t) => (

                        <button
                            key={t}
                            className={`group flex flex-col items-center gap-1.5 rounded-lg transition-colors 
                            ${theme == t ? "bg-base-200" : "hover:bg-base-200/50 "}`} onClick={() => setTheme(t)}>

                            <div className="relative h-8 w-full rounded-md overflow-hidden " data-theme={t}>
                                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                                    <div className="rounded bg-primary"></div>
                                    <div className="rounded bg-secondary"></div>
                                    <div className="rounded bg-accent"></div>
                                    <div className="rounded bg-neutral"></div>

                                </div>



                            </div>

                            <span className="text-[11px] font-medium truncate w-full text-center">
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </span>


                        </button>



                    ))}
                </div>






            </div>

        </div>

    )
}