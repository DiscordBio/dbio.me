export default function Hero({
    image,
    banner,
    name,
    username,
    about,
    website,
    className,
    color
}) {
    return (
        <div className={className ?? ""}>
            <div className="w-96 h-96 bg-light dark:bg-dark rounded-lg overflow-hidden">
                <div>
                    <div className={"w-full h-40 rounded-lg overflow-hidden"}>
                        <img src={"https://cdn.discordapp.com/attachments/915329326088597525/1027970907190329418/banner-2.png"} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center justify-center">
                        <img className="w-24 h-24 rounded-full -mt-12 ring-4 ring-light dark:ring-dark ring-offset-0" src="https://cdn.discordapp.com/avatars/714451348212678658/a8f8de884352e5156a388616f66bcaf0.png" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center mt-2">
                    <h1 className="text-xl font-medium">{name} <i className="fa-solid fa-badge-check" /></h1>
                    <p className="text-[15px] font-light text-white/40">@{username ?? 'discord'}</p>
                </div>
                <div className="p-6">
                    <p>
                        <i className="fa fa-location-dot text-white/40" /> <span className="text-white/40">India</span>
                    </p>
                </div>
            </div>
        </div>
    );
}